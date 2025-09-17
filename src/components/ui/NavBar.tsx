"use client"

import { useState } from "react"
import {
  Menu,
  X,
  ShoppingCart,
} from "lucide-react"
import MobileMenuOverlay from "./MobileMenuOverlay"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [memberPortalOverlay, setMemberPortalOverlay] = useState(false)
  const [cartOverlay, setCartOverlay] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  const scrollToSection = (section: string) => {
    setActiveSection(section)
    // TODO: add smooth scroll logic
  }

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>

      <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 lg:py-8">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          {/* Mobile Layout */}
          <div className="flex md:hidden w-full justify-between items-center">
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/30 transition-all"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* PWB Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl sm:text-3xl font-light tracking-[0.3em] text-white hover:text-pink-400 transition-colors"
            >
              PWB
            </button>

            {/* Cart */}
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

          {/* Desktop Layout */}
          {/* TODO: Add desktop navigation links */}
        </div>
      </div>

      {/* Mobile Overlay */}
      <MobileMenuOverlay
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        setMemberPortalOverlay={setMemberPortalOverlay}
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </nav>
  )
}
