"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("all")

  const items = [
    {
      id: 1,
      name: "Premium Skin Pack",
      description: "Exclusive character skins for your player profile",
      price: 9.99,
      type: "digital",
      available: true,
      effects: "Cosmetic changes to your character appearance",
    },
    {
      id: 2,
      name: "Power Boost",
      description: "Temporary boost to your character's abilities",
      price: 4.99,
      type: "spielgegenstand",
      available: true,
      effects: "+20% speed, +15% strength for 24 hours",
    },
    {
      id: 3,
      name: "Genesis T-Shirt",
      description: "Official Genesis Studios merchandise",
      price: 24.99,
      type: "merchandise",
      available: true,
      effects: "No in-game effects",
    },
    {
      id: 4,
      name: "Pro Membership",
      description: "Monthly subscription with premium benefits",
      price: 14.99,
      type: "abonnement",
      available: true,
      effects: "Access to exclusive content, monthly item drops, ad-free experience",
    },
    {
      id: 5,
      name: "Legendary Weapon",
      description: "Rare in-game weapon with special abilities",
      price: 19.99,
      type: "spielgegenstand",
      available: true,
      effects: "High damage, special attack animations, unique sound effects",
    },
    {
      id: 6,
      name: "Extra Lives Pack",
      description: "Bundle of extra lives for challenging game modes",
      price: 7.99,
      type: "digital",
      available: true,
      effects: "+10 extra lives in all game modes",
    },
  ]

  const tabs = [
    { id: "all", label: "All Items" },
    { id: "digital", label: "Digital" },
    { id: "spielgegenstand", label: "Game Objects" },
    { id: "merchandise", label: "Merchandise" },
    { id: "abonnement", label: "Subscriptions" },
  ]

  const filteredItems = activeTab === "all" ? items : items.filter((item) => item.type === activeTab)

  const typeLabels: Record<string, string> = {
    digital: "Digital",
    spielgegenstand: "Game Object",
    merchandise: "Merchandise",
    abonnement: "Subscription",
  }

  const typeColors: Record<string, string> = {
    digital: "bg-blue-100 text-blue-800",
    spielgegenstand: "bg-green-100 text-green-800",
    merchandise: "bg-purple-100 text-purple-800",
    abonnement: "bg-amber-100 text-amber-800",
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
          <p className="text-gray-500">
            Browse and purchase digital items, game objects, merchandise, and subscriptions
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === tab.id ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-4xl font-bold text-gray-300">{item.name.charAt(0)}</div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[item.type]}`}
                  >
                    {typeLabels[item.type]}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <p className="line-clamp-2">{item.effects}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-bold">${item.price.toFixed(2)}</div>
                  <button className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
