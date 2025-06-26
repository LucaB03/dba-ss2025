"use client";

import { useState, useEffect } from "react";
import { Package, ArrowRight, RefreshCcw } from "lucide-react";
import Link from "next/link";

type OrderPosition = {
  artikelId: number;
  quantity: number;
};
type Bestellung = {
  id: number;
  bestelldatum: string;
  status: "offen" | "verpackt" | "versandt" | "abgeschlossen";
  positionen: OrderPosition[];
  // wir berechnen total und items nach dem Fetch
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<Bestellung["status"] | "all">("all");
  const [orders, setOrders] = useState<Bestellung[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/bestellung");
        if (!res.ok) {
          console.error("API-Fehler:", res.status, await res.text());
          return;
        }
        const data = (await res.json()) as Bestellung[];
        setOrders(data);
      } catch (err) {
        console.error("Fetch-Error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="p-4">Lade Bestellungen…</p>;
  }
  if (orders.length === 0) {
    return <p className="p-4">Keine Bestellungen gefunden.</p>;
  }

  const tabs = [
    { id: "all", label: "All Orders" },
    { id: "offen", label: "Open" },
    { id: "verpackt", label: "Packed" },
    { id: "versandt", label: "Shipped" },
    { id: "abgeschlossen", label: "Completed" },
  ] as const;

  const statusColors: Record<Bestellung["status"], string> = {
    offen: "bg-blue-100 text-blue-800",
    verpackt: "bg-yellow-100 text-yellow-800",
    versandt: "bg-purple-100 text-purple-800",
    abgeschlossen: "bg-green-100 text-green-800",
  };

  const statusLabels: Record<Bestellung["status"], string> = {
    offen: "Open",
    verpackt: "Packed",
    versandt: "Shipped",
    abgeschlossen: "Completed",
  };

  const filtered = activeTab === "all"
    ? orders
    : orders.filter((o) => o.status === activeTab);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-gray-500">View and manage your orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Order Cards */}
        <div className="space-y-6">
          {filtered.map((order) => {
            // baue items-Array aus positionen zusammen:
            const items = order.positionen.map((pos) => ({
              id: pos.artikelId,
              name: `Artikel #${pos.artikelId}`, // ggf. später durch fetch /api/artikel/:id ersetzen
              quantity: pos.quantity,
              price: 0 // falls Price fehlt, könnte man hier nachladen
            }));
            const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

            return (
              <div key={order.id} className="bg-white border rounded-lg shadow-sm">
                {/* Order Header */}
                <div className="p-4 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">#{order.id}</h3>
                      <p className="text-gray-600 text-sm">
                        Ordered on {new Date(order.bestelldatum).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </div>
                </div>

                {/* Order Items Table */}
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
                        {items.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="py-2">{item.name}</td>
                            <td className="text-right py-2">{item.quantity}</td>
                            <td className="text-right py-2">
                              €{item.price.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={2} className="text-right font-bold py-2">
                            Total
                          </td>
                          <td className="text-right font-bold py-2">
                            €{total.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Payment & Actions */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Payment</h4>
                        <p className="text-sm text-gray-500">
                          {/* hier fehlen Payment-Daten aus DB; Platzhalter: */}
                          Method: – • Amount: –€ • Date: –
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

                {/* Footer Actions */}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}