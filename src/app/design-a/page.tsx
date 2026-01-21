'use client';

import React from 'react';
import { Building2, HardHat, Scale, ArrowRight, ShieldCheck, Trophy, Phone, MapPin, Facebook, Linkedin, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DesignA() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const [lang, setLang] = React.useState<'en' | 'kh'>('en');

    const translations = {
        en: ['Home', 'About Us', 'Our Business', 'Projects', 'Knowledge & Docs', 'News & Events', 'Contact Us'],
        kh: ['ទំព័រដើម', 'អំពីក្រុមហ៊ុន', 'អាជីវកម្មរបស់យើង', 'គម្រោង', 'បណ្ណាល័យ', 'ព័ត៌មាន & ព្រឹត្តិការណ៍', 'ទំនាក់ទំនង']
    };

    const navItems = lang === 'en' ? translations.en : translations.kh;

    // Hero Carousel Logic
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [hoveredNav, setHoveredNav] = React.useState<number | null>(null);
    const slides = [
        {
            img: "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2800&auto=format&fit=crop",
            title: "Design & Build \nfor Cambodia",
            subtitle: "Your partner for high-rise buildings, infrastructure, and borey projects.",
            est: "Est. 1999"
        },
        {
            img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
            title: "Engineering \nExcellence",
            subtitle: "Setting new standards in safety, quality, and sustainable construction.",
            est: "ISO 9001"
        },
        {
            img: "https://images.unsplash.com/photo-1581094794329-cd1096a7a506?q=80&w=2670&auto=format&fit=crop",
            title: "Infrastructure \nMasters",
            subtitle: "Connecting communities through bridges, roads, and public works.",
            est: "Since 1999"
        }
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-titan-bg min-h-screen text-titan-navy font-sans">
            {/* 1. TOP BAR (Black/Dark Navy) */}
            <div className="bg-titan-navy text-titan-navy-subtle text-xs py-2 px-0 z-50 relative">
                <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <span className="flex items-center gap-2"><Phone size={14} className="text-titan-red" /> +855 23 999 999</span>
                        <span className="flex items-center gap-2"><MapPin size={14} className="text-titan-red" /> 1105 Kim Mex Tower, Phnom Penh</span>
                    </div>
                    <div className="flex gap-4 items-center mt-2 md:mt-0">
                        <div className="flex gap-4 px-4 border-r border-titan-navy-light">
                            {/* Social Icons */}
                            <Facebook size={14} className="hover:text-white cursor-pointer" />
                            <Linkedin size={14} className="hover:text-white cursor-pointer" />
                            <Youtube size={14} className="hover:text-white cursor-pointer" />
                        </div>
                        {/* Lang */}
                        <div className="flex items-center gap-2 pl-2">
                            <span onClick={() => setLang('en')} className={`cursor-pointer font-bold ${lang === 'en' ? 'text-titan-red' : 'text-titan-navy-subtle hover:text-white'}`}>EN</span>
                            <span className="text-titan-navy-subtle">|</span>
                            <span onClick={() => setLang('kh')} className={`cursor-pointer font-bold ${lang === 'kh' ? 'text-titan-red' : 'text-titan-navy-subtle hover:text-white'}`}>KH</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN NAVBAR (White with Slanted Logo) */}
            <nav className="relative bg-white shadow-lg z-40 h-24">
                <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between pr-4 md:pr-8">

                    {/* SLANTED LOGO CONTAINER (Titan Navy/Red?) - User said 'keep color'. Using Titan Navy for block. */}
                    <div className="relative h-28 -mt-4 z-10 hidden md:block w-[400px] drop-shadow-lg">
                        <div className="absolute inset-0 bg-titan-red skew-x-[20deg] origin-bottom-left -ml-10"></div>
                        <div className="absolute inset-0 bg-titan-navy skew-x-[20deg] origin-bottom-left -ml-12 flex items-center justify-center pl-12 pr-6">
                            {/* Logo Content Un-skewed */}
                            <div className="-skew-x-[20deg] flex items-center gap-3">
                                <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
                                <div className="leading-none text-white">
                                    <div className="font-black text-2xl tracking-tighter">KIMMEX</div>
                                    <div className="text-[10px] tracking-widest uppercase text-titan-navy-subtle">Construction</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Logo Fallback */}
                    <div className="md:hidden flex items-center gap-2 px-4">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                        <span className="font-black text-xl text-titan-navy">KIMMEX</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 flex justify-end items-center gap-8 pl-8">
                        <div className="hidden md:flex items-center gap-6 lg:gap-8" onMouseLeave={() => setHoveredNav(null)}>
                            {navItems.map((item, i) => (
                                <div
                                    key={item}
                                    className="relative py-2 cursor-pointer group"
                                    onMouseEnter={() => setHoveredNav(i)}
                                >
                                    <span className={`relative z-10 text-sm font-bold uppercase tracking-wide transition-colors duration-300 flex items-center gap-1 ${hoveredNav === i ? 'text-titan-red' : 'text-titan-navy'}`}>
                                        {item}
                                    </span>
                                    {/* Simple Underline Animation */}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-titan-red transition-all duration-300 ${hoveredNav === i ? 'w-full' : 'w-0'}`}></span>
                                </div>
                            ))}
                        </div>

                        {/* Search Icon */}
                        <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-titan-bg-alt cursor-pointer text-titan-navy-subtle hover:text-titan-red transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[85vh] w-full overflow-hidden bg-titan-navy">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-0"
                    >
                        <div className="absolute inset-0 bg-titan-navy/40 z-10"></div>
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 7 }}
                            src={slides[currentSlide].img}
                            alt="Hero Background"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="border-l-8 border-titan-red pl-8 bg-gradient-to-r from-black/40 to-transparent p-6 rounded-r-xl backdrop-blur-sm max-w-5xl"
                        >
                            <h2 className="text-titan-red font-bold text-xl mb-2 tracking-[0.3em] uppercase drop-shadow-md">{slides[currentSlide].est}</h2>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] drop-shadow-2xl uppercase whitespace-pre-line">
                                {slides[currentSlide].title}
                            </h1>
                            <p className="text-titan-white text-xl max-w-2xl mb-8 font-light drop-shadow-lg leading-relaxed">
                                {slides[currentSlide].subtitle}
                            </p>
                            <div className="flex gap-4">
                                <button
                                    className="bg-titan-red text-titan-navy px-8 py-4 text-lg font-bold rounded shadow-xl hover:bg-white transition-all flex items-center gap-3"
                                >
                                    VIEW PROJECTS <ArrowRight size={24} />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Carousel Dots */}
                <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`transition-all duration-300 rounded-full shadow-lg border border-white/20 ${i === currentSlide ? 'bg-titan-red w-8 h-3' : 'bg-white/50 w-3 h-3 hover:bg-white'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Key Stats Strip */}
            <div className="relative z-30 -mt-20 mx-4 max-w-7xl lg:mx-auto">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-titan-navy text-white py-12 px-8 rounded-lg shadow-2xl border-t-4 border-titan-red"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-titan-navy-light/50">
                        {[
                            { label: 'Years In Operation', val: '25+' },
                            { label: 'Completed Projects', val: '150+' },
                            { label: 'Provinces Covered', val: '25' },
                            { label: 'Clients', val: 'Gov & Private' },
                        ].map((stat, i) => (
                            <div key={i} className="group">
                                <div className="text-4xl md:text-5xl font-black text-titan-red mb-2 group-hover:scale-110 transition-transform">{stat.val}</div>
                                <div className="text-titan-navy-subtle uppercase tracking-widest text-xs md:text-sm font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Why Choose KIM MEX & About Preview */}
            <section className="py-32 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h3 className="text-titan-red font-bold uppercase tracking-widest mb-4">About KIM MEX</h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-titan-navy mb-6 leading-tight">Why Choose Us?</h2>
                    <p className="text-titan-navy-subtle text-lg mb-8 leading-relaxed">
                        Founded in 1999, Kimmex has grown into one of Cambodia's most robust construction and investment firms. We combine technical expertise with a commitment to national development, ensuring every project stands the test of time.
                    </p>

                    <div className="space-y-6">
                        {[
                            { title: 'Experienced Since 1999', desc: 'Over two decades of proven excellence in the construction industry.' },
                            { title: 'Fully Registered & Eligible', desc: 'Authorized to bid on major government and private tenders in Cambodia.' },
                            { title: 'Strong Government Portfolio', desc: 'Trusted by ministries for complex public infrastructure.' },
                            { title: 'Commitment to Quality', desc: 'Uncompromising safety standards and on-time delivery.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="mt-1"><ShieldCheck className="text-titan-red" size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-titan-navy text-lg">{item.title}</h4>
                                    <p className="text-titan-navy-subtle text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-10 text-titan-navy font-bold border-b-2 border-titan-navy pb-2 hover:text-titan-red hover:border-titan-red transition text-lg tracking-wide">
                        READ MORE ABOUT US
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <img
                        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop"
                        className="rounded-lg shadow-2xl relative z-10"
                        alt="Office Building"
                    />
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-titan-red/10 rounded-full blur-2xl z-0"></div>
                </motion.div>
            </section>

            {/* Our Working Process */}
            <section className="bg-titan-navy text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-titan-red/10 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">HOW WE WORK</h2>
                        <div className="w-24 h-1.5 bg-titan-red mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-titan-navy-light/50 z-0"></div>
                        {[
                            { step: '01', title: 'Consultation', desc: 'Understanding your vision and feasibility.' },
                            { step: '02', title: 'Design & Plan', desc: 'Detailed engineering and architectural blueprints.' },
                            { step: '03', title: 'Construction', desc: 'Execution with strict adherence to safety & quality.' },
                            { step: '04', title: 'Handover', desc: 'On-time delivery with post-project support.' }
                        ].map((s, i) => (
                            <div key={i} className="relative z-10 bg-titan-navy-light/50 backdrop-blur-sm p-6 rounded-lg text-center border border-titan-navy-light hover:border-titan-red transition-colors group">
                                <div className="w-16 h-16 bg-titan-navy rounded-full flex items-center justify-center text-xl font-bold text-titan-red mx-auto mb-6 border-4 border-titan-navy-lighter group-hover:bg-titan-red group-hover:text-titan-navy transition-colors">
                                    {s.step}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                                <p className="text-titan-navy-subtle text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Services */}
            <section className="bg-titan-bg-alt py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold text-titan-navy"
                        >CORE SERVICES</motion.h2>
                        <div className="w-24 h-1.5 bg-titan-red mx-auto mt-6 rounded-full"></div>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-6"
                    >
                        {[
                            { title: 'Design & Build', icon: HardHat, desc: 'Unified workflow from concept to completion.' },
                            { title: 'Building Renovation', icon: Building2, desc: 'Restoring and modernizing structures.' },
                            { title: 'Project Management', icon: Scale, desc: 'Ensuring efficiency, budget, and timeline.' },
                            { title: 'Consultants', icon: Trophy, desc: 'Expert advice on feasibility and engineering.' },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-t-4 border-transparent hover:border-titan-red group cursor-pointer"
                            >
                                <div className="bg-titan-bg w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-titan-navy transition-colors">
                                    <s.icon size={32} className="text-titan-navy group-hover:text-titan-red transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors">{s.title}</h3>
                                <p className="text-titan-navy-subtle leading-relaxed text-sm">{s.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-0">
                <div className="grid grid-cols-1 md:grid-cols-4 h-auto md:h-[600px]">
                    <div className="col-span-2 relative group overflow-hidden cursor-pointer h-96 md:h-full">
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-titan-navy/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white p-6 text-center">
                            <h3 className="text-3xl font-bold mb-2">Ministry of Economy & Finance</h3>
                            <p className="text-titan-red uppercase tracking-widest text-sm">Phnom Penh</p>
                            <button className="mt-6 border border-white px-6 py-2 rounded-full hover:bg-white hover:text-titan-navy transition">View Project</button>
                        </div>
                    </div>
                    <div className="col-span-2 relative group overflow-hidden cursor-pointer h-96 md:h-full">
                        <img src="https://images.unsplash.com/photo-1581094794329-cd1096a7a506?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-titan-navy/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white p-6 text-center">
                            <h3 className="text-3xl font-bold mb-2">ADB-Pine Line Project</h3>
                            <p className="text-titan-red uppercase tracking-widest text-sm">Water Treatment Plant</p>
                            <button className="mt-6 border border-white px-6 py-2 rounded-full hover:bg-white hover:text-titan-navy transition">View Project</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest News */}
            <section className="py-32 max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-bold text-titan-navy mb-4">LATEST NEWS</h2>
                        <div className="w-24 h-1.5 bg-titan-red rounded-full"></div>
                    </div>
                    <button className="text-titan-navy font-bold border-b-2 border-titan-navy pb-1 hover:text-titan-red hover:border-titan-red transition">VIEW ALL UPDATES</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Kimmex Awarded New Gov Contract', date: 'Jan 15, 2026', cat: 'Highlights', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop' },
                        { title: 'Safety Protocols Updated ISO 9001', date: 'Dec 20, 2025', cat: 'Corporate', img: 'https://images.unsplash.com/photo-1581092921461-eab62496096b?q=80&w=800&auto=format&fit=crop' },
                        { title: 'Annual Charity Event Success', date: 'Nov 10, 2025', cat: 'CSR', img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop' }
                    ].map((news, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="bg-titan-bg-alt h-64 rounded-lg mb-6 overflow-hidden">
                                <img src={news.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="flex gap-3 text-xs font-bold uppercase tracking-widest text-titan-red mb-2">
                                <span>{news.date}</span>
                                <span>•</span>
                                <span>{news.cat}</span>
                            </div>
                            <h3 className="text-xl font-bold text-titan-navy group-hover:text-titan-red transition-colors">{news.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Clients / Partners */}
            <section className="bg-titan-bg py-20 border-t border-titan-bg-alt">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-titan-navy-subtle uppercase tracking-[0.3em] mb-12">Trusted By Ministries & Institutions</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num} className="w-32 h-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100 hover:scale-110 cursor-pointer">
                                <img
                                    src={`/patner/${num}.png`}
                                    alt={`Partner Logo ${num}`}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-gradient-to-r from-titan-navy to-titan-navy-lighter text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build the Future?</h2>
                    <p className="text-xl text-titan-white mb-10 max-w-2xl mx-auto">From concept to completion, we deliver engineering excellence for the nation's most critical projects.</p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <button className="bg-titan-red text-white px-10 py-4 rounded font-bold text-lg shadow-xl hover:bg-white hover:text-titan-red transition-all transform hover:-translate-y-1">
                            CONTACT US TODAY
                        </button>
                        <button className="border-2 border-white text-white px-10 py-4 rounded font-bold text-lg hover:bg-white hover:text-titan-navy transition-all">
                            VIEW FULL PORTFOLIO
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-titan-navy text-white pt-24 pb-12 border-t border-titan-navy-light">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-white/10 p-2 rounded">
                                <Building2 className="text-titan-red" size={32} />
                            </div>
                            <span className="font-black text-2xl tracking-tight">KIMMEX</span>
                        </div>
                        <p className="text-titan-navy-subtle text-sm leading-loose">
                            <strong className="text-white block mb-2">Headquarters</strong>
                            Level 5, Kim Mex Tower<br />
                            #54 St. 590, Sangkat Boeung Kak II,<br />
                            Khan Toul Kork, Phnom Penh
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-8 text-titan-red uppercase tracking-widest text-sm">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-titan-navy-subtle">
                            {['Our Projects', 'News & Updates', 'Careers', 'Contact Us'].map(l => (
                                <li key={l}><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="border-t border-titan-navy-light pt-8 text-center text-titan-navy-subtle text-xs">
                    © 2026 Kimmex Construction & Investment Co., Ltd. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
