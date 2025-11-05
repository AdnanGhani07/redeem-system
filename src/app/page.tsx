'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-100 text-center px-2 sm:px-4">
      <div className="w-full max-w-lg">
        {user ? (
          <div className="space-y-7">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
              Welcome, {user.role === "admin" ? "Admin" : "User"}!
            </h1>
            {user.role === "admin" ? (
              <>
                <p className="text-base sm:text-lg text-gray-700">
                  Access code management and redemption history.
                </p>
                <div className="flex flex-col gap-3 w-full">
                  <Link href="/admin">
                    <Button className="w-full">Admin Dashboard</Button>
                  </Link>
                  <Button variant="outline" className="w-full" onClick={logout}>Log out</Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-base sm:text-lg text-gray-700">
                  Redeem your codes or view active offers.
                </p>
                <div className="flex flex-col gap-3 w-full">
                  <Link href="/redeem">
                    <Button className="w-full">Redeem Page</Button>
                  </Link>
                  <Button variant="outline" className="w-full" onClick={logout}>Log out</Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
              Redeem System
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-lg mx-auto mb-6">
              Generate, manage, and redeem unique or common codes securely.<br />
              <span className="text-gray-500 hidden sm:inline">
                Built with Next.js, TypeScript, Tailwind CSS, MongoDB, and ShadCN UI.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center w-full">
              <Link href="/login">
                <Button className="w-full sm:w-auto px-6 py-2 font-semibold">Login</Button>
              </Link>
              <Link href="/redeem">
                <Button variant="secondary" className="w-full sm:w-auto px-6 py-2">Redeem Code</Button>
              </Link>
            </div>

            {/* Demo credentials section */}
            <div className="mt-8 w-full flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 justify-center items-center">
              {[
                { label: "Admin", email: "admin@example.com", password: "adminpassword", color: "from-blue-600 to-cyan-400" },
                { label: "User 1", email: "user@demo.com", password: "userpassword", color: "from-pink-500 to-red-400" },
                { label: "User 2", email: "common@demo.com", password: "commonpassword", color: "from-emerald-500 to-green-400" },
              ].map(({ label, email, password, color }) => (
                <div
                  key={email}
                  className={`rounded-xl shadow-md border bg-gradient-to-br ${color} text-white w-full sm:w-64 px-5 py-4 flex flex-col  space-y-3 hover:scale-105 transition-transform`}
                >
                  <div className="font-bold tracking-wide text-center text-lg mb-1">{label}</div>
                  <div className="text-xs font-bold">
                    <span className="font-bold">Email:</span> {email}
                  </div>
                  <div className="text-xs font-bold">
                    <span className="font-bold">Password:</span> {password}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
