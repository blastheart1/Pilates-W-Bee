// /components/ui/enhanced-button.tsx

"use client"

import React from "react"
import LoadingSpinner from "../ui/loading-spinner"

interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  onClick?: () => void
  loading?: boolean
  className?: string
}

export default function EnhancedButton({
  children,
  onClick,
  loading = false,
  className = "",
  disabled = false,
  ...props
}: EnhancedButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative transition-all duration-300 hover:scale-105 active:scale-95 ${className} ${
        disabled || loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  )
}
