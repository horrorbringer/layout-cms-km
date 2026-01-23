'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
    ArrowRight, Menu, X, Facebook, Linkedin, Youtube, 
    Shield, Award, Users, TrendingUp, Heart, Lightbulb, 
    Handshake, Clock, CheckCircle2, Quote, ChevronRight,
    Building, Ruler, Truck, DraftingCompass, HardHat, 
    Hammer, Briefcase, LayoutTemplate, PenTool, GraduationCap, 
    Landmark, Settings, ShieldCheck, Zap, Globe, MousePointer2,
    ArrowLeft, Star, MapPin
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// --- SHARED COMPONENTS (Reused for consistency) ---

const MenuOverlay = ({ isOpen, onClose, navItems }: { isOpen: boolean, onClose: () => void, navItems: any[] }) => {
    const [activeCategory, setActiveCategory] = useState<number | null>(0);
    const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] bg-[#1a1a2e] text-white flex flex-col"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-8 md:p-12 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-titan-red rounded-full flex items-center justify-center font-bold text-white">K</div>
                            <span className="font-bold text-xl tracking-tight">KIMMEX</span>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-4 hover:bg-white/10 rounded-full transition-colors group flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                        >
                            Close <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        
                        {/* Left: Main Navigation List */}
                        <div className="w-full md:w-1/2 lg:w-5/12 p-8 md:p-12 overflow-y-auto border-r border-white/10 flex flex-col justify-center">
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item, i) => (
                                    <div key={i}>
                                        <motion.div 
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group"
                                            onMouseEnter={() => {
                                                if (item.children) {
                                                    setActiveCategory(i);
                                                    setActiveSubCategory(null);
                                                } else {
                                                    setActiveCategory(null);
                                                }
                                            }}
                                        >
                                            {item.children ? (
                                                <button 
                                                    onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                                                    className={`text-4xl md:text-6xl font-bold tracking-tight transition-all duration-300 w-full text-left flex items-center justify-between py-2 ${activeCategory === i ? 'text-titan-red translate-x-4' : 'text-white/40 hover:text-white'}`}
                                                >
                                                    {item.label}
                                                    <ChevronRight size={32} className={`md:hidden transition-transform ${activeCategory === i ? 'rotate-90' : ''}`} />
                                                    {/* Desktop Active Arrow */}
                                                    <ArrowRight size={32} className={`hidden md:block transition-all duration-300 ${activeCategory === i ? 'opacity-100 translate-x-0 text-titan-red' : 'opacity-0 -translate-x-4'}`} />
                                                </button>
                                            ) : (
                                                <Link 
                                                    href={item.href}
                                                    className="text-4xl md:text-6xl font-bold tracking-tight transition-all duration-300 w-full text-left block py-2 text-white/40 hover:text-white hover:translate-x-4"
                                                >
                                                    {item.label}
                                                </Link>
                                            )}
                                            
                                            {/* Mobile Accordion */}
                                            <AnimatePresence>
                                                {activeCategory === i && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="md:hidden overflow-hidden pl-4 mt-2 border-l border-white/20 mb-4"
                                                    >
                                                        {item.children?.map((child: any, idx: number) => (
                                                            <div key={idx}>
                                                                <Link href={child.href} className="block py-2 text-lg text-white/80 font-medium">
                                                                    {child.label}
                                                                </Link>
                                                                {/* Mobile 3rd Level */}
                                                                {child.children && (
                                                                    <div className="pl-4 border-l border-white/10 mt-1 mb-2">
                                                                        {child.children.map((sub: any, subIdx: number) => (
                                                                            <Link key={subIdx} href={sub.href} className="block py-1 text-sm text-white/50">
                                                                                {sub.label}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Right: Sub-navigation & Details (Desktop Only) */}
                        <div className="hidden md:flex w-1/2 lg:w-7/12 p-12 flex-col bg-white/5 relative overflow-hidden">
                            {/* Dynamic Background Blob based on Index */}
                            <motion.div 
                                animate={{ 
                                    background: activeCategory !== null ? `radial-gradient(circle at ${activeCategory * 10}% 50%, rgba(255, 107, 0, 0.15), transparent 60%)` : 'none'
                                }}
                                className="absolute inset-0 pointer-events-none transition-all duration-700"
                            ></motion.div>

                            <div className="relative z-10 h-full flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {activeCategory !== null && navItems[activeCategory].children ? (
                                        <motion.div
                                            key={activeCategory}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full flex flex-col justify-center"
                                        >
                                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-12 border-b border-white/10 pb-4">
                                                Explore {navItems[activeCategory].label}
                                            </h3>
                                            
                                            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                                                {navItems[activeCategory].children.map((child: any, idx: number) => (
                                                    <div 
                                                        key={idx} 
                                                        className="group/item relative"
                                                        onMouseEnter={() => child.children && setActiveSubCategory(idx)}
                                                        onMouseLeave={() => child.children && setActiveSubCategory(null)}
                                                    >
                                                        <Link href={child.href} className="block relative">
                                                            <div className="absolute -left-4 top-1 w-0.5 h-0 bg-titan-red transition-all duration-300 group-hover/item:h-full"></div>
                                                            <h4 className="text-2xl font-bold mb-2 text-white group-hover/item:text-titan-red transition-colors flex items-center gap-3">
                                                                {child.label} 
                                                                <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-titan-red" />
                                                            </h4>
                                                            <p className="text-white/40 text-sm leading-relaxed max-w-xs group-hover/item:text-white/60 transition-colors">
                                                                {child.desc || "Learn more about our capabilities."}
                                                            </p>
                                                        </Link>

                                                        {/* Level 3 Hover Content */}
                                                        {child.children && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ 
                                                                    opacity: activeSubCategory === idx ? 1 : 0,
                                                                    height: activeSubCategory === idx ? 'auto' : 0,
                                                                    marginTop: activeSubCategory === idx ? 16 : 0
                                                                }}
                                                                className="overflow-hidden pl-4 border-l border-white/10"
                                                            >
                                                                {child.children.map((sub: any, subIdx: number) => (
                                                                    <Link 
                                                                        key={subIdx} 
                                                                        href={sub.href}
                                                                        className="block py-2 text-sm text-white/50 hover:text-titan-red hover:translate-x-1 transition-all"
                                                                    >
                                                                        {sub.label}
                                                                    </Link>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            key="empty"
                                            initial={{ opacity: 0 }} 
                                            animate={{ opacity: 1 }}
                                            className="h-full flex flex-col justify-center items-center text-white/20"
                                        >
                                            <div className="text-6xl mb-4 font-thin opacity-20">{activeCategory !== null ? '0' + (activeCategory + 1) : '00'}</div>
                                            <div className="text-xl font-medium">Direct Link</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Contact Footer in Overlay */}
                            <div className="relative z-10 border-t border-white/10 pt-8 mt-auto grid grid-cols-3 gap-8 text-white/60">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Call</div>
                                    <div>+855 23 999 999</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Email</div>
                                    <div>info@kimmex.com.kh</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">Visit</div>
                                    <div>Kim Mex Tower, PP</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="p-8 md:px-12 md:py-6 border-t border-white/10 flex justify-between items-center text-sm font-bold text-white/40 uppercase tracking-widest shrink-0 bg-[#151525]">
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Facebook size={16}/> <span className="hidden md:inline">Facebook</span></a>
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Linkedin size={16}/> <span className="hidden md:inline">LinkedIn</span></a>
                            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Youtube size={16}/> <span className="hidden md:inline">Youtube</span></a>
                        </div>
                        <div>© 2026 Kimmex</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Helper: Fade In Wrapper
function FadeInWhenVisible({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// --- DATA TYPES ---
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

// --- MOCK DATA ---
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

export default function ServiceDetailDesignAPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id || 'design-build';
    // Fallback to first if not found
    const service = services.find(s => s.id === id) || services[0];
    const Icon = service.icon || Building;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        {
            label: 'About Us', href: '/design-a/about',
            children: [
                { label: 'Company Profile', href: '/design-a/about#profile', desc: 'Learn about our history' },
                { label: 'Leadership', href: '/design-a/about#leadership', desc: 'Meet our team' },
                { label: 'Quality & Safety', href: '/design-a/about#safety', desc: 'Our standards' }
            ]
        },
        {
            label: 'Services', href: '/design-a/services',
            children: [
                { label: 'Design & Build', href: '/design-a/services/design-build', desc: 'Full lifecycle solutions' },
                { label: 'Building Renovation', href: '/design-a/services/renovation', desc: 'Revitalize existing structures' },
                { label: 'Project Management', href: '/design-a/services/project-management', desc: 'Oversight & control' },
                { label: 'Consultants', href: '/design-a/services/consultants', desc: 'Expert advisory services' }
            ]
        },
        {
            label: 'Projects', href: '/design-a/projects/completed',
            children: [
                { 
                    label: 'Done Projects', 
                    href: '/design-a/projects/completed', 
                    desc: 'View our portfolio',
                    children: [
                        { label: 'Government', href: '/design-a/projects/completed?type=Government', desc: 'Public sector works' },
                        { label: 'Public Service', href: '/design-a/projects/completed?type=Public Service', desc: 'Community infrastructure' },
                        { label: 'Private', href: '/design-a/projects/completed?type=Private', desc: 'Commercial & Residential' },
                        { label: 'Water Treatment', href: '/design-a/projects/completed?type=Water Treatment', desc: 'Industrial facilities' },
                        { label: 'Slope', href: '/design-a/projects/completed?type=Slope', desc: 'Specialized engineering' }
                    ]
                },
                { 
                    label: 'Implement Projects', 
                    href: '/design-a/projects/implementation', 
                    desc: 'Current developments',
                    children: [
                        { label: 'Government', href: '/design-a/projects/implementation?type=Government', desc: 'Ongoing public works' },
                        { label: 'Public Service', href: '/design-a/projects/implementation?type=Public Service', desc: 'Civic projects underway' },
                        { label: 'Private', href: '/design-a/projects/implementation?type=Private', desc: 'Commercial developments' },
                        { label: 'Water Treatment', href: '/design-a/projects/implementation?type=Water Treatment', desc: 'Water infrastructure' },
                        { label: 'Slope', href: '/design-a/projects/implementation?type=Slope', desc: 'Structural reinforcement' }
                    ]
                }
            ]
        },
        {
            label: 'News', href: '/design-a/news',
            children: [
                { label: 'News & Updates', href: '/design-a/news', desc: 'Latest announcements' },
                { label: 'Doc Collection', href: '/design-a/documents', desc: 'Resources & documents' }
            ]
        },
        { label: 'Careers', href: '/design-a/careers' },
        { label: 'Contact', href: '/design-a/contact' }
    ];

    return (
        <div className="bg-white md:bg-[#E5E5E5] min-h-screen md:p-6 font-sans text-titan-navy selection:bg-titan-navy selection:text-white transition-colors duration-500">
            
            {/* --- MAIN CONTAINER --- */}
            <div className="bg-white rounded-none md:rounded-[3rem] min-h-[calc(100vh-3rem)] shadow-none md:shadow-2xl overflow-hidden relative mx-auto max-w-[1920px]">
                
                {/* --- NAVIGATION --- */}
                <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${scrolled ? 'py-4' : 'py-6 md:py-8'}`}>
                    <div className="px-6 md:px-12 flex justify-between items-start">
                        {/* Logo */}
                        <div className="bg-white/90 backdrop-blur shadow-sm px-5 py-3 rounded-full flex items-center gap-3 pointer-events-auto">
                            <div className="w-3 h-3 bg-titan-red rounded-full animate-pulse"></div>
                            <span className="font-bold text-lg tracking-tight">KIMMEX</span>
                        </div>

                        {/* Menu Trigger */}
                        <button 
                            onClick={() => setIsMenuOpen(true)}
                            className="bg-titan-navy text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-titan-red transition-all shadow-lg flex items-center gap-3 pointer-events-auto group"
                        >
                            <span className="hidden md:inline group-hover:-translate-x-1 transition-transform">Menu</span>
                            <div className="flex flex-col gap-1.5 items-end">
                                <span className="w-6 h-0.5 bg-white group-hover:w-4 transition-all"></span>
                                <span className="w-4 h-0.5 bg-white group-hover:w-6 transition-all"></span>
                            </div>
                        </button>
                    </div>
                </div>

                <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />

                {/* --- HEADER / HERO --- */}
                <header className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-titan-navy rounded-b-[4rem]">
                     <div className="absolute inset-0">
                         <img 
                            src={service.heroImage} 
                            alt={service.title} 
                            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                         />
                         <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/90 via-titan-navy/30 to-titan-navy"></div>
                     </div>
                     
                     <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl text-center relative z-10 px-6 pt-20"
                    >
                        <Link href="/design-a/services" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-xs font-bold uppercase tracking-widest text-white mb-8 border border-white/20 hover:bg-white hover:text-titan-navy transition-all">
                            <ArrowLeft size={14} /> Back to Services
                        </Link>
                        
                        <div className="mx-auto w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl text-titan-navy">
                             <Icon size={48} />
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-6 text-white">
                            {service.title}
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                            {service.subtitle}
                        </p>
                    </motion.div>
                </header>

                {/* --- OVERVIEW --- */}
                <section className="px-6 md:px-12 py-20 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <FadeInWhenVisible>
                            <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">Overview</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Comprehensive solutions for <span className="text-gray-400">modern challenges.</span></h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-12">
                                {service.description}
                            </p>
                            
                            <div className="bg-[#F5F5F7] p-8 rounded-3xl">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                                    <Users className="text-titan-red" />
                                    Ideal For
                                </h3>
                                <p className="text-gray-600">
                                    {service.targetAudience}
                                </p>
                            </div>
                        </FadeInWhenVisible>

                        <div className="space-y-8">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {service.benefits.map((benefit, i) => (
                                    <FadeInWhenVisible key={i} delay={i * 0.1}>
                                        <div className="bg-white border border-gray-100 p-6 rounded-[2rem] hover:shadow-xl transition-all hover:border-titan-red/20 group h-full">
                                            <div className="w-12 h-12 bg-titan-navy/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-titan-red group-hover:text-white transition-colors">
                                                <benefit.icon size={24} />
                                            </div>
                                            <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </FadeInWhenVisible>
                                ))}
                             </div>
                        </div>
                    </div>
                </section>

                {/* --- SCOPE & PROCESS --- */}
                <section className="px-6 md:px-12 mb-20 md:mb-32">
                    <div className="bg-titan-navy rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-titan-red/10 rounded-full blur-[150px] pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                                {/* Scope */}
                                <div>
                                    <h3 className="text-3xl font-bold mb-8 border-b border-white/10 pb-6">Scope of Work</h3>
                                    <div className="space-y-4">
                                        {service.scopeOfWork.map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 group">
                                                <div className="w-6 h-6 rounded-full bg-titan-red/20 flex items-center justify-center shrink-0 mt-1 group-hover:bg-titan-red transition-colors">
                                                    <CheckCircle2 size={14} className="text-titan-red group-hover:text-white transition-colors" />
                                                </div>
                                                <span className="text-lg text-white/80 group-hover:text-white transition-colors">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Process */}
                                <div>
                                     <h3 className="text-3xl font-bold mb-8 border-b border-white/10 pb-6">Our Process</h3>
                                     <div className="space-y-8">
                                         {service.process.map((step, i) => (
                                             <div key={i} className="flex gap-6 group">
                                                 <div className="text-4xl font-black text-white/10 group-hover:text-titan-red transition-colors w-16 text-right shrink-0">
                                                     {step.step}
                                                 </div>
                                                 <div>
                                                     <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                                     <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                                                 </div>
                                             </div>
                                         ))}
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FEATURED PROJECTS --- */}
                {service.relatedProjects.length > 0 && (
                    <section className="px-6 md:px-12 mb-20">
                         <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">Portfolio</span>
                                <h2 className="text-3xl md:text-5xl font-bold">Related Projects</h2>
                            </div>
                            <Link href="/design-a/projects" className="font-bold border-b border-titan-navy pb-1 hover:text-titan-red hover:border-titan-red transition-colors">View All Projects</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {service.relatedProjects.map((project, i) => (
                                <FadeInWhenVisible key={i}>
                                    <Link href={`/design-a/projects/${project.id}`} className="group relative aspect-[16/9] block rounded-[2.5rem] overflow-hidden">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                        
                                        <div className="absolute bottom-0 left-0 p-10 w-full">
                                            <span className="inline-block bg-white text-titan-navy text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md mb-4">{project.category}</span>
                                            <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                                            <div className="flex items-center gap-2 text-white/80">
                                                <MapPin size={16} /> {project.location}
                                            </div>
                                        </div>

                                        <div className="absolute top-8 right-8 w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                            <ArrowRight size={24} />
                                        </div>
                                    </Link>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </section>
                )}

                 {/* --- CTA --- */}
                 <section className="px-6 md:px-12 mb-20">
                    <div className="bg-[#F5F5F7] rounded-[3rem] p-12 md:p-20 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-titan-navy">Start your {service.title} project</h2>
                        <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                            Contact our expert team today for a free consultation and feasibility study.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/design-a/contact" className="bg-titan-navy text-white px-8 py-4 rounded-full font-bold hover:bg-titan-red transition-colors shadow-lg shadow-titan-navy/20">
                                Request Quote
                            </Link>
                            <Link href="/design-a/projects" className="bg-white text-titan-navy px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-sm">
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                 </section>

                {/* --- FOOTER --- */}
                <footer className="pt-20 pb-12 px-6 md:px-12 bg-white rounded-t-[3rem] mt-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20">
                        <div>
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-titan-navy">
                                KIMMEX
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/design-a/contact" className="bg-titan-navy text-white px-8 py-4 rounded-full font-bold hover:bg-titan-red transition-colors shadow-lg shadow-titan-navy/20 text-center">
                                    Start Project
                                </Link>
                                <Link href="/design-a/projects" className="bg-gray-100 text-titan-navy px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors text-center">
                                    View Projects
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-sm text-gray-500">
                            <div>
                                <h4 className="font-bold text-titan-navy uppercase tracking-widest mb-4">Office</h4>
                                <p>Kim Mex Tower, L5</p>
                                <p>St. 590, Phnom Penh</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-titan-navy uppercase tracking-widest mb-4">Connect</h4>
                                <p>+855 23 999 999</p>
                                <p>info@kimmex.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <p>© 2026 Kimmex Construction</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-titan-navy">Privacy</a>
                            <a href="#" className="hover:text-titan-navy">Terms</a>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}
