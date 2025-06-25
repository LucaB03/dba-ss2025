// app/api/artikel/route.ts
import { NextResponse } from "next/server";
import { getClient } from "@/lib/server/db";

export async function GET() {
  const client = await getClient();
  try {
    const { rows } = await client.query(`
      SELECT
        artikel_id        AS id,
        bezeichnung       AS name,
        beschreibung      AS description,
        preis             AS price,
        typ               AS type,
        verfuegbar        AS available,
        spielauswirkungen AS effects
      FROM public."ARTIKEL"
      ORDER BY artikel_id
      LIMIT 100
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("[API ARTIKEL] GET", error);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  } finally {
    await client.end();
  }
}