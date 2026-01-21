import React from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Youtube, Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function FooterX() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-titan-navy text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-16">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Kimmex Logo" className="h-10 w-auto" />
                            <div className="flex flex-col flex-1">
                                <span className="font-bold text-xl leading-none tracking-tight">KIMMEX</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Construction</span>
                            </div>
                        </div>
                        <p className="text-titan-navy-subtle text-sm leading-relaxed max-w-xs">
                            Engineering the future of Cambodia since 1999. Delivering excellence in high-rise, infrastructure, and industrial construction with unwavering commitment to quality and safety.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-titan-red transition-colors text-white/70 hover:text-white">
                                <Facebook size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-titan-red transition-colors text-white/70 hover:text-white">
                                <Linkedin size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-titan-red transition-colors text-white/70 hover:text-white">
                                <Youtube size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-titan-red transition-colors text-white/70 hover:text-white">
                                <Instagram size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-white/90">Explore</h4>
                        <ul className="space-y-4 text-sm text-titan-navy-subtle">
                            {[
                                { label: 'Our Projects', href: '/design-y/projects' },
                                { label: 'Services', href: '/design-y/services' },
                                { label: 'About Us', href: '/design-y/about' },
                                { label: 'News & Insights', href: '/design-y/news' },
                                { label: 'Careers', href: '/design-y/careers' },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-titan-red hover:pl-2 transition-all flex items-center gap-2">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-white/90">Capabilities</h4>
                        <ul className="space-y-4 text-sm text-titan-navy-subtle">
                            {[
                                'General Construction',
                                'Design & Build',
                                'MEP Engineering',
                                'Steel Structure',
                                'Renovation',
                                'Project Management'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-titan-red rounded-full opacity-50"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-white/90">Contact</h4>
                        <ul className="space-y-6 text-sm text-titan-navy-subtle">
                            <li className="flex gap-4">
                                <MapPin size={20} className="text-titan-red shrink-0" />
                                <span>
                                    #123 Monivong Blvd, Boeung Keng Kang 1,<br />
                                    Phnom Penh, Cambodia
                                </span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <Phone size={20} className="text-titan-red shrink-0" />
                                <span className="hover:text-white cursor-pointer transition-colors">+855 23 999 888</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <Mail size={20} className="text-titan-red shrink-0" />
                                <span className="hover:text-white cursor-pointer transition-colors">info@kimmex.com.kh</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-titan-navy-subtle">
                    <p>&copy; {currentYear} Kimmex Construction & Investment Co., Ltd. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
