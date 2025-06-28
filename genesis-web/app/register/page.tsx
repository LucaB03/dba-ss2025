"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [vorname, setVorname] = useState("")
  const [nachname, setNachname] = useState("")
  const [titel, setTitel] = useState("")
  const [geburtsdatum, setGeburtsdatum] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess(false)
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, vorname, nachname, titel, geburtsdatum }),
    })
    const data = await res.json()
    if (data.success) {
      setSuccess(true)
      setTimeout(() => router.push("/login"), 1500)
    } else {
      setError(data.error || "Registrierung fehlgeschlagen")
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] py-12 px-4">
      <div className="mx-auto max-w-md w-full bg-white border rounded-lg shadow-sm">
        <div className="p-6 space-y-1">
          <h2 className="text-2xl font-bold">Registrieren</h2>
          <p className="text-gray-600">Erstelle einen neuen Account</p>
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
            <label htmlFor="password" className="text-sm font-medium">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="vorname" className="text-sm font-medium">
              Vorname
            </label>
            <input
              id="vorname"
              type="text"
              required
              value={vorname}
              onChange={e => setVorname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="nachname" className="text-sm font-medium">
              Nachname
            </label>
            <input
              id="nachname"
              type="text"
              required
              value={nachname}
              onChange={e => setNachname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="titel" className="text-sm font-medium">
              Titel
            </label>
            <input
              id="titel"
              type="text"
              required
              value={titel}
              onChange={e => setTitel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="geburtsdatum" className="text-sm font-medium">
              Geburtsdatum
            </label>
            <input
              id="geburtsdatum"
              type="date"
              required
              value={geburtsdatum}
              onChange={e => setGeburtsdatum(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">Registrierung erfolgreich! Weiterleitung ...</div>}
          <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">Registrieren</button>
        </form>
        <div className="p-6 pt-0 text-center text-sm">
          Bereits einen Account?{" "}
          <Link href="/login" className="text-black underline-offset-4 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
