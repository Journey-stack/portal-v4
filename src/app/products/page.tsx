export default async function Products() {
  const products = [
    { plan_code: "USA_5GB_30D", plan_name: "USA 5GB / 30 Days", data_amount_gb: 5, validity_days: 30, price_usd: 12 },
    { plan_code: "EU_10GB_30D", plan_name: "Europe 10GB / 30 Days", data_amount_gb: 10, validity_days: 30, price_usd: 18 },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Products</h1>
      <div className="grid md:grid-cols-3 gap-3">
        {products.map(p=> (<div key={p.plan_code} className="card"><div className="font-medium">{p.plan_name}</div><div className="text-sm text-[#a9b7d1]">Data {p.data_amount_gb} GB · Valid {p.validity_days} d</div><div className="mt-1 text-lg">${p.price_usd.toFixed(2)}</div></div>))}
      </div>
    </div>
  );
}
