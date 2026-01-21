'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Linkedin, Instagram, ArrowRight, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-gray-50 min-h-screen font-sans text-titan-navy relative">
            {/* --- HERO --- */}
            <section className="relative h-[60vh] bg-titan-navy flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" 
                        alt="Contact Hero" 
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-titan-navy/90"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm"
                    >
                        <MessageSquare size={14} className="text-titan-red" />
                        Let's Talk
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
                    >
                        GET IN <span className="text-titan-red">TOUCH</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/70 font-light max-w-2xl mx-auto"
                    >
                        Have a project in mind or want to learn more about our services? Our team is ready to assist you.
                    </motion.p>
                </div>
            </section>

            {/* --- CONTENT GRID --- */}
            <section className="px-6 pb-32 max-w-[1400px] mx-auto -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* LEFT COLUMN: INFO & LOCATIONS */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-5 space-y-8"
                    >

                        {/* Contact Info Card */}
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            
                            <h3 className="text-2xl font-black text-titan-navy mb-8">Headquarters</h3>
                            
                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-titan-bg rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-titan-navy text-sm uppercase tracking-wide mb-1">Visit Us</span>
                                        <p className="text-titan-navy-subtle leading-relaxed">
                                            #56, Street 315, Boeng Kak 1,<br />
                                            Tuol Kouk, Phnom Penh, Cambodia
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-titan-bg rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-titan-navy text-sm uppercase tracking-wide mb-1">Call Us</span>
                                        <p className="text-titan-navy-subtle">+855 23 999 999</p>
                                        <p className="text-titan-navy-subtle text-sm mt-1">Mon - Sat, 8am - 5pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-titan-bg rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-titan-navy text-sm uppercase tracking-wide mb-1">Email Us</span>
                                        <p className="text-titan-navy-subtle">info@kimmex.com</p>
                                        <p className="text-titan-navy-subtle">sales@kimmex.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Socials */}
                            <div className="mt-10 pt-8 border-t border-gray-100">
                                <h4 className="font-bold text-titan-navy mb-4 text-xs uppercase tracking-widest">Connect With Us</h4>
                                <div className="flex gap-3">
                                    <a href="#" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-lg text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                        <Facebook size={18} />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-lg text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                        <Linkedin size={18} />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-lg text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                        <Instagram size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map Card */}
                        <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 h-64 relative group cursor-pointer overflow-hidden">
                             <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                                alt="Map Location"
                                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 opacity-90"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors rounded-xl">
                                <div className="bg-white text-titan-navy px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                                    <MapPin size={14} className="text-titan-red" /> View on Google Maps
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: CONTACT FORM */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border-t-4 border-titan-red relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -mr-20 -mt-20 opacity-50 pointer-events-none"></div>

                            <div className="relative z-10 mb-10">
                                <h3 className="text-3xl font-black text-titan-navy mb-3">Send a Message</h3>
                                <p className="text-titan-navy-subtle">Fill out the form below and our team will get back to you within 24 hours.</p>
                            </div>

                            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">Full Name *</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy text-sm" placeholder="John Doe" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">Email Address *</label>
                                        <input type="email" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy text-sm" placeholder="john@example.com" required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">Phone Number</label>
                                        <input type="tel" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy text-sm" placeholder="+855 ..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">Subject *</label>
                                        <div className="relative">
                                            <select className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy text-sm appearance-none cursor-pointer">
                                                <option>General Inquiry</option>
                                                <option>Project Consultation</option>
                                                <option>Partnership Proposal</option>
                                                <option>Careers</option>
                                                <option>Other</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">Message *</label>
                                    <textarea rows={6} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy text-sm resize-none" placeholder="Tell us about your project or inquiry..." required></textarea>
                                </div>

                                <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-5 rounded-lg hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-3 group text-sm">
                                    Send Message
                                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
