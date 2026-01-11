import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import Tesseract from 'tesseract.js';

const ReceiptUpload = ({ onExtractionComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile)
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': []
    },
    maxFiles: 1,
    multiple: false
  });

  const removeFile = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setProgress(0);
  };

  const processFile = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(10);

    try {
      // 1. Upload to Supabase
			const fileExt = file.name.split('.').pop()
			const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
   
			const { data: { user }, error: userError } = await supabase.auth.getUser()
			if (userError) throw userError
			if (!user) throw new Error('Please sign in to upload receipts.')

			const filePath = `${user.id}/${fileName}`
			const { error: uploadError } = await supabase.storage
        .from('receipts')
				.upload(filePath, file, { contentType: file.type })

      if (uploadError) throw uploadError;

      setProgress(40);
      
			const { data: signedData, error: signedError } = await supabase.storage
				.from('receipts')
				.createSignedUrl(filePath, 60 * 10)
			if (signedError) throw signedError
			const signedUrl = signedData?.signedUrl


      // 2. OCR Processing
      setUploading(false);
      setProcessing(true);

      const result = await Tesseract.recognize(
        file.preview || file,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgress(40 + (m.progress * 50));
            }
          }
        }
      );

      const extractedText = result.data.text;
      
      // Basic regex extraction logic (simple heuristics for demo)
      const dateRegex = /(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/;
      const amountRegex = /\$\s?(\d{1,3}(?:,?\d{3})*\.?\d{2})/;
      // Simple vendor guess - first non-empty line usually
      const lines = extractedText.split('\n').filter(line => line.trim().length > 0);
      const vendorGuess = lines[0] || 'Unknown Vendor';
      
      const dateMatch = extractedText.match(dateRegex);
      const amountMatch = extractedText.match(amountRegex);

      const extractedData = {
        text: extractedText,
        vendor: vendorGuess,
        date: dateMatch ? dateMatch[0] : new Date().toISOString().split('T')[0],
        total: amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0.00,
        url: signedUrl,
        confidence: result.data.confidence
      };
      
      setProgress(100);
      onExtractionComplete(extractedData);

    } catch (error) {
      console.error('Error processing receipt:', error);
      toast({
        variant: "destructive",
        title: "Processing Failed",
        description: error.message || "Could not upload or process file."
      });
    } finally {
      setUploading(false);
      setProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-maroon bg-maroon/5' : 'border-gray-300 hover:border-maroon/50'}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700">Drag & drop receipt here</p>
          <p className="text-sm text-gray-500 mt-1">or click to browse files (PDF, JPG, PNG)</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-md">
                <FileText className="w-8 h-8 text-maroon" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {!uploading && !processing && (
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          {file.type.startsWith('image/') && (
            <div className="mb-6 h-64 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center border">
              <img src={file.preview} alt="Receipt preview" className="max-h-full object-contain" />
            </div>
          )}

          {(uploading || processing) && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>{uploading ? 'Uploading...' : 'Extracting data...'}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button 
            className="w-full bg-maroon hover:bg-maroon/90" 
            onClick={processFile}
            disabled={uploading || processing}
          >
            {uploading || processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Process Receipt'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReceiptUpload;