"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import MobileMenuOverlay from "../components/ui/MobileMenuOverlay"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [memberPortalOverlay, setMemberPortalOverlay] = useState(false)

  // Check session on mount
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(!!data.session)
    }

    checkSession()

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
  }

  const scrollToSection = (section: string) => {
    console.log("Scrolling to", section)
  }

  return (
    <div>
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="p-4 bg-pink-600 text-white"
      >
        Open Mobile Menu
      </button>

      <MobileMenuOverlay
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
        activeSection="about"
        setMemberPortalOverlay={setMemberPortalOverlay}
        handleLogout={handleLogout}
      />

      {memberPortalOverlay && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center text-white text-2xl">
          Member Portal Content Here
        </div>
      )}
    </div>
  )
}
