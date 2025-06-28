"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkLogin = () => {
        const id = localStorage.getItem("userId")
        setLoggedIn(!!id)
        if (id) {
          fetch(`/api/profile?userId=${id}`)
            .then(res => res.json())
            .then(data => {
              if (data.kunde && data.kunde.vorname) setUserName(data.kunde.vorname)
              else setUserName(null)
            })
        } else {
          setUserName(null)
        }
      }
      checkLogin();
      window.addEventListener("storage", checkLogin);
      return () => window.removeEventListener("storage", checkLogin);
    }
  }, [])

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userId")
      window.dispatchEvent(new Event("storage"))
      setLoggedIn(false)
      router.push("/login")
    }
  }

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
          {loggedIn && (
            <Link href="/inventory" className="text-sm font-medium hover:underline underline-offset-4">
              Inventory
            </Link>
          )}
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
          {loggedIn ? (
            <div className="relative group">
              <button className="p-2 hover:bg-gray-100 rounded flex items-center gap-1">
                <User className="h-5 w-5" />
                <span className="hidden md:inline">{userName ? userName : "Profil"}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profil</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Ausloggen</button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block">
              <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50">Login</button>
            </Link>
          )}
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
            {loggedIn && (
              <Link href="/inventory" className="text-sm font-medium hover:underline underline-offset-4" onClick={() => setIsMenuOpen(false)}>
                Inventory
              </Link>
            )}
            <Link
              href="/orders"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
            {loggedIn ? (
              <>
                <Link href="/profile" className="text-sm font-medium hover:underline underline-offset-4" onClick={() => setIsMenuOpen(false)}>
                  Profil
                </Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-sm text-left px-0 py-2 hover:underline underline-offset-4">
                  Ausloggen
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
