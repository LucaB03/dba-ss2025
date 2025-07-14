import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Keine userId angegeben" }, { status: 400 });
  }

  // Hole das eigene Spielerprofil (benutzerkonto_id → spielerprofil_id)
  const eigenesProfil = await prisma.sPIELERPROFIL.findUnique({
    where: { benutzerkonto_id: Number(userId) }
  });
  if (!eigenesProfil) {
    return NextResponse.json({ error: "Kein Spielerprofil gefunden" }, { status: 404 });
  }

  // Rufe die Stored Procedure auf
  const freunde = await prisma.$queryRaw`
    SELECT * FROM get_friends_for_profile(${eigenesProfil.spielerprofil_id}::int);
  `;

  return NextResponse.json({ freunde });
}