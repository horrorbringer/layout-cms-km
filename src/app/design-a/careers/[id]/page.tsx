'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { 
    ArrowLeft, ArrowRight, MapPin, Briefcase, Clock, CheckCircle, Upload, 
    Send, Share2, Printer, Building, UserCheck, Heart, Sparkles,
    Menu, X, Facebook, Linkedin, Youtube, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

// --- SHARED COMPONENTS (Simplified for brevity) ---

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

// --- MOCK DATA ---
const jobDetails = [
    {
        id: 1,
        title: 'Senior Civil Engineer',
        dept: 'Engineering',
        loc: 'Phnom Penh',
        type: 'Full-time',
        summary: 'We are seeking a highly experienced Senior Civil Engineer to lead complex structural projects. You will be responsible for overseeing design integrity, ensuring compliance with international standards, and mentoring junior engineers.',
        responsibilities: [
            'Lead structural analysis and design for high-rise commercial and residential projects.',
            'Collaborate with architects and MEP engineers to ensure fully integrated designs.',
            'Review and approve technical drawings, specifications, and calculations.',
            'Conduct site inspections to verify construction quality and adherence to design.',
            'Mentor junior engineering staff and provide technical guidance.'
        ],
        requirements: [
            'Master’s Degree in Civil or Structural Engineering.',
            'Minimum 8 years of experience in structural design and construction supervision.',
            'Proficiency in ETABS, SAP2000, and AutoCAD.',
            'Strong knowledge of ACI, Eurocodes, and local building regulations.',
            'Excellent problem-solving and communication skills.'
        ],
        benefits: [
            'Competitive salary and performance-based bonuses.',
            'Health insurance coverage for employee and family.',
            'Professional development allowance.',
            '18 days annual leave + public holidays.'
        ]
    },
    {
        id: 2,
        title: 'Site Manager',
        dept: 'Operations',
        loc: 'Sihanoukville',
        type: 'Contract',
        summary: 'The Site Manager will oversee day-to-day operations on our new industrial park project. You will ensure safety, quality, and schedule targets are met.',
        responsibilities: [
            'Manage daily site activities and coordinate subcontractors.',
            'Ensure strict adherence to HSE policies.',
            'Monitor project schedule and report progress to headquarters.'
        ],
        requirements: [
            'Bachelor’s Degree in Construction Management or Civil Engineering.',
            '5+ years on-site management experience.',
            'Strong leadership and conflict resolution skills.'
        ],
        benefits: ['Housing allowance', 'Travel stipend', 'Project completion bonus']
    }
];

