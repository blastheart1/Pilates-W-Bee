import { useState, useMemo, useCallback } from "react"

// Product type: same as CartItem without quantity
export interface Product {
  id: number
  name: string
  price: number
  image: string
  type?: string
  stock?: number
  description?: string
  period?: string
}

export interface CartItem extends Product {
  quantity: number
}

export default function useCart(initialItems: CartItem[] = []) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems)

  const addToCart = useCallback((product: Omit<CartItem, "quantity">) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id)
      if (existingItem) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...items, { ...product, quantity: 1 }]
    })
  }, [])

  const updateCartQuantity = useCallback((id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  )

  const cartItemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  )

  return {
    cartItems,
    addToCart,
    updateCartQuantity,
    cartTotal,
    cartItemCount,
    setCartItems,
  }
}
