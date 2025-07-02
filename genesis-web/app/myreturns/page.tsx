"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Package, ArrowLeft, CheckCircle } from "lucide-react"
import { createReturn } from "@/lib/actions"

export default function CustomerReturns() {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true)

        try {
            const result = await createReturn(formData)

            if (result.success) {
                setIsSubmitted(true)
                toast({
                    title: "Rücksendung eingereicht",
                    description: result.message,
                    duration: 5000,
                })
            } else {
                toast({
                    title: "Fehler",
                    description: result.message,
                    variant: "destructive",
                    duration: 5000,
                })
            }
        } catch (error) {
            toast({
                title: "Fehler",
                description: "Ein unerwarteter Fehler ist aufgetreten",
                variant: "destructive",
                duration: 5000,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                            <h2 className="text-2xl font-bold text-green-600">Erfolgreich eingereicht!</h2>
                            <p className="text-gray-600">
                                Ihre Rücksendungsanfrage wurde erfolgreich eingereicht. Sie erhalten in Kürze eine Bestätigung per
                                E-Mail.
                            </p>
                            <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Weitere Rücksendung einreichen
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Toaster />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-lg mx-auto">
                <div className="text-center mb-8">
                    <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900">Rücksendung einreichen</h1>
                    <p className="text-gray-600 mt-2">Geben Sie Ihre Bestellnummer und den Grund für die Rücksendung an</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Rücksendungsformular</CardTitle>
                        <CardDescription>Alle Felder sind erforderlich</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="bestellungId">Bestellnummer *</Label>
                                <Input
                                    id="bestellungId"
                                    name="bestellungId"
                                    type="number"
                                    placeholder="z.B. 12345"
                                    required
                                    className="w-full"
                                />
                                <p className="text-sm text-gray-500">Die Bestellnummer finden Sie in Ihrer Bestellbestätigung</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="grund">Grund der Rücksendung *</Label>
                                <Textarea
                                    id="grund"
                                    name="grund"
                                    placeholder="Beschreiben Sie bitte den Grund für die Rücksendung..."
                                    required
                                    className="w-full min-h-[120px]"
                                />
                                <p className="text-sm text-gray-500">
                                    z.B. Defekt, falsche Größe, entspricht nicht der Beschreibung, etc.
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-semibold text-blue-900 mb-2">Wichtige Hinweise:</h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Rücksendungen werden innerhalb von 2-3 Werktagen bearbeitet</li>
                                    <li>• Sie erhalten eine E-Mail-Bestätigung nach der Einreichung</li>
                                    <li>• Bei Annahme erhalten Sie ein kostenloses Versandetikett</li>
                                    <li>• Die Erstattung erfolgt nach Wareneingang</li>
                                </ul>
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Wird eingereicht...
                                    </>
                                ) : (
                                    <>
                                        <Package className="h-4 w-4 mr-2" />
                                        Rücksendung einreichen
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Haben Sie Fragen? Kontaktieren Sie unseren{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Kundenservice
                        </a>
                    </p>
                </div>
            </div>

            <Toaster />
        </div>
    )
}
