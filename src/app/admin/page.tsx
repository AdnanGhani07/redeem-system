'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Alert } from "@/components/ui/alert";

export default function AdminPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Auth persistence: hydrate user from localStorage before redirect logic
  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (user.role !== "admin") router.replace("/redeem");
    // eslint-disable-next-line
  }, [user, router, loading]);

  // Add loading state to ensure hydration on refresh
  useEffect(() => {
    setLoading(false);
  }, []);

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
    if (token && !loading) {
      fetch("/api/codes", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(setCodes);
    }
  }, [token, message, loading]);

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

  if (loading) return <div className="py-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl mb-6 font-bold">Create Redeem Code</h2>
      <form className="space-y-4 bg-white p-6 rounded-xl shadow border">
        <div>
          <label className="block mb-1 font-medium" htmlFor="code">Code</label>
          <Input id="code" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="Enter code..." />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="codeType">Code Type</label>
          <select
            id="codeType"
            className="w-full border rounded px-3 py-2"
            value={form.codeType}
            onChange={e => setForm(f => ({ ...f, codeType: e.target.value }))}
          >
            <option value="common">Common</option>
            <option value="unique">Unique</option>
          </select>
        </div>
        {form.codeType === "common" && (
          <div>
            <label className="block mb-1 font-medium" htmlFor="limit">Redemption Limit</label>
            <Input
              id="limit"
              type="text"
              inputMode="numeric"
              min={1}
              placeholder="Enter redemption limit"
              value={form.redemptionLimit}
              onChange={e => setForm(f => ({ ...f, redemptionLimit: Number(e.target.value) }))}
            />
          </div>
        )}
        <div>
          <label className="block mb-1 font-medium" htmlFor="expiryDate">Expiry Date</label>
          <Input
            id="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))}
          />
        </div>
        <Button className="w-full mt-2" type="button" onClick={handleCreate}>
          Create Code
        </Button>
        {message && <Alert className="mt-3">{message}</Alert>}
      </form>

      <h2 className="text-2xl mt-10 font-bold">Existing Codes</h2>
      <div className="bg-white mt-4 rounded-xl shadow border w-full">
        <Table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 whitespace-nowrap font-semibold text-sm">Code</th>
              <th className="px-4 py-2 whitespace-nowrap font-semibold text-sm">Type</th>
              <th className="px-4 py-2 whitespace-nowrap font-semibold text-sm">Limit</th>
              <th className="px-4 py-2 whitespace-nowrap font-semibold text-sm">Expiry</th>
              <th className="px-4 py-2 whitespace-nowrap font-semibold text-sm">Status</th>
              <th className="px-4 py-2 whitespace-nowrap font-semibold text-sm">Redeemed By</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code: any) => (
              <tr key={code._id}>
                <td className="px-4 py-2 whitespace-nowrap">{code.code}</td>
                <td className="px-4 py-2 whitespace-nowrap capitalize">{code.codeType}</td>
                <td className="px-4 py-2 whitespace-nowrap">{code.codeType === "common" ? code.redemptionLimit + (code.redemptionLimit === 1 ? " time" : " times") : "One-Time Use"}</td>
                <td className="px-4 py-2 whitespace-nowrap">{new Date(code.expiryDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 whitespace-nowrap capitalize">{code.status}</td>
                <td className="px-4 py-2 whitespace-nowrap">{code.redeemedBy?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
