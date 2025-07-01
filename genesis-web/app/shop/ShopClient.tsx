"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, X, Check } from "lucide-react";

// ...Artikel type und ShopClient Props wie bisher

export default function ShopClient({ initialItems }) {
  const [activeTab, setActiveTab] = useState("all");
  const [items] = useState(initialItems);
  const [userId, setUserId] = useState(null);
  const [cartFeedback, setCartFeedback] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    setUserId(stored);
  }, []);

  function addToCart(item) {
    if (!userId) {
      router.push("/login");
      return;
    }
    const raw = localStorage.getItem("cart");
    let current = [];
    try {
      if (raw) current = JSON.parse(raw);
    } catch {}
    const existing = current.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      item.quantity = 1;
      current.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(current));

    // Button-Feedback
    setCartFeedback(item.id);
    setTimeout(() => setCartFeedback(null), 700);

    // Toast-Notification
    setToast({ message: `"${item.name}" wurde zum Warenkorb hinzugefügt.`, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  }

  const tabs = [
    { id: "all", label: "All Items" },
    { id: "digital", label: "Digital" },
    { id: "spielgegenstand", label: "Game Objects" },
    { id: "merchandise", label: "Merchandise" },
    { id: "abonnement", label: "Subscriptions" },
  ];

  const filteredItems =
    activeTab === "all" ? items : items.filter((item) => item.type === activeTab);

  const typeLabels = {
    digital: "Digital",
    spielgegenstand: "Game Object",
    merchandise: "Merchandise",
    abonnement: "Subscription",
  };

  const typeColors = {
    digital: "bg-blue-100 text-blue-800",
    spielgegenstand: "bg-green-100 text-green-800",
    merchandise: "bg-purple-100 text-purple-800",
    abonnement: "bg-amber-100 text-amber-800",
  };

  // ----- RETURN START -----
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Push-Notification oben rechts */}
      {toast.visible && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-black text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-green-400" />
            {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
          <p className="text-gray-500">
            Browse and purchase digital items, game objects, merchandise, and subscriptions
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 mb-4">
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

      {/* Grid mit Artikeln */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md flex flex-col ${
              !item.available ? "opacity-50" : ""
            }`}
          >
            {/* Bildplatzhalter mit optionalem X */}
            <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-4xl font-bold text-gray-300">
                {item.name.charAt(0)}
              </div>
              {!item.available && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-full bg-white/80 p-2">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Artikelinfos */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[item.type]}`}
                >
                  {typeLabels[item.type]}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>
              {/* Preis und Button */}
              <div className="mt-auto flex items-center justify-between">
                <div className="font-bold text-lg">
                  {item.price.toFixed(2)} €
                </div>
                <button
                  onClick={() => item.available && addToCart(item)}
                  className={`px-4 py-2 rounded text-sm flex items-center font-semibold transition-colors duration-200
                    ${
                      !item.available
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : cartFeedback === item.id
                        ? "bg-green-600 text-white"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  disabled={!item.available}
                >
                  {cartFeedback === item.id ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Hinzugefügt!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
              {!item.available && (
                <p className="mt-2 text-center text-sm text-gray-500">
                  Bald verfügbar
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn { animation: fadeIn 0.3s; }
      `}</style>
    </div>
  );
}
