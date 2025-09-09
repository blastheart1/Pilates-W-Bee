# Deployment Guide - PWB Pilates Studio

This guide covers deployment options and best practices for the PWB Pilates Studio application.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

**Best for:** Fast deployment, automatic SSL, global CDN, serverless functions

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Connect your domain
# Enable analytics and monitoring
```

**Pros:**

- Zero configuration deployment
- Automatic SSL certificates
- Global CDN with 99.99% uptime
- Serverless functions for API routes
- Preview deployments for pull requests
- Built-in analytics and performance monitoring

**Cons:**

- Function execution time limits (10s hobby, 60s pro)
- Pricing can scale up with usage

### Option 2: Netlify

**Best for:** JAMstack applications, form handling, branch deployments

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=out
```

### Option 3: Railway

**Best for:** Full-stack applications with databases

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### Option 4: DigitalOcean App Platform

**Best for:** Scalable applications with managed databases

1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy with automatic scaling

## 🔧 Environment Configuration

### Production Environment Variables

```env
# App Configuration
NEXT_PUBLIC_APP_URL=https://pwbpilates.com
NODE_ENV=production

# Database (Supabase Production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# Payment Processing (PayMongo Live)
PAYMONGO_SECRET_KEY=sk_live_your_live_secret_key
NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY=pk_live_your_live_public_key
PAYMONGO_WEBHOOK_SECRET=whsec_your_live_webhook_secret

# Email Service (SendGrid Production)
SENDGRID_API_KEY=SG.your_production_sendgrid_key
SENDGRID_FROM_EMAIL=hello@pwbpilates.com

# Security
NEXTAUTH_SECRET=your_production_nextauth_secret
JWT_SECRET=your_production_jwt_secret
ENCRYPTION_KEY=your_production_encryption_key

# Analytics
NEXT_PUBLIC_GA_ID=G-YOUR_PRODUCTION_GA_ID
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_production_pixel_id
```

### Environment Variable Security

**✅ Do:**

- Use strong, unique secrets for production
- Store secrets in platform-specific secret managers
- Rotate secrets regularly
- Use different API keys for staging and production

**❌ Don't:**

- Commit secrets to version control
- Use development keys in production
- Share secrets via insecure channels
- Use weak or predictable secrets

## 🏗️ Build Configuration

### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for certain deployment platforms
  output: process.env.BUILD_STATIC === "true" ? "export" : undefined,

  // Image optimization
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com", "your-cdn.com"],
    formats: ["image/webp", "image/avif"],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/old-page",
        destination: "/new-page",
        permanent: true,
      },
    ];
  },

  // Rewrites for API routes
  async rewrites() {
    return [
      {
        source: "/api/webhooks/paymongo",
        destination: "/api/payments/webhooks",
      },
    ];
  },
};

module.exports = nextConfig;
```

### Build Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "build:analyze": "ANALYZE=true next build",
    "build:static": "BUILD_STATIC=true next build",
    "export": "next export",
    "build:staging": "NODE_ENV=staging next build",
    "preview": "next build && next start",
    "lint": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:e2e": "playwright test",
    "db:generate": "supabase gen types typescript --project-id $SUPABASE_PROJECT_ID > types/database.types.ts"
  }
}
```

## 🗄️ Database Deployment

### Supabase Production Setup

1. **Create Production Project**

   ```bash
   # Create new Supabase project for production
   supabase projects create pwb-pilates-prod
   ```

2. **Set up Database Schema**

   ```bash
   # Apply database migrations
   supabase db push --project-ref your-prod-project-ref

   # Enable Row Level Security
   supabase db reset --project-ref your-prod-project-ref
   ```

3. **Configure Auth Providers**

   - Google OAuth for social login
   - Apple Sign-In for iOS users
   - Magic Link for email authentication

4. **Set up Storage Buckets**

   ```sql
   -- Create storage buckets
   INSERT INTO storage.buckets (id, name, public) VALUES
   ('avatars', 'avatars', true),
   ('class-images', 'class-images', true),
   ('product-images', 'product-images', true),
   ('documents', 'documents', false);

   -- Set up storage policies
   CREATE POLICY "Users can upload their own avatar" ON storage.objects
   FOR INSERT WITH CHECK (
     bucket_id = 'avatars' AND
     auth.uid()::text = (storage.foldername(name))[1]
   );
   ```

### Database Migrations

```sql
-- Create migration file: 001_initial_schema.sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  phone VARCHAR,
  membership_type VARCHAR DEFAULT 'basic',
  loyalty_points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
FOR UPDATE USING (auth.uid() = id);
```

## 💳 Payment System Deployment

### PayMongo Webhook Configuration

1. **Set up Webhook Endpoints**

   ```bash
   # Production webhook URL
   https://pwbpilates.com/api/payments/webhooks
   ```

2. **Configure Webhook Events**

   - `payment.paid` - Payment successful
   - `payment.failed` - Payment failed
   - `payment.cancelled` - Payment cancelled

