import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Toaster } from "@/components/ui/toaster"
import { Package, Truck } from "lucide-react"
import { getReturns } from "@/lib/actions"
import { AcceptDeclineButtons, StatusActionButtons } from "@/components/returns-client"

// Seite für Shop-Administratoren zur Verwaltung von Rücksendungen
export default async function ShopAdminReturns() {
    const returns = await getReturns()

    const incomingReturns = returns.filter((r) => r.status === "offen")
    const acceptedReturns = returns.filter((r) => ["akzeptiert", "inBearbeitung", "abgeschlossen"].includes(r.status))

    // Funktion zum Erstellen von Status-Badges
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "offen":
                return <Badge variant="secondary">Offen</Badge>
            case "akzeptiert":
                return <Badge variant="outline">Akzeptiert</Badge>
            case "abgelehnt":
                return <Badge variant="destructive">Abgelehnt</Badge>
            case "inBearbeitung":
                return <Badge variant="default">In Bearbeitung</Badge>
            case "abgeschlossen":
                return <Badge className="bg-green-600">Abgeschlossen</Badge>
            default:
                return <Badge variant="secondary">Unbekannt</Badge>
        }
    }

    // Formatierungsfunktionen für Datum und Währung
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("de-DE").format(new Date(date))
    }

    // Formatierung für Währungsbeträge
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(amount)
    }

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Rücksendungen verwalten</h1>
                    <p className="text-muted-foreground">Verwalten Sie eingehende und akzeptierte Rücksendungen</p>
                </div>
            </div>

            {/* Incoming Returns Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Eingehende Rücksendungen ({incomingReturns.length})
                    </CardTitle>
                    <CardDescription>Neue Rücksendungsanfragen, die auf Ihre Genehmigung warten</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Retoure ID</TableHead>
                                <TableHead>Bestellung ID</TableHead>
                                <TableHead>Datum</TableHead>
                                <TableHead>Grund</TableHead>
                                <TableHead>Erstattungsbetrag</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aktionen</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {incomingReturns.map((returnItem) => (
                                <TableRow key={returnItem.retoure_id}>
                                    <TableCell className="font-medium">#{returnItem.retoure_id}</TableCell>
                                    <TableCell>#{returnItem.bestellung_id}</TableCell>
                                    <TableCell>{formatDate(returnItem.retouredatum)}</TableCell>
                                    <TableCell>{returnItem.grund || "Nicht angegeben"}</TableCell>
                                    <TableCell>{formatCurrency(returnItem.erstattungsbetrag)}</TableCell>
                                    <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <AcceptDeclineButtons retoureId={returnItem.retoure_id} bestellungId={returnItem.bestellung_id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {incomingReturns.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                                        Keine eingehenden Rücksendungen vorhanden
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Accepted Returns Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Akzeptierte Rücksendungen ({acceptedReturns.length})
                    </CardTitle>
                    <CardDescription>Genehmigte Rücksendungen und deren aktueller Status</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Retoure ID</TableHead>
                                <TableHead>Bestellung ID</TableHead>
                                <TableHead>Datum</TableHead>
                                <TableHead>Grund</TableHead>
                                <TableHead>Erstattungsbetrag</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aktionen</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {acceptedReturns.map((returnItem) => (
                                <TableRow key={returnItem.retoure_id}>
                                    <TableCell className="font-medium">#{returnItem.retoure_id}</TableCell>
                                    <TableCell>#{returnItem.bestellung_id}</TableCell>
                                    <TableCell>{formatDate(returnItem.retouredatum)}</TableCell>
                                    <TableCell>{returnItem.grund || "Nicht angegeben"}</TableCell>
                                    <TableCell>{formatCurrency(returnItem.erstattungsbetrag)}</TableCell>
                                    <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                                    <TableCell className="text-right">
                                        {returnItem.status === "abgeschlossen" ? (
                                            <Badge variant="secondary">Abgeschlossen</Badge>
                                        ) : (
                                            <StatusActionButtons retoureId={returnItem.retoure_id} status={returnItem.status} />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {acceptedReturns.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                                        Keine akzeptierten Rücksendungen vorhanden
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Toaster />
        </div>
    )
}
