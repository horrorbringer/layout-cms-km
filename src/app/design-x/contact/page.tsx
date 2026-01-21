'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Linkedin, Instagram } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy relative">
            {/* --- HEADER BACKGROUND SPACER --- */}
            <div className="absolute top-0 left-0 w-full h-32 bg-titan-navy z-0"></div>

            {/* --- HERO --- */}
            <section className="pt-48 pb-20 px-6 max-w-[1400px] mx-auto relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-black text-titan-navy mb-6 tracking-tighter"
                >
                    GET IN TOUCH
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-titan-navy-subtle max-w-2xl mx-auto leading-relaxed"
                >
                    Have a project in mind or want to learn more about our services? We'd love to hear from you.
                </motion.p>
            </section>

            {/* --- CONTENT GRID --- */}
            <section className="px-6 pb-32 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* LEFT COLUMN: INFO & LOCATIONS */}
                    <div className="lg:col-span-5 space-y-12">

                        {/* Main Office */}
                        <div className="bg-titan-bg-alt p-8 rounded-xl border border-titan-navy-light/5">
                            <h3 className="text-xl font-bold text-titan-navy mb-8 border-b border-gray-200 pb-4">Headquarters</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white p-2 rounded-full shadow-sm text-titan-red shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-titan-navy">KIM MEX Construction</span>
                                        <p className="text-titan-navy-subtle text-sm leading-relaxed mt-1">
                                            #56, Street 315, Boeng Kak 1,<br />
                                            Tuol Kouk, Phnom Penh, Cambodia
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-white p-2 rounded-full shadow-sm text-titan-red shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-titan-navy text-sm">Call Us</span>
                                        <p className="text-titan-navy-subtle text-sm">+855 23 999 999</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-white p-2 rounded-full shadow-sm text-titan-red shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-titan-navy text-sm">Email Us</span>
                                        <p className="text-titan-navy-subtle text-sm">info@kimmex.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-white p-2 rounded-full shadow-sm text-titan-red shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-titan-navy text-sm">Working Hours</span>
                                        <p className="text-titan-navy-subtle text-sm">Mon - Sat: 8:00 AM - 5:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Socials */}
                        <div>
                            <h4 className="font-bold text-titan-navy mb-4 text-sm uppercase tracking-widest">Connect With Us</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                    <Linkedin size={20} />
                                </a>
                                <a href="#" className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                    <Instagram size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Minimap Image */}
                        <div className="rounded-xl overflow-hidden shadow-lg h-64 relative group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                                alt="Map Location"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg text-titan-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={14} className="text-titan-red" /> View on Google Maps
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: CONTACT FORM */}
                    <div className="lg:col-span-7">
                        <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-xl shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red/5 rounded-full blur-[50px] pointer-events-none"></div>

                            <h3 className="text-3xl font-black text-titan-navy mb-2 relative z-10">Send a Message</h3>
                            <p className="text-titan-navy-subtle mb-10 relative z-10">Fill out the form below and our team will get back to you within 24 hours.</p>

                            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-titan-navy">Full Name</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:border-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-titan-navy">Email Address</label>
                                        <input type="email" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:border-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-titan-navy">Subject</label>
                                    <select className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:border-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy appearance-none">
                                        <option>General Inquiry</option>
                                        <option>Project Consultation</option>
                                        <option>Partnership Proposal</option>
                                        <option>Careers</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-titan-navy">Message</label>
                                    <textarea rows={6} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:border-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy resize-none" placeholder="Tell us about your project..."></textarea>
                                </div>

                                <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-5 rounded-sm hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-3 group">
                                    Send Message
                                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
