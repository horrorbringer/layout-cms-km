'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
    Building, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Ruler, Users,
    DraftingCompass, PenTool, Hammer, Lightbulb, Briefcase,
    Clock, ShieldCheck, TrendingUp, Star, MapPin
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Animation wrapper
function FadeInWhenVisible({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

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
    // Fallback to first if not found
    const service = services.find(s => s.id === id) || services[0];
    const Icon = service.icon || Building;

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">
            
            {/* === 1. PARALLAX HERO === */}
            <section ref={heroRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-titan-navy">
                <motion.div style={{ y: heroY, scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 10, ease: "easeOut" }} className="absolute inset-0">
                    <img src={service.heroImage} alt={service.title} className="w-full h-[120%] object-cover opacity-50 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/80 via-titan-navy/40 to-titan-navy"></div>
                </motion.div>

                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center max-w-5xl px-6 pt-20">
                    <Link href="/design-x/services" className="inline-flex items-center gap-2 text-white/60 hover:text-titan-red transition-all font-bold uppercase tracking-widest text-xs mb-8 group">
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-titan-red group-hover:bg-titan-red group-hover:text-white transition-all">
                            <ArrowLeft size={12} />
                        </div>
                        Back to Services
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10 shadow-2xl"
                    >
                        <Icon size={48} className="text-white drop-shadow-lg" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tighter"
                    >
                        {service.title}
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        {service.subtitle}
                    </motion.p>
                </motion.div>
            </section>

            {/* === 2. SERVICE OVERVIEW === */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <FadeInWhenVisible>
                        <div className="mb-12">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Overview</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">Redefining {service.title}</h2>
                            <p className="text-lg md:text-xl text-titan-navy/60 leading-relaxed mb-10">
                                {service.description}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-titan-red shadow-sm">
                            <h3 className="text-xl font-bold text-titan-navy mb-3 flex items-center gap-3">
                                <div className="p-2 bg-titan-red/10 rounded-lg">
                                    <Users size={20} className="text-titan-red" /> 
                                </div>
                                Ideal For
                            </h3>
                            <p className="text-titan-navy/70 leading-relaxed">
                                {service.targetAudience}
                            </p>
                        </div>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={0.2}>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-titan-red/5 rounded-[2rem] rotate-2 group-hover:rotate-1 transition-transform duration-500"></div>
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                                <img src={service.heroImage} alt="Service Overview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-titan-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* === 3. SCOPE OF WORK === */}
            <section className="py-24 bg-titan-navy text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-titan-red/5 rounded-full blur-[120px] pointer-events-none"></div>
                
                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <FadeInWhenVisible>
                        <div className="text-center mb-16">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Scope of Work</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Comprehensive Coverage</h2>
                            <p className="text-white/60 text-lg max-w-2xl mx-auto">We handle every detail so you don&apos;t have to. Here&apos;s what&apos;s included in our service.</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.scopeOfWork.map((item, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="group flex items-start gap-5 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-titan-red/30 transition-all duration-300 h-full">
                                    <div className="w-10 h-10 rounded-full bg-titan-red/20 flex items-center justify-center shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                        <CheckCircle2 className="text-titan-red group-hover:text-white" size={20} />
                                    </div>
                                    <span className="font-bold text-lg leading-tight pt-2 group-hover:text-titan-red transition-colors">{item}</span>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === 4. PROCESS / HOW WE DELIVER === */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-[1400px] mx-auto">
                    <FadeInWhenVisible>
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Our Process</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">The Path to Success</h2>
                            <p className="text-titan-navy/60 text-xl">A transparent, structured approach to ensure your project&apos;s success.</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-gray-200 via-titan-red/20 to-gray-200"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                            {service.process.map((step, i) => (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <div className="flex flex-col items-center text-center group">
                                        <div className="w-32 h-32 bg-white rounded-full border-8 border-gray-100 flex items-center justify-center mb-8 shadow-xl group-hover:border-titan-red/20 group-hover:scale-110 transition-all duration-300 relative">
                                            <span className="text-4xl font-black text-gray-200 group-hover:text-titan-red transition-colors absolute top-2 right-6">{step.step}</span>
                                            <Briefcase className="text-titan-navy w-10 h-10 relative z-10 group-hover:text-titan-red transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-titan-navy mb-3">{step.title}</h3>
                                        <p className="text-titan-navy/60 leading-relaxed px-4">{step.desc}</p>
                                    </div>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* === 5. KEY BENEFITS === */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <FadeInWhenVisible>
                    <div className="text-center mb-16">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy">Value Delivered</h2>
                    </div>
                </FadeInWhenVisible>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {service.benefits.map((benefit, i) => (
                        <FadeInWhenVisible key={i} delay={i * 0.1}>
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group h-full">
                                <div className="w-16 h-16 bg-titan-navy/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                    <benefit.icon size={30} className="text-titan-navy group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors">{benefit.title}</h3>
                                <p className="text-titan-navy/60 leading-relaxed">
                                    {benefit.desc}
                                </p>
                            </div>
                        </FadeInWhenVisible>
                    ))}
                </div>
            </section>

            {/* === 6. FEATURED PROJECTS === */}
            {service.relatedProjects.length > 0 && (
                <section className="py-24 bg-titan-navy text-white px-6">
                    <div className="max-w-[1400px] mx-auto">
                        <FadeInWhenVisible>
                            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                                <div>
                                    <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">Portfolio</span>
                                    <h2 className="text-4xl md:text-5xl font-black">Featured Projects</h2>
                                </div>
                                <Link href="/design-x/projects" className="mt-8 md:mt-0 px-8 py-3 bg-white/10 hover:bg-white hover:text-titan-navy transition-all font-bold uppercase tracking-widest text-sm flex items-center gap-2 rounded-lg backdrop-blur-sm">
                                    View All Projects <ArrowRight size={16} />
                                </Link>
                            </div>
                        </FadeInWhenVisible>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {service.relatedProjects.map((project, i) => (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <Link href={`/design-x/projects/${project.id}`} className="group relative aspect-[16/9] overflow-hidden rounded-2xl cursor-pointer block shadow-2xl">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                        
                                        <div className="absolute bottom-0 left-0 p-8 w-full">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <span className="inline-block bg-titan-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">{project.category}</span>
                                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                                    <MapPin size={16} className="text-titan-red" /> {project.location}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                            <ArrowRight size={20} className="text-white" />
                                        </div>
                                    </Link>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* === FOOTER CTA === */}
            <section className="py-24 bg-white text-center px-6">
                <div className="max-w-3xl mx-auto bg-titan-red rounded-3xl p-12 md:p-16 shadow-2xl shadow-titan-red/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[50px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
                    
                    <FadeInWhenVisible>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to start?</h2>
                        <p className="text-white/90 text-xl mb-10 font-medium">
                            Contact our expert team today for a free consultation and feasibility study.
                        </p>
                        <Link href="/design-x/contact" className="inline-flex items-center gap-2 bg-white text-titan-red px-10 py-5 font-bold uppercase tracking-widest hover:bg-titan-navy hover:text-white transition-all shadow-xl rounded-lg">
                            Request Quote <ArrowRight size={18} />
                        </Link>
                    </FadeInWhenVisible>
                </div>
            </section>
        </div>
    );
}
