import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { cart } = await req.json();

  // Spielerprofil und Inventar aus der Datenbank holen
  const profil = await prisma.sPIELERPROFIL.findUnique({
    where: { benutzerkonto_id: Number(userId) },
    select: { inventar_id: true, spielerprofil_id: true },
  });
  if (!profil) return NextResponse.json({ error: "Kein Profil gefunden" }, { status: 404 });

  // Status bestimmen und Artikelinformationen holen
  const artikelIds = cart.map(item => item.id);
  const artikel = await prisma.aRTIKEL.findMany({
    where: { artikel_id: { in: artikelIds } },
    select: { artikel_id: true, typ: true },
  });

  const allMerch = artikel.every(a => a.typ === "merchandise");
  const status = allMerch ? "offen" : "abgeschlossen";

  const positionenArray =
    cart.length > 0
      ? `ARRAY[${cart.map(item => `ROW(${item.id}, 1)::artikelposition`).join(",")}]`
      : `ARRAY[]::artikelposition[]`;

  await prisma.$executeRawUnsafe(`
    SELECT checkout_and_add_to_orders_and_inventory(
      ${Number(userId)},
      ${profil.spielerprofil_id},
      ${profil.inventar_id},
      ${positionenArray},
      '${status}'::bestellung_status
    );
`);

  return NextResponse.json({ success: true });
}