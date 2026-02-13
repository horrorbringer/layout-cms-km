'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Target, Eye, Flag, Shield, Award, Users, TrendingUp, Heart, Lightbulb, Handshake, Clock, CheckCircle2, Quote, ChevronDown, ChevronUp, Plus, Minus, X, Mail, Linkedin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { orgChartData, OrgNode } from '../data/orgChartData';

// Modal Component for Member Details
function MemberDetailModal({ member, isOpen, onClose }: { member: any; isOpen: boolean; onClose: () => void }) {
    if (!isOpen || !member) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
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
                            Verified Leadership
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
                        <span className="text-titan-red font-black uppercase tracking-[0.3em] text-[10px] block mb-3">{member.role}</span>
                        <h3 className="text-3xl md:text-5xl font-black text-titan-navy uppercase leading-[1.1] tracking-tighter">
                            {member.name}
                        </h3>
                        <div className="w-16 md:w-20 h-1.5 bg-titan-red mt-6 rounded-full"></div>
                    </div>

                    <div className="flex-grow">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-titan-navy/30 mb-4 italic">Executive Biography</h4>
                        <div className="space-y-4 md:space-y-6 text-titan-navy/80 leading-relaxed font-medium">
                            {member.bio ? (
                                <p className="text-base md:text-lg leading-relaxed">{member.bio}</p>
                            ) : (
                                <>
                                    <p className="text-base md:text-lg leading-relaxed">
                                        An integral part of KIM MEX Construction, {member.name.split('.').pop()?.trim()} brings specialized expertise and a results-driven approach to the {member.role.toLowerCase()} division.
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
                                <div className="font-bold text-titan-navy uppercase">Directorate</div>
                                <div className="text-titan-navy/40 font-bold">KIMMEX GROUP</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Link
                                href={`/design-z/team/${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}
                                className="w-full sm:w-auto px-10 py-3.5 bg-titan-navy text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-titan-red transition-all text-center shadow-lg shadow-titan-navy/10 active:scale-95"
                            >
                                Full Biography
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Team Member Card Component with Blueprint Aesthetic
function TeamMemberCard({ member, isCEO = false, onClick }: { member: any; isCEO?: boolean; onClick?: (member: any) => void }) {
    return (
        <div
            className="flex flex-col items-center group relative z-10 w-full cursor-pointer"
            onClick={() => onClick && onClick(member)}
        >
            <div className={`relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgb(0,0,0,0.08)] border-[3px] border-white transition-all duration-700 group-hover:shadow-[0_30px_90px_rgb(0,0,0,0.12)] group-hover:-translate-y-4
                ${isCEO ? 'w-64 h-64 mb-8' : 'w-52 h-52 mb-6'}
            `}>
                {member.image ? (
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 bg-titan-navy/5 flex items-center justify-center text-titan-navy/10">
                        <Users size={isCEO ? 80 : 60} />
                    </div>
                )}

                {/* Blueprint Accent Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-titan-red/50 to-transparent" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-titan-navy/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1, opacity: 1 }}
                        className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-titan-navy shadow-xl"
                    >
                        <ArrowRight size={28} className="text-titan-red" />
                    </motion.div>
                </div>
            </div>

            <div className="text-center px-4 relative">
                {/* Small indicator dot for technical feel */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-titan-red opacity-0 group-hover:opacity-100 transition-opacity" />

                <h3 className={`font-black text-titan-navy uppercase tracking-tight transition-colors duration-500 group-hover:text-titan-red ${isCEO ? 'text-2xl mb-1.5' : 'text-lg mb-1'}`}>
                    {member.name}
                </h3>
                <p className={`text-titan-red font-extrabold uppercase tracking-[0.2em] opacity-80 ${isCEO ? 'text-xs' : 'text-[10px]'}`}>
                    {member.role}
                </p>
            </div>
        </div>
    );
}

// Team Member Row Card (Mobile View - Horizontal / Vertical Tree)
function TeamMemberRowCard({ member, onClick }: { member: any; onClick?: (member: any) => void }) {
    return (
        <div
            className="flex items-center gap-3 bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group w-full"
            onClick={() => onClick && onClick(member)}
        >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 border-gray-50">
                {member.image ? (
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
                        <Users size={16} />
                    </div>
                )}
            </div>
            <div className="flex-grow min-w-0">
                <h4 className="text-[11px] font-bold text-titan-navy uppercase tracking-tight leading-tight group-hover:text-titan-red transition-colors truncate">{member.name}</h4>
                <p className="text-[8px] text-accent-orange font-bold uppercase tracking-wider mt-0.5 truncate">{member.role}</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-titan-red/10 group-hover:text-titan-red transition-all">
                <ArrowRight size={10} />
            </div>
        </div>
    );
}

// Compact Org Card for deep levels
function CompactOrgCard({ node, onClick }: { node: OrgNode; onClick: (member: any) => void }) {
    return (
        <div
            className="flex flex-col items-center group cursor-pointer w-28 md:w-32"
            onClick={() => onClick(node)}
        >
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:shadow-lg transition-all mb-2">
                {node.image ? (
                    <Image src={node.image} alt={node.name} fill className="object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-300">
                        <Users size={24} />
                    </div>
                )}
            </div>
            <div className="text-center">
                <div className="text-[9px] font-black text-titan-navy uppercase truncate w-full px-1">{node.name}</div>
                <div className="text-[7px] font-bold text-titan-red uppercase tracking-tighter truncate w-full px-1">{node.role}</div>
            </div>
        </div>
    );
}

// Enhanced Connector Line with Blueprint Aesthetic
function OrgLine({
    direction = 'vertical',
    length = '',
    className = '',
    delay = 0,
    active = false
}: {
    direction?: 'vertical' | 'horizontal',
    length?: string,
    className?: string,
    delay?: number,
    active?: boolean
}) {
    return (
        <div className={`absolute ${className} ${length} ${direction === 'vertical' ? 'w-[2px]' : 'h-[2px]'} overflow-hidden`}>
            {/* The Base Line */}
            <motion.div
                initial={direction === 'vertical' ? { height: 0 } : { width: 0 }}
                whileInView={direction === 'vertical' ? { height: '100%' } : { width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay, ease: "easeInOut" }}
                className={`absolute inset-0 ${active ? 'bg-titan-red' : 'bg-gray-200'} transition-colors duration-500`}
            />

            {/* The Blueprint "Pulse" Effect */}
            <motion.div
                initial={direction === 'vertical' ? { top: '-100%' } : { left: '-100%' }}
                animate={direction === 'vertical' ? { top: '100%' } : { left: '100%' }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: delay + 0.5
                }}
                className={`absolute ${direction === 'vertical' ? 'w-full h-20' : 'h-full w-20'} bg-gradient-to-${direction === 'vertical' ? 'b' : 'r'} from-transparent via-${active ? 'titan-red' : 'titan-navy'}/20 to-transparent opacity-40`}
            />
        </div>
    );
}

// Technical Junction Dot
function JunctionDot({ className = '', delay = 0, active = false }: { className?: string; delay?: number; active?: boolean }) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
            className={`absolute w-2 h-2 rounded-full z-20 -translate-x-1/2 -translate-y-1/2 border-2 ${active ? 'bg-titan-red border-white' : 'bg-white border-gray-300'} shadow-sm ${className}`}
        />
    );
}

// Member Column for the "Hanging branch" style from the sketch
function OrgColumnItem({ node, onClick }: { node: OrgNode; onClick: (m: any) => void }) {
    return (
        <div className="relative flex items-center group">
            {/* Blueprint Junction Dot at Stem */}
            <JunctionDot className="left-0 top-1/2" delay={1.2} />

            {/* Horizontal line from the main vertical stem to the card */}
            <OrgLine direction="horizontal" length="w-8" className="left-0 top-1/2 -translate-y-1/2" delay={1.3} />

            <div
                className="flex items-center gap-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgb(0,0,0,0.08)] transition-all duration-500 cursor-pointer hover:border-titan-red/30 w-72 group/card relative z-10 ml-8"
                onClick={() => onClick(node)}
            >
                {/* Image container with Blueprint Accent */}
                <div className="relative w-14 h-14 rounded-xl shadow-inner overflow-hidden shrink-0 border-2 border-white bg-titan-navy/5">
                    {node.image ? (
                        <Image src={node.image} alt={node.name} fill className="object-cover group-hover/card:scale-110 transition-transform duration-700" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-titan-navy/10">
                            <Users size={24} />
                        </div>
                    )}
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-titan-red/0 group-hover/card:bg-titan-red/5 transition-colors" />
                </div>

                <div className="min-w-0 flex-grow">
                    <div className="text-[12px] font-black text-titan-navy truncate uppercase leading-tight group-hover/card:text-titan-red transition-colors mb-0.5 tracking-tight">{node.name}</div>
                    <div className="text-[9px] font-bold text-titan-red/70 truncate uppercase tracking-[0.1em]">{node.role}</div>
                </div>

                <div className="w-7 h-7 rounded-full bg-titan-red/5 flex items-center justify-center text-titan-red/30 group-hover/card:bg-titan-red group-hover/card:text-white transition-all transform group-hover/card:rotate-45">
                    <ArrowRight size={12} />
                </div>
            </div>
        </div>
    );
}

// Small Circle for sub-staff
function StaffCircle({ node }: { node: OrgNode }) {
    return (
        <div className="group relative">
            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[10px] text-titan-navy font-bold hover:bg-titan-red hover:text-white transition-all cursor-help overflow-hidden">
                {node.image ? (
                    <Image src={node.image} alt={node.name} fill className="object-cover" />
                ) : (
                    node.name.charAt(0)
                )}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-titan-navy text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                {node.name} - {node.role}
            </div>
        </div>
    );
}

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

export default function AboutPage() {
    const heroRef = useRef(null);
    const { t } = useLanguage();
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

    const coreValues = [
        { icon: Shield, title: t('Integrity'), desc: t('Integrity Desc') },
        { icon: Award, title: t('Excellence'), desc: t('Excellence Desc') },
        { icon: Handshake, title: t('Partnership'), desc: t('Partnership Desc') },
        { icon: Lightbulb, title: t('Innovation'), desc: t('Innovation Desc') },
        { icon: Heart, title: t('Safety First'), desc: t('Safety Desc') },
        { icon: TrendingUp, title: t('Growth'), desc: t('Growth Desc') },
    ];

    const milestones = [
        {
            year: '1999',
            title: 'Foundation',
            desc: 'KIM MEX Construction was established with a vision to redefine Cambodia\'s skyline. Starting with a humble team of 10 engineers, we laid the first stone of our legacy.',
            image: '/images/projects/Thumbnail-1.jpg'
        },
        {
            year: '2005',
            title: 'First Major Project',
            desc: 'Completed our first government infrastructure project, establishing our reputation for quality and reliability in the public sector.',
            image: '/images/projects/Thumbnail-2.jpg'
        },
        {
            year: '2012',
            title: 'Major Expansion',
            desc: 'Following successful commercial projects in Phnom Penh, we expanded operations to Siem Reap and Sihanoukville, securing contracts for major hotel resorts.',
            image: '/images/projects/Thumbnail-3.jpg'
        },
        {
            year: '2018',
            title: 'ISO Certification',
            desc: 'Our commitment to excellence was recognized with ISO 9001:2015 accreditation, validating our rigorous Quality Management Systems and safety protocols.',
            image: '/images/projects/Thumbnail-5.jpg'
        },
        {
            year: '2023',
            title: 'National Recognition',
            desc: 'Awarded "Top Infrastructure Partner" by the Ministry of Public Works for our contribution to national road development projects.',
            image: '/images/projects/Thumbnail-8.jpg'
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy overflow-x-hidden">

            <AnimatePresence>
                {selectedMember && (
                    <MemberDetailModal
                        member={selectedMember}
                        isOpen={!!selectedMember}
                        onClose={() => setSelectedMember(null)}
                    />
                )}
            </AnimatePresence>

            {/* === HERO SECTION === */}
            <section ref={heroRef} id="profile" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-titan-navy">
                {/* Parallax Background */}
                <motion.div style={{ y: heroY }} className="absolute inset-0">
                    <Image
                        src="/images/projects/Thumbnail-6.jpg"
                        alt="Construction Site"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/80 via-titan-navy/70 to-titan-navy"></div>
                </motion.div>

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
                        <span className="text-titan-red font-bold uppercase tracking-[0.2em] text-sm">Est. 1999</span>
                        <div className="w-12 h-[2px] bg-titan-red"></div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[0.95]"
                    >
                        BUILDING
                        <br />
                        <span className="text-titan-red">CAMBODIA&apos;S FUTURE</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
                    >
                        For over 25 years, KIM MEX Construction has been at the forefront of Cambodia&apos;s infrastructure development, transforming visions into landmarks.
                    </motion.p>
                </motion.div>
            </section>

            {/* === STATS BAR === */}
            <section className="bg-titan-navy py-16 border-t border-white/10">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <AnimatedCounter value={25} suffix="+" label="Years Experience" />
                        <AnimatedCounter value={150} suffix="+" label="Projects Completed" />
                        <AnimatedCounter value={500} suffix="+" label="Team Members" />
                        <AnimatedCounter value={98} suffix="%" label="Client Satisfaction" />
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
                                                alt="Construction"
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
                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Who We Are</span>
                                <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6 leading-tight">
                                    Cambodia&apos;s Premier <span className="text-titan-red">Construction Partner</span>
                                </h2>
                                <p className="text-titan-navy/60 text-lg leading-relaxed mb-8">
                                    Since 1999, KIM MEX Construction has been a cornerstone of Cambodia&apos;s infrastructure development. We are more than builders; we are partners in national progress, dedicated to delivering excellence in every beam, brick, and blueprint.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        {
                                            icon: Flag,
                                            title: 'Our Mission',
                                            desc: 'To bridge the gap between concept and reality through exceptional engineering and safety.',
                                            detail: 'At KIM MEX, we are dedicated to transforming complex challenges into structural realities. Our mission goes beyond building; it\'s about creating value for our stakeholders and the nation.',
                                            points: [
                                                'Prioritizing safety in every structural phase.',
                                                'Implementing sustainable building practices.',
                                                'Delivering unmatched precision and quality.',
                                                'Cultivating long-term client partnerships.'
                                            ]
                                        },
                                        {
                                            icon: Eye,
                                            title: 'Our Vision',
                                            desc: 'To be the most trusted and innovative construction partner in Cambodia.',
                                            detail: 'We envision a skyline defined by innovation and architectural brilliance. Our vision is to set the benchmark for construction excellence in Southeast Asia, leading with technology.',
                                            points: [
                                                'Global recognition for engineering excellence.',
                                                'Pioneering smart construction technologies.',
                                                'Shaping the future of urban living.',
                                                'Becoming the most trusted name in real estate.'
                                            ]
                                        },
                                        {
                                            icon: Target,
                                            title: 'Our Goal',
                                            desc: 'To complete every project on time and within budget with zero-accident safety.',
                                            detail: 'Success for us is measured by the safety of our team and the satisfaction of our clients. We strive for excellence through meticulous planning and execution.',
                                            points: [
                                                'Achieving 100% on-time project completion.',
                                                'Maintaining a strict zero-accident safety record.',
                                                'Expanding our footprint into renewable infrastructure.',
                                                'Investing in professional growth of our staff.'
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
                                                            <ArrowRight size={18} />
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
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-[1400px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="bg-titan-navy rounded-3xl overflow-hidden shadow-2xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Left: Image */}
                                <div className="relative min-h-[400px] lg:min-h-[500px]">
                                    <Image
                                        src="/images/team-leadership-professional/touch_kim.jpg"
                                        alt="CEO"
                                        fill
                                        className="object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-titan-navy/50 lg:to-titan-navy"></div>
                                </div>

                                {/* Right: Message */}
                                <div className="p-10 lg:p-16 flex flex-col justify-center relative">
                                    <Quote className="text-titan-red/20 absolute top-8 right-8" size={80} />

                                    <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Message from CEO</span>

                                    <blockquote className="text-xl md:text-2xl text-white/90 font-light italic leading-relaxed mb-8 relative z-10">
                                        &ldquo;Construction is not just about concrete and steel. It&apos;s about building trust, fostering communities, and leaving a legacy that stands the test of time. At KIM MEX, we pour our heart into every foundation we lay.&rdquo;
                                    </blockquote>

                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-titan-red">
                                            <Image src="/images/team-leadership-professional/touch_kim.jpg" alt="Touch Kim" width={64} height={64} className="object-cover" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-lg">Okhna. TOUCH KIM</div>
                                            <div className="text-titan-red text-sm uppercase tracking-widest font-bold">Founder & CEO</div>
                                        </div>
                                    </div>
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
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">What Drives Us</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy">Our Core Values</h2>
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
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Our Journey</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy">Company Milestones</h2>
                        </div>
                    </FadeInWhenVisible>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-titan-red via-titan-navy/20 to-titan-red -translate-x-1/2"></div>
                        <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-titan-red via-titan-navy/20 to-titan-red"></div>

                        <div className="space-y-16 md:space-y-24">
                            {milestones.map((item, i) => (
                                <FadeInWhenVisible key={i} delay={0.1}>
                                    <div className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                        <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                            <div className={`inline-block bg-titan-red text-white text-sm font-bold px-4 py-2 rounded-full mb-4`}>
                                                {item.year}
                                            </div>
                                            <h3 className="text-2xl font-bold text-titan-navy mb-3">{item.title}</h3>
                                            <p className="text-titan-navy/50 leading-relaxed">{item.desc}</p>
                                        </div>
                                        <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-white border-4 border-titan-red rounded-full -translate-x-1/2 shadow-lg z-10"></div>
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
            <section id="leadership" className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="text-center mb-20">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Our People</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-4">Organizational Structure</h2>
                        </div>
                    </FadeInWhenVisible>

                    {/* --- DESKTOP VIEW: "Bus Architecture" Tree from Sketch --- */}
                    <div className="hidden xl:block relative">
                        <div className="flex flex-col items-center">
                            {/* CEO */}
                            <div className="relative mb-20">
                                <TeamMemberCard member={orgChartData} isCEO onClick={handleMemberClick} />
                                <OrgLine className="top-full left-1/2 -translate-x-1/2" length="h-20" delay={0.2} />
                            </div>

                            {/* DCEO Cluster */}
                            {orgChartData.children?.map((dceo, i) => (
                                <div key={i} className="flex flex-col items-center w-full">
                                    <div className="relative mb-20">
                                        <TeamMemberCard member={dceo} onClick={handleMemberClick} />
                                        <OrgLine className="top-full left-1/2 -translate-x-1/2" length="h-20" delay={0.4} />
                                    </div>

                                    {/* DGM Level */}
                                    {dceo.children?.map((dgm, j) => (
                                        <div key={j} className="flex flex-col items-center w-full">
                                            <div className="relative mb-24">
                                                <TeamMemberCard member={dgm} onClick={handleMemberClick} />
                                                <OrgLine className="top-full left-1/2 -translate-x-1/2" length="h-24" delay={0.6} />
                                            </div>

                                            {/* MAIN HORIZONTAL SPINE (The Bus) */}
                                            <div className="relative w-full px-12 overflow-x-auto pb-20 scrollbar-hide">
                                                <div className="min-w-max mx-auto px-10">
                                                    <OrgLine
                                                        direction="horizontal"
                                                        className="top-0 left-20 right-20"
                                                        delay={0.8}
                                                    />

                                                    <div className="flex justify-start items-start gap-24 pt-12">
                                                        {/* LEVEL 4: DIRECTORS (Finance, SC, Design, Ops) */}
                                                        {dgm.children?.map((director, k) => (
                                                            <div key={k} className="relative flex flex-col items-center pt-12">
                                                                {/* Vertical lead from main spine to Directer Card */}
                                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gray-200"></div>

                                                                {/* Director Header Card */}
                                                                <div className="mb-16 z-10 px-4">
                                                                    <TeamMemberCard member={director} onClick={handleMemberClick} />
                                                                </div>

                                                                {/* SUB-SPINE (Secondary horizontal line for departments) */}
                                                                {director.children && director.children.length > 0 && (
                                                                    <div className="relative pt-12 flex flex-col items-center">
                                                                        {/* Vertical line from Director to Sub-Spine */}
                                                                        <OrgLine direction="vertical" length="h-12" className="top-0" delay={1.2} />

                                                                        {/* The Sub-Spine */}
                                                                        <div className="relative px-12">
                                                                            <OrgLine
                                                                                direction="horizontal"
                                                                                className="top-0 left-12 right-12"
                                                                                delay={1.4}
                                                                            />

                                                                            <div className="flex justify-center gap-20 pt-12">
                                                                                {director.children.map((dept, dIdx) => (
                                                                                    <div key={dIdx} className="relative flex flex-col items-start min-w-[320px]">
                                                                                        {/* Blueprint Junction Dot at Spine Entrance */}
                                                                                        <JunctionDot className="left-0 top-0" delay={0.9 + (dIdx * 0.1)} />

                                                                                        {/* Vertical lead from sub-spine to department stem */}
                                                                                        <OrgLine direction="vertical" length="h-12" className="left-0 top-0" delay={1.0 + (dIdx * 0.1)} />

                                                                                        {/* Department Label */}
                                                                                        <div className="mb-10 pl-8 pt-16">
                                                                                            <div className="text-[10px] font-black text-titan-navy/30 italic uppercase tracking-[0.3em] bg-gray-50 px-3 py-1 rounded inline-block border border-gray-100 shadow-sm">
                                                                                                {dept.name}
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* Vertical Stem for Department */}
                                                                                        <div className="relative flex flex-col gap-12 pl-8">
                                                                                            {/* Main Stem line with Blueprint pulse */}
                                                                                            <OrgLine direction="vertical" length="h-full" className="left-0 top-0" delay={1.1 + (dIdx * 0.1)} />

                                                                                            {dept.children?.map((mgr, mIdx) => (
                                                                                                <div key={mIdx} className="flex flex-col items-start">
                                                                                                    <OrgColumnItem node={mgr} onClick={handleMemberClick} />

                                                                                                    {/* Staff list - Premium Blueprint mini-cards */}
                                                                                                    {mgr.children && (
                                                                                                        <div className="flex flex-col gap-4 mt-6 ml-14 pl-8 relative">
                                                                                                            {/* Junction Dot for Staff Group */}
                                                                                                            <JunctionDot className="left-0 top-0 !w-1.5 !h-1.5" delay={1.4 + (mIdx * 0.1)} />

                                                                                                            {/* Sub-stem for staff */}
                                                                                                            <OrgLine direction="vertical" length="h-[calc(100%-16px)]" className="left-0 top-0 !bg-gray-100" delay={1.5 + (mIdx * 0.1)} />

                                                                                                            {mgr.children.map((staff, sIdx) => (
                                                                                                                <div key={sIdx} className="relative flex items-center group/staff">
                                                                                                                    {/* Blueprint Junction Dot at Staff Card */}
                                                                                                                    <JunctionDot className="left-0 top-1/2 !w-1.5 !h-1.5 !border-gray-200" delay={1.6 + (mIdx * 0.1) + (sIdx * 0.05)} />

                                                                                                                    {/* Horizontal connector to staff card */}
                                                                                                                    <OrgLine direction="horizontal" length="w-6" className="left-0 top-1/2 -translate-y-1/2 !bg-gray-100" delay={1.7 + (mIdx * 0.1) + (sIdx * 0.05)} />

                                                                                                                    <div className="bg-white/70 hover:bg-white backdrop-blur-sm border border-gray-100/50 px-4 py-2.5 rounded-2xl text-[10px] font-black text-titan-navy/70 hover:text-titan-red transition-all duration-500 cursor-pointer flex items-center gap-3 shadow-sm hover:shadow-xl min-w-[220px] group/item ml-6 border-l-4 border-l-titan-red/20 hover:border-l-titan-red">
                                                                                                                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white shadow-sm bg-gray-50 relative">
                                                                                                                            {staff.image ? (
                                                                                                                                <Image src={staff.image} alt={staff.name} fill className="object-cover group-hover/item:scale-125 transition-transform duration-700" />
                                                                                                                            ) : (
                                                                                                                                <div className="absolute inset-0 flex items-center justify-center text-titan-navy/10">
                                                                                                                                    <Users size={14} />
                                                                                                                                </div>
                                                                                                                            )}
                                                                                                                        </div>
                                                                                                                        <div className="min-w-0 flex-grow">
                                                                                                                            <div className="truncate uppercase leading-tight tracking-tight">{staff.name}</div>
                                                                                                                            <div className="text-[8px] font-bold text-titan-navy/30 truncate uppercase mt-1 tracking-wider">{staff.role}</div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            ))}
                                                                                                        </div>
                                                                                                    )}
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
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
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- TABLET/MOBILE VIEW: Vertical Tree --- */}
                    <div className="xl:hidden flex flex-col items-center max-w-[600px] mx-auto">
                        <div className="flex flex-col items-center w-full">
                            {/* CEO, DCEO, DGM */}
                            <div className="flex flex-col items-center gap-8 mb-12">
                                <TeamMemberCard member={orgChartData} onClick={handleMemberClick} />
                                <div className="relative h-8 w-full flex justify-center">
                                    <OrgLine direction="vertical" length="h-8" delay={0.1} />
                                </div>
                                {orgChartData.children?.map((dceo, i) => (
                                    <React.Fragment key={i}>
                                        <TeamMemberCard member={dceo} onClick={handleMemberClick} />
                                        <div className="relative h-8 w-full flex justify-center">
                                            <OrgLine direction="vertical" length="h-8" delay={0.2} />
                                        </div>
                                        {dceo.children?.map((dgm, j) => (
                                            <TeamMemberCard key={j} member={dgm} onClick={handleMemberClick} />
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Departments List */}
                            <div className="w-full space-y-12 pl-6">
                                {orgChartData.children?.[0].children?.[0].children?.map((branch, k) => (
                                    <div key={k} className="relative pl-10 border-l-2 border-blue-100 py-2">
                                        <div className="absolute left-0 top-6 w-10 h-0.5 bg-blue-100"></div>
                                        <div className="bg-titan-navy/5 p-4 rounded-2xl">
                                            <div className="text-[10px] font-black text-titan-red uppercase mb-4 tracking-widest">{branch.role}</div>
                                            <TeamMemberRowCard member={branch} onClick={handleMemberClick} />

                                            {branch.children && (
                                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {branch.children.map((manager, m) => (
                                                        <div key={m} className="bg-white/50 p-3 rounded-xl">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                                                    {manager.image ? <Image src={manager.image} alt={manager.name} width={40} height={40} className="rounded-full object-cover" /> : <Users size={16} />}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="text-[10px] font-bold text-titan-navy truncate">{manager.name}</div>
                                                                    <div className="text-[8px] text-titan-navy/50 truncate">{manager.role}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === CERTIFICATIONS & QUALITY === */}
            <section id="safety" className="py-24 px-6 bg-titan-navy">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInWhenVisible>
                            <div>
                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Our Standards</span>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                    Quality & Safety <span className="text-titan-red">First</span>
                                </h2>
                                <p className="text-white/60 text-lg leading-relaxed mb-10">
                                    We implement rigorous Quality Assurance (QA) and Quality Control (QC) protocols on every site. Our safety record is a testament to our commitment to our workforce and our clients.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { icon: Shield, title: 'ISO 9001:2015', desc: 'Quality Management Certified' },
                                        { icon: Award, title: 'Zero Accidents', desc: 'Safety record policy' },
                                        { icon: CheckCircle2, title: '100% Compliance', desc: 'Building code adherence' },
                                        { icon: Clock, title: 'On-Time Delivery', desc: '98% completion rate' },
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
                                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden md:block">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="text-green-600" size={28} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black text-titan-navy">ISO</div>
                                            <div className="text-sm text-titan-navy/50">9001:2015 Certified</div>
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
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Build Together?</h2>
                        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                            Partner with Cambodia&apos;s most trusted construction company for your next project.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/design-z/contact" className="bg-white text-titan-navy px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-titan-navy hover:text-white transition-all rounded-lg">
                                Contact Us
                            </Link>
                            <Link href="/design-z/projects" className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-titan-navy transition-all rounded-lg">
                                View Projects
                            </Link>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

        </div>
    );
}
