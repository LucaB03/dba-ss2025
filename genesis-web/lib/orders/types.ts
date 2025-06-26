// lib/orders/types.ts

// Einzelne Position in einer Bestellung
export type OrderPosition = {
  artikelId: number;
  quantity: number;
};

// Das Bestell-Objekt, so wie es deine API zurückgibt
export type Bestellung = {
  id: number;
  benutzerkontoId: number | null;
  spielerprofilId: number | null;
  bestelldatum: string; // ISO-String
  status: "offen" | "verpackt" | "versandt" | "abgeschlossen";
  positionen: OrderPosition[];
};