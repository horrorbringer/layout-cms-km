'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, Users, TrendingUp, Heart, Lightbulb, CheckCircle2, Quote, Handshake, Clock } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/design-a/Footer';

// --- HELPERS ---

function FadeInWhenVisible({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

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
        <div ref={ref} className="text-left bg-[#F5F5F7] p-8 rounded-[2rem] hover:bg-titan-navy group transition-colors duration-500 h-full">
            <div className="text-5xl md:text-6xl font-bold text-titan-navy group-hover:text-white mb-2 transition-colors">
                {count}{suffix}
            </div>
            <div className="text-sm uppercase tracking-widest text-titan-navy/50 group-hover:text-white/60 font-bold transition-colors">{label}</div>
        </div>
    );
}

// Org Chart Node Type
type OrgNodeData = {
    name: string;
    role: string;
    image?: string;
    children?: OrgNodeData[];
};

// Adapted Org Chart Node Component for Design A
function OrgTreeNode({ node, isRoot = false }: { node: OrgNodeData; isRoot?: boolean }) {
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className={`flex flex-col ${isRoot ? 'items-center' : 'items-start lg:items-center'} w-full lg:w-auto`}>
            {/* Node Card */}
            <FadeInWhenVisible>
                <div className={`relative z-10 bg-[#F5F5F7] hover:bg-titan-navy hover:text-white transition-all duration-300 group flex items-center lg:flex-col cursor-pointer
                    ${isRoot
                        ? 'p-8 rounded-[2.5rem] min-w-[300px] lg:w-80 flex-col text-center shadow-lg'
                        : 'p-4 rounded-[1.5rem] w-full max-w-md lg:w-60 lg:min-w-[200px]'}
                `}>
                    {/* Image Circle */}
                    <div className={`rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0 relative mr-4 lg:mr-0 lg:mb-4 group-hover:scale-105 transition-transform duration-500
                        ${isRoot
                            ? 'w-32 h-32 lg:w-40 lg:h-40 ring-4 ring-white'
                            : 'w-16 h-16 lg:w-24 lg:h-24'}
                    `}>
                        {node.image ? (
                            <img src={node.image} alt={node.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="font-black text-2xl text-titan-navy/20">
                                {node.name.split(' ').pop()?.charAt(0)}
                            </span>
                        )}
                    </div>

                    <div className={`${isRoot ? 'text-center' : 'text-left lg:text-center'}`}>
                        <h3 className={`font-bold uppercase leading-tight lg:mb-1 ${isRoot ? 'text-xl lg:text-2xl' : 'text-sm lg:text-base'} group-hover:text-white transition-colors`}>
                            {node.name}
                        </h3>
                        <p className={`font-bold uppercase tracking-widest ${isRoot ? 'text-titan-red text-sm mt-2' : 'text-[10px] text-titan-navy/60 group-hover:text-white/60'} transition-colors`}>
                            {node.role}
                        </p>
                    </div>
                </div>
            </FadeInWhenVisible>

            {/* Recursive Children & Connectors */}
            {hasChildren && (
                <div className="flex flex-col lg:items-center w-full lg:w-auto">
                    {/* DESKTOP: Vertical Line from Parent */}
                    <div className="hidden lg:block w-px h-8 bg-gray-300"></div>

                    {/* CHILDREN CONTAINER */}
                    <div className={`
                        relative flex 
                        flex-col lg:flex-row 
                        ml-6 pl-6 pt-6 border-l-2 border-dashed border-gray-200 space-y-6
                        lg:ml-0 lg:pl-0 lg:pt-8 lg:border-l-0 lg:space-y-0 lg:gap-8
                    `}>
                        {/* DESKTOP: Horizontal Connector Line */}
                        {node.children!.length > 1 && (
                            <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gray-300 w-[calc(100%-4rem)]"></div>
                        )}

                        {node.children!.map((child, index) => (
                            <div key={index} className="flex flex-col lg:items-center relative w-full lg:w-auto">

                                {/* MOBILE: Horizontal dash */}
                                <div className="lg:hidden absolute top-8 -left-6 w-6 h-0.5 bg-gray-200"></div>

                                {/* DESKTOP: Vertical Line to Child */}
                                {node.children!.length > 1 && (
                                    <div className={`hidden lg:block absolute top-[-2rem] w-px h-8 bg-gray-300 left-1/2 -translate-x-1/2`}></div>
                                )}

                                <OrgTreeNode node={child} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AboutPage() {
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

    const orgData: OrgNodeData = {
        name: 'Okhna. TOUCH KIM',
        role: 'Chief Executive Officer',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400',
        children: [
            {
                name: 'Mr. PAUCH BUNPHEAKDEY',
                role: 'Deputy General Manager',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
                children: [
                    { name: 'Mr. KRAI KEAK', role: 'MEP Operations Manager', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400' },
                    { name: 'Mr. CHHUNDY RYTA', role: 'Deputy Architect Manager', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400' },
                ]
            },
            {
                name: 'Mr. LENG VANNARITH',
                role: 'Finance Director',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
                children: []
            },
            {
                name: 'Mr. OUNG CHAKNORA',
                role: 'Senior Project Manager',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
                children: [
                    { name: 'Mr. TOUCH PUTHEANY', role: 'MEP Design Manager', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400&h=400' },
                    { name: 'Mr. RY KEN', role: 'Deputy QS Manager', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400&h=400' },
                ]
            },
            {
                name: 'Mr. SUM ROTANA',
                role: 'Project Manager',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
                children: []
            }
        ]
    };

    return (
        <main>
            {/* --- HEADER / HERO --- */}
            <header className="pt-32 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 min-h-[60vh] flex flex-col justify-end relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F5F5F7] -z-10 rounded-bl-[4rem] hidden lg:block"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <div className="inline-block px-4 py-2 bg-[#F5F5F7] rounded-lg text-xs font-bold uppercase tracking-widest text-titan-navy mb-6 md:mb-8 border border-titan-navy/5">
                        Est. 1999 • About Us
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
                        Building <br />
                        <span className="text-gray-300">Cambodia&apos;s Future.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
                        For over 25 years, KIM MEX Construction has been at the forefront of infrastructure development, transforming visions into landmarks.
                    </p>
                </motion.div>
            </header>

            {/* --- STATS --- */}
            <section className="px-6 md:px-12 mb-20 md:mb-32">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <AnimatedCounter value={25} suffix="+" label="Years Experience" />
                    <AnimatedCounter value={150} suffix="+" label="Projects Completed" />
                    <AnimatedCounter value={500} suffix="+" label="Team Members" />
                    <AnimatedCounter value={98} suffix="%" label="Client Satisfaction" />
                </div>
            </section>

            {/* --- WHO WE ARE --- */}
            <section className="px-6 md:px-12 py-20 bg-[#F5F5F7] rounded-[3rem] mx-0 md:mx-6 mb-20">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-6 mt-12">
                            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&fit=crop" className="rounded-[2rem] w-full h-64 object-cover shadow-lg" alt="Construction" />
                            <img src="https://images.unsplash.com/photo-1581094794329-c8112c4e5190?q=80&w=600&fit=crop" className="rounded-[2rem] w-full h-80 object-cover shadow-lg" alt="Team" />
                        </div>
                        <div className="space-y-6">
                            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&fit=crop" className="rounded-[2rem] w-full h-80 object-cover shadow-lg" alt="Building" />
                            <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&fit=crop" className="rounded-[2rem] w-full h-64 object-cover shadow-lg" alt="Architecture" />
                        </div>
                    </div>

                    <div>
                        <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">Who We Are</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">Cambodia&apos;s Premier <span className="text-gray-400">Construction Partner</span></h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-10">
                            Since 1999, KIM MEX Construction has been a cornerstone of Cambodia&apos;s infrastructure development. We are more than builders; we are partners in national progress, dedicated to delivering excellence in every beam, brick, and blueprint.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: Shield, title: 'Our Mission', desc: 'To bridge the gap between concept and reality through exceptional engineering.' },
                                { icon: Lightbulb, title: 'Our Vision', desc: 'To be the most trusted and innovative construction partner in Cambodia.' },
                                { icon: CheckCircle2, title: 'Our Goal', desc: 'To complete every project on time and within budget.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-titan-navy group-hover:bg-titan-navy group-hover:text-white transition-all shadow-sm shrink-0">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CEO MESSAGE --- */}
            <section className="px-6 md:px-12 py-20 mb-20">
                <div className="bg-titan-navy rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-titan-red/20 blur-[150px] rounded-full pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="order-2 lg:order-1">
                            <Quote className="text-titan-red mb-8 opacity-50" size={64} />
                            <blockquote className="text-2xl md:text-4xl font-bold leading-tight mb-12">
                                &ldquo;Construction is not just about concrete and steel. It&apos;s about building trust, fostering communities, and leaving a legacy that stands the test of time.&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold text-titan-red">TK</div>
                                <div>
                                    <div className="text-2xl font-bold">Okhna. TOUCH KIM</div>
                                    <div className="text-white/50 text-sm uppercase tracking-widest font-bold">Founder & CEO</div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden relative group">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="CEO" />
                            <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/50 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VALUES --- */}
            <section className="px-6 md:px-12 py-20 mb-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">What Drives Us</span>
                        <h2 className="text-3xl md:text-5xl font-bold">Our Core Values</h2>
                    </div>
                    <p className="text-gray-500 max-w-md text-lg">Principles that guide our every decision and project.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coreValues.map((value, i) => (
                        <FadeInWhenVisible key={i} delay={i * 0.1}>
                            <div className="bg-[#F5F5F7] p-10 rounded-[2.5rem] hover:bg-titan-navy hover:text-white transition-all duration-500 group h-full">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-titan-navy mb-8 group-hover:bg-white/10 group-hover:text-white transition-colors shadow-sm">
                                    <value.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="text-gray-500 group-hover:text-white/60 leading-relaxed transition-colors">
                                    {value.desc}
                                </p>
                            </div>
                        </FadeInWhenVisible>
                    ))}
                </div>
            </section>

            {/* --- TIMELINE --- */}
            <section className="px-6 md:px-12 py-20 bg-[#F5F5F7] rounded-[3rem] mx-0 md:mx-6 mb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Journey</h2>
                        <p className="text-gray-500">From humble beginnings to industry leader.</p>
                    </div>

                    <div className="space-y-12">
                        {milestones.map((item, i) => (
                            <FadeInWhenVisible key={i}>
                                <div className="flex flex-col md:flex-row gap-8 items-start group">
                                    <div className="md:w-32 shrink-0">
                                        <div className="text-4xl font-bold text-titan-navy/20 group-hover:text-titan-red transition-colors duration-500">{item.year}</div>
                                    </div>
                                    <div className="grow bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-titan-red/10">
                                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm mb-6">{item.desc}</p>
                                        <div className="h-48 rounded-2xl overflow-hidden">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- LEADERSHIP --- */}
            <section className="px-6 md:px-12 py-20 mb-20 overflow-hidden">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Leadership Team</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Guided by visionaries with decades of experience.</p>
                </div>

                <div className="overflow-x-auto pb-12 custom-scrollbar flex justify-center">
                    <OrgTreeNode node={orgData} isRoot={true} />
                </div>
            </section>

            {/* --- CERTIFICATIONS --- */}
            <section className="px-6 md:px-12 py-20 bg-titan-navy text-white rounded-[3rem] mx-0 md:mx-6 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">Our Standards</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">Quality & Safety <span className="text-titan-red">First</span></h2>
                        <p className="text-white/60 text-lg leading-relaxed mb-10">
                            We implement rigorous Quality Assurance (QA) and Quality Control (QC) protocols on every site. Our safety record is a testament to our commitment.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: Shield, title: 'ISO 9001:2015', desc: 'Quality Management Certified' },
                                { icon: Award, title: 'Zero Accidents', desc: 'Safety record policy' },
                                { icon: CheckCircle2, title: '100% Compliance', desc: 'Building code adherence' },
                                { icon: Clock, title: 'On-Time Delivery', desc: '98% completion rate' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="text-titan-red">
                                        <item.icon size={28} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg mb-1">{item.title}</div>
                                        <div className="text-white/40 text-sm">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&fit=crop" className="rounded-[2.5rem] shadow-2xl" alt="Safety" />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
