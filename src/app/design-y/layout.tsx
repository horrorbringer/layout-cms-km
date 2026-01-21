'use client';

import React from 'react';
import { Phone, Facebook, Linkedin, Youtube, Search, ArrowRight, ChevronDown, Menu, Globe, Clock, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FooterY from './components/FooterY';

// Helper component for live clock
const LiveClock = () => {
    const [time, setTime] = React.useState('');
    React.useEffect(() => {
        const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Phnom_Penh' }));
        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, []);
    return <span>{time}</span>;
}

export default function DesignYLayout({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [hoveredNav, setHoveredNav] = React.useState<number | null>(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const updateScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', updateScroll);
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    // Navigation Data
    const navItems = [
        {
            label: 'The Company', href: '/design-y/about',
            children: [
                { label: 'Our Vision', href: '/design-y/about' },
                { label: 'Leadership', href: '/design-y/about#leadership' },
                { label: 'Doc Collection', href: '/design-y/structure' },
                { label: 'HSE Policy', href: '/design-y/about#safety' }
            ]
        },
        { label: 'Capabilities', href: '/design-y/services' },
        {
            label: 'Portfolio', href: '/design-y/projects',
            children: [
                { label: 'Commercial High-Rise', href: '/design-y/projects?cat=commercial' },
                { label: 'Industrial Facilities', href: '/design-y/projects?cat=industrial' },
                { label: 'Public Infrastructure', href: '/design-y/projects?cat=infrastructure' }
            ]
        },
        { label: 'Media', href: '/design-y/news' },
        { label: 'Careers', href: '/design-y/careers' }
    ];

    return (
        <div className="bg-white font-sans text-titan-navy selection:bg-titan-red selection:text-white min-h-screen flex flex-col">

            {/* --- ARCHITECTURAL HEADER --- */}
            <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md border-titan-navy shadow-sm' : 'bg-transparent border-titan-navy/5'}`}>

                {/* System Status Bar - Always Visible but subtler when not scrolled vertically? No, keep it consistent. */}
                <div className="hidden lg:flex justify-between items-center py-2 px-6 border-b border-titan-navy/5 text-[9px] font-mono tracking-widest text-titan-navy/50 uppercase bg-titan-bg/80 backdrop-blur-sm">
                    <div className="flex gap-6 items-center">
                        <span className="flex items-center gap-2"><Globe size={10} /> 11.55°N, 104.92°E // PNH</span>
                        <span className="flex items-center gap-2"><Activity size={10} className="text-green-500" /> SYS.STATUS: ONLINE</span>
                    </div>
                    <div className="flex gap-6 items-center">
                        <span className="flex items-center gap-2">UTC+07:00 <LiveClock /></span>
                    </div>
                </div>

                <div className={`max-w-[1600px] mx-auto px-6 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6 md:py-8'}`}>

                    {/* Logo Section */}
                    <Link href="/design-y" className="flex items-center gap-4 group relative z-50">
                        <div className="relative overflow-hidden">
                            <img src="/logo.png" alt="Kimmex" className="h-10 w-auto transition-all duration-500" />
                        </div>
                        <div className="hidden md:flex flex-col leading-none transition-colors duration-500 text-titan-navy">
                            <span className="font-black text-2xl tracking-tighter group-hover:text-titan-red transition-colors">KIMMEX</span>
                            <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">Estr. 1999</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Numbered & Technical */}
                    <div className="hidden lg:flex items-center gap-12">
                        {navItems.map((item, i) => (
                            <div key={i} className="relative group/nav py-4" onMouseEnter={() => setHoveredNav(i)} onMouseLeave={() => setHoveredNav(null)}>
                                <Link href={item.href} className="relative z-10 flex items-baseline gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 text-titan-navy hover:text-titan-red">
                                    <span className="font-mono text-[10px] opacity-40 text-titan-navy group-hover/nav:text-titan-red transition-colors duration-300">0{i + 1}.</span>
                                    <span>{item.label}</span>
                                    {item.children && <ChevronDown size={8} className="ml-0.5 opacity-40" />}
                                </Link>

                                {/* Active Underline */}
                                <span className={`absolute bottom-2 left-0 h-[2px] bg-titan-red transition-all duration-300 ease-out ${hoveredNav === i ? 'w-full' : 'w-0'}`}></span>

                                {/* Technical Mega Menu */}
                                {item.children && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[300px] pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform translate-y-2 group-hover/nav:translate-y-0">
                                        <div className="bg-white border text-titan-navy shadow-2xl relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-titan-red"></div>
                                            {item.children.map((child, idx) => (
                                                <Link key={idx} href={child.href} className="group/item flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                                    <span className="text-xs font-bold uppercase tracking-wide group-hover/item:translate-x-1 transition-transform">{child.label}</span>
                                                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-titan-red" />
                                                </Link>
                                            ))}
                                            {/* Decorative Corner */}
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-titan-navy/5 triangle-corner"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Button - Solid Construction */}
                    <div className="flex items-center gap-6">
                        <Link href="/design-y/contact" className={`hidden lg:flex items-center gap-3 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${isScrolled ? 'bg-titan-navy text-white border-titan-navy hover:bg-titan-red hover:border-titan-red' : 'bg-white text-titan-navy border-titan-navy/20 hover:border-titan-navy hover:bg-titan-navy hover:text-white'}`}>
                            <span>Inquire</span>
                            <ArrowRight size={14} />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden relative z-50 p-2 text-titan-navy">
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col pt-32 px-6"
                    >
                        <div className="space-y-6">
                            {navItems.map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-4">
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-2xl font-black text-titan-navy block mb-2"
                                    >
                                        {item.label}
                                    </Link>
                                    {item.children && (
                                        <div className="pl-4 space-y-3 border-l-2 border-titan-red/20 ml-1">
                                            {item.children.map((child, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={child.href}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="block text-sm font-medium text-titan-navy-subtle"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link
                                href="/design-y/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-center bg-titan-navy text-white font-bold py-4 mt-8"
                            >
                                START A PROJECT
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-grow">
                {children}
            </main>

            {/* --- TECHNICAL FOOTER --- */}
            <FooterY />

        </div>
    );
}
