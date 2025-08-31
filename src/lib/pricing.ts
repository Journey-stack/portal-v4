import { prisma } from "./db";
export async function resolvePrice(agentId: string, planCode: string) {
  const rule = await prisma.agentPriceRule.findFirst({ where: { agent_id: agentId, plan_code: planCode } });
  if (rule) return Number(rule.price_usd);
  const product = await prisma.productCache.findFirst({ where: { plan_code: planCode } });
  if (!product) throw new Error("Plan not found");
  if (product.retail_suggested_usd) return Number(product.retail_suggested_usd);
  return Math.round(Number(product.base_cost_usd) * 1.3 * 100) / 100;
}
