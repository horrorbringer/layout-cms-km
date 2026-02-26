'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
    Building, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Ruler, Users,
    DraftingCompass, PenTool, Hammer, Lightbulb, Briefcase,
    Clock, ShieldCheck, TrendingUp, Star, MapPin, Search, LayoutTemplate, HardHat, Settings, Zap, Target
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useLanguage, getLocalizedText, LocalizedString } from '../../context/LanguageContext';

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
    title: LocalizedString;
    location: LocalizedString;
    image: string;
    category: LocalizedString;
};

type ServiceData = {
    id: string;
    title: LocalizedString;
    subtitle: LocalizedString;
    icon: any;
    heroImage: string;
    description: LocalizedString;
    targetAudience: LocalizedString;
    scopeOfWork: LocalizedString[];
    process: { step: string; title: LocalizedString; desc: LocalizedString; icon: any }[];
    benefits: { title: LocalizedString; desc: LocalizedString; icon: any }[];
    relatedProjects: Project[];
};

// --- Mock Data ---
const services: ServiceData[] = [
    {
        id: 'design-build',
        title: { en: 'Design & Build', kh: 'រចនា និងសាងសង់' },
        subtitle: { en: 'From Concept to Creation', kh: 'ពីគំនិតដល់ការបង្កើតថ្មី' },
        icon: PenTool,
        heroImage: '/images/projects/Thumbnail-6.jpg',
        description: { en: 'Our flagship service integrating architectural creativity with engineering precision. We manage the entire project lifecycle, ensuring a seamless transition from the drawing board to the final handover. This unified approach minimizes risks and accelerates delivery.', kh: 'សេវាកម្មដ៏សំខាន់របស់យើងរួមបញ្ចូលភាពច្នៃប្រឌិតស្ថាបត្យកម្ម និងភាពជាក់លាក់នៃវិស្វកម្ម។ យើងគ្រប់គ្រងវដ្តជីវិតគម្រោងទាំងមូល ធានាបាននូវការផ្លាស់ប្តូរយ៉ាងរលូនពីការគូសប្លង់រហូតដល់ការប្រគល់ជូន។ វិធីសាស្រ្តរួមនេះកាត់បន្ថយហានិភ័យ និងជំរុញការចែកចាយឲ្យបានរហ័ស។' },
        targetAudience: { en: 'Ideal for property developers, commercial business owners, and private investors looking for a single point of responsibility.', kh: 'ស័ក្តិសមសម្រាប់អ្នកអភិវឌ្ឍន៍អចលនទ្រព្យ ម្ចាស់អាជីវកម្មពាណិជ្ជកម្ម និងអ្នកវិនិយោគឯកជនដែលកំពុងស្វែងរកការទទួលខុសត្រូវតែមួយ។' },
        scopeOfWork: [
            { en: 'Architectural Conceptualization & 3D Rendering', kh: 'គំនូសព្រាងស្ថាបត្យកម្ម និងលក្ខណៈ 3D' },
            { en: 'Structural & Civil Engineering', kh: 'វិស្វកម្មសំណង់ និងស៊ីវិល' },
            { en: 'Mechanical, Electrical, & Plumbing (MEP) Design', kh: 'ការរចនាប្រព័ន្ធទឹក ភ្លើង និងម៉ាស៊ីន (MEP)' },
            { en: 'Permit Acquisition & Regulatory Approvals', kh: 'ការស្នើសុំលិខិតអនុញ្ញាត និងការយល់ព្រមតាមច្បាប់' },
            { en: 'Turnkey Construction Execution', kh: 'ការប្រតិបត្តិការសាងសង់ទាំងស្រុង' },
            { en: 'Interior Design & Fit-out', kh: 'ការរចនា និងតុបតែងផ្នែកខាងក្នុង' }
        ],
        process: [
            { step: '01', title: { en: 'Consultation', kh: 'ការប្រឹក្សា' }, desc: { en: 'Understanding your vision, budget, and feasibility analysis.', kh: 'ការយល់ដឹងពីចក្ខុវិស័យ ថវិកា និងការវិភាគសមិទ្ធភាព។' }, icon: Search },
            { step: '02', title: { en: 'Design & Plan', kh: 'រចនា និងយុទ្ធសាស្រ្ត' }, desc: { en: 'Developing detailed architectural and engineering blueprints.', kh: 'ការបង្កើតប្លង់ស្ថាបត្យកម្ម និងយុទ្ធសាស្រ្តលម្អិត។' }, icon: PenTool },
            { step: '03', title: { en: 'Build', kh: 'សាងសង់' }, desc: { en: 'Construction execution with rigorous quality control.', kh: 'ការអនុវត្តសាងសង់ប្រកបដោយការគ្រប់គ្រងគុណភាព។' }, icon: Hammer },
            { step: '04', title: { en: 'Handover', kh: 'ប្រគល់ជូន' }, desc: { en: 'Final inspection, documentation, and key delivery.', kh: 'ការត្រួតពិនិត្យចុងក្រោយ ឯកសារ និងការប្រគល់សោ។' }, icon: CheckCircle2 }
        ],
        benefits: [
            { title: { en: 'Single Point of Contact', kh: 'ចំណុចទំនាក់ទំនងតែមួយ' }, desc: { en: 'Streamlined communication and accountability.', kh: 'ការប្រាស្រ័យទាក់ទង និងការទទួលខុសត្រូវមានប្រសិទ្ធភាព។' }, icon: Users },
            { title: { en: 'Accelerated Timeline', kh: 'ពេលវេលាលឿនរហ័ស' }, desc: { en: 'Overlapping design and construction phases.', kh: 'ការត្រួតគ្នានៃដំណាក់កាលរចនា និងការសាងសង់។' }, icon: Clock },
            { title: { en: 'Cost Certainty', kh: 'ភាពប្រាកដប្រជាថ្លៃដើម' }, desc: { en: 'Minimized change orders and precise budgeting.', kh: 'កាត់បន្ថយការផ្លាស់ប្តូរ និងរៀបចំថវិកាបានត្រឹមត្រូវ។' }, icon: TrendingUp },
            { title: { en: 'Quality Assurance', kh: 'ធានាគុណភាព' }, desc: { en: 'Integrated teams ensure design intent is met.', kh: 'ក្រុមការងារប្រកបដោយវិជ្ជាជីវៈធានាបាននូវការរចនាស្របតាមគោលដៅ។' }, icon: ShieldCheck }
        ],
        relatedProjects: [
            { id: '1', title: { en: 'Vattanac Capital Extension', kh: 'ការពង្រីកបរិវេណ វឌ្ឍនៈ កាពីតាល' }, location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' }, category: { en: 'Commercial', kh: 'ពាណិជ្ជកម្ម' }, image: '/images/projects/Thumbnail-1.jpg' },
            { id: '2', title: { en: 'Skyline Residential', kh: 'អគារលំនៅដ្ឋាន Skyline' }, location: { en: 'Siem Reap', kh: 'សៀមរាប' }, category: { en: 'Residential', kh: 'លំនៅដ្ឋាន' }, image: '/images/projects/Thumbnail-4.jpg' }
        ]
    },
    {
        id: 'renovation',
        title: { en: 'Construction', kh: 'ការសាងសង់' },
        subtitle: { en: 'Building the Future with Precision', kh: 'កសាងអនាគតជាមួយនឹងភាពច្បាស់លាស់' },
        icon: Hammer,
        heroImage: '/images/projects/Thumbnail-4.jpg',
        description: { en: 'We specialize in high-quality construction of residential, commercial, and industrial structures. From ground-breaking to the final coat of paint, our expert team ensures structural integrity, modern aesthetics, and adherence to the strictest safety standards.', kh: 'យើងមានជំនាញក្នុងការសាងសង់លំនៅដ្ឋាន ពាណិជ្ជកម្ម និងរចនាសម្ព័ន្ធឧស្សាហកម្មប្រកបដោយគុណភាពខ្ពស់។ ពីដំណាក់កាលបុកគ្រឹះរហូតដល់ការលាបពណ៌ចុងក្រោយ ក្រុមការងាររបស់យើងធានាបាននូវភាពរឹងមាំ សោភ័ណភាព និងការអនុលោមតាមស្តង់ដារសុវត្ថិភាពយ៉ាងតឹងរ៉ឹងបំផុត។' },
        targetAudience: { en: 'Ideal for property developers, government agencies, and private investors seeking reliable construction excellence.', kh: 'ស័ក្តិសមសម្រាប់អ្នកអភិវឌ្ឍន៍អចលនទ្រព្យ ស្ថាប័នរដ្ឋាភិបាល និងអ្នកវិនិយោគឯកជនដែលកំពុងស្វែងរកស្ថេរភាពសំណង់។' },
        scopeOfWork: [
            { en: 'Structural Engineering & Foundations', kh: 'វិស្វកម្មសំណង់ និងការរៀបចំគ្រឹះ' },
            { en: 'Reinforced Concrete Works', kh: 'ការងារបេតុងប្រដាប់ដែក' },
            { en: 'Steel Structure Fabrication & Erection', kh: 'ការផលិត និងការដំឡើងរចនាសម្ព័ន្ធដែក' },
            { en: 'Masonry & Structural Framing', kh: 'ការសាងសង់ជញ្ជាំង និងរចនាសម្ព័ន្ធអគារ' },
            { en: 'MEP System Installation', kh: 'ការដំឡើងប្រព័ន្ធទឹក ភ្លើង និងម៉ាស៊ីន (MEP)' },
            { en: 'Comprehensive Site Finishing', kh: 'បញ្ចប់ការងារសំណង់ទាំងស្រុង' }
        ],
        process: [
            { step: '01', title: { en: 'Survey', kh: 'ការសិក្សាទីតាំង' }, desc: { en: 'Detailed site analysis, topographical survey, and soil testing.', kh: 'ការវិភាគទីតាំង ទម្រង់ដី និងការធ្វើតេស្តលក្ខណៈដី។' }, icon: Target },
            { step: '02', title: { en: 'Preparation', kh: 'ការរៀបចំ' }, desc: { en: 'Site clearing, mobilization of equipment, and foundation layout.', kh: 'ការសម្អាតទីតាំង ការបញ្ជូនសម្ភារៈ និងការផ្តើមគ្រឹះ។' }, icon: LayoutTemplate },
            { step: '03', title: { en: 'Execution', kh: 'ការអនុវត្ត' }, desc: { en: 'Phased construction with expert supervision and QA/QC.', kh: 'ការសាងសង់តាមដំណាក់កាលជាមួយនឹងការគ្រប់គ្រងគុណភាព (QA/QC)។' }, icon: HardHat },
            { step: '04', title: { en: 'Finalization', kh: 'ការបញ្ចប់ការងារ' }, desc: { en: 'Structural certification, site cleanup, and project handover.', kh: 'ការផ្ទៀងផ្ទាត់គុណភាព ការសម្អាតទីតាំង និងការប្រគល់គម្រោង។' }, icon: CheckCircle2 }
        ],
        benefits: [
            { title: { en: 'Structural Integrity', kh: 'ភាពរឹងមាំរចនាសម្ព័ន្ធ' }, desc: { en: 'Built to exceed standard building codes and regulations.', kh: 'សាងសង់ល្អជាងបទដ្ឋាន និងប្បញ្ញត្តិសំណង់។' }, icon: ShieldCheck },
            { title: { en: 'Expert Craftsmanship', kh: 'ភាពប៉ិនប្រសប់វិជ្ជាជីវៈ' }, desc: { en: 'Attention to detail in every brick and beam.', kh: 'យកចិត្តទុកដាក់លម្អិតនៅគ្រប់ឥដ្ឋ និងធ្នឹម។' }, icon: Star },
            { title: { en: 'Safety Commitment', kh: 'ការប្តេជ្ញាចិត្តសុវត្ថិភាព' }, desc: { en: 'Zero-incident policy on all construction sites.', kh: 'គោលការណ៍កាត់បន្ថយគ្រោះថ្នាក់បានទាំងស្រុងនៅគ្រប់ទីតាំងសំណង់។' }, icon: ShieldCheck },
            { title: { en: 'Value Engineering', kh: 'ការវាយតម្លៃវិស្វកម្ម' }, desc: { en: 'Optimizing materials for durability and cost-efficiency.', kh: 'ចំណេញវត្ថុធាតុនៃការសាងសង់ដើម្បីបានគុណភាព និងសន្សំសំចៃ។' }, icon: TrendingUp }
        ],
        relatedProjects: [
            { id: '3', title: { en: 'Colonial Villa Restoration', kh: 'ការស្តារវីឡាកូឡូនីស' }, location: { en: 'Kep', kh: 'កែប' }, category: { en: 'Heritage', kh: 'បេតិកភណ្ឌ' }, image: '/images/projects/Thumbnail-9.jpg' },
            { id: '4', title: { en: 'Tech Hub Office', kh: 'ការិយាល័យ Tech Hub' }, location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' }, category: { en: 'Corporate', kh: 'សាជីវកម្ម' }, image: '/images/projects/Thumbnail-2.jpg' }
        ]
    },
    {
        id: 'project-management',
        title: { en: 'Project Management', kh: 'ការគ្រប់គ្រងគម្រោង' },
        subtitle: { en: 'Strategic Oversight & Expert Advisory', kh: 'ការត្រួតពិនិត្យយុទ្ធសាស្រ្ត និងការប្រឹក្សាជំនាញ' },
        icon: Briefcase,
        heroImage: '/images/projects/Thumbnail-5.jpg',
        description: { en: 'Comprehensive oversight ensuring your project is delivered to the highest standards. We combine professional disciplined management of contractors, schedules, and costs with strategic technical insights and feasibility studies to optimize your investment value.', kh: 'ការត្រួតពិនិត្យទូលំទូលាយធានាបាននូវគម្រោងប្រគល់ដល់គុណភាពខ្ពស់។ យើងរួមបញ្ចូលការគ្រប់គ្រងអ្នកម៉ៅការសាងសង់ កាលវិភាគ និងការចំណាយជាមួយជំនាញត្រួតពិនិត្យបច្ចេកទេសដើម្បីបង្កើនតម្លៃនៃការវិនិយោគរបស់លោកអ្នក។' },
        targetAudience: { en: 'Investors and owners who need expert representation, control over complex projects, and data-driven strategic advice.', kh: 'អ្នកវិនិយោគ និងម្ចាស់គម្រោងដែលត្រូវការតំណាងវិជ្ជាជីវៈ ការគ្រប់គ្រងលើគម្រោងស្មុគស្មាញ និងការណែនាំយុទ្ធសាស្រ្តផ្ទាល់ខ្លួន។' },
        scopeOfWork: [
            { en: 'Project Planning, Scheduling & Budget Control', kh: 'ការធ្វើផែនការគម្រោង ការកំណត់ពេលវេលា និងការគ្រប់គ្រងថវិកា' },
            { en: 'Feasibility Studies & Market Analysis', kh: 'ការសិក្សាសមិទ្ធភាព និងការវិភាគទីផ្សារ' },
            { en: 'Contract Administration & Risk Management', kh: 'ការគ្រប់គ្រងកិច្ចសន្យា និងហានិភ័យ' },
            { en: 'Quality Assurance (QA/QC) & HSE Oversight', kh: 'ការធានាគុណភាព (QA/QC) និងប្រព័ន្ធសុវត្ថិភាព(HSE)' },
            { en: 'Value Engineering & Cost Optimization', kh: 'ការវាយតម្លៃវិស្វកម្ម និងការសន្សំសំចំណាយ' },
            { en: 'Regulatory Compliance Advisory', kh: 'ការអនុលោមតាមបទប្បញ្ញត្តិច្បាប់' }
        ],
        process: [
            { step: '01', title: { en: 'Consultation & Analysis', kh: 'ការប្រឹក្សា និងការវិភាគ' }, desc: { en: 'Understanding requirements, performing site data deep dives, and feasibility analysis.', kh: 'ការយល់ដឹងពីតម្រូវការ ការសិក្សាទីតាំង និងការសិក្សាសមិទ្ធភាព។' }, icon: Users },
            { step: '02', title: { en: 'Planning & Procurement', kh: 'ការធ្វើផែនការ និងការផ្គត់ផ្គង់' }, desc: { en: 'Defining project roadmap, budgets, baselines, and vendor selection.', kh: 'កំណត់គុណតម្លៃគម្រោង ការគ្រប់គ្រងថវិកា និងជ្រើសរើសអ្នកផ្គត់ផ្គង់។' }, icon: LayoutTemplate },
            { step: '03', title: { en: 'Execution & Advisory', kh: 'ការអនុវត្ត និងការប្រឹក្សា' }, desc: { en: 'On-site management, daily coordination, and ongoing strategic guidance.', kh: 'គ្រប់គ្រងនៅទីតាំងផ្ទាល់ សម្របសម្រួលប្រចាំថ្ងៃ និងណែនាំយុទ្ធសាស្រ្ត។' }, icon: HardHat },
            { step: '04', title: { en: 'Close-out & Reporting', kh: 'ការបញ្ចប់ និងការរាយការណ៍' }, desc: { en: 'Final accounting, documentation, and delivering actionable recommendations.', kh: 'របាយការណ៍គណនេយ្យចុងក្រោយ រៀបចំឯកសារ និងបញ្ជូនអនុសាសន៍។' }, icon: CheckCircle2 }
        ],
        benefits: [
            { title: { en: 'Informed Decisions', kh: 'ការសម្រេចចិត្តប្រកបដោយចំណេះដឹង' }, desc: { en: 'Data-driven insights to reduce investment risk effectively.', kh: 'ផ្អែកលើទិន្នន័យច្បាស់លាស់ដើម្បីកាត់បន្ថយហានិភ័យវិនិយោគប្រកបដោយប្រសិទ្ធភាព។' }, icon: Lightbulb },
            { title: { en: 'Budget & Cost Control', kh: 'ការគ្រប់គ្រងថវិកា និងចំណាយ' }, desc: { en: 'Detailed tracking and value engineering prevent cost overruns.', kh: 'ការតាមដានលម្អិត និងបច្ចេកទេសវិស្វកម្មតម្លៃបង្ការការចំណាយហួសកម្រិត។' }, icon: TrendingUp },
            { title: { en: 'Timely Quality Delivery', kh: 'ការប្រគល់ជូនទាន់ពេលវេលាដែលមានគុណភាព' }, desc: { en: 'Strict schedule enforcement and quality standards.', kh: 'អនុវត្តយ៉ាងម៉ឺងម៉ាត់តាមកម្មវិធីការងារ និងស្តង់ដារគុណភាព។' }, icon: Clock },
            { title: { en: 'Risk & Strategy', kh: 'ហានិភ័យ និងយុទ្ធសាស្រ្ត' }, desc: { en: 'Proactive issue resolution and smooth regulatory navigation.', kh: 'ដោះស្រាយបញ្ហាយ៉ាងសកម្ម និងរុករកយ៉ាងរលូនរាល់បទប្បញ្ញត្តិដែលមានស្រាប់។' }, icon: ShieldCheck }
        ],
        relatedProjects: [
            { id: '5', title: { en: 'Logistics Center Ph-1', kh: 'មជ្ឈមណ្ឌលភស្តុភារ ដំណាក់កាលទី ១' }, location: { en: 'Sihanoukville', kh: 'ព្រះសីហនុ' }, category: { en: 'Industrial', kh: 'ឧស្សាហកម្ម' }, image: '/images/projects/Thumbnail-7.jpg' },
            { id: '6', title: { en: 'Eco-Resort Masterplan', kh: 'ផែនការមេសណ្ឋាគារធម្មជាតិ' }, location: { en: 'Koh Kong', kh: 'កោះកុង' }, category: { en: 'Hospitality', kh: 'បដិសណ្ឋារកិច្ច' }, image: '/images/projects/Thumbnail-8.jpg' }
        ]
    }
];

export default function ServiceDetailPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id || 'design-build';
    // Fallback to first if not found
    const service = services.find(s => s.id === id) || services[0];
    const Icon = service.icon || Building;

    const { language, t } = useLanguage();

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
                    <Image src={service.heroImage} alt={getLocalizedText(service.title, language)} width={1920} height={1200} className="w-full h-[120%] object-cover opacity-50 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/80 via-titan-navy/40 to-titan-navy"></div>
                </motion.div>

                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center max-w-5xl px-6 pt-20 mt-10">
                    <Link href="/design-z/services" className="inline-flex items-center gap-2 text-white/60 hover:text-titan-red transition-all font-bold uppercase tracking-widest text-xs mb-8 group">
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-titan-red group-hover:bg-titan-red group-hover:text-white transition-all">
                            <ArrowLeft size={12} />
                        </div>
                        {t('Back')}
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
                        {getLocalizedText(service.title, language)}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        {getLocalizedText(service.subtitle, language)}
                    </motion.p>
                </motion.div>
            </section>

            {/* === 2. SERVICE OVERVIEW === */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <FadeInWhenVisible>
                        <div className="mb-12">
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{t('Overview')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">{language === 'kh' ? 'ការកំណត់ឡើងវិញនូវ' : 'Redefining'} {getLocalizedText(service.title, language)}</h2>
                            <p className="text-lg md:text-xl text-titan-navy/60 leading-relaxed mb-10">
                                {getLocalizedText(service.description, language)}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-titan-red shadow-sm">
                            <h3 className="text-xl font-bold text-titan-navy mb-3 flex items-center gap-3">
                                <div className="p-2 bg-titan-red/10 rounded-lg">
                                    <Users size={20} className="text-titan-red" />
                                </div>
                                {language === 'kh' ? 'ស័ក្តិសមសម្រាប់' : 'Ideal For'}
                            </h3>
                            <p className="text-titan-navy/70 leading-relaxed">
                                {getLocalizedText(service.targetAudience, language)}
                            </p>
                        </div>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={0.2}>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-titan-red/5 rounded-[2rem] rotate-2 group-hover:rotate-1 transition-transform duration-500"></div>
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                                <Image src={service.heroImage} alt="Service Overview" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'វិសាលភាពការងារ' : 'Scope of Work'}</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">{language === 'kh' ? 'សេវាកម្មដ៏ទូលំទូលាយ' : 'Comprehensive Coverage'}</h2>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.scopeOfWork.map((item, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="group flex items-start gap-5 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-titan-red/30 transition-all duration-300 h-full">
                                    <div className="w-10 h-10 rounded-full bg-titan-red/20 flex items-center justify-center shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors duration-300">
                                        <CheckCircle2 className="text-titan-red group-hover:text-white" size={20} />
                                    </div>
                                    <span className="font-bold text-lg leading-tight pt-2 group-hover:text-titan-red transition-colors">{getLocalizedText(item, language)}</span>
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
                            <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'ដំណើរការរបស់យើង' : 'Our Process'}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">{language === 'kh' ? 'មាគ៌ាឆ្ពោះទៅរកភាពជោគជ័យ' : 'The Path to Success'}</h2>
                            <p className="text-titan-navy/60 text-xl">{language === 'kh' ? 'វិធីសាស្រ្តដែលមានរចនាសម្ព័ន្ធ និងតម្លាភាពដើម្បីធានាភាពជោគជ័យនៃគម្រោងរបស់អ្នក។' : 'A transparent, structured approach to ensure your project\'s success.'}</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-titan-red/50 to-transparent z-0">
                            {/* Animated Pulse on Line */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-titan-red to-transparent opacity-40 w-1/4 h-full"
                                animate={{ left: ['-25%', '100%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                            {service.process.map((step, i) => (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <div className="flex flex-col items-center text-center group">
                                        {/* Step Circle Container */}
                                        <div className="relative mb-12">
                                            {/* Large Background Ghost Number */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-9xl font-black text-titan-navy/[0.03] group-hover:text-titan-red/[0.06] transition-all duration-700 pointer-events-none z-0 tracking-tighter">
                                                {step.step}
                                            </div>

                                            {/* Decorative Light Ring */}
                                            <div className="absolute -inset-8 bg-titan-red/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-100 border border-titan-navy/5 blur-2xl"></div>

                                            {/* Rotating Architectural Square */}
                                            <div className="w-28 h-28 bg-[#0B1221] border-[1px] border-white/5 rounded-2xl flex items-center justify-center relative z-10 group-hover:border-titan-red transition-all duration-700 rotate-45 group-hover:rotate-[225deg] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.2)]">
                                                <div className="-rotate-45 group-hover:-rotate-[225deg] transition-all duration-500 flex flex-col items-center">
                                                    <step.icon size={36} className="text-white group-hover:text-titan-red transition-colors" />
                                                </div>
                                            </div>

                                            {/* Floating Mini Step Indicator */}
                                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-titan-red rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(255,107,0,0.2)] border-[3px] border-gray-50 z-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                                                <span className="text-[12px] font-black text-white tracking-tight">{step.step}</span>
                                            </div>
                                        </div>

                                        <div className="px-4">
                                            <h3 className="text-xl font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors">
                                                {getLocalizedText(step.title, language)}
                                            </h3>
                                            <p className="text-sm text-titan-navy/50 leading-relaxed max-w-[240px] mx-auto group-hover:text-titan-navy/80 transition-colors">
                                                {getLocalizedText(step.desc, language)}
                                            </p>
                                        </div>
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
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'ហេតុអ្វីជ្រើសរើសយើង' : 'Why Choose Us'}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-titan-navy">{language === 'kh' ? 'គុណតម្លៃដែលផ្តល់ជូន' : 'Value Delivered'}</h2>
                    </div>
                </FadeInWhenVisible>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {service.benefits.map((benefit, i) => (
                        <FadeInWhenVisible key={i} delay={i * 0.1}>
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group h-full">
                                <div className="w-16 h-16 bg-titan-navy/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                    <benefit.icon size={30} className="text-titan-navy group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors">{getLocalizedText(benefit.title, language)}</h3>
                                <p className="text-titan-navy/60 leading-relaxed">
                                    {getLocalizedText(benefit.desc, language)}
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
                                    <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-4 block">{language === 'kh' ? 'ស្នាដៃ' : 'Portfolio'}</span>
                                    <h2 className="text-4xl md:text-5xl font-black">{t('Featured Projects')}</h2>
                                </div>
                                <Link href="/design-z/projects" className="mt-8 md:mt-0 px-8 py-3 bg-white/10 hover:bg-white hover:text-titan-navy transition-all font-bold uppercase tracking-widest text-sm flex items-center gap-2 rounded-lg backdrop-blur-sm">
                                    {language === 'kh' ? 'មើលគម្រោងទាំងអស់' : 'View All Projects'} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </FadeInWhenVisible>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {service.relatedProjects.map((project, i) => (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <Link href={`/design-z/projects/${project.id}`} className="group relative aspect-[16/9] overflow-hidden rounded-2xl cursor-pointer block shadow-2xl">
                                        <Image src={project.image} alt={getLocalizedText(project.title, language)} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                                        <div className="absolute bottom-0 left-0 p-8 w-full">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <span className="inline-block bg-titan-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">{getLocalizedText(project.category, language)}</span>
                                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{getLocalizedText(project.title, language)}</h3>
                                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                                    <MapPin size={16} className="text-titan-red" /> {getLocalizedText(project.location, language)}
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
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{language === 'kh' ? 'រួចរាល់សម្រាប់ការចាប់ផ្តើម?' : 'Ready to start?'}</h2>
                        <p className="text-white/90 text-xl mb-10 font-medium">
                            {language === 'kh' ? 'ទាក់ទងក្រុមការងារជំនាញរបស់យើងថ្ងៃនេះ សម្រាប់ការពិគ្រោះយោបល់ និងការសិក្សាសមិទ្ធភាពដោយឥតគិតថ្លៃ។' : 'Contact our expert team today for a free consultation and feasibility study.'}
                        </p>
                        <Link href="/design-z/contact" className="inline-flex items-center gap-2 bg-white text-titan-red px-10 py-5 font-bold uppercase tracking-widest hover:bg-titan-navy hover:text-white transition-all shadow-xl rounded-lg">
                            {language === 'kh' ? 'ស្នើសុំការប្រឹក្សា' : 'Request Quote'} <ArrowRight size={18} />
                        </Link>
                    </FadeInWhenVisible>
                </div>
            </section>
        </div>
    );
}
