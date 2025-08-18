// Google Analytics 4 configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events for common actions
export const trackEvent = {
  // Contact form submissions
  contactForm: (formType: string) => {
    event({
      action: 'form_submit',
      category: 'Contact',
      label: formType,
    });
  },

  // Service page views
  serviceView: (serviceName: string) => {
    event({
      action: 'service_view',
      category: 'Services',
      label: serviceName,
    });
  },

  // Quote requests
  quoteRequest: (serviceType: string) => {
    event({
      action: 'quote_request',
      category: 'Lead Generation',
      label: serviceType,
    });
  },

  // Blog interactions
  blogRead: (articleTitle: string) => {
    event({
      action: 'article_read',
      category: 'Blog',
      label: articleTitle,
    });
  },

  // Store interactions
  productView: (productName: string) => {
    event({
      action: 'product_view',
      category: 'Store',
      label: productName,
    });
  },

  // Download tracking
  downloadFile: (fileName: string) => {
    event({
      action: 'file_download',
      category: 'Downloads',
      label: fileName,
    });
  },

  // Navigation tracking
  navigationClick: (linkText: string, destination: string) => {
    event({
      action: 'navigation_click',
      category: 'Navigation',
      label: `${linkText} -> ${destination}`,
    });
  },

  // Search tracking
  search: (query: string, resultsCount: number) => {
    event({
      action: 'search',
      category: 'Search',
      label: query,
      value: resultsCount,
    });
  },
};

// Enhanced ecommerce tracking (for future store functionality)
export const ecommerce = {
  // Track product purchases
  purchase: (transactionId: string, value: number, items: any[]) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: 'EUR',
        items: items,
      });
    }
  },

  // Track add to cart
  addToCart: (itemId: string, itemName: string, value: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'EUR',
        value: value,
        items: [
          {
            item_id: itemId,
            item_name: itemName,
            quantity: 1,
            price: value,
          },
        ],
      });
    }
  },
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: {
        page_path?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        transaction_id?: string;
        currency?: string;
        items?: any[];
      }
    ) => void;
  }
}