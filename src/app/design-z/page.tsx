import React from 'react';
import { ArrowRight, ShieldCheck, Trophy, PenTool, Layout, Ruler, Users, Hammer, CheckCircle2, Phone, Clock, Award, Target, Quote, Star, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeInWhenVisible } from './_components/Animations';
import UnifiedHero, { HeroMode } from './_components/UnifiedHero';

// --- CONFIGURATION ---
// Change this to 'video' or 'carousel' to switch the hero style
const HERO_STYLE: HeroMode = 'video';

export default function DesignGenX() {
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
            img: '/images/projects/Thumbnail-1.jpg',
            cat: 'Government',
            year: '2024',
            size: '45,000 sqm'
        },
        {
            id: 2,
            name: 'Vattanac Capital Extension',
            loc: 'Phnom Penh',
            img: '/images/projects/Thumbnail-2.jpg',
            cat: 'Commercial',
            year: '2023',
            size: '32,000 sqm'
        },
        {
            id: 3,
            name: 'Sihanoukville Port',
            loc: 'Sihanoukville',
            img: '/images/projects/Thumbnail-3.jpg',
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
            <UnifiedHero mode={HERO_STYLE} />

            {/* === WHY CHOOSE US === */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInWhenVisible>
                            <div>
                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Why Choose Kimmex</span>
                                <h2 className="text-4xl md:text-5xl font-black text-white mix-blend-difference mb-6 leading-tight">
                                    Building Excellence Since <span className="text-titan-red">1999</span>
                                </h2>
                                <p className="text-titan-navy/60 text-lg mb-8">
                                    With over 25 years of experience, we have established ourselves as Cambodia&apos;s most trusted construction partner, delivering projects that stand the test of time.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: ShieldCheck, title: 'Safety First', desc: 'Zero accident policy' },
                                        { icon: Award, title: 'ISO Certified', desc: '9001:2015 standards' },
                                        { icon: Clock, title: 'On-Time Delivery', desc: '98% completion rate' },
                                        { icon: Target, title: 'Quality Focus', desc: 'Exceeding expectations' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-6 bg-white border-l-4 border-titan-navy hover:border-titan-red transition-all shadow-xl">
                                            <div className="w-12 h-12 bg-gray-50 flex items-center justify-center shrink-0">
                                                <item.icon className="text-titan-navy" size={24} />
                                            </div>
                                            <div>
                                                <div className="font-black text-titan-navy uppercase text-xs tracking-wider mb-1">{item.title}</div>
                                                <div className="text-xs text-titan-navy/40 font-bold">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/design-z/about" className="inline-flex items-center gap-3 mt-10 text-titan-red font-black uppercase tracking-[0.3em] text-xs hover:gap-6 transition-all">
                                    Learn More About Us <ArrowRight size={16} />
                                </Link>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2}>
                            <div className="relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src="/images/projects/Thumbnail-4.jpg"
                                            alt="Construction Site"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg mt-8 md:mt-0">
                                        <Image
                                            src="/images/projects/Thumbnail-5.jpg"
                                            alt="Team Meeting"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg -mt-8 md:mt-0">
                                        <Image
                                            src="/images/projects/Thumbnail-6.jpg"
                                            alt="Architecture"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src="/images/projects/Thumbnail-7.jpg"
                                            alt="Building"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                </div>

                                {/* Experience Badge */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-orange text-white p-6 rounded-2xl shadow-xl text-center z-10 w-32 h-32 flex flex-col items-center justify-center">
                                    <div className="text-4xl font-black">25+</div>
                                    <div className="text-xs uppercase tracking-widest mt-1">Years of Excellence</div>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                        {services.map((s, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="bg-white p-10 group hover:bg-titan-navy transition-all duration-500 border border-gray-100 h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <s.icon size={80} />
                                    </div>
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-14 h-14 bg-titan-bg-alt flex items-center justify-center group-hover:bg-titan-red transition-all duration-300">
                                            <s.icon className="text-titan-navy group-hover:text-white transition-colors" size={26} />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-titan-navy group-hover:text-white mb-4 uppercase tracking-tighter">{s.title}</h3>
                                    <p className="text-titan-navy/50 group-hover:text-white/60 mb-8 text-sm leading-relaxed">{s.desc}</p>
                                    <ul className="space-y-3 pt-8 border-t border-gray-100 group-hover:border-white/10">
                                        {s.features.map((f, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-titan-navy/40 group-hover:text-white/40">
                                                <div className="w-1.5 h-1.5 bg-titan-red rounded-full"></div> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>

                    <FadeInWhenVisible>
                        <div className="text-center mt-12">
                            <Link href="/design-z/services" className="inline-flex items-center gap-2 bg-titan-navy text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-accent-orange transition-all rounded-lg">
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
                            <Link href="/design-z/projects" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-accent-orange font-bold uppercase tracking-widest text-sm hover:text-titan-navy transition-colors">
                                View All Projects <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map((p, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <Link href={`/design-z/projects/${p.id}`} className="group block h-full">
                                    <div className="relative overflow-hidden rounded-2xl shadow-lg h-80 w-full">
                                        <Image
                                            src={p.img}
                                            alt={p.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/20 to-transparent z-10"></div>

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-accent-orange text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                                                {p.cat}
                                            </span>
                                        </div>

                                        {/* Project Info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                            <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-accent-orange transition-colors">{p.name}</h3>
                                            <div className="flex items-center gap-4 text-white/60 text-sm">
                                                <span className="flex items-center gap-1"><MapPin size={14} /> {p.loc}</span>
                                                <span className="flex items-center gap-1"><Calendar size={14} /> {p.year}</span>
                                            </div>
                                        </div>

                                        {/* Hover Arrow */}
                                        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 z-20">
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
                                <div className="bg-gray-50 p-8 rounded-2xl relative h-full flex flex-col">
                                    <Quote className="text-accent-orange/20 absolute top-6 right-6" size={48} />
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.rating)].map((_, idx) => (
                                            <Star key={idx} className="text-accent-orange fill-accent-orange" size={18} />
                                        ))}
                                    </div>
                                    <p className="text-titan-navy/70 mb-6 relative z-10 leading-relaxed flex-grow">&ldquo;{t.quote}&rdquo;</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-titan-navy rounded-full flex items-center justify-center text-white font-bold shrink-0">
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
                            <Link href="/design-z/news" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-accent-orange font-bold uppercase tracking-widest text-sm hover:text-titan-navy transition-colors">
                                View All News <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Kimmex Awarded New Government Contract', date: 'Jan 15, 2026', cat: 'Corporate', img: '/images/projects/Thumbnail-8.jpg' },
                            { title: 'Sustainability Goals 2030 Achieved Early', date: 'Dec 20, 2025', cat: 'Environment', img: '/images/projects/Thumbnail-9.jpg' },
                            { title: 'Annual Charity Gala for Education', date: 'Nov 10, 2025', cat: 'CSR', img: '/images/projects/Thumbnail.jpg' }
                        ].map((news, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <div className="absolute top-4 left-4 bg-accent-orange text-white text-xs font-bold uppercase px-3 py-1 z-10 rounded">{news.cat}</div>
                                        <Image
                                            src={news.img}
                                            alt={news.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs font-bold uppercase tracking-widest text-titan-navy/40 mb-3 flex items-center gap-2">
                                            <Calendar size={14} /> {news.date}
                                        </div>
                                        <h3 className="text-xl font-bold text-titan-navy group-hover:text-accent-orange transition-colors leading-tight mb-4">{news.title}</h3>
                                        <span className="text-sm font-bold text-accent-orange flex items-center gap-2 mt-auto">
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
                                <Link href="/design-z/contact" className="bg-white text-titan-navy px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-titan-navy hover:text-white transition-all rounded-lg flex items-center gap-2">
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
                                        className="w-44 h-20 mx-4 bg-white rounded-xl flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer relative"
                                    >
                                        <Image
                                            src={`/patner/${num}.png`}
                                            alt={`Partner ${num}`}
                                            fill
                                            className="object-contain opacity-70 hover:opacity-100 transition-opacity p-2"
                                            sizes="200px"
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
                                        className="w-44 h-20 mx-4 bg-white rounded-xl flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer relative"
                                    >
                                        <Image
                                            src={`/patner/${num}.png`}
                                            alt={`Partner ${num}`}
                                            fill
                                            className="object-contain opacity-70 hover:opacity-100 transition-opacity p-2"
                                            sizes="200px"
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
