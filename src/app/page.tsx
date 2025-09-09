
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Facebook,
  Instagram,
  Music,
  ShoppingCart,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Award,
  Heart,
  Star,
  Calendar as CalendarIcon,
  Package,
  TrendingUp,
  Gift,
  ArrowRight,
  CheckCircle,
  Timer,
  Target,
  UserPlus,
  CalendarDays,
  X,
  Plus,
  Minus,
  Building,
  Shield,
  MapPinIcon,
  User,
  BarChart3,
  Activity,
  TrendingUp as TrendingUpIcon,
  Repeat,
  Star as StarIcon,
  Crown,
  Zap,
  Flame,
  Trophy,
  AlertCircle,
  Download,
  RefreshCw,
  Smartphone,
  Watch,
  Scale,
  Utensils,
  Menu,
  Share,
} from "lucide-react";

// Declare gtag as a global variable if it exists on the window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
const gtag = typeof window !== "undefined" ? window.gtag : undefined;

export default function SinglePageApp() {
  // Suppress hydration warnings in development
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      const originalError = console.error;
      console.error = (...args) => {
        if (
          typeof args[0] === "string" &&
          args[0].includes("Warning: Text content did not match")
        ) {
          return;
        }
        if (
          typeof args[0] === "string" &&
          args[0].includes("Hydration failed")
        ) {
          return;
        }
        originalError.call(console, ...args);
      };
    }
  }, []);
  // Overlay States
  const [enrollOverlay, setEnrollOverlay] = useState(false);
  const [bookingOverlay, setBookingOverlay] = useState(false);
  const [cartOverlay, setCartOverlay] = useState(false);
  const [memberPortalOverlay, setMemberPortalOverlay] = useState(false);
  const [analyticsOverlay, setAnalyticsOverlay] = useState(false);

  // App States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Pilates Mat",
      price: 4450,
      quantity: 1,
      image:
        "/PilatesShopImages/PilatesMat.jpg",
      type: "physical",
    },
    {
      id: 2,
      name: "Resistance Bands Set",
      price: 2250,
      quantity: 2,
      image:
        "/PilatesShopImages/ResistanceBandsSet.jpg",
      type: "physical",
    },
  ]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedMembership, setSelectedMembership] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [instagramLoaded, setInstagramLoaded] = useState(false);
  const [membershipTab, setMembershipTab] = useState("individual");
  const [currentPortalTab, setCurrentPortalTab] = useState("dashboard");
  const [currentAnalyticsTab, setCurrentAnalyticsTab] = useState("progress");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Member Data (mock)
  const [memberData, setMemberData] = useState({
    name: "Sarah Johnson",
    memberSince: "January 2024",
    membershipType: "Premium",
    classesAttended: 24,
    classesRemaining: 4,
    loyaltyPoints: 2850,
    nextReward: 3000,
    upcomingClasses: [
      {
        date: "2024-03-20",
        time: "9:00 AM",
        instructor: "Bee",
        type: "Group Pilates",
      },
      {
        date: "2024-03-22",
        time: "11:00 AM",
        instructor: "Sarah",
        type: "Private Session",
      },
    ],
    classHistory: [
      {
        date: "2024-03-15",
        instructor: "Bee",
        type: "Group Pilates",
        rating: 5,
      },
      { date: "2024-03-13", instructor: "Mike", type: "Core Focus", rating: 4 },
      { date: "2024-03-11", instructor: "Bee", type: "Flexibility", rating: 5 },
    ],
    healthMetrics: {
      weight: 135,
      bodyFat: 18,
      muscleMass: 45,
      flexibility: 78,
      strength: 85,
      endurance: 72,
    },
    goals: [
      { name: "Lose 10 lbs", progress: 70, target: "June 2024" },
      { name: "Touch toes", progress: 85, target: "April 2024" },
      { name: "20 push-ups", progress: 60, target: "May 2024" },
    ],
  });

  // Handle client-side mounting to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);

    // Load Instagram widget after component mounts
    const timer = setTimeout(() => {
      setInstagramLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Check if hero buttons are out of view and show floating buttons
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const sections = ["home", "meet-bee", "testimonials", "faqs", "contact"];
      const scrollPosition = window.scrollY + 100;

      setShowFloatingButtons(window.scrollY > 800);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Prevent body scroll when overlay is open and close mobile menu
  React.useEffect(() => {
    const overlayOpen =
      enrollOverlay ||
      bookingOverlay ||
      cartOverlay ||
      memberPortalOverlay ||
      analyticsOverlay;
    if (overlayOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Close mobile menu when overlay opens
    if (overlayOpen) {
      setMobileMenuOpen(false);
    }
  }, [
    enrollOverlay,
    bookingOverlay,
    cartOverlay,
    memberPortalOverlay,
    analyticsOverlay,
    mobileMenuOpen,
  ]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu after navigation
    setMobileMenuOpen(false);
  };

  const updateCartQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Loading Spinner Component
  const LoadingSpinner = ({ size = 20 }: { size?: number }) => (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-b-2 border-current"
        style={{ width: size, height: size }}
      />
    </div>
  );

  // Enhanced Button Component with Loading State
  const EnhancedButton = ({
    children,
    onClick,
    loading: buttonLoading = false,
    className = "",
    disabled = false,
    ...props
  }: any) => (
    <button
      onClick={onClick}
      disabled={disabled || buttonLoading}
      className={`relative transition-all duration-300 hover:scale-105 active:scale-95 ${className} ${
        disabled || buttonLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {buttonLoading ? <LoadingSpinner /> : children}
    </button>
  );

  // Error Boundary Component
  const ErrorBoundary = ({
    children,
    fallback,
  }: {
    children: React.ReactNode;
    fallback: React.ReactNode;
  }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      const handleError = () => setHasError(true);
      window.addEventListener("error", handleError);
      return () => window.removeEventListener("error", handleError);
    }, []);

    if (hasError) {
      return <>{fallback}</>;
    }

    return <>{children}</>;
  };

  // Client-side Instagram Feed Component
  const InstagramFeed = () => {
    const [feedLoaded, setFeedLoaded] = useState(false);
    const [feedError, setFeedError] = useState(false);

    useEffect(() => {
      if (!isMounted || !instagramLoaded) return;

      try {
        // Load Elfsight script dynamically
        const script = document.createElement("script");
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setTimeout(() => setFeedLoaded(true), 2000);
        };
        script.onerror = () => {
          setFeedError(true);
        };
        document.head.appendChild(script);

        return () => {
          // Cleanup script on unmount
          try {
            const existingScript = document.querySelector(
              'script[src="https://static.elfsight.com/platform/platform.js"]',
            );
            if (existingScript) {
              existingScript.remove();
            }
          } catch (error) {
            console.warn("Error cleaning up Instagram script:", error);
          }
        };
      } catch (error) {
        console.warn("Error loading Instagram feed:", error);
        setFeedError(true);
      }
    }, [isMounted, instagramLoaded]);

    if (!isMounted || !instagramLoaded) {
      return (
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size={32} />
            <p className="mt-4 text-gray-600">Loading Instagram feed...</p>
          </div>
        </div>
      );
    }

    if (feedError) {
      return (
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Instagram className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600">Unable to load Instagram feed</p>
            <a
              href="https://instagram.com/the_hapi_bee/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700 font-medium mt-2 inline-block"
            >
              View on Instagram →
            </a>
          </div>
        </div>
      );
    }

    return (
      <ErrorBoundary
        fallback={
          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Instagram className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600">
                Instagram feed temporarily unavailable
              </p>
              <a
                href="https://instagram.com/the_hapi_bee/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 font-medium mt-2 inline-block"
              >
                View on Instagram →
              </a>
            </div>
          </div>
        }
      >
        <div className="w-full">
          <div
            className="elfsight-app-9c50c023-a35e-4c59-91b4-28120ab48c98"
            data-elfsight-app-lazy
          />
          {!feedLoaded && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <LoadingSpinner size={24} />
                <p className="mt-2 text-gray-600 text-sm">Loading posts...</p>
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>
    );
  };

  const membershipPlans = [
    {
      name: "Basic",
      price: "₱4,950",
      period: "/month",
      classes: "4 Classes",
      features: [
        "Group Classes",
        "Basic Nutrition Guide",
        "Equipment Included",
        "Community Access",
      ],
      popular: false,
      type: "individual",
    },
    {
      name: "Premium",
      price: "₱8,950",
      period: "/month",
      classes: "8 Classes + Nutrition",
      features: [
        "Group Classes",
        "1 Private Session",
        "Nutrition Consultation",
        "Meal Planning",
        "Priority Booking",
      ],
      popular: true,
      type: "individual",
    },
    {
      name: "Unlimited",
      price: "₱12,450",
      period: "/month",
      classes: "Unlimited",
      features: [
        "Unlimited Group Classes",
        "2 Private Sessions",
        "Monthly Nutrition Check-in",
        "Personalized Meal Plans",
        "VIP Support",
      ],
      popular: false,
      type: "individual",
    },
    {
      name: "Family Basic",
      price: "₱8,450",
      period: "/month",
      classes: "8 Classes (2 people)",
      features: [
        "Group Classes for 2",
        "Family Nutrition Guide",
        "Equipment Included",
        "Family Challenges",
      ],
      popular: false,
      type: "family",
    },
    {
      name: "Family Premium",
      price: "₱14,950",
      period: "/month",
      classes: "16 Classes + Nutrition",
      features: [
        "Group Classes for 2",
        "2 Private Sessions",
        "Family Nutrition Plan",
        "Kids Classes",
        "Priority Booking",
      ],
      popular: true,
      type: "family",
    },
  ];

  const digitalProducts = [
    {
      id: 7,
      name: "30-Day Pilates Program",
      price: 3950,
      image:
        "/PilatesShopImages/Pilates.jpg",
      type: "digital",
      description: "Complete video series with nutrition guide",
    },
    {
      id: 8,
      name: "Nutrition Meal Plans",
      price: 2450,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
      type: "digital",
      description: "12 weeks of personalized meal plans",
    },
    {
      id: 9,
      name: "Meditation & Mindfulness",
      price: 1950,
      image:
        "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=400",
      type: "digital",
      description: "Guided meditation videos and techniques",
    },
  ];

  const giftCertificates = [
    { id: 10, name: "1 Private Session", price: 6000, type: "gift" },
    { id: 11, name: "5-Class Package", price: 12500, type: "gift" },
    { id: 12, name: "₱5,000 Gift Card", price: 5000, type: "gift" },
    { id: 13, name: "₱12,500 Gift Card", price: 12500, type: "gift" },
  ];

  const subscriptionBoxes = [
    {
      id: 14,
      name: "Monthly Wellness Box",
      price: 2450,
      period: "/month",
      type: "subscription",
      description: "Curated wellness products, supplements, and workout gear",
    },
    {
      id: 15,
      name: "Quarterly Premium Box",
      price: 6450,
      period: "/quarter",
      type: "subscription",
      description:
        "Premium products, exclusive content, and personalized items",
    },
  ];

  const products = [
    {
      id: 3,
      name: "Premium Pilates Mat",
      price: 4450,
      image:
        "/PilatesShopImages/PilatesMat.jpg",
      type: "physical",
      stock: 15,
    },
    {
      id: 4,
      name: "Resistance Bands Set",
      price: 2250,
      image:
        "/PilatesShopImages/ResistanceBandsSet.jpg",
      type: "physical",
      stock: 8,
    },
    {
      id: 5,
      name: "Pilates Ball",
      price: 1750,
      image:
        "/PilatesShopImages/PilatesBalls.png",
      type: "physical",
      stock: 20,
    },
    {
      id: 6,
      name: "Foam Roller",
      price: 2750,
      image:
        "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&q=80&w=400",
      type: "physical",
      stock: 12,
    },
  ];

  const addToCart = (product: any) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...items, { ...product, quantity: 1 }];
      }
    });
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Bee transformed my approach to fitness. Her combination of Pilates and nutrition guidance helped me achieve results I never thought possible.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=200&h=200",
      achievement: "Lost 25lbs & gained core strength",
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "As a former athlete dealing with back issues, Bee's expertise in both movement and nutrition has been life-changing.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
      achievement: "Eliminated chronic back pain",
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      text: "The holistic approach here is unmatched. I'm stronger, more flexible, and have a completely new relationship with food.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
      achievement: "Improved posture & energy levels",
    },
  ];

  const instagramPosts = [
    {
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300&h=300",
      caption:
        "Morning flow to start the day right ✨ Finding balance in movement and breath #pilates #mindfulmovement #morningpractice",
      likes: 342,
      comments: 28,
    },
    {
      image:
        "https://images.unsplash.com/photo-1544966503-7cc36a8d5c82?auto=format&fit=crop&q=80&w=300&h=300",
      caption:
        "Core strength isn't just about abs - it's about stability, posture, and confidence 💪 #corepower #pilateslife #strongwomen",
      likes: 567,
      comments: 45,
    },
    {
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300&h=300",
      caption:
        "Nutrition tip: Start your day with intention and nourishment 🥗 Colorful plates = happy bodies #wellness #nutrition #healthyeating",
      likes: 289,
      comments: 19,
    },
    {
      image:
        "https://images.unsplash.com/photo-1506629905228-b50909eae2e1?auto=format&fit=crop&q=80&w=300&h=300",
      caption:
        "Behind the scenes of our group class prep ✨ Setting intentions for today's practice #pilatesinstructor #preparation #mindfulness",
      likes: 412,
      comments: 33,
    },
    {
      image:
        "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=300&h=300",
      caption:
        "Sunday self-care session 🧘‍♀️ How are you nourishing your body today? Taking time to breathe and reset #selfcare #sundayvibes",
      likes: 634,
      comments: 52,
    },
    {
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300&h=300",
      caption:
        "Recovery is just as important as the workout 💆‍♀️ Gentle stretches to restore and rejuvenate #selfcare #recovery #stretching",
      likes: 378,
      comments: 24,
    },
  ];

  const faqData = [
    {
      question: "What should I bring to my first class?",
      answer:
        "Just bring yourself! We provide all equipment including mats, props, and water. Wear comfortable workout attire that allows you to move freely.",
    },
    {
      question: "Do I need prior Pilates experience?",
      answer:
        "Not at all! Our classes cater to all levels, from complete beginners to advanced practitioners. Bee will provide modifications and progressions as needed.",
    },
    {
      question: "What's included in the nutrition consultation?",
      answer:
        "Our nutrition consultation includes a comprehensive assessment of your current eating habits, personalized meal planning, supplement recommendations, and ongoing support for sustainable lifestyle changes.",
    },
    {
      question: "Can I book private sessions?",
      answer:
        "Yes! We offer one-on-one Pilates sessions and private nutrition consultations. These can be scheduled through our booking system or by contacting us directly.",
    },
    {
      question: "What safety protocols do you follow?",
      answer:
        "We maintain the highest safety standards with regular equipment sanitization, proper ventilation, and adherence to all health guidelines. Class sizes are kept small for personalized attention.",
    },
    {
      question: "Do you offer online classes?",
      answer:
        "Yes! We provide virtual sessions for those who prefer to practice from home. All you need is a mat and some space to move.",
    },
  ];

  const blogPosts = [
    {
      title: "5 Essential Pilates Exercises for Beginners",
      excerpt:
        "Start your Pilates journey with these foundational movements that build core strength and improve posture.",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400",
      date: "March 15, 2024",
      readTime: "5 min read",
    },
    {
      title: "Nutrition Myths Debunked: What Really Works",
      excerpt:
        "Separating fact from fiction in the world of nutrition and wellness.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
      date: "March 12, 2024",
      readTime: "7 min read",
    },
    {
      title: "Mind-Body Connection: The Science Behind Pilates",
      excerpt:
        "Understanding how Pilates creates lasting changes in both physical and mental well-being.",
      image:
        "BlogPosts/MindBody.png",
      date: "March 10, 2024",
      readTime: "6 min read",
    },
  ];

  const availableSlots = [
    {
      time: "9:00 AM",
      instructor: "Bee",
      location: "Studio A",
      available: true,
      waitlist: 0,
    },
    {
      time: "11:00 AM",
      instructor: "Sarah",
      location: "Studio B",
      available: true,
      waitlist: 2,
    },
    {
      time: "1:00 PM",
      instructor: "Bee",
      location: "Studio A",
      available: false,
      waitlist: 5,
    },
    {
      time: "3:00 PM",
      instructor: "Mike",
      location: "Studio C",
      available: true,
      waitlist: 0,
    },
    {
      time: "5:00 PM",
      instructor: "Bee",
      location: "Studio A",
      available: true,
      waitlist: 1,
    },
    {
      time: "7:00 PM",
      instructor: "Sarah",
      location: "Studio B",
      available: false,
      waitlist: 3,
    },
  ];

  const studioLocations = [
    {
      name: "Downtown Studio",
      address:
        "123 Wellness Street, Mind & Body District, Makati City, Metro Manila",
      phone: "+63 (917) 123-4567",
      image: "/PilatesStudioImages/Studio1.jpeg",
      amenities: [
        "Private Showers",
        "Changing Rooms",
        "Equipment Storage",
        "Reception Area",
      ],
    },
    {
      name: "Uptown Studio",
      address: "456 Serenity Ave, Wellness Quarter, Quezon City, Metro Manila",
      phone: "+63 (917) 123-4568",
      image: "/PilatesStudioImages/Studio2.jpeg",
      amenities: [
        "Outdoor Terrace",
        "Juice Bar",
        "Meditation Room",
        "Parking Available",
      ],
    },
  ];

  const certifications = [
    {
      name: "BASI Pilates",
      logo: "Certificates/BASI.png",
      color: "bg-pink-100",
    },
    {
      name: "Registered Nutritionist Dietitian",
      logo: "Certificates/NAD.png",
      color: "bg-green-100",
    },
    {
      name: "STOTT Pilates",
      logo: "Certificates/STOTT.png",
      color: "bg-blue-100",
    },
    {
      name: "Yoga Alliance",
      logo: "Certificates/YogaAlliance.png",
      color: "bg-orange-100",
    },
  ];

  // Mobile-Responsive Overlay Component
  const Overlay = ({
    isOpen,
    onClose,
    children,
    title,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
        <div
          className="bg-white rounded-xl w-full max-w-6xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden flex flex-col"
          style={{
            maxHeight:
              "calc(100vh - max(1rem, env(safe-area-inset-top)) - max(1rem, env(safe-area-inset-bottom)))",
          }}
        >
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
            {title && (
              <h2 className="text-lg sm:text-2xl font-light tracking-wider uppercase flex-1 truncate pr-4">
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0 touch-target"
              aria-label="Close"
            >
              <X size={18} className="sm:w-4 sm:h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-auto overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Prevent server-side rendering for the entire component to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="font-sans bg-white text-gray-900">
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size={48} />
            <p className="mt-4 text-gray-600">Loading PWB Pilates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-white text-gray-900">
      {/* Mobile-Optimized Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>
        <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 lg:py-8">
          <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
            {/* Mobile Layout */}
            <div className="flex md:hidden w-full justify-between items-center">
              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/30 transition-all"
                aria-label="Toggle mobile menu"
              >
                <Menu size={20} />
              </button>

              {/* Mobile PWB Logo */}
              <button
                onClick={() => scrollToSection("home")}
                className="text-2xl sm:text-3xl font-light tracking-[0.3em] text-white hover:text-pink-400 transition-colors"
              >
                PWB
              </button>

              {/* Mobile Cart */}
              <button
                onClick={() => setCartOverlay(true)}
                className="relative w-11 h-11 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/30 transition-all"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={18} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-medium">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Desktop Layout - Hidden on Mobile */}
            <div className="hidden md:flex justify-between items-center w-full">
              {/* Left Section */}
              <div className="flex items-center space-x-8 lg:space-x-16">
                <button
                  onClick={() => scrollToSection("meet-bee")}
                  className={`text-sm lg:text-base font-medium tracking-[0.15em] hover:opacity-70 transition-all uppercase text-white relative ${
                    activeSection === "meet-bee"
                      ? "after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-pink-600"
                      : ""
                  }`}
                >
                  Meet Bee
                </button>

                <button
                  onClick={() => scrollToSection("testimonials")}
                  className={`text-sm lg:text-base font-medium tracking-[0.15em] hover:opacity-70 transition-all uppercase text-white relative ${
                    activeSection === "testimonials"
                      ? "after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-pink-600"
                      : ""
                  }`}
                >
                  Testimonials
                </button>
              </div>

              {/* Center Section - PWB */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-3xl lg:text-4xl font-light tracking-[0.3em] text-white hover:text-pink-400 transition-colors"
                >
                  PWB
                </button>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4 lg:space-x-8">
                <button
                  onClick={() => scrollToSection("faqs")}
                  className={`text-sm lg:text-lg font-semibold tracking-[0.2em] hover:opacity-70 transition-all uppercase text-white relative ${
                    activeSection === "faqs"
                      ? "after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-pink-600"
                      : ""
                  }`}
                >
                  FAQs
                </button>

                <button
                  onClick={() => scrollToSection("contact")}
                  className={`text-sm lg:text-lg font-semibold tracking-[0.2em] hover:opacity-70 transition-all uppercase text-white relative ${
                    activeSection === "contact"
                      ? "after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-pink-600"
                      : ""
                  }`}
                >
                  Contact
                </button>

                {isLoggedIn && (
                  <button
                    onClick={() => setMemberPortalOverlay(true)}
                    className="text-white hover:text-pink-400 transition-colors p-2"
                    title="Member Portal"
                  >
                    <User size={18} />
                  </button>
                )}

                <div className="w-px h-6 bg-white/30 mx-2"></div>

                {/* Social Media Icons */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-400 transition-colors p-2"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://instagram.com/the_hapi_bee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-400 transition-colors p-2"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-400 transition-colors p-2"
                  aria-label="Follow us on TikTok"
                >
                  <Music size={18} />
                </a>
                <button
                  onClick={() => setCartOverlay(true)}
                  className="relative text-white hover:text-pink-400 transition-colors p-2"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart size={18} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-medium">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-md transition-all duration-300 ${
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <button
                onClick={() => scrollToSection("home")}
                className="text-3xl font-light tracking-[0.3em] text-white"
              >
                PWB
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Close mobile menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
              <button
                onClick={() => scrollToSection("meet-bee")}
                className={`text-left text-2xl font-light tracking-[0.2em] text-white hover:text-pink-400 transition-all uppercase py-4 border-b border-white/10 ${
                  activeSection === "meet-bee" ? "text-pink-400" : ""
                }`}
              >
                Meet Bee
              </button>

              <button
                onClick={() => scrollToSection("testimonials")}
                className={`text-left text-2xl font-light tracking-[0.2em] text-white hover:text-pink-400 transition-all uppercase py-4 border-b border-white/10 ${
                  activeSection === "testimonials" ? "text-pink-400" : ""
                }`}
              >
                Testimonials
              </button>

              <button
                onClick={() => scrollToSection("faqs")}
                className={`text-left text-2xl font-light tracking-[0.2em] text-white hover:text-pink-400 transition-all uppercase py-4 border-b border-white/10 ${
                  activeSection === "faqs" ? "text-pink-400" : ""
                }`}
              >
                FAQs
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className={`text-left text-2xl font-light tracking-[0.2em] text-white hover:text-pink-400 transition-all uppercase py-4 border-b border-white/10 ${
                  activeSection === "contact" ? "text-pink-400" : ""
                }`}
              >
                Contact
              </button>

              {/* Mobile Menu Action Buttons */}
              <div className="space-y-4 pt-8">
                <button
                  onClick={() => {
                    setEnrollOverlay(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 px-6 rounded-full text-lg font-medium tracking-[0.2em] uppercase transition-all"
                >
                  Enroll Now
                </button>
                <button
                  onClick={() => {
                    setBookingOverlay(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full border border-white text-white hover:bg-white hover:text-black py-4 px-6 rounded-full text-lg font-medium tracking-[0.2em] uppercase transition-all"
                >
                  Book Class
                </button>
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      setMemberPortalOverlay(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full border border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white py-4 px-6 rounded-full text-lg font-medium tracking-[0.2em] uppercase transition-all"
                  >
                    Member Portal
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Footer - Social Links */}
            <div className="flex justify-center space-x-8 p-8 border-t border-white/10">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 hover:text-white transition-all"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/the_hapi_bee/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 hover:text-white transition-all"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 hover:text-white transition-all"
                aria-label="Follow us on TikTok"
              >
                <Music size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* WhatsApp Quick Contact Button - Mobile Optimized */}
      <a
        href="https://wa.me/639171234567?text=Hi!%20I'm%20interested%20in%20PWB%20Pilates%20classes.%20Can%20you%20help%20me%20get%20started?"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 group flex items-center justify-center"
        title="Chat with us on WhatsApp"
        style={{
          bottom: "max(1rem, env(safe-area-inset-bottom))",
          left: "max(1rem, env(safe-area-inset-left))",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="transition-transform group-hover:scale-110"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488" />
        </svg>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </a>

      {/* Floating Action Buttons - Mobile Optimized */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 flex flex-col space-y-3 sm:space-y-4 transition-all duration-500 ${
          showFloatingButtons
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
        style={{
          bottom: "max(1rem, env(safe-area-inset-bottom))",
          right: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <button
          onClick={() => setEnrollOverlay(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 min-h-[44px]"
          aria-label="Enroll in PWB Pilates classes"
        >
          <UserPlus size={16} />
          <span className="font-medium text-sm sm:text-base hidden sm:inline">
            Enroll Now
          </span>
          <span className="font-medium text-sm sm:hidden">Enroll</span>
        </button>
        <button
          onClick={() => setBookingOverlay(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 min-h-[44px]"
          aria-label="Book a Pilates class"
        >
          <CalendarDays size={16} />
          <span className="font-medium text-sm sm:text-base hidden sm:inline">
            Book Class
          </span>
          <span className="font-medium text-sm sm:hidden">Book</span>
        </button>
      </div>

      {/* Hero Section - Mobile Optimized */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden"
        itemScope
        itemType="https://schema.org/FitnessCenter"
        style={{
  minHeight: "var(--app-min-height)",
  paddingTop: "max(4rem, env(safe-area-inset-top))",
  paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
}}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80"
            alt="Professional Pilates studio in Metro Manila with modern equipment and serene atmosphere"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div
          className="relative z-20 flex flex-col justify-center items-center h-full text-white px-4 sm:px-8"
          style={{
  minHeight: "var(--app-min-height)",
  paddingTop: "max(4rem, env(safe-area-inset-top))",
  paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
}}
        >
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Responsive Hero Title */}
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[120px] font-extralight tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] uppercase leading-none"
              itemProp="name"
            >
              pilates
            </h1>

            {/* Responsive Subtitle */}
            <p
              className="text-lg sm:text-xl lg:text-2xl font-light tracking-[0.3em] sm:tracking-[0.4em] lg:tracking-[0.5em] mt-3 sm:mt-6"
              itemProp="slogan"
            >
              WITH BEE
            </p>

            {/* Mobile-Optimized Action Buttons */}
            <div className="mt-8 sm:mt-12 lg:mt-20 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 w-full max-w-md sm:max-w-none">
              <EnhancedButton
                onClick={() => setEnrollOverlay(true)}
                className="w-full sm:w-auto border border-white px-8 sm:px-12 lg:px-20 py-4 sm:py-4 text-sm sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] hover:bg-white hover:text-black transition-all uppercase font-light min-h-[48px] flex items-center justify-center"
                loading={loading}
                aria-label="Enroll in PWB Pilates classes - Start your wellness journey"
              >
                Enroll Now
              </EnhancedButton>
              <EnhancedButton
                onClick={() => setBookingOverlay(true)}
                className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-8 sm:px-12 lg:px-20 py-4 sm:py-4 text-sm sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] transition-all uppercase font-light min-h-[48px] flex items-center justify-center"
                loading={loading}
                aria-label="Book a Pilates class at PWB Studio"
              >
                Book Class
              </EnhancedButton>
            </div>

            {/* Responsive Tagline */}
            <p
              className="mt-12 sm:mt-16 lg:mt-32 tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase font-light"
              itemProp="description"
            >
              MOVE · NOURISH · TRANSFORM
            </p>
          </div>
        </div>

        {/* Schema.org structured data elements */}
        <meta
          itemProp="address"
          content="123 Wellness Street, Makati City, Metro Manila"
        />
        <meta itemProp="telephone" content="+63-917-123-4567" />
        <meta itemProp="email" content="hello@pwbpilates.com" />
        <meta itemProp="priceRange" content="₱₱" />
      </section>

      {/* Enroll Now Overlay */}
      <Overlay
        isOpen={enrollOverlay}
        onClose={() => setEnrollOverlay(false)}
        title="Welcome to PWB"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              Begin your wellness journey with our comprehensive pre-assessment
            </p>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);

              // Simulate API call
              await new Promise((resolve) => setTimeout(resolve, 2000));

              // Track conversion for analytics
              if (typeof gtag !== "undefined") {
                gtag("event", "form_submit", {
                  event_category: "engagement",
                  event_label: "enrollment_form",
                });
              }

              alert(
                "Thank you for enrolling! We'll contact you within 24 hours to schedule your complimentary consultation.",
              );
              setLoading(false);
              setEnrollOverlay(false);
            }}
            className="space-y-8 text-gray-900"
          >
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <Users className="mr-2 text-pink-600" size={20} />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-medium">
                    Email Address *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Health & Fitness Assessment */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <Activity className="mr-2 text-pink-600" size={20} />
                Health & Fitness Assessment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="experience" className="font-medium">
                    Pilates Experience *
                  </Label>
                  <select
                    id="experience"
                    name="experience"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                    required
                  >
                    <option value="">Select your level</option>
                    <option value="beginner">Complete Beginner</option>
                    <option value="some">Some Experience (1-6 months)</option>
                    <option value="intermediate">
                      Intermediate (6+ months)
                    </option>
                    <option value="advanced">Advanced (2+ years)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="fitnessLevel" className="font-medium">
                    Overall Fitness Level *
                  </Label>
                  <select
                    id="fitnessLevel"
                    name="fitnessLevel"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                    required
                  >
                    <option value="">Select level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly-active">Lightly Active</option>
                    <option value="moderately-active">Moderately Active</option>
                    <option value="very-active">Very Active</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="healthConditions" className="font-medium">
                  Health Conditions & Injuries
                </Label>
                <Textarea
                  id="healthConditions"
                  name="healthConditions"
                  rows={3}
                  placeholder="Please list any current or past injuries, surgeries, chronic conditions, or physical limitations we should be aware of..."
                  className="mt-1"
                />
              </div>
            </div>

            {/* Goals & Wearable Integration */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <Target className="mr-2 text-pink-600" size={20} />
                Goals & Tracking Preferences
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goals" className="font-medium">
                    Primary Fitness Goals *
                  </Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    rows={3}
                    placeholder="What do you hope to achieve? (e.g., improve flexibility, build core strength, reduce stress, lose weight, recover from injury, etc.)"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="font-medium">
                    Do you use any fitness tracking devices?
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="wearables"
                        value="fitbit"
                        className="mr-2"
                      />
                      <Smartphone size={16} className="mr-1" />
                      Fitbit
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="wearables"
                        value="apple-watch"
                        className="mr-2"
                      />
                      <Watch size={16} className="mr-1" />
                      Apple Watch
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="wearables"
                        value="garmin"
                        className="mr-2"
                      />
                      <Activity size={16} className="mr-1" />
                      Garmin
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="wearables"
                        value="other"
                        className="mr-2"
                      />
                      Other Device
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <EnhancedButton
                type="submit"
                loading={loading}
                className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white text-lg py-4 px-12 rounded-lg font-medium"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "Complete Pre-Assessment & Schedule Consultation"}
              </EnhancedButton>
              <p className="text-sm text-gray-600 mt-3">
                We'll review your information and contact you within 24 hours to
                schedule your complimentary consultation
              </p>
            </div>
          </form>
        </div>
      </Overlay>

      {/* Advanced Booking System Overlay */}
      <Overlay
        isOpen={bookingOverlay}
        onClose={() => setBookingOverlay(false)}
        title="Advanced Booking System"
      >
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <CalendarIcon className="mr-2 text-pink-600" size={20} />
                Select Date
              </h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
                disabled={(date) => date < new Date()}
              />

              {/* Recurring Options */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-3 flex items-center">
                  <Repeat className="mr-2 text-blue-600" size={16} />
                  Recurring Booking Options
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recurring"
                      value="none"
                      className="mr-2"
                      defaultChecked
                    />
                    One-time booking
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recurring"
                      value="weekly"
                      className="mr-2"
                    />
                    Same time weekly (4 weeks)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recurring"
                      value="monthly"
                      className="mr-2"
                    />
                    Same time monthly (3 months)
                  </label>
                </div>
              </div>
            </div>

            {/* Time Slots & Advanced Features */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <Clock className="mr-2 text-pink-600" size={20} />
                  Available Time Slots
                </h3>
                {selectedDate ? (
                  <div className="space-y-3">
                    {availableSlots.map((slot, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          slot.available
                            ? "border-gray-200 hover:border-pink-600 hover:bg-pink-50"
                            : "border-orange-200 bg-orange-50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-lg">
                              {slot.time}
                            </div>
                            <div className="text-sm text-gray-600">
                              with {slot.instructor}
                            </div>
                            <div className="text-sm text-gray-500">
                              {slot.location}
                            </div>
                          </div>
                          <div className="text-right">
                            {slot.available ? (
                              <span className="text-green-600 font-medium">
                                Available
                              </span>
                            ) : (
                              <div className="text-center">
                                <span className="text-orange-600 font-medium block">
                                  Full
                                </span>
                                <button className="text-xs text-blue-600 hover:underline mt-1">
                                  Join Waitlist ({slot.waitlist})
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Please select a date to view available time slots
                  </p>
                )}
              </div>

              {/* Cancellation Policy */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium mb-2 flex items-center text-yellow-800">
                  <AlertCircle className="mr-2" size={16} />
                  Cancellation Policy
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Cancel up to 24 hours before class for full credit</li>
                  <li>• 12-24 hours: 50% credit to your account</li>
                  <li>
                    • Less than 12 hours: No refund (emergency exceptions
                    considered)
                  </li>
                  <li>• Recurring bookings can be paused anytime</li>
                </ul>
              </div>

              <Button
                className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg py-4 rounded-lg font-medium"
                disabled={!selectedDate}
                onClick={() => {
                  alert(
                    "Class booked successfully! You'll receive a confirmation email shortly.",
                  );
                  setBookingOverlay(false);
                }}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </Overlay>

      {/* Enhanced Shopping Cart Overlay - Mobile Responsive */}
      <Overlay
        isOpen={cartOverlay}
        onClose={() => setCartOverlay(false)}
        title="Shopping Cart"
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <ShoppingCart className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-lg mx-auto sm:mx-0 flex-shrink-0"
                    />
                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <h4 className="font-medium text-sm sm:text-base">
                        {item.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        ₱{item.price.toLocaleString()}
                      </p>
                      {item.type && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize mt-1 inline-block">
                          {item.type}
                        </span>
                      )}
                    </div>

                    {/* Mobile Layout: Stacked */}
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors touch-target"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors touch-target"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-center sm:text-right">
                        <p className="font-medium text-sm sm:text-base">
                          ₱{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg sm:text-xl font-medium">
                  <span>Total:</span>
                  <span>₱{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Button className="bg-gray-600 hover:bg-gray-700 text-white touch-target py-3 text-sm sm:text-base">
                  Continue Shopping
                </Button>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white touch-target py-3 text-sm sm:text-base">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </Overlay>

      {/* Member Portal Overlay - Mobile Responsive */}
      <Overlay
        isOpen={memberPortalOverlay}
        onClose={() => setMemberPortalOverlay(false)}
        title="Member Portal"
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Mobile Tab Navigation */}
          <div className="lg:hidden bg-gray-50 border-b border-gray-200">
            <div className="flex overflow-x-auto p-2 space-x-1">
              <button
                onClick={() => setCurrentPortalTab("dashboard")}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[100px] touch-target ${
                  currentPortalTab === "dashboard"
                    ? "bg-pink-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BarChart3 className="inline mr-1" size={14} />
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPortalTab("bookings")}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[100px] touch-target ${
                  currentPortalTab === "bookings"
                    ? "bg-pink-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CalendarIcon className="inline mr-1" size={14} />
                Bookings
              </button>
              <button
                onClick={() => setCurrentPortalTab("progress")}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[100px] touch-target ${
                  currentPortalTab === "progress"
                    ? "bg-pink-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <TrendingUpIcon className="inline mr-1" size={14} />
                Progress
              </button>
              <button
                onClick={() => setCurrentPortalTab("loyalty")}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[100px] touch-target ${
                  currentPortalTab === "loyalty"
                    ? "bg-pink-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Crown className="inline mr-1" size={14} />
                Loyalty
              </button>
              <button
                onClick={() => setCurrentPortalTab("referrals")}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[100px] touch-target ${
                  currentPortalTab === "referrals"
                    ? "bg-pink-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Users className="inline mr-1" size={14} />
                Referrals
              </button>
              <button
                onClick={() => setAnalyticsOverlay(true)}
                className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 min-w-[100px] touch-target"
              >
                <Activity className="inline mr-1" size={14} />
                Analytics
              </button>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 bg-gray-50 p-6 border-r border-gray-200">
            <div className="space-y-2">
              <button
                onClick={() => setCurrentPortalTab("dashboard")}
                className={`w-full text-left p-3 rounded-lg transition-colors touch-target ${
                  currentPortalTab === "dashboard"
                    ? "bg-pink-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <BarChart3 className="inline mr-2" size={16} />
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPortalTab("bookings")}
                className={`w-full text-left p-3 rounded-lg transition-colors touch-target ${
                  currentPortalTab === "bookings"
                    ? "bg-pink-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <CalendarIcon className="inline mr-2" size={16} />
                My Bookings
              </button>
              <button
                onClick={() => setCurrentPortalTab("progress")}
                className={`w-full text-left p-3 rounded-lg transition-colors touch-target ${
                  currentPortalTab === "progress"
                    ? "bg-pink-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <TrendingUpIcon className="inline mr-2" size={16} />
                Progress Tracking
              </button>
              <button
                onClick={() => setCurrentPortalTab("loyalty")}
                className={`w-full text-left p-3 rounded-lg transition-colors touch-target ${
                  currentPortalTab === "loyalty"
                    ? "bg-pink-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <Crown className="inline mr-2" size={16} />
                Loyalty Rewards
              </button>
              <button
                onClick={() => setCurrentPortalTab("referrals")}
                className={`w-full text-left p-3 rounded-lg transition-colors touch-target ${
                  currentPortalTab === "referrals"
                    ? "bg-pink-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <Users className="inline mr-2" size={16} />
                Referral Program
              </button>
              <button
                onClick={() => setAnalyticsOverlay(true)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-200 touch-target"
              >
                <Activity className="inline mr-2" size={16} />
                Advanced Analytics
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6">
            {currentPortalTab === "dashboard" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-pink-100 rounded-lg flex-shrink-0">
                        <CalendarIcon className="text-pink-600" size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xl sm:text-2xl font-bold">
                          {memberData.classesRemaining}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Classes Remaining
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <Trophy className="text-blue-600" size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xl sm:text-2xl font-bold">
                          {memberData.loyaltyPoints}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Loyalty Points
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                        <Flame className="text-green-600" size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xl sm:text-2xl font-bold">
                          {memberData.classesAttended}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Classes Attended
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                    <h3 className="font-semibold mb-4 text-base sm:text-lg">
                      Upcoming Classes
                    </h3>
                    <div className="space-y-3">
                      {memberData.upcomingClasses.map((class_, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
                        >
                          <div className="min-w-0">
                            <div className="font-medium text-sm sm:text-base">
                              {class_.type}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              with {class_.instructor}
                            </div>
                          </div>
                          <div className="text-left sm:text-right text-xs sm:text-sm flex-shrink-0">
                            <div className="font-medium">{class_.date}</div>
                            <div className="text-gray-600">{class_.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                    <h3 className="font-semibold mb-4 text-base sm:text-lg">
                      Current Goals
                    </h3>
                    <div className="space-y-4">
                      {memberData.goals.map((goal, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-sm sm:text-base truncate pr-2">
                              {goal.name}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">
                              {goal.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Target: {goal.target}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPortalTab === "bookings" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    My Bookings
                  </h3>
                  <Button
                    onClick={() => setBookingOverlay(true)}
                    className="bg-pink-600 hover:bg-pink-700 text-white w-full sm:w-auto touch-target"
                  >
                    Book New Class
                  </Button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="font-medium text-base sm:text-lg">
                      Upcoming Classes
                    </h4>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {memberData.upcomingClasses.map((class_, index) => (
                      <div key={index} className="p-4">
                        <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                          <div className="min-w-0">
                            <div className="font-medium text-sm sm:text-base">
                              {class_.type}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              {class_.date} at {class_.time} with{" "}
                              {class_.instructor}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full sm:w-auto touch-target text-xs sm:text-sm"
                            >
                              Reschedule
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full sm:w-auto text-red-600 border-red-600 hover:bg-red-50 touch-target text-xs sm:text-sm"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="font-medium">Class History</h4>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {memberData.classHistory.map((class_, index) => (
                      <div
                        key={index}
                        className="p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{class_.type}</div>
                          <div className="text-sm text-gray-600">
                            {class_.date} with {class_.instructor}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                size={16}
                                className={
                                  i < class_.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentPortalTab === "loyalty" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Loyalty Rewards</h3>
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-3xl font-bold">
                        {memberData.loyaltyPoints}
                      </div>
                      <div className="text-purple-100">Current Points</div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white/20 rounded-full h-3">
                        <div
                          className="bg-white h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${(memberData.loyaltyPoints / memberData.nextReward) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-sm text-purple-100 mt-1">
                        {memberData.nextReward - memberData.loyaltyPoints}{" "}
                        points to next reward
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h4 className="font-semibold mb-4">Available Rewards</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Free Class</div>
                          <div className="text-sm text-gray-600">
                            1,000 points
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-pink-600 hover:bg-pink-700"
                        >
                          Redeem
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Private Session</div>
                          <div className="text-sm text-gray-600">
                            2,500 points
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-pink-600 hover:bg-pink-700"
                        >
                          Redeem
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg opacity-50">
                        <div>
                          <div className="font-medium">Wellness Retreat</div>
                          <div className="text-sm text-gray-600">
                            5,000 points
                          </div>
                        </div>
                        <Button size="sm" disabled>
                          Need {5000 - memberData.loyaltyPoints} more
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h4 className="font-semibold mb-4">Earn More Points</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Attend a class</span>
                        <span className="font-medium text-green-600">
                          +50 points
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Complete a program</span>
                        <span className="font-medium text-green-600">
                          +200 points
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Refer a friend</span>
                        <span className="font-medium text-green-600">
                          +500 points
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Write a review</span>
                        <span className="font-medium text-green-600">
                          +100 points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPortalTab === "referrals" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Referral Program</h3>
                  <p className="text-blue-100">
                    Share the wellness journey and earn rewards!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h4 className="font-semibold mb-4">Your Referral Code</h4>
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-pink-600">
                        SARAH2024
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Share this code with friends
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <Share className="mr-2" size={16} />
                      Share Link
                    </Button>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h4 className="font-semibold mb-4">Referral Benefits</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Gift className="text-green-600" size={16} />
                        </div>
                        <div>
                          <div className="font-medium">Friend gets 20% off</div>
                          <div className="text-sm text-gray-600">
                            First month discount
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="text-blue-600" size={16} />
                        </div>
                        <div>
                          <div className="font-medium">You get 500 points</div>
                          <div className="text-sm text-gray-600">
                            When they join
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Crown className="text-purple-600" size={16} />
                        </div>
                        <div>
                          <div className="font-medium">
                            Free class at 5 referrals
                          </div>
                          <div className="text-sm text-gray-600">
                            Milestone reward
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold mb-4">Your Referrals (3)</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Emily Johnson</div>
                        <div className="text-sm text-gray-600">
                          Joined January 2024
                        </div>
                      </div>
                      <div className="text-green-600 font-medium">
                        +500 points
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Mike Chen</div>
                        <div className="text-sm text-gray-600">
                          Joined February 2024
                        </div>
                      </div>
                      <div className="text-green-600 font-medium">
                        +500 points
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Lisa Park</div>
                        <div className="text-sm text-gray-600">
                          Joined March 2024
                        </div>
                      </div>
                      <div className="text-green-600 font-medium">
                        +500 points
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Overlay>

      {/* Advanced Analytics Overlay */}
      <Overlay
        isOpen={analyticsOverlay}
        onClose={() => setAnalyticsOverlay(false)}
        title="Advanced Analytics"
      >
        <div className="flex h-full">
          {/* Analytics Sidebar */}
          <div className="w-64 bg-gray-50 p-6">
            <div className="space-y-2">
              <button
                onClick={() => setCurrentAnalyticsTab("progress")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${currentAnalyticsTab === "progress" ? "bg-pink-600 text-white" : "hover:bg-gray-200"}`}
              >
                <TrendingUp className="inline mr-2" size={16} />
                Progress Tracking
              </button>
              <button
                onClick={() => setCurrentAnalyticsTab("nutrition")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${currentAnalyticsTab === "nutrition" ? "bg-pink-600 text-white" : "hover:bg-gray-200"}`}
              >
                <Utensils className="inline mr-2" size={16} />
                Nutrition Log
              </button>
              <button
                onClick={() => setCurrentAnalyticsTab("attendance")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${currentAnalyticsTab === "attendance" ? "bg-pink-600 text-white" : "hover:bg-gray-200"}`}
              >
                <CalendarIcon className="inline mr-2" size={16} />
                Class Attendance
              </button>
              <button
                onClick={() => setCurrentAnalyticsTab("wearables")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${currentAnalyticsTab === "wearables" ? "bg-pink-600 text-white" : "hover:bg-gray-200"}`}
              >
                <Watch className="inline mr-2" size={16} />
                Wearable Data
              </button>
            </div>
          </div>

          {/* Analytics Content */}
          <div className="flex-1 p-6">
            {currentAnalyticsTab === "progress" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center space-x-3">
                      <Scale className="text-blue-600" size={24} />
                      <div>
                        <div className="text-2xl font-bold">
                          {memberData.healthMetrics.weight} lbs
                        </div>
                        <div className="text-sm text-gray-600">
                          Current Weight
                        </div>
                        <div className="text-xs text-green-600">
                          -5 lbs this month
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center space-x-3">
                      <Activity className="text-red-600" size={24} />
                      <div>
                        <div className="text-2xl font-bold">
                          {memberData.healthMetrics.bodyFat}%
                        </div>
                        <div className="text-sm text-gray-600">Body Fat</div>
                        <div className="text-xs text-green-600">
                          -2% this month
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center space-x-3">
                      <Zap className="text-yellow-600" size={24} />
                      <div>
                        <div className="text-2xl font-bold">
                          {memberData.healthMetrics.muscleMass} lbs
                        </div>
                        <div className="text-sm text-gray-600">Muscle Mass</div>
                        <div className="text-xs text-green-600">
                          +2 lbs this month
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold mb-4">Fitness Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Flexibility</span>
                        <span className="text-sm text-gray-600">
                          {memberData.healthMetrics.flexibility}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${memberData.healthMetrics.flexibility}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Strength</span>
                        <span className="text-sm text-gray-600">
                          {memberData.healthMetrics.strength}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-red-500 h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${memberData.healthMetrics.strength}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Endurance</span>
                        <span className="text-sm text-gray-600">
                          {memberData.healthMetrics.endurance}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${memberData.healthMetrics.endurance}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentAnalyticsTab === "nutrition" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Nutrition Logging</h3>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    <Plus className="mr-2" size={16} />
                    Log Meal
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-green-600">
                      1,847
                    </div>
                    <div className="text-sm text-gray-600">Calories Today</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-blue-600">127g</div>
                    <div className="text-sm text-gray-600">Protein</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      45g
                    </div>
                    <div className="text-sm text-gray-600">Fat</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      203g
                    </div>
                    <div className="text-sm text-gray-600">Carbs</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold mb-4">Today's Meals</h4>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="font-medium">Breakfast</div>
                      <div className="text-sm text-gray-600">
                        Oatmeal with berries and protein powder
                      </div>
                      <div className="text-xs text-gray-500">387 calories</div>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="font-medium">Lunch</div>
                      <div className="text-sm text-gray-600">
                        Grilled chicken salad with avocado
                      </div>
                      <div className="text-xs text-gray-500">542 calories</div>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <div className="font-medium">Snack</div>
                      <div className="text-sm text-gray-600">
                        Greek yogurt with nuts
                      </div>
                      <div className="text-xs text-gray-500">186 calories</div>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <div className="font-medium">Dinner</div>
                      <div className="text-sm text-gray-600">
                        Salmon with quinoa and vegetables
                      </div>
                      <div className="text-xs text-gray-500">732 calories</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentAnalyticsTab === "attendance" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                    <div className="text-3xl font-bold text-pink-600">24</div>
                    <div className="text-sm text-gray-600">
                      Classes This Month
                    </div>
                    <div className="text-xs text-green-600">
                      +6 from last month
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                    <div className="text-3xl font-bold text-blue-600">89%</div>
                    <div className="text-sm text-gray-600">Attendance Rate</div>
                    <div className="text-xs text-green-600">Above average</div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                    <div className="text-3xl font-bold text-purple-600">15</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                    <div className="text-xs text-blue-600">
                      Personal record!
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold mb-4">Class Type Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Group Pilates</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="w-16 bg-pink-500 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm">18 classes</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Private Sessions</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="w-6 bg-blue-500 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm">4 sessions</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Nutrition Consultations</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="w-4 bg-green-500 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm">2 sessions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentAnalyticsTab === "wearables" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">
                    Wearable Integration
                  </h3>
                  <p className="text-blue-100">
                    Connect your devices for comprehensive health tracking
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h4 className="font-semibold mb-4">Connected Devices</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Watch className="text-green-600" size={20} />
                          <span>Apple Watch Series 8</span>
                        </div>
                        <span className="text-green-600 text-sm">
                          Connected
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Activity className="text-gray-400" size={20} />
                          <span>Fitbit Charge 5</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Connect
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="text-gray-400" size={20} />
                          <span>MyFitnessPal</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h4 className="font-semibold mb-4">Today's Data</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Steps</span>
                        <span className="font-medium">8,247 / 10,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Heart Rate (avg)</span>
                        <span className="font-medium">68 bpm</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sleep</span>
                        <span className="font-medium">7h 23m</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Active Minutes</span>
                        <span className="font-medium">87 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-red-600">142</div>
                    <div className="text-sm text-gray-600">Avg Heart Rate</div>
                    <div className="text-xs text-green-600">
                      During workouts
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-blue-600">487</div>
                    <div className="text-sm text-gray-600">Calories Burned</div>
                    <div className="text-xs text-gray-500">Last workout</div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      92%
                    </div>
                    <div className="text-sm text-gray-600">Recovery Score</div>
                    <div className="text-xs text-green-600">Ready to train</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Overlay>

      {/* Enhanced Membership Plans Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 tracking-widest uppercase">
              Membership Plans
            </h2>
            <p className="text-lg text-gray-600">
              Choose the perfect plan for your wellness journey
            </p>

            {/* Plan Type Tabs */}
            <div className="flex justify-center mt-8">
              <div className="bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setMembershipTab("individual")}
                  className={`px-6 py-2 rounded-md transition-colors ${membershipTab === "individual" ? "bg-pink-600 text-white" : "text-gray-600"}`}
                >
                  Individual Plans
                </button>
                <button
                  onClick={() => setMembershipTab("family")}
                  className={`px-6 py-2 rounded-md transition-colors ${membershipTab === "family" ? "bg-pink-600 text-white" : "text-gray-600"}`}
                >
                  Family Plans
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPlans
              .filter((plan) => plan.type === membershipTab)
              .map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-lg shadow-lg p-8 ${plan.popular ? "ring-2 ring-pink-600 transform scale-105" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-light uppercase tracking-wider mb-2">
                      {plan.name}
                    </h3>
                    <div className="text-4xl font-light mb-2">
                      {plan.price}
                      <span className="text-lg text-gray-600">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-gray-600">{plan.classes}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="text-pink-600 mr-3" size={16} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-pink-600 hover:bg-pink-700" : "bg-black hover:bg-gray-800"} text-white`}
                    onClick={() => {
                      setSelectedMembership(plan.name);
                      setEnrollOverlay(true);
                    }}
                  >
                    Choose Plan
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Meet Bee Section */}
      <section id="meet-bee" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-light mb-16 tracking-widest text-center uppercase">
            Meet Bee
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <img
                src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=600&h=600"
                alt="Bee - Certified Pilates Instructor"
                className="w-full h-[600px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-8">
                <Award className="text-pink-600" size={32} />
                <h3 className="text-2xl font-light uppercase tracking-wider">
                  Certified Professional
                </h3>
              </div>

              <p className="text-lg leading-relaxed text-gray-700">
                Bee is a Certified BASI Pilates Instructor and a board certified
                Nutritionist Dietitian (RND) with a passion for mindful movement
                and sustainable wellness. Her unique approach blends the
                strength and precision of Pilates with the science of nutrition
                to help you achieve lasting results from the inside out.
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                By combining movement and proper nourishment, Bee empowers you
                to feel stronger, more energized, and fully supported in your
                wellness journey. Whether you're looking to improve posture,
                build core strength, or make healthier lifestyle choices, Bee is
                here to guide you with clarity, care, and a whole lot of good
                energy.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="mx-auto mb-2 text-pink-600" size={24} />
                  <div className="font-semibold">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Heart className="mx-auto mb-2 text-pink-600" size={24} />
                  <div className="font-semibold">8 Years</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Feed Section */}
          <div className="border-t border-gray-200 pt-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Instagram className="text-pink-600" size={28} />
                <h3 className="text-3xl font-light uppercase tracking-wider">
                  Follow the Journey
                </h3>
              </div>
              <p className="text-gray-600">
                Get daily inspiration and wellness tips on Instagram
              </p>
              <a
                href="https://instagram.com/the_hapi_bee/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-pink-600 hover:text-pink-700 font-medium"
              >
                @the_hapi_bee
              </a>
            </div>

            {/* Client-side Instagram Feed */}
            <div className="w-full relative">
              <InstagramFeed />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced E-commerce Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 tracking-widest uppercase">
              Wellness Shop
            </h2>
            <p className="text-lg text-gray-600">
              Premium products to support your wellness journey
            </p>
          </div>

          {/* Product Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Physical Products */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Package className="mr-2 text-pink-600" size={20} />
                Physical Products
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden group"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs">
                        {product.stock} left
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-2">{product.name}</h4>
                      <p className="text-xl font-light text-pink-600 mb-3">
                        ₱{product.price.toLocaleString()}
                      </p>
                      <Button
                        className="w-full bg-black hover:bg-pink-600 text-white"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital Products */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Download className="mr-2 text-blue-600" size={20} />
                Digital Products
              </h3>
              <div className="space-y-6">
                {digitalProducts.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="relative overflow-hidden h-32">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
                        Digital
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-light text-blue-600">
                          ₱{product.price.toLocaleString()}
                        </span>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => addToCart(product)}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gift Certificates & Subscriptions */}
            <div className="space-y-8">
              {/* Gift Certificates */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Gift className="mr-2 text-green-600" size={20} />
                  Gift Certificates
                </h3>
                <div className="space-y-4">
                  {giftCertificates.map((gift, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-lg p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{gift.name}</h4>
                          <p className="text-2xl font-light text-green-600">
                            ₱{gift.price.toLocaleString()}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => addToCart(gift)}
                        >
                          <Gift size={16} className="mr-1" />
                          Gift
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscription Boxes */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <RefreshCw className="mr-2 text-purple-600" size={20} />
                  Subscription Boxes
                </h3>
                <div className="space-y-4">
                  {subscriptionBoxes.map((box, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-lg p-4"
                    >
                      <h4 className="font-medium mb-2">{box.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {box.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-light text-purple-600">
                          ₱{box.price.toLocaleString()}
                          {box.period}
                        </span>
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => addToCart(box)}
                        >
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Locations Section */}
      <section id="locations" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 tracking-widest uppercase">
              Studio Locations
            </h2>
            <p className="text-lg text-gray-600">
              Find the studio nearest to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studioLocations.map((location, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Building className="mr-2 text-pink-600" size={20} />
                    {location.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPinIcon className="text-gray-500 mt-1" size={16} />
                      <p className="text-gray-600 text-sm">
                        {location.address}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="text-gray-500" size={16} />
                      <p className="text-gray-600 text-sm">{location.phone}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Amenities:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {location.amenities.map((amenity, i) => (
                        <div
                          key={i}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle
                            className="text-pink-600 mr-1"
                            size={12}
                          />
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button
                      className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`,
                          "_blank",
                        )
                      }
                    >
                      <MapPinIcon size={16} className="mr-2" />
                      View on Map
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        window.open(
                          `https://wa.me/639171234567?text=Hi!%20I'd%20like%20to%20know%20more%20about%20the%20${location.name}%20location.`,
                          "_blank",
                        )
                      }
                    >
                      <Phone size={16} className="mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Affiliations Section */}
      <section id="certifications" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 tracking-widest uppercase">
              Certifications & Affiliations
            </h2>
            <p className="text-lg text-gray-600">
              Trusted by leading wellness organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`${cert.color} rounded-lg p-6 mb-4 group-hover:scale-105 transition-all duration-300 shadow-md`}
                >
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    className="w-full h-20 object-cover mx-auto rounded"
                  />
                </div>
                <h3 className="font-medium text-sm text-gray-800">
                  {cert.name}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-800 px-4 py-2 rounded-full">
              <Shield className="text-green-600" size={16} />
              <span className="text-sm font-medium">
                All instructors are certified and insured
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 tracking-widest uppercase">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Real transformations from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <article
                key={index}
                className="bg-gray-50 rounded-lg p-8 text-center"
                itemScope
                itemType="https://schema.org/Review"
              >
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} - PWB Pilates client testimonial`}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  loading="lazy"
                />
                <div
                  className="flex justify-center mb-4"
                  itemProp="reviewRating"
                  itemScope
                  itemType="https://schema.org/Rating"
                >
                  <meta
                    itemProp="ratingValue"
                    content={testimonial.rating.toString()}
                  />
                  <meta itemProp="bestRating" content="5" />
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-current"
                      size={16}
                    />
                  ))}
                </div>
                <blockquote
                  className="text-gray-700 mb-4 italic"
                  itemProp="reviewBody"
                >
                  "{testimonial.text}"
                </blockquote>
                <footer>
                  <cite className="font-medium not-italic" itemProp="author">
                    {testimonial.name}
                  </cite>
                  <p className="text-sm text-pink-600 font-medium">
                    {testimonial.achievement}
                  </p>
                </footer>
                <meta itemProp="itemReviewed" content="PWB Pilates Studio" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 tracking-widest uppercase">
              Wellness Insights
            </h2>
            <p className="text-lg text-gray-600">
              Expert tips and guidance for your wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <CalendarIcon size={14} className="mr-2" />
                    {post.date}
                    <span className="mx-2">•</span>
                    <Timer size={14} className="mr-2" />
                    {post.readTime}
                  </div>
                  <h3 className="text-xl font-medium mb-3 group-hover:text-pink-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-pink-600 font-medium group-hover:text-pink-700">
                    Read More <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-light mb-4 uppercase tracking-wider">
            Stay Connected
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Get weekly wellness tips, nutrition insights, and exclusive offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={newsletter}
              onChange={(e) => setNewsletter(e.target.value)}
              className="flex-1 bg-white text-gray-900"
              required
            />
            <Button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-8"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-4xl font-light mb-16 tracking-widest text-center uppercase">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-light mb-16 tracking-widest text-center uppercase">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light mb-8 uppercase tracking-wider">
                  Get in Touch
                </h3>
                <p className="text-lg leading-relaxed text-gray-300 mb-8">
                  Ready to start your wellness journey? We'd love to hear from
                  you. Reach out to schedule your consultation or ask any
                  questions about our services.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="text-pink-600" size={24} />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-300">+63 (917) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="text-pink-600" size={24} />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-300">hello@pwbpilates.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="text-pink-600" size={24} />
                  <div>
                    <div className="font-medium">Studio Location</div>
                    <div className="text-gray-300">
                      123 Wellness Street
                      <br />
                      Mind & Body District
                      <br />
                      Makati City, Metro Manila
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Clock className="text-pink-600" size={24} />
                  <div>
                    <div className="font-medium">Studio Hours</div>
                    <div className="text-gray-300">
                      Mon - Fri: 6:00 AM - 8:00 PM
                      <br />
                      Saturday: 7:00 AM - 6:00 PM
                      <br />
                      Sunday: 8:00 AM - 4:00 PM
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    className="text-pink-600 hover:text-pink-400 transition-colors"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="https://instagram.com/the_hapi_bee/"
                    className="text-pink-600 hover:text-pink-400 transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://tiktok.com"
                    className="text-pink-600 hover:text-pink-400 transition-colors"
                  >
                    <Music size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-light mb-6 uppercase tracking-wider">
                Send us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactFirstName" className="text-gray-300">
                      First Name
                    </Label>
                    <Input
                      id="contactFirstName"
                      name="firstName"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactLastName" className="text-gray-300">
                      Last Name
                    </Label>
                    <Input
                      id="contactLastName"
                      name="lastName"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactEmail" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    id="contactEmail"
                    name="email"
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactSubject" className="text-gray-300">
                    Subject
                  </Label>
                  <Input
                    id="contactSubject"
                    name="subject"
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactMessage" className="text-gray-300">
                    Message
                  </Label>
                  <Textarea
                    id="contactMessage"
                    name="message"
                    rows={5}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Tell us about your wellness goals or any questions you have..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
