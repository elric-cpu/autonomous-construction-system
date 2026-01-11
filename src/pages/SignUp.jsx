import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '@/utils/authUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import SEO from '@/components/SEO';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (!agreed) {
        setError("You must agree to the Terms and Conditions");
        return;
    }

    setLoading(true);

    try {
      await signUpUser(
          formData.email, 
          formData.password, 
          formData.fullName, 
          formData.companyName
      );
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-green-600">Registration Successful!</CardTitle>
                    <CardDescription>
                        Please check your email to verify your account before logging in.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                    <Link to="/login">
                        <Button variant="outline">Back to Login</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
      );
  }

  return (
    <>
      <SEO title="Sign Up | Benson Home Solutions" description="Create a new account" />
      <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-maroon">Create an Account</CardTitle>
            <CardDescription>
              Enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name (Optional)</Label>
                <Input id="companyName" value={formData.companyName} onChange={handleChange} placeholder="For new organizations" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm</Label>
                    <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 py-2">
                <Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} />
                <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the <span className="text-maroon underline">Terms & Conditions</span>
                </label>
              </div>

              <Button type="submit" className="w-full bg-maroon hover:bg-maroon/90" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-maroon font-semibold hover:underline">Log in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignUp;