"use client"

import React, { useState, useEffect } from "react"
import { Instagram } from "lucide-react"
import LoadingSpinner from "../components/ui/loading-spinner"
import ErrorBoundary from "../components/ui/error-boundary"

const OwnerInstagramFeed: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [instagramLoaded, setInstagramLoaded] = useState(false)
  const [feedLoaded, setFeedLoaded] = useState(false)
  const [feedError, setFeedError] = useState(false)

  // Handle client-side mounting to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)

    const timer = setTimeout(() => {
      setInstagramLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Load Instagram widget script
  useEffect(() => {
    if (!isMounted || !instagramLoaded) return

    try {
      const script = document.createElement("script")
      script.src = "https://static.elfsight.com/platform/platform.js"
      script.async = true
      script.defer = true
      script.onload = () => setTimeout(() => setFeedLoaded(true), 2000)
      script.onerror = () => setFeedError(true)
      document.head.appendChild(script)

      return () => {
        const existingScript = document.querySelector(
          'script[src="https://static.elfsight.com/platform/platform.js"]',
        )
        if (existingScript) existingScript.remove()
      }
    } catch (error) {
      console.warn("Error loading Instagram feed:", error)
      setFeedError(true)
    }
  }, [isMounted, instagramLoaded])

  if (!isMounted || !instagramLoaded) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size={32} />
          <p className="mt-4 text-gray-600">Loading Instagram feed...</p>
        </div>
      </div>
    )
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
    )
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Instagram className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600">Instagram feed temporarily unavailable</p>
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
      <div className="w-full relative">
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
  )
}

export default OwnerInstagramFeed
