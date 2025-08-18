'use client';

import { CONTACT_INFO } from '@/lib/constants';

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'service' | 'article';
  data?: any;
}

export default function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'IdEinstein',
          url: 'https://ideinstein.com',
          logo: 'https://ideinstein.com/logo.png',
          description: 'Professional engineering services including 3D printing, CAD modeling, FEA/CFD analysis, and manufacturing solutions.',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Walter-Petri-Ring 49',
            addressLocality: 'Taunusstein',
            postalCode: '65232',
            addressCountry: 'Germany',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+49-151-4222-7760',
            contactType: 'customer service',
            email: 'info@ideinstein.com',
          },
          sameAs: [
            'https://linkedin.com/company/ideinstein',
            'https://twitter.com/ideinstein',
            'https://facebook.com/ideinstein',
            'https://instagram.com/ideinstein'
          ],
          foundingDate: '2020',
          numberOfEmployees: '10-50',
          industry: 'Engineering Services',
          serviceArea: {
            '@type': 'Place',
            name: 'Germany'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Engineering Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: '3D Printing Services',
                  description: 'Professional 3D printing and rapid prototyping services'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'CAD Modeling',
                  description: 'Professional CAD modeling and design services'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'FEA & CFD Analysis',
                  description: 'Advanced structural and fluid dynamics analysis'
                }
              }
            ]
          }
        };

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'IdEinstein',
          url: 'https://ideinstein.com',
          description: 'Professional engineering services including 3D printing, CAD modeling, and manufacturing solutions.',
          publisher: {
            '@type': 'Organization',
            name: 'IdEinstein'
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://ideinstein.com/search?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          }
        };

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data?.name || 'Engineering Services',
          description: data?.description || 'Professional engineering and manufacturing services',
          provider: {
            '@type': 'Organization',
            name: 'IdEinstein',
            url: 'https://ideinstein.com'
          },
          serviceType: data?.serviceType || 'Engineering Services',
          areaServed: {
            '@type': 'Place',
            name: 'Germany'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: data?.name || 'Engineering Services',
            itemListElement: data?.features?.map((feature: string, index: number) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: feature.split(':')[0],
                description: feature.split(':')[1]?.trim()
              }
            })) || []
          }
        };

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data?.title,
          description: data?.description,
          image: data?.image,
          author: {
            '@type': 'Organization',
            name: 'IdEinstein'
          },
          publisher: {
            '@type': 'Organization',
            name: 'IdEinstein',
            logo: {
              '@type': 'ImageObject',
              url: 'https://ideinstein.com/logo.png'
            }
          },
          datePublished: data?.publishedAt,
          dateModified: data?.updatedAt || data?.publishedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data?.url
          }
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}