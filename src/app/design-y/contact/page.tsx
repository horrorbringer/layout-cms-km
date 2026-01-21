'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Linkedin, Instagram, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy selection:bg-titan-red selection:text-white">

            {/* --- HERO: COMMUNICATION HUB --- */}
            <header className="relative pt-48 pb-32 px-6 border-b border-titan-navy/10 bg-titan-bg overflow-hidden">
                {/* Technical Grid Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-2 h-2 bg-titan-red animate-pulse"></span>
                            <span className="font-mono text-xs uppercase tracking-widest text-titan-navy/60">/ Communication</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-titan-navy leading-[0.85] mb-8">
                            GET IN <br /> <span className="text-transparent stroke-text-navy">TOUCH</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-titan-navy font-light max-w-2xl leading-relaxed">
                            Ready to initiate your next landmark project? <br />
                            We are standing by to engineer your vision.
                        </p>
                    </div>

                    <div className="w-full md:w-auto border-l-2 border-titan-red pl-6 md:pl-12 py-2">
                        <div className="space-y-2">
                            <p className="font-mono text-xs uppercase tracking-widest text-titan-navy/50">Status</p>
                            <p className="text-lg font-bold text-titan-navy flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Online / Accepting Projects
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT: BLUEPRINT LAYOUT --- */}
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-screen border-x border-titan-navy/5">

                {/* LEFT: COORDINATES (SIDEBAR) */}
                <div className="lg:col-span-4 border-r border-titan-navy/5 p-8 md:p-16 bg-white relative">
                    <div className="sticky top-32">
                        <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest mb-12 border-b border-titan-navy/10 pb-4">01. Coordinates</h3>

                        <div className="space-y-16">
                            {/* Address */}
                            <div className="group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 border border-titan-navy/10 flex items-center justify-center text-titan-red group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                        <MapPin size={18} />
                                    </div>
                                    <span className="font-bold text-titan-navy uppercase tracking-widest text-sm">Headquarters</span>
                                </div>
                                <p className="text-titan-navy-subtle leading-relaxed pl-14 border-l border-titan-navy/10 text-lg">
                                    #56, Street 315, Boeng Kak 1,<br />
                                    Tuol Kouk, Phnom Penh,<br />
                                    Kingdom of Cambodia
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div className="group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 border border-titan-navy/10 flex items-center justify-center text-titan-red group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                        <Phone size={18} />
                                    </div>
                                    <span className="font-bold text-titan-navy uppercase tracking-widest text-sm">Direct Line</span>
                                </div>
                                <div className="pl-14 border-l border-titan-navy/10 space-y-2">
                                    <p className="text-xl font-bold text-titan-navy">+855 23 999 999</p>
                                    <p className="text-titan-navy-subtle text-sm">Mon - Sat: 08:00 - 17:00</p>
                                </div>
                            </div>

                            {/* Electronic Mail */}
                            <div className="group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 border border-titan-navy/10 flex items-center justify-center text-titan-red group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                        <Mail size={18} />
                                    </div>
                                    <span className="font-bold text-titan-navy uppercase tracking-widest text-sm">Electronic Mail</span>
                                </div>
                                <div className="pl-14 border-l border-titan-navy/10">
                                    <a href="mailto:info@kimmex.com" className="text-xl font-bold text-titan-navy hover:text-titan-red transition-colors decoration-titan-red underline underline-offset-4">info@kimmex.com</a>
                                </div>
                            </div>
                        </div>

                        {/* Social Signals */}
                        <div className="mt-20 pt-8 border-t border-titan-navy/10">
                            <span className="block font-mono text-xs text-titan-navy/40 uppercase tracking-widest mb-6">Signal Frequency</span>
                            <div className="flex gap-4">
                                {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                                    <a key={i} href="#" className="w-12 h-12 border border-titan-navy/10 flex items-center justify-center text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: INQUIRY FORM (MAIN) */}
                <div className="lg:col-span-8 bg-titan-bg/30 p-8 md:p-20">
                    <div className="max-w-3xl">
                        <div className="mb-12 flex justify-between items-end border-b border-titan-navy/10 pb-8">
                            <div>
                                <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest mb-4">02. Protocol</h3>
                                <h2 className="text-4xl font-black text-titan-navy">Project Inquiry Form</h2>
                            </div>
                            <span className="hidden md:block font-mono text-xs text-titan-navy/40 uppercase tracking-widest border border-titan-navy/10 px-3 py-1 bg-white">
                                SECURE TRANSMISSION
                            </span>
                        </div>

                        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                            {/* Section 1 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4 group">
                                    <label className="text-xs font-bold uppercase tracking-widest text-titan-navy group-hover:text-titan-red transition-colors">Identification / Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-titan-navy/20 py-4 text-xl font-bold text-titan-navy focus:border-titan-navy focus:outline-none transition-all placeholder:text-titan-navy/20" placeholder="John Doe" />
                                </div>
                                <div className="space-y-4 group">
                                    <label className="text-xs font-bold uppercase tracking-widest text-titan-navy group-hover:text-titan-red transition-colors">Contact / Email</label>
                                    <input type="email" className="w-full bg-transparent border-b border-titan-navy/20 py-4 text-xl font-bold text-titan-navy focus:border-titan-navy focus:outline-none transition-all placeholder:text-titan-navy/20" placeholder="john@company.com" />
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4 group">
                                    <label className="text-xs font-bold uppercase tracking-widest text-titan-navy group-hover:text-titan-red transition-colors">Project Type</label>
                                    <select className="w-full bg-transparent border-b border-titan-navy/20 py-4 text-xl font-bold text-titan-navy focus:border-titan-navy focus:outline-none transition-all cursor-pointer">
                                        <option>Commercial Construction</option>
                                        <option>Infrastructure</option>
                                        <option>Industrial Facility</option>
                                        <option>M.E.P Engineering</option>
                                        <option>Other Inquiry</option>
                                    </select>
                                </div>
                                <div className="space-y-4 group">
                                    <label className="text-xs font-bold uppercase tracking-widest text-titan-navy group-hover:text-titan-red transition-colors">Estimated Budget</label>
                                    <select className="w-full bg-transparent border-b border-titan-navy/20 py-4 text-xl font-bold text-titan-navy focus:border-titan-navy focus:outline-none transition-all cursor-pointer">
                                        <option>Select Range</option>
                                        <option>$100k - $500k</option>
                                        <option>$500k - $1M</option>
                                        <option>$1M - $5M</option>
                                        <option>$5M +</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-4 group">
                                <label className="text-xs font-bold uppercase tracking-widest text-titan-navy group-hover:text-titan-red transition-colors">Project Brief / Details</label>
                                <textarea rows={4} className="w-full bg-white border border-titan-navy/10 p-6 text-lg font-medium text-titan-navy focus:border-titan-navy focus:outline-none transition-all placeholder:text-titan-navy/20 resize-none" placeholder="Describe the scope and requirements..."></textarea>
                            </div>

                            {/* Action */}
                            <div className="pt-8 flex justify-end">
                                <button className="bg-titan-navy text-white px-12 py-6 font-bold uppercase tracking-widest hover:bg-titan-red transition-all shadow-xl flex items-center gap-4 group">
                                    <span>Transmit Inquiry</span>
                                    <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* --- MAP SECTION --- */}
            <section className="h-[500px] w-full bg-gray-200 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Map" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-titan-navy text-white px-8 py-4 flex items-center gap-4 shadow-2xl skew-x-[-10deg]">
                        <div className="skew-x-[10deg] flex items-center gap-4">
                            <MapPin className="text-titan-red animate-bounce" size={24} />
                            <div>
                                <p className="font-bold text-lg">KIMMEX HQ</p>
                                <p className="font-mono text-xs text-white/50 tracking-widest">11.5564° N, 104.9282° E</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .stroke-text-navy {
                    -webkit-text-stroke: 2px #0A192F;
                }
            `}</style>
        </div>
    );
}
