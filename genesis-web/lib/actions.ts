"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function getReturns() {
    try {
        const returns = await prisma.rETOURE.findMany({
            include: {
                BESTELLUNG: {
                    select: {
                        bestellung_id: true,
                        // Add other fields you need from BESTELLUNG table
                        // For example: kunde_name, bestellnummer, etc.
                    },
                },
            },
            orderBy: {
                retouredatum: "desc",
            },
        })

        return returns
    } catch (error) {
        console.error("Error fetching returns:", error)
        throw new Error("Failed to fetch returns")
    }
}

export async function acceptReturn(retoureId: number) {
    try {
        await prisma.rETOURE.update({
            where: {
                retoure_id: retoureId,
            },
            data: {
                status: "akzeptiert",
            },
        })

        revalidatePath("/")
        return { success: true, message: "Rücksendung wurde akzeptiert" }
    } catch (error) {
        console.error("Error accepting return:", error)
        return { success: false, message: "Fehler beim Akzeptieren der Rücksendung" }
    }
}

export async function declineReturn(retoureId: number) {
    try {
        await prisma.rETOURE.update({
            where: {
                retoure_id: retoureId,
            },
            data: {
                status: "abgelehnt",
            },
        })

        revalidatePath("/")
        return { success: true, message: "Rücksendung wurde abgelehnt" }
    } catch (error) {
        console.error("Error declining return:", error)
        return { success: false, message: "Fehler beim Ablehnen der Rücksendung" }
    }
}

export async function updateReturnStatus(
    retoureId: number,
    status: "offen" | "akzeptiert" | "abgelehnt" | "inBearbeitung" | "abgeschlossen",
) {
    try {
        await prisma.rETOURE.update({
            where: {
                retoure_id: retoureId,
            },
            data: {
                status: status,
            },
        })

        revalidatePath("/")
        return { success: true, message: "Status wurde aktualisiert" }
    } catch (error) {
        console.error("Error updating return status:", error)
        return { success: false, message: "Fehler beim Aktualisieren des Status" }
    }
}

export async function sendShippingLabel(retoureId: number) {
    try {
        await prisma.rETOURE.update({
            where: {
                retoure_id: retoureId,
            },
            data: {
                status: "inBearbeitung",
            },
        })

        revalidatePath("/")
        return { success: true, message: "Versandetikett wurde versendet" }
    } catch (error) {
        console.error("Error sending shipping label:", error)
        return { success: false, message: "Fehler beim Versenden des Versandetiketts" }
    }
}

export async function confirmReceipt(retoureId: number) {
    try {
        await prisma.rETOURE.update({
            where: {
                retoure_id: retoureId,
            },
            data: {
                status: "abgeschlossen",
            },
        })

        revalidatePath("/")
        return { success: true, message: "Wareneingang wurde bestätigt" }
    } catch (error) {
        console.error("Error confirming receipt:", error)
        return { success: false, message: "Fehler beim Bestätigen des Wareneingangs" }
    }
}
