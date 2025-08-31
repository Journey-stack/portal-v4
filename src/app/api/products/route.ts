import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resolvePrice } from "@/lib/pricing";
const DEMO_AGENT_ID = "demo-agent-id";
export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get("country") ?? undefined;
  const where: any = {};
  if (country) where.country_code = country.toUpperCase();
  const products = await prisma.productCache.findMany({ where, take: 30 });
  const withPrice = await Promise.all(products.map(async p => ({
    plan_code: p.plan_code, plan_name: p.plan_name, data_amount_gb: p.data_amount_gb, validity_days: p.validity_days, country_code: p.country_code, region: p.region, price_usd: await resolvePrice(DEMO_AGENT_ID, p.plan_code)
  })));
  return NextResponse.json(withPrice);
}
