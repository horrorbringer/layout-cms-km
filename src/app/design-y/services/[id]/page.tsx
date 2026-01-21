'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Building, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Ruler, Users,
    DraftingCompass, PenTool, Hammer, Lightbulb, Briefcase,
    Clock, ShieldCheck, TrendingUp, Star, MapPin, Layers, FileText, Anchor,
    Cpu, Activity, Zap, Box
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// --- Types ---
type Project = {
    id: string;
    title: string;
    location: string;
    image: string;
    category: string;
};

type ServiceSpecs = {
    duration: string;
    teamSize: string;
    complexity: 'High' | 'Medium' | 'Variable';
    deliverables: string[];
};

type ServiceData = {
    id: string;
    title: string;
    subtitle: string;
    icon: any;
    heroImage: string;
    description: string;
    targetAudience: string;
    specs: ServiceSpecs; // New Technical Specs
    scopeOfWork: string[];
    process: { step: string; title: string; desc: string }[];
    benefits: { title: string; desc: string; icon: any }[];
    relatedProjects: Project[];
};

// --- Mock Data ---
const services: ServiceData[] = [
    {
        id: 'design-build',
        title: 'Design & Build',
        subtitle: 'From Concept to Creation',
        icon: PenTool,
        heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop',
        description: 'Our flagship service integrating architectural creativity with engineering precision. We manage the entire project lifecycle, ensuring a seamless transition from the drawing board to the final handover. This unified approach minimizes risks and accelerates delivery.',
        targetAudience: 'Ideal for property developers, commercial business owners, and private investors looking for a single point of responsibility.',
        specs: {
            duration: '12 - 36 Months',
            teamSize: '15 - 50 Specialists',
            complexity: 'High',
            deliverables: ['Master Plan', 'BIM Models', 'Permits', 'Finished Structure']
        },
        scopeOfWork: [
            'Architectural Conceptualization & 3D Rendering',
            'Structural & Civil Engineering',
            'Mechanical, Electrical, & Plumbing (MEP) Design',
            'Permit Acquisition & Regulatory Approvals',
            'Turnkey Construction Execution',
            'Interior Design & Fit-out'
        ],
        process: [
            { step: '01', title: 'Consultation', desc: 'Understanding your vision, budget, and feasibility analysis.' },
            { step: '02', title: 'Design & Plan', desc: 'Developing detailed architectural and engineering blueprints.' },
            { step: '03', title: 'Build', desc: 'Construction execution with rigorous quality control.' },
            { step: '04', title: 'Handover', desc: 'Final inspection, documentation, and key delivery.' }
        ],
        benefits: [
            { title: 'Single Point of Contact', desc: 'Streamlined communication and accountability.', icon: Users },
            { title: 'Accelerated Timeline', desc: 'Overlapping design and construction phases.', icon: Clock },
            { title: 'Cost Certainty', desc: ' minimized change orders and precise budgeting.', icon: TrendingUp },
            { title: 'Quality Assurance', desc: 'Integrated teams ensure design intent is met.', icon: ShieldCheck }
        ],
        relatedProjects: [
            { id: '1', title: 'Vattanac Capital Extension', location: 'Phnom Penh', category: 'Commercial', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop' },
            { id: '2', title: 'Skyline Residential', location: 'Siem Reap', category: 'Residential', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop' }
        ]
    },
    {
        id: 'renovation',
        title: 'Building Renovation',
        subtitle: 'Restoring Value & Aesthetics',
        icon: Hammer,
        heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop',
        description: 'We breathe new life into existing structures. Whether it is a heritage restoration or a modern office fit-out, our renovation team focuses on enhancing functionality, energy efficiency, and aesthetics while preserving the building\'s unique character.',
        targetAudience: 'Owners of aging properties, offices needing modernization, and heritage building conservators.',
        specs: {
            duration: '3 - 12 Months',
            teamSize: '10 - 25 Specialists',
            complexity: 'Medium',
            deliverables: ['As-Built Drawings', 'Structural Retrofit', 'MEP Upgrades', 'Interior Fit-out']
        },
        scopeOfWork: [
            'Structural Strengthening & Retrofitting',
            'Facade Upgrades & Cladding',
            'MEP System Modernization',
            'Interior Fit-outs for Office & Retail',
            'Waterproofing & Insulation',
            'Heritage Preservation'
        ],
        process: [
            { step: '01', title: 'Assessment', desc: 'Thorough site inspection, structural analysis, and measurement.' },
            { step: '02', title: 'Proposal', desc: 'Design concepts, material selection, and cost estimation.' },
            { step: '03', title: 'Execution', desc: 'Renovation work managed to minimize operational disruption.' },
            { step: '04', title: 'Reveal', desc: 'Showcasing the revitalized space ready for occupancy.' }
        ],
        benefits: [
            { title: 'Increased Property Value', desc: 'Modern amenities boost market potential.', icon: TrendingUp },
            { title: 'Energy Efficiency', desc: 'New systems reduce long-term operational costs.', icon: Lightbulb },
            { title: 'Safety Upgrade', desc: 'Bringing old structures up to current safety codes.', icon: ShieldCheck },
            { title: 'Aesthetic Appeal', desc: 'Fresh, modern looks that attract tenants/customers.', icon: Star }
        ],
        relatedProjects: [
            { id: '3', title: 'Colonial Villa Restoration', location: 'Kep', category: 'Heritage', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop' },
            { id: '4', title: 'Tech Hub Office', location: 'Phnom Penh', category: 'Corporate', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2670&auto=format&fit=crop' }
        ]
    },
    {
        id: 'project-management',
        title: 'Project Management',
        subtitle: 'On Time, On Budget, On Point',
        icon: Briefcase,
        heroImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2670&auto=format&fit=crop',
        description: 'Rigorous oversight ensuring your project is delivered to the highest standards. We act as your representative, bringing professional discipline to manage contractors, schedules, costs, and risks effectively.',
        targetAudience: 'Investors and owners who need expert representation and control over complex projects.',
        specs: {
            duration: 'Variable (Project Based)',
            teamSize: '2 - 10 Managers',
            complexity: 'High',
            deliverables: ['Monthly Reports', 'Cost Control', 'Schedule Mgmt', 'Quality Audit']
        },
        scopeOfWork: [
            'Project Planning & Scheduling',
            'Cost Estimation & Budget Control',
            'Contract Administration',
            'Health, Safety & Environment (HSE) Oversight',
            'Quality Assurance (QA/QC) Inspections',
            'Risk Management & Mitigation'
        ],
        process: [
            { step: '01', title: 'Planning', desc: 'Defining detailed project scope, schedule, and budget baselines.' },
            { step: '02', title: 'Procurement', desc: 'Tendering, evaluating, and selecting the best vendors.' },
            { step: '03', title: 'Supervision', desc: 'Daily on-site management, coordination, and reporting.' },
            { step: '04', title: 'Closure', desc: 'Final accounting, documentation, and project close-out.' }
        ],
        benefits: [
            { title: 'Risk Mitigation', desc: 'Proactive identification and resolution of issues.', icon: ShieldCheck },
            { title: 'Budget Control', desc: 'Detailed tracking prevents cost overruns.', icon: TrendingUp },
            { title: 'Timely Delivery', desc: 'Strict schedule enforcement avoids delays.', icon: Clock },
            { title: 'Quality Standards', desc: 'Ensure final build meets all specifications.', icon: CheckCircle2 }
        ],
        relatedProjects: [
            { id: '5', title: 'Logistics Center Ph-1', location: 'Sihanoukville', category: 'Industrial', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop' }
        ]
    },
    {
        id: 'consultants',
        title: 'Consultants',
        subtitle: 'Strategic Expertise',
        icon: Lightbulb,
        heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop',
        description: 'Beyond construction, we provide the strategic insights needed to make informed investment decisions. Our consultants utilize market data and technical expertise to help you optimize value and ensure regulatory compliance before you build.',
        targetAudience: 'Developers, land owners, and government bodies requiring technical and financial validation.',
        specs: {
            duration: '1 - 6 Months',
            teamSize: '3 - 8 Consultants',
            complexity: 'Variable',
            deliverables: ['Feasibility Report', 'Technical Audit', 'Market Analysis', 'Reg. Advisory']
        },
        scopeOfWork: [
            'Feasibility Studies & Market Analysis',
            'Value Engineering & Cost Optimization',
            'Technical Due Diligence',
            'Regulatory Compliance Advisory',
            'Sustainability & Green Building Consulting',
            'Master Planning'
        ],
        process: [
            { step: '01', title: 'Analysis', desc: 'Deep dive into project requirements, site data, and goals.' },
            { step: '02', title: 'Strategy', desc: 'Developing a comprehensive roadmap and technical solutions.' },
            { step: '03', title: 'Advisory', desc: 'Ongoing expert guidance during decision-making phases.' },
            { step: '04', title: 'Reporting', desc: 'Delivering detailed reports and actionable recommendations.' }
        ],
        benefits: [
            { title: 'Informed Decisions', desc: 'Data-driven insights reduce investment risk.', icon: Lightbulb },
            { title: 'Cost Optimization', desc: 'Value engineering saves money without cutting quality.', icon: TrendingUp },
            { title: 'Regulatory Ease', desc: 'Smooth navigation of complex local building codes.', icon: CheckCircle2 },
            { title: 'Sustainability', desc: 'Expertise in green building standards (LEED, etc.).', icon: Star }
        ],
        relatedProjects: [
            { id: '6', title: 'Eco-Resort Masterplan', location: 'Koh Kong', category: 'Hospitality', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop' }
        ]
    }
];

export default function ServiceDetailPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id || 'design-build';
    // Fallback to first if not found, or handle 404
    const service = services.find(s => s.id === id) || services[0];
    const Icon = service.icon || Building;

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy selection:bg-titan-red selection:text-white">

            {/* --- TECHNICAL HEADER --- */}
            <header className="relative pt-48 pb-32 px-6 border-b border-titan-navy/10 bg-titan-bg overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10">
                    <Link href="/design-y/services" className="inline-flex items-center gap-2 text-titan-navy/60 hover:text-titan-red transition-colors font-mono text-[10px] uppercase tracking-widest mb-8">
                        <ArrowLeft size={10} /> Back to Index
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-titan-navy leading-[0.85] mb-8 uppercase">
                                {service.title.split(' ')[0]} <br />
                                <span className="text-transparent stroke-text-navy">
                                    {service.title.split(' ').slice(1).join(' ') || 'PROTOCOL'}
                                </span>
                            </h1>
                            <p className="text-xl text-titan-navy font-light max-w-2xl leading-relaxed border-l-2 border-titan-red pl-6">
                                {service.subtitle}
                            </p>
                        </div>

                        <div className="hidden md:block text-right font-mono text-xs text-titan-navy/60 space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-700 rounded-full mb-2">
                                <Activity size={12} /> SYSTEM ONLINE
                            </div>
                            <p className="opacity-50">SERVICE_ID: {service.id.toUpperCase()}</p>
                            <p className="opacity-50">VERSION: 2.4.0</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- 2. TECHNICAL OVERVIEW & SPECS --- */}
            <section className="py-24 px-6 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left: Description & Scope */}
                    <div className="lg:col-span-8">
                        <div className="mb-20">
                            <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest mb-6 border-b border-titan-navy/10 pb-2 inline-block">01. Service Description</h3>
                            <p className="text-2xl md:text-3xl text-titan-navy leading-relaxed font-light">
                                {service.description}
                            </p>
                        </div>

                        <div className="mb-16">
                            <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest mb-6 border-b border-titan-navy/10 pb-2 inline-block">02. System Modules</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.scopeOfWork.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-6 border border-titan-navy/10 hover:bg-titan-navy hover:text-white transition-all group cursor-default">
                                        <div className="w-8 h-8 flex items-center justify-center bg-titan-bg rounded-lg group-hover:bg-titan-red transition-colors">
                                            <Box size={14} className="text-titan-navy group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="font-bold text-lg">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Technical Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Specs Box */}
                        <div className="p-8 bg-titan-navy text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Cpu size={120} />
                            </div>
                            <h3 className="relative z-10 font-mono text-xs uppercase tracking-widest mb-6 text-titan-red">Technical Specifications</h3>

                            <div className="space-y-6 relative z-10 font-mono text-sm">
                                <div>
                                    <span className="block text-white/40 text-xs mb-1">Est. Duration</span>
                                    <span className="block text-xl font-bold">{service.specs.duration}</span>
                                </div>
                                <div className="w-full h-px bg-white/10"></div>
                                <div>
                                    <span className="block text-white/40 text-xs mb-1">Team Config</span>
                                    <span className="block text-xl font-bold">{service.specs.teamSize}</span>
                                </div>
                                <div className="w-full h-px bg-white/10"></div>
                                <div>
                                    <span className="block text-white/40 text-xs mb-1">Complexity Rating</span>
                                    <span className="flex items-center gap-2 text-xl font-bold">
                                        {service.specs.complexity}
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(d => <div key={d} className={`w-1 h-3 ${d <= (service.specs.complexity === 'High' ? 3 : service.specs.complexity === 'Medium' ? 2 : 1) ? 'bg-titan-red' : 'bg-white/20'}`}></div>)}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Deliverables Box */}
                        <div className="p-8 border border-titan-navy/10 bg-gray-50">
                            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 text-titan-navy/60">Key Deliverables</h3>
                            <ul className="space-y-3">
                                {service.specs.deliverables.map((d, i) => (
                                    <li key={i} className="flex items-center gap-3 text-titan-navy font-bold text-sm">
                                        <CheckCircle2 size={14} className="text-titan-red" /> {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. EXECUTION ROADMAP --- */}
            <section className="py-32 bg-titan-navy text-white overflow-hidden relative">
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="max-w-[1600px] mx-auto px-6 relative z-10">
                    <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-6">
                        <h3 className="font-mono text-xs text-titan-red uppercase tracking-widest">03. Execution Roadmap</h3>
                        <div className="flex items-center gap-2 text-white/40 font-mono text-xs">
                            <Activity size={14} className="animate-pulse" />
                            <span>Sequence Active</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {service.process.map((step, i) => (
                            <div key={i} className="relative group p-6 border border-white/5 hover:border-titan-red/50 bg-white/5 hover:bg-white/10 transition-all">
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/10 group-hover:bg-titan-red transition-colors"></div>
                                <h4 className="text-5xl font-black text-white/20 mb-6 group-hover:text-white transition-colors duration-500">{step.step}</h4>
                                <h5 className="text-lg font-bold uppercase tracking-wide mb-3 text-white flex items-center gap-2">
                                    {step.title}
                                    <ChevronRight size={16} className="text-titan-red opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h5>
                                <p className="text-xs font-mono text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. FEATURED PROJECTS --- */}
            {service.relatedProjects.length > 0 && (
                <section className="py-24 px-6 max-w-[1600px] mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <h3 className="font-mono text-xs text-titan-navy/40 uppercase tracking-widest mb-2 border-b border-titan-navy/10 pb-2 inline-block">04. Case Studies</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {service.relatedProjects.map((project, i) => (
                            <Link key={i} href={`/design-y/projects/${project.id}`} className="block group">
                                <div className="relative aspect-[16/9] overflow-hidden bg-titan-navy mb-6">
                                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
                                    <div className="absolute top-4 right-4 bg-white text-titan-navy px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                        {project.category}
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-titan-red text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                                <div className="flex justify-between items-end border-b border-titan-navy/10 pb-4 group-hover:border-titan-red transition-colors">
                                    <div>
                                        <h4 className="text-2xl font-bold text-titan-navy mb-1">{project.title}</h4>
                                        <div className="flex items-center gap-2 text-xs font-mono text-titan-navy/60 uppercase tracking-wide">
                                            <MapPin size={10} className="text-titan-red" /> {project.location}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* --- CTA: INITIALIZATION --- */}
            <section className="py-20 bg-titan-bg-alt border-t border-titan-navy/10 text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-4xl font-black text-titan-navy mb-6 uppercase">Ready to Execute?</h2>
                    <p className="text-titan-navy-subtle text-lg mb-10 max-w-xl mx-auto font-light">
                        Deploy our team for your next major undertaking.
                    </p>
                    <Link href="/design-y/contact" className="inline-block bg-titan-navy text-white px-12 py-5 font-bold uppercase tracking-widest hover:bg-titan-red transition-all shadow-xl group">
                        <span className="group-hover:mr-2 transition-all">Initiate Contact</span>
                        <ChevronRight size={16} className="inline opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
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
