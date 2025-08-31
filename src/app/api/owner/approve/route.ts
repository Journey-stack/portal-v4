import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });
  const sr = await prisma.signupRequest.findFirst({ where: { token, status: "pending" } });
  if (!sr) return NextResponse.json({ error: "Invalid or used token" }, { status: 400 });
  const agent = await prisma.agent.create({ data: { business_name: sr.business_name, contact_person: sr.contact_person ?? undefined, email: sr.email, phone: sr.phone ?? undefined, billing_address: sr.billing_address ?? undefined, status: "approved", wallet: { create: { balance_usd: 0 } } }, include: { wallet: true } });
  await prisma.signupRequest.update({ where: { id: sr.id }, data: { status: "approved" } });
  return NextResponse.json({ ok: true, agent_id: agent.id });
}
