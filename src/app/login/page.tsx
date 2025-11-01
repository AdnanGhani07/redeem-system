'use client';

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  async function submit() {
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.message);
    login(data.token);
    router.replace(data.role === "admin" ? "/admin" : "/redeem");
  }

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-6">
      <Input type="email" placeholder="Email" value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      <Input type="password" placeholder="Password" value={form.password}
        onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
      <Button className="w-full" onClick={submit}>Log In</Button>
      {error && <Alert variant="destructive">{error}</Alert>}
    </div>
  );
}
