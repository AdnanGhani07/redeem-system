"use client";
import { useAuth } from "@/components/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useState } from "react";

export default function RedeemPage() {
  const { token, user } = useAuth();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRedeem() {
    setError(""); setMessage("");
    if (!token) return setError("You must be logged in.");
    const res = await fetch("/api/codes/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    res.ok ? setMessage(data.message) : setError(data.message);
  }

  return (
    <div className="max-w-sm mx-auto mt-24 space-y-5">
      <Input placeholder="Enter code" value={code} onChange={e => setCode(e.target.value)} />
      <Button className="w-full" onClick={handleRedeem}>Redeem</Button>
      {message && <Alert variant="default" className="w-full bg-green-50 text-green-700 border-green-200 whitespace-nowrap">{message}</Alert>}
      {error && <Alert variant="destructive" className="w-full bg-red-50 text-red-700 border-red-200 whitespace-nowrap">{error}</Alert>}
    </div>
  );
}
