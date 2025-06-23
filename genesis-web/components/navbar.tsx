"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Firmenlogo-D8KbNIbESQEDBKdz20uKSudtVbVAg3.png"
              alt="Genesis Studios Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium hover:underline underline-offset-4">
            Shop
          </Link>
          <Link href="/inventory" className="text-sm font-medium hover:underline underline-offset-4">
            Inventory
          </Link>
          <Link href="/orders" className="text-sm font-medium hover:underline underline-offset-4">
            Orders
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cart">
            <button className="p-2 hover:bg-gray-100 rounded">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </button>
          </Link>
          <Link href="/profile">
            <button className="p-2 hover:bg-gray-100 rounded">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </button>
          </Link>
          <Link href="/login" className="hidden md:block">
            <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50">Login</button>
          </Link>
          <button className="md:hidden p-2 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container mx-auto md:hidden py-4 border-t px-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/inventory"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Inventory
            </Link>
            <Link
              href="/orders"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
