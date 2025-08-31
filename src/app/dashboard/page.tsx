export default function Dashboard() {
  const KPIS = [
    { label: "Active eSIMs", value: 0 },
    { label: "Credit Balance", value: "$0.00" },
    { label: "Total Customers", value: 0 },
    { label: "New eSIMs (30d)", value: 0 },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        {KPIS.map(k=> (<div className="card" key={k.label}><div className="text-sm text-[#a9b7d1]">{k.label}</div><div className="text-2xl font-bold mt-1">{k.value}</div></div>))}
      </div>
    </div>
  );
}
