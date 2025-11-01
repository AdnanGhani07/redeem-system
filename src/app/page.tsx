'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-100 text-center px-4">
      <h1 className="text-4xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
        Welcome to <span className="text-blue-700">Redeem System</span>
      </h1>
      <p className="text-lg text-gray-700 max-w-lg mx-auto mb-8">
        <b>Redeem System</b> lets you generate, manage, and redeem unique or common codes securely.  
        <br />
        <span className="text-gray-500">
          Built with modern Next.js 16, TypeScript, Tailwind CSS, ShadCN UI, and MongoDB for enterprise-grade performance and beautiful UI.
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
      <div className="mt-10 text-sm text-gray-400">
        Demo Admin: <span className="bg-gray-200 px-1 rounded">admin@example.com / adminpassword</span> &nbsp;&nbsp;|&nbsp;&nbsp;
        Demo User: <span className="bg-gray-200 px-1 rounded">user@demo.com / userpassword</span>
      </div>
    </div>
  );
}
