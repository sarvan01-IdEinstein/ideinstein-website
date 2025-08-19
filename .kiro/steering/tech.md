# Technology Stack

## Framework & Runtime
- **Next.js 13.5.4** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type-safe JavaScript
- **Node.js >=16.0.0** - Runtime requirement

## Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Headless UI components (Dialog, Select, Tabs, etc.)
- **Framer Motion 10.18.0** - Animation library
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variant management

## 3D Graphics & Visualization
- **Three.js 0.157.0** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers and abstractions
- **react-tsparticles** - Particle effects

## Forms & Validation
- **React Hook Form 7.54.2** - Form management
- **Zod 3.23.8** - Schema validation
- **@hookform/resolvers** - Form validation integration

## Development Tools
- **ESLint** - Code linting with Next.js and Prettier configs
- **Prettier** - Code formatting with Tailwind plugin
- **TypeScript** - Static type checking

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

### Code Quality
- Use `npm run format` before committing
- Run `npm run type-check` to verify TypeScript
- ESLint runs automatically in development

## Configuration Notes
- Path aliases configured with `@/*` pointing to project root
- Canvas externals configured for Three.js compatibility
- Strict mode enabled for React
- Dark mode support via class-based Tailwind configuration