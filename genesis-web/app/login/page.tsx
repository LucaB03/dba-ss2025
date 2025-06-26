import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] py-12 px-4">
      <div className="mx-auto max-w-md w-full bg-white border rounded-lg shadow-sm">
        <div className="p-6 space-y-1">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-gray-600">Enter your email and password to access your account</p>
        </div>
        <div className="p-6 pt-0 space-y-4">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link href="/forgot-password" className="text-sm text-black underline-offset-4 hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div className="p-6 pt-0 flex flex-col space-y-4">
          <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">Login</button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-black underline-offset-4 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}