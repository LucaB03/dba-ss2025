"use client"

import { useState, useEffect } from "react"
import { Package, ArrowRight, RefreshCcw, User, Calendar, Euro } from "lucide-react"
import Link from "next/link"
import { getAllOrders, updateOrderStatus } from "@/lib/actions"

// Typen für Bestellpositionen und Bestellungen
type OrderPosition = {
  artikelId: number
  quantity: number
}

// Typen für Bestellungen mit Details
type OrderWithDetails = {
  bestellung_id: number
  benutzerkonto_id: number | null
  spielerprofil_id: number | null
  bestelldatum: Date
  status: "offen" | "verpackt" | "versandt" | "abgeschlossen"
  positionen: OrderPosition[]
  customerName?: string
  customerEmail?: string
  totalAmount?: number
}

// Bestellungen-Seite
export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderWithDetails["status"] | "all">("all")
  const [orders, setOrders] = useState<OrderWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null)

  // Bestellungen laden
  useEffect(() => {
    loadOrders()
  }, [])

  // Bestellungen laden
  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await getAllOrders()
      setOrders(data)
    } catch (error) {
      console.error("Error loading orders:", error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  // Status aktualisieren
  const handleStatusUpdate = async (bestellungId: number, newStatus: OrderWithDetails["status"]) => {
    try {
      setUpdatingStatus(bestellungId)
      const result = await updateOrderStatus(bestellungId, newStatus)

      if (result.success) {
        // Update local state
        setOrders((prevOrders) =>
            prevOrders.map((order) => (order.bestellung_id === bestellungId ? { ...order, status: newStatus } : order)),
        )
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update order status")
    } finally {
      setUpdatingStatus(null)
    }
  }

  if (loading) {
    return (
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCcw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Loading orders...</p>
            </div>
          </div>
        </div>
    )
  }

  if (orders.length === 0) {
    return (
        <div className="container mx-auto py-8 px-4">
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">There are no orders to display at the moment.</p>
          </div>
        </div>
    )
  }

  // Tabs für die Filterung
  const tabs = [
    { id: "all", label: "All Orders", count: orders.length },
    { id: "offen", label: "Open", count: orders.filter((o) => o.status === "offen").length },
    { id: "verpackt", label: "Packed", count: orders.filter((o) => o.status === "verpackt").length },
    { id: "versandt", label: "Shipped", count: orders.filter((o) => o.status === "versandt").length },
    { id: "abgeschlossen", label: "Completed", count: orders.filter((o) => o.status === "abgeschlossen").length },
  ] as const

  // Farben und Labels für die Status
  const statusColors: Record<OrderWithDetails["status"], string> = {
    offen: "bg-blue-100 text-blue-800 border-blue-200",
    verpackt: "bg-yellow-100 text-yellow-800 border-yellow-200",
    versandt: "bg-purple-100 text-purple-800 border-purple-200",
    abgeschlossen: "bg-green-100 text-green-800 border-green-200",
  }

  //  Labels für die Status
  const statusLabels: Record<OrderWithDetails["status"], string> = {
    offen: "Open",
    verpackt: "Packed",
    versandt: "Shipped",
    abgeschlossen: "Completed",
  }

  // Nächster Status für die Bestellung
  const nextStatusMap: Record<OrderWithDetails["status"], OrderWithDetails["status"] | null> = {
    offen: "verpackt",
    verpackt: "versandt",
    versandt: "abgeschlossen",
    abgeschlossen: null,
  }

  // Filtere die Bestellungen basierend auf dem aktiven Tab
  const filtered = activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab)

  return (
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
            <p className="text-gray-500">View and manage customer orders</p>
          </div>
          <button
              onClick={loadOrders}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded-full">{tab.count}</span>
                </button>
            ))}
          </div>
        </div>

        {/* Order Cards */}
        <div className="space-y-6">
          {filtered.map((order) => {
            const items = order.positionen.map((pos) => ({
              id: pos.artikelId,
              name: `Article #${pos.artikelId}`,
              quantity: pos.quantity,
              price: 0, // You might want to fetch actual prices from ARTIKEL table
            }))

            const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
            const nextStatus = nextStatusMap[order.status]

            return (
                <div
                    key={order.bestellung_id}
                    className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">Order #{order.bestellung_id}</h3>
                          <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                                  statusColors[order.status]
                              }`}
                          >
                        {statusLabels[order.status]}
                      </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{order.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(order.bestelldatum).toLocaleDateString("de-DE")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Euro className="h-4 w-4" />
                            <span>€{(order.totalAmount || 0).toFixed(2)}</span>
                          </div>
                        </div>

                        {order.customerEmail && <p className="text-sm text-gray-500 mt-1">{order.customerEmail}</p>}
                      </div>

                      <div className="flex gap-2">
                        {nextStatus && (
                            <button
                                onClick={() => handleStatusUpdate(order.bestellung_id, nextStatus)}
                                disabled={updatingStatus === order.bestellung_id}
                                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                            >
                              {updatingStatus === order.bestellung_id ? (
                                  <RefreshCcw className="h-4 w-4 animate-spin" />
                              ) : (
                                  `Mark as ${statusLabels[nextStatus]}`
                              )}
                            </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <h4 className="font-medium mb-3">Order Items ({totalItems} items)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                        <tr className="border-b text-left">
                          <th className="py-2 text-sm font-medium text-gray-500">Article ID</th>
                          <th className="py-2 text-sm font-medium text-gray-500 text-right">Quantity</th>
                          <th className="py-2 text-sm font-medium text-gray-500 text-right">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.id} className="border-b">
                                  <td className="py-3">
                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-gray-500">ID: {item.id}</p>
                                    </div>
                                  </td>
                                  <td className="text-right py-3 font-medium">{item.quantity}</td>
                                  <td className="text-right py-3">€{item.price.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                              <td colSpan={3} className="text-center text-gray-400 py-8">
                                No items found
                              </td>
                            </tr>
                        )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row justify-between gap-3">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        <RefreshCcw className="h-4 w-4" />
                        Process Return
                      </button>
                      {order.status === "versandt" && (
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                            <Package className="h-4 w-4" />
                            Track Package
                          </button>
                      )}
                    </div>
                    <Link href={`/orders/${order.bestellung_id}`}>
                      <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
            )
          })}
        </div>

        {filtered.length === 0 && activeTab !== "all" && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {statusLabels[activeTab as OrderWithDetails["status"]].toLowerCase()} orders
              </h3>
              <p className="text-gray-500">There are no orders with this status at the moment.</p>
            </div>
        )}
      </div>
  )
}
