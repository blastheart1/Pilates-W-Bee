"use client"

import React from "react"

interface LoadingSpinnerProps {
  size?: number
}

export default function LoadingSpinner({ size = 20 }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-b-2 border-current"
        style={{ width: size, height: size }}
      />
    </div>
  )
}