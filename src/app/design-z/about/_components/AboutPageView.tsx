'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Target, Eye, Flag, Shield, Award, Users, TrendingUp, Heart, Lightbulb, Handshake, Clock, CheckCircle2, Quote, ChevronDown, ChevronUp, Plus, Minus, X, Mail, Linkedin, ArrowRight, ArrowUpRight, Layers, Phone, Network } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage, getLocalizedText } from '../../context/LanguageContext';
import { orgChartData as staticOrgChart } from '../../data/orgChartData';
import { milestones as staticMilestones } from '../../data/milestonesData';
import { aboutData as staticAboutData } from '../../data/aboutData';

// --- COMPONENTS ---

// Modal Component for Member Details
function MemberDetailModal({ member, isOpen, onClose, language }: { member: any; isOpen: boolean; onClose: () => void; language: string }) {
    const { t } = useLanguage();
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
                        src={member.image || '/images/team-leadership-professional/staff_placeholder.png'}
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
                        <span className="text-titan-red font-black uppercase tracking-[0.3em] text-[10px] block mb-3">{getLocalizedText(member.role, language as any) || (typeof member.role === 'string' ? member.role : member.role?.en)}</span>
                        <h3 className="text-3xl md:text-5xl font-black text-titan-navy uppercase leading-[1.1] tracking-tighter">
                            {member.name}
                        </h3>
                        <div className="w-16 md:w-20 h-1.5 bg-titan-red mt-6 rounded-full"></div>
                    </div>

                    <div className="flex-grow">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-titan-navy/30 mb-4 italic">{t('Executive Biography')}</h4>
                        <div className="space-y-4 md:space-y-6 text-titan-navy/80 leading-relaxed font-medium">
                            {member.bio ? (
                                <p className="text-base md:text-lg leading-relaxed">{getLocalizedText(member.bio, language as any) || (typeof member.bio === 'string' ? member.bio : member.bio?.en)}</p>
                            ) : (
                                <>
                                    <p className="text-base md:text-lg leading-relaxed">
                                        An integral part of KIM MEX Construction, {member.name.split('.').pop()?.trim()} brings specialized expertise and a results-driven approach.
                                    </p>
                                    <p className="text-sm md:text-base">
                                        Focused on operational efficiency and upholding our core values of excellence and safety, they play a vital role in delivering landmark projects across the Kingdom.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function OrgNode({ node, level = 0, onClick, language }: { node: any; level?: number; onClick: (m: any) => void; language: string }) {
    if (!node) return null;

    const hasChildren = node.children && node.children.length > 0;
    const isCEO = level === 0;

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative">
                <TeamMemberCard
                    member={node}
                    isCEO={isCEO}
                    onClick={onClick}
                    language={language}
                />

                {hasChildren && (
                    <div className="absolute left-1/2 -bottom-8 w-[2px] h-8 bg-titan-red/20 -translate-x-1/2"></div>
                )}
            </div>

            {hasChildren && (
                <div className="mt-8 w-full relative">
                    {/* Horizontal connector line */}
                    {node.children.length > 1 && (
                        <div className="absolute top-0 left-[12.5%] right-[12.5%] h-[2px] bg-titan-red/20"></div>
                    )}

                    <div className={`grid grid-cols-1 ${node.children.length > 1 ? 'md:grid-cols-' + Math.min(node.children.length, 4) : ''} gap-8 pt-0`}>
                        {node.children.map((child: any, idx: number) => (
                            <div key={idx} className="relative pt-8 flex flex-col items-center">
                                {/* Vertical connector to parent horizontal line */}
                                {node.children.length > 1 && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-titan-red/20"></div>
                                )}
                                <OrgNode node={child} level={level + 1} onClick={onClick} language={language} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function TeamMemberCard({ member, isCEO = false, onClick, language }: { member: any; isCEO?: boolean; onClick?: (member: any) => void; language: string }) {
    const { t } = useLanguage();
    const roleText = (getLocalizedText(member.role, language as any) || (typeof member.role === 'string' ? member.role : member.role?.en)) || '';

    const getTypeStyles = (type?: string) => {
        switch (type) {
            case 'director': return { bg: 'bg-indigo-600', border: 'border-indigo-600', text: 'text-indigo-600', light: 'bg-indigo-50 border-indigo-200' };
            case 'manager': return { bg: 'bg-amber-500', border: 'border-amber-500', text: 'text-amber-500', light: 'bg-amber-50 border-amber-200' };
            case 'staff': return { bg: 'bg-rose-500', border: 'border-rose-500', text: 'text-rose-500', light: 'bg-rose-50 border-rose-200' };
            case 'department': return { bg: 'bg-emerald-500', border: 'border-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-50 border-emerald-200' };
            default: return { bg: isCEO ? 'bg-titan-red' : 'bg-titan-navy', border: isCEO ? 'border-titan-red' : 'border-titan-navy', text: isCEO ? 'text-titan-red' : 'text-titan-navy', light: 'bg-gray-50 border-gray-200' };
        }
    };

    const styles = getTypeStyles(member.type);
    const roleColor = isCEO ? 'bg-titan-red text-white' : `${styles.bg} text-white`;
    const isDepartment = member.type === 'department';

    if (isDepartment) {
        return (
            <div className="flex flex-col items-center group relative z-10 w-full">
                <div className={`${styles.light} border px-6 py-3 rounded-xl backdrop-blur-sm shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:scale-105`}>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${styles.text} opacity-50 mb-1 block text-center italic`}>{t('DEPARTMENT')}</span>
                    <h3 className={`text-sm font-black ${styles.text} uppercase tracking-tight text-center whitespace-nowrap`}>
                        {member.name}
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center group relative z-10 w-full cursor-pointer" onClick={() => onClick && onClick(member)}>
            <div className={`relative rounded-full overflow-hidden border-[4px] border-white shadow-xl transition-all duration-700 group-hover:scale-110 group-hover:shadow-lg ${isCEO ? 'w-32 h-32 mb-4 group-hover:shadow-titan-red/20' : 'w-24 h-24 mb-4 group-hover:shadow-current'}`}>
                {member.image ? (
                    <Image src={member.image} alt={member.name} fill className="object-cover object-top" />
                ) : (
                    <div className="absolute inset-0 bg-gray-50 flex items-center justify-center text-gray-300">
                        <Users size={isCEO ? 48 : 32} />
                    </div>
                )}
                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            </div>
            <div className="flex flex-col items-center text-center px-4">
                <div className={`${roleColor} px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-2 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-500 whitespace-nowrap`}>
                    {roleText.length > 25 ? roleText.substring(0, 22) + '...' : roleText}
                </div>
                <h3 className={`text-xs md:text-sm font-black text-titan-navy uppercase tracking-tight leading-tight group-hover:${styles.text} transition-colors duration-500 max-w-[160px]`}>
                    {member.name}
                </h3>
            </div>
        </div>
    );
}

function FadeInWhenVisible({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
            {children}
        </motion.div>
    );
}

function AnimatedCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const stepTime = Math.abs(Math.floor(duration / end));
            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, stepTime);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-5xl md:text-6xl font-black text-white mb-2">{count}{suffix}</div>
            <div className="text-sm uppercase tracking-widest text-white/60 font-bold">{label}</div>
        </div>
    );
}

// --- MAIN PAGE VIEW ---

export default function AboutPageView({ initialOrgChart, initialMilestones, initialAboutData, initialStats }: { initialOrgChart?: any, initialMilestones?: any, initialAboutData?: any, initialStats?: any }) {
    const { t, language, fontClassName } = useLanguage();
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const orgChart = initialOrgChart || staticOrgChart;
    const allMilestones = initialMilestones || staticMilestones;
    const aboutData = initialAboutData || staticAboutData;

    const handleMemberClick = (member: any) => {
        setSelectedMember(member);
    };

    return (
        <div className={`bg-white min-h-screen text-titan-navy overflow-x-hidden ${fontClassName}`}>
            <AnimatePresence>
                {selectedMember && (
                    <MemberDetailModal member={selectedMember} isOpen={!!selectedMember} onClose={() => setSelectedMember(null)} language={language} />
                )}
            </AnimatePresence>

            {/* === HERO SECTION === */}
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-titan-navy">
                <motion.div style={{ y: heroY }} className="absolute inset-0">
                    <Image src="/images/projects/Thumbnail-6.jpg" alt="Construction" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/80 via-titan-navy/70 to-titan-navy"></div>
                </motion.div>
                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[0.95]">
                        {t('BUILDING')}<br /><span className="text-titan-red">{t('CAMBODIA FUTURE')}</span>
                    </h1>
                </motion.div>
            </section>



            {/* === ABOUT STORY === */}
            <section className="py-24 px-6">
                <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <FadeInWhenVisible>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg"><Image src="/images/projects/Thumbnail-1.jpg" alt="P1" fill className="object-cover" /></div>
                                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg"><Image src="/images/projects/Thumbnail-2.jpg" alt="P2" fill className="object-cover" /></div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg"><Image src="/images/projects/Thumbnail-3.jpg" alt="P3" fill className="object-cover" /></div>
                                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg"><Image src="/images/projects/Thumbnail-4.jpg" alt="P4" fill className="object-cover" /></div>
                            </div>
                        </div>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible delay={0.2}>
                        <div>
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{t('Who We Are')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">{t('Cambodia Premier Partner')}</h2>
                            <p className="text-titan-navy/60 text-lg leading-relaxed mb-8">{getLocalizedText(aboutData.story as any, language as any)}</p>
                            <div className="space-y-4">
                                {(aboutData.values || []).map((val: any, idx: number) => (
                                    <div key={idx} className="p-6 bg-gray-50 rounded-2xl">
                                        <h3 className="font-bold text-titan-navy mb-1">{getLocalizedText(val.title, language)}</h3>
                                        <p className="text-sm text-titan-navy/60">{getLocalizedText(val.content, language)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* === MILESTONES === */}
            <section className="py-24 px-6 bg-gray-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent opacity-10"></div>
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{t('Our Journey')}</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">{t('Project Milestones')}</h2>
                    </div>

                    <div className="space-y-12 relative">
                        {/* Vertical line for the timeline */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block"></div>

                        {allMilestones.map((milestone: any, idx: number) => (
                            <FadeInWhenVisible key={idx} delay={idx * 0.1}>
                                <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-20`}>
                                    <div className="w-full md:w-1/2">
                                        <div className={`relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 ${idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                            <Image src={milestone.image} alt={milestone.year} fill className="object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                                            <div className="absolute bottom-6 left-6">
                                                <span className="text-5xl font-black text-white/40">{milestone.year}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle dot for timeline */}
                                    <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-titan-red border-4 border-gray-900 z-10 shadow-[0_0_20px_rgba(200,16,46,0.5)]"></div>

                                    <div className="w-full md:w-1/2 text-center md:text-left">
                                        <h3 className="text-2xl md:text-3xl font-black text-titan-red mb-4 uppercase tracking-tight">{getLocalizedText(milestone.title, language)}</h3>
                                        <p className="text-white/60 text-lg leading-relaxed mb-6">{getLocalizedText(milestone.desc, language)}</p>

                                        {milestone.projects && (
                                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                                {milestone.projects.map((proj: any, pidx: number) => (
                                                    <span key={pidx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/80">
                                                        {getLocalizedText(proj, language)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === ORG CHART SECTION === */}
            <section id="leadership" className="py-32 px-6 bg-gray-50 overflow-hidden relative">
                <div className="max-w-[1700px] mx-auto relative z-10">
                    <FadeInWhenVisible>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-[#002B5B] uppercase">{t('KIM MEX Organization Structure')}</h2>
                        </div>
                    </FadeInWhenVisible>
                    <div className="flex flex-col items-center space-y-16">
                        <OrgNode node={orgChart} onClick={handleMemberClick} language={language} />
                    </div>
                    {/* More nodes would go here dynamically if the full tree were implemented */}
                </div>
            </section>
        </div>
    );
}
