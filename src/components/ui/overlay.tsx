"use client"

import React from "react"
import { X } from "lucide-react"

interface OverlayProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export default function Overlay({ isOpen, onClose, children, title }: OverlayProps) {
  if (!isOpen) return null

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
        <div className="flex-1 overflow-auto overscroll-contain">{children}</div>
      </div>
    </div>
  )
}
