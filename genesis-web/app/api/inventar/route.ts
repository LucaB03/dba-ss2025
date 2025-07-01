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
    // Suche das Spielerprofil zum Benutzerkonto
    const profil = await prisma.sPIELERPROFIL.findUnique({
      where: { benutzerkonto_id: parseInt(userId) },
      include: {
        INVENTAR: {
          include: {
            // Beispiel: Sobald Artikelrelationen bestehen, einbauen
            // positionen: true,
          },
        },
      },
    });

    if (!profil || !profil.INVENTAR) {
      return NextResponse.json({ error: "Inventar nicht gefunden" }, { status: 404 });
    }

    return NextResponse.json({ inventar: profil.INVENTAR });
  } catch (err) {
    console.error("Inventar API Fehler:", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}