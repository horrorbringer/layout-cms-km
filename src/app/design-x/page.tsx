'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Trophy, CheckCircle, PenTool, Layout, Ruler, Users, ChevronDown, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function DesignGenX() {
    // --- State ---
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

    // --- Scroll Parallax ---
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 200]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    // --- Data ---
    const stats = [
        { label: 'Establishment', val: '1999' },
        { label: 'Projects Delivered', val: '150+' },
        { label: 'Provinces', val: '25' },
        { label: 'Team Members', val: '500+' },
    ];

    const services = [
        {
            title: 'Design & Build',
            desc: 'Seamless integration of architectural creativity and engineering precision.',
            icon: PenTool,
            features: ['Conceptual Design', 'Structural Engineering', 'Interior Design']
        },
        {
            title: 'Infrastructure',
            desc: 'Building the backbone of communities with bridges, roads, and utilities.',
            icon: Layout,
            features: ['Roads & Bridges', 'Water Treatment', 'Public Works']
        },
        {
            title: 'Project Management',
            desc: 'Rigorous oversight ensuring on-time, on-budget delivery for every client.',
            icon: Users,
            features: ['Cost Control', 'Quality Assurance', 'Safety Compliance']
        },
        {
            title: 'Renovation',
            desc: 'Revitalizing existing structures to meet modern standards and aesthetics.',
            icon: Ruler,
            features: ['Structural Strengthening', 'Facade Upgrades', 'MEP Retrofitting']
        }
    ];

    const projects = [
        {
            id: 1,
            name: 'Ministry of Economy',
            loc: 'Phnom Penh',
            img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
            cat: 'Government'
        },
        {
            id: 2,
            name: 'Vattanac Capital Extension',
            loc: 'Phnom Penh',
            img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop',
            cat: 'Commercial'
        },
        {
            id: 3,
            name: 'Sihanoukville Port',
            loc: 'Sihanoukville',
            img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2670&auto=format&fit=crop',
            cat: 'Infrastructure'
        },
    ];

    return (
        <>
            {/* --- HERO SECTION (Cinematic/Video Vibe) --- */}
            <header className="relative h-[90vh] overflow-hidden bg-titan-navy">
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src="/hero-construction.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-titan-navy via-titan-navy/80 to-transparent"></div>
                </motion.div>

                <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 flex flex-col justify-center">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="w-12 h-1 bg-titan-red"></div>
                            <span className="text-titan-red font-bold tracking-[0.2em] uppercase">Engineering The Future</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tight"
                        >
                            BUILDING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-titan-white to-titan-navy-subtle">LEGACIES.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-titan-navy-subtle max-w-xl mb-12 font-light leading-relaxed"
                        >
                            From complex infrastructure to high-rise masterpieces, we deliver precision, quality, and sustainable innovation for Cambodia's growth.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex gap-4"
                        >
                            <button className="group bg-white text-titan-navy px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-titan-red hover:text-white transition-all duration-300 flex items-center gap-3 rounded-sm relative overflow-hidden">
                                <span className="relative z-10">View Projects</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" size={18} />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-titan-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                            <button
                                onClick={() => setIsVideoPlaying(true)}
                                className="group border border-white/20 text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm rounded-sm"
                            >
                                <Play size={18} className="fill-white" />
                                Watch Concept
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors"
                >
                    <span className="text-[10px] uppercase tracking-widest">Scroll Down</span>
                    <ChevronDown size={20} />
                </motion.div>
            </header>

            {/* --- STATS BAR --- */}
            <div className="bg-titan-navy border-t border-titan-navy-light relative z-20">
                <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-titan-navy-light/30">
                    {stats.map((s, i) => (
                        <div key={i} className="py-12 px-6 text-center group cursor-default hover:bg-titan-navy-light/10 transition-colors">
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-titan-red transition-colors duration-300">{s.val}</h3>
                            <p className="text-titan-navy-subtle text-xs uppercase tracking-[0.2em] font-bold">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- INTRODUCTION (Clean & Professional) --- */}
            <section className="py-32 px-6 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h4 className="text-titan-red font-bold uppercase tracking-widest mb-4">Who We Are</h4>
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-8 leading-tight">
                            Redefining Construction Standards in <span className="underline decoration-titan-red decoration-4 underline-offset-4">Cambodia</span>.
                        </h2>
                        <div className="prose prose-lg text-titan-navy-subtle">
                            <p className="mb-6">
                                Kimmex Construction & Investment Co., Ltd. is not just a builder; we are a partner in national development. Since 1999, we have been at the forefront of the industry, delivering complex projects that require high-precision engineering and architectural finesse.
                            </p>
                            <p>
                                Our approach combines decades of local experience with international ISO 9001 standards, ensuring every structure is built to last, inspire, and serve the community.
                            </p>
                        </div>
                        <div className="mt-12 flex gap-8">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={32} className="text-titan-navy" />
                                <div>
                                    <div className="font-bold text-titan-navy">Safety First</div>
                                    <div className="text-sm text-titan-navy-subtle">0 Accidents Goal</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Trophy size={32} className="text-titan-navy" />
                                <div>
                                    <div className="font-bold text-titan-navy">Award Winning</div>
                                    <div className="text-sm text-titan-navy-subtle">National Recognition</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 border-t-4 border-l-4 border-titan-red opacity-20"></div>
                        <img
                            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop"
                            alt="Kimmex Office"
                            className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                        />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-4 border-r-4 border-titan-navy opacity-20"></div>
                    </div>
                </div>
            </section>

            {/* --- WORKING PROCESS (Visual Flow) --- */}
            <section className="py-24 bg-titan-bg-alt border-y border-titan-navy-light/10">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">How We Deliver</span>
                        <h2 className="text-4xl font-black text-titan-navy mb-6">The Kimmex Standard</h2>
                        <p className="text-titan-navy-subtle text-lg">A systematic approach ensuring precision, transparency, and excellence at every stage of the project lifecycle.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-titan-navy/10 z-0">
                            <div className="h-full bg-titan-red w-1/3 animate-pulse"></div>
                        </div>

                        {[
                            { step: '01', title: 'Consultation', desc: 'Feasibility analysis & vision alignment.' },
                            { step: '02', title: 'Design & Plan', desc: 'Architectural blueprints & engineering.' },
                            { step: '03', title: 'Construction', desc: 'Execution with strict safety protocols.' },
                            { step: '04', title: 'Handover', desc: 'Quality inspection & final delivery.' }
                        ].map((s, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-24 h-24 bg-white rounded-full border-[6px] border-titan-bg-alt flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:border-titan-red transition-all duration-300">
                                    <span className="text-3xl font-black text-titan-navy group-hover:text-titan-red transition-colors">{s.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-titan-navy mb-3">{s.title}</h3>
                                <p className="text-sm text-titan-navy-subtle max-w-[200px]">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SERVICES (Clean Modern Grid) --- */}
            <section className="bg-titan-bg-alt py-32 relative">
                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                        <div className="max-w-xl">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Our Expertise</span>
                            <h2 className="text-4xl font-black text-titan-navy mb-4">Comprehensive Solutions</h2>
                            <p className="text-titan-navy-subtle text-lg">Delivering excellence across the entire project lifecycle, from concept to completion.</p>
                        </div>
                        <Link href="/design-x/services" className="mt-6 md:mt-0 bg-white border border-titan-navy-light/10 text-titan-navy px-8 py-4 font-bold hover:bg-titan-navy hover:text-white transition-all uppercase tracking-widest text-xs flex items-center gap-2 rounded-sm shadow-sm hover:shadow-lg">
                            All Capabilities <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((s, i) => (
                            <div key={i} className="bg-white p-8 group hover:-translate-y-2 transition-all duration-300 rounded-sm shadow-sm hover:shadow-2xl border-t-4 border-transparent hover:border-titan-red">
                                <div className="w-14 h-14 bg-titan-bg-alt rounded-full flex items-center justify-center mb-8 group-hover:bg-titan-red transition-colors duration-300">
                                    <s.icon className="text-titan-navy group-hover:text-white transition-colors" size={24} />
                                </div>
                                <h3 className="text-xl font-black text-titan-navy mb-4 group-hover:text-titan-red transition-colors">{s.title}</h3>
                                <p className="text-titan-navy-subtle mb-6 text-sm leading-relaxed">{s.desc}</p>
                                <ul className="space-y-2 border-t border-gray-100 pt-6">
                                    {s.features.map((f, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-titan-navy transition-colors">
                                            <div className="w-1.5 h-1.5 bg-titan-red rounded-full"></div> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FEATURED PROJECTS (Parallax/Mosaic) --- */}
            <section className="py-32 px-6 bg-titan-bg-alt">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-titan-navy mb-4">Featured Portfolio</h2>
                        <div className="h-1 w-20 bg-titan-red mx-auto"></div>
                    </div>

                    <div className="space-y-24">
                        {projects.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}
                            >
                                <Link href={`/design-x/projects/${p.id}`} className="lg:w-3/5 relative group overflow-hidden shadow-2xl cursor-pointer block">
                                    <div className="absolute inset-0 bg-titan-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    <img src={p.img} alt={p.name} className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                                </Link>
                                <div className="lg:w-2/5">
                                    <span className="text-titan-red font-bold tracking-widest uppercase text-sm mb-2 block">{p.cat}</span>
                                    <h3 className="text-4xl font-black text-titan-navy mb-6">{p.name}</h3>
                                    <p className="text-titan-navy-subtle text-lg mb-8">
                                        A landmark project demonstrating our capability in delivering high-specification {p.cat.toLowerCase()} builds.
                                        Engineered for sustainability and long-term value.
                                    </p>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div className="border-l-2 border-titan-red pl-4">
                                            <div className="text-xs uppercase text-titan-navy-subtle font-bold">Location</div>
                                            <div className="text-titan-navy font-bold">{p.loc}</div>
                                        </div>
                                        <div className="border-l-2 border-titan-red pl-4">
                                            <div className="text-xs uppercase text-titan-navy-subtle font-bold">Completion</div>
                                            <div className="text-titan-navy font-bold">2024</div>
                                        </div>
                                    </div>

                                    <Link href={`/design-x/projects/${p.id}`} className="inline-block border-b-2 border-titan-navy pb-1 text-titan-navy font-bold hover:text-titan-red hover:border-titan-red transition-all cursor-pointer">
                                        VIEW CASE STUDY
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-20">
                        <button className="bg-titan-navy text-white px-12 py-4 font-bold text-sm tracking-widest uppercase hover:bg-titan-red transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Explore All Projects
                        </button>
                    </div>
                </div>
            </section>

            {/* --- LATEST NEWS --- */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-titan-bg-alt pb-8">
                        <div>
                            <span className="text-titan-red font-bold tracking-widest uppercase text-sm mb-2 block">Insights & Updates</span>
                            <h2 className="text-4xl font-black text-titan-navy">Latest News</h2>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-titan-navy font-bold hover:text-titan-red transition-colors uppercase tracking-widest text-sm">
                            View All News <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Kimmex Awarded New Government Contract', date: 'Jan 15, 2026', cat: 'Corporate', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop' },
                            { title: 'Sustainability Goals 2030 Achieved Early', date: 'Dec 20, 2025', cat: 'Environment', img: 'https://images.unsplash.com/photo-1581092921461-eab62496096b?q=80&w=800&auto=format&fit=crop' },
                            { title: 'Annual Charity Gala for Education', date: 'Nov 10, 2025', cat: 'CSR', img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop' }
                        ].map((news, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-[4/3] bg-titan-bg-alt relative overflow-hidden mb-6 group-hover:shadow-xl transition-shadow">
                                    <div className="absolute top-4 left-4 bg-titan-navy text-white text-[10px] uppercase font-bold px-3 py-1 z-10 rounded-sm">{news.cat}</div>
                                    <img src={news.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={news.title} />
                                    {/* Corner Accent */}
                                    <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-titan-red border-r-titan-red opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                </div>
                                <div className="flex gap-3 text-xs font-bold uppercase tracking-widest text-titan-navy-subtle mb-3">
                                    <span>{news.date}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-titan-navy group-hover:text-titan-red transition-colors leading-tight">{news.title}</h3>
                                <a href="#" className="inline-block mt-4 text-xs font-bold uppercase tracking-widest text-titan-navy border-b border-titan-navy pb-1 group-hover:text-titan-red group-hover:border-titan-red transition-all">Read Article</a>
                            </div>
                        ))}
                    </div>

                    <button className="md:hidden mt-12 w-full py-4 border border-titan-navy-subtle/30 text-titan-navy font-bold uppercase tracking-widest hover:bg-titan-navy hover:text-white transition-all">
                        View All News
                    </button>
                </div>
            </section>

            {/* --- PARTNERS / CLIENTS --- */}
            <section className="py-24 px-6 bg-titan-bg border-t border-titan-bg-alt">
                <div className="max-w-[1400px] mx-auto text-center">
                    <p className="text-sm font-bold text-titan-navy-subtle uppercase tracking-[0.3em] mb-16">Trusted By Ministries & Institutions</p>

                    <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-80">
                        {[1, 2, 3, 4, 5, 6, 7, 9, 10, 11].map((num) => (
                            <motion.div
                                key={num}
                                whileHover={{ scale: 1.1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-40 h-32 flex items-center justify-center opacity-80 hover:opacity-100 cursor-pointer transition-all duration-500"
                            >
                                <img
                                    src={`/patner/${num}.png`}
                                    alt={`Partner Logo ${num}`}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}
