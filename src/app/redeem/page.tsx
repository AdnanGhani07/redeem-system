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
      {message && <Alert>{message}</Alert>}
      {error && <Alert variant="destructive">{error}</Alert>}
    </div>
  );
}
