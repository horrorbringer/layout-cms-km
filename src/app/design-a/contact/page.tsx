'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, Phone, Mail, Clock, Send, Facebook, Linkedin, 
    Instagram, ArrowRight, MessageSquare, Menu, X, Youtube, ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

// --- SHARED COMPONENTS ---

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
                                        </motion.div>
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Right: Sub-navigation & Details (Desktop Only) */}
                        <div className="hidden md:flex w-1/2 lg:w-7/12 p-12 flex-col bg-white/5 relative overflow-hidden">
                            <motion.div 
                                animate={{ 
                                    background: activeCategory !== null ? `radial-gradient(circle at ${activeCategory * 10}% 50%, rgba(255, 107, 0, 0.15), transparent 60%)` : 'none'
                                }}
                                className="absolute inset-0 pointer-events-none transition-all duration-700"
                            ></motion.div>

                            <div className="relative z-10 h-full flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {activeCategory !== null && navItems[activeCategory]?.children ? (
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
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="h-full flex flex-col justify-center items-center text-white/20">
                                            <div className="text-6xl mb-4 font-thin opacity-20">{activeCategory !== null ? '0' + (activeCategory + 1) : '00'}</div>
                                            <div className="text-xl font-medium">Direct Link</div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

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

export default function ContactDesignAPage() {
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

                {/* --- HERO --- */}
                <header className="relative h-[60vh] bg-titan-navy flex items-center justify-center overflow-hidden rounded-b-[4rem]">
                    <div className="absolute inset-0">
                        <img 
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" 
                            alt="Contact Hero" 
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-titan-navy/90"></div>
                    </div>

                    <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm"
                        >
                            <MessageSquare size={14} className="text-titan-red" />
                            Let&apos;s Talk
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
                        >
                            GET IN <span className="text-titan-red">TOUCH</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-white/70 font-light max-w-2xl mx-auto"
                        >
                            Have a project in mind or want to learn more about our services? Our team is ready to assist you.
                        </motion.p>
                    </div>
                </header>

                {/* --- CONTENT GRID --- */}
                <section className="px-6 pb-32 max-w-[1400px] mx-auto -mt-20 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* LEFT COLUMN: INFO & LOCATIONS */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-5 space-y-8"
                        >

                            {/* Contact Info Card */}
                            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                                
                                <h3 className="text-2xl font-black text-titan-navy mb-8">Headquarters</h3>
                                
                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-titan-navy text-sm uppercase tracking-wide mb-1">Visit Us</span>
                                            <p className="text-titan-navy/60 leading-relaxed text-sm">
                                                #56, Street 315, Boeng Kak 1,<br />
                                                Tuol Kouk, Phnom Penh, Cambodia
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-titan-navy text-sm uppercase tracking-wide mb-1">Call Us</span>
                                            <p className="text-titan-navy/60 text-sm">+855 23 999 999</p>
                                            <p className="text-titan-navy/60 text-xs mt-1">Mon - Sat, 8am - 5pm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-titan-navy text-sm uppercase tracking-wide mb-1">Email Us</span>
                                            <p className="text-titan-navy/60 text-sm">info@kimmex.com</p>
                                            <p className="text-titan-navy/60 text-sm">sales@kimmex.com</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Socials */}
                                <div className="mt-10 pt-8 border-t border-gray-100">
                                    <h4 className="font-bold text-titan-navy mb-4 text-xs uppercase tracking-widest">Connect With Us</h4>
                                    <div className="flex gap-3">
                                        <a href="#" className="w-10 h-10 bg-[#F5F5F7] flex items-center justify-center rounded-lg text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                            <Facebook size={18} />
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-[#F5F5F7] flex items-center justify-center rounded-lg text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-[#F5F5F7] flex items-center justify-center rounded-lg text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                            <Instagram size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Map Card */}
                            <div className="bg-white p-2 rounded-[2.5rem] shadow-lg border border-gray-100 h-64 relative group cursor-pointer overflow-hidden">
                                 <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                                    alt="Map Location"
                                    className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-700 opacity-90"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors rounded-[2rem]">
                                    <div className="bg-white text-titan-navy px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                                        <MapPin size={14} className="text-titan-red" /> View on Google Maps
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT COLUMN: CONTACT FORM */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-7"
                        >
                            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-t-4 border-titan-red relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5F5F7] rounded-full -mr-20 -mt-20 opacity-50 pointer-events-none"></div>

                                <div className="relative z-10 mb-10">
                                    <h3 className="text-3xl font-black text-titan-navy mb-3">Send a Message</h3>
                                    <p className="text-titan-navy/60">Fill out the form below and our team will get back to you within 24 hours.</p>
                                </div>

                                <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">Full Name *</label>
                                            <input type="text" className="w-full bg-[#F5F5F7] border border-transparent hover:bg-white hover:border-gray-200 p-4 rounded-xl focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all font-medium text-titan-navy text-sm" placeholder="John Doe" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">Email Address *</label>
                                            <input type="email" className="w-full bg-[#F5F5F7] border border-transparent hover:bg-white hover:border-gray-200 p-4 rounded-xl focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all font-medium text-titan-navy text-sm" placeholder="john@example.com" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                         <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">Phone Number</label>
                                            <input type="tel" className="w-full bg-[#F5F5F7] border border-transparent hover:bg-white hover:border-gray-200 p-4 rounded-xl focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all font-medium text-titan-navy text-sm" placeholder="+855 ..." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">Subject *</label>
                                            <div className="relative">
                                                <select className="w-full bg-[#F5F5F7] border border-transparent hover:bg-white hover:border-gray-200 p-4 rounded-xl focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all font-medium text-titan-navy text-sm appearance-none cursor-pointer">
                                                    <option>General Inquiry</option>
                                                    <option>Project Consultation</option>
                                                    <option>Partnership Proposal</option>
                                                    <option>Careers</option>
                                                    <option>Other</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                    <ChevronRight size={16} className="rotate-90" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">Message *</label>
                                        <textarea rows={6} className="w-full bg-[#F5F5F7] border border-transparent hover:bg-white hover:border-gray-200 p-4 rounded-xl focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all font-medium text-titan-navy text-sm resize-none" placeholder="Tell us about your project or inquiry..." required></textarea>
                                    </div>

                                    <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-3 group text-sm">
                                        Send Message
                                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>

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
                                <Link href="/design-a/projects/completed" className="bg-gray-100 text-titan-navy px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors text-center">
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
