import { Button } from "@/components/ui/button";
import { getBlogPosts, getBlogCategories } from '@/lib/blog-data';
import BlogPageClient from '@/components/blog/BlogPageClient';

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const categories = await getBlogCategories();

  return (
    <div className="min-h-screen pt-28 pb-20">
      <BlogPageClient posts={blogPosts} categories={categories} />

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest engineering insights and industry news.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60"
            />
            <Button variant="blue-contrast">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}