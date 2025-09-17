"use client"

import React from "react"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import Overlay from "../components/ui/overlay"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  type?: string
}

interface CartOverlayProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  updateCartQuantity: (id: number, change: number) => void
  cartTotal: number
}

export default function CartOverlay({
  isOpen,
  onClose,
  cartItems,
  updateCartQuantity,
  cartTotal,
}: CartOverlayProps) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose} title="Shopping Cart">
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
                    <h4 className="font-medium text-sm sm:text-base">{item.name}</h4>
                    <p className="text-gray-600 text-sm">₱{item.price.toLocaleString()}</p>
                    {item.type && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize mt-1 inline-block">
                        {item.type}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors touch-target"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
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
  )
}
