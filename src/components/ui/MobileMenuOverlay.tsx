"use client"

import { Facebook, Instagram, Music, ChevronDown, X } from "lucide-react"
import { useEffect, useState } from "react"
import GoogleLoginButton from "../GoogleLoginButton"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface MobileMenuOverlayProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  scrollToSection: (section: string) => void
  activeSection: string
  setMemberPortalOverlay: (open: boolean) => void
  handleLogout: () => void
}

export default function MobileMenuOverlay({
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
  activeSection,
  setMemberPortalOverlay,
  handleLogout,
}: MobileMenuOverlayProps) {
  const [jumpOpen, setJumpOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const jumpSections = [
    "meet-bee",
    "locations",
    "certifications",
    "testimonials",
    "faqs",
    "contact",
  ]

  // Track Supabase auth state
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    }

    checkSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div
      className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-md transition-all duration-300 z-50 ${
        mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-end items-center p-7 border-b border-black/10">
          <button onClick={() => setMobileMenuOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 space-y-6">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  setMemberPortalOverlay(true)
                  setMobileMenuOpen(false)
                }}
                className="mt-8 w-full border border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white py-4 px-6 rounded-full text-lg font-medium tracking-[0.2em] uppercase transition-all"
              >
                Member Portal
              </button>

              <button
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                  setIsLoggedIn(false)
                }}
                className="w-full border border-white/20 text-white hover:bg-white/10 py-4 px-6 rounded-full text-lg font-medium tracking-[0.2em] uppercase transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <GoogleLoginButton
              onSuccess={() => setIsLoggedIn(true)}
              onError={(err) => alert(err)}
            />
          )}

          {/* Jump to dropdown */}
          <div className="w-full">
            <button
              onClick={() => setJumpOpen(!jumpOpen)}
              className="flex items-center justify-between w-full text-lg font-medium tracking-[0.2em] uppercase text-white py-3 border-b border-black/10"
            >
              Jump to:
              <ChevronDown
                className={`ml-2 transition-transform ${jumpOpen ? "rotate-180" : ""}`}
                size={18}
              />
            </button>

            {jumpOpen && (
              <div className="flex flex-col mt-2 space-y-2 text-sm">
                {jumpSections.map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      scrollToSection(section)
                      setMobileMenuOpen(false)
                    }}
                    className={`text-left text-base font-light tracking-[0.15em] text-white hover:text-pink-400 transition-all uppercase py-2 ${
                      activeSection === section ? "text-pink-400" : ""
                    }`}
                  >
                    {section.replace("-", " ")}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          <button
            onClick={() => {
              scrollToSection("about")
              setMobileMenuOpen(false)
            }}
            className={`w-full text-center text-lg font-medium tracking-[0.2em] uppercase py-3 text-white hover:text-pink-400 transition-all border-b border-white/10 ${
              activeSection === "about" ? "text-pink-400" : ""
            }`}
          >
            About
          </button>
        </div>

        {/* Footer */}
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
  )
}
