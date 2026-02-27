'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Target, Eye, Flag, Shield, Award, Users, TrendingUp, Heart, Lightbulb, Handshake, Clock, CheckCircle2, Building2, HardHat, Quote, X, Mail, Linkedin, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

// Animation wrapper component
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

// Counter animation component
function AnimatedCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const stepValue = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += stepValue;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-5xl md:text-6xl font-black text-white mb-2">
                {count}{suffix}
            </div>
            <div className="text-sm uppercase tracking-widest text-white/60 font-bold">{label}</div>
        </div>
    );
}

// Modal Component for Member Details
function MemberDetailModal({ member, isOpen, onClose }: { member: any; isOpen: boolean; onClose: () => void }) {
    const { t } = useLanguage();
    if (!isOpen || !member) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-titan-navy/95 backdrop-blur-md"
                onClick={onClose}
            ></motion.div>

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-white rounded-[2rem] overflow-hidden max-w-4xl w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row max-h-[90vh] md:min-h-[500px] overflow-y-auto md:overflow-visible"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-xl text-titan-navy hover:bg-titan-red hover:text-white rounded-full transition-all duration-300 flex items-center justify-center group"
                >
                    <X size={20} className="transition-transform group-hover:rotate-90" />
                </button>

                {/* Left: Image Side */}
                <div className="w-full md:w-1/2 relative h-[300px] sm:h-[400px] md:h-auto shrink-0 overflow-hidden">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/60 via-transparent to-transparent"></div>

                    {/* Floating Info on Image */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                            <Shield size={10} className="text-titan-red animate-pulse" />
                            {t('Verified Leadership')}
                        </div>
                    </div>
                </div>

                {/* Right: Info Side */}
                <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col relative bg-white">
                    {/* Background Decorative Text */}
                    <div className="absolute top-10 right-10 text-[80px] md:text-[120px] font-black text-gray-50 -z-10 select-none leading-none opacity-50 md:opacity-100">
                        KM
                    </div>

                    <div className="mb-8 md:mb-12 relative">
                        <span className="text-titan-red font-black uppercase tracking-[0.3em] text-[10px] block mb-3">{t(member.role)}</span>
                        <h3 className="text-3xl md:text-5xl font-black text-titan-navy uppercase leading-[1.1] tracking-tighter">
                            {t(member.name)}
                        </h3>
                        <div className="w-16 md:w-20 h-1.5 bg-titan-red mt-6 rounded-full"></div>
                    </div>

                    <div className="flex-grow">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-titan-navy/30 mb-4 italic">{t('Executive Biography')}</h4>
                        <div className="space-y-4 md:space-y-6 text-titan-navy/80 leading-relaxed font-medium">
                            {member.bio ? (
                                <p className="text-base md:text-lg leading-relaxed">{t(member.bio)}</p>
                            ) : (
                                <>
                                    <p className="text-base md:text-lg leading-relaxed">
                                        KIM MEX Construction, {t(member.name).split('.').pop()?.trim()} brings specialized expertise and a results-driven approach to the {t(member.role).toLowerCase()} division.
                                    </p>
                                    <p className="text-sm md:text-base">
                                        Focused on operational efficiency and upholding our core values of excellence and safety, they play a vital role in delivering landmark projects across the Kingdom.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-10 md:mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3 self-start sm:self-auto">
                            <div className="w-10 h-10 rounded-full bg-titan-navy/5 flex items-center justify-center text-titan-navy">
                                <Users size={18} />
                            </div>
                            <div className="text-[10px] md:text-[11px] leading-tight">
                                <div className="font-bold text-titan-navy uppercase">{t('Directorate')}</div>
                                <div className="text-titan-navy/40 font-bold uppercase">{t('KIMMEX GROUP')}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Link
                                href={`/design-x/team/${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}
                                className="w-full sm:w-auto px-10 py-3.5 bg-titan-navy text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-titan-red transition-all text-center shadow-lg shadow-titan-navy/10 active:scale-95"
                            >
                                {t('Full Biography')}
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Team Member Card Component
function TeamMemberCard({ member, isCEO = false, onClick }: { member: any; isCEO?: boolean; onClick?: (member: any) => void }) {
    const { t } = useLanguage();
    return (
        <div
            className="flex flex-col items-center group relative z-10 w-full cursor-pointer"
            onClick={() => onClick && onClick(member)}
        >
            <div className={`relative rounded-xl overflow-hidden bg-white shadow-md border-2 border-white transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2
                ${isCEO ? 'w-56 h-56 mb-8' : 'w-36 h-36 lg:w-48 lg:h-48 mb-5'}
            `}>
                <Image
                    src={member.image}
                    alt={t(member.name)}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-titan-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                        <ArrowRight size={20} />
                    </div>
                </div>
            </div>
            <div className="text-center px-2">
                <h3 className={`font-bold text-titan-navy uppercase tracking-tight transition-colors duration-300 group-hover:text-titan-red ${isCEO ? 'text-2xl mb-1' : 'text-sm lg:text-base mb-1'}`}>
                    {t(member.name)}
                </h3>
                <p className={`text-accent-orange font-bold uppercase tracking-[0.1em] ${isCEO ? 'text-sm' : 'text-[10px] lg:text-[11px]'}`}>
                    {t(member.role)}
                </p>
            </div>
        </div>
    );
}

// Team Member Row Card (Mobile View - Horizontal / Vertical Tree)
function TeamMemberRowCard({ member, onClick }: { member: any; onClick?: (member: any) => void }) {
    const { t } = useLanguage();
    return (
        <div
            className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group w-full"
            onClick={() => onClick && onClick(member)}
        >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 border-gray-50">
                <Image
                    src={member.image}
                    alt={t(member.name)}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                />
            </div>
            <div className="flex-grow">
                <h4 className="text-[13px] font-bold text-titan-navy uppercase tracking-tight leading-tight group-hover:text-titan-red transition-colors">{t(member.name)}</h4>
                <p className="text-[9px] text-accent-orange font-bold uppercase tracking-wider mt-1">{t(member.role)}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-titan-red/10 group-hover:text-titan-red transition-all">
                <ArrowRight size={14} />
            </div>
        </div>
    );
}

// Language context hook (placeholder for export found in layout, assuming direct import or use)

export default function AboutPage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const [selectedMember, setSelectedMember] = React.useState<any>(null);
    const [activeMissionIndex, setActiveMissionIndex] = React.useState<number | null>(null);

    const handleMemberClick = (member: any) => {
        setSelectedMember(member);
    };

    const { t, language, fontClassName } = useLanguage();

    const coreValues = [
        { icon: Shield, title: t('Integrity'), desc: t('We uphold the highest ethical standards in every project and relationship.') },
        { icon: Award, title: t('Excellence'), desc: t('We strive for perfection in every beam, brick, and blueprint we deliver.') },
        { icon: Handshake, title: t('Partnership'), desc: t('We build lasting relationships with clients, partners, and communities.') },
        { icon: Lightbulb, title: t('Innovation'), desc: t('We embrace new technologies and methods to deliver better solutions.') },
        { icon: Heart, title: t('Safety First'), desc: t('We prioritize the wellbeing of our team and everyone on our sites.') },
        { icon: TrendingUp, title: t('Growth'), desc: t('We continuously improve and invest in our people and capabilities.') },
    ];

    const milestones = [
        {
            year: '1999',
            title: t('Foundation'),
            desc: t('KIM MEX Construction was established with a vision to redefine Cambodia\'s skyline. Starting with a humble team of 10 engineers, we laid the first stone of our legacy.'),
            image: '/images/projects/Thumbnail-1.jpg'
        },
        {
            year: '2005',
            title: t('First Major Project'),
            desc: t('Completed our first government infrastructure project, establishing our reputation for quality and reliability in the public sector.'),
            image: '/images/projects/Thumbnail-2.jpg'
        },
        {
            year: '2012',
            title: t('Major Expansion'),
            desc: t('Following successful commercial projects in Phnom Penh, we expanded operations to Siem Reap and Sihanoukville, securing contracts for major hotel resorts.'),
            image: '/images/projects/Thumbnail-3.jpg'
        },
        {
            year: '2018',
            title: t('ISO Certification'),
            desc: t('Our commitment to excellence was recognized with ISO 9001:2015 accreditation, validating our rigorous Quality Management Systems and safety protocols.'),
            image: '/images/projects/Thumbnail-5.jpg'
        },
        {
            year: '2023',
            title: t('National Recognition'),
            desc: t('Awarded "Top Infrastructure Partner" by the Ministry of Public Works for our contribution to national road development projects.'),
            image: '/images/projects/Thumbnail-8.jpg'
        }
    ];

    const ceo = {
        name: 'Okhna. TOUCH KIM',
        role: 'Chief Executive Officer',
        image: '/images/team-leadership-professional/touch_kim.jpg',
        bio: 'CEO Quote Desc'
    };

    const managersL2 = [
        {
            name: 'Mr. PAUCH BUNPHEAKDEY',
            role: 'Deputy General Manager',
            image: '/images/team-leadership-professional/pauch_bunpheakdey.jpg',
            bio: 'Deputy General Manager Bio'
        },
        {
            name: 'Mr. LENG VANNARITH',
            role: 'Finance Director',
            image: '/images/team-leadership-professional/leng_vannarith.jpg',
            bio: 'Finance Director Bio'
        },
        {
            name: 'Mr. OUNG CHAKNORA',
            role: 'Senior Project Manager',
            image: '/images/team-leadership-professional/oung_chaknora.jpg',
            bio: 'Senior Project Manager Bio'
        },
        {
            name: 'Mr. SUM ROTANA',
            role: 'Project Manager',
            image: '/images/team-leadership-professional/sum_rotana.jpg',
            bio: 'Project Manager Bio'
        },
        {
            name: 'Mr. KRAI KEAK',
            role: 'MEP Operation Manager',
            image: '/images/team-leadership-professional/krai_keak.jpg',
            bio: 'MEP Operation Manager Bio'
        },
    ];

    const managersL3 = [
        {
            name: 'Mr. CHHUNDY RYTA',
            role: 'Deputy Architect Manager',
            image: '/images/team-leadership-professional/chhundy_ryta.jpg',
            bio: 'Deputy Architect Manager Bio'
        },
        {
            name: 'Mr. TOUCH PUTHEANY',
            role: 'MEP Design Manager',
            image: '/images/team-leadership-professional/touch_putheany.jpg',
            bio: 'MEP Design Manager Bio'
        },
        {
            name: 'Mr. RY KEN',
            role: 'Deputy QS Manager',
            image: '/images/team-leadership-professional/ry_ken.jpg',
            bio: 'Deputy QS Manager Bio'
        },
        {
            name: 'Mr. HONG BUNNA',
            role: 'Warehouse Manager',
            image: '/images/team-leadership-professional/hong_bunna.jpg',
            bio: 'Warehouse Manager Bio'
        },
    ];

    return (
        <div className={`bg-white min-h-screen text-titan-navy ${fontClassName}`}>

            {/* === HERO SECTION === */}
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-titan-navy">
                {/* Parallax Background */}
                <motion.div style={{ y: heroY }} className="absolute inset-0">
                    <Image
                        src="/images/projects/Thumbnail-6.jpg"
                        alt={t('Construction Site')}
                        width={1920}
                        height={1200}
                        className="w-full h-[120%] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/80 via-titan-navy/70 to-titan-navy"></div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-20 w-72 h-72 border border-titan-red/20 rounded-full hidden lg:block"></div>
                <div className="absolute bottom-40 left-20 w-48 h-48 border border-white/10 rounded-full hidden lg:block"></div>

                {/* Hero Content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 text-center px-6 max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <div className="w-12 h-[2px] bg-titan-red"></div>
                        <span className="text-titan-red font-bold uppercase tracking-[0.2em] text-sm">{t('Est. 1999')}</span>
                        <div className="w-12 h-[2px] bg-titan-red"></div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[0.95]"
                    >
                        {t('BUILDING')}
                        <br />
                        <span className="text-titan-red">{t("CAMBODIA'S FUTURE")}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('About Hero Desc')}
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Scroll</span>
                    <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-1 bg-titan-red rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* === STATS BAR === */}
            <section className="bg-titan-navy py-16 border-t border-white/10">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <AnimatedCounter value={25} suffix="+" label={t('Years Experience')} />
                        <AnimatedCounter value={150} suffix="+" label={t('Projects Completed')} />
                        <AnimatedCounter value={500} suffix="+" label={t('Team Members')} />
                        <AnimatedCounter value={98} suffix="%" label={t('Client Satisfaction')} />
                    </div>
                </div>
            </section>

            {/* === WHO WE ARE === */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Image Grid */}
                        <FadeInWhenVisible>
                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="relative h-48 w-full rounded-2xl shadow-lg overflow-hidden">
                                            <Image
                                                src="/images/projects/Thumbnail-4.jpg"
                                                alt={t('Construction')}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="relative h-64 w-full rounded-2xl shadow-lg overflow-hidden">
                                            <Image
                                                src="/images/projects/Thumbnail-5.jpg"
                                                alt="Team"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4 pt-8">
                                        <div className="relative h-64 w-full rounded-2xl shadow-lg overflow-hidden">
                                            <Image
                                                src="/images/projects/Thumbnail-6.jpg"
                                                alt="Architecture"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="relative h-48 w-full rounded-2xl shadow-lg overflow-hidden">
                                            <Image
                                                src="/images/projects/Thumbnail-7.jpg"
                                                alt="Building"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 bg-titan-red text-white p-6 rounded-2xl shadow-xl hidden md:block">
                                    <div className="text-4xl font-black">25+</div>
                                    <div className="text-sm uppercase tracking-widest">Years</div>
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        {/* Right: Content */}
                        <FadeInWhenVisible delay={0.2}>
                            <div>
                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{t('Who We Are')}</span>
                                <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6 leading-tight">
                                    {t("Cambodia's Premier")} <span className="text-titan-red">{t('Construction Partner')}</span>
                                </h2>
                                <p className="text-titan-navy/60 text-lg leading-relaxed mb-8">
                                    {t('Who We Are Desc')}
                                </p>

                                <div className="space-y-4">
                                    {[
                                        {
                                            icon: Flag,
                                            title: t('Our Mission'),
                                            desc: t('To bridge the gap between concept and reality through exceptional engineering and safety.'),
                                            detail: t('At KIM MEX, we are dedicated to transforming complex challenges into structural realities. Our mission goes beyond building; it\'s about creating value for our stakeholders and the nation.'),
                                            points: [
                                                t('Prioritizing safety in every structural phase.'),
                                                t('Implementing sustainable building practices.'),
                                                t('Delivering unmatched precision and quality.'),
                                                t('Cultivating long-term client partnerships.')
                                            ]
                                        },
                                        {
                                            icon: Eye,
                                            title: t('Our Vision'),
                                            desc: t('To be the most trusted and innovative construction partner in Cambodia.'),
                                            detail: t('We envision a skyline defined by innovation and architectural brilliance. Our vision is to set the benchmark for construction excellence in Southeast Asia, leading with technology.'),
                                            points: [
                                                t('Global recognition for engineering excellence.'),
                                                t('Pioneering smart construction technologies.'),
                                                t('Shaping the future of urban living.'),
                                                t('Becoming the most trusted name in real estate.')
                                            ]
                                        },
                                        {
                                            icon: Target,
                                            title: t('Our Goal'),
                                            desc: t('To complete every project on time and within budget with zero-accident safety.'),
                                            detail: t('Success for us is measured by the safety of our team and the satisfaction of our clients. We strive for excellence through meticulous planning and execution.'),
                                            points: [
                                                t('Achieving 100% on-time project completion.'),
                                                t('Maintaining a strict zero-accident safety record.'),
                                                t('Expanding our footprint into renewable infrastructure.'),
                                                t('Investing in professional growth of our staff.')
                                            ]
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${activeMissionIndex === i ? 'bg-gray-50 border-titan-red/20 shadow-sm' : 'bg-white border-transparent hover:bg-gray-50'}`}
                                            onClick={() => setActiveMissionIndex(activeMissionIndex === i ? null : i)}
                                        >
                                            <div className="flex gap-5 group">
                                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${activeMissionIndex === i ? 'bg-titan-red text-white' : 'bg-titan-red/10 text-titan-red group-hover:bg-titan-red group-hover:text-white'}`}>
                                                    <item.icon size={24} />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h3 className={`text-lg font-bold transition-colors ${activeMissionIndex === i ? 'text-titan-red' : 'text-titan-navy group-hover:text-titan-red'}`}>{item.title}</h3>
                                                        <motion.div
                                                            animate={{ rotate: activeMissionIndex === i ? 90 : 0 }}
                                                            className={`text-titan-red/30 transition-colors ${activeMissionIndex === i ? 'text-titan-red' : ''}`}
                                                        >
                                                            <ChevronRight size={18} />
                                                        </motion.div>
                                                    </div>
                                                    <p className="text-titan-navy/50 text-sm leading-relaxed">{item.desc}</p>

                                                    <AnimatePresence>
                                                        {activeMissionIndex === i && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="pt-6 mt-6 border-t border-gray-200">
                                                                    <p className="text-titan-navy/70 text-sm leading-relaxed mb-4 italic">
                                                                        {item.detail}
                                                                    </p>
                                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                                                        {item.points.map((point, idx) => (
                                                                            <li key={idx} className="flex items-start gap-2 text-xs font-bold text-titan-navy/60">
                                                                                <div className="w-1.5 h-1.5 bg-titan-red rounded-full mt-1.5 shrink-0"></div>
                                                                                {point}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>
            </section>

            {/* === CEO MESSAGE === */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-[1200px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                            {/* Left: Image with Offset Frame */}
                            <div className="lg:col-span-5 relative pl-4 pb-4">
                                {/* Dark Offset Background */}
                                <div className="absolute top-4 left-4 right-0 bottom-0 bg-titan-navy rounded-lg -z-10 transform translate-x-2 translate-y-2"></div>

                                {/* Image Container */}
                                <div className="relative aspect-[4/5] w-full bg-white p-2 shadow-2xl rounded-lg overflow-hidden border border-gray-100">
                                    <Image
                                        src="/images/team-leadership-professional/touch_kim.jpg"
                                        alt="Okhna. TOUCH KIM"
                                        fill
                                        className="object-contain object-bottom bg-gray-50"
                                    />
                                </div>
                            </div>

                            {/* Right: Message Content */}
                            <div className="lg:col-span-7 bg-gray-50 p-8 md:p-12 rounded-2xl relative">
                                <Quote className="text-titan-navy mb-6" size={48} strokeWidth={1.5} />

                                <h3 className="text-xl md:text-2xl font-bold text-titan-navy mb-6">{t('Message From CEO')}</h3>

                                <blockquote className="text-lg md:text-xl text-titan-navy/80 italic leading-loose mb-10 font-serif">
                                    &ldquo;{t('CEO Quote Desc')}&rdquo;
                                </blockquote>

                                <div>
                                    <div className="text-titan-navy font-black text-xl uppercase mb-1">{t('Okhna. TOUCH KIM')}</div>
                                    <div className="text-titan-navy/60 text-xs font-bold uppercase tracking-widest">{t('Chief Executive Officer')}</div>
                                </div>
                            </div>

                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* === CORE VALUES === */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="text-center mb-16">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{t('What Drives Us')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy">{t('Our Core Values')}</h2>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreValues.map((value, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="bg-gray-50 p-8 rounded-2xl hover:bg-titan-navy group transition-all duration-500 h-full">
                                    <div className="w-16 h-16 bg-titan-red/10 rounded-2xl flex items-center justify-center text-titan-red mb-6 group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                        <value.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-titan-navy mb-3 group-hover:text-white transition-colors">{value.title}</h3>
                                    <p className="text-titan-navy/50 leading-relaxed group-hover:text-white/70 transition-colors">{value.desc}</p>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === MILESTONES TIMELINE === */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-[1200px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="text-center mb-16">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{t('Our Journey')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy">{t('Company Milestones')}</h2>
                        </div>
                    </FadeInWhenVisible>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-titan-red via-titan-navy/20 to-titan-red -translate-x-1/2"></div>

                        {/* Mobile Line */}
                        <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-titan-red via-titan-navy/20 to-titan-red"></div>

                        <div className="space-y-16 md:space-y-24">
                            {milestones.map((item, i) => (
                                <FadeInWhenVisible key={i} delay={0.1}>
                                    <div className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                                        {/* Content */}
                                        <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                            <div className={`inline-block bg-titan-red text-white text-sm font-bold px-4 py-2 rounded-full mb-4`}>
                                                {item.year}
                                            </div>
                                            <h3 className="text-2xl font-bold text-titan-navy mb-3">{item.title}</h3>
                                            <p className="text-titan-navy/50 leading-relaxed">{item.desc}</p>
                                        </div>

                                        {/* Center Dot */}
                                        <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-white border-4 border-titan-red rounded-full -translate-x-1/2 shadow-lg z-10"></div>

                                        {/* Image */}
                                        <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                                            <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-100 relative">
                                                <Image src={item.image} alt={item.title} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                                            </div>
                                        </div>
                                    </div>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* === LEADERSHIP TEAM (Org Chart) === */}
            <section className="py-24 px-4 bg-white overflow-hidden" id='leadership'>
                <div className="max-w-[1400px] mx-auto text-center">
                    <FadeInWhenVisible>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-titan-navy uppercase mb-16 tracking-tight">{t('Organization Structure')}</h2>
                        </div>
                    </FadeInWhenVisible>

                    {/* --- DESKTOP VIEW: Tree Structure --- */}
                    <div className="hidden md:block relative">
                        <div className="min-w-full flex flex-col items-center px-4">
                            {/* LEVEL 1: CEO */}
                            <div className="relative mb-16">
                                <TeamMemberCard member={ceo} isCEO onClick={handleMemberClick} />
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200"></div>
                            </div>

                            {/* LEVEL 2 */}
                            <div className="relative w-full mb-16 px-[2%]">
                                <div className="absolute top-[-2rem] left-[10%] right-[10%] h-px bg-gray-200"></div>

                                <div className="grid grid-cols-5 gap-4">
                                    {managersL2.map((member, i) => (
                                        <div key={i} className="flex justify-center relative">
                                            <div className="absolute top-[-2rem] left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200"></div>
                                            <TeamMemberCard member={member} onClick={handleMemberClick} />
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* LEVEL 3 */}
                            <div className="relative w-full px-[8%]">
                                <div className="absolute top-[-2rem] left-[12.5%] right-[12.5%] h-px bg-gray-200"></div>

                                <div className="grid grid-cols-4 gap-4">
                                    {managersL3.map((member, i) => (
                                        <div key={i} className="flex justify-center relative">
                                            <div className="absolute top-[-2rem] left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200"></div>
                                            <TeamMemberCard member={member} onClick={handleMemberClick} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- MOBILE VIEW: Vertical Tree (Matching Sketch) --- */}
                    <div className="md:hidden flex flex-col items-center max-w-[340px] mx-auto">
                        {/* CEO Card */}
                        <div className="relative mb-12 w-full flex justify-center">
                            <TeamMemberCard member={ceo} isCEO onClick={handleMemberClick} />
                            {/* Connector down to spine */}
                            <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-px h-12 bg-gray-200 z-0"></div>
                        </div>

                        {/* Managers List with Spine */}
                        <div className="relative w-full pl-10">
                            {/* Vertical Spine */}
                            <div className="absolute left-0 top-[-1rem] bottom-10 w-px bg-gray-200"></div>

                            <div className="space-y-6">
                                {[...managersL2, ...managersL3].map((member, i) => (
                                    <div key={i} className="relative">
                                        {/* Horizontal Connection Line */}
                                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-px bg-gray-200"></div>

                                        <TeamMemberRowCard member={member} onClick={handleMemberClick} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === CERTIFICATIONS & QUALITY === */}
            <section className="py-24 px-6 bg-titan-navy" id='quality'>
                {/* ... existing content ... */}
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInWhenVisible>
                            <div>
                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{t('Our Standards')}</span>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                    {t('Quality & Safety')} <span className="text-titan-red uppercase">{t('First')}</span>
                                </h2>
                                <p className="text-white/60 text-lg leading-relaxed mb-10">
                                    {t('QA/QC Desc')}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { icon: Shield, title: 'ISO 9001:2015', desc: t('Quality Management Certified') },
                                        { icon: Award, title: t('Zero Accidents'), desc: t('Safety record policy') },
                                        { icon: CheckCircle2, title: t('100% Compliance'), desc: t('Building code adherence') },
                                        { icon: Clock, title: t('On-Time Delivery'), desc: t('98% completion rate') },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                            <div className="w-12 h-12 bg-titan-red/20 rounded-lg flex items-center justify-center text-titan-red shrink-0">
                                                <item.icon size={22} />
                                            </div>
                                            <div>
                                                <div className="text-white font-bold">{item.title}</div>
                                                <div className="text-white/40 text-sm">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2}>
                            <div className="relative">
                                <Image
                                    src="/images/projects/Thumbnail-6.jpg"
                                    alt="Safety Inspection"
                                    width={800}
                                    height={600}
                                    className="rounded-2xl shadow-2xl w-full h-auto"
                                />
                                {/* Floating Card */}
                                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden md:block">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="text-green-600" size={28} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black text-titan-navy">{t('ISO')}</div>
                                            <div className="text-sm text-titan-navy/50">{t('9001:2015 Certified')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>
            </section>

            {/* === CTA SECTION === */}
            <section className="py-20 px-6 bg-titan-red">
                <div className="max-w-[1200px] mx-auto text-center">
                    <FadeInWhenVisible>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t('Ready to Build Together?')}</h2>
                        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                            {t('CTA Desc')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/design-x/contact" className="bg-white text-titan-navy px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-titan-navy hover:text-white transition-all rounded-lg">
                                {t('Contact Us')}
                            </Link>
                            <Link href="/design-x/projects" className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-titan-navy transition-all rounded-lg">
                                {t('View Projects')}
                            </Link>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* MODAL */}
            <AnimatePresence>
                <MemberDetailModal
                    member={selectedMember}
                    isOpen={!!selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            </AnimatePresence>
        </div>
    );
}

