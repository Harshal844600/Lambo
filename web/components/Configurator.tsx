"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION DATA ---
const BASE_PRICE = 2800000;

const COLORS = [
    { name: "Giallo Orion", hex: "#F5C211", accent: "#FFD700", price: 0 },
    { name: "Arancio Borealis", hex: "#FF5F00", accent: "#FF8C00", price: 15000 },
    { name: "Verde Mantis", hex: "#48DF0C", accent: "#7CFC00", price: 15000 },
    { name: "Bianco Monocerus", hex: "#FFFFFF", accent: "#E0E0E0", price: 0 },
    { name: "Nero Aldebaran", hex: "#0a0a0a", accent: "#333333", price: 0 },
    { name: "Viola Pasifae", hex: "#8A2BE2", accent: "#9932CC", price: 18000 }, // Added for fun
];

const WHEELS = [
    { id: "magnesium", name: "Forged Magnesium", price: 0 },
    { id: "carbon", name: "Carbon Ceramic Aero", price: 15000 },
    { id: "centerlock", name: "Titanium Centerlock", price: 25000 },
];

const CALIPERS = [
    { id: "red", name: "Rosso", hex: "#DC2626", price: 0 },
    { id: "yellow", name: "Giallo", hex: "#F5C211", price: 0 },
    { id: "black", name: "Nero", hex: "#000000", price: 0 },
    { id: "silver", name: "Argento", hex: "#C0C0C0", price: 5000 },
];

const PACKS = [
    { id: "carbon_ext", name: "Carbon Fiber Exterior", price: 25000 },
    { id: "telemetry", name: "Track Telemetry", price: 8000 },
    { id: "titanium", name: "Titanium Exhaust", price: 12000 },
    { id: "alcantara", name: "Full Alcantara Cabin", price: 18000 },
];

