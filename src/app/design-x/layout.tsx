'use client';

import React from 'react';
import { Phone, Facebook, Linkedin, Youtube, Search, ArrowRight, ChevronDown, Menu, X, Mail, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FooterX from './components/FooterX';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { t, language, setLanguage, fontClassName } = useLanguage();
    
    // Adjust sizes for Khmer to match legibility of English
    const isKh = language === 'kh';
    // Top bar: smaller text
    const textTopBar = isKh ? 'text-[12px]' : 'text-[11px]';
    // Main Nav: Standard is 13px uppercase, Khmer needs bigger
    const textMainNav = isKh ? 'text-base' : 'text-[13px]';
    // Dropdown items: Standard is sm (14px)
    const textDropdown = isKh ? 'text-base' : 'text-sm';
    
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [hoveredNav, setHoveredNav] = React.useState<number | null>(null);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [expandedMobileItem, setExpandedMobileItem] = React.useState<number | null>(null);

    // Navigation Items (Dynamic based on language)
    const navItems = [
        {
            label: t('About Us'), href: '/design-x/about',
            children: [
                { label: t('Company Profile'), href: '/design-x/about#profile', desc: t('Learn about our history') },
                { label: t('Leadership'), href: '/design-x/about#leadership', desc: t('Meet our team') },
                { label: t('Quality & Safety'), href: '/design-x/about#safety', desc: t('Our standards') }
            ]
        },
        {
            label: t('Services'), href: '/design-x/services',
            children: [
                { label: t('Design & Build'), href: '/design-x/services/design-build', desc: t('Full lifecycle solutions') },
                { label: t('Building Renovation'), href: '/design-x/services/renovation', desc: t('Revitalize existing structures') },
                { label: t('Project Management'), href: '/design-x/services/project-management', desc: t('Oversight & control') },
                { label: t('Consultants'), href: '/design-x/services/consultants', desc: t('Expert advisory services') }
            ]
        },
        {
            label: t('Projects'), href: '/design-x/projects',
            children: [
                { 
                    label: t('Done Projects'), 
                    href: '/design-x/projects/completed', 
                    desc: t('View our portfolio'),
                    children: [
                        { label: t('Government'), href: '/design-x/projects/completed?type=Government Office Building' },
                        { label: t('Public Service'), href: '/design-x/projects/completed?type=Public Service Building' },
                        { label: t('Private'), href: '/design-x/projects/completed?type=Private Building' },
                        { label: t('Water Treatment'), href: '/design-x/projects/completed?type=Water Treatment Plant' },
                        { label: t('Slope'), href: '/design-x/projects/completed?type=Slope Construction' }
                    ]
                },
                { 
                    label: t('Implement Projects'), 
                    href: '/design-x/projects/implementation', 
                    desc: t('Current developments'),
                    children: [
                        { label: t('Government'), href: '/design-x/projects/implementation?type=Government Office Building' },
                        { label: t('Public Service'), href: '/design-x/projects/implementation?type=Public Service Building' },
                        { label: t('Private'), href: '/design-x/projects/implementation?type=Private Building' },
                        { label: t('Water Treatment'), href: '/design-x/projects/implementation?type=Water Treatment Plant' },
                        { label: t('Slope'), href: '/design-x/projects/implementation?type=Slope Construction' }
                    ]
                }
            ]
        },
        {
            label: t('News'), href: '/design-x/news',
            children: [
                { label: t('News & Updates'), href: '/design-x/news', desc: t('Latest announcements') },
                { label: t('Doc Collection'), href: '/design-x/documents', desc: t('Resources & documents') }
            ]
        },
        { label: t('Careers'), href: '/design-x/careers' },
        { label: t('Contact'), href: '/design-x/contact' }
    ];

    React.useEffect(() => {
        const updateScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', updateScroll);
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    // Close mobile menu on resize
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`bg-white text-titan-navy min-h-screen flex flex-col ${fontClassName}`}>

            {/* --- FIXED HEADER GROUP --- */}
            <header className="fixed top-0 left-0 w-full z-[100]">
                {/* --- TOP BAR --- */}
                <div className={`bg-titan-navy text-white ${textTopBar} tracking-wide font-medium transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
                    <div className="max-w-[1600px] mx-auto px-6 h-full flex justify-between items-center">
                        <div className="flex gap-6 items-center">
                            <span className="flex items-center gap-2 hover:text-accent-orange cursor-pointer transition">
                                <Phone size={12} className="text-accent-orange" /> 
                                +855 23 999 999
                            </span>
                            <span className="hidden md:flex items-center gap-2 hover:text-accent-orange cursor-pointer transition">
                                <Mail size={12} className="text-accent-orange" /> 
                                info@kimmex.com.kh
                            </span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="hidden sm:flex items-center gap-2 text-white/60">
                                <MapPin size={12} />
                                <span>{t('Phnom Penh, Cambodia')}</span>
                            </div>
                            <div className="w-[1px] h-3 bg-white/20 hidden sm:block"></div>
                            <div className="flex gap-2">
                                <a href="#" className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-colors">
                                    <Facebook size={12} />
                                </a>
                                <a href="#" className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-colors">
                                    <Linkedin size={12} />
                                </a>
                                <a href="#" className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-colors">
                                    <Youtube size={12} />
                                </a>
                            </div>

                            {/* LANGUAGE SWITCHER */}
                            <div className="w-[1px] h-3 bg-white/20 hidden sm:block"></div>
                            <div className="flex items-center gap-1 bg-white/10 rounded px-1 py-0.5">
                                <button 
                                    onClick={() => setLanguage('en')}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${language === 'en' ? 'bg-accent-orange text-white' : 'text-white/60 hover:text-white'}`}
                                >
                                    EN
                                </button>
                                <button 
                                    onClick={() => setLanguage('kh')}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${language === 'kh' ? 'bg-accent-orange text-white' : 'text-white/60 hover:text-white'}`}
                                >
                                    KH
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN NAVBAR --- */}
                <nav className={`w-full transition-all duration-500 ${isScrolled ? 'bg-white shadow-xl py-0' : 'bg-white py-0'}`}>
                    <div className="max-w-[1600px] mx-auto px-6">
                        <div className="flex justify-between items-center h-20">
                            {/* Logo Area */}
                            <Link href="/design-x" className="flex items-center gap-3 group cursor-pointer">
                                <div className="relative">
                                    <img
                                        src="/logo.png"
                                        alt="Kimmex Logo"
                                        className="h-12 w-auto transition-all duration-300"
                                    />
                                </div>
                                <div className="leading-none flex flex-col justify-center">
                                    <span className="block font-black text-2xl md:text-3xl tracking-tight transition-all duration-300 leading-none text-titan-navy group-hover:text-accent-orange">
                                        KIMMEX
                                    </span>
                                    <span className="block text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 mt-0.5 text-titan-navy/50">
                                        {t('Construction & Investment')}
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Menu */}
                            <div className="hidden lg:flex items-center">
                                {navItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="relative group/nav"
                                        onMouseEnter={() => setHoveredNav(i)}
                                        onMouseLeave={() => setHoveredNav(null)}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-1 px-5 py-8 cursor-pointer relative"
                                        >
                                            <span className={`${textMainNav} font-bold uppercase tracking-wide transition-all duration-200 text-titan-navy group-hover/nav:text-accent-orange`}>
                                                {item.label}
                                            </span>
                                            {item.children && (
                                                <ChevronDown strokeWidth={2.5} size={12} className="transition-transform duration-300 group-hover/nav:-rotate-180 text-titan-navy/50 group-hover/nav:text-accent-orange" />
                                            )}
                                            {/* Bottom indicator */}
                                            <span className={`absolute bottom-0 left-5 right-5 h-[3px] bg-accent-orange transition-all duration-300 ${hoveredNav === i ? 'opacity-100' : 'opacity-0'}`}></span>
                                        </Link>

                                        {/* Mega Dropdown Menu */}
                                        {item.children && (
                                            <div className="absolute top-full left-0 pt-0 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform translate-y-2 group-hover/nav:translate-y-0 z-50">
                                                <div className="bg-white shadow-2xl rounded-b-lg border border-gray-100 border-t-0 min-w-[280px]">
                                                    {/* Orange top line */}
                                                    <div className="h-1 bg-accent-orange"></div>
                                                    
                                                    {/* Standard Dropdown / Nested Flyout */}
                                                    <div className="py-2 bg-white rounded-b-lg">
                                                        {item.children.map((child, idx) => (
                                                            <div key={idx} className="relative group/nested">
                                                                <Link
                                                                    href={child.href}
                                                                    className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors group/item"
                                                                >
                                                                    <div>
                                                                        <div className={`font-bold text-titan-navy group-hover/item:text-accent-orange transition-colors ${textDropdown}`}>
                                                                            {child.label}
                                                                        </div>
                                                                        {child.desc && (
                                                                            <div className="text-[10px] text-titan-navy/50 mt-0.5">
                                                                                {child.desc}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {(child as any).children && (
                                                                        <ArrowRight size={14} className="text-gray-300 group-hover/item:text-accent-orange transition-colors" />
                                                                    )}
                                                                </Link>

                                                                {/* 3rd Level Flyout */}
                                                                {(child as any).children && (
                                                                    <div className="absolute left-full top-0 ml-2 opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-300 transform translate-x-2 group-hover/nested:translate-x-0 z-[60]">
                                                                        <div className="bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-100 min-w-[240px]">
                                                                            {/* Accent Line matching parent */}
                                                                            <div className="h-1 bg-accent-orange"></div>
                                                                            
                                                                            <div className="py-2">
                                                                                {(child as any).children.map((sub: any, subIdx: number) => (
                                                                                    <Link
                                                                                        key={subIdx}
                                                                                        href={sub.href}
                                                                                        className={`group/sub flex items-center justify-between px-5 py-3 ${textDropdown} font-bold text-titan-navy/70 hover:text-accent-orange hover:bg-gray-50 transition-all`}
                                                                                    >
                                                                                        <span>{sub.label}</span>
                                                                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-accent-orange" />
                                                                                    </Link>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-3">
                                {/* Search Button */}
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-accent-orange hover:text-white transition-all text-titan-navy"
                                >
                                    <Search size={18} />
                                </button>

                                {/* CTA Button - Desktop */}
                                <Link 
                                    href="/design-x/contact"
                                    className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 bg-accent-orange text-white hover:bg-titan-navy"
                                >
                                    {t('Get Quote')}
                                    <ArrowRight size={16} />
                                </Link>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="lg:hidden w-10 h-10 rounded-lg bg-titan-navy text-white flex items-center justify-center"
                                >
                                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Border */}
                    <div className="h-[1px] bg-gray-100"></div>
                </nav>

                {/* --- MOBILE MENU --- */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white border-b border-gray-100 shadow-xl overflow-hidden"
                        >
                            <div className="max-h-[70vh] overflow-y-auto">
                                <div className="p-4 space-y-1">
                                    {navItems.map((item, i) => (
                                        <div key={i}>
                                            <div 
                                                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                                                onClick={() => {
                                                    if (item.children) {
                                                        setExpandedMobileItem(expandedMobileItem === i ? null : i);
                                                    }
                                                }}
                                            >
                                                <Link 
                                                    href={item.href}
                                                    className="font-bold text-titan-navy"
                                                    onClick={() => !item.children && setIsMobileMenuOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                                {item.children && (
                                                    <ChevronDown 
                                                        size={16} 
                                                        className={`text-titan-navy/50 transition-transform duration-300 ${expandedMobileItem === i ? 'rotate-180' : ''}`} 
                                                    />
                                                )}
                                            </div>
                                            
                                            {/* Mobile Submenu */}
                                            <AnimatePresence>
                                                {item.children && expandedMobileItem === i && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="ml-4 mt-1 space-y-1 overflow-hidden"
                                                    >
                                                        {item.children.map((child, idx) => (
                                                            <div key={idx}>
                                                                <Link
                                                                    href={child.href}
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-accent-orange/10 text-titan-navy/70 hover:text-accent-orange transition-all"
                                                                >
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-orange"></div>
                                                                    <span className="text-sm font-medium">{child.label}</span>
                                                                </Link>
                                                                
                                                                {/* 3rd Level for Mobile */}
                                                                {(child as any).children && (
                                                                    <div className="ml-8 border-l border-gray-100 pl-2 space-y-1 my-1">
                                                                        {(child as any).children.map((sub: any, subIdx: number) => (
                                                                            <Link
                                                                                key={subIdx}
                                                                                href={sub.href}
                                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                                className="block px-3 py-1.5 text-xs font-medium text-titan-navy/60 hover:text-accent-orange transition-colors"
                                                                            >
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
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile CTA */}
                                <div className="p-4 border-t border-gray-100">
                                    <Link 
                                        href="/design-x/contact"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg font-bold text-sm uppercase tracking-wide bg-accent-orange text-white"
                                    >
                                        {t('Get a Free Quote')}
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>

                                {/* Mobile Contact Info */}
                                <div className="p-4 bg-gray-50 border-t border-gray-100">
                                    <div className="flex flex-col gap-2 text-sm">
                                        <a href="tel:+85523999999" className="flex items-center gap-2 text-titan-navy/70">
                                            <Phone size={14} className="text-accent-orange" />
                                            +855 23 999 999
                                        </a>
                                        <a href="mailto:info@kimmex.com.kh" className="flex items-center gap-2 text-titan-navy/70">
                                            <Mail size={14} className="text-accent-orange" />
                                            info@kimmex.com.kh
                                        </a>
                                    </div>
                                    {/* Mobile Language Switcher */}
                                    <div className="mt-4 flex gap-2">
                                        <button 
                                            onClick={() => setLanguage('en')}
                                            className={`flex-1 py-2 rounded text-xs font-bold transition-all border ${language === 'en' ? 'bg-accent-orange text-white border-accent-orange' : 'bg-white text-titan-navy border-gray-200'}`}
                                        >
                                            English
                                        </button>
                                        <button 
                                            onClick={() => setLanguage('kh')}
                                            className={`flex-1 py-2 rounded text-xs font-bold transition-all border ${language === 'kh' ? 'bg-accent-orange text-white border-accent-orange' : 'bg-white text-titan-navy border-gray-200'}`}
                                        >
                                            ខ្មែរ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <FooterX />

            {/* --- SEARCH MODAL --- */}
            <AnimatePresence>
                {isSearchOpen && (
                    <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 pt-[10vh]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute inset-0 bg-titan-navy/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: -10 }}
                            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                            className="relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden rounded-xl"
                        >
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-titan-navy/30" size={22} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder={t('Search...')}
                                    className="w-full bg-transparent pl-14 pr-24 py-5 text-lg font-medium text-titan-navy outline-none placeholder:text-titan-navy/30 border-b border-gray-100"
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-titan-navy/50 hover:text-accent-orange transition-colors bg-gray-100 rounded-md"
                                >
                                    ESC
                                </button>
                            </div>

                            {/* Quick Links */}
                            <div className="p-5">
                                <p className="text-xs font-bold text-titan-navy/40 uppercase tracking-widest mb-4">{t('Quick Links')}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { label: t('Projects'), href: '/design-x/projects', icon: '🏗️' },
                                        { label: t('Services'), href: '/design-x/services', icon: '⚙️' },
                                        { label: t('About Us'), href: '/design-x/about', icon: '🏢' },
                                        { label: t('Contact'), href: '/design-x/contact', icon: '📞' },
                                    ].map((link, i) => (
                                        <Link 
                                            key={i} 
                                            href={link.href} 
                                            onClick={() => setIsSearchOpen(false)} 
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-accent-orange hover:text-white text-titan-navy font-medium transition-all group"
                                        >
                                            <span className="text-lg">{link.icon}</span>
                                            <span className="text-sm">{link.label}</span>
                                            <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="px-5 pb-5">
                                <p className="text-xs font-bold text-titan-navy/40 uppercase tracking-widest mb-3">{t('Categories')}</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Commercial', 'Infrastructure', 'Industrial', 'Renovation', 'Government'].map(tag => (
                                        <span key={tag} className="px-4 py-2 bg-titan-navy/5 text-titan-navy text-xs font-bold uppercase rounded-full cursor-pointer hover:bg-accent-orange hover:text-white transition-all">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function DesignXLayout({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <LayoutContent>{children}</LayoutContent>
        </LanguageProvider>
    );
}
