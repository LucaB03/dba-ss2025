"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Package, ShoppingBag, Gift, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"


// Typen für Inventarartikel
export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Inventar laden
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId")
      if (!userId) {
        router.push("/login")
        return
      }
      fetch("/api/inventar", {
        headers: { "x-user-id": userId },
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data.inventar || [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [router])

  // Tabs für die Filterung
  const tabs = [
    { id: "all", label: "All Items" },
    { id: "digital", label: "Digital" },
    { id: "spielgegenstand", label: "Game Objects" },
    { id: "merchandise", label: "Merchandise" },
    { id: "abonnement", label: "Subscriptions" },
  ]

  const filteredItems = activeTab === "all" ? items : items.filter((item) => item.typ === activeTab)

  // Labels und Icons für die Typen
  const typeLabels: Record<string, string> = {
    digital: "Digital",
    spielgegenstand: "Game Object",
    merchandise: "Merchandise",
    abonnement: "Subscription",
  }

  // Icons für die Typen
  const typeIcons: Record<string, React.ReactNode> = {
    digital: <Gift className="h-10 w-10 text-blue-500" />,
    spielgegenstand: <Package className="h-10 w-10 text-green-500" />,
    merchandise: <ShoppingBag className="h-10 w-10 text-purple-500" />,
    abonnement: <Calendar className="h-10 w-10 text-amber-500" />,
  }

  if (loading) {
    return <div className="container mx-auto py-8 px-4">Lädt…</div>
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
            <div key={item.artikel_id} className="bg-white border rounded-lg shadow-sm">
              <div className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{item.bezeichnung}</h3>
                    <p className="text-gray-600 text-sm">{item.beschreibung}</p>
                  </div>
                  {typeIcons[item.typ]}
                </div>
              </div>
              <div className="p-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium">{typeLabels[item.typ]}</span>
                  </div>
                  {/* Hier kannst du weitere Felder wie quantity, effects etc. ergänzen, falls sie im Inventar vorhanden sind */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
