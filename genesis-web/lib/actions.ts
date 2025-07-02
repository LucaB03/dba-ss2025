"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

// Types for order positions
type OrderPosition = {
    artikelId: number
    quantity: number
}

type OrderWithDetails = {
    bestellung_id: number
    benutzerkonto_id: number | null
    bestelldatum: Date
    status: "offen" | "verpackt" | "versandt" | "abgeschlossen"
    positionen: OrderPosition[]
    customerEmail?: string
    totalAmount?: number
}

export async function getAllOrders(): Promise<OrderWithDetails[]> {
    try {
        // First get all orders with basic info
        const orders = await prisma.bESTELLUNG.findMany({
            include: {
                BENUTZERKONTO: {
                    select: {
                        email: true,
                    },
                },
                ZAHLUNG: {
                    select: {
                        betrag: true,
                        datum: true,
                        zahlungsmethode: true,
                    },
                },
            },
            orderBy: {
                bestelldatum: "desc",
            },
        })

        // Get positions for each order using raw SQL
        const ordersWithPositions: OrderWithDetails[] = []

        for (const order of orders) {
            // Raw SQL query to get positions array
            const positionsResult = await prisma.$queryRaw<Array<{ positionen: any }>>`SELECT to_jsonb(positionen) AS "positionen" FROM "BESTELLUNG" WHERE bestellung_id = ${order.bestellung_id}`

            let positions: OrderPosition[] = []
            if (positionsResult.length > 0 && positionsResult[0].positionen) {
                // Parse the positions array - assuming it's stored as array of objects
                try {
                    const positionsData = positionsResult[0].positionen
                    if (Array.isArray(positionsData)) {
                        positions = positionsData.map((pos: any) => ({
                            artikelId: pos.artikel_id || pos.artikelId,
                            quantity: pos.quantity || pos.menge || 1,
                        }))
                    }
                } catch (error) {
                    console.error(`Error parsing positions for order ${order.bestellung_id}:`, error)
                }
            }

            // Calculate total amount from payments
            const totalAmount = order.ZAHLUNG.reduce((sum, payment) => {
                return sum + (payment.betrag || 0)
            }, 0)

            ordersWithPositions.push({
                bestellung_id: order.bestellung_id,
                benutzerkonto_id: order.benutzerkonto_id,
                bestelldatum: order.bestelldatum,
                status: order.status,
                positionen: positions,
                customerEmail: order.BENUTZERKONTO?.email || "",
                totalAmount: totalAmount,
            })
        }

        return ordersWithPositions
    } catch (error) {
        console.error("Error fetching orders:", error)
        throw new Error("Failed to fetch orders")
    }
}

export async function getOrdersByStatus(
    status: "offen" | "verpackt" | "versandt" | "abgeschlossen",
): Promise<OrderWithDetails[]> {
    try {
        const orders = await prisma.bESTELLUNG.findMany({
            where: {
                status: status,
            },
            include: {
                BENUTZERKONTO: {
                    select: {
                        email: true,
                    },
                },
                ZAHLUNG: {
                    select: {
                        betrag: true,
                        datum: true,
                        zahlungsmethode: true,
                    },
                },
            },
            orderBy: {
                bestelldatum: "desc",
            },
        })

        // Get positions for each order using raw SQL
        const ordersWithPositions: OrderWithDetails[] = []

        for (const order of orders) {
            const positionsResult = await prisma.$queryRaw<Array<{ positionen: any }>>`
        SELECT to_jsonb(positionen) AS "positionen" FROM "BESTELLUNG" WHERE bestellung_id = ${order.bestellung_id}
      `

            let positions: OrderPosition[] = []
            if (positionsResult.length > 0 && positionsResult[0].positionen) {
                try {
                    const positionsData = positionsResult[0].positionen
                    if (Array.isArray(positionsData)) {
                        positions = positionsData.map((pos: any) => ({
                            artikelId: pos.artikel_id || pos.artikelId,
                            quantity: pos.quantity || pos.menge || 1,
                        }))
                    }
                } catch (error) {
                    console.error(`Error parsing positions for order ${order.bestellung_id}:`, error)
                }
            }

            const totalAmount = order.ZAHLUNG.reduce((sum, payment) => {
                return sum + (payment.betrag || 0)
            }, 0)

            ordersWithPositions.push({
                bestellung_id: order.bestellung_id,
                benutzerkonto_id: order.benutzerkonto_id,
                bestelldatum: order.bestelldatum,
                status: order.status,
                positionen: positions,
                customerEmail: order.BENUTZERKONTO?.email || "",
                totalAmount: totalAmount,
            })
        }

        return ordersWithPositions
    } catch (error) {
        console.error("Error fetching orders by status:", error)
        throw new Error("Failed to fetch orders by status")
    }
}

