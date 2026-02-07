"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, MotionValue } from "framer-motion";

interface Props {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function CarScrollCanvas({ scrollYProgress, totalFrames, imageFolderPath }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = `${imageFolderPath}/${i}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setImagesLoaded(true);
                }
            };
            images.push(img);
        }
        imagesRef.current = images;
    }, [totalFrames, imageFolderPath]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !imagesRef.current[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = imagesRef.current[index];

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Cover/Contain logic
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Handle Resize and Initial Render
    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(dpr, dpr);

            renderFrame(0);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [imagesLoaded]);

    // Sync scroll to frame
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );
        renderFrame(frameIndex);
    });

    return (
        <div className="fixed inset-0 w-full h-full z-0 bg-lambo-black">
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-contain"
            />
            {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                    <div className="flex flex-col items-center gap-6 relative">
                        {/* Loading Spinner */}
                        <div className="w-24 h-24 rounded-full border border-white/10 relative animate-[spin_3s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-lambo-yellow shadow-[0_0_20px_#F5C211]" />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <p className="font-heading text-xl tracking-[0.5em] text-white font-bold italic">
                                SYSTEM<span className="text-lambo-yellow">_BOOT</span>
                            </p>
                            <div className="flex gap-1">
                                <motion.div
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                                    className="w-16 h-[2px] bg-lambo-yellow"
                                />
                                <motion.div
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                    className="w-4 h-[2px] bg-lambo-yellow"
                                />
                                <motion.div
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                                    className="w-2 h-[2px] bg-lambo-yellow"
                                />
                            </div>
                            <p className="text-[10px] text-white/30 font-mono tracking-widest mt-2">INITIALIZING NEURAL GRAPHICS ENGINE /// V12.0</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
