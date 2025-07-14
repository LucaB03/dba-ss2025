import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  // Hol dir userId
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Keine userId angegeben" }, { status: 400 });
  }

  // Hole Bestellungen aus der Datenbank
  const orders = await prisma.$queryRaw`
    SELECT * FROM get_order_history(${Number(userId)}::int);
  `;

  // positionen parsen
  const fixedOrders = orders.map(order => ({
    ...order,
    positionen: typeof order.positionen === "string"
      ? JSON.parse(order.positionen)
      : order.positionen
  }));

  return NextResponse.json(fixedOrders);
}