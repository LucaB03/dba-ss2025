"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Trophy,
  Medal,
  Coins,
  Edit,
  User,
  Settings,
  Package,
} from "lucide-react";
import FriendsList from "@/components/FriendsList"

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("Kein User angemeldet");
      return;
    }

    fetch("/api/profile", {
      headers: { "x-user-id": userId },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setProfile(data);
        console.log("-----------------------------")
        console.log(data);
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <div className="container mx-auto py-8 px-4">Fehler: {error}</div>;
  }

  if (!profile) {
    return <div className="container mx-auto py-8 px-4">Lädt…</div>;
  }

  //@ts-ignore
  const playerProfile = profile.profil;
  if (!playerProfile) {
    return (
      <div className="container mx-auto py-8 px-4">Kein Profil gefunden</div>
    );
  }

  const totalGames = playerProfile.siege + playerProfile.niederlagen;
  const winRate =
    totalGames > 0 ? Math.round((playerProfile.siege / totalGames) * 100) : 0;

  // Extract account info fields from playerProfile
  //@ts-ignore
  const email = profile.user.email;
  //@ts-ignore
  const rolle = profile.user.rolle;
  //@ts-ignore
  const erstellt = profile.user.erstellt;

  const data = [
    { name: "Wins", value: playerProfile.siege },
    { name: "Losses", value: playerProfile.niederlagen },
  ];
  const COLORS = ["#16a34a", "#ef4444"];

  return (
  <div className="container mx-auto py-8 px-4">
    <div className="grid gap-8 md:grid-cols-[300px_1fr]">
      <div className="space-y-6">
        {/* Profilbox */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">Player Profile</h2>
              <p className="text-gray-600 text-sm">Your gaming identity</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Settings className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 text-center">
            <div className="h-24 w-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              {playerProfile.profilbild_url ? (
                <img
                  src={playerProfile.profilbild_url}
                  alt="Profile"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-600">
                  {playerProfile.anzeigename.charAt(0)}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold">
              {playerProfile.anzeigename}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              PokéCoins: {playerProfile.pokecoins}
            </p>
            <div className="mt-4">
              <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50 flex items-center mx-auto">
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        {/* Coins */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="p-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Coins className="h-5 w-5 mr-2 text-yellow-500" />
              Currency
            </h3>
          </div>
          <div className="p-4 pt-0 flex justify-between">
            <div className="flex items-center">
              <Coins className="h-5 w-5 mr-2 text-yellow-500" />
              <span>PokéCoins</span>
            </div>
            <span className="font-bold">{playerProfile.pokecoins}</span>
          </div>
          <div className="p-4 pt-0">
            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Buy More Coins
            </button>
          </div>
        </div>
        {/* Freunde-Scrollbar */}
        <FriendsList />
      </div>
      <div className="space-y-6">
        {/* Statistik */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Player Statistics</h3>
            <p className="text-gray-600 text-sm">Your gaming performance</p>
          </div>
          <div className="p-4 pt-0 grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Trophy className="h-8 w-8 mb-2 text-green-500" />
              <div className="text-2xl font-bold">{playerProfile.siege}</div>
              <div className="text-sm text-gray-500">Wins</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Medal className="h-8 w-8 mb-2 text-red-500" />
              <div className="text-2xl font-bold">
                {playerProfile.niederlagen}
              </div>
              <div className="text-sm text-gray-500">Losses</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{winRate}%</div>
              <div className="text-sm text-gray-500">Win Rate</div>
              <div className="w-20 h-20 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={24}
                      outerRadius={40}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {data.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        {/* Über mich */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="p-4">
            <h3 className="text-lg font-semibold">About Me</h3>
          </div>
          <div className="p-4 pt-0">
            <p>{playerProfile.profilbeschreibung}</p>
            <button className="w-full border border-gray-300 py-2 mt-4 rounded hover:bg-gray-50 flex items-center justify-center">
              <Edit className="h-4 w-4 mr-2" />
              Edit Description
            </button>
          </div>
        </div>
        {/* Account-Infos */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Account-Informationen</h3>
            <div className="text-sm text-gray-700 space-y-1 mt-2">
              <div>
                <span className="font-medium">E-Mail:</span> {email}
              </div>
              <div>
                <span className="font-medium">Rolle:</span> {rolle}
              </div>
              <div>
                <span className="font-medium">Erstellt:</span>{" "}
                {new Date(erstellt).toLocaleString("de-DE")}
              </div>
              <div>
                {/* @ts-ignore */}
                <span className="font-medium">Titel:</span> {profile.user.KUNDE.titel}
              </div>
              <div>
                {/* @ts-ignore */}
                <span className="font-medium">Vorname:</span> {profile.user.KUNDE.vorname}
              </div>
              <div>
                {/* @ts-ignore */}
                <span className="font-medium">Nachname:</span> {profile.user.KUNDE.nachname}
              </div>
              <div>
                {/* @ts-ignore */}
                <span className="font-medium">Geburtsdatum:</span> {new Date(profile.user.KUNDE.geburtsdatum).toLocaleString("de-DE").split(",")[0]}
              </div>
              <div>
                {/* @ts-ignore */}
                <span className="font-medium">Straße:</span> {profile.user.KUNDE.adresse.strasse}
              </div>
              <div>
                {/* @ts-ignore */}
                <span className="font-medium">Hausnummer:</span> {profile.user.KUNDE.adresse.hausnummer}
              </div>
              <div>
                {/* @ts-ignore */}
                <span className="font-medium">Stadt:</span> {profile.user.KUNDE.adresse.stadt}
              </div>
              <div>
                {/* @ts-ignore */}
                <span className="font-medium">Postleitzahl:</span> {profile.user.KUNDE.adresse.postleitzahl}
              </div>
              <div>
                {/* @ts-ignore */}
                <span className="font-medium">Land:</span> {profile.user.KUNDE.adresse.land}
              </div>
            </div>
          </div>
        </div>
        {/* Letzte Aktivitäten ... */}
      </div>
    </div>
  </div>
);
}
