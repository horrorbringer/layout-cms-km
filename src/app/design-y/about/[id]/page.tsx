'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Linkedin, BookOpen, Award, Briefcase, Ruler, GraduationCap } from 'lucide-react';

// Mock Data for Personnel
const personnelData: any = {
    'ceo': {
        name: 'Okhna. TOUCH KIM',
        role: 'CEO / Founder',
        img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200',
        bio: `
            Okhna Touch Kim is the visionary founder of Kimmex Construction, establishing the firm in 2015 with a single mission: to redefine the standards of Cambodian infrastructure. With over 20 years of experience in civil engineering and strategic management, he has steered the company through a decade of exponential growth.
            <br/><br/>
            His leadership philosophy blends strict adherence to international engineering standards with deep respect for local heritage. Under his guidance, Kimmex has successfully delivered key national projects, ranging from government ministries to complex industrial hubs.
        `,
        quote: "We don't just build structures; we engineer the nation's future backbone.",
        specialization: ['Strategic Planning', 'Civil Engineering', 'Corporate Governance'],
        credentials: ['Master of Civil Engineering', 'Honorary Doctorate in Management', 'Board Member of CCA'],
        projects: ['Ministry of Interior Complex', 'Sihanoukville Deep Sea Port', 'Kimmex HQ Tower'],
        email: 'ceo@kimmex.com',
        phone: '+855 12 999 999',
        linkedin: '#'
    },
    'deputy-gm': {
        name: 'Mr. Pauch Bunpheakdey',
        role: 'Deputy General Manager',
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200',
        bio: 'As Deputy General Manager, Mr. Pauch Bunpheakdey oversees the daily interactions between all operational units. His focus on process optimization and resource allocation ensures that project timelines are met without compromising on quality.',
        quote: "Efficiency is the bridge between a plan and a reality.",
        specialization: ['Operational Management', 'Resource Allocation', 'Contract Negotiation'],
        credentials: ['MBA', 'B.Sc in Construction Management'],
        projects: ['Olympia City Phase 2', 'Aeon Mall 3 Structure'],
        email: 'deputy.gm@kimmex.com',
        phone: '+855 12 888 888',
        linkedin: '#'
    },
    'finance-dir': {
        name: 'Mr. Leng Vannarith',
        role: 'Finance Director',
        img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200',
        bio: 'Mr. Leng Vannarith ensures the financial health and stability of the corporation. His prudent fiscal policies and strategic investment planning have allowed Kimmex to scale sustainably.',
        quote: "Sustainable growth requires a foundation of fiscal discipline.",
        specialization: ['Corporate Finance', 'Investment Strategy', 'Risk Management'],
        credentials: ['CPA', 'Master of Finance'],
        projects: ['Corporate Restructuring 2020', 'IPO Preparation'],
        email: 'finance@kimmex.com',
        phone: '+855 12 777 777',
        linkedin: '#'
    },
    'senior-pm': {
        name: 'Mr. Oung Chaknora',
        role: 'Senior Project Manager',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200',
        bio: 'With a track record of delivering over 50 large-scale projects, Mr. Oung Chaknora leads the project management division. He specializes in high-rise construction and complex structural grid systems.',
        quote: "Every detail matters. From the foundation to the spire.",
        specialization: ['Project Management', 'High-Rise Construction', 'Safety Protocols'],
        credentials: ['PMP Certified', 'B.Eng Civil Engineering'],
        projects: ['The Peak', 'Gold Tower 42 Reinforcement'],
        email: 'senior.pm@kimmex.com',
        phone: '+855 12 666 666',
        linkedin: '#'
    },
    'pm': {
        name: 'Mr. Sum Rotana',
        role: 'Project Manager',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200',
        bio: 'Focused on industrial and commercial sectors, Mr. Sum Rotana brings a hands-on approach to site management, ensuring that safety standards and timelines are rigorously upheld.',
        quote: "Safety is not just a policy, it is a culture.",
        specialization: ['Industrial Construction', 'Site Safety', 'Team Leadership'],
        credentials: ['B.Arch', 'Safety Officer Certificate'],
        projects: ['Special Economic Zone A', 'Battanbang Rice Mill'],
        email: 'pm.rotana@kimmex.com',
        phone: '+855 12 555 555',
        linkedin: '#'
    },
    'mep-mgr': {
        name: 'Mr. Krai Keak',
        role: 'MEP Manager',
        img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200',
        bio: 'Leading the Mechanical, Electrical, and Plumbing division, Mr. Krai Keak ensures that the vital systems of every building function flawlessly and efficiently.',
        quote: "A building must breathe and function as a living organism.",
        specialization: ['HVAC Systems', 'Electrical Grids', 'Smart Building Integration'],
        credentials: ['M.Eng Electrical', 'ASHRAE Member'],
        projects: ['Chip Mong Tower MEP', 'Smart City Data Center'],
        email: 'mep@kimmex.com',
        phone: '+855 12 444 444',
        linkedin: '#'
    },
    'design-mgr': {
        name: 'Mr. Touch Putheany',
        role: 'Design Manager',
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200',
        bio: 'Bridging the gap between conceptual aesthetics and engineering reality, Mr. Touch Putheany leads the design team to create structures that are both beautiful and buildable.',
        quote: "Design is intelligence made visible.",
        specialization: ['Architectural Design', 'BIM Modeling', 'Urban Planning'],
        credentials: ['M.Arch', 'Registered Architect'],
        projects: ['Kimmex Showroom', 'Riverside Condo'],
        email: 'design@kimmex.com',
        phone: '+855 12 333 333',
        linkedin: '#'
    },
    'qs-mgr': {
        name: 'Mr. Ry Ken',
        role: 'QS Manager',
        img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=1200',
        bio: 'Mr. Ry Ken manages the cost estimation and contracts, ensuring that clients receive the best value engineering solutions without compromising on material quality.',
        quote: "Value is not just price. It is quality per unit of cost.",
        specialization: ['Cost Estimation', 'Contract Law', 'Value Engineering'],
        credentials: ['B.Sc Quantity Surveying', 'RICS Member'],
        projects: ['Cost Audit 2024', 'Procurement Strategy'],
        email: 'qs@kimmex.com',
        phone: '+855 12 222 222',
        linkedin: '#'
    },
    'logistics': {
        name: 'Mr. Hong Bunna',
        role: 'Logistics Manager',
        img: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?q=80&w=1200',
        bio: 'Ensuring the timely flow of materials to every site, Mr. Hong Bunna manages a complex fleet and supply chain network critical to project success.',
        quote: "Precision in logistics prevents delays in construction.",
        specialization: ['Supply Chain Management', 'Fleet Operations', 'Inventory Control'],
        credentials: ['Diploma in Logistics', 'Six Sigma Green Belt'],
        projects: ['Warehouse System Upgrade', 'Fleet GPS Integration'],
        email: 'logistics@kimmex.com',
        phone: '+855 12 111 111',
        linkedin: '#'
    },
    'chief-arch': {
        name: 'Mr. Chhundy Ryta',
        role: 'Chief Architect',
        img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200',
        bio: 'As Chief Architect, Mr. Chhundy Ryta defines the aesthetic direction of Kimmex projects, favoring modern brutalist and sustainable styles.',
        quote: "Form follows function, but beauty endures.",
        specialization: ['Conceptual Design', 'Sustainable Architecture', 'Hotel Resorts'],
        credentials: ['B.Arch', 'Award Winning Designer'],
        projects: ['Kep Resort 5-Star', 'Eco-Villa Project'],
        email: 'architect@kimmex.com',
        phone: '+855 12 000 000',
        linkedin: '#'
    }
};

