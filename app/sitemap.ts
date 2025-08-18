import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ideinstein.com'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/store',
    '/faq',
  ]

  // Service pages
  const servicePages = [
    '/services',
    '/services/research-development',
    '/services/cad-modeling',
    '/services/machine-design',
    '/services/biw-design',
    '/services/finite-element-cfd',
    '/services/gdt-tolerance',
    '/services/3d-printing',
    '/services/supplier-sourcing',
    '/services/technical-documentation',
  ]

  const currentDate = new Date()

  return [
    // Static pages
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: page === '' ? 'daily' as const : 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    })),
    
    // Service pages
    ...servicePages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}