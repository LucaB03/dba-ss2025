"use client"

import { useState } from "react"
import { Package, ArrowRight, RefreshCcw } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  const orders = [
    {
      id: "ORD-2023-1001",
      date: "2023-05-15",
      status: "abgeschlossen",
      total: 34.98,
      items: [
        { id: 1, name: "Premium Skin Pack", quantity: 1, price: 9.99 },
        { id: 2, name: "Power Boost", quantity: 5, price: 4.99 },
      ],
      payment: {
        method: "PayPal",
        amount: 34.98,
        date: "2023-05-15",
      },
    },
    {
      id: "ORD-2023-1002",
      date: "2023-05-20",
      status: "versandt",
      total: 24.99,
      items: [{ id: 3, name: "Genesis T-Shirt", quantity: 1, price: 24.99 }],
      payment: {
        method: "Kreditkarte",
        amount: 24.99,
        date: "2023-05-20",
      },
    },
    {
      id: "ORD-2023-1003",
      date: "2023-06-01",
      status: "offen",
      total: 14.99,
      items: [{ id: 4, name: "Pro Membership", quantity: 1, price: 14.99 }],
      payment: {
        method: "Sofortueberweisung",
        amount: 14.99,
        date: "2023-06-01",
      },
    },
  ]

  const tabs = [
    { id: "all", label: "All Orders" },
    { id: "offen", label: "Open" },
    { id: "versandt", label: "Shipped" },
    { id: "abgeschlossen", label: "Completed" },
  ]

  const statusColors: Record<string, string> = {
    offen: "bg-blue-100 text-blue-800",
    verpackt: "bg-yellow-100 text-yellow-800",
    versandt: "bg-purple-100 text-purple-800",
    abgeschlossen: "bg-green-100 text-green-800",
  }

  const statusLabels: Record<string, string> = {
    offen: "Open",
    verpackt: "Packed",
    versandt: "Shipped",
    abgeschlossen: "Completed",
  }

  const filteredOrders = activeTab === "all" ? orders : orders.filter((order) => order.status === activeTab)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-gray-500">View and manage your orders</p>
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

        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white border rounded-lg shadow-sm">
              <div className="p-4 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{order.id}</h3>
                    <p className="text-gray-600 text-sm">Ordered on {order.date}</p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Item</th>
                        <th className="text-right py-2">Qty</th>
                        <th className="text-right py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item: any) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2">{item.name}</td>
                          <td className="text-right py-2">{item.quantity}</td>
                          <td className="text-right py-2">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={2} className="text-right font-bold py-2">
                          Total
                        </td>
                        <td className="text-right font-bold py-2">${order.total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Payment</h4>
                      <p className="text-sm text-gray-500">
                        {order.payment.method} • ${order.payment.amount.toFixed(2)} • {order.payment.date}
                      </p>
                    </div>
                    {order.status === "versandt" && (
                      <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50 flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        Track Package
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-between">
                <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50 flex items-center">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Return Items
                </button>
                <Link href={`/orders/${order.id}`}>
                  <button className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 flex items-center">
                    Order Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
