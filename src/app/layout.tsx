import React from "react";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-montserrat",
});

export const metadata = {
  title:
    "PWB Pilates Studio - Professional Pilates & Nutrition in Metro Manila | Pilates with Bee",
  description:
    "Transform your wellness journey with expert Pilates instruction and nutrition guidance in Metro Manila. Certified BASI instructor Bee offers group classes, private sessions, and personalized nutrition plans. Book your trial class today! ₱4,950/month membership plans available.",
  keywords: [
    "pilates Manila",
    "pilates Metro Manila",
    "pilates Makati",
    "pilates Quezon City",
    "BASI pilates Philippines",
    "pilates instructor Manila",
    "nutrition consultant Philippines",
    "wellness studio Metro Manila",
    "fitness classes Manila",
    "core strength training",
    "pilates with Bee",
    "PWB pilates",
    "registered nutritionist dietitian Philippines",
    "private pilates sessions Manila",
    "group pilates classes",
    "wellness transformation",
  ].join(", "),
  authors: [{ name: "Bee", url: "https://instagram.com/the_hapi_bee/" }],
  creator: "PWB Pilates Studio",
  publisher: "PWB Pilates Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://pwbpilates.com",
    siteName: "PWB Pilates Studio",
    title:
      "PWB Pilates Studio - Professional Pilates & Nutrition in Metro Manila",
    description:
      "Transform your wellness journey with expert Pilates instruction and nutrition guidance. Certified BASI instructor Bee offers personalized wellness programs in Metro Manila.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "PWB Pilates Studio - Professional Pilates Classes in Metro Manila",
      },
      {
        url: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=800&h=600",
        width: 800,
        height: 600,
        alt: "Bee - Certified BASI Pilates Instructor and Registered Nutritionist Dietitian",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "PWB Pilates Studio - Professional Pilates & Nutrition in Metro Manila",
    description:
      "Transform your wellness journey with expert Pilates instruction and nutrition guidance in Metro Manila. Book your trial class today!",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200&h=630",
    ],
    creator: "@the_hapi_bee",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://pwbpilates.com",
  },
  category: "Health & Fitness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://pwbpilates.com/#business",
        name: "PWB Pilates Studio",
        alternateName: "Pilates with Bee",
        description:
          "Professional Pilates instruction and nutrition guidance in Metro Manila, Philippines. Certified BASI instructor offering group classes, private sessions, and wellness programs.",
        url: "https://pwbpilates.com",
        logo: {
          "@type": "ImageObject",
          url: "https://pwbpilates.com/logo.png",
          width: 512,
          height: 512,
        },
        image: [
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=800",
        ],
        telephone: "+63-917-123-4567",
        email: "hello@pwbpilates.com",
        address: [
          {
            "@type": "PostalAddress",
            streetAddress: "123 Wellness Street",
            addressLocality: "Makati City",
            addressRegion: "Metro Manila",
            postalCode: "1200",
            addressCountry: "PH",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "456 Serenity Ave",
            addressLocality: "Quezon City",
            addressRegion: "Metro Manila",
            postalCode: "1100",
            addressCountry: "PH",
          },
        ],
        geo: [
          {
            "@type": "GeoCoordinates",
            latitude: 14.5547,
            longitude: 121.0244,
          },
          {
            "@type": "GeoCoordinates",
            latitude: 14.676,
            longitude: 121.0437,
          },
        ],
        openingHours: ["Mo-Fr 06:00-20:00", "Sa 07:00-18:00", "Su 08:00-16:00"],
        priceRange: "₱₱",
        currenciesAccepted: "PHP",
        paymentAccepted: "Cash, Credit Card, GCash, Maya, Bank Transfer",
        servedCuisine: "Wellness Services",
        serviceType: "Fitness & Wellness",
        areaServed: {
          "@type": "City",
          name: "Metro Manila",
          addressCountry: "PH",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Pilates & Wellness Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Group Pilates Classes",
                description:
                  "Professional group Pilates instruction for all levels",
              },
              price: "4950",
              priceCurrency: "PHP",
              priceValidUntil: "2024-12-31",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Private Pilates Sessions",
                description: "One-on-one personalized Pilates training",
              },
              price: "6000",
              priceCurrency: "PHP",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Nutrition Consultation",
                description:
                  "Personalized nutrition guidance and meal planning",
              },
              price: "3000",
              priceCurrency: "PHP",
            },
          ],
        },
        sameAs: [
          "https://instagram.com/the_hapi_bee/",
          "https://facebook.com/pwbpilates",
          "https://tiktok.com/@the_hapi_bee",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "Person",
        "@id": "https://pwbpilates.com/#instructor",
        name: "Bee",
        jobTitle:
          "BASI Certified Pilates Instructor & Registered Nutritionist Dietitian",
        description:
          "Certified BASI Pilates Instructor and board certified Nutritionist Dietitian (RND) with 8+ years of experience helping clients achieve their wellness goals.",
        image:
          "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=400",
        url: "https://instagram.com/the_hapi_bee/",
        sameAs: ["https://instagram.com/the_hapi_bee/"],
        knowsAbout: [
          "BASI Pilates",
          "Nutrition Counseling",
          "Wellness Coaching",
          "Core Strengthening",
          "Postural Alignment",
          "Mindful Movement",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "BASI Pilates Certification",
            credentialCategory: "Professional Certification",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Registered Nutritionist Dietitian (RND)",
            credentialCategory: "Professional License",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://pwbpilates.com/#website",
        url: "https://pwbpilates.com",
        name: "PWB Pilates Studio",
        description:
          "Professional Pilates instruction and nutrition guidance in Metro Manila, Philippines",
        inLanguage: "en-PH",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://pwbpilates.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en-PH" className={`scroll-smooth ${montserrat.variable}`}>
      <head>
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* iPhone/iOS Optimized Viewport */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />

        {/* Meta Tags */}
        <meta name="theme-color" content="#ec4899" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="PWB Pilates" />
        <meta name="apple-touch-fullscreen" content="yes" />

        {/* iPhone Specific Optimizations */}
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="320" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Elfsight script now loaded dynamically in component to prevent hydration issues */}

        {/* Google Analytics - Replace with your GA4 ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>

        {/* Facebook Pixel - Replace with your Pixel ID */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body
        className={`min-h-screen bg-white text-gray-900 font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
