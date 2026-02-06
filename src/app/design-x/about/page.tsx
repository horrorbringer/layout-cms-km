'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Target, Eye, Flag, Shield, Award, Users, TrendingUp, Heart, Lightbulb, Handshake, Clock, CheckCircle2, Building2, HardHat, Quote, X, Mail, Linkedin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
                className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row min-h-[500px]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 w-10 h-10 bg-white shadow-lg text-titan-navy hover:bg-titan-red hover:text-white rounded-full transition-all duration-300 flex items-center justify-center group"
                >
                    <X size={20} className="transition-transform group-hover:rotate-90" />
                </button>

                {/* Left: Image Side */}
                <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/40 to-transparent"></div>

                    {/* Floating Info on Image */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest mb-2">
                            <Shield size={10} className="text-titan-red" />
                            Verified Leadership
                        </div>
                    </div>
                </div>

                {/* Right: Info Side */}
                <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col relative">
                    {/* Background Decorative Text */}
                    <div className="absolute top-10 right-10 text-[100px] font-black text-gray-50 -z-10 select-none pb-0 leading-none">
                        KM
                    </div>

                    <div className="mb-10 relative">
                        <span className="text-titan-red font-black uppercase tracking-[0.2em] text-xs block mb-3">{member.role}</span>
                        <h3 className="text-4xl font-black text-titan-navy uppercase leading-[1.1] tracking-tight">{member.name}</h3>
                        <div className="w-20 h-1.5 bg-titan-red mt-6 rounded-full"></div>
                    </div>

                    <div className="flex-grow">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-titan-navy/30 mb-4 italic">Executive Biography</h4>
                        <div className="space-y-6 text-titan-navy/70 leading-relaxed font-medium">
                            {member.bio ? (
                                <p className="text-lg leading-relaxed">{member.bio}</p>
                            ) : (
                                <>
                                    <p className="text-lg leading-relaxed">
                                        An integral part of KIM MEX Construction, {member.name.split('.').pop()?.trim()} brings specialized expertise and a results-driven approach to the {member.role.toLowerCase()} division.
                                    </p>
                                    <p>
                                        Focused on operational efficiency and upholding our core values of excellence and safety, they play a vital role in delivering landmark projects across the Kingdom.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-titan-navy/5 flex items-center justify-center text-titan-navy">
                                <Users size={18} />
                            </div>
                            <div className="text-[11px] leading-tight">
                                <div className="font-bold text-titan-navy uppercase">Member Since</div>
                                <div className="text-titan-navy/50">Core Leadership Team</div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-titan-navy/30 hover:border-titan-red hover:text-titan-red transition-all cursor-pointer">
                                <Mail size={16} />
                            </div>
                            <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-titan-navy/30 hover:border-titan-red hover:text-titan-red transition-all cursor-pointer">
                                <Linkedin size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Team Member Card Component
function TeamMemberCard({ member, isCEO = false, onClick }: { member: any; isCEO?: boolean; onClick?: (member: any) => void }) {
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
                    alt={member.name}
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
                    {member.name}
                </h3>
                <p className={`text-accent-orange font-bold uppercase tracking-[0.1em] ${isCEO ? 'text-sm' : 'text-[10px] lg:text-[11px]'}`}>
                    {member.role}
                </p>
            </div>
        </div>
    );
}

// Language context hook (placeholder for export found in layout, assuming direct import or use)
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const [selectedMember, setSelectedMember] = React.useState<any>(null);

    const handleMemberClick = (member: any) => {
        setSelectedMember(member);
    };

    const coreValues = [
        { icon: Shield, title: 'Integrity', desc: 'We uphold the highest ethical standards in every project and relationship.' },
        { icon: Award, title: 'Excellence', desc: 'We strive for perfection in every beam, brick, and blueprint we deliver.' },
        { icon: Handshake, title: 'Partnership', desc: 'We build lasting relationships with clients, partners, and communities.' },
        { icon: Lightbulb, title: 'Innovation', desc: 'We embrace new technologies and methods to deliver better solutions.' },
        { icon: Heart, title: 'Safety First', desc: 'We prioritize the wellbeing of our team and everyone on our sites.' },
        { icon: TrendingUp, title: 'Growth', desc: 'We continuously improve and invest in our people and capabilities.' },
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

    const ceo = {
        name: 'Okhna. TOUCH KIM',
        role: 'Chief Executive Officer',
        image: '/images/team-leadership/touch_kim.png',
        bio: 'Okhna Touch Kim founded KIM MEX Construction in 1999 with a vision to revolutionize the Cambodian construction landscape. With over 25 years of leadership, he has steered the company from a small team of engineers to a premier national contractor. His philosophy of "Integrity in every build" continues to drive the company\'s success.'
    };

    const managersL2 = [
        {
            name: 'Mr. PAUCH BUNPHEAKDEY',
            role: 'Deputy General Manager',
            image: '/images/team-leadership/pauch_bunpheakdey.jpeg',
            bio: 'As Deputy General Manager, Mr. Pauch ensures operational excellence across all departments. He brings over 18 years of experience in construction management and strategic planning.'
        },
        {
            name: 'Mr. LENG VANNARITH',
            role: 'Finance Director',
            image: '/images/team-leadership/leng_vannarith.jpeg',
            bio: 'Mr. Leng overlooks the financial health of KIM MEX, ensuring sustainable growth and robust fiscal policies that allow for ambitious project undertakings.'
        },
        {
            name: 'Mr. OUNG CHAKNORA',
            role: 'Senior Project Manager',
            image: '/images/team-leadership/oung_chaknora.jpeg',
            bio: 'Leading our largest developments, Mr. Oung is known for his rigorous attention to detail and ability to deliver complex high-rise projects ahead of schedule.'
        },
        {
            name: 'Mr. SUM ROTANA',
            role: 'Project Manager',
            image: '/images/team-leadership/sum_rotana.jpeg',
            bio: 'Mr. Sum specializes in commercial and industrial projects, coordinating diverse teams to ensure safety and quality standards are met at every stage.'
        },
        {
            name: 'Mr. KRAI KEAK',
            role: 'MEP Operation Manager',
            image: '/images/team-leadership/krai_keak.jpeg',
            bio: 'Overseeing Mechanical, Electrical, and Plumbing operations, Mr. Krai ensures that the vital systems of our buildings function perfectly and efficiently.'
        },
    ];

    const managersL3 = [
        {
            name: 'Mr. CHHUNDY RYTA',
            role: 'Deputy Architect Manager',
            image: '/images/team-leadership/chhundy_ryta.jpeg',
            bio: 'Mr. Chhundy brings creative vision to life, working closely with clients to translate their dreams into structural reality while strictly adhering to codes.'
        },
        {
            name: 'Mr. TOUCH PUTHEANY',
            role: 'MEP Design Manager',
            image: '/images/team-leadership/touch_putheany.jpeg',
            bio: 'Leading the MEP design team, Mr. Touch focuses on sustainable and energy-efficient system designs for modern infrastructure.'
        },
        {
            name: 'Mr. RY KEN',
            role: 'Deputy QS Manager',
            image: '/images/team-leadership/ry_ken.jpeg',
            bio: 'With precision and expertise, Mr. Ry manages quantity surveying, ensuring accurate cost estimation and resource management for all projects.'
        },
        {
            name: 'Mr. HONG BUNNA',
            role: 'Warehouse Manager',
            image: '/images/team-leadership/hong_bunna.jpeg',
            bio: 'Mr. Hong manages logistics and inventory, ensuring that materials are available on-site exactly when needed to maintain project timelines.'
        },
    ];

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">

            {/* === HERO SECTION === */}
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-titan-navy">
                {/* Parallax Background */}
                <motion.div style={{ y: heroY }} className="absolute inset-0">
                    <Image
                        src="/images/projects/Thumbnail-6.jpg"
                        alt="Construction Site"
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

                                <div className="space-y-6">
                                    {[
                                        { icon: Flag, title: 'Our Mission', desc: 'To bridge the gap between concept and reality through exceptional engineering, rigorous safety standards, and a commitment to client satisfaction.' },
                                        { icon: Eye, title: 'Our Vision', desc: 'To be the most trusted and innovative construction partner in Cambodia, setting new standards for quality, safety, and sustainable development.' },
                                        { icon: Target, title: 'Our Goal', desc: 'To complete every project on time and within budget while maintaining zero-accident safety records.' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-5 group">
                                            <div className="w-14 h-14 bg-titan-red/10 rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                                <item.icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-titan-navy mb-1 group-hover:text-titan-red transition-colors">{item.title}</h3>
                                                <p className="text-titan-navy/50 text-sm leading-relaxed">{item.desc}</p>
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
                                        src="/images/team-leadership/touch_kim.png"
                                        alt="Okhna. TOUCH KIM"
                                        fill
                                        className="object-contain object-bottom bg-gray-50"
                                    />
                                </div>
                            </div>

                            {/* Right: Message Content */}
                            <div className="lg:col-span-7 bg-gray-50 p-8 md:p-12 rounded-2xl relative">
                                <Quote className="text-titan-navy mb-6" size={48} strokeWidth={1.5} />

                                <h3 className="text-xl md:text-2xl font-bold text-titan-navy mb-6">Message From CEO</h3>

                                <blockquote className="text-lg md:text-xl text-titan-navy/80 italic leading-loose mb-10 font-serif">
                                    &ldquo;At KIM MEX, we believe that construction is not just about concrete and steel, but about building current and future dreams. Our commitment to integrity and quality has been the cornerstone of our success for over 20 years. We look forward to continuing to build the foundations of Cambodia&apos;s growth.&rdquo;
                                </blockquote>

                                <div>
                                    <div className="text-titan-navy font-black text-xl uppercase mb-1">Okhna. TOUCH KIM</div>
                                    <div className="text-titan-navy/60 text-xs font-bold uppercase tracking-widest">Chief Executive Officer</div>
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
                            <h2 className="text-4xl font-black text-titan-navy uppercase mb-16 tracking-tight">Organization Structure</h2>
                        </div>
                    </FadeInWhenVisible>

                    <div className="overflow-x-auto pb-12">
                        <div className="min-w-[1000px] flex flex-col items-center">

                            {/* LEVEL 1: CEO */}
                            <div className="relative mb-16">
                                <TeamMemberCard member={ceo} isCEO onClick={handleMemberClick} />
                                {/* Connector Down (halfway to row 2) */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200"></div>
                            </div>

                            {/* LEVEL 2 */}
                            <div className="relative w-full mb-16 px-[5%]">
                                {/* Horizontal Line 1 (at 50% of gap above L2) */}
                                <div className="absolute top-[-2rem] left-[10%] right-[10%] h-px bg-gray-200"></div>

                                <div className="grid grid-cols-5 gap-4">
                                    {managersL2.map((member, i) => (
                                        <div key={i} className="flex justify-center relative">
                                            {/* Vertical Tick Up to Horizontal Line */}
                                            <div className="absolute top-[-2rem] left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200"></div>

                                            <TeamMemberCard member={member} onClick={handleMemberClick} />

                                            {/* Vertical Tick Down to Horizontal Line below */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* LEVEL 3 */}
                            <div className="relative w-full px-[12%]">
                                {/* Horizontal Line 2 (at 50% of gap above L3) */}
                                <div className="absolute top-[-2rem] left-[12.5%] right-[12.5%] h-px bg-gray-200"></div>

                                <div className="grid grid-cols-4 gap-4">
                                    {managersL3.map((member, i) => (
                                        <div key={i} className="flex justify-center relative">
                                            {/* Vertical Tick Up to Horizontal Line */}
                                            <div className="absolute top-[-2rem] left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200"></div>

                                            <TeamMemberCard member={member} onClick={handleMemberClick} />
                                        </div>
                                    ))}
                                </div>
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
                                {/* Floating Card */}
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
                            <Link href="/design-x/contact" className="bg-white text-titan-navy px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-titan-navy hover:text-white transition-all rounded-lg">
                                Contact Us
                            </Link>
                            <Link href="/design-x/projects" className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-titan-navy transition-all rounded-lg">
                                View Projects
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

