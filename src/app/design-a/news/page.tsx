'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, Menu, X, Facebook, Linkedin, Youtube, 
    Calendar, User, Tag, Search, TrendingUp, Newspaper, 
    ChevronRight, Briefcase, FileText, Download, Check, 
    ChevronDown, Filter 
} from 'lucide-react';
import Link from 'next/link';

// --- SHARED COMPONENTS FROM DESIGN-A ---

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

// --- MOCK DATA (From design-x) ---
const allNews = [
    {
        id: '1',
        title: 'Kimmex Awarded "Best Commercial Project 2025" at PropertyGuru Awards',
        category: 'Awards',
        date: 'Oct 15, 2025',
        author: 'PR Team',
        image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'We are honored to receive the prestigious Gold Award for the new Ministry of Interior complex, recognized for its architectural excellence and sustainable design.',
        featured: true
    },
    {
        id: '2',
        title: 'Breaking Ground on the New Sihanoukville Logistics Hub',
        category: 'Project Updates',
        date: 'Sep 22, 2025',
        author: 'Project Mgmt',
        image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'Phase 1 of the massive logistics center has officially begun. This project aims to revolutionize the supply chain infrastructure in the coastal region.',
        featured: false
    },
    {
        id: '3',
        title: 'Safety First: Achieving 2 Million Man-Hours Without Lost Time Injury',
        category: 'Safety',
        date: 'Aug 05, 2025',
        author: 'HSE Dept',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'A milestone achievement for our construction teams at the Calmette Hospital site, proving that safety and speed can go hand in hand.',
        featured: false
    },
    {
        id: '4',
        title: 'Introducing Our New "Green Build" Initiative',
        category: 'Sustainability',
        date: 'Jul 12, 2025',
        author: 'Sustainability Lead',
        image: 'https://images.unsplash.com/photo-1518182170546-0766aaef3194?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'Commiting to a sustainable future, Kimmex pledges to reduce carbon footprint by 30% across all new projects starting 2026.',
        featured: false
    },
    {
        id: '5',
        title: 'Annual Staff Retreat 2025: Building Bonds',
        category: 'Culture',
        date: 'Jun 20, 2025',
        author: 'HR Dept',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'Our team gathered in Siem Reap for a weekend of team building, strategy planning, and celebrating our shared successes.',
        featured: false
    },
    {
        id: '6',
        title: 'Kimmex Partners with RUPP for Internship Program',
        category: 'Community',
        date: 'May 30, 2025',
        author: 'HR Dept',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'Fostering the next generation of engineers, we are proud to announce a signed MoU with the Royal University of Phnom Penh.',
        featured: false
    }
];

const recentJobs = [
    { title: 'Senior Civil Engineer', loc: 'Phnom Penh' },
    { title: 'Site Manager', loc: 'Sihanoukville' },
    { title: 'Safety Inspector (HSE)', loc: 'Kampot' }
];

const recentDocs = [
    { title: 'Engineering Standards 2026', size: '15.4 MB', type: 'PDF' },
    { title: 'Sustainability Report Q3', size: '4.2 MB', type: 'PDF' }
];

const categories = ['All', 'Project Updates', 'Awards', 'Safety', 'Sustainability', 'Culture', 'Community'];

