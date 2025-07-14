// app/api/inventar/route.ts
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

// Simpler Token-basierter Auth-Check (z. B. userId im Header, lokal gespeichert)
export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Spielerprofil holen
    const profil = await prisma.sPIELERPROFIL.findUnique({
      where: { benutzerkonto_id: parseInt(userId) },
      select: { inventar_id: true },
    });

    if (!profil) {
      return NextResponse.json({ error: "Inventar nicht gefunden" }, { status: 404 });
    }

    // Stored Procedure aufrufen
    const inventar = await prisma.$queryRaw`
      SELECT * FROM get_inventory_for_profile(${profil.inventar_id}::int);
    `;

    return NextResponse.json({ inventar });
  } catch (err) {
    console.error("Inventar API Fehler:", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}