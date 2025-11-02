'use client';

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
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
    router.replace("/");
  }

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-6">
      <Input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
      />

      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-2.5 text-gray-500"
          onClick={() => setShow(s => !s)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <Button className="w-full" onClick={submit}>Log In</Button>
      {error && <Alert variant="destructive">{error}</Alert>}
    </div>
  );
}
