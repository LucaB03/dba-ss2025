import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Download } from "lucide-react"
import Link from "next/link"

// MTG Page
export default function MTGPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-red-500 via-blue-500 to-yellow-400">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-blue-600 to-yellow-500">
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-20"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full opacity-30"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-red-300 rounded-full opacity-25"></div>
                </div>

                <div className="relative container mx-auto px-4 py-16 text-center">
                    <div className="mb-8">
                        <div className="relative mb-8">
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                                MONSTER TECH
                                <span className="block text-yellow-300 text-stroke">GENESIS</span>
                            </h1>
                        </div>

                        <p className="text-xl md:text-2xl text-white font-semibold mb-8 max-w-4xl mx-auto drop-shadow-md">
                            🌟 Become the ultimate Monster Trainer! Catch, train, and battle with over 250 unique creatures across 8
                            challenging Gyms in the most epic adventure yet! 🌟
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                        <Button
                            size="lg"
                            className="bg-red-600 hover:bg-red-700 text-white px-10 py-6 text-xl font-bold rounded-full shadow-lg border-4 border-white"
                        >
                            <Play className="mr-3 h-6 w-6" />
                            START ADVENTURE
                        </Button>
                        <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-xl font-bold rounded-full shadow-lg border-4 border-white"
                        >
                            <Download className="mr-3 h-6 w-6" />
                            DOWNLOAD FREE
                        </Button>
                    </div>

                    {/* Main Game Screenshot */}
                    <div className="relative max-w-5xl mx-auto">
                        <div className="bg-white p-4 rounded-2xl shadow-2xl">
                            <img
                                src="/game_banner.png"
                                alt="Pokemon-style battle scene"
                                className="rounded-xl w-full"
                            />
                        </div>
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                            ⚡
                        </div>
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl">
                            🔥
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Pokemon Style */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center bg-red-100 p-6 rounded-2xl border-4 border-red-300">
                            <div className="text-5xl mb-2">🔴</div>
                            <div className="text-4xl font-black text-red-600 mb-2">250+</div>
                            <div className="text-red-800 font-bold">Unique Monsters</div>
                        </div>
                        <div className="text-center bg-blue-100 p-6 rounded-2xl border-4 border-blue-300">
                            <div className="text-5xl mb-2">👥</div>
                            <div className="text-4xl font-black text-blue-600 mb-2">10M+</div>
                            <div className="text-blue-800 font-bold">Active Trainers</div>
                        </div>
                        <div className="text-center bg-yellow-100 p-6 rounded-2xl border-4 border-yellow-300">
                            <div className="text-5xl mb-2">🏆</div>
                            <div className="text-4xl font-black text-yellow-600 mb-2">8</div>
                            <div className="text-yellow-800 font-bold">Gym Leaders</div>
                        </div>
                        <div className="text-center bg-green-100 p-6 rounded-2xl border-4 border-green-300">
                            <div className="text-5xl mb-2">⭐</div>
                            <div className="text-4xl font-black text-green-600 mb-2">4.9★</div>
                            <div className="text-green-800 font-bold">Trainer Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Monster Showcase */}
            <section className="py-20 bg-gradient-to-r from-green-400 to-blue-500">
                <div className="container mx-auto px-4">
                    <h2 className="text-6xl font-black text-center text-white mb-4 drop-shadow-lg">MEET THE MONSTERS</h2>
                    <p className="text-center text-white text-xl mb-16 font-semibold">
                        Discover incredible creatures with unique abilities!
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {/* Fire Type */}
                        <Card className="bg-gradient-to-br from-red-400 to-orange-500 border-4 border-white shadow-2xl">
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-4">🔥</div>
                                <img
                                    src="/fire_pokemon_showcase.png"
                                    alt="Fire-type monster"
                                    className="mx-auto mb-4 rounded-full border-4 border-white"
                                />
                                <h3 className="text-2xl font-black text-white mb-2">FIRE TYPES</h3>
                                <p className="text-red-100 font-semibold">Blazing hot monsters with devastating fire attacks!</p>
                            </CardContent>
                        </Card>

                        {/* Water Type */}
                        <Card className="bg-gradient-to-br from-blue-400 to-cyan-500 border-4 border-white shadow-2xl">
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-4">💧</div>
                                <img
                                    src="/water_pokemon_showcase.png"
                                    alt="Water-type monster"
                                    className="mx-auto mb-4 rounded-full border-4 border-white"
                                />
                                <h3 className="text-2xl font-black text-white mb-2">WATER TYPES</h3>
                                <p className="text-blue-100 font-semibold">Aquatic creatures with powerful water-based moves!</p>
                            </CardContent>
                        </Card>

                        {/* Electric Type */}
                        <Card className="bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-white shadow-2xl">
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-4">⚡</div>
                                <img
                                    src="/electric_pokemon_showcase.png"
                                    alt="Electric-type monster"
                                    className="mx-auto mb-4 rounded-full border-4 border-white"
                                />
                                <h3 className="text-2xl font-black text-white mb-2">ELECTRIC TYPES</h3>
                                <p className="text-yellow-100 font-semibold">Lightning-fast monsters with shocking abilities!</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Game Features - Pokemon Style */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-6xl font-black text-center mb-16 text-gray-800">ADVENTURE FEATURES</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="bg-gradient-to-br from-red-500 to-pink-500 border-4 border-red-300 shadow-xl">
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-4">⚔️</div>
                                <h3 className="text-2xl font-black text-white mb-4">EPIC BATTLES</h3>
                                <p className="text-red-100 font-semibold text-lg">
                                    Challenge Gym Leaders and become the Champion! Strategic turn-based combat awaits!
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-blue-300 shadow-xl">
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-4">🌟</div>
                                <h3 className="text-2xl font-black text-white mb-4">EVOLUTION</h3>
                                <p className="text-blue-100 font-semibold text-lg">
                                    Watch your monsters evolve into powerful new forms with incredible abilities!
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-500 to-teal-500 border-4 border-green-300 shadow-xl">
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-4">🗺️</div>
                                <h3 className="text-2xl font-black text-white mb-4">EXPLORE REGIONS</h3>
                                <p className="text-green-100 font-semibold text-lg">
                                    Journey through diverse regions filled with wild monsters and hidden secrets!
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 border-4 border-yellow-300 shadow-xl">
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-4">👥</div>
                                <h3 className="text-2xl font-black text-white mb-4">TRADE & BATTLE</h3>
                                <p className="text-yellow-100 font-semibold text-lg">
                                    Connect with friends to trade monsters and battle in real-time!
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 border-4 border-purple-300 shadow-xl">
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-4">🏆</div>
                                <h3 className="text-2xl font-black text-white mb-4">TOURNAMENTS</h3>
                                <p className="text-purple-100 font-semibold text-lg">
                                    Compete in global tournaments and earn legendary rewards!
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-pink-500 to-rose-500 border-4 border-pink-300 shadow-xl">
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-4">✨</div>
                                <h3 className="text-2xl font-black text-white mb-4">SHINY HUNTING</h3>
                                <p className="text-pink-100 font-semibold text-lg">
                                    Discover rare shiny variants with unique colors and enhanced stats!
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Screenshots Gallery */}
            <section className="py-20 bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="container mx-auto px-4">
                    <h2 className="text-6xl font-black text-center text-white mb-16 drop-shadow-lg">GAME SCREENSHOTS</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="relative group cursor-pointer">
                            <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-yellow-300">
                                <img
                                    src={"/wild_monster_encounter.png"}
                                    alt={"Wild Monster Encounter"}
                                    className="rounded-xl w-full transition-transform group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 text-3xl bg-white rounded-full p-2">{"🌿"}</div>
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="text-white font-bold text-lg">{"Wild Monster Encounter"}</h3>
                            </div>
                        </div>
                        <div className="relative group cursor-pointer">
                            <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-yellow-300">
                                <img
                                    src={"/gym_battle.png"}
                                    alt={"Gym Battle Arena"}
                                    className="rounded-xl w-full transition-transform group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 text-3xl bg-white rounded-full p-2">{"🏟️"}</div>
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="text-white font-bold text-lg">{"Gym Battle Arena"}</h3>
                            </div>
                        </div>
                        <div className="relative group cursor-pointer">
                            <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-yellow-300">
                                <img
                                    src={"/evolution.png"}
                                    alt={"Monster Evolution"}
                                    className="rounded-xl w-full transition-transform group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 text-3xl bg-white rounded-full p-2">{"✨"}</div>
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="text-white font-bold text-lg">{"Monster Evolution"}</h3>
                            </div>
                        </div>
                        <div className="relative group cursor-pointer">
                            <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-yellow-300">
                                <img
                                    src={"/trading_center.png"}
                                    alt={"Trading Center"}
                                    className="rounded-xl w-full transition-transform group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 text-3xl bg-white rounded-full p-2">{"🔄"}</div>
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="text-white font-bold text-lg">{"Trading Center"}</h3>
                            </div>
                        </div>
                        <div className="relative group cursor-pointer">
                            <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-yellow-300">
                                <img
                                    src={"/tournament_mode.png"}
                                    alt={"Tournament Mode"}
                                    className="rounded-xl w-full transition-transform group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 text-3xl bg-white rounded-full p-2">{"🏆"}</div>
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="text-white font-bold text-lg">{"Tournament Mode"}</h3>
                            </div>
                        </div>
                        <div className="relative group cursor-pointer">
                            <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-yellow-300">
                                <img
                                    src={"/monster_collection.png"}
                                    alt={"Monster Collection"}
                                    className="rounded-xl w-full transition-transform group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 text-3xl bg-white rounded-full p-2">{"📱"}</div>
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="text-white font-bold text-lg">{"Monster Collection"}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-8xl mb-8">🎮</div>
                    <h2 className="text-6xl font-black text-white mb-8 drop-shadow-lg">YOUR ADVENTURE AWAITS!</h2>
                    <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-bold drop-shadow-md">
                        Join millions of trainers worldwide and become the ultimate Monster Tech Genesis Champion! The journey to
                        become the very best starts now! ⚡
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center">
                        <Button
                            size="lg"
                            className="bg-green-600 hover:bg-green-700 text-white px-16 py-8 text-2xl font-black rounded-full shadow-2xl border-4 border-white transform hover:scale-105 transition-transform"
                        >
                            <Play className="mr-4 h-8 w-8" />
                            START YOUR JOURNEY
                        </Button>
                        <Button
                            size="lg"
                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-16 py-8 text-2xl font-black rounded-full shadow-2xl border-4 border-white transform hover:scale-105 transition-transform"
                        >
                            <Download className="mr-4 h-8 w-8" />
                            DOWNLOAD NOW
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
