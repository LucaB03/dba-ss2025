"use client"

import { useState } from "react"
import { Trophy, Medal, Coins, Edit, User, Settings, Package } from "lucide-react"

export default function ProfilePage() {
  const [playerProfile, setPlayerProfile] = useState({
    id: 1,
    displayName: "GameMaster42",
    pokecoins: 2500,
    wins: 157,
    losses: 43,
    description: "Competitive player since 2020. I specialize in strategy games and RPGs.",
    level: 42,
    xp: 75,
  })

  const winRate = Math.round((playerProfile.wins / (playerProfile.wins + playerProfile.losses)) * 100)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">Player Profile</h2>
                  <p className="text-gray-600 text-sm">Your gaming identity</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="h-24 w-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">{playerProfile.displayName.charAt(0)}</span>
              </div>
              <h2 className="text-2xl font-bold">{playerProfile.displayName}</h2>
              <p className="text-sm text-gray-500 mt-1">Level {playerProfile.level}</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-black h-2 rounded-full" style={{ width: `${playerProfile.xp}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {playerProfile.xp}% to Level {playerProfile.level + 1}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50 flex items-center">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Coins className="h-5 w-5 mr-2 text-yellow-500" />
                Currency
              </h3>
            </div>
            <div className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-yellow-500" />
                  <span>PokéCoins</span>
                </div>
                <span className="font-bold">{playerProfile.pokecoins}</span>
              </div>
            </div>
            <div className="p-4 pt-0">
              <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Buy More Coins</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-4">
              <h3 className="text-lg font-semibold">Player Statistics</h3>
              <p className="text-gray-600 text-sm">Your gaming performance</p>
            </div>
            <div className="p-4 pt-0">
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <Trophy className="h-8 w-8 mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{playerProfile.wins}</div>
                  <div className="text-sm text-gray-500">Wins</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <Medal className="h-8 w-8 mb-2 text-red-500" />
                  <div className="text-2xl font-bold">{playerProfile.losses}</div>
                  <div className="text-sm text-gray-500">Losses</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold">{winRate}%</div>
                  <div className="text-sm text-gray-500">Win Rate</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-black h-2 rounded-full" style={{ width: `${winRate}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-4">
              <h3 className="text-lg font-semibold">About Me</h3>
            </div>
            <div className="p-4 pt-0">
              <p>{playerProfile.description}</p>
            </div>
            <div className="p-4 pt-0">
              <button className="w-full border border-gray-300 py-2 rounded hover:bg-gray-50 flex items-center justify-center">
                <Edit className="h-4 w-4 mr-2" />
                Edit Description
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
            <div className="p-4 pt-0">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-green-100 p-2">
                    <Trophy className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Won a match in Battle Arena</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Purchased Power Boost</p>
                    <p className="text-sm text-gray-500">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-purple-100 p-2">
                    <User className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Updated profile picture</p>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
