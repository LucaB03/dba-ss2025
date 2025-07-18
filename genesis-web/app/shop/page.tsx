// app/shop/page.tsx
import { prisma } from "@/lib/prismadb";
import ShopClient from "./ShopClient";

// Shop-Seite, die alle verfügbaren Artikel anzeigt
export default async function ShopPage() {
  // Stored Procedure aufrufen
  const raw = await prisma.$queryRaw`
    SELECT * FROM get_shop_items();
  ` as any[];

  // Artikel in ein nutzerfreundliches Format umwandeln
  const items = raw.map((a) => ({
    id:          a.artikel_id,
    name:        a.bezeichnung,
    description: a.beschreibung,
    price:       Number(a.preis),
    type:        a.typ as "digital" | "spielgegenstand" | "merchandise" | "abonnement",
    available:   a.verfuegbar,
  }));

  return <ShopClient initialItems={items} />;
}