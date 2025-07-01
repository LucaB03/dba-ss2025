// lib/cart.ts
export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const STORAGE_KEY = "cart_items";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const current = getCart();
  const existing = current.find((i) => i.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    current.push({ ...item, quantity: 1 });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  window.dispatchEvent(new Event("cart-updated"));
}

export function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
}