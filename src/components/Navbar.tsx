"use client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white border-b shadow">
      <Link href="/" className="font-bold">Redeem System</Link>
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <span className="font-mono">{user.role}</span>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Link href="/login"><Button variant="ghost">Login</Button></Link>
            {/* Optionally a register button */}
          </>
        )}
      </div>
    </nav>
  );
}
