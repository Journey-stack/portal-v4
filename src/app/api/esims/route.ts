import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resolvePrice } from "@/lib/pricing";
import { createEsim } from "@/lib/provider";
const DEMO_AGENT_ID = "demo-agent-id";
export async function GET() {
  const list = await prisma.esim.findMany({ where: { agent_id: DEMO_AGENT_ID }, take: 50 });
  return NextResponse.json(list);
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const price = await resolvePrice(DEMO_AGENT_ID, body.plan_code); // TODO: check wallet & deduct
  const created = await createEsim({ plan_code: body.plan_code, customer_ref: body.customer_name });
  const esim = await prisma.esim.create({ data: { agent_id: DEMO_AGENT_ID, iccid: created.iccid, plan_code: body.plan_code, customer_name: body.customer_name ?? null, tags: body.tags ?? [], status: "awaiting_activation", purchased_at: new Date() } });
  return NextResponse.json({ iccid: esim.iccid, qr: created.qr, manual: created.manual });
}
