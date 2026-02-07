"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import CarScrollCanvas from "@/components/CarScrollCanvas";
import ExperienceOverlay from "@/components/ExperienceOverlay";
import SpeedLines from "@/components/SpeedLines";
import Configurator from "@/components/Configurator";
import EngineSection from "@/components/EngineSection";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <main className="bg-lambo-black text-white relative overflow-x-hidden selection:bg-lambo-yellow selection:text-black">
            <Navbar />
            <SpeedLines />
            <Configurator />

            {/* MAIN EXPERIENCE CONTAINER */}
            <section ref={containerRef} className="relative h-[600vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <CarScrollCanvas
                        scrollYProgress={scrollYProgress}
                        totalFrames={215}
                        imageFolderPath="/images/zonda-sequence"
                    />
                    <ExperienceOverlay scrollYProgress={scrollYProgress} />
                </div>
            </section>

            {/* ADDITIONAL SECTIONS */}
            <EngineSection />
            <section className="relative z-20 min-h-screen bg-lambo-black flex items-center justify-center p-20 border-t border-lambo-yellow/20">
                <div className="max-w-4xl text-center">
                    <h2 className="text-6xl font-heading mb-10 italic">BECOME THE LEGEND</h2>
                    <p className="text-xl opacity-60 leading-loose font-light">
                        The Lamborghini Aventador transcends the concept of a car.
                        It is raw emotion, captured in carbon fiber and unleashed on the asphalt.
                    </p>
                    <button className="mt-12 px-10 py-4 bg-transparent border border-lambo-yellow text-lambo-yellow font-heading tracking-widest hover:bg-lambo-yellow hover:text-black transition-all clip-angle">
                        CONFIGURE YOURS
                    </button>
                </div>
            </section>

            <footer className="relative z-20 py-20 px-10 border-t border-white/5 flex justify-between items-center opacity-40 text-xs bg-black">
                <p className="font-heading">© 2026 AUTOMOBILI LAMBORGHINI S.P.A.</p>
                <div className="flex gap-8 font-heading">
                    <a href="#" className="hover:text-lambo-yellow transition-colors">MODELS</a>
                    <a href="#" className="hover:text-lambo-yellow transition-colors">BRAND</a>
                    <a href="#" className="hover:text-lambo-yellow transition-colors">OWNERSHIP</a>
                </div>
            </footer>
        </main>
    );
}
