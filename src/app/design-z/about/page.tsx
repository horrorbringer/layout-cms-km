'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Target, Eye, Flag, Shield, Award, Users, TrendingUp, Heart, Lightbulb, Handshake, Clock, CheckCircle2, Building2, HardHat, Quote, ArrowRight } from 'lucide-react';
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

// Org Chart Node Type
type OrgNodeData = {
    name: string;
    role: string;
    image?: string;
    children?: OrgNodeData[];
};

// Recursive Org Chart Node Component
function OrgTreeNode({ node, isRoot = false }: { node: OrgNodeData; isRoot?: boolean }) {
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className={`flex flex-col ${isRoot ? 'items-center' : 'items-start lg:items-center'} w-full lg:w-auto`}>
            <FadeInWhenVisible>
                <Link href={`/design-z/team/${node.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                    <div className={`relative z-10 transition-all duration-300 hover:-translate-y-1 group flex items-center lg:flex-col cursor-pointer border
                        ${isRoot
                            ? 'rounded-none border-b-4 border-titan-red bg-titan-navy text-white p-8 min-w-[280px] lg:w-80 flex-col text-center shadow-2xl'
                            : 'rounded-none border-l-4 border-titan-navy bg-white text-titan-navy p-5 w-full max-w-md lg:w-60 lg:min-w-[220px] hover:border-titan-red shadow-lg'
                        }
                    `}>
                        {/* Status/Dept Badge (Mockup) */}
                        {!isRoot && (
                            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-500 animate-pulse lg:hidden"></div>
                        )}

                        {/* Image Circle */}
                        <div className={`rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 relative mr-5 lg:mr-0 lg:mb-5 group-hover:scale-105 transition-transform duration-500 border-4
                            ${isRoot
                                ? 'w-24 h-24 lg:w-32 lg:h-32 border-titan-navy group-hover:scale-105'
                                : 'w-16 h-16 lg:w-20 lg:h-20 border-gray-200 group-hover:border-titan-red'
                            }
                        `}>
                            {node.image ? (
                                <Image src={node.image} alt={node.name} fill className="object-cover" />
                            ) : (
                                <span className={`font-black ${isRoot ? 'text-4xl text-white/20' : 'text-xl text-titan-navy/20'}`}>
                                    {node.name.split(' ').pop()?.charAt(0)}
                                </span>
                            )}
                        </div>

                        <div className={`${isRoot ? 'text-center' : 'text-left lg:text-center'}`}>
                            {isRoot && <div className="text-titan-red font-bold uppercase tracking-[0.2em] text-xs mb-2">Leadership</div>}

                            <h3 className={`font-black uppercase leading-tight lg:mb-2 ${isRoot ? 'text-xl lg:text-2xl text-white' : 'text-sm lg:text-base text-titan-navy group-hover:text-titan-red transition-colors'}`}>
                                {node.name}
                            </h3>
                            <p className={`font-bold uppercase tracking-widest ${isRoot ? 'text-sm text-white/60' : 'text-[10px] text-titan-navy/50'}`}>
                                {node.role}
                            </p>
                        </div>

                        {/* Decorative effects removed for flat design */}
                    </div>
                </Link>
            </FadeInWhenVisible>

            {/* Recursive Children & Connectors */}
            {hasChildren && (
                <div className="flex flex-col lg:items-center w-full lg:w-auto">
                    {/* DESKTOP: Vertical Line from Parent */}
                    <div className="hidden lg:block w-px h-10 bg-gray-300"></div>

                    {/* CHILDREN CONTAINER */}
                    <div className={`
                        relative flex 
                        flex-col lg:flex-row 
                        
                        /* Mobile: Indented vertical list */
                        ml-8 pl-8 pt-8 border-l border-gray-300 space-y-6
                        
                        /* Desktop: Horizontal row (Reset Mobile) */
                        lg:ml-0 lg:pl-0 lg:pt-10 lg:border-l-0 lg:space-y-0 lg:gap-10
                    `}>
                        {/* DESKTOP: Horizontal Connector Line */}
                        {node.children!.length > 1 && (
                            <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gray-300 w-[calc(100%-2rem)]"></div>
                        )}

                        {node.children!.map((child, index) => (
                            <div key={index} className="flex flex-col lg:items-center relative w-full lg:w-auto">

                                {/* MOBILE: Horizontal dash from vertical line to child */}
                                <div className="lg:hidden absolute top-8 -left-8 w-8 h-px bg-gray-300"></div>

                                {/* DESKTOP: Vertical Line to Child */}
                                {node.children!.length > 1 && (
                                    <div className={`hidden lg:block absolute top-[-2.5rem] w-px h-10 bg-gray-300 left-1/2 -translate-x-1/2`}></div>
                                )}

                                <div className="relative w-full lg:w-auto">
                                    {/* DESKTOP: Connector upwards if multiple children */}
                                    {node.children!.length > 1 && (
                                        <div className="hidden lg:block absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-gray-300"></div>
                                    )}

                                    {/* DESKTOP: Horizontal Line Segment for this child */}
                                    {node.children!.length > 1 && (
                                        <>
                                            {/* Left half line */}
                                            {index > 0 && (
                                                <div className="hidden lg:block absolute -top-10 right-1/2 w-[calc(50%+4px)] h-px bg-gray-300"></div>
                                            )}
                                            {/* Right half line */}
                                            {index < node.children!.length - 1 && (
                                                <div className="hidden lg:block absolute -top-10 left-1/2 w-[calc(50%+4px)] h-px bg-gray-300"></div>
                                            )}
                                        </>
                                    )}

                                    <OrgTreeNode node={child} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
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
                    <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/60 via-titan-navy/40 to-titan-navy"></div>
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
            <section className="py-32 px-6 bg-white relative overflow-hidden">
                {/* Decorative background accent */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-titan-bg rounded-full -translate-y-1/2 translate-x-1/2 -z-10 opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-titan-red/5 rounded-full translate-y-1/2 -translate-x-1/2 -z-10"></div>

                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        {/* Left: Asymmetrical Image Grid */}
                        <FadeInWhenVisible>
                            <div className="relative">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-7 pt-12">
                                        <div className="relative h-[250px] lg:h-[350px] w-full rounded-2xl shadow-2xl overflow-hidden group">
                                            <Image
                                                src="/images/projects/Thumbnail-4.jpg"
                                                alt="Construction"
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-5">
                                        <div className="relative h-[200px] lg:h-[280px] w-full rounded-2xl shadow-2xl overflow-hidden group">
                                            <Image
                                                src="/images/projects/Thumbnail-5.jpg"
                                                alt="Team"
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-5 -mt-20 z-10">
                                        <div className="relative h-[180px] lg:h-[240px] w-full rounded-2xl shadow-2xl overflow-hidden group border-4 border-white">
                                            <Image
                                                src="/images/projects/Thumbnail-6.jpg"
                                                alt="Architecture"
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-7">
                                        <div className="relative h-[220px] lg:h-[300px] w-full rounded-2xl shadow-2xl overflow-hidden group border-4 border-white">
                                            <Image
                                                src="/images/projects/Thumbnail-1.jpg"
                                                alt="Building"
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 bg-titan-red text-white p-10 rounded-2xl shadow-[0_30px_60px_-12px_rgba(209,26,42,0.4)] hidden md:block z-20">
                                    <div className="text-5xl font-black mb-1">25+</div>
                                    <div className="text-xs uppercase tracking-[0.3em] font-bold text-white/90">Years of<br />Excellence</div>
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        {/* Right: Content */}
                        <FadeInWhenVisible delay={0.2}>
                            <div className="lg:pl-10">
                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-6 block">Our Heritage</span>
                                <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-titan-navy mb-8 leading-tight">
                                    Engineering a <span className="text-titan-red">Bolder Tomorrow</span> for Cambodia
                                </h2>
                                <p className="text-titan-navy/70 text-lg leading-relaxed mb-10">
                                    Founded in 1999, KIM MEX Construction & Investment has evolved from a local contractor into a national leader. We combine traditional Cambodian craftsmanship with modern global engineering standards to build structures that inspire and endure.
                                </p>

                                <div className="grid grid-cols-1 gap-8">
                                    {[
                                        { icon: Flag, title: 'Our Mission', desc: 'To provide superior construction services through innovative solutions, safety, and sustainable practices.', color: 'titan-red' },
                                        { icon: Eye, title: 'Our Vision', desc: 'To be Cambodia\'s most respected construction firm, recognized for quality and integrity.', color: 'titan-navy' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <div className="w-16 h-16 bg-titan-bg rounded-2xl flex items-center justify-center text-titan-navy shadow-sm shrink-0 border border-gray-100 group-hover:border-titan-red transition-colors">
                                                <item.icon size={26} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-titan-navy mb-2">{item.title}</h3>
                                                <p className="text-titan-navy/60 text-base leading-relaxed">{item.desc}</p>
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
            {/* === CEO MESSAGE === */}
            <section className="py-32 px-6 bg-[#0a0f1d] relative overflow-hidden">
                {/* Immersive Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-titan-red/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                </div>

                <div className="max-w-[1400px] mx-auto relative z-10">
                    <FadeInWhenVisible>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            {/* Left: Immersive Image */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-titan-red/20 rounded-2xl blur-2xl group-hover:bg-titan-red/30 transition-all duration-700 opacity-50"></div>
                                <div className="relative h-[550px] lg:h-[700px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800&h=1000"
                                        alt="CEO"
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-80"></div>

                                    <div className="absolute bottom-10 left-10">
                                        <div className="text-white font-black text-3xl mb-1">Okhna. TOUCH KIM</div>
                                        <div className="text-titan-red font-bold uppercase tracking-widest text-sm">Founder & Chairman</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: The Message */}
                            <div className="relative py-10">
                                <Quote className="text-titan-red/20 absolute -top-10 -left-10" size={160} />

                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-6 block relative z-10">Leadership Philosophy</span>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-10 leading-tight relative z-10">
                                    Building more than just <span className="text-titan-red">Structures</span>
                                </h2>

                                <blockquote className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-12 italic relative z-10">
                                    &ldquo;For over two decades, our mission has remained unchanged: to serve Cambodia with integrity and excellence. We see every project as an opportunity to strengthen the foundation of our nation and leave a legacy of quality for future generations.&rdquo;
                                </blockquote>

                                <div className="space-y-6 relative z-10">
                                    <p className="text-white/60 text-lg leading-relaxed">
                                        At KIM MEX, we don&apos;t just follow blueprints; we realize dreams. Our team of dedicated professionals works tirelessly to ensure that every structure we build is a testament to our commitment to safety, innovation, and sustainable development.
                                    </p>
                                    <Link href="/design-z/contact" className="inline-flex items-center gap-2 text-titan-red font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all group">
                                        Partner with us <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* === CORE VALUES === */}
            <section className="py-32 px-6 bg-white relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="text-center mb-24">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">The KIM MEX Spirit</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy leading-tight">
                                Our <span className="text-titan-red">Core Values</span>
                            </h2>
                            <p className="text-titan-navy/50 text-lg max-w-2xl mx-auto mt-6">
                                These principles are the mortar that holds our projects and people together, ensuring excellence in everything we do.
                            </p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {coreValues.map((value, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="bg-white p-10 rounded-3xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-3 border border-gray-100 group transition-all duration-500 h-full relative overflow-hidden">
                                    {/* Decorative numbering */}
                                    <div className="absolute top-8 right-8 text-7xl font-black text-titan-bg group-hover:text-titan-red/5 transition-colors duration-500">
                                        0{i + 1}
                                    </div>

                                    <div className="w-20 h-20 bg-titan-bg rounded-2xl flex items-center justify-center text-titan-navy mb-10 group-hover:bg-titan-red group-hover:text-white group-hover:rotate-6 transition-all duration-500 relative z-10">
                                        <value.icon size={32} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-titan-navy mb-4 group-hover:text-titan-red transition-colors relative z-10">{value.title}</h3>
                                    <p className="text-titan-navy/60 text-lg leading-relaxed relative z-10">{value.desc}</p>

                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-titan-red group-hover:w-full transition-all duration-700"></div>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section >

            {/* === MILESTONES TIMELINE === */}
            < section className="py-24 px-6 bg-gray-50" >
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
                                        <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-white border-2 border-titan-red rounded-full -translate-x-1/2 shadow-lg z-10 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-titan-red rounded-full"></div>
                                        </div>

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

            {/* === SUSTAINABILITY SECTION === */}
            <section className="py-32 px-6 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <FadeInWhenVisible className="order-2 lg:order-1">
                            <div className="relative">
                                <span className="text-green-600 font-bold uppercase tracking-widest text-sm mb-6 block">Building for the Future</span>
                                <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-8 leading-tight">
                                    Our Commitment to <span className="text-green-600">Sustainability</span>
                                </h2>
                                <p className="text-titan-navy/60 text-lg leading-relaxed mb-10">
                                    We believe that construction shouldn&apos;t come at the cost of our environment. KIM MEX is dedicated to eco-friendly building practices, sustainable material sourcing, and energy-efficient designs that minimize our carbon footprint.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { title: 'Eco-Friendly Materials', desc: 'Sourcing renewable and low-impact construction materials.' },
                                        { title: 'Energy Efficiency', desc: 'Implementing smart building tech to reduce energy waste.' },
                                        { title: 'Waste Reduction', desc: 'Rigorous on-site recycling and waste management protocols.' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-5 group">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1 shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-titan-navy mb-1">{item.title}</h4>
                                                <p className="text-titan-navy/50 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2} className="order-1 lg:order-2">
                            <div className="relative h-[450px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
                                    alt="Sustainable Building"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-green-900/10 backdrop-blur-[2px]"></div>
                                {/* Floating Stat */}
                                <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                                    <div className="text-3xl font-black text-green-600">30%</div>
                                    <div className="text-xs uppercase tracking-widest font-bold text-titan-navy/60">Waste Reduction Goal</div>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>
            </section>

            {/* === STRATEGIC PARTNERSHIPS === */}
            <section className="py-20 bg-titan-bg border-y border-gray-100 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="text-center mb-12">
                            <span className="text-titan-navy/40 font-bold uppercase tracking-[0.3em] text-xs">Trusted By Industry Leaders</span>
                        </div>
                    </FadeInWhenVisible>

                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                        {['Concrete Solutions', 'Steel Experts', 'EcoBuild', 'Urban Planning Co', 'SafeTech', 'Logistics Global'].map((partner, i) => (
                            <div key={partner} className="text-xl md:text-2xl font-black text-titan-navy tracking-tighter">
                                {partner.toUpperCase()}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === LEADERSHIP TEAM (Org Chart) === */}
            <section className="py-24 px-6 bg-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="max-w-[1400px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="text-center mb-20">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Our People</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-4">Organizational Structure</h2>
                            <p className="text-titan-navy/50 text-lg max-w-2xl mx-auto">
                                Led by industry veterans with a shared vision for excellence and sustainable growth.
                            </p>
                        </div>
                    </FadeInWhenVisible>

                    {/* ORG CHART VISUALIZATION */}
                    <div className="relative overflow-x-auto pb-12 custom-scrollbar">
                        <div className="min-w-max px-4 flex justify-center">
                            <OrgTreeNode node={orgData} isRoot={true} />
                        </div>
                    </div>
                </div>
            </section>

            {/* === CERTIFICATIONS & QUALITY === */}
            <section className="py-32 px-6 bg-[#0a0f1d] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <FadeInWhenVisible>
                            <div>
                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-6 block">Our Rigorous Standards</span>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                                    Quality Assurance <br /><span className="text-titan-red">& Zero-Harm</span> Culture
                                </h2>
                                <p className="text-white/60 text-lg leading-relaxed mb-12">
                                    Our commitment to quality isn&apos;t just a certification—it&apos;s a daily practice. From the first shovel in the ground to the final inspection, we maintain the highest international standards of safety and engineering excellence.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {[
                                        { icon: Shield, title: 'ISO 9001:2015', desc: 'Certified Quality Management' },
                                        { icon: Award, title: 'Health & Safety', desc: 'Zero-Harm site protocols' },
                                        { icon: CheckCircle2, title: 'Compliance', desc: '100% building code adherence' },
                                        { icon: HardHat, title: 'Expert Team', desc: 'Licensed professional engineers' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-titan-red/30 transition-all duration-500 group">
                                            <div className="w-14 h-14 bg-titan-red/10 rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:scale-110 group-hover:bg-titan-red group-hover:text-white transition-all duration-500">
                                                <item.icon size={26} />
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-lg mb-1">{item.title}</div>
                                                <div className="text-white/40 text-sm">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2}>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-titan-red/20 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-3xl">
                                    <Image
                                        src="/images/projects/Thumbnail-6.jpg"
                                        alt="Quality Inspection"
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-60"></div>
                                </div>

                                {/* Floating Achievement Card */}
                                <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-2xl hidden md:flex items-center gap-6 border border-gray-100">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-inner">
                                        <Award size={32} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-titan-navy line-height-1">98%</div>
                                        <div className="text-xs uppercase tracking-widest font-bold text-titan-navy/40">Safety Excellence Score</div>
                                    </div>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>
            </section>

            {/* === CTA SECTION === */}
            <section className="py-20 px-6 bg-titan-red relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
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
