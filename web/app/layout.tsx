import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const orbitron = Orbitron({
    subsets: ["latin"],
    variable: "--font-orbitron",
});

const rajdhani = Rajdhani({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-rajdhani",
});

export const metadata: Metadata = {
    title: "Lamborghini Aventador | The Evolution of Speed",
    description: "A digital scrollytelling experience of the Lamborghini Aventador.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-[#1a1a1a]">
            <body className={`${orbitron.variable} ${rajdhani.variable} font-body antialiased text-white`}>
                <SmoothScroll>{children}</SmoothScroll>
            </body>
        </html>
    );
}
