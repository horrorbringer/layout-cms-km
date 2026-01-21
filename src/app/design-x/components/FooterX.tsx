'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Youtube, Instagram, MapPin, Phone, Mail, HardHat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FooterX() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-titan-navy text-white pt-24 pb-12 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-16">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Kimmex Logo" className="h-10 w-auto" />
                            <div className="flex flex-col flex-1">
                                <span className="font-bold text-xl leading-none tracking-tight text-white">KIMMEX</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-orange">Construction</span>
                            </div>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            {t('Footer Desc')}
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="w-9 h-9 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-all text-white">
                                <Facebook size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-all text-white">
                                <Linkedin size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-all text-white">
                                <Youtube size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-all text-white">
                                <Instagram size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-accent-orange flex items-center gap-2">
                            <HardHat size={14} />
                            {t('Explore')}
                        </h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            {[
                                { label: t('Projects'), href: '/design-x/projects' },
                                { label: t('Services'), href: '/design-x/services' },
                                { label: t('About Us'), href: '/design-x/about' },
                                { label: t('News & Insights'), href: '/design-x/news' },
                                { label: t('Careers'), href: '/design-x/careers' },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-accent-orange hover:pl-2 transition-all flex items-center gap-2">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-accent-orange flex items-center gap-2">
                            <HardHat size={14} />
                            {t('Capabilities')}
                        </h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            {[
                                t('General Construction'),
                                t('Design & Build'),
                                t('MEP Engineering'),
                                t('Steel Structure'),
                                t('Renovation'),
                                t('Project Management')
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 hover:text-accent-orange transition-colors cursor-default">
                                    <span className="w-1.5 h-1.5 bg-accent-orange rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-accent-orange flex items-center gap-2">
                            <HardHat size={14} />
                            {t('Contact')}
                        </h4>
                        <ul className="space-y-6 text-sm text-white/50">
                            <li className="flex gap-4">
                                <MapPin size={20} className="text-accent-orange shrink-0" />
                                <span>
                                    #123 Monivong Blvd, Boeung Keng Kang 1,<br />
                                    {t('Phnom Penh, Cambodia')}
                                </span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <Phone size={20} className="text-accent-orange shrink-0" />
                                <span className="hover:text-accent-orange cursor-pointer transition-colors">+855 23 999 888</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <Mail size={20} className="text-accent-orange shrink-0" />
                                <span className="hover:text-accent-orange cursor-pointer transition-colors">info@kimmex.com.kh</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <p>&copy; {currentYear} Kimmex Construction & Investment Co., Ltd. {t('All rights reserved')}.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-accent-orange transition-colors">{t('Privacy Policy')}</Link>
                        <Link href="#" className="hover:text-accent-orange transition-colors">{t('Terms of Service')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
