'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Building, Ruler, Users, Truck, ArrowRight, CheckCircle2,
    DraftingCompass, HardHat, Hammer, ChevronRight, Briefcase,
    LayoutTemplate, PenTool, Lightbulb, GraduationCap, Landmark
} from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">
            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[60vh] bg-titan-navy overflow-hidden flex items-center justify-center pt-32 pb-16">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop"
                        alt="Kimmex Services"
                        className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/80 to-titan-navy/40"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-white/90 text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/10"
                    >
                        <Hammer size={12} className="text-titan-red" />
                        Comprehensive Solutions
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl tracking-tight"
                    >
                        OUR <span className="text-titan-red">SERVICES</span>
                    </motion.h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        Delivering excellence through a wide spectrum of construction, design, and consultancy services tailored to your vision.
                    </p>
                </div>
            </section>

            {/* --- SERVICE CATEGORIES --- */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="text-center mb-20">
                    <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">What We Do</span>
                    <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">Service Categories</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 1. Design & Build */}
                    <Link href="/design-x/services/design-build" className="group bg-titan-bg-alt p-8 md:p-12 rounded-2xl hover:bg-titan-navy hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-titan-red/20 block cursor-pointer">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-titan-red transition-colors">
                            <PenTool size={32} className="text-titan-navy group-hover:text-white" />
                        </div>
                        <h3 className="text-3xl font-black text-titan-navy mb-4 group-hover:text-white">Design & Build</h3>
                        <p className="text-titan-navy-subtle mb-8 text-lg leading-relaxed group-hover:text-white/70">
                            A seamless integration of architectural creativity and engineering precision. We handle everything from the entire lifecycle.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {['Architectural Design', 'Structural Engineering', 'Permit Acquisition', 'Turnkey Construction'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-titan-navy font-bold group-hover:text-white/90">
                                    <CheckCircle2 size={18} className="text-titan-red" /> {item}
                                </li>
                            ))}
                        </ul>
                        <div className="text-titan-red font-bold uppercase tracking-widest text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                            View Details <ArrowRight size={16} />
                        </div>
                    </Link>

                    {/* 2. Building Renovation */}
                    <Link href="/design-x/services/renovation" className="group bg-titan-bg-alt p-8 md:p-12 rounded-2xl hover:bg-titan-navy hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-titan-red/20 block cursor-pointer">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-titan-red transition-colors">
                            <Hammer size={32} className="text-titan-navy group-hover:text-white" />
                        </div>
                        <h3 className="text-3xl font-black text-titan-navy mb-4 group-hover:text-white">Building Renovation</h3>
                        <p className="text-titan-navy-subtle mb-8 text-lg leading-relaxed group-hover:text-white/70">
                            Revitalizing existing structures to meet modern standards. We breathe new life into aged buildings while ensuring structural integrity.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {['Interior Fit-outs', 'Facade Upgrades', 'Structural Strengthening', 'MEP Retrofitting'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-titan-navy font-bold group-hover:text-white/90">
                                    <CheckCircle2 size={18} className="text-titan-red" /> {item}
                                </li>
                            ))}
                        </ul>
                        <div className="text-titan-red font-bold uppercase tracking-widest text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                            View Details <ArrowRight size={16} />
                        </div>
                    </Link>

                    {/* 3. Project Management */}
                    <Link href="/design-x/services/project-management" className="group bg-titan-bg-alt p-8 md:p-12 rounded-2xl hover:bg-titan-navy hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-titan-red/20 block cursor-pointer">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-titan-red transition-colors">
                            <Briefcase size={32} className="text-titan-navy group-hover:text-white" />
                        </div>
                        <h3 className="text-3xl font-black text-titan-navy mb-4 group-hover:text-white">Project Management</h3>
                        <p className="text-titan-navy-subtle mb-8 text-lg leading-relaxed group-hover:text-white/70">
                            Rigorous oversight ensuring on-time, on-budget delivery. We represent your interests on the field, managing contractors and risks.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {['Cost Control', 'Quality Assurance', 'Schedule Management', 'Safety Compliance'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-titan-navy font-bold group-hover:text-white/90">
                                    <CheckCircle2 size={18} className="text-titan-red" /> {item}
                                </li>
                            ))}
                        </ul>
                        <div className="text-titan-red font-bold uppercase tracking-widest text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                            View Details <ArrowRight size={16} />
                        </div>
                    </Link>

                    {/* 4. Consultants */}
                    <Link href="/design-x/services/consultants" className="group bg-titan-bg-alt p-8 md:p-12 rounded-2xl hover:bg-titan-navy hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-titan-red/20 block cursor-pointer">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-titan-red transition-colors">
                            <Lightbulb size={32} className="text-titan-navy group-hover:text-white" />
                        </div>
                        <h3 className="text-3xl font-black text-titan-navy mb-4 group-hover:text-white">Consultants</h3>
                        <p className="text-titan-navy-subtle mb-8 text-lg leading-relaxed group-hover:text-white/70">
                            Strategic expertise to validate and optimize your investment. We provide technical and financial insights before you build.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {['Feasibility Studies', 'Value Engineering', 'Technical Audits', 'Regulatory Advice'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-titan-navy font-bold group-hover:text-white/90">
                                    <CheckCircle2 size={18} className="text-titan-red" /> {item}
                                </li>
                            ))}
                        </ul>
                        <div className="text-titan-red font-bold uppercase tracking-widest text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                            View Details <ArrowRight size={16} />
                        </div>
                    </Link>
                </div>
            </section>

            {/* --- HOW WE WORK (PROCESS) --- */}
            <section className="py-24 bg-titan-navy text-white relative overflow-hidden">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-titan-red/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">The Process</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">How We Work</h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            A systematic 5-step approach ensures transparency and excellence from the first meeting to final handover.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-white/10 z-0"></div>

                        {[
                            { step: '01', title: 'Initial Consultation', desc: 'Understanding your vision & requirements.' },
                            { step: '02', title: 'Concept & Design', desc: 'Drafting plans & architectural rendering.' },
                            { step: '03', title: 'Budgeting & Planning', desc: 'Cost estimation & scheduling.' },
                            { step: '04', title: 'Construction', desc: 'Execution & rigorous supervision.' },
                            { step: '05', title: 'Handover & Maintenance', desc: 'Final delivery & post-project support.' }
                        ].map((s, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-24 h-24 bg-titan-navy border-[6px] border-white/10 rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:border-titan-red group-hover:scale-110 transition-all duration-300">
                                    <span className="text-3xl font-black text-white group-hover:text-titan-red transition-colors">{s.step}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
                                <p className="text-sm text-white/50">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTORS WE SERVE --- */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8">
                    <div>
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Industries</span>
                        <h2 className="text-4xl font-black text-titan-navy">Sectors We Serve</h2>
                    </div>
                    <p className="md:max-w-md text-titan-navy-subtle mt-4 md:mt-0 text-right">
                        Our versatile expertise allows us to deliver high-quality results across various industries.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Government Offices */}
                    <div className="relative h-[400px] group overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-titan-navy/40 group-hover:bg-titan-navy/20 transition-colors z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt="Government Offices"
                        />
                        <div className="absolute bottom-0 left-0 p-8 z-20">
                            <Landmark className="text-titan-red mb-4" size={32} />
                            <h3 className="text-2xl font-bold text-white mb-2">Government Offices</h3>
                            <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                Building resilient and dignified public infrastructure.
                            </p>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="relative h-[400px] group overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-titan-navy/40 group-hover:bg-titan-navy/20 transition-colors z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1599687267104-d510688a4e32?q=80&w=1760&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt="Education"
                        />
                        <div className="absolute bottom-0 left-0 p-8 z-20">
                            <GraduationCap className="text-titan-red mb-4" size={32} />
                            <h3 className="text-2xl font-bold text-white mb-2">Education</h3>
                            <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                Creating inspiring environments for learning and growth.
                            </p>
                        </div>
                    </div>

                    {/* Commercial */}
                    <div className="relative h-[400px] group overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-titan-navy/40 group-hover:bg-titan-navy/20 transition-colors z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt="Commercial"
                        />
                        <div className="absolute bottom-0 left-0 p-8 z-20">
                            <Building className="text-titan-red mb-4" size={32} />
                            <h3 className="text-2xl font-bold text-white mb-2">Commercial</h3>
                            <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                Offices, retail spaces, and mixed-use developments.
                            </p>
                        </div>
                    </div>

                    {/* Infrastructure */}
                    <div className="relative h-[400px] group overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-titan-navy/40 group-hover:bg-titan-navy/20 transition-colors z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2670&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt="Infrastructure"
                        />
                        <div className="absolute bottom-0 left-0 p-8 z-20">
                            <Truck className="text-titan-red mb-4" size={32} />
                            <h3 className="text-2xl font-bold text-white mb-2">Infrastructure</h3>
                            <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                Roads, bridges, and essential utilities for communities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-32 bg-titan-bg-alt border-t border-titan-navy-light/10 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Ready to Start?</span>
                    <h2 className="text-5xl font-black text-titan-navy mb-8">Let's Discuss Your Project</h2>
                    <p className="text-titan-navy-subtle text-xl mb-12 max-w-2xl mx-auto">
                        Whether it's a new build, a renovation, or a complex infrastructure project, our team is ready to deliver.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/design-x/contact" className="bg-titan-red text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-titan-navy transition-all shadow-xl rounded-sm flex items-center gap-2">
                            Get a Quote <ChevronRight size={18} />
                        </Link>
                        <Link href="/design-x/contact" className="px-10 py-5 font-bold uppercase tracking-widest border border-titan-navy/10 hover:border-titan-navy hover:bg-titan-navy hover:text-white transition-all rounded-sm">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