export default function CareerDetailDesignAPage() {
    const params = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cv: null as File | null
    });

    const id = parseInt(Array.isArray(params.id) ? params.id[0] : params.id || '1');
    const job = jobDetails.find(j => j.id === id) || jobDetails[0];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, cv: e.target.files[0] });
        }
    };

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

                {/* --- HERO / HEADER --- */}
                <header className="relative h-[60vh] bg-titan-navy flex items-end overflow-hidden pb-12 rounded-b-[4rem]">
                     <div className="absolute inset-0">
                        <img 
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop" 
                            alt="Careers Hero" 
                            className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/60 to-transparent"></div>
                    </div>

                    <div className="max-w-[1200px] w-full mx-auto relative z-10 px-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Link href="/design-a/careers" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8 hover:-translate-x-1 duration-300">
                                <ArrowLeft size={14} /> Back to Careers
                            </Link>
                            
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div>
                                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-white">{job.title}</h1>
                                    <div className="flex flex-wrap gap-4 text-sm font-bold uppercase tracking-wide text-white/90">
                                        <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"><Briefcase size={16} className="text-titan-red" /> {job.dept}</span>
                                        <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"><MapPin size={16} className="text-titan-red" /> {job.loc}</span>
                                        <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"><Clock size={16} className="text-titan-red" /> {job.type}</span>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="hidden md:flex bg-titan-red text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-titan-red transition-all shadow-lg hover:shadow-titan-red/20 items-center gap-2"
                                >
                                    Apply Now <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </header>

                {/* --- CONTENT --- */}
                <div className="max-w-[1200px] mx-auto px-6 py-16 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        
                        {/* LEFT COLUMN: JOB DETAILS */}
                        <div className="lg:col-span-7 space-y-12">
                            {/* Summary */}
                            <div className="prose prose-lg text-titan-navy/70 max-w-none">
                                <h3 className="text-xl font-black text-titan-navy mb-4 flex items-center gap-2">
                                    <Sparkles size={20} className="text-titan-red" /> Role Overview
                                </h3>
                                <p className="text-lg leading-relaxed">{job.summary}</p>
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <h3 className="text-xl font-black text-titan-navy mb-6 flex items-center gap-2 pb-4 border-b border-gray-200">
                                    <Briefcase size={20} className="text-titan-red" /> Key Responsibilities
                                </h3>
                                <ul className="space-y-4">
                                    {job.responsibilities.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F5F5F7] transition-all border border-transparent hover:border-gray-100">
                                            <div className="mt-1.5 w-6 h-6 rounded-full bg-titan-red/10 flex items-center justify-center flex-shrink-0 text-titan-red">
                                                <span className="text-xs font-bold">{i + 1}</span>
                                            </div>
                                            <span className="text-titan-navy/70 font-medium leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Requirements */}
                            <div>
                                <h3 className="text-xl font-black text-titan-navy mb-6 flex items-center gap-2 pb-4 border-b border-gray-200">
                                    <UserCheck size={20} className="text-titan-red" /> Qualifications
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {job.requirements.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-[#F5F5F7] p-4 rounded-xl border border-transparent hover:border-gray-200 transition-colors">
                                            <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-titan-navy/70 text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="bg-titan-navy rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-titan-red rounded-full blur-[80px] opacity-20 -mr-10 -mt-10"></div>
                                <h3 className="text-xl font-black mb-8 flex items-center gap-2 relative z-10">
                                    <Heart size={20} className="text-titan-red" /> Benefits & Perks
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 relative z-10">
                                    {job.benefits.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-titan-red rounded-full"></div>
                                            <span className="font-medium text-sm text-white/90">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: APPLICATION FORM (Sticky) */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-32 space-y-6" id="application-form">
                                {/* Application Card */}
                                <div className="bg-white border border-gray-100 shadow-2xl rounded-[2.5rem] p-8 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-titan-navy to-titan-red"></div>
                                    
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-black text-titan-navy mb-2">Apply Now</h3>
                                        <p className="text-titan-navy/50 text-sm">Join us as a <span className="font-bold text-titan-navy">{job.title}</span>.</p>
                                    </div>

                                    <form onSubmit={(e) => { e.preventDefault(); alert('Application Submitted (Mock)'); }}>
                                        <div className="space-y-5 mb-8">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">First Name *</label>
                                                    <input type="text" className="w-full bg-[#F5F5F7] border-none rounded-xl p-3 text-sm text-titan-navy focus:ring-2 focus:ring-titan-red/20 focus:outline-none transition-all font-medium" placeholder="John" required />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">Last Name *</label>
                                                    <input type="text" className="w-full bg-[#F5F5F7] border-none rounded-xl p-3 text-sm text-titan-navy focus:ring-2 focus:ring-titan-red/20 focus:outline-none transition-all font-medium" placeholder="Doe" required />
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">Email Address *</label>
                                                <input type="email" className="w-full bg-[#F5F5F7] border-none rounded-xl p-3 text-sm text-titan-navy focus:ring-2 focus:ring-titan-red/20 focus:outline-none transition-all font-medium" placeholder="john@example.com" required />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">Phone Number *</label>
                                                <input type="tel" className="w-full bg-[#F5F5F7] border-none rounded-xl p-3 text-sm text-titan-navy focus:ring-2 focus:ring-titan-red/20 focus:outline-none transition-all font-medium" placeholder="+855 ..." required />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">Resume / CV *</label>
                                                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-[#F5F5F7] hover:border-titan-red/30 transition-all cursor-pointer relative group">
                                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                                    <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-2 text-gray-400 group-hover:text-titan-red group-hover:scale-110 transition-all">
                                                        <Upload size={18} />
                                                    </div>
                                                    <p className="text-xs font-bold text-titan-navy group-hover:text-titan-red transition-colors">
                                                        {formData.cv ? formData.cv.name : 'Click to Upload CV'}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 mt-1">PDF or DOCX (Max 5MB)</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-2 text-xs group">
                                            Submit Application <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                </div>

                                {/* Share / Print Actions */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold uppercase tracking-widest text-titan-navy/60 hover:text-titan-navy hover:bg-[#F5F5F7] hover:border-gray-200 transition-all shadow-sm">
                                        <Share2 size={14} /> Share
                                    </button>
                                    <button 
                                        onClick={() => window.print()}
                                        className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold uppercase tracking-widest text-titan-navy/60 hover:text-titan-navy hover:bg-[#F5F5F7] hover:border-gray-200 transition-all shadow-sm"
                                    >
                                        <Printer size={14} /> Print
                                    </button>
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
