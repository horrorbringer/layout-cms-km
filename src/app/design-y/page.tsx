'use client';

import React, { useRef } from 'react';
import { ArrowRight, ArrowUpRight, MoveRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// --- COMPONENTS ---

// 1. Sticky Project Card
const ProjectCard = ({ project, index, range, targetScale, progress }: any) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    // Scale image slightly as we scroll away
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    // The scale of the CARD itself (stacking effect)
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${index * 25}px)` }}
                className="relative flex flex-col pt-0 w-full max-w-[1200px] h-[70vh] origin-top bg-white shadow-2xl overflow-hidden rounded-sm border border-gray-100"
            >
                <div className="flex flex-col md:flex-row h-full">
                    {/* Image Section */}
                    <div className="w-full md:w-[65%] h-full relative overflow-hidden group">
                        <motion.div style={{ scale: imageScale }} className="w-full h-full">
                            <img
                                src={project.img}
                                alt={project.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

                        <div className="absolute top-6 left-6 z-10">
                            <div className="bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-widest text-titan-navy border-l-2 border-titan-red">
                                {project.cat}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-[35%] h-full bg-white p-8 md:p-12 flex flex-col justify-between relative">
                        {/* Giant Number */}
                        <span className="absolute -top-6 -right-6 text-[10rem] font-black text-gray-50 opacity-50 select-none leading-none z-0">
                            0{project.id}
                        </span>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black text-titan-navy mb-6 leading-tight">{project.name}</h2>
                            <p className="text-titan-navy-subtle text-sm leading-relaxed mb-8 font-medium">
                                A defining structure in {project.loc}. This project exemplifies the intersection of sustainable engineering and modern aesthetics, delivering value that lasts for generations.
                            </p>

                            <div className="space-y-4 border-t border-gray-100 pt-6">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-titan-navy uppercase tracking-wider">Location</span>
                                    <span className="text-titan-navy-subtle">{project.loc}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-titan-navy uppercase tracking-wider">Completion</span>
                                    <span className="text-titan-navy-subtle">2024</span>
                                </div>
                            </div>
                        </div>

                        <Link href={`/design-y/projects/${project.id}`} className="group relative z-10 flex items-center justify-between border-b-2 border-titan-navy/10 pb-4 hover:border-titan-red transition-colors pt-6">
                            <span className="font-bold text-titan-navy text-sm uppercase tracking-widest group-hover:text-titan-red transition-colors">Explore Case Study</span>
                            <MoveRight className="text-titan-navy group-hover:translate-x-2 transition-transform group-hover:text-titan-red" size={20} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// 2. Interactive Service Stripe
const ServiceStripe = ({ service, index }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group border-t border-titan-navy/10 hover:border-titan-navy/100 transition-colors duration-500 py-12 cursor-pointer relative overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-8 md:gap-16">
                    <span className="text-sm font-black text-titan-red/50 group-hover:text-titan-red uppercase tracking-widest transition-colors font-mono">0{index + 1}</span>
                    <h3 className="text-3xl md:text-5xl font-light text-titan-navy group-hover:font-black transition-all duration-300">{service.title}</h3>
                </div>
                <div className="md:w-1/3 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="hidden md:block text-xs font-bold uppercase tracking-widest text-titan-navy-subtle">
                        {service.shortDesc}
                    </p>
                    <ArrowUpRight size={24} className="text-titan-navy transform group-hover:rotate-45 group-hover:text-titan-red transition-all duration-300" />
                </div>
            </div>
            {/* Hover Background */}
            <div className="absolute inset-0 bg-titan-bg-alt/30 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
        </motion.div>
    )
}


export default function DesignUniqueY() {
    // --- Data ---
    const projects = [
        { id: 1, name: 'Ministry of Economy', loc: 'Phnom Penh', cat: 'Government', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670' },
        { id: 2, name: 'Vattanac Extension', loc: 'Phnom Penh', cat: 'Commercial', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670' },
        { id: 3, name: 'Sihanoukville Port', loc: 'Sihanoukville', cat: 'Infrastructure', img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2670' },
        { id: 4, name: 'Eco-Industrial Park', loc: 'Kampot', cat: 'Industrial', img: 'https://images.unsplash.com/photo-1590240901242-d64e95ed4ae4?q=80&w=2670' },
    ];

    // Smooth Scroll Hook for Project Stacking
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div className="bg-white selection:bg-titan-red selection:text-white">

            {/* --- HERO: Technical Architectural Canvas --- */}
            <header className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-titan-bg px-6">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="relative z-10 max-w-[1600px] w-full mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                        {/* Text Section */}
                        <div className="lg:col-span-8 relative z-20 mix-blend-difference text-white">
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="block text-titan-navy font-bold uppercase tracking-widest text-sm mb-4">Established 1999</span>
                                <h1 className="text-[13vw] lg:text-[10vw] leading-[0.8] font-black tracking-tighter text-titan-navy mb-6">
                                    KIMMEX
                                </h1>
                                <p className="text-xl md:text-3xl text-titan-navy font-light max-w-2xl leading-tight">
                                    Engineering the skyline of the future through precision, innovation, and unwavering integrity.
                                </p>
                            </motion.div>
                        </div>

                        {/* Image Section - Floating & Abstract */}
                        <div className="lg:col-span-4 relative h-[400px]">
                            <motion.div
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.2, delay: 0.2 }}
                                className="absolute top-0 right-0 w-full h-full lg:w-[140%] bg-gray-200 overflow-hidden"
                            >
                                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301" alt="Architecture" className="w-full h-full object-cover filter contrast-125" />
                                {/* Technical Overlay */}
                                <div className="absolute bottom-4 left-4 bg-white p-2 text-[10px] font-mono font-bold text-titan-navy uppercase">
                                    Fig. 01 — Corporate HQ
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full border-t border-titan-navy/10 py-6 bg-white/50 backdrop-blur-sm z-20">
                    <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-titan-navy">
                        <div className="flex gap-8">
                            <span>Scroll</span>
                            <span className="hidden md:inline">To Explore</span>
                        </div>
                        <div className="flex gap-8">
                            <span>ISO 9001:2015</span>
                            <span>Safety First</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- STATS MARQUEE --- */}
            <div className="border-b border-titan-navy bg-titan-navy text-white overflow-hidden py-4">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="flex whitespace-nowrap gap-16 items-center"
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16">
                            <span className="text-xl font-bold tracking-[0.2em] font-mono">BUILDING LEGACIES</span>
                            <span className="w-3 h-3 bg-titan-red rounded-full"></span>
                            <span className="text-xl font-bold tracking-[0.2em] font-mono">SINCE 1999</span>
                            <span className="w-3 h-3 bg-titan-red rounded-full"></span>
                            <span className="text-xl font-bold tracking-[0.2em] font-mono">150+ PROJECTS</span>
                            <span className="w-3 h-3 bg-titan-red rounded-full"></span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* --- PROJECTS: STICKY STACKING PARALLAX --- */}
            <div className="bg-titan-bg pt-32 pb-20 relative" ref={container}>
                <div className="max-w-[1600px] mx-auto px-6 mb-20 md:mb-0 md:sticky md:top-10 z-20 pointer-events-none">
                    <div className="flex items-end justify-between">
                        <h2 className="text-8xl md:text-[10rem] font-black text-white mix-blend-difference opacity-50 select-none">WORKS</h2>
                        <span className="hidden md:block text-sm font-bold bg-titan-red text-white px-4 py-1 uppercase tracking-widest mb-8">Selected Projects</span>
                    </div>
                </div>

                <div className="relative z-10 -mt-20 md:-mt-40">
                    {projects.map((project, i) => {
                        // Calculate stack scale
                        const targetScale = 1 - ((projects.length - i) * 0.05);
                        return <ProjectCard key={i} index={i} project={project} range={[i * 0.25, 1]} targetScale={targetScale} progress={scrollYProgress} />
                    })}
                </div>
            </div>

            {/* --- SERVICES: INTERACTIVE GRID --- */}
            <section className="py-32 bg-white relative">
                <div className="max-w-[1600px] mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-end">
                    <div>
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy">Core Capabilities</h2>
                    </div>
                    <div className="hidden md:block w-40 h-[1px] bg-titan-navy/20 mb-4"></div>
                </div>

                <div className="border-b border-titan-navy/10">
                    {[
                        { title: 'General Construction', shortDesc: 'Commercial & Industrial' },
                        { title: 'Infrastructure', shortDesc: 'Roads & Utilities' },
                        { title: 'M.E.P Engineering', shortDesc: 'Mechanical Systems' },
                        { title: 'Project Management', shortDesc: 'Cost & Quality Control' },
                    ].map((service, i) => (
                        <ServiceStripe key={i} service={service} index={i} />
                    ))}
                </div>
            </section>

            {/* --- PARTNERS: GLOBAL NETWORK --- */}
            <section className="py-24 bg-white border-y border-gray-100 relative overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-6 mb-12 text-center">
                    <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-2 block">Trusted Partners</span>
                    <h2 className="text-2xl md:text-3xl font-black text-titan-navy">Industry Leaders</h2>
                </div>

                <div className="relative w-full">
                    {/* Gradients for smooth edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
                        className="flex items-center w-max"
                    >
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex items-center">
                                {[1, 2, 3, 4, 5, 9, 1, 2, 3, 4].map((num, i) => (
                                    <div key={`${setIndex}-${i}`} className="w-80 h-48 flex items-center justify-center border-r border-gray-50 px-12 group hover:bg-gray-50/50 transition-colors">
                                        <img
                                            src={`/patner/${num}.png`}
                                            alt="Partner"
                                            className="h-20 w-auto object-contain filter grayscale-0 opacity-100 hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- CTA: Large Typography --- */}
            <section className="py-40 bg-titan-navy text-white text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <h2 className="text-[10vw] md:text-[8rem] font-black leading-[0.8] mb-12 tracking-tighter">
                        START <span className="text-titan-red">NOW</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-titan-navy-subtle mb-12 max-w-2xl mx-auto font-light">
                        We are ready to bring your vision to life. Schedule a consultation with our engineering team today.
                    </p>
                    <Link href="/design-y/contact" className="group inline-flex items-center gap-4 bg-white text-titan-navy px-12 py-6 font-bold uppercase tracking-widest hover:bg-titan-red hover:text-white transition-all duration-300 shadow-xl">
                        Start A Project
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