3. **Webhook Security**

   ```javascript
   // Verify webhook signature
   const crypto = require("crypto");

   function verifyWebhook(payload, signature, secret) {
     const computedSignature = crypto
       .createHmac("sha256", secret)
       .update(payload)
       .digest("hex");

     return crypto.timingSafeEqual(
       Buffer.from(signature),
       Buffer.from(computedSignature),
     );
   }
   ```

## 📧 Email Service Deployment

### SendGrid Configuration

1. **Domain Authentication**

   ```bash
   # Add DNS records for domain authentication
   TXT record: @.pwbpilates.com -> "v=spf1 include:sendgrid.net ~all"
   CNAME: s1._domainkey.pwbpilates.com -> s1.domainkey.u12345.wl134.sendgrid.net
   CNAME: s2._domainkey.pwbpilates.com -> s2.domainkey.u12345.wl134.sendgrid.net
   ```

2. **Email Templates**

   - Welcome email for new members
   - Booking confirmation
   - Class reminders
   - Payment receipts
   - Password reset

3. **Compliance Setup**
   - Unsubscribe links in all emails
   - GDPR compliance for EU users
   - CAN-SPAM compliance

## 🔒 Security Configuration

### SSL/TLS Setup

**Vercel (Automatic):**

- Automatic SSL certificate provisioning
- HTTPS redirect enabled by default
- HTTP/2 and HTTP/3 support

**Custom Domain:**

```bash
# Add custom domain in Vercel dashboard
vercel domains add pwbpilates.com
vercel domains add www.pwbpilates.com

# Configure DNS
A record: @ -> 76.76.21.21
CNAME: www -> cname.vercel-dns.com
```

### Security Headers

```javascript
// next.config.js security headers
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.elfsight.com https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: blob:;
      font-src 'self' data:;
      connect-src 'self' https: wss:;
      media-src 'self' https:;
      frame-src 'self' https:;
    `
      .replace(/\s+/g, " ")
      .trim(),
  },
];
```

## 📊 Monitoring and Analytics

### Performance Monitoring

1. **Web Vitals Tracking**

   ```javascript
   // lib/analytics.js
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

   function sendToAnalytics(metric) {
     gtag("event", metric.name, {
       event_category: "Web Vitals",
       value: Math.round(metric.value),
       event_label: metric.id,
     });
   }

   getCLS(sendToAnalytics);
   getFID(sendToAnalytics);
   getFCP(sendToAnalytics);
   getLCP(sendToAnalytics);
   getTTFB(sendToAnalytics);
   ```

2. **Error Tracking with Sentry**

   ```bash
   npm install @sentry/nextjs
   ```

   ```javascript
   // sentry.client.config.js
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
   });
   ```

### Uptime Monitoring

**Recommended Services:**

- UptimeRobot (free tier available)
- Pingdom
- StatusCake
- Better Uptime

**Critical Endpoints to Monitor:**

- `/` (homepage)
- `/api/health` (health check)
- `/api/bookings` (booking system)
- `/api/payments/webhooks` (payment webhooks)

## 🚦 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

### Pre-deployment Checklist

**Before deploying to production:**

- [ ] All tests pass
- [ ] Code review completed
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] SSL certificate configured
- [ ] Domain DNS configured
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Error tracking enabled
- [ ] Performance testing completed

## 🔄 Rollback Strategy

### Vercel Rollback

```bash
# List deployments
vercel list

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Database Rollback

```sql
-- Create rollback migration
-- 002_rollback_feature.sql
DROP TABLE IF EXISTS new_feature_table;
ALTER TABLE existing_table DROP COLUMN new_column;
```

### Emergency Procedures

1. **Site Down:**

   - Check Vercel status dashboard
   - Verify DNS configuration
   - Check recent deployments
   - Rollback if necessary

2. **Payment Issues:**

   - Check PayMongo dashboard
   - Verify webhook endpoints
   - Check error logs
   - Contact PayMongo support if needed

3. **Database Issues:**
   - Check Supabase dashboard
   - Verify connection strings
   - Check migration status
   - Restore from backup if needed

## 📈 Scaling Considerations

### Traffic Scaling

**Vercel Scaling:**

- Automatic scaling for serverless functions
- Global CDN handles static assets
- No server management required

**Database Scaling:**

- Supabase automatically scales read replicas
- Connection pooling enabled
- Consider database optimization for high traffic

### Performance Optimization

1. **Image Optimization**

   ```javascript
   // next.config.js
   images: {
     formats: ['image/webp', 'image/avif'],
     minimumCacheTTL: 86400, // 24 hours
   }
   ```

2. **Bundle Analysis**

   ```bash
   npm run build:analyze
   ```

3. **Database Indexing**
   ```sql
   -- Add indexes for common queries
   CREATE INDEX idx_bookings_user_date ON bookings(user_id, date);
   CREATE INDEX idx_classes_date_time ON classes(date, start_time);
   ```

---

## 📞 Support

For deployment issues:

- Check deployment logs in platform dashboard
- Review error tracking (Sentry)
- Contact platform support if needed
- Email: developer@pwbpilates.com

---

_This deployment guide ensures a smooth, secure, and scalable deployment of the PWB Pilates Studio application._
