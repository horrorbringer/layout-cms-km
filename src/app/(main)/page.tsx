'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MousePointer2, Globe, Zap, Shield } from 'lucide-react';
import Image from 'next/image';
import FeatureCard from '@/components/design-a/FeatureCard';
import Footer from '@/components/design-a/Footer';

const MImage = motion(Image);

const ImageReveal = ({ src, alt }: { src: string, alt: string }) => (
    <div className="overflow-hidden rounded-[2rem] relative h-[400px] md:h-[500px] w-full group">
        <MImage
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
            <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View Case Study</span>
            <h3 className="text-2xl md:text-3xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{alt}</h3>
        </div>
    </div>
);

export default function HomePage() {
    return (
        <main>
            {/* --- HERO SECTION --- */}
            <header className="pt-32 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center min-h-[85vh]">
                <div className="max-w-2xl order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 bg-[#F5F5F7] rounded-lg text-xs font-bold uppercase tracking-widest text-titan-navy mb-6 md:mb-8"
                    >
                        Est. 1999 • Phnom Penh
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-8 md:mb-10"
                    >
                        Constructing <br />
                        <span className="text-gray-300">Excellence.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 md:mb-12 max-w-lg"
                    >
                        We are Cambodia's leading construction firm, merging technical precision with sustainable innovation.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-4"
                    >
                        <button className="flex items-center gap-3 text-lg font-bold hover:gap-6 transition-all group">
                            View Projects
                            <div className="w-10 h-10 bg-[#F5F5F7] rounded-full flex items-center justify-center group-hover:bg-titan-navy group-hover:text-white transition-colors shadow-sm">
                                <ArrowRight size={18} />
                            </div>
                        </button>
                    </motion.div>
                </div>

                <div className="relative h-[400px] md:h-[600px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group order-1 lg:order-2 shadow-2xl">
                    <MImage
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        src="/images/projects/Thumbnail-1.jpg"
                        alt="Hero Architecture"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10"></div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl max-w-[200px] md:max-w-xs shadow-lg z-10 border border-white/50"
                    >
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Current Focus</div>
                        <div className="text-sm md:text-lg font-bold text-titan-navy">Sustainable Infrastructure Development</div>
                    </motion.div>
                </div>
            </header>

            {/* --- STATS MARQUEE (Infinite Scroll) --- */}
            <div className="bg-titan-navy text-white py-6 md:py-8 overflow-hidden">
                <div className="flex gap-12 md:gap-24 animate-marquee whitespace-nowrap">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                            <span className="font-bold text-lg md:text-xl tracking-wider">ISO 9001:2015 CERTIFIED</span>
                            <div className="w-2 h-2 bg-titan-red rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- SERVICES --- */}
            <section className="py-20 md:py-32 px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-md leading-tight">Capabilities & <br />Expertise</h2>
                    <a href="#" className="font-bold border-b border-titan-navy pb-1 hover:text-titan-red hover:border-titan-red transition-colors">View All Capabilities</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        index={0}
                        title="Design & Build"
                        desc="Comprehensive delivery from initial concept to final handover."
                        icon={MousePointer2}
                    />
                    <FeatureCard
                        index={1}
                        title="Infrastructure"
                        desc="Roads, bridges, and public utility networks connecting the nation."
                        icon={Globe}
                    />
                    <FeatureCard
                        index={2}
                        title="Renovation"
                        desc="Modernizing existing structures with structural integrity."
                        icon={Zap}
                    />
                    <FeatureCard
                        index={3}
                        title="Management"
                        desc="Rigorous project oversight and quality assurance."
                        icon={Shield}
                    />
                </div>
            </section>

            {/* --- FEATURED WORK --- */}
            <section className="py-20 md:py-32 px-6 md:px-12 bg-[#F5F5F7] rounded-none md:rounded-[3rem] mx-0 md:mx-8 mb-8 md:mb-12">
                <div className="max-w-[1600px] mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">Portfolio</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Building Landmarks</h2>
                        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                            From government headquarters to commercial high-rises, our portfolio defines the modern Cambodian skyline.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-8 mt-0 lg:mt-24">
                            <ImageReveal src="/images/projects/Thumbnail-2.jpg" alt="Ministry of Economy" />
                            <div className="px-2 md:px-8">
                                <h3 className="text-2xl font-bold mb-2">Government Projects</h3>
                                <p className="text-gray-500">Trusted partner for national infrastructure.</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="px-2 md:px-8 text-left lg:text-right hidden lg:block">
                                <h3 className="text-2xl font-bold mb-2">Commercial Towers</h3>
                                <p className="text-gray-500">High-rise engineering excellence.</p>
                            </div>
                            <ImageReveal src="/images/projects/Thumbnail-3.jpg" alt="Vattanac Extension" />
                            <div className="px-2 md:px-8 lg:hidden">
                                <h3 className="text-2xl font-bold mb-2">Commercial Towers</h3>
                                <p className="text-gray-500">High-rise engineering excellence.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
