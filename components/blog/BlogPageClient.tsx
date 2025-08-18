'use client'

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHero from '@/components/shared/PageHero';
import BlogClient from './BlogClient';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  author: string;
}

interface BlogPageClientProps {
  posts: BlogPost[];
  categories: string[];
}

const BlogPageClient = ({ posts, categories }: BlogPageClientProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <PageHero
        title="Engineering Insights"
        subtitle="Stay updated with the latest in engineering, design, and manufacturing."
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles, topics, insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
          <Button variant="default" className="h-12 px-8">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </PageHero>

      <BlogClient 
        posts={posts} 
        categories={categories}
        externalSearchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </>
  );
};

export default BlogPageClient;