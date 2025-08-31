import { NextRequest, NextResponse } from "next/server";
import { topupEsim } from "@/lib/provider";
export async function POST(req: NextRequest, { params }: { params: { iccid: string } }) {
  const body = await req.json(); await topupEsim(params.iccid, body.plan_code); return NextResponse.json({ ok: true });
}
