import Link from "next/link"
import { ArrowRight, ShoppingCart, User, Gamepad2, Package } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Welcome to Genesis Studios Gaming Platform
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our gaming community, collect items, and compete with players around the world.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 flex items-center">
                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
                <Link href="/shop">
                  <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 flex items-center">
                    Browse Shop <ShoppingCart className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <Gamepad2 className="h-32 w-32 text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 rounded-xl">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Player Profiles</h3>
                <p className="text-gray-600">Create your unique gaming identity</p>
              </div>
              <div className="mt-4">
                <User className="h-12 w-12 mb-4 text-black" />
                <p className="text-sm text-gray-500">
                  Customize your profile, track your wins and losses, and show off your achievements.
                </p>
              </div>
              <div className="mt-4">
                <Link href="/profile">
                  <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Game Shop</h3>
                <p className="text-gray-600">Digital items and merchandise</p>
              </div>
              <div className="mt-4">
                <ShoppingCart className="h-12 w-12 mb-4 text-black" />
                <p className="text-sm text-gray-500">
                  Browse our collection of digital items, game objects, merchandise, and subscriptions.
                </p>
              </div>
              <div className="mt-4">
                <Link href="/shop">
                  <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50">
                    Visit Shop
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Inventory</h3>
                <p className="text-gray-600">Manage your items</p>
              </div>
              <div className="mt-4">
                <Package className="h-12 w-12 mb-4 text-black" />
                <p className="text-sm text-gray-500">
                  View and manage all your purchased items, track quantities, and use them in games.
                </p>
              </div>
              <div className="mt-4">
                <Link href="/inventory">
                  <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50">
                    Open Inventory
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
