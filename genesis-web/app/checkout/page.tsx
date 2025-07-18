"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Typen für Zahlungsmethoden
const paymentMethods = [
  { id: "PayPal", label: "PayPal" },
  { id: "Klarna", label: "Klarna" },
  { id: "Sofortueberweisung", label: "Sofortüberweisung" },
  { id: "Kreditkarte", label: "Kreditkarte" },
];

// Checkout-Seite
export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  // Warenkorb aus dem Local Storage laden
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Zahlungsmethode auswählen und Bestellung abschließen
  async function handlePayment(method: string) {
    setSelected(method);
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }
    // Bestellung anlegen und Artikel ins Inventar buchen
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": userId },
      body: JSON.stringify({ cart, paymentMethod: method }),
    });
    if (res.ok) {
      localStorage.removeItem("cart");
      router.push("/inventory");
    } else {
      alert("Zahlung fehlgeschlagen");
    }
  }

  return (
    <div className="container mx-auto max-w-lg px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Warenkorb</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Dein Warenkorb ist leer.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price.toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Zahlungsmethode wählen</h2>
        <div className="space-y-2">
          {paymentMethods.map((m) => (
            <button
              key={m.id}
              className={`w-full px-4 py-3 rounded-md border text-left ${
                selected === m.id ? "bg-black text-white" : "bg-gray-100"
              }`}
              onClick={() => handlePayment(m.id)}
              disabled={cart.length === 0}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}