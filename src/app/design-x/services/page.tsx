'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
    Building, Ruler, Users, Truck, ArrowRight, CheckCircle2,
    DraftingCompass, HardHat, Hammer, ChevronRight, Briefcase,
    LayoutTemplate, PenTool, Lightbulb, GraduationCap, Landmark,
    Settings, ShieldCheck, Clock, Zap
} from 'lucide-react';
import Link from 'next/link';

// Animation wrapper
function FadeInWhenVisible({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function ServicesPage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const services = [
        {
            id: 'design-build',
            title: 'Design & Build',
            desc: 'A seamless integration of architectural creativity and engineering precision. We handle the entire lifecycle from concept to completion.',
            icon: PenTool,
            features: ['Architectural Design', 'Structural Engineering', 'Permit Acquisition', 'Turnkey Construction'],
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: 'renovation',
            title: 'Renovation',
            desc: 'Revitalizing existing structures to meet modern standards. We breathe new life into aged buildings while ensuring structural integrity.',
            icon: Hammer,
            features: ['Interior Fit-outs', 'Facade Upgrades', 'Structural Strengthening', 'MEP Retrofitting'],
            image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: 'project-management',
            title: 'Project Management',
            desc: 'Rigorous oversight ensuring on-time, on-budget delivery. We represent your interests on the field, managing contractors and risks.',
            icon: Briefcase,
            features: ['Cost Control', 'Quality Assurance', 'Schedule Management', 'Safety Compliance'],
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: 'consultants',
            title: 'Consultancy',
            desc: 'Strategic expertise to validate and optimize your investment. We provide technical and financial insights before you build.',
            icon: Lightbulb,
            features: ['Feasibility Studies', 'Value Engineering', 'Technical Audits', 'Regulatory Advice'],
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
        }
    ];

    const process = [
        { step: '01', title: 'Consultation', desc: 'Understanding your vision & requirements.' },
        { step: '02', title: 'Concept', desc: 'Drafting plans & architectural rendering.' },
        { step: '03', title: 'Planning', desc: 'Cost estimation & timeline scheduling.' },
        { step: '04', title: 'Execution', desc: 'Construction with rigorous supervision.' },
        { step: '05', title: 'Handover', desc: 'Final delivery & post-project support.' }
    ];

    const sectors = [
        { title: 'Government', icon: Landmark, image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop' },
        { title: 'Education', icon: GraduationCap, image: 'https://images.unsplash.com/photo-1599687267104-d510688a4e32?q=80&w=800&auto=format&fit=crop' },
        { title: 'Commercial', icon: Building, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop' },
        { title: 'Infrastructure', icon: Truck, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop' },
    ];

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">
            
            {/* === HERO SECTION === */}
            <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-titan-navy">
                {/* Parallax & Zoom Background */}
                <motion.div 
                    style={{ y: heroY, scale: 1.1 }} 
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop"
                        alt="Kimmex Services"
                        className="w-full h-[120%] object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/80 via-titan-navy/50 to-titan-navy"></div>
                </motion.div>

                {/* Decorative Floating Elements */}
                <div className="absolute top-1/4 left-10 w-20 h-20 border border-white/10 rounded-full animate-pulse hidden lg:block"></div>
                <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-titan-red/20 rounded-full hidden lg:block"></div>

                {/* Hero Content */}
                <motion.div 
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 text-center max-w-5xl px-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest mb-8 border border-white/20 shadow-lg"
                    >
                        <Settings size={14} className="text-titan-red" />
                        <span>World-Class Engineering</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter"
                    >
                        OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-titan-red to-orange-500">EXPERTISE</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        Delivering precision, innovation, and excellence in every project. We turn complex challenges into enduring structures.
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-3 cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Explore Services</span>
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2 backdrop-blur-sm bg-white/5">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1.5 h-1.5 bg-titan-red rounded-full shadow-[0_0_10px_rgba(255,107,0,0.8)]"
                        />
                    </div>
                </motion.div>
            </section>

            {/* === SERVICE CATEGORIES === */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <FadeInWhenVisible>
                    <div className="text-center mb-20">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">What We Do</span>
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">Capabilities & Expertise</h2>
                        <p className="text-titan-navy/50 text-lg max-w-2xl mx-auto">
                            We bring decades of experience to every project, ensuring quality and efficiency at every stage.
                        </p>
                    </div>
                </FadeInWhenVisible>

                <div className="space-y-12">
                    {services.map((service, i) => (
                        <FadeInWhenVisible key={i} delay={i * 0.1}>
                            <Link href={`/design-x/services/${service.id}`} className="group block">
                                <div className={`flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 group-hover:border-titan-red/20`}>
                                    
                                    {/* Image Side */}
                                    <div className={`lg:w-2/5 relative overflow-hidden h-64 lg:h-auto ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
                                        <div className="absolute inset-0 bg-titan-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                        <img 
                                            src={service.image} 
                                            alt={service.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Content Side */}
                                    <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-16 h-16 bg-titan-bg-alt rounded-2xl flex items-center justify-center text-titan-navy group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                                <service.icon size={32} />
                                            </div>
                                            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-titan-red group-hover:bg-titan-red transition-all duration-300">
                                                <ArrowRight size={20} className="text-gray-300 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                                            </div>
                                        </div>

                                        <h3 className="text-3xl font-black text-titan-navy mb-4 group-hover:text-titan-red transition-colors">{service.title}</h3>
                                        <p className="text-titan-navy/60 text-lg leading-relaxed mb-8 group-hover:text-titan-navy/80 transition-colors">
                                            {service.desc}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3 text-titan-navy/80 font-medium group-hover:text-titan-navy transition-colors">
                                                    <CheckCircle2 size={18} className="text-titan-red shrink-0" /> 
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeInWhenVisible>
                    ))}
                </div>
            </section>

            {/* === WORKING PROCESS === */}
            <section className="py-24 bg-titan-navy text-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-titan-red/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <FadeInWhenVisible>
                        <div className="text-center mb-24">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">How It Works</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Methodology</h2>
                            <p className="text-white/60 text-lg max-w-2xl mx-auto">
                                A systematic approach ensuring transparency, safety, and excellence from the first meeting to final handover.
                            </p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative">
                            {process.map((s, i) => (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <div className="flex flex-col items-center text-center group">
                                        <div className="w-24 h-24 bg-titan-navy border-4 border-white/10 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-titan-red group-hover:scale-110 transition-all duration-300 shadow-xl">
                                            <span className="text-3xl font-black text-white group-hover:text-titan-red transition-colors">{s.step}</span>
                                            <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-titan-red transition-colors">{s.title}</h3>
                                        <p className="text-sm text-white/50 leading-relaxed px-2">{s.desc}</p>
                                    </div>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* === WHY CHOOSE US (New Section) === */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInWhenVisible>
                            <div>
                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">The Kimmex Advantage</span>
                                <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">Why Partner With Us?</h2>
                                <p className="text-titan-navy/60 text-lg leading-relaxed mb-8">
                                    We deliver more than just buildings; we deliver peace of mind. Our integrated approach ensures your project is handled with the utmost care and professionalism.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { icon: ShieldCheck, title: 'Uncompromising Safety', desc: 'Zero-tolerance policy ensuring the safety of all stakeholders.' },
                                        { icon: Clock, title: 'On-Time Delivery', desc: 'Rigorous scheduling and project management to meet deadlines.' },
                                        { icon: Zap, title: 'Innovative Solutions', desc: 'Using modern technologies to solve complex engineering challenges.' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-5">
                                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-titan-red shrink-0 shadow-sm border border-gray-100">
                                                <item.icon size={26} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-titan-navy mb-1">{item.title}</h3>
                                                <p className="text-titan-navy/50">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2}>
                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1590644365607-1c5a38fc43e0?q=80&w=800&auto=format&fit=crop"
                                        alt="Blueprint"
                                        className="rounded-2xl shadow-lg h-64 w-full object-cover translate-y-8"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
                                        alt="Meeting"
                                        className="rounded-2xl shadow-lg h-64 w-full object-cover"
                                    />
                                </div>
                                {/* Center Badge */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-titan-navy text-white p-6 rounded-full shadow-2xl border-4 border-white">
                                    <CheckCircle2 size={48} className="text-titan-red" />
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>
            </section>

            {/* === SECTORS WE SERVE === */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <FadeInWhenVisible>
                    <div className="text-center mb-16">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Industries</span>
                        <h2 className="text-4xl font-black text-titan-navy">Sectors We Serve</h2>
                    </div>
                </FadeInWhenVisible>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sectors.map((sector, i) => (
                        <FadeInWhenVisible key={i} delay={i * 0.1}>
                            <div className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer">
                                {/* Bg Image */}
                                <img
                                    src={sector.image}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    alt={sector.title}
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
                                
                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="w-12 h-12 bg-titan-red rounded-lg flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <sector.icon size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{sector.title}</h3>
                                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                                        <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            Providing world-class solutions for {sector.title.toLowerCase()} infrastructure.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    ))}
                </div>
            </section>

            {/* === CTA SECTION === */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <FadeInWhenVisible>
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-8">Have a project in mind?</h2>
                        <p className="text-xl text-titan-navy/60 mb-12 max-w-2xl mx-auto">
                            Let's discuss how we can bring your vision to life with our expert engineering and construction services.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/design-x/contact" className="bg-titan-red text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-titan-navy transition-all rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-titan-red/20">
                                Get a Free Quote <ArrowRight size={18} />
                            </Link>
                            <Link href="/design-x/projects" className="bg-titan-bg-alt text-titan-navy px-10 py-5 font-bold uppercase tracking-widest hover:bg-titan-navy hover:text-white transition-all rounded-lg border border-gray-200">
                                View Our Work
                            </Link>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>
        </div>
    );
}
