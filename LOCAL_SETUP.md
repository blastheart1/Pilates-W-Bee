# Local Setup Guide - PWB Pilates Studio

Follow these steps to get your PWB Pilates Studio running locally on your machine.

## 🚀 Quick Setup

### Method 1: Automatic Setup Script

1. **Download the setup script** (setup-project.sh from our conversation)
2. **Run the script:**
   ```bash
   chmod +x setup-project.sh
   ./setup-project.sh
   ```
3. **Navigate to the project:**
   ```bash
   cd pwb-pilates-studio
   ```

### Method 2: Manual Setup

1. **Create project directory:**

   ```bash
   mkdir pwb-pilates-studio
   cd pwb-pilates-studio
   ```

2. **Initialize npm project:**

   ```bash
   npm init -y
   ```

3. **Install dependencies:**

   ```bash
   # Core dependencies
   npm install next@latest react@latest react-dom@latest typescript@latest

   # Dev dependencies
   npm install -D @types/node @types/react @types/react-dom eslint eslint-config-next

   # Styling
   npm install tailwindcss@latest postcss@latest autoprefixer@latest

   # UI Components
   npm install @radix-ui/react-button @radix-ui/react-input @radix-ui/react-label @radix-ui/react-textarea @radix-ui/react-calendar

   # Icons and utilities
   npm install lucide-react clsx tailwind-merge class-variance-authority
   ```

4. **Create directory structure:**
   ```bash
   mkdir -p src/app src/components/ui src/lib public .github/ISSUE_TEMPLATE
   ```

## 📁 File Structure

After setup, your project should look like this:

```
pwb-pilates-studio/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
├── public/
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   └── icon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── textarea.tsx
│   │       └── calendar.tsx
│   └── lib/
│       └── utils.ts
├── .env.local
├── .env.example
├── CHANGELOG.md
├── CONTRIBUTING.md
├── DEPLOYMENT.md
├── LICENSE.md
├── README.md
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 📝 Required Files to Create

You'll need to create these files with the content from our conversation:

### 1. Core Application Files

**src/app/layout.tsx** - Root layout with SEO and meta tags
**src/app/page.tsx** - Main application component (the large file with all functionality)
**src/app/globals.css** - Global styles with mobile optimizations

### 2. Component Files

**src/components/ui/button.tsx:**

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**src/lib/utils.ts:**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 3. Configuration Files

**Create .env.local** (copy from .env.example and fill in your values)

### 4. Documentation Files

- Copy all the .md files from our conversation
- Copy the GitHub template files

## 🔧 Configuration Steps

### 1. Environment Variables

```bash
cp .env.example .env.local
# Edit .env.local with your actual API keys
```

### 2. Initialize Tailwind CSS

```bash
npx tailwindcss init -p
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Testing Mobile Features

### Test on Different Devices

1. **Chrome DevTools:**

   - Open Chrome DevTools (F12)
   - Click device toolbar (Ctrl+Shift+M)
   - Test various iPhone models

2. **Real Device Testing:**
   - Get your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Access `http://your-ip:3000` from your phone

### Mobile Features to Test

- [ ] Hamburger menu navigation
- [ ] Touch targets (all buttons should be easily tappable)
- [ ] Safe area support (if testing on iPhone with notch)
- [ ] Responsive typography and layouts
- [ ] Shopping cart functionality
- [ ] Member portal tabs
- [ ] Booking system overlays

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use:**

```bash
npx kill-port 3000
# or
npm run dev -- -p 3001
```

**TypeScript errors:**

```bash
npm run type-check
```

**Styling issues:**

```bash
# Rebuild CSS
npm run dev
```

**Missing dependencies:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Ready to Deploy?

Once everything is working locally:

1. **Build for production:**

   ```bash
   npm run build
   ```

2. **Test production build:**

   ```bash
   npm start
   ```

3. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

## 📞 Need Help?

If you run into issues:

1. Check the console for error messages
2. Verify all files are in the correct locations
3. Make sure all dependencies are installed
4. Check environment variables are set correctly

---

**🎉 That's it! Your PWB Pilates Studio should now be running locally with all the mobile optimizations and features we built together.**
