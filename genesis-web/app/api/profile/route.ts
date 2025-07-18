import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

// API-Route zum Abrufen des Benutzerprofils
export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Keine userId angegeben" }, { status: 400 });
  }

  // Benutzerkonto und zugehörige Daten abrufen
  const user = await prisma.bENUTZERKONTO.findUnique({
    select: {
      email: true,
      erstellt: true,
      rolle: true,
      KUNDE: {
        select: {
          vorname: true,
          nachname: true,
          titel: true,
          geburtsdatum: true
        }
      }
    },
    where: { benutzerkonto_id: Number(userId) }
  });
  if (!user) {
    return NextResponse.json({ error: "Benutzer nicht gefunden" }, { status: 404 });
  }

  let address = await prisma.$queryRaw`SELECT to_jsonb("KUNDE".adresse) AS "adresse" FROM "KUNDE" JOIN "BENUTZERKONTO" on "KUNDE".kunde_id = "BENUTZERKONTO".kunde_id WHERE "BENUTZERKONTO".benutzerkonto_id = ${Number(userId)};`

  user["KUNDE"].adresse = address[0].adresse
  // Spielerprofil abrufen
  const profil = await prisma.sPIELERPROFIL.findUnique({
    where: { benutzerkonto_id: Number(userId) }
  });
  return NextResponse.json({
    user,
    profil
  });
}