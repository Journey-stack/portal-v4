import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-owner-secret");
  if (secret !== process.env.OWNER_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { agent_email, rules } = await req.json();
  const agent = await prisma.agent.findFirst({ where: { email: agent_email } });
  if (!agent) return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  for (const r of rules as any[]) {
    await prisma.agentPriceRule.upsert({ where: { agent_id_plan_code: { agent_id: agent.id, plan_code: r.plan_code } as any }, create: { agent_id: agent.id, plan_code: r.plan_code, price_usd: r.price_usd }, update: { price_usd: r.price_usd } });
  }
  return NextResponse.json({ ok: true, count: rules.length });
}
