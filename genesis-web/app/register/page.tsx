"use client"

import Link from "next/link"
import { useState } from "react"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("customer")

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] py-12 px-4">
      <div className="mx-auto max-w-md w-full bg-white border rounded-lg shadow-sm">
        <div className="p-6 space-y-1">
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-gray-600">Choose your account type and enter your details</p>
        </div>
        <div className="p-6 pt-0">
          <div className="grid w-full grid-cols-2 mb-4">
            <button
              className={`py-2 px-4 text-sm font-medium rounded-l-md border ${
                activeTab === "customer"
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("customer")}
            >
              Customer
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium rounded-r-md border-t border-r border-b ${
                activeTab === "player"
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("player")}
            >
              Player
            </button>
          </div>

          {activeTab === "customer" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium">
                    First name
                  </label>
                  <input
                    id="first-name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium">
                    Last name
                  </label>
                  <input
                    id="last-name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="birth-date" className="text-sm font-medium">
                  Birth date
                </label>
                <input
                  id="birth-date"
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          )}

          {activeTab === "player" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="player-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="player-email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="player-password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="player-password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="player-confirm-password" className="text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  id="player-confirm-password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="display-name" className="text-sm font-medium">
                  Display name
                </label>
                <input
                  id="display-name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          )}
        </div>
        <div className="p-6 pt-0 flex flex-col space-y-4">
          <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">Create account</button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-black underline-offset-4 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
