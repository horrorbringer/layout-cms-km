'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Trophy, PenTool, Layout, Ruler, Users, HardHat, Building2, Wrench, CheckCircle2, Phone, Clock, Award, Target, Hammer, TrendingUp, Quote, Star, MapPin, Calendar } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';

// Animation wrapper component
function FadeInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay }}
        >
            {children}
        </motion.div>
    );
}

export default function DesignGenX() {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);

    const services = [
        {
            title: 'Design & Build',
            desc: 'End-to-end solutions from concept to completion with integrated design and construction.',
            icon: PenTool,
            features: ['Conceptual Design', 'Structural Engineering', 'Interior Design'],
            stat: '50+'
        },
        {
            title: 'Infrastructure',
            desc: 'Building the backbone of communities with bridges, roads, and utilities.',
            icon: Layout,
            features: ['Roads & Bridges', 'Water Treatment', 'Public Works'],
            stat: '30+'
        },
        {
            title: 'Project Management',
            desc: 'Rigorous oversight ensuring on-time, on-budget delivery for every client.',
            icon: Users,
            features: ['Cost Control', 'Quality Assurance', 'Safety Compliance'],
            stat: '100%'
        },
        {
            title: 'Renovation',
            desc: 'Revitalizing existing structures to meet modern standards and aesthetics.',
            icon: Ruler,
            features: ['Structural Strengthening', 'Facade Upgrades', 'MEP Retrofitting'],
            stat: '40+'
        }
    ];

    const projects = [
        {
            id: 1,
            name: 'Ministry of Economy',
            loc: 'Phnom Penh',
            img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
            cat: 'Government',
            year: '2024',
            size: '45,000 sqm'
        },
        {
            id: 2,
            name: 'Vattanac Capital Extension',
            loc: 'Phnom Penh',
            img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop',
            cat: 'Commercial',
            year: '2023',
            size: '32,000 sqm'
        },
        {
            id: 3,
            name: 'Sihanoukville Port',
            loc: 'Sihanoukville',
            img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2670&auto=format&fit=crop',
            cat: 'Infrastructure',
            year: '2024',
            size: '120,000 sqm'
        },
    ];

    const testimonials = [
        {
            quote: "Kimmex delivered our project on time and exceeded our quality expectations. Their professionalism is unmatched.",
            author: "H.E. Minister of Economy",
            role: "Government Client",
            rating: 5
        },
        {
            quote: "Working with Kimmex was a seamless experience. They understood our vision and brought it to life perfectly.",
            author: "Mr. Chen Wei",
            role: "CEO, Vattanac Group",
            rating: 5
        },
        {
            quote: "The attention to safety and quality standards sets Kimmex apart from other contractors in Cambodia.",
            author: "Dr. Sarah Johnson",
            role: "World Bank Representative",
            rating: 5
        }
    ];

    return (
        <>
            {/* === HERO SECTION === */}
            <header className="relative min-h-screen overflow-hidden bg-titan-navy">
                <motion.div style={{ y: heroY }} className="absolute inset-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                    >
                        <source src="/hero-construction.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-titan-navy/70"></div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-32 right-10 w-64 h-64 border-2 border-accent-orange/20 rounded-full hidden lg:block"></div>
                <div className="absolute top-48 right-24 w-32 h-32 border-2 border-white/10 rounded-full hidden lg:block"></div>

                {/* Main Content */}
                <div className="relative z-10 min-h-screen max-w-[1400px] mx-auto px-6 flex items-center pt-32 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex items-center gap-4 mb-6"
                            >
                                <div className="w-16 h-1 bg-accent-orange"></div>
                                <span className="text-accent-orange font-bold tracking-[0.2em] uppercase text-sm">
                                    Since 1999
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tight"
                            >
                                WE BUILD
                                <br />
                                <span className="text-accent-orange">YOUR VISION</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-lg md:text-xl text-white/70 max-w-lg mb-10 leading-relaxed"
                            >
                                Cambodia&apos;s premier construction company delivering world-class infrastructure, commercial buildings, and government projects with precision and excellence.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link href="/design-x/projects" className="group bg-accent-orange text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-titan-navy transition-all duration-300 flex items-center gap-3 rounded">
                                    <span>Our Projects</span>
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                </Link>
                                <Link href="/design-x/contact" className="group border-2 border-white text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-titan-navy transition-all duration-300 flex items-center gap-3 rounded">
                                    <Phone size={18} />
                                    <span>Contact Us</span>
                                </Link>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="flex gap-8 mt-12 pt-8 border-t border-white/20"
                            >
                                {[
                                    { val: '150+', label: 'Projects' },
                                    { val: '25+', label: 'Years' },
                                    { val: '500+', label: 'Team' },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-4xl font-black text-accent-orange">{stat.val}</div>
                                        <div className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right Content - Featured Project Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="hidden lg:block"
                        >
                            <div className="relative">
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                                        alt="Featured Project"
                                        className="w-full h-[500px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-transparent to-transparent"></div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <span className="inline-block bg-accent-orange text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">Featured Project</span>
                                        <h3 className="text-white text-3xl font-bold">Ministry of Economy</h3>
                                        <p className="text-white/60 text-sm mt-2 flex items-center gap-2">
                                            <MapPin size={14} /> Phnom Penh, Cambodia
                                        </p>
                                    </div>
                                </div>

                                {/* Floating Stats */}
                                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                                            <Award className="text-accent-orange" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black text-titan-navy">A+</div>
                                            <div className="text-xs text-titan-navy/50 uppercase tracking-wider">Rating</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -top-4 -right-4 bg-titan-navy p-4 rounded-xl shadow-xl">
                                    <div className="text-accent-orange text-2xl font-black">ISO</div>
                                    <div className="text-white text-xs">9001:2015</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 cursor-pointer z-20"
                >
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Scroll</span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1.5 h-1.5 bg-accent-orange rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Bottom Service Tags */}
                <div className="absolute bottom-0 left-0 right-0 bg-white z-20">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4">
                            {[
                                { icon: Building2, label: 'Commercial', desc: 'High-rise & Office' },
                                { icon: HardHat, label: 'Industrial', desc: 'Factory & Warehouse' },
                                { icon: Layout, label: 'Infrastructure', desc: 'Roads & Bridges' },
                                { icon: Wrench, label: 'Renovation', desc: 'Restore & Upgrade' },
                            ].map((item, i) => (
                                <Link href="/design-x/services" key={i} className="group px-6 py-5 border-r border-gray-100 last:border-r-0 hover:bg-accent-orange transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <item.icon size={24} className="text-accent-orange group-hover:text-white transition-colors" />
                                        <div>
                                            <div className="font-bold text-titan-navy group-hover:text-white transition-colors">{item.label}</div>
                                            <div className="text-xs text-titan-navy/50 group-hover:text-white/80 transition-colors">{item.desc}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* === WHY CHOOSE US === */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInWhenVisible>
                            <div>
                                <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">Why Choose Kimmex</span>
                                <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6 leading-tight">
                                    Building Excellence Since <span className="text-accent-orange">1999</span>
                                </h2>
                                <p className="text-titan-navy/60 text-lg mb-8">
                                    With over 25 years of experience, we have established ourselves as Cambodia&apos;s most trusted construction partner, delivering projects that stand the test of time.
                                </p>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { icon: ShieldCheck, title: 'Safety First', desc: 'Zero accident policy' },
                                        { icon: Award, title: 'ISO Certified', desc: '9001:2015 standards' },
                                        { icon: Clock, title: 'On-Time Delivery', desc: '98% completion rate' },
                                        { icon: Target, title: 'Quality Focus', desc: 'Exceeding expectations' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center shrink-0">
                                                <item.icon className="text-accent-orange" size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-titan-navy">{item.title}</div>
                                                <div className="text-sm text-titan-navy/50">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/design-x/about" className="inline-flex items-center gap-2 mt-8 text-accent-orange font-bold uppercase tracking-widest text-sm hover:text-titan-navy transition-colors">
                                    Learn More About Us <ArrowRight size={16} />
                                </Link>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2}>
                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
                                        alt="Construction Site"
                                        className="rounded-2xl h-64 w-full object-cover shadow-lg"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1581094794329-c8112c4e5190?q=80&w=800&auto=format&fit=crop"
                                        alt="Team Meeting"
                                        className="rounded-2xl h-64 w-full object-cover shadow-lg mt-8"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
                                        alt="Architecture"
                                        className="rounded-2xl h-64 w-full object-cover shadow-lg -mt-8"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
                                        alt="Building"
                                        className="rounded-2xl h-64 w-full object-cover shadow-lg"
                                    />
                                </div>
                                
                                {/* Experience Badge */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-orange text-white p-6 rounded-2xl shadow-xl text-center">
                                    <div className="text-5xl font-black">25+</div>
                                    <div className="text-sm uppercase tracking-widest mt-1">Years of Excellence</div>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>
            </section>

            {/* === SERVICES === */}
            <section className="py-24 bg-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">Our Services</span>
                            <h2 className="text-4xl font-black text-titan-navy mb-4">Comprehensive Construction Solutions</h2>
                            <p className="text-titan-navy/50 text-lg">From design to completion, we offer end-to-end construction services tailored to your needs.</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((s, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="bg-white p-8 group hover:-translate-y-2 transition-all duration-300 rounded-2xl border-2 border-gray-100 hover:border-accent-orange hover:shadow-xl h-full">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-14 h-14 bg-accent-orange/10 rounded-xl flex items-center justify-center group-hover:bg-accent-orange transition-all duration-300">
                                            <s.icon className="text-accent-orange group-hover:text-white transition-colors" size={26} />
                                        </div>
                                        <div className="text-3xl font-black text-accent-orange/20 group-hover:text-accent-orange/40 transition-colors">
                                            {s.stat}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-titan-navy mb-3 group-hover:text-accent-orange transition-colors">{s.title}</h3>
                                    <p className="text-titan-navy/50 mb-6 text-sm leading-relaxed">{s.desc}</p>
                                    <ul className="space-y-2 border-t border-gray-100 pt-6">
                                        {s.features.map((f, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-titan-navy/60 group-hover:text-titan-navy/80 transition-colors">
                                                <CheckCircle2 size={16} className="text-accent-orange shrink-0" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>

                    <FadeInWhenVisible>
                        <div className="text-center mt-12">
                            <Link href="/design-x/services" className="inline-flex items-center gap-2 bg-titan-navy text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-accent-orange transition-all rounded-lg">
                                View All Services <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* === WORKING PROCESS === */}
            <section className="py-24 bg-titan-navy">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">Our Process</span>
                            <h2 className="text-4xl font-black text-white mb-4">How We Work</h2>
                            <p className="text-white/50 text-lg">A streamlined approach ensuring quality, efficiency, and transparency at every stage.</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-[2px] bg-accent-orange/30 z-0"></div>

                        {[
                            { step: '01', title: 'Consultation', desc: 'Understanding your vision and requirements', icon: Target },
                            { step: '02', title: 'Planning', desc: 'Detailed blueprints and project timeline', icon: PenTool },
                            { step: '03', title: 'Construction', desc: 'Expert execution with safety first', icon: Hammer },
                            { step: '04', title: 'Handover', desc: 'Quality inspection and delivery', icon: Trophy }
                        ].map((s, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="w-32 h-32 bg-titan-navy-light rounded-2xl border-2 border-accent-orange/30 flex flex-col items-center justify-center mb-6 group-hover:border-accent-orange group-hover:bg-accent-orange/10 transition-all duration-300">
                                        <s.icon className="text-accent-orange mb-2" size={32} />
                                        <span className="text-2xl font-black text-white">{s.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                                    <p className="text-sm text-white/50 max-w-[200px]">{s.desc}</p>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === FEATURED PROJECTS === */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                            <div>
                                <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">Our Portfolio</span>
                                <h2 className="text-4xl font-black text-titan-navy">Featured Projects</h2>
                            </div>
                            <Link href="/design-x/projects" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-accent-orange font-bold uppercase tracking-widest text-sm hover:text-titan-navy transition-colors">
                                View All Projects <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map((p, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <Link href={`/design-x/projects/${p.id}`} className="group block">
                                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                                        <img 
                                            src={p.img} 
                                            alt={p.name} 
                                            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/20 to-transparent"></div>
                                        
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-accent-orange text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                                                {p.cat}
                                            </span>
                                        </div>

                                        {/* Project Info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-accent-orange transition-colors">{p.name}</h3>
                                            <div className="flex items-center gap-4 text-white/60 text-sm">
                                                <span className="flex items-center gap-1"><MapPin size={14} /> {p.loc}</span>
                                                <span className="flex items-center gap-1"><Calendar size={14} /> {p.year}</span>
                                            </div>
                                        </div>

                                        {/* Hover Arrow */}
                                        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                            <ArrowRight size={18} className="text-titan-navy" />
                                        </div>
                                    </div>
                                </Link>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === TESTIMONIALS === */}
            <section className="py-24 bg-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
                            <h2 className="text-4xl font-black text-titan-navy mb-4">What Our Clients Say</h2>
                            <p className="text-titan-navy/50 text-lg">Trusted by government ministries, international organizations, and leading corporations.</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="bg-gray-50 p-8 rounded-2xl relative">
                                    <Quote className="text-accent-orange/20 absolute top-6 right-6" size={48} />
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.rating)].map((_, idx) => (
                                            <Star key={idx} className="text-accent-orange fill-accent-orange" size={18} />
                                        ))}
                                    </div>
                                    <p className="text-titan-navy/70 mb-6 relative z-10 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-titan-navy rounded-full flex items-center justify-center text-white font-bold">
                                            {t.author.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-titan-navy">{t.author}</div>
                                            <div className="text-sm text-titan-navy/50">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === LATEST NEWS === */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                            <div>
                                <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">News & Updates</span>
                                <h2 className="text-4xl font-black text-titan-navy">Latest Insights</h2>
                            </div>
                            <Link href="/design-x/news" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-accent-orange font-bold uppercase tracking-widest text-sm hover:text-titan-navy transition-colors">
                                View All News <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Kimmex Awarded New Government Contract', date: 'Jan 15, 2026', cat: 'Corporate', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop' },
                            { title: 'Sustainability Goals 2030 Achieved Early', date: 'Dec 20, 2025', cat: 'Environment', img: 'https://images.unsplash.com/photo-1581092921461-eab62496096b?q=80&w=800&auto=format&fit=crop' },
                            { title: 'Annual Charity Gala for Education', date: 'Nov 10, 2025', cat: 'CSR', img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop' }
                        ].map((news, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <div className="absolute top-4 left-4 bg-accent-orange text-white text-xs font-bold uppercase px-3 py-1 z-10 rounded">{news.cat}</div>
                                        <img src={news.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={news.title} />
                                    </div>
                                    <div className="p-6">
                                        <div className="text-xs font-bold uppercase tracking-widest text-titan-navy/40 mb-3 flex items-center gap-2">
                                            <Calendar size={14} /> {news.date}
                                        </div>
                                        <h3 className="text-xl font-bold text-titan-navy group-hover:text-accent-orange transition-colors leading-tight mb-4">{news.title}</h3>
                                        <span className="text-sm font-bold text-accent-orange flex items-center gap-2">
                                            Read More <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CTA SECTION === */}
            <section className="py-24 bg-accent-orange">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="text-center lg:text-left">
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to Start Your Project?</h2>
                                <p className="text-white/80 text-lg max-w-xl">Contact us today for a free consultation and let&apos;s build something extraordinary together.</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/design-x/contact" className="bg-white text-titan-navy px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-titan-navy hover:text-white transition-all rounded-lg flex items-center gap-2">
                                    Get Free Quote <ArrowRight size={16} />
                                </Link>
                                <a href="tel:+85523999999" className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-titan-navy transition-all rounded-lg flex items-center gap-2">
                                    <Phone size={16} /> Call Now
                                </a>
                            </div>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* === TRUSTED PARTNERS === */}
            <section className="py-20 bg-titan-navy overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 mb-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-2 block">Our Partners</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white">
                                Trusted By Leading Institutions
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center px-6 py-3 bg-white/10 rounded-lg">
                                <div className="text-2xl font-black text-accent-orange">50+</div>
                                <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Partners</div>
                            </div>
                            <div className="text-center px-6 py-3 bg-white/10 rounded-lg">
                                <div className="text-2xl font-black text-accent-orange">25+</div>
                                <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Years Trust</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Marquee Row 1 */}
                <div className="relative mb-6">
                    <div className="flex animate-marquee">
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex shrink-0">
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <div
                                        key={`${setIndex}-${num}`}
                                        className="w-44 h-20 mx-4 bg-white rounded-xl flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    >
                                        <img
                                            src={`/patner/${num}.png`}
                                            alt={`Partner ${num}`}
                                            className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Marquee Row 2 */}
                <div className="relative">
                    <div className="flex animate-marquee-reverse">
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex shrink-0">
                                {[7, 9, 10, 11, 1, 2].map((num) => (
                                    <div
                                        key={`${setIndex}-${num}`}
                                        className="w-44 h-20 mx-4 bg-white rounded-xl flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    >
                                        <img
                                            src={`/patner/${num}.png`}
                                            alt={`Partner ${num}`}
                                            className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