export default function PersonnelDetailPage() {
    const params = useParams();
    const idParam = params?.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    // Default to CEO if not found or no ID
    const person = (id && personnelData[id]) ? personnelData[id] : personnelData['ceo'];

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy selection:bg-titan-red selection:text-white">

            {/* --- HERO PROFILE --- */}
            <div className="relative pt-48 pb-20 px-6 border-b border-titan-navy/10 bg-titan-bg overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col items-start">
                    {/* Breadcrumb */}
                    <Link href="/design-y/about/#leadership" className="inline-flex items-center gap-2 text-titan-navy/60 hover:text-titan-red transition-colors font-mono text-[10px] uppercase tracking-widest mb-12">
                        <ArrowLeft size={10} /> Personnel Roster
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-20 w-full items-start">
                        {/* Photo Column */}
                        <div className="lg:w-1/3 w-full">
                            <div className="aspect-[4/5] overflow-hidden relative border-2 border-titan-navy/10 p-2 bg-white shadow-xl">
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-titan-red z-20"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-titan-red z-20"></div>

                                <img src={person.img} alt={person.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />

                                <div className="absolute bottom-6 left-6 bg-titan-navy/90 text-white backdrop-blur px-4 py-2 text-xs font-mono">
                                    ID: {id?.toUpperCase() || 'CXO-001'}
                                </div>
                            </div>

                            {/* Contact Box */}
                            <div className="mt-8 bg-titan-navy p-8 text-white">
                                <h3 className="font-mono text-xs text-titan-red uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
                                    Secure Comms
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 group cursor-pointer hover:text-titan-red transition-colors">
                                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                                            <Mail size={14} />
                                        </div>
                                        <span className="text-sm font-bold">{person.email}</span>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-pointer hover:text-titan-red transition-colors">
                                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                                            <Phone size={14} />
                                        </div>
                                        <span className="text-sm font-bold">{person.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-pointer hover:text-titan-red transition-colors">
                                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                                            <Linkedin size={14} />
                                        </div>
                                        <span className="text-sm font-bold">Connect on LinkedIn</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="lg:w-2/3 w-full">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-titan-red text-white text-[10px] font-bold uppercase tracking-widest mb-4">
                                    Active Status
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black text-titan-navy uppercase tracking-tight mb-2">
                                    {person.name}
                                </h1>
                                <h2 className="text-xl md:text-2xl font-mono text-titan-navy/50 uppercase tracking-widest">
                                    {person.role}
                                </h2>
                            </div>

                            <div className="h-px w-full bg-titan-navy/10 my-12"></div>

                            <div className="prose prose-lg max-w-none text-titan-navy-subtle mb-12">
                                <h3 className="text-titan-navy font-bold uppercase text-sm tracking-widest mb-6 flex items-center gap-2">
                                    <Briefcase size={16} className="text-titan-red" /> Professional Profile
                                </h3>
                                <div dangerouslySetInnerHTML={{ __html: person.bio }}></div>
                            </div>

                            <blockquote className="border-l-4 border-titan-red pl-8 italic text-2xl font-light text-titan-navy mb-16 max-w-2xl bg-titan-bg/50 py-6 pr-6">
                                "{person.quote}"
                            </blockquote>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-titan-navy font-bold uppercase text-sm tracking-widest mb-6 flex items-center gap-2">
                                        <Ruler size={16} className="text-titan-red" /> Core Competencies
                                    </h3>
                                    <ul className="space-y-3">
                                        {person.specialization.map((item: string, i: number) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-medium border-b border-gray-100 pb-2">
                                                <div className="w-1.5 h-1.5 bg-titan-red rounded-full"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-titan-navy font-bold uppercase text-sm tracking-widest mb-6 flex items-center gap-2">
                                        <GraduationCap size={16} className="text-titan-red" /> Credentials
                                    </h3>
                                    <ul className="space-y-3">
                                        {person.credentials.map((item: string, i: number) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-medium border-b border-gray-100 pb-2">
                                                <Award size={14} className="text-titan-navy/30" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-16 pt-12 border-t border-titan-navy/10">
                                <h3 className="text-titan-navy font-bold uppercase text-sm tracking-widest mb-8 flex items-center gap-2">
                                    <BookOpen size={16} className="text-titan-red" /> Selected Portfolio
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {person.projects.map((proj: string, i: number) => (
                                        <div key={i} className="bg-titan-bg p-6 border border-titan-navy/5 hover:border-titan-red transition-colors cursor-pointer group">
                                            <div className="text-[10px] font-mono text-titan-navy/40 mb-2">REF: PRJ-00{i + 1}</div>
                                            <h4 className="font-bold text-titan-navy group-hover:text-titan-red transition-colors">{proj}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
