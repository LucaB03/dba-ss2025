import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Keine userId angegeben" }, { status: 400 });
  }
  const user = await prisma.bENUTZERKONTO.findUnique({
    where: { benutzerkonto_id: Number(userId) }
  });
  if (!user) {
    return NextResponse.json({ error: "Benutzer nicht gefunden" }, { status: 404 });
  }
  // Spielerprofil abrufen
  const profil = await prisma.sPIELERPROFIL.findUnique({
    where: { benutzerkonto_id: Number(userId) }
  });
  return NextResponse.json({
    email: user.email,
    erstellt: user.erstellt,
    rolle: user.rolle,
    // profil ist ggf. null, falls noch nicht angelegt
    profil
  });
}