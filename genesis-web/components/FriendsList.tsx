"use client"

import { useEffect, useState } from "react"

export default function FriendsList() {
  const [freunde, setFreunde] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      setError("Nicht eingeloggt")
      setLoading(false)
      return
    }
    fetch("/api/friends", {
      headers: { "x-user-id": userId }
    })
      .then(res => res.json())
      .then(data => {
        setFreunde(data.freunde || [])
        setLoading(false)
      })
      .catch(e => {
        setError("Fehler beim Laden der Freunde")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-2">Deine Freunde</h3>
        <p className="text-gray-500">Lädt…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-2">Deine Freunde</h3>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!freunde.length) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-2">Deine Freunde</h3>
        <p className="text-gray-500">Füge Freunde hinzu</p>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-2">Deine Freunde</h3>
      <div className="max-h-52 overflow-y-scroll flex flex-col gap-3 pr-2">
        {freunde.map(friend => (
          <div key={friend.spielerprofil_id} className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              {friend.profilbild_url
                ? <img src={friend.profilbild_url} alt="Profilbild" className="h-full w-full object-cover"/>
                : <span className="text-lg font-bold text-gray-600">{friend.anzeigename?.charAt(0)}</span>
              }
            </div>
            <span className="font-medium">{friend.anzeigename}</span>
          </div>
        ))}
      </div>
    </div>
  )
}