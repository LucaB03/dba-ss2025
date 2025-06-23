import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Firmenlogo-D8KbNIbESQEDBKdz20uKSudtVbVAg3.png"
                alt="Genesis Studios Logo"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500">
              Gaming platform by Genesis Studios. Create your profile, collect items, and compete with players
              worldwide.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-gray-500 hover:text-gray-900">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="text-gray-500 hover:text-gray-900">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-500 hover:text-gray-900">
                  Player Profile
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-500 hover:text-gray-900">
                  Orders
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-gray-500 hover:text-gray-900">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-500 hover:text-gray-900">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/profile/settings" className="text-gray-500 hover:text-gray-900">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Genesis Studios. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
