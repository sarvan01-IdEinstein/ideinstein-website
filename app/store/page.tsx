'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Filter, Star, Tags, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  tags: string[];
}

// Sample data - replace with your actual data
const products: Product[] = [
  {
    id: '1',
    name: '3D Printer Filament - PLA',
    description: 'High-quality PLA filament for precise 3D printing with excellent layer adhesion and minimal warping.',
    price: 29.99,
    category: 'Materials',
    image: '/images/store/filament.jpg',
    rating: 4.5,
    stock: 100,
    tags: ['PLA', '1.75mm', '1kg']
  },
  {
    id: '2',
    name: 'Professional CAD Software License',
    description: 'Industry-standard CAD software for mechanical design and engineering applications.',
    price: 299.99,
    category: 'Software',
    image: '/images/store/cad-software.jpg',
    rating: 4.8,
    stock: 50,
    tags: ['CAD', 'Professional', 'License']
  },
  {
    id: '3',
    name: 'Precision Measuring Tools Set',
    description: 'Complete set of precision measuring instruments for quality control and inspection.',
    price: 149.99,
    category: 'Tools',
    image: '/images/store/measuring-tools.jpg',
    rating: 4.7,
    stock: 25,
    tags: ['Precision', 'Measuring', 'Quality']
  },
  {
    id: '4',
    name: '3D Printer Nozzle Set',
    description: 'High-quality brass nozzles in various sizes for different printing applications.',
    price: 19.99,
    category: 'Equipment',
    image: '/images/store/nozzles.jpg',
    rating: 4.3,
    stock: 200,
    tags: ['Nozzles', 'Brass', 'Various Sizes']
  },
  {
    id: '5',
    name: 'Engineering Notebook',
    description: 'Professional engineering notebook with grid pages and project planning sections.',
    price: 24.99,
    category: 'Tools',
    image: '/images/store/notebook.jpg',
    rating: 4.6,
    stock: 75,
    tags: ['Notebook', 'Grid', 'Professional']
  },
  {
    id: '6',
    name: 'PETG Filament - Clear',
    description: 'Crystal clear PETG filament perfect for transparent parts and chemical resistance.',
    price: 34.99,
    category: 'Materials',
    image: '/images/store/petg-filament.jpg',
    rating: 4.4,
    stock: 80,
    tags: ['PETG', 'Clear', '1.75mm']
  }
];

const categories = ['All', 'Materials', 'Tools', 'Equipment', 'Software'];
const sortOptions = ['Latest', 'Price: Low to High', 'Price: High to Low', 'Popular'];

const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen py-24">
      {/* Floating Get Quote Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link href="/contact">
          <Button
            variant="default"
            className="shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-white rounded-full px-6"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Get Quote
          </Button>
        </Link>
      </motion.div>
      <PageHero
        title="Engineering Store"
        subtitle="Premium materials, professional tools, and cutting-edge equipment for your engineering projects."
        features={[
          { icon: <Star className="w-5 h-5 text-yellow-500" />, text: "Premium Quality" },
          { icon: <ShoppingCart className="w-5 h-5" />, text: "Fast Shipping" },
          { icon: <Tags className="w-5 h-5" />, text: "Best Prices" }
        ]}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products, materials, tools..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
          <Button variant="default" className="h-12 px-8">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </PageHero>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center text-primary">
                  <Filter className="w-5 h-5 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full justify-start ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'hover:bg-primary/10 text-left'
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Range Filter */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center text-primary">
                  <Tags className="w-5 h-5 mr-2" />
                  Price Range
                </h3>
                <div className="space-y-4">
                  <Input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-primary">${priceRange[0]}</span>
                    <span className="text-primary">${priceRange[1]}</span>
                  </div>
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPriceRange([0, 1000])}
                      className="text-xs"
                    >
                      Reset Range
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <p className="text-text/60 text-lg">
                  Showing <span className="font-semibold text-primary">{currentProducts.length}</span> of <span className="font-semibold text-primary">{filteredProducts.length}</span> products
                </p>
                {selectedCategory !== 'All' && (
                  <p className="text-sm text-text/50">
                    in <span className="font-medium">{selectedCategory}</span>
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text/60">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-primary/20 rounded-lg px-4 py-2 bg-white hover:border-primary/40 focus:border-primary focus:outline-none transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="relative h-48 mb-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text/60">{product.category}</span>
                        <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400" />
                          <span className="ml-1 text-sm">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <p className="text-text/80 text-sm mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        <Button 
                          variant="default"
                          onClick={() => {/* Add to cart logic */}}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2"
                >
                  Previous
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = 
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    Math.abs(pageNum - currentPage) <= 1;

                  if (!showPage && pageNum === 2 && currentPage > 4) {
                    return <span key="dots1" className="px-2 text-gray-400">...</span>;
                  }
                  if (!showPage && pageNum === totalPages - 1 && currentPage < totalPages - 3) {
                    return <span key="dots2" className="px-2 text-gray-400">...</span>;
                  }
                  if (!showPage) return null;

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 ${
                        currentPage === pageNum 
                          ? "bg-primary text-white" 
                          : "hover:bg-primary/10"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                {/* Next Button */}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="relative h-48 mb-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
                        Featured
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-text/80 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Special Offers</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive exclusive deals and early access to new products.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button variant="blue-contrast">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorePage;