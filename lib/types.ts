import { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  submenu?: {
    title: string;
    href: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string | LucideIcon;
  features: string[];
  category: string[];
  details?: {
    specifications?: {
      category: string;
      items: { label: string; value: string }[];
    }[];
    process?: {
      title: string;
      description: string;
      image?: string;
      visualization?: {
        type: 'image' | 'diagram' | 'model' | 'video';
        src: string;
        alt?: string;
      };
      keyPoints?: string[];
      tools?: string[];
      deliverables?: string[];
      timeline?: string;
    }[];
    gallery?: string[];
  };
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  stock: number;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: string;
  description?: string;
  prefix?: string;
  suffix?: string;
}

export interface CompanyValue {
  title: string;
  description: string;
  icon?: string;
}
