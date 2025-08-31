import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "node:crypto";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = crypto.randomBytes(16).toString("hex");
  await prisma.signupRequest.create({ data: { business_name: body.business_name, contact_person: body.contact_person, email: body.email, phone: body.phone, token } });
  console.log("Approval link:", `/api/owner/approve?token=${token}`);
  return NextResponse.json({ ok: true });
}
