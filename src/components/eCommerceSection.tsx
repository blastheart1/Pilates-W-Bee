"use client"

import React from "react"
import { Package, Download, Gift, RefreshCw } from "lucide-react"
import { Button } from "../components/ui/button"
import { Product } from "../hooks/useCart"

interface ECommerceSectionProps {
  addToCart: (product: Product) => void
}

export default function ECommerceSection({ addToCart }: ECommerceSectionProps) {
  // Physical Products
  const products: Product[] = [
    { id: 3, name: "Premium Pilates Mat", price: 4450, image: "/PilatesShopImages/PilatesMat.jpg", stock: 15, type: "physical" },
    { id: 4, name: "Resistance Bands Set", price: 2250, image: "/PilatesShopImages/ResistanceBandsSet.jpg", stock: 8, type: "physical" },
    { id: 5, name: "Pilates Ball", price: 1750, image: "/PilatesShopImages/PilatesBalls.png", stock: 20, type: "physical" },
    { id: 6, name: "Foam Roller", price: 2750, image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&q=80&w=400", stock: 12, type: "physical" },
  ]

  // Digital Products
  const digitalProducts: Product[] = [
    { id: 7, name: "30-Day Pilates Program", price: 3950, image: "/PilatesShopImages/Pilates.jpg", description: "Complete video series with nutrition guide", type: "digital" },
    { id: 8, name: "Nutrition Meal Plans", price: 2450, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400", description: "12 weeks of personalized meal plans", type: "digital" },
    { id: 9, name: "Meditation & Mindfulness", price: 1950, image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=400", description: "Guided meditation videos and techniques", type: "digital" },
  ]

  // Gift Certificates
  const giftCertificates: Product[] = [
    { id: 10, name: "1 Private Session", price: 6000, image: "/PilatesShopImages/Gift1.jpg", type: "gift" },
    { id: 11, name: "5-Class Package", price: 12500, image: "/PilatesShopImages/Gift2.jpg", type: "gift" },
    { id: 12, name: "₱5,000 Gift Card", price: 5000, image: "/PilatesShopImages/Gift3.jpg", type: "gift" },
    { id: 13, name: "₱12,500 Gift Card", price: 12500, image: "/PilatesShopImages/Gift4.jpg", type: "gift" },
  ]

  // Subscription Boxes
  const subscriptionBoxes: Product[] = [
    { id: 14, name: "Monthly Wellness Box", price: 2450, period: "/month", description: "Curated wellness products, supplements, and workout gear", image: "/PilatesShopImages/MonthlyBox.jpg", type: "subscription" },
    { id: 15, name: "Quarterly Premium Box", price: 6450, period: "/quarter", description: "Premium products, exclusive content, and personalized items", image: "/PilatesShopImages/QuarterlyBox.jpg", type: "subscription" },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4 tracking-widest uppercase">Wellness Shop</h2>
          <p className="text-lg text-gray-600">Premium products to support your wellness journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Physical Products */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Package className="mr-2 text-pink-600" size={20} /> Physical Products
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                  <div className="relative overflow-hidden h-48">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    {product.stock !== undefined && <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs">{product.stock} left</div>}
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-2">{product.name}</h4>
                    <p className="text-xl font-light text-pink-600 mb-3">₱{product.price.toLocaleString()}</p>
                    <Button className="w-full bg-black hover:bg-pink-600 text-white" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Products */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Download className="mr-2 text-blue-600" size={20} /> Digital Products
            </h3>
            <div className="space-y-6">
              {digitalProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative overflow-hidden h-32">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white rounded-full px-2 py-1 text-xs">Digital</div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-light text-blue-600">₱{product.price.toLocaleString()}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => addToCart(product)}>Buy Now</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gift Certificates & Subscription Boxes */}
          <div className="space-y-8">
            {/* Gift Certificates */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Gift className="mr-2 text-green-600" size={20} /> Gift Certificates
              </h3>
              <div className="space-y-4">
                {giftCertificates.map((gift) => (
                  <div key={gift.id} className="bg-white rounded-lg shadow-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{gift.name}</h4>
                        <p className="text-2xl font-light text-green-600">₱{gift.price.toLocaleString()}</p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => addToCart(gift)}>
                        <Gift size={16} className="mr-1" /> Gift
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Boxes */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <RefreshCw className="mr-2 text-purple-600" size={20} /> Subscription Boxes
              </h3>
              <div className="space-y-4">
                {subscriptionBoxes.map((box) => (
                  <div key={box.id} className="bg-white rounded-lg shadow-lg p-4">
                    <h4 className="font-medium mb-2">{box.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{box.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-light text-purple-600">₱{box.price.toLocaleString()}{box.period}</span>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => addToCart(box)}>Subscribe</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
