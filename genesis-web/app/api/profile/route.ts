import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Keine userId angegeben" }, { status: 400 });
  }
  const user = await prisma.bENUTZERKONTO.findUnique({
    where: { benutzerkonto_id: Number(userId) },
    include: { KUNDE: true },
  });
  if (!user) {
    return NextResponse.json({ error: "Benutzer nicht gefunden" }, { status: 404 });
  }
  return NextResponse.json({
    email: user.email,
    erstellt: user.erstellt,
    rolle: user.rolle,
    kunde: user.KUNDE,
  });
}
