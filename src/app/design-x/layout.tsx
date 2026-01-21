'use client';

import React from 'react';
import { Phone, Facebook, Linkedin, Youtube, Search, ArrowRight, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FooterX from './components/FooterX';

export default function DesignXLayout({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [hoveredNav, setHoveredNav] = React.useState<number | null>(null);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    React.useEffect(() => {
        const updateScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', updateScroll);
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    return (
        <div className="bg-titan-bg font-sans text-titan-navy selection:bg-titan-red selection:text-white min-h-screen flex flex-col">

            {/* --- FIXED HEADER GROUP --- */}
            <header className="fixed top-0 left-0 w-full z-[100] flex flex-col">
                {/* --- TOP BAR (Collapses on Scroll) --- */}
                <div className={`bg-titan-navy text-titan-navy-subtle text-[11px] uppercase tracking-widest font-semibold border-b border-titan-navy-light transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
                    <div className="max-w-[1600px] mx-auto px-6 h-full flex justify-between items-center">
                        <div className="flex gap-8">
                            <span className="hover:text-white transition cursor-pointer">ISO 9001:2015 Certified</span>
                            <span className="hidden md:inline hover:text-white transition cursor-pointer">Safety First Policy</span>
                        </div>
                        <div className="flex gap-6 items-center">
                            <span className="flex items-center gap-2 hover:text-white cursor-pointer transition"><Phone size={12} className="text-titan-red" /> +855 23 999 999</span>
                            <div className="w-[1px] h-3 bg-titan-navy-light"></div>
                            <div className="flex gap-3">
                                <Facebook size={12} className="hover:text-titan-red cursor-pointer transition" />
                                <Linkedin size={12} className="hover:text-titan-red cursor-pointer transition" />
                                <Youtube size={12} className="hover:text-titan-red cursor-pointer transition" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- NAVBAR ("Oppa" Style: Transparent -> Solid) --- */}
                <nav className={`w-full transition-all duration-500 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md border-titan-navy-light/10 shadow-lg py-2' : 'bg-transparent border-transparent py-4'}`}>
                    <div className="max-w-[1600px] mx-auto px-6 h-20 flex justify-between items-center">
                        {/* Logo Area */}
                        <Link href="/design-x" className="flex items-center gap-4 group cursor-pointer">
                            {/* Logo Image */}
                            <img
                                src="/logo.png"
                                alt="Kimmex Logo"
                                className="h-10 w-auto transition-all duration-300"
                            />

                            <div className="leading-none flex flex-col justify-center translate-y-[2px]">
                                <span className={`block font-black text-3xl tracking-tighter transition-colors duration-300 leading-[0.8] ${isScrolled ? 'text-titan-navy group-hover:text-titan-red' : 'text-white'}`}>KIMMEX</span>
                                <span className={`block text-[10px] font-bold tracking-[0.22em] uppercase transition-colors duration-300 mt-1 ${isScrolled ? 'text-titan-navy-subtle' : 'text-white/80'}`}>Construction & Investment</span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-10">
                            {[
                                {
                                    label: 'About Us', href: '/design-x/about',
                                    children: [
                                        { label: 'Company Profile', href: '/design-x/about#profile' },
                                        { label: 'Leadership', href: '/design-x/about#leadership' },
                                        { label: 'Quality & Safety', href: '/design-x/about#safety' }
                                    ]
                                },
                                {
                                    label: 'Services', href: '/design-x/services'
                                },
                                {
                                    label: 'Projects', href: '/design-x/projects',
                                    children: [
                                        { label: 'Done Projects', href: '/design-x/projects/completed' },
                                        { label: 'Implementation Projects', href: '/design-x/projects/implementation' }
                                    ]
                                },

                                {
                                    label: 'Media', href: '/design-x/news',
                                    children: [
                                        { label: 'News & Updates', href: '/design-x/news' },
                                        { label: 'Knowledge Base', href: '/design-x/documents' }
                                    ]
                                },
                                {
                                    label: 'Careers', href: '/design-x/careers'
                                },
                                { label: 'Contact', href: '/design-x/contact' }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="relative group/nav py-8"
                                    onMouseEnter={() => setHoveredNav(i)}
                                    onMouseLeave={() => setHoveredNav(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1.5 cursor-pointer relative z-10"
                                    >
                                        <span className={`text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${isScrolled ? 'text-titan-navy group-hover/nav:text-titan-red' : 'text-white/90 hover:text-white drop-shadow-sm'}`}>
                                            {item.label}
                                        </span>
                                        {item.children && (
                                            <ChevronDown strokeWidth={3} size={10} className={`transition-transform duration-300 group-hover/nav:-rotate-180 ${isScrolled ? 'text-titan-navy group-hover/nav:text-titan-red' : 'text-white/90'}`} />
                                        )}
                                    </Link>

                                    {/* Hover Indicator Line */}
                                    <span className={`absolute bottom-6 left-0 h-[3px] rounded-full transition-all duration-300 ease-out ${hoveredNav === i ? 'w-full' : 'w-0'} ${isScrolled ? 'bg-titan-red' : 'bg-white'}`}></span>

                                    {/* Dropdown Menu - Improved Animation & Style */}
                                    {/* Dropdown Menu - Premium Design */}
                                    {item.children && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform -translate-y-2 group-hover/nav:translate-y-0 z-50">
                                            <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden border border-gray-100/50">
                                                {/* Gradient Top Accent */}
                                                <div className="h-1 bg-gradient-to-r from-titan-red to-orange-600"></div>

                                                <div className="py-2 relative bg-white">
                                                    {/* Subtle Background Decoration */}
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red/5 rounded-full -mr-16 -mt-16 pointer-events-none blur-3xl"></div>

                                                    {item.children.map((child, idx) => (
                                                        <Link
                                                            key={idx}
                                                            href={child.href}
                                                            className="flex items-center justify-between px-6 py-4 text-[13px] font-bold text-titan-navy hover:text-titan-red hover:bg-gray-50 transition-all group/item relative"
                                                        >
                                                            <span className="relative z-10 tracking-wide">{child.label}</span>
                                                            <ArrowRight size={14} className="text-titan-red opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />

                                                            {/* Left Active Line */}
                                                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-titan-red transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center"></div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-all duration-300 group border ${isScrolled ? 'bg-titan-navy/5 text-titan-navy border-titan-navy/10 hover:bg-titan-navy hover:text-white' : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-titan-navy border-white/40'}`}
                        >
                            <Search size={16} className={`transition-colors ${isScrolled ? 'text-titan-red group-hover:text-white' : 'text-white group-hover:text-titan-navy'}`} />
                            Search
                        </button>
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                {children}
            </main>

            {/* --- FOOTER --- */}
            {/* --- FOOTER --- */}
            <FooterX />

            {/* --- SEARCH MODAL --- */}
            <AnimatePresence>
                {isSearchOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[15vh]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute inset-0 bg-titan-navy/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: -10 }}
                            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                            className="relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden rounded-md"
                        >
                            {/* Input Area */}
                            <div className="relative border-b border-titan-navy-light/10">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-titan-navy/40" size={24} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-transparent pl-16 pr-16 py-6 text-xl font-medium text-titan-navy outline-none placeholder:text-titan-navy-subtle/40"
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-titan-navy-subtle hover:text-titan-red transition-colors bg-titan-bg rounded-sm"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-widest">ESC</span>
                                </button>
                            </div>

                            {/* Suggestions / Quick Links */}
                            <div className="p-2 bg-titan-bg/50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="p-4">
                                        <p className="text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-3 px-2">Quick Access</p>
                                        <div className="space-y-1">
                                            {[
                                                { label: 'Featured Projects', href: '/design-x/projects' },
                                                { label: 'Knowledge Base', href: '/design-x/documents' },
                                                { label: 'Submit Proposal', href: '/design-x/contact' },

                                            ].map((link, i) => (
                                                <Link key={i} href={link.href} onClick={() => setIsSearchOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-white hover:text-titan-red text-titan-navy text-sm font-bold transition-all group cursor-pointer">
                                                    {link.label}
                                                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-4 border-l border-titan-navy-light/5">
                                        <p className="text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-3 px-2">Popular Tags</p>
                                        <div className="flex flex-wrap gap-2 px-2">
                                            {['High-Rise', 'Green Energy', 'Safety', 'ISO 9001', 'Structural'].map(tag => (
                                                <span key={tag} className="px-3 py-1.5 bg-white border border-titan-navy-light/10 text-titan-navy text-xs font-bold uppercase tracking-wide rounded-sm cursor-pointer hover:border-titan-red hover:text-titan-red transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
