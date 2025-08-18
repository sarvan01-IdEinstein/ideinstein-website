import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPost, getBlogPosts } from "@/lib/blog-data";
import BlogFloatingButtons from "@/components/blog/BlogFloatingButtons";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | IdEinstein Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  // Simple content formatting
  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-primary mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-primary mt-6 mb-3">
            {paragraph.replace(/\*\*/g, '')}
          </h3>
        );
      }
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="text-text/90 mb-2 ml-4">
            {paragraph.replace('- ', '')}
          </li>
        );
      }
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-text/90 leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Floating Buttons */}
      <BlogFloatingButtons showBackButton={true} />

      {/* Article Header */}
      <article className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative h-72 md:h-[500px] mb-8 rounded-xl overflow-hidden border border-gray-200">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-contain bg-gray-50"
              priority
            />
          </div>

          {/* Article Meta */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-text/60 mb-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </span>
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-text/80 mb-6">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Share Button */}
            <Button variant="outline" className="mb-8">
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </Button>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {formatContent(post.content)}
          </div>

          {/* Author Bio */}
          <div className="bg-primary/5 rounded-xl p-6 mb-12">
            <h3 className="text-xl font-bold text-primary mb-2">About the Author</h3>
            <p className="text-text/80">
              {post.author} - Our expert engineering team brings decades of experience in 
              mechanical design, manufacturing, and innovation. We're passionate about 
              sharing knowledge and helping businesses succeed through better engineering.
            </p>
          </div>
        </div>
      </article>

      {/* Call to Action */}
      <section className="container mx-auto px-4 mt-16">
        <div className="max-w-4xl mx-auto bg-primary text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-white/90 mb-6">
            Let our expert team help you bring your engineering ideas to life.
          </p>
          <Link href="/contact">
            <Button variant="blue-contrast">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}