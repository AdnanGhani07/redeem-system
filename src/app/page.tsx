'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-100 text-center px-4">
      {user ? (
        <div className="max-w-md space-y-7">
          <h1 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
            Welcome, {user.role === "admin" ? "Admin" : "User"}!
          </h1>
          {user.role === "admin" ? (
            <>
              <p className="text-lg text-gray-700">
                You have full access to code management and redemption history.
              </p>
              <div className="flex flex-col space-y-3 mx-auto">
                <Link href="/admin">
                  <Button className="w-full">Go to Admin Dashboard</Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={logout}>
                  Log out
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-700">
                Redeem your codes or view active offers.
              </p>
              <div className="flex flex-col space-y-3 mx-auto">
                <Link href="/redeem">
                  <Button className="w-full">Go to Redeem Page</Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={logout}>
                  Log out
                </Button>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
            Welcome to <span className="text-blue-700">Redeem System</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-lg mx-auto mb-8">
            <b>Redeem System</b> lets you generate, manage, and redeem unique or common codes securely.<br />
            <span className="text-gray-500">
              Built with Next.js, TypeScript, Tailwind CSS, ShadCN UI, and MongoDB.
            </span>
          </p>
          <div className="flex gap-6 justify-center">
            <Link href="/login">
              <Button className="px-6 py-2 font-semibold">Login</Button>
            </Link>
            <Link href="/redeem">
              <Button variant="secondary" className="px-6 py-2">Redeem Code</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
