'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layout, Star, Image as ImageIcon, Monitor } from 'lucide-react';
import Link from 'next/link';

// Card Component for the Design Selection
const DesignCard = ({
    title,
    id,
    subtitle,
    desc,
    path,
    icon: Icon,
    color,
    tag,
    index
}: {
    title: string,
    id: string,
    subtitle: string,
    desc: string,
    path: string,
    icon: any,
    color: string,
    tag?: string,
    index: number
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Link href={path} className="group block h-full">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-8 h-full transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">

                    {/* Top Tag */}
                    {tag && (
                        <div className={`absolute top-0 right-0 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-bl-xl`} style={{ backgroundColor: color }}>
                            {tag}
                        </div>
                    )}

                    {/* Top Decorative Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300" style={{ backgroundColor: `${color}15`, color: color }}>
                        <Icon size={28} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-lg" style={{ color: color }}>{id}.</span>
                            <h3 className="text-2xl font-bold text-gray-900">{subtitle}</h3>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            {desc}
                        </p>

                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:gap-4" style={{ color: color }}>
                            View Prototype
                            <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-gray-900 selection:text-white flex flex-col items-center justify-center p-6 md:p-12">

            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"
                >
                    Internal Review
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6"
                >
                    KIM MEX Design Concepts
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-500"
                >
                    Select a design direction below to launch the interactive prototype.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 max-w-[1600px] w-full">

                <DesignCard
                    index={0}
                    title="Design A"
                    id="A"
                    subtitle="The Titan"
                    desc="High-impact corporate presence with parallax effects and bold branding."
                    path="/design-a"
                    icon={Layout}
                    color="#2D3E6F" // Navy
                />

                <DesignCard
                    index={1}
                    title="Design X"
                    id="X"
                    subtitle="The Premium"
                    desc="Sophisticated blend of corporate authority and modern elegance."
                    path="/design-x"
                    icon={Star}
                    color="#FF6B00" // Orange
                    tag="Selected"
                />

                <DesignCard
                    index={2}
                    title="Design Y"
                    id="Y"
                    subtitle="The Visionary"
                    desc="Ultra-clean, editorial aesthetic with bold typography and heavy use of white space."
                    path="/design-y"
                    icon={ImageIcon} // Image icon as "Gallery" equivalent
                    color="#a18035" // Goldish
                    tag="New"
                />

                <DesignCard
                    index={3}
                    title="Design Z"
                    id="Z"
                    subtitle="The Future"
                    desc="Dark mode, glassmorphism, and neon aesthetics for a next-gen experience."
                    path="/design-z"
                    icon={Monitor}
                    color="#000000" // Black/Dark
                    tag="Future"
                />

            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-24 text-center text-gray-400 text-xs font-bold uppercase tracking-widest"
            >
                © 2026 Kimmex Construction • Internal Development Build
            </motion.div>

        </div>
    );
}
