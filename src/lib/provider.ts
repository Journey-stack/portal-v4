const BASE = process.env.ESIM_ACCESS_BASE_URL!;
const API_KEY = process.env.ESIM_ACCESS_API_KEY!;
async function call(path: string, opts: RequestInit = {}) {
  const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}`, ...(opts.headers||{}) };
  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  if (!res.ok) throw new Error(`Provider error ${res.status}`);
  return res.json();
}
export async function listProducts(params?: { country?: string; region?: string }) {
  const q = new URLSearchParams(params as any).toString();
  return call(`/products${q ? "?" + q : ""}`);
}
export async function createEsim(input: { plan_code: string; customer_ref?: string }) {
  return call(`/esims`, { method: "POST", body: JSON.stringify(input) });
}
export async function topupEsim(iccid: string, plan_code: string) {
  return call(`/esims/${iccid}/topup`, { method: "POST", body: JSON.stringify({ plan_code }) });
}
export async function getEsimStatus(iccid: string) { return call(`/esims/${iccid}`); }
