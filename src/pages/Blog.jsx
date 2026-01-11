import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const posts = [
    {
      slug: 'hidden-water-damage-signs',
      title: 'Top 10 Warning Signs of Hidden Water Damage in Your Walls and Ceilings',
      excerpt: 'Discover the silent destroyers lurking in your walls. Learn to spot the subtle signs of hidden water damage before mold takes hold or structural failure occurs.',
      date: 'December 12, 2023',
      author: 'Benson Team',
      category: 'Water Mitigation',
      image: 'https://images.unsplash.com/photo-1582236894452-9218227b613c', // Replacement image for cracked/damaged wall
    },
    {
      slug: 'first-24-hours-water-damage',
      title: 'What to Do in the First 24 Hours After Water Damage',
      excerpt: 'Immediate steps Oregon homeowners should take to minimize damage and prepare for professional mitigation. Speed is critical to preventing mold and structural issues.',
      date: 'October 15, 2023',
      author: 'Benson Team',
      category: 'Water Mitigation',
      image: 'https://images.unsplash.com/photo-1517646133932-83569424c30c',
    },
    {
      slug: 'mold-vs-mildew',
      title: 'Mold vs Mildew: How to Tell the Difference',
      excerpt: 'Learn the key differences between mold and mildew, when you can clean it yourself, and when you need to call a professional remediation team.',
      date: 'September 28, 2023',
      author: 'Benson Team',
      category: 'Mold Remediation',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
    },
    {
      slug: 'bathroom-remodel-costs',
      title: 'Bathroom Remodel Cost Drivers in Oregon',
      excerpt: 'Understanding what factors influence the cost of a bathroom renovation, from materials and labor to plumbing changes and permit fees.',
      date: 'September 10, 2023',
      author: 'Benson Team',
      category: 'Remodeling',
      image: 'https://images.unsplash.com/photo-1552321901-5095a5676770',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Home Restoration & Construction Blog | Benson Home Solutions</title>
        <meta name="description" content="Expert advice on water damage, mold remediation, and home remodeling for Oregon homeowners. Tips, guides, and industry insights from Benson Home Solutions." />
      </Helmet>

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Expert Advice & Insights
            </h1>
            <p className="text-xl text-cream">
              Practical tips and professional guidance for maintaining, restoring, and improving your Oregon home.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <Link to={`/blog/${post.slug}`} className="block h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-restoration-gray mb-3">
                    <span className="bg-cream px-2 py-1 rounded text-contractor-black font-semibold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="block mb-3">
                    <h2 className="text-xl font-bold text-contractor-black hover:text-maroon transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-restoration-gray text-sm mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-structural-gray">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="link" className="text-maroon p-0 h-auto font-semibold">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;