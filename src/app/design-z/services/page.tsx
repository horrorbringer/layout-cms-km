'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
    Building, Ruler, Users, Truck, ArrowRight, CheckCircle2,
    DraftingCompass, HardHat, Hammer, ChevronRight, Briefcase,
    LayoutTemplate, PenTool, Lightbulb, GraduationCap, Landmark,
    Settings, ShieldCheck, Clock, Zap
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage, getLocalizedText } from '../context/LanguageContext';
import { serviceData } from '../data/serviceData';

// Animation wrapper
function FadeInWhenVisible({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function ServicesPage() {
    const heroRef = useRef(null);
    const { language, t } = useLanguage();
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const { services, process, sectors } = serviceData;

    // Icon lookups (icons are React components and cannot be stored in JSON data)
    const processIcons = [Users, LayoutTemplate, HardHat, Settings, CheckCircle2];
    const sectorIcons = [Landmark, GraduationCap, Building, Truck, Zap, Settings];

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">

            {/* === HERO SECTION === */}
            <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-titan-navy">
                {/* Parallax & Zoom Background */}
                <motion.div
                    style={{ y: heroY, scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/images/projects/Thumbnail-1.jpg"
                        alt="Kimmex Services"
                        width={1920}
                        height={1200}
                        className="w-full h-[120%] object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/60 via-titan-navy/30 to-titan-navy"></div>
                </motion.div>

                {/* Decorative Floating Elements */}
                <div className="absolute top-1/4 left-10 w-20 h-20 border border-white/10 rounded-full animate-pulse hidden lg:block"></div>
                <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-titan-red/20 rounded-full hidden lg:block"></div>

                {/* Hero Content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 text-center max-w-5xl px-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest mb-8 border border-white/20 shadow-lg"
                    >
                        <Settings size={14} className="text-titan-red" />
                        <span>{t('Services')}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-5xl md:text-9xl font-black text-white mb-8 leading-[0.8] tracking-tighter"
                    >
                        {language === 'kh' ? 'ជំនាញ' : 'OUR'} <span className="text-titan-red">{language === 'kh' ? 'របស់យើង' : 'EXPERTISE'}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-bold uppercase tracking-widest"
                    >
                        {t('Precision. Innovation. Excellence.')}
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-3 cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">{language === 'kh' ? 'ស្វែងយល់សេវាកម្ម' : 'Explore Services'}</span>
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2 backdrop-blur-sm bg-white/5">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1.5 h-1.5 bg-titan-red rounded-full shadow-[0_0_10px_rgba(255,107,0,0.8)]"
                        />
                    </div>
                </motion.div>
            </section>

            {/* === SERVICE CATEGORIES === */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <FadeInWhenVisible>
                    <div className="text-center mb-20">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'អ្វីដែលយើងធ្វើ' : 'What We Do'}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">{language === 'kh' ? 'សមត្ថភាព និងជំនាញ' : 'Capabilities & Expertise'}</h2>
                        <p className="text-titan-navy/50 text-lg max-w-2xl mx-auto">
                            {language === 'kh' ? 'យើងមានបទពិសោធន៍ជាច្រើនទសវត្សរ៍សម្រាប់គម្រោងនីមួយៗ ដោយធានាបាននូវគុណភាព និងប្រសិទ្ធភាពនៅគ្រប់ជំហាន។' : 'We bring decades of experience to every project, ensuring quality and efficiency at every stage.'}
                        </p>
                    </div>
                </FadeInWhenVisible>

                <div className="space-y-12">
                    {services.map((service, i) => (
                        <FadeInWhenVisible key={service.id} delay={i * 0.1}>
                            <Link href={`/design-z/services/${service.id}`} className="group block">
                                <div className={`flex flex-col lg:flex-row gap-0 rounded-none overflow-hidden shadow-2xl transition-all duration-500 bg-white border-b-4 border-titan-navy hover:border-titan-red`}>

                                    {/* Image Side */}
                                    <div className={`lg:w-2/5 relative overflow-hidden h-72 lg:h-auto ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
                                        <Image
                                            src={service.image}
                                            alt={getLocalizedText(service.title, language)}
                                            fill
                                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>

                                    {/* Content Side */}
                                    <div className="lg:w-3/5 p-8 md:p-16 flex flex-col justify-center relative">
                                        <div className="absolute top-0 right-0 p-8 hidden md:block">
                                            <span className="text-6xl font-black text-titan-navy/5">0{i + 1}</span>
                                        </div>

                                        <div className="w-16 h-2 bg-titan-red mb-8"></div>

                                        <h3 className="text-4xl font-black text-titan-navy mb-6 uppercase tracking-tight">{getLocalizedText(service.title, language)}</h3>
                                        <p className="text-titan-navy/60 text-xl leading-relaxed mb-10">
                                            {getLocalizedText(service.desc, language)}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                                            {service.features.map((feature: any, idx) => (
                                                <div key={idx} className="flex items-center gap-4 text-titan-navy/80 font-bold text-sm uppercase tracking-widest">
                                                    <div className="w-2 h-2 bg-titan-red rounded-full"></div>
                                                    {getLocalizedText(feature, language)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeInWhenVisible>
                    ))}
                </div>
            </section>

            {/* === WORKING PROCESS === */}
            <section className="py-24 bg-titan-navy text-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-titan-red/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <FadeInWhenVisible>
                        <div className="text-center mb-24">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'ដំណើរការការងារ' : 'How It Works'}</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">{language === 'kh' ? 'វិធីសាស្រ្តអនុវត្តន៍' : 'Our Methodology'}</h2>
                            <p className="text-white/60 text-lg max-w-2xl mx-auto">
                                {language === 'kh' ? 'វិធីសាស្រ្តដែលមានការៀបចំជាប្រព័ន្ធធានាបាននូវតម្លាភាព សុវត្ថិភាព និងភាពល្អឥតខ្ចោះ។' : 'A systematic approach ensuring transparency, safety, and excellence from the first meeting to final handover.'}
                            </p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-titan-red/50 to-transparent z-0">
                            {/* Animated Pulse on Line */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 w-1/4 h-full"
                                animate={{ left: ['-25%', '100%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
                            {process.map((s, i) => (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <div className="flex flex-col items-center text-center group">
                                        <div className="relative mb-12">
                                            {/* Large Background Ghost Number (ជាន់គ្នា Style) */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-9xl font-black text-white/[0.04] group-hover:text-titan-red/[0.08] transition-all duration-700 pointer-events-none z-0 tracking-tighter">
                                                {s.step}
                                            </div>

                                            {/* Decorative Light Ring */}
                                            <div className="absolute -inset-8 bg-titan-red/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-100 border border-white/5 blur-2xl"></div>

                                            {/* Rotating Architectural Square */}
                                            <div className="w-24 h-24 bg-[#0F172A]/90 backdrop-blur-2xl border-[1px] border-white/10 rounded-2xl flex items-center justify-center relative z-10 group-hover:border-titan-red transition-all duration-700 rotate-45 group-hover:rotate-[225deg] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
                                                <div className="-rotate-45 group-hover:-rotate-[225deg] transition-all duration-700 flex flex-col items-center">
                                                    {React.createElement(processIcons[i] || Settings, { size: 32, className: 'text-white group-hover:text-titan-red transition-colors' })}
                                                </div>
                                            </div>

                                            {/* Floating Mini Step Indicator */}
                                            <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-titan-red rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(255,107,0,0.3)] border-[3px] border-[#0F172A] z-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                                                <span className="text-[11px] font-black text-white tracking-tight">{s.step}</span>
                                            </div>
                                        </div>

                                        <div className="px-4">
                                            <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight group-hover:text-titan-red transition-colors">
                                                {getLocalizedText(s.title, language)}
                                            </h3>
                                            <p className="text-xs text-white/40 leading-relaxed max-w-[200px] mx-auto group-hover:text-white/60 transition-colors">
                                                {getLocalizedText(s.desc, language)}
                                            </p>
                                        </div>
                                    </div>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* === WHY CHOOSE US (New Section) === */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInWhenVisible>
                            <div>
                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'អត្ថប្រយោជន៍របស់ Kimmex' : 'The Kimmex Advantage'}</span>
                                <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">{language === 'kh' ? 'ហេតុអ្វីអ្នកគួរធ្វើជាដៃគូរបស់យើង?' : 'Why Partner With Us?'}</h2>
                                <p className="text-titan-navy/60 text-lg leading-relaxed mb-8">
                                    {language === 'kh' ? 'យើងផ្តល់ជូនលើសពីអគារ; យើងផ្តល់ជូនទាំងទំនុកចិត្ត។ វិធីសាស្ត្ររួមបញ្ចូលបច្ចេកវិទ្យារបស់យើងធានាថាគម្រោងរបស់អ្នកនឹងត្រូវបានដោះស្រាយដោយយកចិត្តទុកដាក់ និងប្រកបដោយវិជ្ជាជីវៈ។' : 'We deliver more than just buildings; we deliver peace of mind. Our integrated approach ensures your project is handled with the utmost care and professionalism.'}
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { icon: ShieldCheck, title: { en: 'Uncompromising Safety', kh: 'សុវត្ថិភាពជាចម្បង' }, desc: { en: 'Zero-tolerance policy ensuring the safety of all stakeholders.', kh: 'គោលការណ៍តឹងរ៉ឹងបំផុតដើម្បីធានាសុវត្ថិភាពសម្រាប់ភាគីពាក់ព័ន្ធទាំងអស់។' } },
                                        { icon: Clock, title: { en: 'On-Time Delivery', kh: 'ការប្រគល់ជូនទាន់ពេលវេលា' }, desc: { en: 'Rigorous scheduling and project management to meet deadlines.', kh: 'ការរៀបចំកាលវិភាគ និងគ្រប់គ្រងគម្រោងយ៉ាងម៉ត់ចត់ដើម្បីឆ្លើយតបពេលវេលាកំណត់។' } },
                                        { icon: Zap, title: { en: 'Innovative Solutions', kh: 'ដំណោះស្រាយច្នៃប្រឌិត' }, desc: { en: 'Using modern technologies to solve complex engineering challenges.', kh: 'ប្រើប្រាស់បច្ចេកវិទ្យាទំនើបដើម្បីដោះស្រាយបញ្ហាវិស្វកម្មស្មុគស្មាញ។' } },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-5">
                                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-titan-red shrink-0 shadow-sm border border-gray-100">
                                                <item.icon size={26} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-titan-navy mb-1">{getLocalizedText(item.title, language)}</h3>
                                                <p className="text-titan-navy/50">{getLocalizedText(item.desc, language)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2}>
                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative h-64 w-full rounded-2xl shadow-lg overflow-hidden translate-y-8">
                                        <Image
                                            src="/images/projects/Thumbnail-3.jpg"
                                            alt="Blueprint"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl shadow-lg overflow-hidden">
                                        <Image
                                            src="/images/projects/Thumbnail-5.jpg"
                                            alt="Meeting"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                {/* Center Badge */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-titan-navy text-white p-4 md:p-6 rounded-full shadow-2xl border-4 border-white">
                                    <CheckCircle2 size={32} className="md:w-12 md:h-12 text-titan-red" />
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>
            </section>

            {/* === SECTORS WE SERVE === */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <FadeInWhenVisible>
                    <div className="text-center mb-16">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'វិស័យ' : 'Industries'}</span>
                        <h2 className="text-4xl font-black text-titan-navy">{language === 'kh' ? 'វិស័យដែលយើងបម្រើ' : 'Sectors We Serve'}</h2>
                    </div>
                </FadeInWhenVisible>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sectors.map((sector, i) => (
                        <FadeInWhenVisible key={i} delay={i * 0.1}>
                            <div className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer">
                                {/* Bg Image */}
                                <Image
                                    src={sector.image}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    alt={getLocalizedText(sector.title, language)}
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="w-12 h-12 bg-titan-red rounded-lg flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {React.createElement(sectorIcons[i] || Building, { size: 24 })}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{getLocalizedText(sector.title, language)}</h3>
                                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                                        <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {language === 'kh' ? `ផ្តល់ដំណោះស្រាយលំដាប់ពិភពលោកសម្រាប់ហេដ្ឋារចនាសម្ព័ន្ធ${getLocalizedText(sector.title, 'kh')}។` : `Providing world-class solutions for ${getLocalizedText(sector.title, 'en').toLowerCase()} infrastructure.`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    ))}
                </div>
            </section>

            {/* === CTA SECTION === */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <FadeInWhenVisible>
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-8">{language === 'kh' ? 'តើអ្នកមានគម្រោងចង់ស្នើសុំមែនទេ?' : 'Have a project in mind?'}</h2>
                        <p className="text-xl text-titan-navy/60 mb-12 max-w-2xl mx-auto">
                            {language === 'kh' ? 'សូមទំនាក់ទំនងមកយើងដើម្បីពិភាក្សាអំពីគម្រោងរបស់អ្នក យើងនឹងជួយអ្នកឱ្យក្លាយជាការពិត។' : 'Let\'s discuss how we can bring your vision to life with our expert engineering and construction services.'}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/design-z/contact" className="bg-titan-red text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-titan-navy transition-all rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-titan-red/20">
                                {language === 'kh' ? 'ទទួលការប្រឹក្សាឥតគិតថ្លៃ' : 'Get a Free Quote'} <ArrowRight size={18} />
                            </Link>
                            <Link href="/design-z/projects" className="bg-titan-bg-alt text-titan-navy px-10 py-5 font-bold uppercase tracking-widest hover:bg-titan-navy hover:text-white transition-all rounded-lg border border-gray-200">
                                {language === 'kh' ? 'មើលស្នាដៃរបស់យើង' : 'View Our Work'}
                            </Link>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>
        </div>
    );
}
