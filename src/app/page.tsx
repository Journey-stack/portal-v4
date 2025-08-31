"use client";
import { useState } from "react";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ business_name: "", contact_person: "", email: "", phone: "" });
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const res = await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify(form) });
    setLoading(false); alert(res.ok ? "Signup received. We'll review and email you." : "Error submitting");
  }
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">Journey — Travel Agent Sign-up</h1>
      <p className="text-[#a9b7d1]">Apply to become a Journey eSIM reseller. We’ll review and approve quickly.</p>
      <form onSubmit={submit} className="card space-y-3">
        {["business_name","contact_person","email","phone"].map((k) => (
          <div key={k}><input className="input" required={k!=='phone'} placeholder={k.replace('_',' ').toUpperCase()} value={(form as any)[k]} onChange={e=>setForm(s=>({...s,[k]:e.target.value}))} /></div>
        ))}
        <button className="btn" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  );
}
