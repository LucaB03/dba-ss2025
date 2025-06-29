"use client"

import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null
    if (!userId) {
      setError("Nicht eingeloggt.")
      setLoading(false)
      return
    }
    fetch(`/api/profile?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error)
        else setProfile(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Fehler beim Laden des Profils.")
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8">Lade Profil ...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>
  if (!profile) return null

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white border rounded-lg shadow-sm max-w-xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-2">Profil</h2>
        <div className="mb-2"><b>Email:</b> {profile.email}</div>
        <div className="mb-2"><b>Rolle:</b> {profile.rolle}</div>
        <div className="mb-2"><b>Erstellt:</b> {new Date(profile.erstellt).toLocaleString()}</div>
        {profile.kunde && (
          <>
            <div className="mb-2"><b>Vorname:</b> {profile.kunde.vorname}</div>
            <div className="mb-2"><b>Nachname:</b> {profile.kunde.nachname}</div>
            <div className="mb-2"><b>Titel:</b> {profile.kunde.titel}</div>
            <div className="mb-2"><b>Geburtsdatum:</b> {new Date(profile.kunde.geburtsdatum).toLocaleDateString()}</div>
          </>
        )}
      </div>
    </div>
  )
}
