'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Building2, HardHat, Layout, Wrench, MapPin, Award } from 'lucide-react';

export default function Hero() {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);

    return (
        <header className="relative min-h-screen overflow-hidden bg-titan-navy">
            <motion.div style={{ y: heroY }} className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/projects/Thumbnail-1.jpg"
                    className="w-full h-full object-cover"
                >
                    <source src="/hero-construction.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-titan-navy/70"></div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-32 right-10 w-64 h-64 border-2 border-accent-orange/20 rounded-full hidden lg:block"></div>
            <div className="absolute top-48 right-24 w-32 h-32 border-2 border-white/10 rounded-full hidden lg:block"></div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen max-w-[1400px] mx-auto px-6 flex items-center pt-32 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="w-16 h-1 bg-accent-orange"></div>
                            <span className="text-accent-orange font-bold tracking-[0.2em] uppercase text-sm">
                                Since 1999
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tight"
                        >
                            WE BUILD
                            <br />
                            <span className="text-accent-orange">YOUR VISION</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-white/70 max-w-lg mb-10 leading-relaxed"
                        >
                            Cambodia&apos;s premier construction company delivering world-class infrastructure, commercial buildings, and government projects with precision and excellence.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link href="/design-x/projects" className="group bg-accent-orange text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-titan-navy transition-all duration-300 flex items-center gap-3 rounded">
                                <span>Our Projects</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </Link>
                            <Link href="/design-x/contact" className="group border-2 border-white text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-titan-navy transition-all duration-300 flex items-center gap-3 rounded">
                                <Phone size={18} />
                                <span>Contact Us</span>
                            </Link>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex gap-8 mt-12 pt-8 border-t border-white/20"
                        >
                            {[
                                { val: '150+', label: 'Projects' },
                                { val: '25+', label: 'Years' },
                                { val: '500+', label: 'Team' },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-4xl font-black text-accent-orange">{stat.val}</div>
                                    <div className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Content - Featured Project Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden lg:block z-20"
                    >
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[500px]">
                                <Image
                                    src="/images/projects/Thumbnail-1.jpg"
                                    alt="Featured Project"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-transparent to-transparent z-10"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <span className="inline-block bg-accent-orange text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">Featured Project</span>
                                    <h3 className="text-white text-3xl font-bold">Ministry of Economy</h3>
                                    <p className="text-white/60 text-sm mt-2 flex items-center gap-2">
                                        <MapPin size={14} /> Phnom Penh, Cambodia
                                    </p>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl z-30">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                                        <Award className="text-accent-orange" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-titan-navy">A+</div>
                                        <div className="text-xs text-titan-navy/50 uppercase tracking-wider">Rating</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -top-4 -right-4 bg-titan-navy p-4 rounded-xl shadow-xl z-30">
                                <div className="text-accent-orange text-2xl font-black">ISO</div>
                                <div className="text-white text-xs">9001:2015</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 cursor-pointer z-20"
            >
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Scroll</span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 bg-accent-orange rounded-full"
                    />
                </div>
            </motion.div>

            {/* Bottom Service Tags */}
            <div className="absolute bottom-0 left-0 right-0 bg-white z-20">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {[
                            { icon: Building2, label: 'Commercial', desc: 'High-rise & Office' },
                            { icon: HardHat, label: 'Industrial', desc: 'Factory & Warehouse' },
                            { icon: Layout, label: 'Infrastructure', desc: 'Roads & Bridges' },
                            { icon: Wrench, label: 'Renovation', desc: 'Restore & Upgrade' },
                        ].map((item, i) => (
                            <Link href="/design-x/services" key={i} className="group px-6 py-5 border-r border-gray-100 last:border-r-0 hover:bg-accent-orange transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <item.icon size={24} className="text-accent-orange group-hover:text-white transition-colors" />
                                    <div>
                                        <div className="font-bold text-titan-navy group-hover:text-white transition-colors">{item.label}</div>
                                        <div className="text-xs text-titan-navy/50 group-hover:text-white/80 transition-colors">{item.desc}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
