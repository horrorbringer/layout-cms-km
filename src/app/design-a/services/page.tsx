'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
    ArrowRight, Menu, X, Facebook, Linkedin, Youtube, 
    Shield, Award, Users, TrendingUp, Heart, Lightbulb, 
    Handshake, Clock, CheckCircle2, Quote, ChevronRight,
    Building, Ruler, Truck, DraftingCompass, HardHat, 
    Hammer, Briefcase, LayoutTemplate, PenTool, GraduationCap, 
    Landmark, Settings, ShieldCheck, Zap, Globe, MousePointer2
} from 'lucide-react';
import Link from 'next/link';

// --- SHARED COMPONENTS (Reused for consistency) ---

const MenuOverlay = ({ isOpen, onClose, navItems }: { isOpen: boolean, onClose: () => void, navItems: any[] }) => {
    const [activeCategory, setActiveCategory] = useState<number | null>(0);
    const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] bg-[#1a1a2e] text-white flex flex-col"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-8 md:p-12 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-titan-red rounded-full flex items-center justify-center font-bold text-white">K</div>
                            <span className="font-bold text-xl tracking-tight">KIMMEX</span>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-4 hover:bg-white/10 rounded-full transition-colors group flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                        >
                            Close <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        
                        {/* Left: Main Navigation List */}
                        <div className="w-full md:w-1/2 lg:w-5/12 p-8 md:p-12 overflow-y-auto border-r border-white/10 flex flex-col justify-center">
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item, i) => (
                                    <div key={i}>
                                        <motion.div 
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group"
                                            onMouseEnter={() => {
                                                if (item.children) {
                                                    setActiveCategory(i);
                                                    setActiveSubCategory(null);
                                                } else {
                                                    setActiveCategory(null);
                                                }
                                            }}
                                        >
                                            {item.children ? (
                                                <button 
                                                    onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                                                    className={`text-4xl md:text-6xl font-bold tracking-tight transition-all duration-300 w-full text-left flex items-center justify-between py-2 ${activeCategory === i ? 'text-titan-red translate-x-4' : 'text-white/40 hover:text-white'}`}
                                                >
                                                    {item.label}
                                                    <ChevronRight size={32} className={`md:hidden transition-transform ${activeCategory === i ? 'rotate-90' : ''}`} />
                                                    {/* Desktop Active Arrow */}
                                                    <ArrowRight size={32} className={`hidden md:block transition-all duration-300 ${activeCategory === i ? 'opacity-100 translate-x-0 text-titan-red' : 'opacity-0 -translate-x-4'}`} />
                                                </button>
                                            ) : (
                                                <Link 
                                                    href={item.href}
                                                    className="text-4xl md:text-6xl font-bold tracking-tight transition-all duration-300 w-full text-left block py-2 text-white/40 hover:text-white hover:translate-x-4"
                                                >
                                                    {item.label}
                                                </Link>
                                            )}
                                            
                                            {/* Mobile Accordion */}
                                            <AnimatePresence>
                                                {activeCategory === i && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="md:hidden overflow-hidden pl-4 mt-2 border-l border-white/20 mb-4"
                                                    >
                                                        {item.children?.map((child: any, idx: number) => (
                                                            <div key={idx}>
                                                                <Link href={child.href} className="block py-2 text-lg text-white/80 font-medium">
                                                                    {child.label}
                                                                </Link>
                                                                {/* Mobile 3rd Level */}
                                                                {child.children && (
                                                                    <div className="pl-4 border-l border-white/10 mt-1 mb-2">
                                                                        {child.children.map((sub: any, subIdx: number) => (
                                                                            <Link key={subIdx} href={sub.href} className="block py-1 text-sm text-white/50">
                                                                                {sub.label}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Right: Sub-navigation & Details (Desktop Only) */}
                        <div className="hidden md:flex w-1/2 lg:w-7/12 p-12 flex-col bg-white/5 relative overflow-hidden">
                            {/* Dynamic Background Blob based on Index */}
                            <motion.div 
                                animate={{ 
                                    background: activeCategory !== null ? `radial-gradient(circle at ${activeCategory * 10}% 50%, rgba(255, 107, 0, 0.15), transparent 60%)` : 'none'
                                }}
                                className="absolute inset-0 pointer-events-none transition-all duration-700"
                            ></motion.div>

                            <div className="relative z-10 h-full flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {activeCategory !== null && navItems[activeCategory].children ? (
                                        <motion.div
                                            key={activeCategory}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full flex flex-col justify-center"
                                        >
                                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-12 border-b border-white/10 pb-4">
                                                Explore {navItems[activeCategory].label}
                                            </h3>
                                            
                                            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                                                {navItems[activeCategory].children.map((child: any, idx: number) => (
                                                    <div 
                                                        key={idx} 
                                                        className="group/item relative"
                                                        onMouseEnter={() => child.children && setActiveSubCategory(idx)}
                                                        onMouseLeave={() => child.children && setActiveSubCategory(null)}
                                                    >
                                                        <Link href={child.href} className="block relative">
                                                            <div className="absolute -left-4 top-1 w-0.5 h-0 bg-titan-red transition-all duration-300 group-hover/item:h-full"></div>
                                                            <h4 className="text-2xl font-bold mb-2 text-white group-hover/item:text-titan-red transition-colors flex items-center gap-3">
                                                                {child.label} 
                                                                <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-titan-red" />
                                                            </h4>
                                                            <p className="text-white/40 text-sm leading-relaxed max-w-xs group-hover/item:text-white/60 transition-colors">
                                                                {child.desc || "Learn more about our capabilities."}
                                                            </p>
                                                        </Link>

                                                        {/* Level 3 Hover Content */}
                                                        {child.children && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ 
                                                                    opacity: activeSubCategory === idx ? 1 : 0,
                                                                    height: activeSubCategory === idx ? 'auto' : 0,
                                                                    marginTop: activeSubCategory === idx ? 16 : 0
                                                                }}
                                                                className="overflow-hidden pl-4 border-l border-white/10"
                                                            >
                                                                {child.children.map((sub: any, subIdx: number) => (
                                                                    <Link 
                                                                        key={subIdx} 
                                                                        href={sub.href}
                                                                        className="block py-2 text-sm text-white/50 hover:text-titan-red hover:translate-x-1 transition-all"
                                                                    >
                                                                        {sub.label}
                                                                    </Link>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            key="empty"
                                            initial={{ opacity: 0 }} 
                                            animate={{ opacity: 1 }}
                                            className="h-full flex flex-col justify-center items-center text-white/20"
                                        >
                                            <div className="text-6xl mb-4 font-thin opacity-20">{activeCategory !== null ? '0' + (activeCategory + 1) : '00'}</div>
                                            <div className="text-xl font-medium">Direct Link</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Contact Footer in Overlay */}
                            <div className="relative z-10 border-t border-white/10 pt-8 mt-auto grid grid-cols-3 gap-8 text-white/60">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Call</div>
                                    <div>+855 23 999 999</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Email</div>
                                    <div>info@kimmex.com.kh</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Visit</div>
                                    <div>Kim Mex Tower, PP</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="p-8 md:px-12 md:py-6 border-t border-white/10 flex justify-between items-center text-sm font-bold text-white/40 uppercase tracking-widest shrink-0 bg-[#151525]">
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Facebook size={16}/> <span className="hidden md:inline">Facebook</span></a>
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Linkedin size={16}/> <span className="hidden md:inline">LinkedIn</span></a>
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Youtube size={16}/> <span className="hidden md:inline">Youtube</span></a>
                        </div>
                        <div>© 2026 Kimmex</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Helper: Fade In Wrapper
function FadeInWhenVisible({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// --- PAGE COMPONENT ---

export default function ServicesPageDesignA() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        {
            label: 'About Us', href: '/design-a/about',
            children: [
                { label: 'Company Profile', href: '/design-a/about#profile', desc: 'Learn about our history' },
                { label: 'Leadership', href: '/design-a/about#leadership', desc: 'Meet our team' },
                { label: 'Quality & Safety', href: '/design-a/about#safety', desc: 'Our standards' }
            ]
        },
        {
            label: 'Services', href: '/design-a/services',
            children: [
                { label: 'Design & Build', href: '/design-a/services/design-build', desc: 'Full lifecycle solutions' },
                { label: 'Building Renovation', href: '/design-a/services/renovation', desc: 'Revitalize existing structures' },
                { label: 'Project Management', href: '/design-a/services/project-management', desc: 'Oversight & control' },
                { label: 'Consultants', href: '/design-a/services/consultants', desc: 'Expert advisory services' }
            ]
        },
        {
            label: 'Projects', href: '/design-a/projects/completed',
            children: [
                { 
                    label: 'Done Projects', 
                    href: '/design-a/projects/completed', 
                    desc: 'View our portfolio',
                    children: [
                        { label: 'Government', href: '/design-a/projects/completed?type=Government', desc: 'Public sector works' },
                        { label: 'Public Service', href: '/design-a/projects/completed?type=Public Service', desc: 'Community infrastructure' },
                        { label: 'Private', href: '/design-a/projects/completed?type=Private', desc: 'Commercial & Residential' },
                        { label: 'Water Treatment', href: '/design-a/projects/completed?type=Water Treatment', desc: 'Industrial facilities' },
                        { label: 'Slope', href: '/design-a/projects/completed?type=Slope', desc: 'Specialized engineering' }
                    ]
                },
                { 
                    label: 'Implement Projects', 
                    href: '/design-a/projects/implementation', 
                    desc: 'Current developments',
                    children: [
                        { label: 'Government', href: '/design-a/projects/implementation?type=Government', desc: 'Ongoing public works' },
                        { label: 'Public Service', href: '/design-a/projects/implementation?type=Public Service', desc: 'Civic projects underway' },
                        { label: 'Private', href: '/design-a/projects/implementation?type=Private', desc: 'Commercial developments' },
                        { label: 'Water Treatment', href: '/design-a/projects/implementation?type=Water Treatment', desc: 'Water infrastructure' },
                        { label: 'Slope', href: '/design-a/projects/implementation?type=Slope', desc: 'Structural reinforcement' }
                    ]
                }
            ]
        },
        {
            label: 'News', href: '/design-a/news',
            children: [
                { label: 'News & Updates', href: '/design-a/news', desc: 'Latest announcements' },
                { label: 'Doc Collection', href: '/design-a/documents', desc: 'Resources & documents' }
            ]
        },
        { label: 'Careers', href: '/design-a/careers' },
        { label: 'Contact', href: '/design-a/contact' }
    ];

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
        <div className="bg-white md:bg-[#E5E5E5] min-h-screen md:p-6 font-sans text-titan-navy selection:bg-titan-navy selection:text-white transition-colors duration-500">
            
            {/* --- MAIN CONTAINER --- */}
            <div className="bg-white rounded-none md:rounded-[3rem] min-h-[calc(100vh-3rem)] shadow-none md:shadow-2xl overflow-hidden relative mx-auto max-w-[1920px]">
                
                {/* --- NAVIGATION --- */}
                <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${scrolled ? 'py-4' : 'py-6 md:py-8'}`}>
                    <div className="px-6 md:px-12 flex justify-between items-start">
                        {/* Logo */}
                        <div className="bg-white/90 backdrop-blur shadow-sm px-5 py-3 rounded-full flex items-center gap-3 pointer-events-auto">
                            <div className="w-3 h-3 bg-titan-red rounded-full animate-pulse"></div>
                            <span className="font-bold text-lg tracking-tight">KIMMEX</span>
                        </div>

                        {/* Menu Trigger */}
                        <button 
                            onClick={() => setIsMenuOpen(true)}
                            className="bg-titan-navy text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-titan-red transition-all shadow-lg flex items-center gap-3 pointer-events-auto group"
                        >
                            <span className="hidden md:inline group-hover:-translate-x-1 transition-transform">Menu</span>
                            <div className="flex flex-col gap-1.5 items-end">
                                <span className="w-6 h-0.5 bg-white group-hover:w-4 transition-all"></span>
                                <span className="w-4 h-0.5 bg-white group-hover:w-6 transition-all"></span>
                            </div>
                        </button>
                    </div>
                </div>

                <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />

                {/* --- HERO SECTION --- */}
                <header className="pt-32 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 min-h-[60vh] flex flex-col justify-end relative">
                     <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F5F5F7] -z-10 rounded-bl-[4rem] hidden lg:block"></div>
                     
                     <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                         <div className="inline-block px-4 py-2 bg-[#F5F5F7] rounded-lg text-xs font-bold uppercase tracking-widest text-titan-navy mb-6 md:mb-8 border border-titan-navy/5">
                            Est. 1999 • Services
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
                            Our <span className="text-gray-300">Expertise.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
                            Delivering precision, innovation, and excellence in every project. We turn complex challenges into enduring structures.
                        </p>
                    </motion.div>
                </header>

                {/* --- SERVICES GRID --- */}
                <section className="px-6 md:px-12 mb-20 md:mb-32">
                    <div className="grid grid-cols-1 gap-12">
                        {services.map((service, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="group bg-[#F5F5F7] rounded-[2.5rem] overflow-hidden hover:bg-titan-navy hover:text-white transition-all duration-500 flex flex-col lg:flex-row h-full">
                                    {/* Content */}
                                    <div className="p-8 md:p-16 lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-titan-navy mb-8 group-hover:bg-white/10 group-hover:text-white transition-colors shadow-sm">
                                            <service.icon size={32} />
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-bold mb-6">{service.title}</h3>
                                        <p className="text-gray-500 group-hover:text-white/60 text-lg leading-relaxed mb-10 transition-colors">
                                            {service.desc}
                                        </p>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3 font-medium text-titan-navy/70 group-hover:text-white/80 transition-colors">
                                                    <div className="w-2 h-2 rounded-full bg-titan-red shrink-0"></div>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-10">
                                            <Link href={`/design-a/services/${service.id}`} className="inline-flex items-center gap-3 font-bold text-titan-navy group-hover:text-white transition-colors uppercase tracking-widest text-sm">
                                                Learn More <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden order-1 lg:order-2">
                                        <img 
                                            src={service.image} 
                                            alt={service.title} 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        />
                                        <div className="absolute inset-0 bg-titan-navy/10 group-hover:bg-titan-navy/0 transition-colors"></div>
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </section>

                {/* --- METHODOLOGY / PROCESS --- */}
                <section className="px-6 md:px-12 py-20 bg-titan-navy text-white rounded-[3rem] mx-0 md:mx-6 mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-titan-red/10 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="max-w-[1400px] mx-auto relative z-10">
                         <div className="text-center mb-16">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">How We Work</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Methodology</h2>
                            <p className="text-white/60 text-lg max-w-2xl mx-auto">
                                A systematic approach ensuring transparency, safety, and excellence from the first meeting to final handover.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            {process.map((step, i) => (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <div className="bg-white/5 rounded-3xl p-8 border border-white/5 hover:bg-white/10 transition-colors text-center h-full group">
                                        <div className="text-5xl font-black text-white/10 mb-4 group-hover:text-titan-red transition-colors">{step.step}</div>
                                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- SECTORS --- */}
                <section className="px-6 md:px-12 py-20 mb-20">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">Industries</span>
                            <h2 className="text-3xl md:text-5xl font-bold">Sectors We Serve</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                         {sectors.map((sector, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="group relative h-[450px] overflow-hidden rounded-[2.5rem] cursor-pointer">
                                    <img
                                        src={sector.image}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        alt={sector.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/90 via-transparent to-transparent"></div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-4 group-hover:bg-titan-red transition-colors">
                                            <sector.icon size={20} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{sector.title}</h3>
                                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                                            <p className="text-white/70 text-sm pt-2">
                                                Providing world-class solutions for {sector.title.toLowerCase()} infrastructure.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </section>

                 {/* --- CTA --- */}
                 <section className="px-6 md:px-12 mb-20">
                    <div className="bg-[#F5F5F7] rounded-[3rem] p-12 md:p-20 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-titan-navy">Have a project in mind?</h2>
                        <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                            Let&apos;s discuss how we can bring your vision to life with our expert engineering and construction services.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/design-a/contact" className="bg-titan-navy text-white px-8 py-4 rounded-full font-bold hover:bg-titan-red transition-colors shadow-lg shadow-titan-navy/20">
                                Get a Free Quote
                            </Link>
                            <Link href="/design-a/projects" className="bg-white text-titan-navy px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-sm">
                                View Our Work
                            </Link>
                        </div>
                    </div>
                 </section>

                {/* --- FOOTER --- */}
                <footer className="pt-20 pb-12 px-6 md:px-12 bg-white rounded-t-[3rem] mt-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20">
                        <div>
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-titan-navy">
                                KIMMEX
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/design-a/contact" className="bg-titan-navy text-white px-8 py-4 rounded-full font-bold hover:bg-titan-red transition-colors shadow-lg shadow-titan-navy/20 text-center">
                                    Start Project
                                </Link>
                                <Link href="/design-a/projects" className="bg-gray-100 text-titan-navy px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors text-center">
                                    View Projects
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-sm text-gray-500">
                            <div>
                                <h4 className="font-bold text-titan-navy uppercase tracking-widest mb-4">Office</h4>
                                <p>Kim Mex Tower, L5</p>
                                <p>St. 590, Phnom Penh</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-titan-navy uppercase tracking-widest mb-4">Connect</h4>
                                <p>+855 23 999 999</p>
                                <p>info@kimmex.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <p>© 2026 Kimmex Construction</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-titan-navy">Privacy</a>
                            <a href="#" className="hover:text-titan-navy">Terms</a>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}
