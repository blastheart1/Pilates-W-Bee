# PWB Pilates Studio - Complete Wellness Platform 🧘‍♀️

A modern, full-featured pilates studio website built with Next.js, featuring advanced booking systems, e-commerce, member management, comprehensive analytics, and **optimized for mobile/iPhone experiences**.

![PWB Pilates Studio](https://images.unsplash.com/photo-1544966503-7cc36a8d5c82?auto=format&fit=crop&q=80&w=1200)

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)](https://tailwindcss.com/)
[![Mobile Optimized](https://img.shields.io/badge/Mobile-Optimized-green)](https://developers.google.com/web/progressive-web-apps/)
[![iPhone Ready](https://img.shields.io/badge/iPhone-Ready-black)](https://developer.apple.com/safari/)

## 🌟 Key Features

### ✅ Completed Frontend Features

- **🎨 Modern Design**: Clean, responsive design with custom component system
- **📱 Mobile-First**: iPhone/iOS optimized with safe area support
- **🍔 Smart Navigation**: Hamburger menu for mobile, full nav for desktop
- **🛒 Advanced E-commerce**: Shopping cart, product catalog, gift certificates
- **👤 Member Portal**: Dashboard, bookings, progress tracking, loyalty rewards
- **📊 Analytics Dashboard**: Health metrics, goal tracking, wearable integration
- **💳 Payment Ready**: PayMongo integration for Philippine market
- **📧 Booking System**: Advanced scheduling with waitlists and recurring bookings
- **📱 Instagram Integration**: Live social media feed with engagement metrics

### 🚀 Technical Highlights

- **Custom Overlay System**: Replaced problematic modals with mobile-optimized overlays
- **Philippine Localization**: ₱ PHP currency, local phone formats, Manila locations
- **SEO Optimized**: Comprehensive meta tags, structured data, sitemap
- **PWA Ready**: Progressive web app capabilities for mobile installation
- **Safe Area Support**: iPhone notch and home indicator compatibility

## 📱 Mobile Optimizations

### iPhone/iOS Specific Features

- **🍎 Native Feel**: Apple-compliant touch targets (44px minimum)
- **📐 Safe Areas**: Dynamic support for iPhone notches and home indicators
- **🎯 Touch Optimization**: Prevents zoom, improves scrolling, optimized interactions
- **📱 Dynamic Viewport**: Handles mobile browser UI changes with `100dvh`
- **🔄 Smooth Animations**: Hardware-accelerated transitions and micro-interactions

### Responsive Breakpoints

```css
/* iPhone Models Covered */
- iPhone 12 mini/13 mini (≤390px): Compact layout
- iPhone 6/7/8 Plus, 11, XR (≤414px): Standard mobile
- iPhone 12/13/14 Pro Max (≤428px): Large mobile
- Landscape mode (≤480px height): Optimized landscape
```

### Mobile Navigation

- **Hamburger Menu**: Full-screen overlay with smooth animations
- **Touch-Friendly**: Large buttons with proper spacing
- **Quick Actions**: Prominent CTA buttons for booking and enrollment
- **Social Integration**: Easy access to social media profiles

## 🛠️ Tech Stack

### Frontend Stack

```json
{
  "framework": "Next.js 15 (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "components": "Radix UI + Custom Components",
  "icons": "Lucide React",
  "forms": "React Hook Form + Zod",
  "state": "React Hooks + Context",
  "animations": "CSS Transitions + Transform"
}
```

### Recommended Backend Stack

#### Option 1: Supabase (Recommended) 🏆

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

**Why Supabase:**

- PostgreSQL with real-time subscriptions
- Built-in authentication with social logins
- Row Level Security for member data protection
- File storage for images, videos, documents
- Edge Functions for payment processing
- Real-time booking availability updates

#### Option 2: Firebase

```bash
npm install firebase @firebase/auth @firebase/firestore
```

#### Option 3: Custom API + Database

```bash
npm install prisma @prisma/client next-auth
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx           # Main single-page application
│   ├── globals.css        # Global styles + mobile optimizations
│   └── favicon.ico
├── components/
│   ├── ui/                # Reusable UI components
│   └── InstagramFeed.tsx  # Social media integration
├── lib/
│   └── utils.ts          # Utility functions
public/
├── manifest.json          # PWA manifest
├── robots.txt            # SEO crawling rules
├── sitemap.xml           # SEO sitemap
└── icon.svg              # App icon
```

## 💾 Database Schema

### Core Tables Structure

```sql
-- Users/Members Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  phone VARCHAR,
  membership_type VARCHAR DEFAULT 'basic',
  loyalty_points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  profile_image_url VARCHAR,
  date_of_birth DATE,
  emergency_contact_name VARCHAR,
  emergency_contact_phone VARCHAR,
  health_conditions TEXT,
  fitness_goals TEXT[]
);

-- Instructors Table
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  bio TEXT,
  certifications TEXT[],
  specializations TEXT[],
  hourly_rate DECIMAL,
  is_active BOOLEAN DEFAULT true
);

-- Studios/Locations Table
CREATE TABLE studios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR NOT NULL,
  phone VARCHAR,
  amenities TEXT[],
  capacity INTEGER,
  equipment_available TEXT[]
);

-- Classes Table
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  instructor_id UUID REFERENCES instructors(id),
  studio_id UUID REFERENCES studios(id),
  class_type VARCHAR NOT NULL,
  difficulty_level VARCHAR DEFAULT 'beginner',
  max_capacity INTEGER DEFAULT 12,
  duration_minutes INTEGER DEFAULT 60,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  price DECIMAL NOT NULL,
  description TEXT,
  equipment_needed TEXT[],
  is_recurring BOOLEAN DEFAULT false,
  recurring_schedule JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  class_id UUID REFERENCES classes(id),
  status VARCHAR DEFAULT 'confirmed',
  payment_status VARCHAR DEFAULT 'pending',
  booking_date TIMESTAMP DEFAULT NOW(),
  cancellation_date TIMESTAMP,
  cancellation_reason TEXT,
  no_show BOOLEAN DEFAULT false,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  recurring_booking_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Waitlist Table
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  class_id UUID REFERENCES classes(id),
  position INTEGER,
  joined_at TIMESTAMP DEFAULT NOW(),
  notified_at TIMESTAMP,
  expires_at TIMESTAMP
);

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  type VARCHAR NOT NULL, -- physical, digital, gift, subscription
  category VARCHAR,
  stock_quantity INTEGER DEFAULT 0,
  sku VARCHAR UNIQUE,
  image_urls TEXT[],
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  order_number VARCHAR UNIQUE NOT NULL,
  total_amount DECIMAL NOT NULL,
  currency VARCHAR DEFAULT 'PHP',
  status VARCHAR DEFAULT 'pending',
  payment_method VARCHAR,
  payment_id VARCHAR,
  shipping_address JSONB,
  billing_address JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL NOT NULL,
  total_price DECIMAL NOT NULL
);

-- Health Metrics Table
CREATE TABLE health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  metric_type VARCHAR NOT NULL, -- weight, body_fat, muscle_mass, etc.
  value DECIMAL NOT NULL,
  unit VARCHAR NOT NULL,
  recorded_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Nutrition Logs Table
CREATE TABLE nutrition_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  meal_type VARCHAR NOT NULL, -- breakfast, lunch, dinner, snack
  food_item VARCHAR NOT NULL,
  calories DECIMAL,
  protein_grams DECIMAL,
  carbs_grams DECIMAL,
  fat_grams DECIMAL,
  portion_size VARCHAR,
  logged_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Loyalty Transactions Table
CREATE TABLE loyalty_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  points INTEGER NOT NULL,
  transaction_type VARCHAR NOT NULL, -- earned, redeemed, expired
  description VARCHAR NOT NULL,
  reference_id UUID, -- booking_id, order_id, etc.
  created_at TIMESTAMP DEFAULT NOW()
);

-- Referrals Table
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id),
  referee_id UUID REFERENCES users(id),
  referral_code VARCHAR UNIQUE NOT NULL,
  status VARCHAR DEFAULT 'pending', -- pending, completed, rewarded
  reward_points INTEGER DEFAULT 500,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Goals Table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  description TEXT,
  target_value DECIMAL,
  current_value DECIMAL DEFAULT 0,
  unit VARCHAR,
  category VARCHAR, -- fitness, nutrition, wellness
  target_date DATE,
  status VARCHAR DEFAULT 'active', -- active, completed, paused
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

## 💳 Payment Integration (Philippines)

### PayMongo Setup

```bash
npm install @paymongo/paymongo-js
```

```javascript
import { PayMongo } from "@paymongo/paymongo-js";

const payMongo = new PayMongo(process.env.PAYMONGO_SECRET_KEY);

// Create payment intent
const paymentIntent = await payMongo.paymentIntents.create({
  amount: 495000, // ₱4,950 in centavos
  currency: "PHP",
  payment_method_allowed: ["gcash", "grab_pay", "card", "maya"],
  description: "PWB Pilates Premium Membership",
});

// Supported Payment Methods in Philippines
const paymentMethods = [
  "gcash", // Most popular digital wallet
  "maya", // PayMaya digital wallet
  "grab_pay", // Grab's payment service
  "card", // Credit/Debit cards
  "billease", // Buy now, pay later
  "dob", // DragonPay online banking
  "dob_ubp", // UnionBank online banking
];
```

## 🔧 Environment Configuration

### Required Environment Variables

```env
# App Configuration
NEXT_PUBLIC_APP_URL=https://pwbpilates.com
NEXT_PUBLIC_APP_NAME="PWB Pilates Studio"

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Payment Processing (PayMongo)
PAYMONGO_SECRET_KEY=sk_live_your_secret_key
NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY=pk_live_your_public_key
PAYMONGO_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Service (SendGrid/Resend)
SENDGRID_API_KEY=SG.your_sendgrid_api_key
SENDGRID_FROM_EMAIL=hello@pwbpilates.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@pwbpilates.com

# Instagram Integration (Optional)
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
INSTAGRAM_USER_ID=your_instagram_user_id

# File Upload (Cloudinary/Supabase Storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id

# SMS Service (Semaphore/Twilio)
SEMAPHORE_API_KEY=your_semaphore_api_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

# Maps Integration
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## 🚀 Quick Start Guide

### 1. Clone and Install

```bash
git clone https://github.com/your-username/pwb-pilates-studio.git
cd pwb-pilates-studio
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 3. Database Setup (Supabase)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Initialize project
supabase init

# Link to your project
supabase link --project-ref your-project-ref

# Push database schema
supabase db push
```

### 4. Development

```bash
npm run dev
# Open http://localhost:3000
```

### 5. Build and Deploy

```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
npm install -g vercel
vercel deploy

# Or deploy to Netlify, Railway, etc.
```

## 📱 Mobile Development Guide

### Testing on Different Devices

```bash
# Test on various screen sizes
npm run dev
# Open Chrome DevTools
# Toggle device toolbar (Cmd+Shift+M)
# Test on iPhone 12 mini, iPhone 14 Pro Max, etc.
```

### Mobile-Specific Features

1. **Touch Optimization**

   - All buttons meet 44px touch target
   - Prevent zoom on input focus
   - Optimized scroll behavior

2. **Safe Area Support**

   - Handles iPhone notches
   - Supports home indicator
   - Dynamic viewport height

3. **Performance**
   - Optimized images for mobile
   - Lazy loading implementation
   - Minimal JavaScript bundle

## 💰 Cost Breakdown (Monthly PHP)

### Recommended Stack Costs

```
Supabase Pro Plan:           ₱1,250/month (8GB DB, 100GB storage)
Vercel Pro Plan:            ₱1,000/month (optional, Hobby is free)
Domain (.com):              ₱50/month (₱600/year)
PayMongo Transaction Fees:  2.9% + ₱15 per transaction
SendGrid Email:             ₱0 (40k emails free)
Cloudinary:                 ₱0 (25k transformations free)
Google Maps API:            ₱0 (most usage covered by free tier)

Total Base Cost: ₱2,300/month
Additional costs: Payment processing fees only
```

### Cost-Effective Alternatives

```
Supabase Free Tier:         ₱0 (up to 500MB DB, 50MB storage)
Vercel Hobby:               ₱0 (non-commercial use)
Free Domain:                Use .vercel.app or similar

Total Free Tier: ₱0/month (perfect for testing and small studios)
```

## 🏗️ Implementation Roadmap

### Phase 1: Foundation ✅ (Completed)

- [x] Modern responsive frontend
- [x] Mobile-optimized design
- [x] Component architecture
- [x] SEO implementation
- [x] Payment integration ready

### Phase 2: Core Backend (Week 1-2)

- [ ] Supabase setup and authentication
- [ ] Database schema implementation
- [ ] User registration and login
- [ ] Email verification system
- [ ] Password reset functionality

### Phase 3: Booking System (Week 3-4)

- [ ] Class management admin panel
- [ ] Real-time booking availability
- [ ] Recurring booking logic
- [ ] Waitlist functionality
- [ ] SMS/Email notifications
- [ ] Cancellation policy enforcement

### Phase 4: E-commerce (Week 5-6)

- [ ] Product management system
- [ ] Shopping cart persistence
- [ ] PayMongo payment flow
- [ ] Order processing workflow
- [ ] Digital product delivery
- [ ] Inventory management

### Phase 5: Member Portal (Week 7-8)

- [ ] Member dashboard with real data
- [ ] Progress tracking implementation
- [ ] Loyalty points calculation
- [ ] Referral system activation
- [ ] Goal setting and tracking

### Phase 6: Analytics & Advanced Features (Week 9-10)

- [ ] Health metrics tracking
- [ ] Nutrition logging system
- [ ] Wearable device integration (Apple Health, Google Fit)
- [ ] Advanced analytics dashboard
- [ ] Admin reporting tools

### Phase 7: Mobile App (Future)

- [ ] React Native mobile app
- [ ] Push notifications
- [ ] Offline booking capabilities
- [ ] Biometric authentication

## 🔐 Security Best Practices

### Frontend Security

```typescript
// Input validation with Zod
import { z } from "zod";

const bookingSchema = z.object({
  classId: z.string().uuid(),
  date: z.string().datetime(),
  userId: z.string().uuid(),
});

// Sanitize user inputs
import DOMPurify from "isomorphic-dompurify";

const sanitizedInput = DOMPurify.sanitize(userInput);
```

### Database Security

- Row Level Security (RLS) enabled
- API rate limiting
- Input validation and sanitization
- Encrypted sensitive data
- Regular security audits

### Payment Security

- PCI DSS compliance through PayMongo
- Webhook signature verification
- Secure API key management
- Fraud detection monitoring

## 📊 Analytics & Monitoring

### Performance Monitoring

```javascript
// Core Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Business Metrics Dashboard

- Booking conversion rates
- Revenue tracking
- Member retention analysis
- Class popularity metrics
- Instructor performance

### Error Tracking

```bash
# Recommended error tracking
npm install @sentry/nextjs
```

## 🛠️ Development Workflow

### Code Quality

```bash
# Linting and formatting
npm run lint
npm run format

# Type checking
npm run type-check

# Testing
npm run test
npm run test:e2e
```

### Git Workflow

```bash
# Feature development
git checkout -b feature/booking-system
git commit -m "feat: add recurring booking functionality"
git push origin feature/booking-system

# Create pull request for review
```

### Environment Management

```bash
# Development
npm run dev

# Staging
npm run build:staging
npm run start:staging

# Production
npm run build
npm run start
```

## 📚 API Documentation

### Key API Endpoints

```typescript
// Authentication
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/reset-password

// Bookings
GET /api/bookings
POST /api/bookings
PUT /api/bookings/:id
DELETE /api/bookings/:id

// Classes
GET /api/classes
GET /api/classes/:id
POST /api/classes (admin)
PUT /api/classes/:id (admin)

// Payments
POST /api/payments/create-intent
POST /api/payments/webhooks
GET /api/payments/history

// Member Portal
GET /api/members/dashboard
GET /api/members/metrics
POST /api/members/goals
PUT /api/members/profile
```

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/pwb-pilates-studio.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Use conventional commit messages
- Ensure mobile responsiveness

### Code Style

```typescript
// Use proper TypeScript types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  membershipType: "basic" | "premium" | "unlimited";
}

// Use descriptive component names
const MemberDashboard: React.FC<MemberDashboardProps> = ({
  user,
  bookings,
}) => {
  // Component logic
};
```

## 🐛 Troubleshooting

### Common Issues

**Issue: Mobile menu not working**

```javascript
// Solution: Check z-index and overflow settings
.mobile-menu {
  z-index: 100;
  position: fixed;
  inset: 0;
}
```

**Issue: Payment integration failing**

```javascript
// Solution: Verify PayMongo webhook URL
const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhooks`;
```

**Issue: Images not loading**

```javascript
// Solution: Configure next.config.js for external images
module.exports = {
  images: {
    domains: ["images.unsplash.com", "your-cdn.com"],
  },
};
```

## 📞 Support & Community

### Getting Help

- 📖 **Documentation**: Check this README and code comments
- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Create an issue with enhancement label
- 💬 **Questions**: Start a discussion on GitHub

### Contact Information

- **Email**: developer@pwbpilates.com
- **Website**: https://pwbpilates.com
- **Instagram**: [@the_hapi_bee](https://instagram.com/the_hapi_bee/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

```
MIT License

Copyright (c) 2024 PWB Pilates Studio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- **Design Inspiration**: Modern wellness platforms and Apple Design Guidelines
- **Technology Stack**: Next.js, Supabase, PayMongo, Tailwind CSS
- **Community**: Open source contributors and the Philippine wellness community
- **Icons**: Lucide React for beautiful, consistent iconography
- **Images**: Unsplash for high-quality stock photography

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Alternative Platforms

- **Railway**: `railway deploy`
- **Netlify**: `netlify deploy`
- **DigitalOcean App Platform**: Connect GitHub repository

---

**Built with ❤️ for the wellness community in the Philippines 🇵🇭**

_Ready to transform your pilates studio with modern technology? Let's build something amazing together!_
