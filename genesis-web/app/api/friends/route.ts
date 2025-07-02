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

  // Hole alle Freundschaften, in denen dieses Profil vorkommt
  const freundschaften = await prisma.fREUNDSCHAFTEN.findMany({
    where: {
      OR: [
        { spielerprofil_1_id: eigenesProfil.spielerprofil_id },
        { spielerprofil_2_id: eigenesProfil.spielerprofil_id }
      ]
    }
  });

  // Extrahiere die IDs der Freunde (immer der jeweils andere)
  const freundIds = freundschaften.map(f =>
    f.spielerprofil_1_id === eigenesProfil.spielerprofil_id
      ? f.spielerprofil_2_id
      : f.spielerprofil_1_id
  );

  // Hole die Profilinfos der Freunde
  const freunde = freundIds.length
    ? await prisma.sPIELERPROFIL.findMany({
        where: { spielerprofil_id: { in: freundIds } },
        select: { spielerprofil_id: true, anzeigename: true, profilbild_url: true }
      })
    : [];

  return NextResponse.json({ freunde });
}