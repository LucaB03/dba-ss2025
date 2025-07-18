import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import bcrypt from "bcrypt";

// Login-Route für Benutzer
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email und Passwort sind erforderlich" },
      { status: 400 }
    );
  }

  // Benutzer anhand der Email suchen
  const user = await prisma.bENUTZERKONTO.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Passwort-Hash überprüfen
  const passwordMatch = await bcrypt.compare(password, user.passwort_hash);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
  }

  return NextResponse.json({ success: true, userId: user.benutzerkonto_id });
}
