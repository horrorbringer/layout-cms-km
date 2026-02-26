'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Facebook, Linkedin, Instagram, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

import { contactData } from '../data/contactData';

export default function ContactPage() {
    const { t, language } = useLanguage();

    const getLocalized = (obj: any) => {
        if (!obj) return '';
        return obj[language] || obj['en'] || '';
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-titan-navy relative">
            {/* --- HERO --- */}
            <section className="relative h-[60vh] bg-titan-navy flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/projects/Thumbnail-3.jpg"
                        alt="Contact Hero"
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-titan-navy/50"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm"
                    >
                        <MessageSquare size={14} className="text-titan-red" />
                        {t("Let's Talk")}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
                    >
                        {language === 'kh' ? 'ទាក់ទង' : 'GET IN'} <span className="text-titan-red">{language === 'kh' ? 'មកយើង' : 'TOUCH'}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/70 font-light max-w-2xl mx-auto mb-10"
                    >
                        {t('Contact Hero Sub')}
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

                            <h3 className="text-2xl font-black text-titan-navy mb-8">{t('Headquarters')}</h3>

                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-titan-bg rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-titan-navy text-sm uppercase tracking-wide mb-1">{t('Visit Us')}</span>
                                        <p className="text-titan-navy-subtle leading-relaxed whitespace-pre-line">
                                            {getLocalized(contactData.address)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-titan-bg rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-titan-navy text-sm uppercase tracking-wide mb-1">{t('Call Us')}</span>
                                        {contactData.phone.map((p, i) => (
                                            <p key={i} className="text-titan-navy-subtle">{p}</p>
                                        ))}
                                        <p className="text-titan-navy-subtle text-sm mt-1">{getLocalized(contactData.hours)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-titan-bg rounded-xl flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-titan-navy text-sm uppercase tracking-wide mb-1">{t('Email Us')}</span>
                                        {contactData.email.map((e, i) => (
                                            <p key={i} className="text-titan-navy-subtle">{e}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Socials */}
                            <div className="mt-10 pt-8 border-t border-gray-100">
                                <h4 className="font-bold text-titan-navy mb-4 text-xs uppercase tracking-widest">{t('Connect With Us')}</h4>
                                <div className="flex gap-3">
                                    <a href={contactData.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-lg text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                        <Facebook size={18} />
                                    </a>
                                    <a href={contactData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-lg text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                        <Linkedin size={18} />
                                    </a>
                                    <a href={contactData.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-lg text-titan-navy hover:bg-titan-navy hover:text-white transition-all duration-300">
                                        <Instagram size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map Card */}
                        <a
                            href={contactData.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white p-2 rounded-2xl shadow-lg border border-gray-100 h-64 relative group cursor-pointer overflow-hidden"
                        >
                            <Image
                                src="/images/projects/Thumbnail-1.jpg"
                                alt="Map Location"
                                fill
                                className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 opacity-90"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors rounded-xl">
                                <div className="bg-white text-titan-navy px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                                    <MapPin size={14} className="text-titan-red" /> {t('View on Google Maps')}
                                </div>
                            </div>
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border-t-4 border-titan-red relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -mr-20 -mt-20 opacity-50 pointer-events-none"></div>

                            <div className="relative z-10 mb-10">
                                <h3 className="text-3xl font-black text-titan-navy mb-3">{t('Send a Message')}</h3>
                                <p className="text-titan-navy-subtle">{t('Contact Form Sub')}</p>
                            </div>

                            <ContactForm t={t} />
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
}

function ContactForm({ t }: { t: (key: string) => string }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: t('General Inquiry'),
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', subject: t('General Inquiry'), message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            {status === 'success' && (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm font-bold animate-in fade-in slide-in-from-top-2">
                    {t('Message sent successfully! We will get back to you soon.') || 'Message sent successfully!'}
                </div>
            )}
            {status === 'error' && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-bold">
                    {t('Failed to send message. Please try again.') || 'Something went wrong. Please try again.'}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">{t('Full Name')}</label>
                    <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy text-sm"
                        placeholder={t('Full Name placeholder')}
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">{t('Email Address')}</label>
                    <input
                        type="email"
                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy text-sm"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">{t('Phone Number')}</label>
                    <input
                        type="tel"
                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy text-sm"
                        placeholder="+855 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">{t('Subject')}</label>
                    <div className="relative">
                        <select
                            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy text-sm appearance-none cursor-pointer"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        >
                            <option>{t('General Inquiry')}</option>
                            <option>{t('Project Consultation')}</option>
                            <option>{t('Partnership Proposal')}</option>
                            <option>{t('Careers')}</option>
                            <option>{t('Other')}</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-titan-navy">{t('Message')}</label>
                <textarea
                    rows={6}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none focus:bg-white transition-all font-medium text-titan-navy text-sm resize-none"
                    placeholder={t('Message placeholder')}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-5 rounded-lg hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-3 group text-sm disabled:opacity-50"
            >
                {status === 'loading' ? t('Sending...') : t('Send Message')}
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
        </form>
    );
}
