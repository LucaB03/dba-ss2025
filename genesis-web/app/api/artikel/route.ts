import { NextResponse } from "next/server";
import { getClient } from "@/lib/server/db";

export async function GET() {
  const client = await getClient();
  try {
    const { rows } = await client.query(`
      SELECT 
        artikel_id,
        bezeichnung,
        spielauswirkungen,
        beschreibung,
        typ,
        preis,
        verfuegbar
      FROM public."ARTIKEL"
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("[API ARTIKEL]", error);
    return new NextResponse("Interner Serverfehler", { status: 500 });
  } finally {
    await client.end();
  }
}