export async function updateOrderStatus(
    bestellungId: number,
    status: "offen" | "verpackt" | "versandt" | "abgeschlossen",
) {
    try {
        await prisma.bESTELLUNG.update({
            where: {
                bestellung_id: bestellungId,
            },
            data: {
                status: status,
            },
        })

        revalidatePath("/orders")
        return { success: true, message: "Order status updated successfully" }
    } catch (error) {
        console.error("Error updating order status:", error)
        return { success: false, message: "Failed to update order status" }
    }
}

export async function getOrderById(bestellungId: number): Promise<OrderWithDetails | null> {
    try {
        const order = await prisma.bESTELLUNG.findUnique({
            where: {
                bestellung_id: bestellungId,
            },
            include: {
                BENUTZERKONTO: {
                    select: {
                        email: true,
                    },
                },
                ZAHLUNG: {
                    select: {
                        betrag: true,
                        datum: true,
                        zahlungsmethode: true,
                    },
                },
            },
        })

        if (!order) return null

        // Get positions using raw SQL
        const positionsResult = await prisma.$queryRaw<Array<{ positionen: any }>>`
      SELECT to_jsonb(positionen) AS "positionen" FROM "BESTELLUNG" WHERE bestellung_id = ${order.bestellung_id}
    `

        let positions: OrderPosition[] = []
        if (positionsResult.length > 0 && positionsResult[0].positionen) {
            try {
                const positionsData = positionsResult[0].positionen
                if (Array.isArray(positionsData)) {
                    positions = positionsData.map((pos: any) => ({
                        artikelId: pos.artikel_id || pos.artikelId,
                        quantity: pos.quantity || pos.menge || 1,
                    }))
                }
            } catch (error) {
                console.error(`Error parsing positions for order ${order.bestellung_id}:`, error)
            }
        }

        const totalAmount = order.ZAHLUNG.reduce((sum, payment) => {
            return sum + (payment.betrag || 0)
        }, 0)

        return {
            bestellung_id: order.bestellung_id,
            benutzerkonto_id: order.benutzerkonto_id,
            bestelldatum: order.bestelldatum,
            status: order.status,
            positionen: positions,
            customerEmail: order.BENUTZERKONTO?.email || "",
            totalAmount: totalAmount,
        }
    } catch (error) {
        console.error("Error fetching order by ID:", error)
        return null
    }
}

// Keep existing return functions
export async function getReturns() {
    try {
        const returns = await prisma.rETOURE.findMany({
            include: {
                BESTELLUNG: {
                    select: {
                        bestellung_id: true,
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

export async function createReturn(formData: FormData) {
    try {
        const bestellungId = Number.parseInt(formData.get("bestellungId") as string)
        const grund = formData.get("grund") as string

        // Validate inputs
        if (!bestellungId || isNaN(bestellungId)) {
            return { success: false, message: "Ungültige Bestellnummer" }
        }

        if (!grund || grund.trim().length === 0) {
            return { success: false, message: "Grund für die Rücksendung ist erforderlich" }
        }

        // Call the database procedure
        await prisma.$executeRaw`CALL create_retoure(CAST(${bestellungId} AS INTEGER), ${grund});`

        revalidatePath("/")
        revalidatePath("/customer-returns")

        return {
            success: true,
            message: "Rücksendung wurde erfolgreich eingereicht",
        }
    } catch (error) {
        console.error("Error creating return:", error)

        // Handle specific database errors
        if (error instanceof Error) {
            if (error.message.includes("does not exist") || error.message.includes("not found")) {
                return { success: false, message: "Bestellung nicht gefunden" }
            }
        }

        return { success: false, message: "Fehler beim Erstellen der Rücksendung" }
    }
}