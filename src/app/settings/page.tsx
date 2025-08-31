"use client";
import { useState } from "react";
export default function Settings() {
  const [form, setForm] = useState({ business_name:"", contact_person:"", email:"", phone:"", street:"", city:"", postal:"", country:"" });
  function save() { alert("Saved (todo: wire API)"); }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Business Settings</h1>
      <div className="card grid md:grid-cols-2 gap-3">
        {Object.entries({business_name:"Business Name",contact_person:"Contact Person",email:"Contact Email",phone:"Phone Number",street:"Street",city:"City",postal:"Postal Code",country:"Country"}).map(([k,label]) => (
          <div key={k}><label className="block text-sm text-[#a9b7d1] mb-1">{label}</label><input className="input" value={(form as any)[k]||""} onChange={e=>setForm(s=>({...s,[k]:e.target.value}))}/></div>
        ))}
        <div className="md:col-span-2"><button className="btn" onClick={save}>Save Changes</button></div>
      </div>
    </div>
  );
}
