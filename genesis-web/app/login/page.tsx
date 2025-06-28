"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("userId", data.userId)
        window.dispatchEvent(new Event("storage"))
      }
      router.push("/profile")
    } else {
      setError(data.error || "Login fehlgeschlagen")
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] py-12 px-4">
      <div className="mx-auto max-w-md w-full bg-white border rounded-lg shadow-sm">
        <div className="p-6 space-y-1">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-gray-600">Gib deine E-Mail und dein Passwort ein, um dich einzuloggen</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Passwort
              </label>
              <Link href="/forgot-password" className="text-sm text-black underline-offset-4 hover:underline">
                Passwort vergessen?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">Login</button>
        </form>
        <div className="p-6 pt-0 text-center text-sm">
          Noch kein Account?{" "}
          <Link href="/register" className="text-black underline-offset-4 hover:underline">
            Registrieren
          </Link>
        </div>
      </div>
    </div>
  )
}