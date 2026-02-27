'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Trophy, PenTool, Layout, Ruler, Users, Hammer, CheckCircle2, Phone, Clock, Award, Target, Quote, Star, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeInWhenVisible } from './_components/Animations';
import UnifiedHero, { HeroMode } from './_components/UnifiedHero';

import { useLanguage } from './context/LanguageContext';

export default function DesignGenX() {
    const { t, language, fontClassName } = useLanguage();
    const [heroMode, setHeroMode] = React.useState<HeroMode>('video');

    const services = [
        {
            title: t('Design & Build'),
            desc: t('Full lifecycle solutions'),
            icon: PenTool,
            features: [t('Conceptual Design'), t('Structural Engineering'), t('Interior Design')],
            stat: '50+'
        },
        {
            title: t('Infrastructure'),
            desc: t('Building the backbone'),
            icon: Layout,
            features: [t('Roads & Bridges'), t('Water Treatment'), t('Public Works')],
            stat: '30+'
        },
        {
            title: t('Project Management'),
            desc: t('Strategic oversight & control'),
            icon: Users,
            features: [t('Cost Control'), t('Quality Assurance'), t('Safety Compliance')],
            stat: '100%'
        },
        {
            title: t('Renovation'),
            desc: t('Revitalizing structures'),
            icon: Ruler,
            features: [t('Structural Strengthening'), t('Facade Upgrades'), t('MEP Retrofitting')],
            stat: '40+'
        }
    ];

    const projects = [
        {
            id: 'mef',
            name: t('Ministry of Economy'),
            loc: t('Phnom Penh'),
            img: '/images/projects/Thumbnail-2.jpg',
            cat: t('Government'),
            year: '2023',
            size: '45,000 sqm'
        },
        {
            id: 'vattanac',
            name: t('Vattanac Capital Extension'),
            loc: t('Phnom Penh'),
            img: '/images/projects/Thumbnail-2.jpg',
            cat: t('Commercial'),
            year: '2023',
            size: '32,000 sqm'
        },
        {
            id: 'kt-wtp',
            name: t('Khleang Toeuk WTP'),
            loc: t('Phnom Penh'),
            img: '/images/projects/Thumbnail-1.jpg',
            cat: t('Infrastructure'),
            year: '2024',
            size: '120,000 sqm'
        },
    ];

    const testimonials = [
        {
            quote: t('Home Testimonials Desc'),
            author: "H.E. Minister of Economy",
            role: t('Government Client'),
            rating: 5
        },
        {
            quote: t('Slide 2 Desc'),
            author: "Mr. Chen Wei",
            role: "CEO, Vattanac Group",
            rating: 5
        },
        {
            quote: t('Exceeding expectations'),
            author: "Dr. Sarah Johnson",
            role: "World Bank Representative",
            rating: 5
        }
    ];

    return (
        <div className={fontClassName}>
            <UnifiedHero mode={heroMode} onToggle={(mode) => setHeroMode(mode)} />

            {/* === WHY CHOOSE US === */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInWhenVisible>
                            <div>
                                <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('Why Choose Kimmex')}</span>
                                <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6 leading-tight">
                                    {t('Building Excellence Since')} <span className="text-accent-orange">1999</span>
                                </h2>
                                <p className="text-titan-navy/60 text-lg mb-8">
                                    {t('Experience Desc')}
                                </p>

                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { icon: ShieldCheck, title: t('Safety First'), desc: t('Zero accident policy') },
                                        { icon: Award, title: t('ISO Certified'), desc: t('9001:2015 standards') },
                                        { icon: Clock, title: t('On-Time Delivery'), desc: t('98% completion rate') },
                                        { icon: Target, title: t('Quality Focus'), desc: t('Exceeding expectations') },
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
                                    {t('Learn More About Us')} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2}>
                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src="/images/projects/Thumbnail-4.jpg"
                                            alt={t('Construction Site')}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg mt-8">
                                        <Image
                                            src="/images/projects/Thumbnail-5.jpg"
                                            alt={t('Team Meeting')}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg -mt-8">
                                        <Image
                                            src="/images/projects/Thumbnail-6.jpg"
                                            alt={t('Architecture')}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src="/images/projects/Thumbnail-7.jpg"
                                            alt={t('Building')}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                </div>

                                {/* Experience Badge */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-orange text-white p-6 rounded-2xl shadow-xl text-center z-10 min-w-32">
                                    <div className="text-5xl font-black">25+</div>
                                    <div className="text-sm uppercase tracking-widest mt-1">{t('Years of Excellence')}</div>
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
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('Our Services')}</span>
                            <h2 className="text-4xl font-black text-titan-navy mb-4">{t('Comprehensive Construction Solutions')}</h2>
                            <p className="text-titan-navy/50 text-lg">{t('From design to completion')}</p>
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
                                {t('View All Services')} <ArrowRight size={16} />
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
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('Our Process')}</span>
                            <h2 className="text-4xl font-black text-white mb-4">{t('How We Work')}</h2>
                            <p className="text-white/50 text-lg">{t('A streamlined approach')}</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-[2px] bg-accent-orange/30 z-0"></div>

                        {[
                            { step: '01', title: t('Consultation'), desc: t('Consultation Desc'), icon: Target },
                            { step: '02', title: t('Planning'), desc: t('Planning Desc'), icon: PenTool },
                            { step: '03', title: t('Construction'), desc: t('Construction Desc'), icon: Hammer },
                            { step: '04', title: t('Handover'), desc: t('Handover Desc'), icon: Trophy }
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
                                <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('Our Portfolio')}</span>
                                <h2 className="text-4xl font-black text-titan-navy">{t('Featured Projects')}</h2>
                            </div>
                            <Link href="/design-x/projects" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-accent-orange font-bold uppercase tracking-widest text-sm hover:text-titan-navy transition-colors">
                                {t('View All Projects')} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map((p, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <Link href={`/design-x/projects/${p.id}`} className="group block h-full">
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
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('Testimonials')}</span>
                            <h2 className="text-4xl font-black text-titan-navy mb-4">{t('What Our Clients Say')}</h2>
                            <p className="text-titan-navy/50 text-lg">{t('Home Testimonials Desc')}</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t_item, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="bg-gray-50 p-8 rounded-2xl relative h-full flex flex-col">
                                    <Quote className="text-accent-orange/20 absolute top-6 right-6" size={48} />
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t_item.rating)].map((_, idx) => (
                                            <Star key={idx} className="text-accent-orange fill-accent-orange" size={18} />
                                        ))}
                                    </div>
                                    <p className="text-titan-navy/70 mb-6 relative z-10 leading-relaxed flex-grow">&ldquo;{t_item.quote}&rdquo;</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-titan-navy rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                            {t_item.author.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-titan-navy">{t_item.author}</div>
                                            <div className="text-sm text-titan-navy/50">{t_item.role}</div>
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
                                <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('News & Updates')}</span>
                                <h2 className="text-4xl font-black text-titan-navy">{t('Latest Insights')}</h2>
                            </div>
                            <Link href="/design-x/news" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-accent-orange font-bold uppercase tracking-widest text-sm hover:text-titan-navy transition-colors">
                                {t('View All News')} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: t('Kimmex Awarded New Government Contract'), date: 'Jan 15, 2026', cat: t('Corporate'), img: '/images/projects/Thumbnail-8.jpg' },
                            { title: t('Sustainability Goals 2030 Achieved Early'), date: 'Dec 20, 2025', cat: t('Environment'), img: '/images/projects/Thumbnail-9.jpg' },
                            { title: t('Annual Charity Gala for Education'), date: 'Nov 10, 2025', cat: t('CSR'), img: '/images/projects/Thumbnail.jpg' }
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
                                            {t('Read More')} <ArrowRight size={14} />
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
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t('Ready to Start Your Project?')}</h2>
                                <p className="text-white/80 text-lg max-w-xl">{t('Home CTA Desc')}</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/design-x/contact" className="bg-white text-titan-navy px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-titan-navy hover:text-white transition-all rounded-lg flex items-center gap-2">
                                    {t('Get Free Quote')} <ArrowRight size={16} />
                                </Link>
                                <a href="tel:+85523999999" className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-titan-navy transition-all rounded-lg flex items-center gap-2">
                                    <Phone size={16} /> {t('Call Now')}
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
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-2 block">{t('Our Partners')}</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white">
                                {t('Trusted By Leading Institutions')}
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center px-6 py-3 bg-white/10 rounded-lg">
                                <div className="text-2xl font-black text-accent-orange">50+</div>
                                <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{t('Partners')}</div>
                            </div>
                            <div className="text-center px-6 py-3 bg-white/10 rounded-lg">
                                <div className="text-2xl font-black text-accent-orange">25+</div>
                                <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{t('Years Trust')}</div>
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
            <div className={`mt-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest ${language === 'kh' ? 'font-siemreap' : ''}`}>
                {t('© 2026 Kimmex Construction • Internal Development Build')}
            </div>
        </div>
    );
}
