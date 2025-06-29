// app/shop/page.tsx
import type { ARTIKEL } from "@prisma/client";
import { prisma }       from "@/lib/prismadb";
import ShopClient       from "./ShopClient";

export default async function ShopPage() {
  // nur die benötigten Felder laden
  const raw: ARTIKEL[] = await prisma.ARTIKEL.findMany({
    select: {
      artikel_id:  true,
      bezeichnung: true,
      beschreibung:true,
      typ:         true,
      preis:       true,
      verfuegbar:  true,
    },
  });

  // ins Client-Format übersetzen
  const items = raw.map((a) => ({
    id:          a.artikel_id,
    name:        a.bezeichnung,
    description: a.beschreibung,
    price:       a.preis,
    type:        a.typ as "digital" | "spielgegenstand" | "merchandise" | "abonnement",
    available:   a.verfuegbar,
  }));

  return <ShopClient initialItems={items} />;
}