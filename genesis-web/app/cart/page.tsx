// app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

// Typen für Artikel im Warenkorb
type Artikel = {
  id: number;
  name: string;
  price: number;
};

// Warenkorb-Seite
export default function CartPage() {
  const [cartItems, setCartItems] = useState<Artikel[]>([]);

  // Warenkorb aus dem Local Storage laden
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      } catch {
        console.error("Cart-Daten konnten nicht gelesen werden");
      }
    }
  }, []);

  // Artikel aus dem Warenkorb entfernen
  function removeItem(id: number) {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Dein Warenkorb</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Dein Warenkorb ist leer.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600 text-sm">{item.price.toFixed(2)} €</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 rounded-full hover:bg-gray-100 text-red-500"
                title="Entfernen"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-xl font-semibold">Gesamt:</span>
            <span className="text-xl font-bold">{total.toFixed(2)} €</span>
          </div>

          <div className="text-right">
            <button
              className="bg-black text-white px-6 py-3 rounded-md text-sm hover:bg-gray-800 transition"
              onClick={() => window.location.href = "/checkout"}
            >
              Zur Kasse
            </button>
          </div>
        </div>
      )}
    </div>
  );
}