"use client";
import { useState } from "react";
export default function Esims() {
  const [country, setCountry] = useState("");
  const [plans, setPlans] = useState<any[]>([]);
  const [form, setForm] = useState({ customer_name: "", tags: "" });
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  async function searchCountry() {
    const res = await fetch(`/api/products?country=${encodeURIComponent(country)}`);
    if (res.ok) setPlans(await res.json());
  }
  async function createEsim() {
    const body = { plan_code: selectedPlan.plan_code, customer_name: form.customer_name, tags: form.tags.split(",").map(s=>s.trim()).filter(Boolean) };
    const res = await fetch("/api/esims", { method:"POST", body: JSON.stringify(body) });
    if (!res.ok) return alert("Failed to create eSIM");
    const j = await res.json();
    alert(`Created! ICCID: ${j.iccid}`);
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">eSIMs</h1>
      <div className="card space-y-3">
        <div className="font-medium">Create New eSIM</div>
        <div className="flex gap-2">
          <input className="input" placeholder="Type a country to find a data plan..." value={country} onChange={e=>setCountry(e.target.value)} />
          <button className="btn" onClick={searchCountry}>Search</button>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {plans.map((p:any)=> (
            <div key={p.plan_code} className={`card ${selectedPlan?.plan_code===p.plan_code ? "ring-2 ring-blue-400" : ""}`}>
              <div className="font-medium">{p.plan_name}</div>
              <div className="text-sm text-[#a9b7d1]">Data: {p.data_amount_gb ?? "?"} GB · Valid {p.validity_days ?? "?"} d</div>
              <div className="mt-1 text-lg">${p.price_usd?.toFixed?.(2) ?? p.price_usd}</div>
              <button className="btn mt-3" onClick={()=>setSelectedPlan(p)}>Select</button>
            </div>
          ))}
        </div>
        {selectedPlan && (
          <div className="card">
            <div className="font-medium mb-2">Selected: {selectedPlan.plan_name}</div>
            <div className="grid md:grid-cols-2 gap-3">
              <input className="input" placeholder="Customer Name/Identifier (optional)" value={form.customer_name} onChange={e=>setForm(s=>({...s,customer_name:e.target.value}))} />
              <input className="input" placeholder="Tags (comma separated, optional)" value={form.tags} onChange={e=>setForm(s=>({...s,tags:e.target.value}))} />
            </div>
            <button className="btn mt-3" onClick={createEsim}>Create eSIM</button>
          </div>
        )}
      </div>
    </div>
  );
}
