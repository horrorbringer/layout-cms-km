'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, Facebook, Linkedin, Youtube, Phone, Mail, MapPin, ChevronDown, ChevronRight, Globe, Shield, Zap, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

// --- COMPONENTS ---

const FeatureCard = ({ title, desc, icon: Icon, index }: { title: string, desc: string, icon: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="bg-[#F5F5F7] p-8 md:p-10 rounded-[2rem] hover:bg-titan-navy hover:text-white transition-all duration-500 group cursor-default h-full flex flex-col justify-between"
    >
        <div>
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-white/10 group-hover:text-white text-titan-navy transition-colors">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-500 group-hover:text-white/60 leading-relaxed transition-colors text-sm md:text-base">
                {desc}
            </p>
        </div>
        <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
            <ArrowRight size={20} />
        </div>
    </motion.div>
);

const ImageReveal = ({ src, alt }: { src: string, alt: string }) => (
    <div className="overflow-hidden rounded-[2rem] relative h-[400px] md:h-[500px] w-full group">
        <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
            <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View Case Study</span>
            <h3 className="text-2xl md:text-3xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{alt}</h3>
        </div>
    </div>
);

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
                                                setActiveCategory(i);
                                                setActiveSubCategory(null);
                                            }}
                                        >
                                            <button 
                                                onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                                                className={`text-4xl md:text-6xl font-bold tracking-tight transition-all duration-300 w-full text-left flex items-center justify-between py-2 ${activeCategory === i ? 'text-titan-red translate-x-4' : 'text-white/40 hover:text-white'}`}
                                            >
                                                {item.label}
                                                {item.children && (
                                                    <ChevronRight size={32} className={`md:hidden transition-transform ${activeCategory === i ? 'rotate-90' : ''}`} />
                                                )}
                                                {/* Desktop Active Arrow */}
                                                <ArrowRight size={32} className={`hidden md:block transition-all duration-300 ${activeCategory === i ? 'opacity-100 translate-x-0 text-titan-red' : 'opacity-0 -translate-x-4'}`} />
                                            </button>
                                            
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

// --- MAIN PAGE ---

export default function DesignA_ContainerNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Full Content Structure from Design X
    const navItems = [
        {
            label: 'About Us', href: '/design-x/about',
            children: [
                { label: 'Company Profile', href: '/design-x/about#profile', desc: 'Learn about our history' },
                { label: 'Leadership', href: '/design-x/about#leadership', desc: 'Meet our team' },
                { label: 'Quality & Safety', href: '/design-x/about#safety', desc: 'Our standards' }
            ]
        },
        {
            label: 'Services', href: '/design-x/services',
            children: [
                { label: 'Design & Build', href: '/design-x/services/design-build', desc: 'Full lifecycle solutions' },
                { label: 'Building Renovation', href: '/design-x/services/renovation', desc: 'Revitalize existing structures' },
                { label: 'Project Management', href: '/design-x/services/project-management', desc: 'Oversight & control' },
                { label: 'Consultants', href: '/design-x/services/consultants', desc: 'Expert advisory services' }
            ]
        },
        {
            label: 'Projects', href: '/design-x/projects',
            children: [
                { 
                    label: 'Done Projects', 
                    href: '/design-x/projects/completed', 
                    desc: 'View our portfolio',
                    children: [
                        { label: 'Government', href: '/design-x/projects/completed?type=Government', desc: 'Public sector works' },
                        { label: 'Public Service', href: '/design-x/projects/completed?type=Public Service', desc: 'Community infrastructure' },
                        { label: 'Private', href: '/design-x/projects/completed?type=Private', desc: 'Commercial & Residential' },
                        { label: 'Water Treatment', href: '/design-x/projects/completed?type=Water Treatment', desc: 'Industrial facilities' },
                        { label: 'Slope', href: '/design-x/projects/completed?type=Slope', desc: 'Specialized engineering' }
                    ]
                },
                { 
                    label: 'Implement Projects', 
                    href: '/design-x/projects/implementation', 
                    desc: 'Current developments',
                    children: [
                        { label: 'Government', href: '/design-x/projects/implementation?type=Government', desc: 'Ongoing public works' },
                        { label: 'Public Service', href: '/design-x/projects/implementation?type=Public Service', desc: 'Civic projects underway' },
                        { label: 'Private', href: '/design-x/projects/implementation?type=Private', desc: 'Commercial developments' },
                        { label: 'Water Treatment', href: '/design-x/projects/implementation?type=Water Treatment', desc: 'Water infrastructure' },
                        { label: 'Slope', href: '/design-x/projects/implementation?type=Slope', desc: 'Structural reinforcement' }
                    ]
                }
            ]
        },
        {
            label: 'News', href: '/design-x/news',
            children: [
                { label: 'News & Updates', href: '/design-x/news', desc: 'Latest announcements' },
                { label: 'Doc Collection', href: '/design-x/documents', desc: 'Resources & documents' }
            ]
        },
        { label: 'Careers', href: '/design-x/careers' },
        { label: 'Contact', href: '/design-x/contact' }
    ];

    return (
        <div className="bg-white md:bg-[#E5E5E5] min-h-screen md:p-6 font-sans text-titan-navy selection:bg-titan-navy selection:text-white transition-colors duration-500">
            
            {/* --- MAIN CONTAINER --- */}
            <div className="bg-white rounded-none md:rounded-[3rem] min-h-[calc(100vh-3rem)] shadow-none md:shadow-2xl overflow-hidden relative mx-auto max-w-[1920px]">
                
                {/* --- NAVIGATION (Minimal / Hidden Concept) --- */}
                <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${scrolled ? 'py-4' : 'py-6 md:py-8'}`}>
                    <div className="px-6 md:px-12 flex justify-between items-start">
                        
                        {/* Logo (Top Left) */}
                        <div className="bg-white/90 backdrop-blur shadow-sm px-5 py-3 rounded-full flex items-center gap-3 pointer-events-auto">
                            <div className="w-3 h-3 bg-titan-red rounded-full animate-pulse"></div>
                            <span className="font-bold text-lg tracking-tight">KIMMEX</span>
                        </div>

                        {/* Menu Trigger (Top Right) */}
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

                {/* Full Screen Menu Overlay with RICH CONTENT */}
                <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />

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
                            Constructing <br/>
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
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src="https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2800"
                            alt="Hero Architecture"
                            className="w-full h-full object-cover"
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
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-md leading-tight">Capabilities & <br/>Expertise</h2>
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
                                <ImageReveal src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670" alt="Ministry of Economy" />
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
                                <ImageReveal src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670" alt="Vattanac Extension" />
                                <div className="px-2 md:px-8 lg:hidden">
                                    <h3 className="text-2xl font-bold mb-2">Commercial Towers</h3>
                                    <p className="text-gray-500">High-rise engineering excellence.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer className="pt-20 md:pt-32 pb-12 px-6 md:px-12 bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20">
                        <div>
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-titan-navy">
                                KIMMEX
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-titan-navy text-white px-8 py-4 rounded-full font-bold hover:bg-titan-red transition-colors shadow-lg shadow-titan-navy/20">Start Project</button>
                                <button className="bg-gray-100 text-titan-navy px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">Contact Us</button>
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
