import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { email, password, vorname, nachname, titel, geburtsdatum } = await req.json();
    if (!email || !password || !vorname || !nachname || !titel || !geburtsdatum) {
      return NextResponse.json({ error: "Alle Felder sind erforderlich" }, { status: 400 });
    }

    const existing = await prisma.bENUTZERKONTO.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "E-Mail ist bereits registriert" }, { status: 409 });
    }

    const kunde = await prisma.kUNDE.create({
      data: {
        vorname,
        nachname,
        titel,
        geburtsdatum: new Date(geburtsdatum),
      },
    });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.bENUTZERKONTO.create({
      data: {
        email,
        passwort_hash: hash,
        kunde_id: kunde.kunde_id,
      },
    });

    return NextResponse.json({ success: true, userId: user.benutzerkonto_id });
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json({ error: "Serverfehler: " + (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}
