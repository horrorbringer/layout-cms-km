'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Target, Eye, Flag, Shield, Award, Users, TrendingUp, Heart, Lightbulb, Handshake, Clock, CheckCircle2, Building2, HardHat, Quote } from 'lucide-react';
import Link from 'next/link';

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
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
            image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop'
        },
        {
            year: '2005',
            title: 'First Major Project',
            desc: 'Completed our first government infrastructure project, establishing our reputation for quality and reliability in the public sector.',
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop'
        },
        {
            year: '2012',
            title: 'Major Expansion',
            desc: 'Following successful commercial projects in Phnom Penh, we expanded operations to Siem Reap and Sihanoukville, securing contracts for major hotel resorts.',
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop'
        },
        {
            year: '2018',
            title: 'ISO Certification',
            desc: 'Our commitment to excellence was recognized with ISO 9001:2015 accreditation, validating our rigorous Quality Management Systems and safety protocols.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop'
        },
        {
            year: '2023',
            title: 'National Recognition',
            desc: 'Awarded "Top Infrastructure Partner" by the Ministry of Public Works for our contribution to national road development projects.',
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop'
        }
    ];

    const leadership = [
        { name: 'Okhna. TOUCH KIM', role: 'Chief Executive Officer', image: '/team/ceo.jpg' },
        { name: 'Mr. PAUCH BUNPHEAKDEY', role: 'Deputy General Manager', image: '/team/dgm.jpg' },
        { name: 'Mr. LENG VANNARITH', role: 'Finance Director', image: '/team/fd.jpg' },
        { name: 'Mr. OUNG CHAKNORA', role: 'Senior Project Manager', image: '/team/spm.jpg' },
        { name: 'Mr. SUM ROTANA', role: 'Project Manager', image: '/team/pm.jpg' },
    ];

    const departmentHeads = [
        { name: 'Mr. KRAI KEAK', role: 'MEP Operations Manager', image: '/team/mep.jpg' },
        { name: 'Mr. CHHUNDY RYTA', role: 'Deputy Architect Manager', image: '/team/arch.jpg' },
        { name: 'Mr. TOUCH PUTHEANY', role: 'MEP Design Manager', image: '/team/design.jpg' },
        { name: 'Mr. RY KEN', role: 'Deputy QS Manager', image: '/team/qs.jpg' },
    ];

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">

            {/* === HERO SECTION === */}
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-titan-navy">
                {/* Parallax Background */}
                <motion.div style={{ y: heroY }} className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"
                        alt="Construction Site"
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
                                        <img
                                            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop"
                                            alt="Construction"
                                            className="rounded-2xl shadow-lg h-48 w-full object-cover"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1581094794329-c8112c4e5190?q=80&w=600&auto=format&fit=crop"
                                            alt="Team"
                                            className="rounded-2xl shadow-lg h-64 w-full object-cover"
                                        />
                                    </div>
                                    <div className="space-y-4 pt-8">
                                        <img
                                            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop"
                                            alt="Architecture"
                                            className="rounded-2xl shadow-lg h-64 w-full object-cover"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop"
                                            alt="Building"
                                            className="rounded-2xl shadow-lg h-48 w-full object-cover"
                                        />
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
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-[1400px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="bg-titan-navy rounded-3xl overflow-hidden shadow-2xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Left: Image */}
                                <div className="relative min-h-[400px] lg:min-h-[500px]">
                                    <img
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                                        alt="CEO"
                                        className="absolute inset-0 w-full h-full object-cover"
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
                                        <div className="w-16 h-16 rounded-full bg-titan-red/20 flex items-center justify-center text-titan-red text-2xl font-black">
                                            TK
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
                                            <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-100">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                            </div>
                                        </div>
                                    </div>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* === LEADERSHIP TEAM === */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="text-center mb-16">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Our People</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-4">Leadership Team</h2>
                            <p className="text-titan-navy/50 text-lg max-w-2xl mx-auto">
                                Meet the experienced professionals who guide our company towards excellence.
                            </p>
                        </div>
                    </FadeInWhenVisible>

                    {/* CEO - Featured */}
                    <FadeInWhenVisible>
                        <div className="flex justify-center mb-16">
                            <div className="text-center group">
                                <div className="w-48 h-60 md:w-56 md:h-72 bg-gradient-to-br from-titan-navy to-titan-navy-light rounded-2xl overflow-hidden shadow-xl mx-auto mb-6 ring-4 ring-titan-red/20 group-hover:ring-titan-red/50 transition-all duration-300">
                                    <div className="w-full h-full bg-titan-navy/20 flex items-center justify-center">
                                        <span className="text-6xl font-black text-white/20">TK</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-titan-navy uppercase">Okhna. TOUCH KIM</h3>
                                <p className="text-titan-red text-sm font-bold uppercase tracking-widest mt-1">Founder & CEO</p>
                            </div>
                        </div>
                    </FadeInWhenVisible>

                    {/* Connector Line */}
                    <div className="hidden lg:flex justify-center mb-8">
                        <div className="w-px h-12 bg-gray-200"></div>
                    </div>

                    {/* Senior Management */}
                    <FadeInWhenVisible delay={0.1}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
                            {leadership.slice(1).map((leader, i) => (
                                <div key={i} className="text-center group">
                                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md mx-auto mb-4 group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300">
                                        <div className="w-full h-full bg-titan-navy/10 flex items-center justify-center">
                                            <span className="text-3xl font-black text-titan-navy/20">
                                                {leader.name.split(' ').pop()?.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-bold text-titan-navy uppercase leading-tight">{leader.name}</h4>
                                    <p className="text-xs text-titan-navy/40 uppercase tracking-wider mt-1">{leader.role}</p>
                                </div>
                            ))}
                        </div>
                    </FadeInWhenVisible>

                    {/* Department Heads */}
                    <FadeInWhenVisible delay={0.2}>
                        <div className="relative mb-12">
                            <div className="absolute inset-x-0 top-1/2 h-px bg-gray-100"></div>
                            <div className="relative bg-white px-6 mx-auto w-fit">
                                <span className="text-titan-navy/40 text-xs font-bold uppercase tracking-widest">Department Heads</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                            {departmentHeads.map((leader, i) => (
                                <div key={i} className="text-center group">
                                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-sm mx-auto mb-3 group-hover:shadow-md transition-all duration-300">
                                        <div className="w-full h-full bg-titan-navy/5 flex items-center justify-center">
                                            <span className="text-2xl font-black text-titan-navy/10">
                                                {leader.name.split(' ').pop()?.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="text-xs font-bold text-titan-navy uppercase leading-tight">{leader.name}</h4>
                                    <p className="text-[10px] text-titan-navy/40 uppercase tracking-wider mt-1">{leader.role}</p>
                                </div>
                            ))}
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* === CERTIFICATIONS & QUALITY === */}
            <section className="py-24 px-6 bg-titan-navy">
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
                                <img
                                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
                                    alt="Safety Inspection"
                                    className="rounded-2xl shadow-2xl"
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

        </div>
    );
}
