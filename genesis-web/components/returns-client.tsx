"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Check, X } from "lucide-react"
import { acceptReturn, declineReturn, sendShippingLabel, confirmReceipt } from "@/lib/actions"

interface ReturnsClientProps {
    retoureId: number
    status: string
    bestellungId: number
}

export function AcceptDeclineButtons({ retoureId, bestellungId }: { retoureId: number; bestellungId: number }) {
    const { toast } = useToast()

    const handleAccept = async () => {
        const result = await acceptReturn(retoureId)
        toast({
            title: result.success ? "Erfolg" : "Fehler",
            description: result.message,
            variant: result.success ? "default" : "destructive",
        })
    }

    const handleDecline = async () => {
        const result = await declineReturn(retoureId)
        toast({
            title: result.success ? "Erfolg" : "Fehler",
            description: result.message,
            variant: result.success ? "default" : "destructive",
        })
    }

    return (
        <div className="space-x-2">
            <Button size="sm" onClick={handleAccept} className="bg-green-600 hover:bg-green-700">
                <Check className="h-4 w-4 mr-1" />
                Akzeptieren
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDecline}>
                <X className="h-4 w-4 mr-1" />
                Ablehnen
            </Button>
        </div>
    )
}

export function StatusActionButtons({ retoureId, status }: { retoureId: number; status: string }) {
    const { toast } = useToast()

    const handleSendShippingLabel = async () => {
        const result = await sendShippingLabel(retoureId)
        toast({
            title: result.success ? "Erfolg" : "Fehler",
            description: result.message,
            variant: result.success ? "default" : "destructive",
        })
    }

    const handleConfirmReceipt = async () => {
        const result = await confirmReceipt(retoureId)
        toast({
            title: result.success ? "Erfolg" : "Fehler",
            description: result.message,
            variant: result.success ? "default" : "destructive",
        })
    }

    if (status === "akzeptiert") {
        return (
            <Button size="sm" onClick={handleSendShippingLabel}>
                Versandetikett versenden
            </Button>
        )
    }

    if (status === "inBearbeitung") {
        return (
            <Button size="sm" onClick={handleConfirmReceipt}>
                Wareneingang bestätigen
            </Button>
        )
    }

    return null
}