export default function Configurator() {
    const [isOpen, setIsOpen] = useState(false);

    // State
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [selectedWheel, setSelectedWheel] = useState(WHEELS[0]);
    const [selectedCaliper, setSelectedCaliper] = useState(CALIPERS[1]);
    const [selectedPacks, setSelectedPacks] = useState<string[]>([]);

    // Logic
    const togglePack = (id: string) => {
        if (selectedPacks.includes(id)) {
            setSelectedPacks(selectedPacks.filter(p => p !== id));
        } else {
            setSelectedPacks([...selectedPacks, id]);
        }
    };

    const totalPrice = useMemo(() => {
        let total = BASE_PRICE + selectedColor.price + selectedWheel.price + selectedCaliper.price;
        selectedPacks.forEach(packId => {
            const pack = PACKS.find(p => p.id === packId);
            if (pack) total += pack.price;
        });
        return total;
    }, [selectedColor, selectedWheel, selectedCaliper, selectedPacks]);

    const handleColorChange = (color: typeof COLORS[0]) => {
        setSelectedColor(color);
        document.documentElement.style.setProperty("--color-lambo-yellow", color.hex);
        document.documentElement.style.setProperty("--color-lambo-accent", color.accent);
    };

    return (
        <>
            {/* TRIGGER BUTTON - PREMIUM BOTTOM BAR */}
            <motion.div
                className="fixed bottom-0 right-0 z-[60] w-full md:w-auto md:bottom-8 md:right-8"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                style={{ willChange: "transform" }}
                transition={{ delay: 1 }}
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full md:w-[300px] bg-black/90 backdrop-blur-xl border-t md:border border-white/10 p-4 md:rounded-sm flex items-center justify-between group hover:bg-lambo-yellow transition-colors duration-500"
                >
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest group-hover:text-black/60 transition-colors">Start Configuration</span>
                        <span className="text-white font-heading text-lg group-hover:text-black transition-colors">CONFIGURE YOURS</span>
                    </div>
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-black/20 transition-colors">
                        <svg className="w-4 h-4 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
            </motion.div>

            {/* FULL HEIGHT DRAWER */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* BACKDROP */}
                        <motion.div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* DRAWER */}
                        <motion.div
                            className="fixed top-0 right-0 h-full w-full md:w-[500px] z-[80] bg-[#0a0a0a] border-l border-white/10 flex flex-col shadow-2xl"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            style={{ willChange: "transform" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                        >
                            {/* HEADER */}
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-white font-heading text-xl italic">CONFIGURATION STUDIO</h2>
                                    <p className="text-xs text-gray-500 tracking-widest mt-1">CHASSIS: #760-ZR</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* SCROLLABLE CONTENT */}
                            <div className="flex-grow overflow-y-auto custom-scrollbar p-8 space-y-12 pb-32">

                                {/* SECTION: EXTERIOR */}
                                <div>
                                    <SectionTitle number="01" title="EXTERIOR FINISH" />
                                    <div className="grid grid-cols-2 gap-4">
                                        {COLORS.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => handleColorChange(color)}
                                                className={`p-4 border text-left transition-all duration-300 group ${selectedColor.name === color.name ? "border-lambo-yellow bg-white/5" : "border-white/10 hover:border-white/30"}`}
                                            >
                                                <div className="w-full h-24 mb-4 rounded-sm relative overflow-hidden">
                                                    <div className="absolute inset-0" style={{ backgroundColor: color.hex }} />
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className={`font-heading text-sm ${selectedColor.name === color.name ? "text-white" : "text-gray-400"}`}>{color.name}</p>
                                                    </div>
                                                    {selectedColor.name === color.name && <div className="w-2 h-2 bg-lambo-yellow rounded-full" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* SECTION: WHEELS */}
                                <div>
                                    <SectionTitle number="02" title="WHEELS & BRAKES" />
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 gap-2">
                                            {WHEELS.map((wheel) => (
                                                <button
                                                    key={wheel.id}
                                                    onClick={() => setSelectedWheel(wheel)}
                                                    className={`p-4 border flex items-center justify-between transition-all ${selectedWheel.id === wheel.id ? "border-lambo-yellow bg-white/5" : "border-white/10 hover:border-white/30"}`}
                                                >
                                                    <span className={`text-sm font-heading ${selectedWheel.id === wheel.id ? "text-white" : "text-gray-400"}`}>{wheel.name}</span>
                                                    <span className="text-xs text-gray-500">{wheel.price > 0 ? `+$${wheel.price.toLocaleString()}` : "Included"}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Caliper Color</p>
                                            <div className="flex gap-4">
                                                {CALIPERS.map((caliper) => (
                                                    <button
                                                        key={caliper.id}
                                                        onClick={() => setSelectedCaliper(caliper)}
                                                        className={`w-12 h-12 rounded-full border-2 relative transition-all ${selectedCaliper.id === caliper.id ? "border-white scale-110" : "border-transparent opacity-80 hover:opacity-100"}`}
                                                        style={{ backgroundColor: caliper.hex }}
                                                    >
                                                        {selectedCaliper.id === caliper.id && <div className="absolute inset-0 rounded-full ring-2 ring-lambo-yellow ring-offset-2 ring-offset-black" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION: OPTIONS */}
                                <div>
                                    <SectionTitle number="03" title="PERFORMANCE OPTIONS" />
                                    <div className="space-y-2">
                                        {PACKS.map((pack) => (
                                            <button
                                                key={pack.id}
                                                onClick={() => togglePack(pack.id)}
                                                className={`w-full p-4 border flex items-center justify-between transition-all group ${selectedPacks.includes(pack.id) ? "border-lambo-yellow bg-lambo-yellow/5" : "border-white/10 hover:border-white/30"}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${selectedPacks.includes(pack.id) ? "border-lambo-yellow bg-lambo-yellow text-black" : "border-gray-600"}`}>
                                                        {selectedPacks.includes(pack.id) && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                    </div>
                                                    <span className={`text-sm font-heading ${selectedPacks.includes(pack.id) ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}>{pack.name}</span>
                                                </div>
                                                <span className="text-xs text-gray-500">+${pack.price.toLocaleString()}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* STICKY FOOTER */}
                            <div className="p-8 border-t border-white/10 bg-[#0a0a0a] z-10 absolute bottom-0 left-0 w-full">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Estimated Total</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-heading text-white italic tracking-tighter block">${totalPrice.toLocaleString()}</span>
                                        <span className="text-[10px] text-gray-600 uppercase tracking-wider">Excl. Taxes & Delivery</span>
                                    </div>
                                </div>
                                <button className="w-full py-4 text-sm font-heading tracking-[0.2em] text-black bg-lambo-yellow hover:bg-white transition-all duration-300 font-bold clip-button relative overflow-hidden group">
                                    <span className="relative z-10">REQUEST ALLOCATION</span>
                                    <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function SectionTitle({ number, title }: { number: string, title: string }) {
    return (
        <div className="flex items-baseline gap-4 mb-6 pb-2 border-b border-white/10">
            <span className="text-sm font-heading text-lambo-yellow">{number}</span>
            <span className="text-sm font-heading text-white tracking-[0.2em]">{title}</span>
        </div>
    );
}