// --- CUSTOM DROPDOWN (Design-A Style) ---
const CustomDropdown = ({ options, value, onChange, icon: Icon, placeholder = "Select..." }: { options: string[], value: string, onChange: (val: string) => void, icon?: any, placeholder?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className={`w-full flex items-center justify-between bg-[#F5F5F7] border border-transparent hover:bg-white hover:border-gray-200 px-6 py-4 rounded-xl text-sm font-bold text-titan-navy transition-all shadow-sm`}
            >
                <div className="flex items-center gap-3 truncate">
                    {Icon && <Icon size={16} className="text-titan-red shrink-0" />}
                    <span className="truncate">{value || placeholder}</span>
                </div>
                <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 py-2 origin-top max-h-60 overflow-y-auto"
                    >
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className={`w-full text-left px-6 py-3 text-sm font-medium hover:bg-gray-50 flex items-center justify-between group ${value === opt ? 'text-titan-red bg-red-50/50' : 'text-titan-navy'}`}
                            >
                                <span className="truncate">{opt}</span>
                                {value === opt && <Check size={14} className="text-titan-red shrink-0" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function NewsPageDesignA() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const featuredNews = allNews.find(n => n.featured) || allNews[0];
    const otherNews = allNews.filter(n => n.id !== featuredNews.id);

    const filteredNews = otherNews.filter(n => {
        const matchesCategory = activeCategory === 'All' || n.category === activeCategory;
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              n.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                <header className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-titan-navy rounded-b-[4rem]">
                    <div className="absolute inset-0">
                        <img 
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2670&auto=format&fit=crop" 
                            alt="News Hero" 
                            className="w-full h-full object-cover opacity-30 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-titan-navy/90 via-titan-navy/60 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy to-transparent opacity-90"></div>
                    </div>
                    
                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-titan-red animate-pulse"></span>
                                Latest Updates
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[0.9]">
                                Insights & <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-titan-red to-white">Innovation.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/70 font-light max-w-xl leading-relaxed mb-10 border-l-4 border-titan-red pl-6">
                                Discover the stories shaping our company and the future of construction in Cambodia.
                            </p>
                        </motion.div>

                        {/* Featured Headline Card - Floating */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="hidden lg:block relative"
                        >
                            <div className="absolute -inset-4 bg-white/5 rounded-[2.5rem] blur-xl"></div>
                                <Link href={`/design-a/news/${featuredNews.id}`} className="relative block bg-white/10 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/15 transition-all group">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="bg-titan-red text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md shadow-lg">
                                        Breaking News
                                    </span>
                                    <span className="text-white/60 text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                                        <Calendar size={12} /> {featuredNews.date}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4 leading-tight group-hover:text-titan-red transition-colors">
                                    {featuredNews.title}
                                </h3>
                                <div className="flex items-center gap-3 text-white/80 text-sm font-bold uppercase tracking-widest mt-6">
                                    Read Story <ArrowRight size={16} className="text-titan-red" />
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </header>

                <div className="max-w-[1400px] mx-auto px-6 relative z-20 pb-20 mt-12 md:mt-20">
                    
                    {/* --- LAYOUT CONTAINER --- */}
                    <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* --- MAIN CONTENT (70%) --- */}
                        <div className="lg:w-[70%] space-y-12">
                            
                            {/* FEATURED STORY (MOBILE ONLY) */}
                            <motion.div 
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="lg:hidden"
                            >
                                <Link href={`/design-a/news/${featuredNews.id}`} className="group relative block rounded-[2.5rem] overflow-hidden shadow-xl aspect-[16/9] border border-gray-100">
                                    <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/90 via-titan-navy/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="bg-titan-red text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md">
                                                Featured Story
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-titan-red transition-colors">
                                            {featuredNews.title}
                                        </h2>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* NEWS GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <AnimatePresence mode='wait'>
                                    {filteredNews.map((news, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            key={news.id}
                                        >
                                            <Link href={`/design-a/news/${news.id}`} className="group flex flex-col h-full bg-[#F5F5F7] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                                <div className="aspect-[3/2] overflow-hidden relative m-2 rounded-[1.5rem]">
                                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-white/95 backdrop-blur text-titan-navy px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm">
                                                            {news.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-8 flex flex-col flex-grow">
                                                    <div className="flex items-center gap-4 text-xs font-bold text-titan-navy/40 mb-3 uppercase tracking-wider">
                                                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-titan-red" /> {news.date}</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors leading-tight line-clamp-2">
                                                        {news.title}
                                                    </h3>
                                                    <p className="text-titan-navy/60 text-sm leading-relaxed mb-6 line-clamp-2">
                                                        {news.excerpt}
                                                    </p>
                                                    <div className="mt-auto pt-4 border-t border-titan-navy/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-titan-navy">
                                                        <span className="group-hover:text-titan-red transition-colors">Read Article</span>
                                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-titan-navy group-hover:text-titan-red transition-colors">
                                                            <ArrowRight size={14} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {filteredNews.length === 0 && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20 bg-[#F5F5F7] rounded-[2.5rem] border-2 border-dashed border-gray-200"
                                >
                                    <p className="text-titan-navy/50 font-medium">No news found matching your criteria.</p>
                                    <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="mt-4 text-titan-red font-bold text-sm uppercase tracking-wide hover:underline">
                                        Clear Filters
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* --- SIDEBAR WIDGETS (30%) --- */}
                        <div className="lg:w-[30%] space-y-8 lg:sticky lg:top-32 h-fit">
                            
                            {/* 1. Filter & Search Widget */}
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg shadow-gray-100 border border-gray-50">
                                <h3 className="text-xs font-black text-titan-navy mb-6 uppercase tracking-widest flex items-center gap-2">
                                    <Filter size={14} className="text-titan-red" /> Filter News
                                </h3>
                                
                                <div className="space-y-4">
                                    {/* Search */}
                                    <div className="relative group">
                                        <input 
                                            type="text" 
                                            placeholder="Search articles..." 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-[#F5F5F7] border-transparent border focus:bg-white pl-10 pr-4 py-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-titan-red/20 focus:border-titan-red/20 transition-all" 
                                        />
                                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-titan-red transition-colors" />
                                    </div>

                                    {/* Categories Dropdown */}
                                    <div>
                                        <CustomDropdown 
                                            options={categories}
                                            value={activeCategory}
                                            onChange={setActiveCategory}
                                            icon={Tag}
                                            placeholder="All Categories"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Hiring Widget */}
                            <div className="bg-titan-navy p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
                                <Link href="/design-a/careers" className="absolute inset-0 z-20"></Link>
                                <div className="absolute top-0 right-0 w-40 h-40 bg-titan-red rounded-full blur-[80px] opacity-20 -mr-10 -mt-10"></div>
                                
                                <div className="flex items-center justify-between mb-8 relative z-10">
                                    <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                        <Briefcase size={16} className="text-titan-red" /> We're Hiring
                                    </h3>
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-titan-red transition-colors">
                                        <ArrowRight size={14} className="text-white" />
                                    </div>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    {recentJobs.map((job, i) => (
                                        <div key={i} className="block bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-sm font-bold text-white mb-1">{job.title}</h4>
                                                    <p className="text-[10px] text-white/50 flex items-center gap-1 font-bold uppercase tracking-wider">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {job.loc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Resources Widget */}
                            <div className="bg-[#F5F5F7] p-8 rounded-[2.5rem]">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-sm font-black text-titan-navy uppercase tracking-widest flex items-center gap-2">
                                        <FileText size={16} className="text-titan-red" /> Resources
                                    </h3>
                                    <Link href="/design-a/documents" className="text-[10px] font-bold text-titan-navy/50 hover:text-titan-navy transition-colors flex items-center gap-1 uppercase tracking-wider">
                                        View All <ChevronRight size={12} />
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {recentDocs.map((doc, i) => (
                                        <Link href="/design-a/documents" key={i} className="block bg-white hover:shadow-lg p-4 rounded-2xl border border-transparent hover:border-gray-100 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 font-black text-[10px] shrink-0 border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                                    {doc.type}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-xs font-bold text-titan-navy group-hover:text-titan-red transition-colors truncate mb-1">{doc.title}</h4>
                                                    <p className="text-[10px] text-titan-navy/40 font-bold">{doc.size}</p>
                                                </div>
                                                <Download size={16} className="text-gray-300 group-hover:text-titan-navy transition-colors shrink-0" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

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
