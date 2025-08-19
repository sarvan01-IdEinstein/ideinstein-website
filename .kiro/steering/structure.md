# Project Structure

## Architecture Pattern
Next.js 13 App Router with TypeScript, following a feature-based organization with shared utilities.

## Directory Structure

### `/app` - Next.js App Router
- **`layout.tsx`** - Root layout with providers (CartProvider, ErrorBoundary)
- **`page.tsx`** - Homepage with loading states and animations
- **`globals.css`** - Global styles and Tailwind imports
- **Route folders**: `about/`, `api/`, `blog/`, `contact/`, `faq/`, `services/`, `store/`

### `/components` - React Components
Organized by feature/domain:
- **`about/`** - About page components
- **`home/`** - Homepage sections (HeroSection, InteractiveServices, etc.)
- **`layout/`** - Layout components (Header, Footer)
- **`services/`** - Service-related components
- **`shared/`** - Reusable components (ContactWidget, ErrorBoundary, LoadingSpinner)
- **`ui/`** - Base UI components (likely Radix UI wrappers)

### `/lib` - Utilities & Configuration
- **`constants.ts`** - Site-wide constants (contact info, nav links, metadata)
- **`types.ts`** - TypeScript type definitions
- **`utils.ts`** - Utility functions
- **`validations/`** - Zod schemas for form validation

### `/context` - React Context
- **`CartContext.tsx`** - Shopping cart state management

### `/hooks` - Custom React Hooks
- **`useFormValidation.ts`** - Form validation logic
- **`useMediaQuery.ts`** - Responsive design utilities
- **`useScrollPosition.ts`** - Scroll-based interactions

### `/config` - Configuration Files
- **`site.ts`** - Site configuration (navigation, metadata, links)

### `/public` - Static Assets
- **`images/`** - Image assets
- **`logo.png`** - Brand logo
- Brand assets and service imagery

### `/styles` - Additional Styles
- **`animations.css`** - Custom CSS animations

## Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection`, `ContactWidget`)
- **Files**: camelCase for utilities, PascalCase for components
- **Directories**: lowercase with hyphens for routes, camelCase for features
- **Types**: PascalCase interfaces in `lib/types.ts`

## Import Patterns
- Use `@/` path alias for all internal imports
- Group imports: external libraries first, then internal modules
- Prefer named exports over default exports for utilities

## Component Organization
- One component per file
- Co-locate related components in feature directories
- Shared/reusable components in `/components/shared`
- UI primitives in `/components/ui`

## State Management
- React Context for global state (cart, user preferences)
- Local component state with useState/useReducer
- Custom hooks for complex state logic