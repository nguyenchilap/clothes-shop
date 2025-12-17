# OKA User Frontend

A React-based user frontend application built with React Router v7, Vite, and TailwindCSS.

## Tech Stack

- **React 19** - UI Library
- **React Router 7** - Routing
- **Vite** - Build tool
- **TailwindCSS 4** - Styling
- **TypeScript** - Type safety
- **Radix UI** - Headless UI components
- **Mantine** - UI Component library
- **React Query** - Data fetching & caching
- **React Hook Form + Zod** - Form handling & validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
# Development mode
npm run dev

# Development with staging API
npm run dev:staging

# Development with localhost API
npm run dev:localhost
```

### Build

```bash
# Build for development
npm run build

# Build for staging
npm run build:staging

# Build for production
npm run build:production
```

### Start Production Server

```bash
npm run start
```

## Environment Configuration

Environment files are located in the `environments/` directory:

- `env.example` - Template file
- `env.development` - Development environment
- `env.localhost` - Local development environment
- `env.staging` - Staging environment
- `env.production` - Production environment

## Project Structure

```
oka-user-frontend/
├── app/                    # Application source code
│   ├── assets/            # Static assets (images, icons)
│   ├── components/        # React components
│   │   ├── ui/           # UI primitives (shadcn/ui)
│   │   └── layouts/      # Layout components
│   ├── context/          # React contexts
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities and helpers
│   │   └── utils/        # Utility functions
│   ├── routes/           # Route components
│   ├── app.css           # Global styles
│   ├── root.tsx          # Root component
│   └── routes.ts         # Route configuration
├── environments/          # Environment configurations
├── public/               # Static public files
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run prettier` | Check code formatting |
| `npm run prettier:fix` | Fix code formatting |

## License

Private - VCyber

