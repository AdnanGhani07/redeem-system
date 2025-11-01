'use client';

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Alert } from "@/components/ui/alert";

export default function AdminPage() {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
    else if (user.role !== "admin") router.replace("/redeem");
  }, [user, router]);

  // Code list
  const [codes, setCodes] = useState([]);
  const [form, setForm] = useState({
    code: "",
    codeType: "common",
    redemptionLimit: 1,
    expiryDate: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      fetch("/api/codes", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(setCodes);
    }
  }, [token, message]); // refresh after code creation

  async function handleCreate() {
    setMessage("");
    if (!token) return setMessage("You must be logged in.");
    const res = await fetch("/api/codes", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) setMessage("Code created!"); else setMessage(data.message);
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl mb-6 font-bold">Create Redeem Code</h2>
      <div className="space-y-4">
        <Input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="Code" />
        <select className="w-full p-2 border rounded" value={form.codeType} onChange={e => setForm(f => ({ ...f, codeType: e.target.value }))}>
          <option value="common">Common</option>
          <option value="unique">Unique</option>
        </select>
        {form.codeType === "common" && (
          <Input type="number" min={1} placeholder="Limit" value={form.redemptionLimit}
                 onChange={e => setForm(f => ({ ...f, redemptionLimit: Number(e.target.value) }))} />
        )}
        <Input type="date" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))} />
        <Button onClick={handleCreate}>Create Code</Button>
        {message && <Alert>{message}</Alert>}
      </div>

      <h2 className="text-2xl mt-10 font-bold">Existing Codes</h2>
      <Table>
        <thead>
          <tr>
            <th>Code</th><th>Type</th><th>Limit</th><th>Expiry</th><th>Status</th><th>Redeemed By</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code: any) => (
            <tr key={code._id}>
              <td>{code.code}</td>
              <td>{code.codeType}</td>
              <td>{code.codeType === "common" ? code.redemptionLimit : "Unique"}</td>
              <td>{new Date(code.expiryDate).toLocaleDateString()}</td>
              <td>{code.status}</td>
              <td>{code.redeemedBy?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
