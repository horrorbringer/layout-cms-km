'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Building, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Ruler, Users,
    DraftingCompass, PenTool, Hammer, Lightbulb, Briefcase,
    Clock, ShieldCheck, TrendingUp, Star, MapPin
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

type ServiceData = {
    id: string;
    title: string;
    subtitle: string;
    icon: any;
    heroImage: string;
    description: string;
    targetAudience: string;
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
        <div className="bg-white min-h-screen font-sans text-titan-navy">
            {/* --- 1. SERVICE HERO --- */}
            <section className="relative h-[70vh] bg-titan-navy overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/50 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center max-w-5xl px-6 pt-20">
                    <Link href="/design-x/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8">
                        <ArrowLeft size={14} /> Back to Services
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mx-auto w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20"
                    >
                        <Icon size={40} className="text-white" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight"
                    >
                        {service.title}
                    </motion.h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
                        {service.subtitle}
                    </p>
                </div>
            </section>

            {/* --- 2. SERVICE OVERVIEW (What & Who) --- */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="mb-12">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Overview</span>
                            <h2 className="text-4xl font-black text-titan-navy mb-6">What is {service.title}?</h2>
                            <p className="text-lg text-titan-navy-subtle leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        <div className="bg-titan-bg-alt p-8 rounded-xl border-l-4 border-titan-red">
                            <h3 className="text-xl font-bold text-titan-navy mb-3 flex items-center gap-2">
                                <Users size={20} className="text-titan-red" /> Who is this for?
                            </h3>
                            <p className="text-titan-navy-subtle">
                                {service.targetAudience}
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                            <img src={service.heroImage} alt="Service Overview" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-titan-navy/10 rounded-2xl -z-0"></div>
                    </div>
                </div>
            </section>

            {/* --- 3. SCOPE OF WORK --- */}
            <section className="py-24 bg-titan-navy text-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Scope of Work</span>
                        <h2 className="text-4xl font-black mb-6">What We Cover</h2>
                        <div className="w-20 h-1 bg-white/20 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.scopeOfWork.map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                                <CheckCircle2 className="text-titan-red shrink-0 mt-1" size={24} />
                                <span className="font-bold text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. PROCESS / HOW WE DELIVER --- */}
            <section className="py-24 px-6 bg-titan-bg-alt">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Our Process</span>
                        <h2 className="text-4xl font-black text-titan-navy mb-6">How We Deliver Excellence</h2>
                        <p className="text-titan-navy-subtle text-xl">A transparent, structured approach to ensure your project's success.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-titan-navy/10 md:hidden"></div>
                        <div className="hidden md:block absolute top-[45px] left-0 right-0 h-[2px] bg-titan-navy/10"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                            {service.process.map((step, i) => (
                                <div key={i} className="relative flex flex-row md:flex-col gap-6 md:gap-8 items-start md:items-center">
                                    <div className="relative z-10 w-14 h-14 md:w-24 md:h-24 bg-white rounded-full border-4 border-titan-bg-alt flex items-center justify-center shrink-0 shadow-lg md:mx-auto">
                                        <span className="text-xl md:text-3xl font-black text-titan-red">{step.step}</span>
                                    </div>
                                    <div className="md:text-center pt-2 md:pt-0">
                                        <h3 className="text-xl font-bold text-titan-navy mb-2">{step.title}</h3>
                                        <p className="text-sm text-titan-navy-subtle leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. KEY BENEFITS --- */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Why Choose Us</span>
                    <h2 className="text-4xl font-black text-titan-navy">Key Benefits</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {service.benefits.map((benefit, i) => (
                        <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-14 h-14 bg-titan-bg-alt rounded-full flex items-center justify-center mb-6 group-hover:bg-titan-red transition-colors">
                                <benefit.icon size={28} className="text-titan-navy group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-titan-navy mb-3">{benefit.title}</h3>
                            <p className="text-titan-navy-subtle text-sm">
                                {benefit.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 6. FEATURED PROJECTS --- */}
            {service.relatedProjects.length > 0 && (
                <section className="py-24 bg-titan-navy text-white px-6">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                            <div>
                                <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Portfolio</span>
                                <h2 className="text-4xl font-black">Featured {service.title} Projects</h2>
                            </div>
                            <Link href="/design-x/projects" className="mt-6 md:mt-0 px-8 py-3 border border-white/20 hover:bg-white hover:text-titan-navy transition-all font-bold uppercase tracking-widest text-sm flex items-center gap-2 rounded-sm">
                                View All Projects <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {service.relatedProjects.map((project, i) => (
                                <Link key={i} href={`/design-x/projects/${project.id}`} className="group relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer block">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/90 via-titan-navy/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-2 block">{project.category}</span>
                                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                        <div className="flex items-center gap-2 text-white/70 text-sm">
                                            <MapPin size={16} /> {project.location}
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6 bg-white text-titan-navy w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <ArrowRight size={20} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- FOOTER CTA --- */}
            <section className="py-20 bg-titan-red text-white text-center px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to start?</h2>
                    <p className="text-white/90 text-xl mb-10">
                        Contact our expert team today for a free consultation and feasibility study.
                    </p>
                    <Link href="/design-x/contact" className="inline-block bg-white text-titan-red px-12 py-5 font-bold uppercase tracking-widest hover:bg-titan-navy hover:text-white transition-all shadow-xl rounded-sm">
                        Request Quote
                    </Link>
                </div>
            </section>
        </div>
    );
}
