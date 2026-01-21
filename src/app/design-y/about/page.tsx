'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Flag, Shield, Award, Users, TrendingUp, UserCheck, Warehouse, PencilRuler, HardHat, FileBarChart, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 450;
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy selection:bg-titan-red selection:text-white">
            {/* --- HERO: WHO WE ARE --- */}
            <header className="relative pt-48 pb-32 px-6 border-b border-titan-navy/10 bg-titan-bg overflow-hidden">
                {/* Technical Grid Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-2 h-2 bg-titan-red animate-pulse"></span>
                            <span className="font-mono text-xs uppercase tracking-widest text-titan-navy/60">/ About Kim Mex</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-titan-navy leading-[0.85] mb-8">
                            WHO <br /> <span className="text-transparent stroke-text-navy">WE ARE</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-titan-navy font-light max-w-2xl leading-relaxed">
                            Since 2015, we have been engineering the future of Cambodia. <br />
                            Bridging the gap between visionary design and structural reality.
                        </p>
                    </div>

                    <div className="border-l-2 border-titan-red pl-6 md:pl-12 py-2">
                        <div className="grid grid-cols-2 gap-x-12 gap-y-4 font-mono text-xs uppercase tracking-widest text-titan-navy">
                            <span className="opacity-50">Est.</span>
                            <span className="font-bold">2015</span>
                            <span className="opacity-50">HQ</span>
                            <span className="font-bold">Phnom Penh</span>
                            <span className="opacity-50">Team</span>
                            <span className="font-bold">250+</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- STRATEGIC PILLARS (GOAL / VISION / MISSION) --- */}
            <section className="py-32 border-b border-titan-navy/5">
                <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Goal */}
                    <div className="group border-t-2 border-titan-navy/10 pt-8 hover:border-titan-red transition-colors duration-500 delay-200">
                        <h3 className="font-mono text-xs text-titan-red uppercase tracking-widest mb-4">01. Goal</h3>
                        <h2 className="text-3xl font-bold text-titan-navy mb-6">Sustainable Exellence</h2>
                        <p className="text-titan-navy-subtle leading-relaxed">
                            To consistently exceed client expectations through operational discipline and a relentless pursuit of architectural perfection.
                        </p>
                    </div>
                    {/* Vision */}
                    <div className="group border-t-2 border-titan-navy/10 pt-8 hover:border-titan-red transition-colors duration-500 delay-100">
                        <h3 className="font-mono text-xs text-titan-red uppercase tracking-widest mb-4">02. Vision</h3>
                        <h2 className="text-3xl font-bold text-titan-navy mb-6">National Benchmark</h2>
                        <p className="text-titan-navy-subtle leading-relaxed">
                            To become the undisputed leader in Cambodia's construction sector, defining the skyline with safety, sustainability, and innovation.
                        </p>
                    </div>
                    {/* Mission */}
                    <div className="group border-t-2 border-titan-navy/10 pt-8 hover:border-titan-red transition-colors duration-500">
                        <h3 className="font-mono text-xs text-titan-red uppercase tracking-widest mb-4">03. Mission</h3>
                        <h2 className="text-3xl font-bold text-titan-navy mb-6">Precision Engineering</h2>
                        <p className="text-titan-navy-subtle leading-relaxed">
                            To deliver infrastructure that stands as a testament to quality, utilizing advanced methodologies to exceed international standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- COMPANY OVERVIEW / STORY --- */}
            <section className="py-32 bg-titan-bg/50 border-b border-titan-navy/5">
                <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row gap-20">
                    <div className="md:w-1/3">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">Company Overview</span>
                        <h2 className="text-5xl font-black text-titan-navy leading-[0.9] mb-8">
                            THE <br /> KIMMEX <br /> STORY
                        </h2>
                        <div className="w-20 h-1 bg-titan-navy"></div>
                    </div>
                    <div className="md:w-2/3 prose prose-lg prose-titan text-titan-navy-subtle">
                        <p className="text-xl font-light leading-relaxed text-titan-navy mb-8">
                            Founded in 2015, Kim Mex Construction & Investment Co., Ltd. began with a singular resolve: to elevate the standards of Cambodia’s construction industry. What started as a focused team of engineers has evolved into a powerhouse of national infrastructure.
                        </p>
                        <p>
                            Our journey is defined by a commitment to "Precision Engineering." In a rapidly developing market, we saw the need for a firm that prioritized not just speed, but structural integrity and aesthetic cohesion. Over the years, we have expanded our portfolio to include high-rise commercial towers, complex industrial plants, and luxury residential developments.
                        </p>
                        <p>
                            Today, Kim Mex stands as a beacon of reliability. We integrate modern construction methodologies with a deep understanding of local logistics and geography. We don't just build structures; we engineer the backbone of a modern Cambodia.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- CEO MESSAGE --- */}
            <section className="py-32 border-b border-titan-navy/5 bg-white relative overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-[4/5] bg-titan-navy relative">
                            {/* Decorative Frame */}
                            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-titan-navy/10 z-0"></div>
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800" alt="CEO" className="w-full h-full object-cover relative z-10 filter sepia-[.15] contrast-110" />
                            <div className="absolute bottom-8 left-[-2rem] bg-white p-6 shadow-xl z-20 max-w-xs">
                                <h3 className="text-xl font-black text-titan-navy uppercase">Okhna. Touch Kim</h3>
                                <p className="font-mono text-xs uppercase tracking-widest text-titan-red mt-1">CEO / Founder</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-6 block">Leadership Address</span>
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-8">MESSAGE FROM THE CEO</h2>
                        <blockquote className="text-lg md:text-xl text-titan-navy-subtle leading-relaxed font-light mb-8 italic border-l-4 border-titan-red pl-6">
                            "When we laid the first stone of Kim Mex, we didn't just plan to build buildings. We planned to build trust. Trust that every beam is secure, every timeline is met, and every promise is kept."
                        </blockquote>
                        <div className="space-y-6 text-titan-navy-subtle">
                            <p>
                                Welcome to Kim Mex. As we navigate a decade of growth, our focus remains unwavering. We are investing heavily in our people and our technology, ensuring that we stay ahead of the curve in an ever-evolving industry.
                            </p>
                            <p>
                                To our partners and clients, thank you for believing in our vision. Our success is a reflection of your ambition. Together, we will continue to shape the skyline of this great nation.
                            </p>
                        </div>
                        <div className="mt-12">
                            <img src="/signature-mock.png" alt="Signature" className="h-16 opacity-50" />
                            {/* Placeholder for signature, or remove if not needed. Using text for now if image fails */}
                            <div className="font-handwriting text-2xl text-titan-navy mt-4 opacity-70">Okhna. Touch Kim</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MILESTONES (CHRONOLOGY) --- */}
            <section className="py-32 bg-titan-bg/30 border-b border-titan-navy/5 overflow-hidden">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes scroll {
                        from { transform: translateX(0); }
                        to { transform: translateX(-50%); }
                    }
                    .animate-scroll-infinite {
                        animation: scroll 80s linear infinite;
                        width: max-content;
                    }
                    .timeline-container:hover .animate-scroll-infinite {
                        animation-play-state: paused;
                    }
                `}} />

                <div className="w-full">
                    <div className="max-w-[1600px] mx-auto px-6 mb-24">
                        <div className="flex flex-col md:flex-row justify-between items-end">
                            <div>
                                <h2 className="text-5xl md:text-7xl font-black text-titan-navy tracking-tight">MILESTONES</h2>
                                <span className="font-mono text-xs uppercase tracking-widest text-titan-navy/40 mb-2">History of Progress</span>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-titan-red opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-titan-red"></span>
                                </span>
                                <span className="text-[10px] font-mono text-titan-navy/50 uppercase tracking-widest">Live Timeline / Hover to Pause</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative timeline-container">
                        {/* Horizontal Line & Ruler */}
                        <div className="absolute top-[170px] left-0 w-full h-px bg-titan-navy/10 hidden md:block z-0"></div>
                        <div className="absolute top-[166px] left-0 w-full hidden md:flex justify-between z-0 px-2 opacity-30 pointer-events-none">
                            {/* Ruler Ticks (Simulated) */}
                            {Array.from({ length: 150 }).map((_, i) => (
                                <div key={i} className={`w-px bg-titan-navy ${i % 10 === 0 ? 'h-3' : 'h-1'}`}></div>
                            ))}
                        </div>

                        {/* Gradient Masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

                        {/* Scrolling Container */}
                        <div className="flex overflow-hidden">
                            <div
                                className="flex gap-12 px-4 animate-scroll-infinite"
                            >
                                {/* We render the items TWICE to create a seamless loop */}
                                {[...[
                                    { status: 'Completed', year: '2015', title: 'The Foundation', desc: 'Kim Mex establishes 2,000sqm HQ in Phnom Penh.', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600' },
                                    { status: 'Completed', year: '2016', title: 'First Venture', desc: 'Secure inaugural project: Mekong Riverside Complex.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600' },
                                    { status: 'Completed', year: '2018', title: 'Coastal Expansion', desc: 'Opened regional office in Sihanoukville.', img: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=600' },
                                    { status: 'Optimized', year: '2019', title: 'Workforce Growth', desc: 'Hit 100+ employees. Internal academy launched.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600' },
                                    { status: 'Certified', year: '2020', title: 'ISO 9001', desc: 'Achieved international QMS certification.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600' },
                                    { status: 'Milestone', year: '2022', title: 'High-Rise Expert', desc: 'Completed first 40-storey residential tower.', img: 'https://images.unsplash.com/photo-1486325212027-8081e4800290?q=80&w=600' },
                                    { status: 'Awarded', year: '2023', title: 'National Leader', desc: '"Top Infrastructure Partner" by MPWT.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600' },
                                    { status: 'Active', year: '2025', title: 'Green Future', desc: 'Eco-Build 2030 initiative launch.', img: 'https://images.unsplash.com/photo-1518544806352-a2286058e65e?q=80&w=600' }
                                ], ...[
                                    { status: 'Completed', year: '2015', title: 'The Foundation', desc: 'Kim Mex establishes 2,000sqm HQ in Phnom Penh.', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600' },
                                    { status: 'Completed', year: '2016', title: 'First Venture', desc: 'Secure inaugural project: Mekong Riverside Complex.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600' },
                                    { status: 'Completed', year: '2018', title: 'Coastal Expansion', desc: 'Opened regional office in Sihanoukville.', img: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=600' },
                                    { status: 'Optimized', year: '2019', title: 'Workforce Growth', desc: 'Hit 100+ employees. Internal academy launched.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600' },
                                    { status: 'Certified', year: '2020', title: 'ISO 9001', desc: 'Achieved international QMS certification.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600' },
                                    { status: 'Milestone', year: '2022', title: 'High-Rise Expert', desc: 'Completed first 40-storey residential tower.', img: 'https://images.unsplash.com/photo-1486325212027-8081e4800290?q=80&w=600' },
                                    { status: 'Awarded', year: '2023', title: 'National Leader', desc: '"Top Infrastructure Partner" by MPWT.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600' },
                                    { status: 'Active', year: '2025', title: 'Green Future', desc: 'Eco-Build 2030 initiative launch.', img: 'https://images.unsplash.com/photo-1518544806352-a2286058e65e?q=80&w=600' }
                                ]].map((item, i) => (
                                    <div
                                        key={i}
                                        className="md:min-w-[450px] md:w-[450px] relative group/card hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer"
                                    >
                                        {/* Card */}
                                        <div className="bg-white border text-left border-titan-navy/5 p-8 shadow-sm group-hover/card:shadow-2xl group-hover/card:border-titan-red/30 transition-all duration-500 flex flex-col h-full relative overflow-hidden">

                                            {/* Status Badge */}
                                            <div className="absolute top-0 right-0 p-4 z-20">
                                                <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-1 border bg-white ${item.status === 'Active' ? 'border-green-500 text-green-600' : 'border-titan-navy/20 text-titan-navy/40'}`}>
                                                    {item.status}
                                                </span>
                                            </div>

                                            {/* Image */}
                                            <div className="aspect-[2/1] overflow-hidden mb-6 bg-titan-bg relative border border-titan-navy/5 group-hover/card:border-titan-red/20 transition-colors">
                                                <div className="absolute inset-0 bg-titan-navy/10 group-hover/card:bg-transparent transition-colors z-10"></div>
                                                <img src={item.img} alt={item.title} className="w-full h-full object-cover filter grayscale group-hover/card:grayscale-0 group-hover/card:scale-110 transition-all duration-700" />
                                            </div>

                                            <div className="flex items-baseline gap-4 mb-2">
                                                <h3 className="text-4xl font-black text-titan-navy group-hover/card:text-titan-red transition-colors">{item.year}</h3>
                                                <div className="h-px bg-titan-navy/10 flex-1 group-hover/card:bg-titan-red/30 transition-colors"></div>
                                            </div>

                                            <h4 className="text-lg font-bold text-titan-navy mb-3 uppercase tracking-tight">{item.title}</h4>
                                            <p className="text-sm text-titan-navy-subtle leading-relaxed">{item.desc}</p>
                                        </div>

                                        {/* Timeline Connector (Desktop) */}
                                        <div className="absolute left-1/2 top-[164px] -translate-x-1/2 w-4 h-4 bg-white border-[3px] border-titan-navy rounded-full z-20 hidden md:block group-hover/card:scale-125 group-hover/card:border-titan-red transition-all shadow-[0_0_0_4px_white]"></div>

                                        {/* Vertical Guide Line (On Hover) */}
                                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-titan-red/50 -translate-x-1/2 -z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LEADERSHIP (PERSONNEL) --- */}
            <section className="py-32 max-w-[1600px] mx-auto px-6" id="leadership">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <div>
                        <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">Personnel</span>
                        <h2 className="text-5xl md:text-7xl font-black text-titan-navy tracking-tight">COMMAND HIERARCHY</h2>
                    </div>
                    <Link href="/design-y/contact" className="hidden md:flex items-center gap-2 border-b border-titan-navy pb-1 hover:text-titan-red hover:border-titan-red transition-colors">
                        <span className="uppercase tracking-widest text-xs font-bold">Join the Team</span>
                    </Link>
                </div>

                <div className="relative">
                    {/* Decorative Center Line for Org Chart */}
                    <div className="absolute left-1/2 -top-12 bottom-0 w-px bg-titan-navy/10 hidden md:block -translate-x-1/2 z-0"></div>

                    {/* Level 1: Executive Management (Deputy GM) */}
                    <div className="relative z-10 flex justify-center mb-16">
                        <div className="w-full max-w-sm">
                            <Link href="/design-y/about/deputy-gm" className="group cursor-pointer block bg-white border border-titan-navy/10 hover:border-titan-red transition-all p-4 shadow-xl">
                                <div className="aspect-[4/5] overflow-hidden mb-4 relative">
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800" alt="Deputy GM" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-black text-titan-navy uppercase mb-1 group-hover:text-titan-red transition-colors">Mr. Pauch Bunpheakdey</h3>
                                    <p className="font-mono text-xs uppercase tracking-widest text-titan-navy/50">Deputy General Manager</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Level 2 Connector - Horizontal Line */}
                    <div className="hidden md:block w-3/4 mx-auto border-t border-titan-navy/10 relative h-16">
                        {/* Vertical line connecting up to Dep GM */}
                        <div className="absolute left-1/2 -top-16 h-16 w-px bg-titan-navy/10 -translate-x-1/2"></div>
                        {/* Vertical lines connecting down to Directors (will be handled by their boxes mostly, but main stems here) */}
                        <div className="absolute left-1/6 top-0 h-8 w-px bg-titan-navy/10"></div>
                        <div className="absolute right-1/6 top-0 h-8 w-px bg-titan-navy/10"></div>
                        <div className="absolute left-1/2 top-0 h-8 w-px bg-titan-navy/10 -translate-x-1/2"></div>
                    </div>

                    {/* Level 2: Department Directors */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 -mt-8 md:-mt-0">
                        {[
                            { id: 'finance-dir', name: 'Mr. Leng Vannarith', role: 'Finance Director', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800' },
                            { id: 'senior-pm', name: 'Mr. Oung Chaknora', role: 'Senior Project Manager', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800' },
                            { id: 'chief-arch', name: 'Mr. Chhundy Ryta', role: 'Chief Architect', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800' },
                        ].map((person, i) => (
                            <div key={i} className="flex flex-col items-center">
                                {/* Connector line up */}
                                <div className="h-8 w-px bg-titan-navy/10 hidden md:block mb-4"></div>
                                <Link href={`/design-y/about/${person.id}`} className="w-full max-w-xs group cursor-pointer block bg-white border border-titan-navy/10 hover:border-titan-red transition-all p-3 shadow-sm">
                                    <div className="aspect-square overflow-hidden mb-3 relative">
                                        <img src={person.img} alt={person.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-sm font-black text-titan-navy uppercase mb-1 group-hover:text-titan-red transition-colors line-clamp-1">{person.name}</h3>
                                        <p className="font-mono text-[9px] uppercase tracking-widest text-titan-navy/50 line-clamp-1">{person.role}</p>
                                    </div>
                                </Link>
                                {/* Connector line down */}
                                <div className="h-8 w-px bg-titan-navy/10 hidden md:block mt-auto"></div>
                            </div>
                        ))}
                    </div>

                    {/* Level 3 Connector - Wide Horizontal Line */}
                    <div className="hidden md:block w-5/6 mx-auto border-t border-titan-navy/10 relative h-8 mb-8"></div>

                    {/* Level 3: Operational Managers */}
                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { id: 'pm', name: 'Mr. Sum Rotana', role: 'Project Manager', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800' },
                            { id: 'mep-mgr', name: 'Mr. Krai Keak', role: 'MEP Manager', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800' },
                            { id: 'design-mgr', name: 'Mr. Touch Putheany', role: 'Design Manager', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800' },
                            { id: 'qs-mgr', name: 'Mr. Ry Ken', role: 'QS Manager', img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=800' },
                            { id: 'logistics', name: 'Mr. Hong Bunna', role: 'Logistics Manager', img: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?q=80&w=800' },
                        ].map((person, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="h-8 w-px bg-titan-navy/10 hidden md:block -mt-8 mb-4"></div>
                                <Link href={`/design-y/about/${person.id}`} className="w-full group cursor-pointer block bg-white border border-titan-navy/5 hover:border-titan-red transition-all p-2">
                                    <div className="aspect-[3/4] overflow-hidden mb-2 relative">
                                        <img src={person.img} alt={person.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-[10px] font-black text-titan-navy uppercase mb-0.5 group-hover:text-titan-red transition-colors line-clamp-1">{person.name}</h3>
                                        <p className="font-mono text-[8px] uppercase tracking-widest text-titan-navy/50 line-clamp-1">{person.role}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PROTOCOLS (CERTIFICATIONS) --- */}
            <section className="bg-titan-navy text-white py-32" id="safety">
                <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <Shield className="text-titan-red" size={32} />
                            <h2 className="text-4xl font-black">ISO 9001:2015</h2>
                        </div>
                        <p className="text-xl text-white/80 leading-relaxed mb-12 font-light">
                            Our unified quality management system is rigorously audited to ensure every project meets the highest international standards of safety, efficiency, and environmental responsibility.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['Quality Management', 'Environmental Mgmt', 'Occupational Health', 'Information Security'].map((cert, i) => (
                                <div key={i} className="flex items-center gap-3 border border-white/10 p-4 rounded-sm hover:bg-white/5 transition-colors">
                                    <CheckCircle2 size={16} className="text-titan-red" />
                                    <span className="font-mono text-xs uppercase tracking-widest">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative border border-white/20 p-8 pt-16">
                        <div className="absolute top-0 left-8 px-4 py-2 bg-titan-navy border-x border-white/20 text-xs font-mono uppercase tracking-widest -translate-y-1/2">
                            Certificate of Registration
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-center">
                            <div className="p-8 border border-white/10 hover:border-titan-red transition-colors">
                                <h4 className="text-4xl font-black mb-2 opacity-50">ISO</h4>
                                <span className="text-xs font-mono uppercase tracking-widest">9001:2015</span>
                            </div>
                            <div className="p-8 border border-white/10 hover:border-titan-red transition-colors">
                                <h4 className="text-4xl font-black mb-2 opacity-50">OHS</h4>
                                <span className="text-xs font-mono uppercase tracking-widest">18001</span>
                            </div>
                            <div className="p-8 border border-white/10 hover:border-titan-red transition-colors">
                                <h4 className="text-4xl font-black mb-2 opacity-50">EMS</h4>
                                <span className="text-xs font-mono uppercase tracking-widest">14001</span>
                            </div>
                            <div className="p-8 border border-white/10 hover:border-titan-red transition-colors">
                                <h4 className="text-4xl font-black mb-2 opacity-50">CAS</h4>
                                <span className="text-xs font-mono uppercase tracking-widest">Compliance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .stroke-text-navy {
                    -webkit-text-stroke: 2px #0A192F;
                }
            `}</style>
        </div>
    );
}
