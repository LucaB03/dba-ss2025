"use client"

import type React from "react"

import { useState } from "react"
import { Package, ShoppingBag, Gift, Calendar } from "lucide-react"

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("all")

  const items = [
    {
      id: 1,
      name: "Premium Skin Pack",
      description: "Exclusive character skins for your player profile",
      type: "digital",
      quantity: 1,
      effects: "Cosmetic changes to your character appearance",
    },
    {
      id: 2,
      name: "Power Boost",
      description: "Temporary boost to your character's abilities",
      type: "spielgegenstand",
      quantity: 3,
      effects: "+20% speed, +15% strength for 24 hours",
    },
    {
      id: 3,
      name: "Genesis T-Shirt",
      description: "Official Genesis Studios merchandise",
      type: "merchandise",
      quantity: 1,
      effects: "No in-game effects",
      status: "Shipped",
    },
    {
      id: 4,
      name: "Pro Membership",
      description: "Monthly subscription with premium benefits",
      type: "abonnement",
      quantity: 1,
      effects: "Access to exclusive content, monthly item drops, ad-free experience",
      expiresAt: "2023-12-31",
    },
    {
      id: 5,
      name: "Extra Lives Pack",
      description: "Bundle of extra lives for challenging game modes",
      type: "digital",
      quantity: 10,
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

  const typeIcons: Record<string, React.ReactNode> = {
    digital: <Gift className="h-10 w-10 text-blue-500" />,
    spielgegenstand: <Package className="h-10 w-10 text-green-500" />,
    merchandise: <ShoppingBag className="h-10 w-10 text-purple-500" />,
    abonnement: <Calendar className="h-10 w-10 text-amber-500" />,
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-gray-500">Manage your purchased items and subscriptions</p>
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white border rounded-lg shadow-sm">
              <div className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  {typeIcons[item.type]}
                </div>
              </div>
              <div className="p-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium">{typeLabels[item.type]}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Quantity:</span>
                    <span className="font-medium">{item.quantity}</span>
                  </div>
                  {item.expiresAt && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Expires:</span>
                      <span className="font-medium">{item.expiresAt}</span>
                    </div>
                  )}
                  {item.status && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className="font-medium">{item.status}</span>
                    </div>
                  )}
                  <div className="mt-2 text-sm text-gray-500">
                    <p className="line-clamp-2">{item.effects}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                {item.type === "spielgegenstand" && (
                  <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Use Item</button>
                )}
                {item.type === "digital" && (
                  <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Activate</button>
                )}
                {item.type === "merchandise" && (
                  <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Track Order</button>
                )}
                {item.type === "abonnement" && (
                  <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                    Manage Subscription
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
