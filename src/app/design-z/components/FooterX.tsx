'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Youtube, Instagram, MapPin, Phone, Mail, HardHat } from 'lucide-react';
import { useLanguage, getLocalizedText } from '../context/LanguageContext';
import { footerData } from '../data/footerData';

export default function FooterX() {
    const { t, language } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-titan-navy text-white pt-24 pb-12 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-16">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Image src="/logo.png" alt="Kimmex Logo" width={40} height={40} className="h-10 w-auto" />
                            <div className="flex flex-col flex-1">
                                <span className="font-bold text-xl leading-none tracking-tight text-white">KIMMEX</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-orange">Construction</span>
                            </div>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            {getLocalizedText(footerData.description as any, language)}
                        </p>
                        <div className="flex gap-3 pt-2">
                            {footerData.social.facebook && (
                                <a href={footerData.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-all text-white">
                                    <Facebook size={16} />
                                </a>
                            )}
                            {footerData.social.linkedin && (
                                <a href={footerData.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-all text-white">
                                    <Linkedin size={16} />
                                </a>
                            )}
                            {footerData.social.youtube && (
                                <a href={footerData.social.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-all text-white">
                                    <Youtube size={16} />
                                </a>
                            )}
                            {footerData.social.instagram && (
                                <a href={footerData.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-white/10 flex items-center justify-center hover:bg-accent-orange transition-all text-white">
                                    <Instagram size={16} />
                                </a>
                            )}
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
                                { label: t('Projects'), href: '/design-z/projects' },
                                { label: t('Services'), href: '/design-z/services' },
                                { label: t('About Us'), href: '/design-z/about' },
                                { label: t('News & Insights'), href: '/design-z/news' },
                                { label: t('Careers'), href: '/design-z/careers' },
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
                            {t('Services')}
                        </h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            {[
                                { label: t('Design & Build'), href: '/design-z/services/design-build' },
                                { label: t('Construction'), href: '/design-z/services/construction' },
                                { label: t('Project Management'), href: '/design-z/services/project-management' },
                                { label: t('Infrastructure'), href: '/design-z/services/infrastructure' },
                                { label: t('MEP Systems'), href: '/design-z/services/systems' }
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="flex items-center gap-2 hover:text-accent-orange transition-all group">
                                        <span className="w-1.5 h-1.5 bg-accent-orange rounded-full group-hover:scale-125 transition-transform"></span>
                                        {item.label}
                                    </Link>
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
                                <a href={footerData.contact.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange transition-colors">
                                    {getLocalizedText(footerData.contact.addressLine1 as any, language)}<br />
                                    {getLocalizedText(footerData.contact.addressLocation as any, language)}
                                </a>
                            </li>
                            <li className="flex gap-4 items-center">
                                <Phone size={20} className="text-accent-orange shrink-0" />
                                <a href={`tel:${footerData.contact.phone.replace(/\s+/g, '')}`} className="hover:text-accent-orange transition-colors">
                                    {footerData.contact.phone}
                                </a>
                            </li>
                            <li className="flex gap-4 items-center">
                                <Mail size={20} className="text-accent-orange shrink-0" />
                                <a href={`mailto:${footerData.contact.email}`} className="hover:text-accent-orange transition-colors">
                                    {footerData.contact.email}
                                </a>
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
