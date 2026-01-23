'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, User, Tag, ArrowRight, Share2, Printer, 
    Facebook, Linkedin, Twitter, ChevronLeft, Clock,
    Menu, X, Youtube, Check
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
                                                    {item.children && (
                                                        <div className="md:hidden">...</div> // Simplified for brevity in this file
                                                    )}
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
                                            
                                            {/* Mobile Accordion Logic would go here if fully implemented */}
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
                                                        {/* Sub-children logic omitted for brevity but would be here */}
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

// --- MOCK DATA ---
const allNews = [
    {
        id: '1',
        title: 'Kimmex Awarded "Best Commercial Project 2025" at PropertyGuru Awards',
        category: 'Awards',
        date: 'Oct 15, 2025',
        author: 'PR Team',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1200',
        content: `
            <p>We are thrilled to announce that Kimmex Construction has been honored with the "Best Commercial Project 2025" award at the prestigious PropertyGuru Cambodia Property Awards. This accolade recognizes our work on the new Ministry of Interior complex, a landmark project that sets new standards for institutional architecture in the region.</p>
            
            <h3>A Testament to Excellence</h3>
            <p>The award jury praised the project for its innovative design, sustainable building practices, and seamless integration of modern technology with traditional Khmer architectural elements. "This project stands as a beacon of modern Cambodia," noted the head judge.</p>
            
            <h3>Sustainability at the Core</h3>
            <p>One of the key factors contributing to this win was our commitment to sustainability. The complex features:</p>
            <ul>
                <li>Advanced solar shading systems to reduce cooling loads by 30%.</li>
                <li>Rainwater harvesting systems capable of sustaining 50% of the landscape irrigation.</li>
                <li>Use of locally sourced, low-carbon materials throughout the construction.</li>
            </ul>

            <p>This achievement would not have been possible without the dedication of our project managers, engineers, and on-site teams who worked tirelessly to deliver this vision. We also extend our gratitude to our partners and stakeholders for their trust and collaboration.</p>
        `,
        related: ['2', '4']
    },
    {
        id: '2',
        title: 'Breaking Ground on the New Sihanoukville Logistics Hub',
        category: 'Project Updates',
        date: 'Sep 22, 2025',
        author: 'Project Mgmt',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=1200',
        content: '<p>Phase 1 of the massive logistics center has officially begun...</p>',
        related: ['1']
    },
    // ... add other items with basic content if needed for fallback
];

export default function NewsDetailDesignAPage() {
    const params = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const newsId = Array.isArray(params.id) ? params.id[0] : params.id;
    const newsItem = allNews.find(n => n.id === newsId) || allNews[0];
    const relatedNews = allNews.filter(n => newsItem.related?.includes(n.id));

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

                {/* --- HEADER IMAGE --- */}
                <div className="relative h-[60vh] w-full overflow-hidden bg-titan-navy">
                    <img 
                        src={newsItem.image} 
                        alt={newsItem.title} 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-transparent to-transparent opacity-90"></div>
                    
                    <div className="absolute top-32 left-6 md:left-12 z-20">
                        <Link href="/design-a/news" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white hover:text-titan-navy transition-all">
                            <ChevronLeft size={14} /> Back to News
                        </Link>
                    </div>
                </div>

                {/* --- CONTENT --- */}
                <div className="max-w-[1200px] mx-auto px-6 relative z-10 -mt-32 pb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100"
                    >
                        {/* Meta Header */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-8 text-titan-navy/50 font-bold text-xs uppercase tracking-widest border-b border-gray-100 pb-8">
                            <span className="bg-titan-navy text-white px-3 py-1 rounded-md">{newsItem.category}</span>
                            <span className="flex items-center gap-2"><Calendar size={14} className="text-titan-red" /> {newsItem.date}</span>
                            <span className="flex items-center gap-2"><User size={14} className="text-titan-red" /> {newsItem.author}</span>
                            {newsItem.readTime && <span className="flex items-center gap-2"><Clock size={14} className="text-titan-red" /> {newsItem.readTime}</span>}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-titan-navy mb-12 leading-tight">
                            {newsItem.title}
                        </h1>

                        {/* Article Body */}
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                            
                            {/* Main Text */}
                            <div className="lg:w-3/4 prose prose-lg prose-headings:font-bold prose-headings:text-titan-navy prose-p:text-titan-navy/70 prose-a:text-titan-red prose-li:text-titan-navy/70">
                                <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                            </div>

                            {/* Sidebar / Share */}
                            <div className="lg:w-1/4 space-y-12">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-titan-navy mb-4">Share Article</h4>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-titan-navy hover:bg-blue-600 hover:text-white transition-colors">
                                            <Facebook size={16} />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-titan-navy hover:bg-blue-500 hover:text-white transition-colors">
                                            <Twitter size={16} />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-titan-navy hover:bg-blue-700 hover:text-white transition-colors">
                                            <Linkedin size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-titan-navy mb-4">Print</h4>
                                    <button 
                                        onClick={() => window.print()}
                                        className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-titan-navy hover:bg-titan-navy hover:text-white transition-colors"
                                    >
                                        <Printer size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- RELATED NEWS --- */}
                    {relatedNews.length > 0 && (
                        <div className="mt-20">
                            <h3 className="text-2xl font-bold text-titan-navy mb-8">Related Stories</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedNews.map((news) => (
                                    <Link key={news.id} href={`/design-a/news/${news.id}`} className="group block bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                        <div className="aspect-[2/1] overflow-hidden relative">
                                            <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute bottom-4 left-4">
                                                <span className="bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md">
                                                    {news.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <h4 className="text-xl font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors leading-tight">
                                                {news.title}
                                            </h4>
                                            <div className="text-xs font-bold text-titan-navy/40 uppercase tracking-wider">
                                                {news.date}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
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
