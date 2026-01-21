'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Facebook, Linkedin, Youtube, Instagram, MapPin, Mail, Phone, Globe } from 'lucide-react';

export default function FooterY() {
    const currentYear = new Date().getFullYear();
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-titan-navy text-white relative overflow-hidden font-sans border-t-[20px] border-titan-red">

            {/* --- BIG CTA SECTION --- */}
            <div className="border-b border-white/10">
                <div className="max-w-[1600px] mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
                    <div className="max-w-3xl">
                        <p className="text-titan-red font-mono text-sm uppercase tracking-widest mb-6">/ Ready to initiate</p>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                            BUILDING <span className="text-transparent stroke-text-white">TOMORROW</span> <br /> TODAY.
                        </h2>
                    </div>
                    <Link href="/design-y/contact" className="group flex items-center gap-6 bg-white text-titan-navy px-12 py-8 text-lg font-bold uppercase tracking-widest hover:bg-titan-red hover:text-white transition-all duration-300">
                        <span>Start Project</span>
                        <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" size={24} />
                    </Link>
                </div>
            </div>

            {/* --- TECHNICAL GRID SITEMAP --- */}
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-white/10">

                {/* CONTACT COL */}
                <div className="border-r border-b lg:border-b-0 border-white/10 p-10 lg:p-16 hover:bg-white/5 transition-colors duration-500 group">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-2 h-2 bg-titan-red rounded-full animate-pulse"></div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-titan-navy-subtle group-hover:text-white transition-colors">Coordinates</h4>
                    </div>

                    <ul className="space-y-8">
                        <li className="flex gap-4 group/item cursor-pointer">
                            <MapPin className="text-titan-red mt-1" size={18} />
                            <span className="text-sm leading-relaxed text-titan-navy-subtle group-hover/item:text-white transition-colors">
                                #123 Monivong Blvd, <br />
                                Boeung Keng Kang 1, <br />
                                Phnom Penh, Cambodia
                            </span>
                        </li>
                        <li className="flex gap-4 items-center group/item cursor-pointer">
                            <Phone className="text-titan-red" size={18} />
                            <span className="text-sm font-medium text-titan-navy-subtle group-hover/item:text-white transition-colors">+855 23 999 888</span>
                        </li>
                        <li className="flex gap-4 items-center group/item cursor-pointer">
                            <Mail className="text-titan-red" size={18} />
                            <span className="text-sm font-medium text-titan-navy-subtle group-hover/item:text-white transition-colors">info@kimmex.com.kh</span>
                        </li>
                    </ul>
                </div>

                {/* SITEMAP COL 1 */}
                <div className="border-r border-b lg:border-b-0 border-white/10 p-10 lg:p-16 hover:bg-white/5 transition-colors duration-500 group">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-2 h-2 bg-titan-navy-subtle rounded-full group-hover:bg-titan-red transition-colors"></div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-titan-navy-subtle group-hover:text-white transition-colors">Company</h4>
                    </div>
                    <ul className="space-y-4">
                        {[
                            { label: 'Our Story', href: '/design-y/about' },
                            { label: 'Leadership', href: '/design-y/about#leadership' },
                            { label: 'Safety Policy', href: '/design-y/about#safety' },
                            { label: 'Careers', href: '/design-y/careers' },
                            { label: 'Newsroom', href: '/design-y/news' },
                        ].map((link, i) => (
                            <li key={i}>
                                <Link href={link.href} className="flex items-center justify-between text-titan-navy-subtle hover:text-white transition-colors border-b border-white/5 py-2 group/link">
                                    <span className="text-sm font-bold tracking-wide">{link.label}</span>
                                    <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity text-titan-red" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* SITEMAP COL 2 */}
                <div className="border-r border-b lg:border-b-0 border-white/10 p-10 lg:p-16 hover:bg-white/5 transition-colors duration-500 group">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-2 h-2 bg-titan-navy-subtle rounded-full group-hover:bg-titan-red transition-colors"></div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-titan-navy-subtle group-hover:text-white transition-colors">Expertise</h4>
                    </div>
                    <ul className="space-y-4">
                        {[
                            'General Construction',
                            'Design & Build',
                            'Infrastructure',
                            'M.E.P Systems',
                            'Steel Structures',
                            'Consultancy'
                        ].map((item, i) => (
                            <li key={i}>
                                <Link href="#" className="flex items-center justify-between text-titan-navy-subtle hover:text-white transition-colors border-b border-white/5 py-2 group/link">
                                    <span className="text-sm font-bold tracking-wide">{item}</span>
                                    <span className="text-[10px] font-mono text-white/30 group-hover/link:text-titan-red">0{i + 1}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* SOCIAL & LEGAL */}
                <div className="border-r border-white/10 p-10 lg:p-16 hover:bg-white/5 transition-colors duration-500 group flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-2 h-2 bg-titan-navy-subtle rounded-full group-hover:bg-titan-red transition-colors"></div>
                            <h4 className="font-mono text-xs uppercase tracking-widest text-titan-navy-subtle group-hover:text-white transition-colors">Connect</h4>
                        </div>
                        <div className="flex gap-4">
                            {[Facebook, Linkedin, Youtube, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-titan-red hover:border-titan-red hover:text-white text-white/50 transition-all duration-300">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12">
                        <img src="/logo.png" alt="Kimmex" className="h-12 w-auto mb-6" />
                        <p className="text-xs text-titan-navy-subtle leading-loose">
                            &copy; {currentYear} Kimmex Co., Ltd.<br />
                            <a href="#" className="hover:text-white underline decoration-white/30 underline-offset-4">Privacy Policy</a> &nbsp;|&nbsp; <a href="#" className="hover:text-white underline decoration-white/30 underline-offset-4">Terms</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* --- BOTTOM BAR --- */}
            <div className="border-t border-white/10 bg-titan-bg/5">
                <div className="max-w-[1600px] mx-auto px-6 py-6 flex justify-between items-center">
                    <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-titan-navy-subtle">
                        <span>Ver. 2.5.0 (Build 2024)</span>
                        <span className="hidden md:inline">Server Time: {time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-titan-navy-subtle hover:text-white cursor-pointer transition-colors">
                        <Globe size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Global / EN</span>
                    </div>
                </div>
            </div>

            {/* Styling for stroke text */}
            <style jsx>{`
                .stroke-text-white {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
                }
            `}</style>
        </footer>
    );
}
