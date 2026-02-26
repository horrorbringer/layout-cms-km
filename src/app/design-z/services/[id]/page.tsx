'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
    Building, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Ruler, Users,
    DraftingCompass, PenTool, Hammer, Lightbulb, Briefcase,
    Clock, ShieldCheck, TrendingUp, Star, MapPin, Search, LayoutTemplate, HardHat, Settings, Zap, Target
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useLanguage, getLocalizedText, LocalizedString } from '../../context/LanguageContext';
import { serviceDetails } from '../../data/serviceDetailData';

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

// Data is now imported from serviceDetailData.ts

export default function ServiceDetailPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id || 'design-build';
    const detailId = id === 'construction' ? 'construction' : id; // Keep consistency
    const service = serviceDetails[detailId] || serviceDetails['design-build'];

    // Icon Mapping (since icons are components and not in the JSON)
    const iconMap: Record<string, any> = {
        'design-build': PenTool,
        'construction': Hammer,
        'project-management': Briefcase
    };
    const Icon = iconMap[detailId] || Building;

    // Process Icons mapping
    const processIconMap: Record<string, any> = {
        'Search': Search,
        'PenTool': PenTool,
        'Hammer': Hammer,
        'CheckCircle2': CheckCircle2,
        'Target': Target,
        'LayoutTemplate': LayoutTemplate,
        'HardHat': HardHat,
        'Users': Users
    };

    // Benefit Icons mapping
    const benefitIconMap: Record<string, any> = {
        'Users': Users,
        'Clock': Clock,
        'TrendingUp': TrendingUp,
        'ShieldCheck': ShieldCheck,
        'Star': Star,
        'Lightbulb': Lightbulb
    };

    // We can also have fixed indices for icons if preferred, but let's try mapping by common logic or position
    const getProcessIcon = (index: number, svcId: string) => {
        if (svcId === 'design-build') return [Search, PenTool, Hammer, CheckCircle2][index] || Settings;
        if (svcId === 'construction') return [Target, LayoutTemplate, HardHat, CheckCircle2][index] || Settings;
        if (svcId === 'project-management') return [Users, LayoutTemplate, HardHat, CheckCircle2][index] || Settings;
        return Settings;
    };

    const getBenefitIcon = (index: number, svcId: string) => {
        if (svcId === 'design-build') return [Users, Clock, TrendingUp, ShieldCheck][index] || Star;
        if (svcId === 'construction') return [ShieldCheck, Star, ShieldCheck, TrendingUp][index] || Star;
        if (svcId === 'project-management') return [Lightbulb, TrendingUp, Clock, ShieldCheck][index] || Star;
        return Star;
    };

    const { language, t } = useLanguage();

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">

            {/* === 1. PARALLAX HERO === */}
            <section ref={heroRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-titan-navy">
                <motion.div style={{ y: heroY, scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 10, ease: "easeOut" }} className="absolute inset-0">
                    <Image src={service.heroImage} alt={getLocalizedText(service.title, language)} width={1920} height={1200} className="w-full h-[120%] object-cover opacity-50 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/80 via-titan-navy/40 to-titan-navy"></div>
                </motion.div>

                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center max-w-5xl px-6 pt-20 mt-10">
                    <Link href="/design-z/services" className="inline-flex items-center gap-2 text-white/60 hover:text-titan-red transition-all font-bold uppercase tracking-widest text-xs mb-8 group">
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-titan-red group-hover:bg-titan-red group-hover:text-white transition-all">
                            <ArrowLeft size={12} />
                        </div>
                        {t('Back')}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10 shadow-2xl"
                    >
                        <Icon size={48} className="text-white drop-shadow-lg" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tighter"
                    >
                        {getLocalizedText(service.title, language)}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        {getLocalizedText(service.subtitle, language)}
                    </motion.p>
                </motion.div>
            </section>

            {/* === 2. SERVICE OVERVIEW === */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <FadeInWhenVisible>
                        <div className="mb-12">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{t('Overview')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">{language === 'kh' ? 'ការកំណត់ឡើងវិញនូវ' : 'Redefining'} {getLocalizedText(service.title, language)}</h2>
                            <p className="text-lg md:text-xl text-titan-navy/60 leading-relaxed mb-10">
                                {getLocalizedText(service.description, language)}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-titan-red shadow-sm">
                            <h3 className="text-xl font-bold text-titan-navy mb-3 flex items-center gap-3">
                                <div className="p-2 bg-titan-red/10 rounded-lg">
                                    <Users size={20} className="text-titan-red" />
                                </div>
                                {language === 'kh' ? 'ស័ក្តិសមសម្រាប់' : 'Ideal For'}
                            </h3>
                            <p className="text-titan-navy/70 leading-relaxed">
                                {getLocalizedText(service.targetAudience, language)}
                            </p>
                        </div>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={0.2}>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-titan-red/5 rounded-[2rem] rotate-2 group-hover:rotate-1 transition-transform duration-500"></div>
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                                <Image src={service.heroImage} alt="Service Overview" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-titan-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* === 3. SCOPE OF WORK === */}
            <section className="py-24 bg-titan-navy text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-titan-red/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <FadeInWhenVisible>
                        <div className="text-center mb-16">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'វិសាលភាពការងារ' : 'Scope of Work'}</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">{language === 'kh' ? 'សេវាកម្មដ៏ទូលំទូលាយ' : 'Comprehensive Coverage'}</h2>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.scopeOfWork.map((item, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="group flex items-start gap-5 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-titan-red/30 transition-all duration-300 h-full">
                                    <div className="w-10 h-10 rounded-full bg-titan-red/20 flex items-center justify-center shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                        <CheckCircle2 className="text-titan-red group-hover:text-white" size={20} />
                                    </div>
                                    <span className="font-bold text-lg leading-tight pt-2 group-hover:text-titan-red transition-colors">{getLocalizedText(item, language)}</span>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === 4. PROCESS / HOW WE DELIVER === */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-[1400px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'ដំណើរការរបស់យើង' : 'Our Process'}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">{language === 'kh' ? 'មាគ៌ាឆ្ពោះទៅរកភាពជោគជ័យ' : 'The Path to Success'}</h2>
                            <p className="text-titan-navy/60 text-xl">{language === 'kh' ? 'វិធីសាស្រ្តដែលមានរចនាសម្ព័ន្ធ និងតម្លាភាពដើម្បីធានាភាពជោគជ័យនៃគម្រោងរបស់អ្នក។' : 'A transparent, structured approach to ensure your project\'s success.'}</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-titan-red/50 to-transparent z-0">
                            {/* Animated Pulse on Line */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-titan-red to-transparent opacity-40 w-1/4 h-full"
                                animate={{ left: ['-25%', '100%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                            {service.process.map((step, i) => (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <div className="flex flex-col items-center text-center group">
                                        {/* Step Circle Container */}
                                        <div className="relative mb-12">
                                            {/* Large Background Ghost Number */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-9xl font-black text-titan-navy/[0.03] group-hover:text-titan-red/[0.06] transition-all duration-700 pointer-events-none z-0 tracking-tighter">
                                                {step.step}
                                            </div>

                                            {/* Decorative Light Ring */}
                                            <div className="absolute -inset-8 bg-titan-red/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-100 border border-titan-navy/5 blur-2xl"></div>

                                            {/* Rotating Architectural Square */}
                                            <div className="w-28 h-28 bg-[#0B1221] border-[1px] border-white/5 rounded-2xl flex items-center justify-center relative z-10 group-hover:border-titan-red transition-all duration-700 rotate-45 group-hover:rotate-[225deg] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.2)]">
                                                <div className="-rotate-45 group-hover:-rotate-[225deg] transition-all duration-500 flex flex-col items-center">
                                                    {React.createElement(getProcessIcon(i, detailId), { size: 36, className: 'text-white group-hover:text-titan-red transition-colors' })}
                                                </div>
                                            </div>

                                            {/* Floating Mini Step Indicator */}
                                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-titan-red rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(255,107,0,0.2)] border-[3px] border-gray-50 z-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                                                <span className="text-[12px] font-black text-white tracking-tight">{step.step}</span>
                                            </div>
                                        </div>

                                        <div className="px-4">
                                            <h3 className="text-xl font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors">
                                                {getLocalizedText(step.title, language)}
                                            </h3>
                                            <p className="text-sm text-titan-navy/50 leading-relaxed max-w-[240px] mx-auto group-hover:text-titan-navy/80 transition-colors">
                                                {getLocalizedText(step.desc, language)}
                                            </p>
                                        </div>
                                    </div>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* === 5. KEY BENEFITS === */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <FadeInWhenVisible>
                    <div className="text-center mb-16">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'ហេតុអ្វីជ្រើសរើសយើង' : 'Why Choose Us'}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy">{language === 'kh' ? 'គុណតម្លៃដែលផ្តល់ជូន' : 'Value Delivered'}</h2>
                    </div>
                </FadeInWhenVisible>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {service.benefits.map((benefit, i) => (
                        <FadeInWhenVisible key={i} delay={i * 0.1}>
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group h-full">
                                <div className="w-16 h-16 bg-titan-navy/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                    {React.createElement(getBenefitIcon(i, detailId), { size: 30, className: 'text-titan-navy group-hover:text-white transition-colors' })}
                                </div>
                                <h3 className="text-xl font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors">{getLocalizedText(benefit.title, language)}</h3>
                                <p className="text-titan-navy/60 leading-relaxed">
                                    {getLocalizedText(benefit.desc, language)}
                                </p>
                            </div>
                        </FadeInWhenVisible>
                    ))}
                </div>
            </section>

            {/* === 6. FEATURED PROJECTS === */}
            {service.relatedProjects.length > 0 && (
                <section className="py-24 bg-titan-navy text-white px-6">
                    <div className="max-w-[1400px] mx-auto">
                        <FadeInWhenVisible>
                            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                                <div>
                                    <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'ស្នាដៃ' : 'Portfolio'}</span>
                                    <h2 className="text-4xl md:text-5xl font-black">{t('Featured Projects')}</h2>
                                </div>
                                <Link href="/design-z/projects" className="mt-8 md:mt-0 px-8 py-3 bg-white/10 hover:bg-white hover:text-titan-navy transition-all font-bold uppercase tracking-widest text-sm flex items-center gap-2 rounded-lg backdrop-blur-sm">
                                    {language === 'kh' ? 'មើលគម្រោងទាំងអស់' : 'View All Projects'} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </FadeInWhenVisible>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {service.relatedProjects.map((project, i) => (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <Link href={`/design-z/projects/${project.id}`} className="group relative aspect-[16/9] overflow-hidden rounded-2xl cursor-pointer block shadow-2xl">
                                        <Image src={project.image} alt={getLocalizedText(project.title, language)} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                                        <div className="absolute bottom-0 left-0 p-8 w-full">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <span className="inline-block bg-titan-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">{getLocalizedText(project.category, language)}</span>
                                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{getLocalizedText(project.title, language)}</h3>
                                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                                    <MapPin size={16} className="text-titan-red" /> {getLocalizedText(project.location, language)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                            <ArrowRight size={20} className="text-white" />
                                        </div>
                                    </Link>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* === FOOTER CTA === */}
            <section className="py-24 bg-white text-center px-6">
                <div className="max-w-3xl mx-auto bg-titan-red rounded-3xl p-12 md:p-16 shadow-2xl shadow-titan-red/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[50px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                    <FadeInWhenVisible>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{language === 'kh' ? 'រួចរាល់សម្រាប់ការចាប់ផ្តើម?' : 'Ready to start?'}</h2>
                        <p className="text-white/90 text-xl mb-10 font-medium">
                            {language === 'kh' ? 'ទាក់ទងក្រុមការងារជំនាញរបស់យើងថ្ងៃនេះ សម្រាប់ការពិគ្រោះយោបល់ និងការសិក្សាសមិទ្ធភាពដោយឥតគិតថ្លៃ។' : 'Contact our expert team today for a free consultation and feasibility study.'}
                        </p>
                        <Link href="/design-z/contact" className="inline-flex items-center gap-2 bg-white text-titan-red px-10 py-5 font-bold uppercase tracking-widest hover:bg-titan-navy hover:text-white transition-all shadow-xl rounded-lg">
                            {language === 'kh' ? 'ស្នើសុំការប្រឹក្សា' : 'Request Quote'} <ArrowRight size={18} />
                        </Link>
                    </FadeInWhenVisible>
                </div>
            </section>
        </div>
    );
}
