'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Mail, Phone, Linkedin, Award, Building2, Calendar, MapPin } from 'lucide-react';

// Shared Types
type TeamMember = {
    name: string;
    role: string;
    image?: string;
    bio: string;
    email: string;
    phone: string;
    experience: string;
    location: string;
    specialization: string;
};

// Mock Data (Flattened from Org Chart)
const teamMembers: TeamMember[] = [
    {
        name: 'Okhna. TOUCH KIM',
        role: 'Chief Executive Officer',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Okhna. Touch Kim founded KIM MEX Construction in 1999 with a vision to revolutionize the Cambodian construction industry. With over 30 years of experience in civil engineering and infrastructure development, he has led the company from a small local contractor to a national leader. His leadership philosophy centers on integrity, quality, and community building.',
        email: 'ceo@kimmex.com',
        phone: '+855 12 000 000',
        experience: '30+ Years',
        location: 'Phnom Penh HQ',
        specialization: 'Strategic Leadership, Civil Engineering'
    },
    {
        name: 'Mr. PAUCH BUNPHEAKDEY',
        role: 'Deputy General Manager',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'As Deputy General Manager, Mr. Pauch Bunpheakdey oversees the daily operations of KIM MEX Construction. He ensures that all departments work in synergy to deliver projects on time and within budget. His background in project management and operational efficiency has been instrumental in the company\'s rapid growth.',
        email: 'deputy.gm@kimmex.com',
        phone: '+855 12 000 001',
        experience: '20+ Years',
        location: 'Phnom Penh HQ',
        specialization: 'Operations Management, Project Planning'
    },
    {
        name: 'Mr. LENG VANNARITH',
        role: 'Finance Director',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Mr. Leng Vannarith manages the financial health of the organization. With a keen eye for detail and strategic financial planning, he ensures sustainable growth and fiscal responsibility across all projects.',
        email: 'finance@kimmex.com',
        phone: '+855 12 000 002',
        experience: '18+ Years',
        location: 'Phnom Penh HQ',
        specialization: 'Corporate Finance, Risk Management'
    },
    {
        name: 'Mr. OUNG CHAKNORA',
        role: 'Senior Project Manager',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Mr. Oung Chaknora leads our most complex construction projects. His expertise in structural engineering and on-site management ensures that every build meets our rigorous safety and quality standards.',
        email: 'spm@kimmex.com',
        phone: '+855 12 000 003',
        experience: '15+ Years',
        location: 'Site Operations',
        specialization: 'Construction Management, Structural Engineering'
    },
    {
        name: 'Mr. SUM ROTANA',
        role: 'Project Manager',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Mr. Sum Rotana is dedicated to delivering excellence in project execution. He works closely with clients and site teams to ensure clear communication and successful project outcomes.',
        email: 'pm@kimmex.com',
        phone: '+855 12 000 004',
        experience: '12+ Years',
        location: 'Site Operations',
        specialization: 'Project Coordination, Client Relations'
    },
    {
        name: 'Mr. KRAI KEAK',
        role: 'MEP Operations Manager',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Specializing in Mechanical, Electrical, and Plumbing (MEP) systems, Mr. Krai Keak ensures the functional heartbeat of every building we construct operates flawlessly.',
        email: 'mep.ops@kimmex.com',
        phone: '+855 12 000 005',
        experience: '14+ Years',
        location: 'MEP Division',
        specialization: 'MEP Systems, Operational Maintenance'
    },
    {
        name: 'Mr. CHHUNDY RYTA',
        role: 'Deputy Architect Manager',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Mr. Chhundy Ryta brings creative vision to our technical excellence. He oversees architectural design integrity, ensuring that aesthetics and functionality coexist in perfect harmony.',
        email: 'architect@kimmex.com',
        phone: '+855 12 000 006',
        experience: '10+ Years',
        location: 'Design Studio',
        specialization: 'Architectural Design, BIM'
    },
    {
        name: 'Mr. TOUCH PUTHEANY',
        role: 'MEP Design Manager',
        image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Mr. Touch Putheany leads the design of complex MEP systems. His innovative approach to energy efficiency and system integration sets our projects apart.',
        email: 'mep.design@kimmex.com',
        phone: '+855 12 000 007',
        experience: '11+ Years',
        location: 'MEP Division',
        specialization: 'MEP Design, Sustainability'
    },
    {
        name: 'Mr. RY KEN',
        role: 'Deputy QS Manager',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Mr. Ry Ken manages Quantity Surveying, ensuring precise cost estimation and contract management. His diligence protects our clients\' investments and ensures project viability.',
        email: 'qs@kimmex.com',
        phone: '+855 12 000 008',
        experience: '9+ Years',
        location: 'Phnom Penh HQ',
        specialization: 'Cost Estimation, Contract Management'
    }
];

