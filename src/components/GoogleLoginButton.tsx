"use client"

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface GoogleLoginButtonProps {
  onSuccess: () => void
  onError: (error: string) => void
}

export default function GoogleLoginButton({ onSuccess, onError }: GoogleLoginButtonProps) {
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Use popup to prevent full page redirect
        redirectTo: undefined,
      },
    })

    if (error) {
      onError(error.message)
    } else {
      // Wait for session update
      const { data: sessionData } = await supabase.auth.getSession()
      if (sessionData.session) {
        onSuccess()
      }
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="mt-8 w-full border border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white py-4 px-6 rounded-full text-lg font-medium tracking-[0.2em] uppercase transition-all"
    >
      Sign in with Google
    </button>
  )
}
