"use client";
import { useEffect, useState } from "react";
export default function Billing() {
  const [balance, setBalance] = useState<string>("$0.00");
  const [amount, setAmount] = useState("100");
  useEffect(()=>{ (async ()=>{ const res = await fetch("/api/billing/balance"); if (res.ok) { const j = await res.json(); setBalance(`$${Number(j.balance).toFixed(2)}`); } })(); },[]);
  async function topup() {
    const res = await fetch("/api/billing/topup", { method:"POST", body: JSON.stringify({ amount_usd: Number(amount) }) });
    if (!res.ok) return alert("Top-up failed"); const j = await res.json(); location.href = j.checkout_url;
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Billing</h1>
      <div className="card flex items-center justify-between">
        <div><div className="text-sm text-[#a9b7d1]">Current Credit Balance</div><div className="text-2xl font-bold">{balance}</div></div>
        <div className="flex gap-2 items-center"><input className="input w-32" value={amount} onChange={e=>setAmount(e.target.value)} /><button className="btn" onClick={topup}>Top-Up Credit</button></div>
      </div>
    </div>
  );
}