function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    // In a real app, we would fetch data here. For now, we find it in our static list.
    // Note: In Next.js App Router, params are accessed directly or via props.
    // We need to unwrap params if strictly following newest Next.js, but standard props access usually works for static generation constraints.
    
    // For simple client-side match (since this is 'use client'):
    const member = teamMembers.find(m => slugify(m.name) === slug);

    if (!member) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-titan-navy mb-4">Member Not Found</h1>
                    <Link href="/design-x/about" className="text-titan-red font-bold hover:underline">
                        Return to About Us
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">
            {/* === PROFESSIONAL HERO SECTION === */}
            <div className="relative bg-titan-navy min-h-[500px] flex flex-col justify-center overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-titan-red/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-20 pb-40">
                    <Link href="/design-x/about" className="inline-flex items-center text-white/40 hover:text-white transition-colors font-bold text-xs uppercase tracking-[0.2em] mb-12 group">
                        <span className="w-8 h-[1px] bg-white/20 mr-4 group-hover:w-12 group-hover:bg-titan-red transition-all"></span>
                        Back to Team
                    </Link>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-wrap gap-4 items-center mb-6">
                            <span className="px-4 py-1.5 rounded-full border border-white/20 text-white/60 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                {member.specialization}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-titan-red text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-titan-red/20">
                                {member.location}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                            {member.name}
                        </h1>
                        
                        <div className="h-1 w-24 bg-titan-red mb-8"></div>
                        
                        <p className="text-xl md:text-3xl text-white/80 font-light max-w-2xl leading-relaxed">
                            {member.role}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* === MAIN CONTENT === */}
            <main className="max-w-7xl mx-auto px-6 pb-24 relative z-20 -mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Image Card (Floating) */}
                    <div className="lg:col-span-4">
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="bg-white p-3 rounded-3xl shadow-2xl">
                                <div className="rounded-2xl overflow-hidden aspect-[3/4] relative group">
                                    <div className="absolute inset-0 bg-titan-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/80 via-transparent to-transparent opacity-60"></div>
                                    
                                    {/* Floating Contact Bar */}
                                    <div className="absolute bottom-6 left-6 right-6 flex gap-3 z-20 justify-center">
                                        <a href={`mailto:${member.email}`} className="flex-1 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-titan-red hover:border-titan-red transition-all group/icon">
                                            <Mail size={20} className="group-hover/icon:scale-110 transition-transform" />
                                        </a>
                                        <a href={`tel:${member.phone}`} className="flex-1 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-titan-red hover:border-titan-red transition-all group/icon">
                                            <Phone size={20} className="group-hover/icon:scale-110 transition-transform" />
                                        </a>
                                        <a href="#" className="flex-1 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-titan-red hover:border-titan-red transition-all group/icon">
                                            <Linkedin size={20} className="group-hover/icon:scale-110 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                                    <div className="text-3xl font-black text-titan-navy mb-1">{member.experience.split('+')[0]}+</div>
                                    <div className="text-xs uppercase tracking-widest text-titan-navy/40 font-bold">Years Exp.</div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                                    <div className="text-3xl font-black text-titan-navy mb-1">100%</div>
                                    <div className="text-xs uppercase tracking-widest text-titan-navy/40 font-bold">Success</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Bio Content */}
                    <div className="lg:col-span-8 lg:pt-40">
                        <motion.div
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ duration: 0.8, delay: 0.4 }}
                             className="prose prose-lg prose-slate max-w-none"
                        >
                            <h3 className="text-titan-navy font-bold text-2xl mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-titan-red rounded-full"></span>
                                Biography
                            </h3>
                            <p className="text-xl text-titan-navy/70 leading-relaxed font-light mb-12">
                                {member.bio}
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 mb-16">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-titan-red">
                                    <h4 className="text-titan-navy font-black text-lg uppercase tracking-widest mb-4">Focus Areas</h4>
                                    <ul className="space-y-4">
                                        {['Strategic Planning', 'Operational Excellence', 'Team Development', 'Sustainability'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-titan-navy/70">
                                                <div className="w-1.5 h-1.5 bg-titan-red rounded-full"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-titan-navy p-8 rounded-2xl text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                    <h4 className="text-white font-black text-lg uppercase tracking-widest mb-4 relative z-10">Credentials</h4>
                                    <ul className="space-y-4 relative z-10">
                                        <li className="flex items-center gap-3 text-white/70">
                                            <Award size={18} className="text-titan-red" />
                                            Master of Engineering
                                        </li>
                                        <li className="flex items-center gap-3 text-white/70">
                                            <Award size={18} className="text-titan-red" />
                                            PMP Certified
                                        </li>
                                        <li className="flex items-center gap-3 text-white/70">
                                            <Award size={18} className="text-titan-red" />
                                            MBA - Management
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-12">
                                <h3 className="text-titan-navy font-bold text-2xl mb-8">Professional Journey</h3>
                                <p className="text-titan-navy/60 leading-relaxed mb-6">
                                    With a career spanning over {member.experience}, {member.name} has been at the forefront of major infrastructure developments in Cambodia. His approach combines traditional engineering discipline with modern management practices.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
