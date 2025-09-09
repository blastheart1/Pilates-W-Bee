#!/bin/bash

# PWB Pilates Studio - Local Setup Script
# This script will create the complete project structure locally

echo "🧘‍♀️ Setting up PWB Pilates Studio locally..."

# Create project directory
mkdir -p pwb-pilates-studio
cd pwb-pilates-studio

# Initialize npm project
echo "📦 Initializing npm project..."
npm init -y

# Install dependencies
echo "⬇️ Installing dependencies..."
npm install next@latest react@latest react-dom@latest typescript@latest
npm install -D @types/node @types/react @types/react-dom eslint eslint-config-next
npm install tailwindcss@latest postcss@latest autoprefixer@latest
npm install @radix-ui/react-button @radix-ui/react-input @radix-ui/react-label @radix-ui/react-textarea @radix-ui/react-calendar
npm install lucide-react
npm install clsx tailwind-merge
npm install class-variance-authority

# Initialize Tailwind CSS
echo "🎨 Setting up Tailwind CSS..."
npx tailwindcss init -p

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p src/app
mkdir -p src/components/ui
mkdir -p src/lib
mkdir -p public
mkdir -p .github/ISSUE_TEMPLATE

# Create package.json scripts
echo "⚙️ Setting up package.json scripts..."
cat > package.json << 'EOF'
{
  "name": "pwb-pilates-studio",
  "version": "1.0.0",
  "description": "Modern pilates studio website with advanced booking and member management",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "build:analyze": "ANALYZE=true next build",
    "preview": "next build && next start"
  },
  "keywords": [
    "pilates",
    "fitness",
    "wellness",
    "booking-system",
    "nextjs",
    "react",
    "typescript",
    "mobile-optimized"
  ],
  "author": "PWB Pilates Studio",
  "license": "MIT",
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@radix-ui/react-button": "^1.0.0",
    "@radix-ui/react-input": "^1.0.0",
    "@radix-ui/react-label": "^1.0.0",
    "@radix-ui/react-textarea": "^1.0.0",
    "@radix-ui/react-calendar": "^1.0.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
EOF

# Create Tailwind config
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
EOF

# Create TypeScript config
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Create Next.js config
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
EOF

# Create PostCSS config
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

echo "✅ Project structure created!"
echo ""
echo "📝 Next steps:"
echo "1. Copy all the source files from our conversation into the appropriate directories"
echo "2. Run 'npm install' to install dependencies"
echo "3. Copy the environment variables to .env.local"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "🚀 Your PWB Pilates Studio is ready!"
