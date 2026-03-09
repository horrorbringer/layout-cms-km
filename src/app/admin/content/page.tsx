'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Layout,
    Type,
    Image as ImageIcon,
    Quote,
    Phone,
    Trophy,
    Save,
    Plus,
    ChevronRight,
    Hammer,
    ShieldCheck,
    Clock,
    Target,
    Trash2,
    Calendar,
    MapPin,
    ExternalLink,
    Briefcase,
    Eye,
    Award,
    Circle,
    Upload,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutData } from '@/app/design-z/data/aboutData';
import { serviceData } from '@/app/design-z/data/serviceData';
import { serviceDetails, ServiceDetail as ServiceDetailType } from '@/app/design-z/data/serviceDetailData';
import { contactData } from '@/app/design-z/data/contactData';
import { homeData } from '@/app/design-z/data/homeData';
import { jobData } from '@/app/design-z/data/jobData';
import { careerContent, CareerContent } from '@/app/design-z/data/careerContent';
import { milestones as staticMilestones, Milestone as MilestoneType } from '@/app/design-z/data/milestonesData';
import ServiceDetailEditor from './components/ServiceDetailEditor';
import JobEditor from './components/JobEditor';
import { LocalizedString } from '@/app/design-z/context/LanguageContext';

import ActionDropdown from '../_components/ActionDropdown';
import { useToast } from '@/app/admin/_context/ToastContext';
import { useConfirm } from '@/app/admin/_context/ConfirmContext';
import { useLanguage } from '@/app/design-z/context/LanguageContext';

// --- TYPES ---
interface ProcessStep {
    id: string;
    step: string;
    title: LocalizedString;
    desc: LocalizedString;
}

interface ValueItem {
    id: string;
    title: LocalizedString;
    content: LocalizedString;
}

interface Job {
    id: string;
    title: LocalizedString;
    loc: LocalizedString;
    type: LocalizedString;
    date: LocalizedString;
    dept: string;
    summary: LocalizedString;
    salary: LocalizedString;
    experience: LocalizedString;
    responsibilities: LocalizedString[];
    requirements: LocalizedString[];
    benefits: LocalizedString[];
}

interface Testimonial {
    id: string;
    author: LocalizedString;
    quote: LocalizedString;
    role: LocalizedString;
}

interface ServiceFeatureItem {
    en: string;
    kh: string;
}

interface ServiceItem {
    id: string;
    title: LocalizedString;
    desc: LocalizedString;
    image: string;
    features: ServiceFeatureItem[];
}

interface ProcessItem {
    id: string;
    step: string;
    title: LocalizedString;
    desc: LocalizedString;
}

interface SectorItem {
    id: string;
    title: LocalizedString;
    image: string;
}

interface StatItem {
    label: LocalizedString;
    value: LocalizedString;
    iconName: string;
}

interface Milestone extends MilestoneType { }

interface ServiceDetail extends ServiceDetailType { }

function AdminContentEditor() {
    const searchParams = useSearchParams();
    const sectionParam = searchParams.get('section') || 'home';
    const [activeSection, setActiveSection] = useState(sectionParam);
    const [editLang, setEditLang] = useState<'en' | 'kh'>('en');
    const [isSaving, setIsSaving] = useState(false);

    const { showToast } = useToast();
    const { confirm } = useConfirm();
    const { language } = useLanguage();
    const [uploadingId, setUploadingId] = useState<string | null>(null);

    // --- STATE FOR CONTENT ---
    const [homeHero, setHomeHero] = useState(() => ({
        title: typeof homeData.hero.title === 'string' ? { en: homeData.hero.title, kh: homeData.hero.title } : homeData.hero.title,
        subtitle: typeof homeData.hero.subtitle === 'string' ? { en: homeData.hero.subtitle, kh: homeData.hero.subtitle } : homeData.hero.subtitle
    }));

    const [stats, setStats] = useState<StatItem[]>(() =>
        homeData.stats.map(s => ({
            label: typeof s.label === 'string' ? { en: s.label, kh: s.label } : s.label,
            value: typeof s.value === 'string' ? { en: s.value, kh: s.value } : s.value,
            iconName: s.iconName
        }))
    );

    const [processSteps, setProcessSteps] = useState<ProcessStep[]>(() =>
        homeData.process.map(p => ({
            id: p.id,
            step: p.step,
            title: typeof p.title === 'string' ? { en: p.title, kh: p.title } : p.title,
            desc: typeof p.desc === 'string' ? { en: p.desc, kh: p.desc } : p.desc
        }))
    );

    const [aboutStory, setAboutStory] = useState<LocalizedString>(() => {
        const story = aboutData.story;
        if (typeof story === 'string') return { en: story, kh: story };
        return story;
    });

    const [values, setValues] = useState<ValueItem[]>(() => {
        return aboutData.values.map(v => ({
            id: v.id,
            title: typeof v.title === 'string' ? { en: v.title, kh: v.title } : v.title,
            content: typeof v.content === 'string' ? { en: v.content, kh: v.content } : v.content
        }));
    });

    const [services, setServices] = useState<ServiceItem[]>(() =>
        serviceData.services.map(s => ({
            id: s.id,
            title: typeof s.title === 'string' ? { en: s.title, kh: s.title } : s.title,
            desc: typeof s.desc === 'string' ? { en: s.desc, kh: s.desc } : s.desc,
            image: s.image,
            features: s.features.map((f: any) => ({ en: f.en || f, kh: f.kh || f.en || f }))
        }))
    );

    const [processStepsService, setProcessStepsService] = useState<ProcessItem[]>(() =>
        serviceData.process.map(p => ({
            id: p.id,
            step: p.step,
            title: typeof p.title === 'string' ? { en: p.title, kh: p.title } : p.title,
            desc: typeof p.desc === 'string' ? { en: p.desc, kh: p.desc } : p.desc
        }))
    );

    const [sectors, setSectors] = useState<SectorItem[]>(() =>
        serviceData.sectors.map(s => ({
            id: s.id,
            title: typeof s.title === 'string' ? { en: s.title, kh: s.title } : s.title,
            image: s.image
        }))
    );

    const [detailsMap, setDetailsMap] = useState<Record<string, ServiceDetail>>(serviceDetails);
    const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
    const [editingJobId, setEditingJobId] = useState<string | null>(null);

    const [jobs, setJobs] = useState<Job[]>(() =>
        jobData.map(j => ({
            id: j.id,
            title: typeof j.title === 'string' ? { en: j.title, kh: j.title } : (j.title || { en: '', kh: '' }),
            loc: typeof j.loc === 'string' ? { en: j.loc, kh: j.loc } : (j.loc || { en: '', kh: '' }),
            type: typeof j.type === 'string' ? { en: j.type, kh: j.type } : (j.type || { en: '', kh: '' }),
            date: typeof j.postedDate === 'string' ? { en: j.postedDate, kh: j.postedDate } : (j.postedDate || { en: '', kh: '' }),
            dept: j.dept || 'Operations',
            summary: typeof j.summary === 'string' ? { en: j.summary, kh: j.summary } : (j.summary || { en: '', kh: '' }),
            salary: typeof j.salary === 'string' ? { en: j.salary, kh: j.salary } : (j.salary || { en: 'Negotiable', kh: 'ចរចា' }),
            experience: typeof j.experience === 'string' ? { en: j.experience, kh: j.experience } : (j.experience || { en: '2+ Years', kh: '២+ ឆ្នាំ' }),
            responsibilities: (j.responsibilities || []).map(r => typeof r === 'string' ? { en: r, kh: r } : r),
            requirements: (j.requirements || []).map(r => typeof r === 'string' ? { en: r, kh: r } : r),
            benefits: (j.benefits || []).map(b => typeof b === 'string' ? { en: b, kh: b } : b)
        }))
    );

    const [careerMain, setCareerMain] = useState<CareerContent>(careerContent);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/cms/jobs');
                const data = await res.json();
                if (data.jobs) {
                    const dbJobSlugs = new Set(data.jobs.map((j: any) => j.id));

                    // Start with transformed DB jobs
                    const updatedJobs = data.jobs.map((j: any) => {
                        const staticJob = jobData.find((sj: any) => sj.id === j.id);
                        return {
                            id: j.id,
                            title: j.title || staticJob?.title || { en: '', kh: '' },
                            loc: j.loc || staticJob?.loc || { en: '', kh: '' },
                            type: j.type || staticJob?.type || { en: '', kh: '' },
                            date: j.postedDate || staticJob?.postedDate || { en: '', kh: '' },
                            dept: j.dept || staticJob?.dept || 'Operations',
                            summary: j.summary || staticJob?.summary || { en: '', kh: '' },
                            salary: j.salary || staticJob?.salary || { en: 'Negotiable', kh: 'ចរចា' },
                            experience: j.experience || staticJob?.experience || { en: '2+ Years', kh: '២+ ឆ្នាំ' },
                            responsibilities: (j.responsibilities && j.responsibilities.length > 0) ? j.responsibilities : (staticJob?.responsibilities || []),
                            requirements: (j.requirements && j.requirements.length > 0) ? j.requirements : (staticJob?.requirements || []),
                            benefits: (j.benefits && j.benefits.length > 0) ? j.benefits : (staticJob?.benefits || [])
                        };
                    });

                    // Add static jobs that are NOT in DB
                    const onlyInStatic = jobData.filter(sj => !dbJobSlugs.has(sj.id)).map(j => ({
                        id: j.id,
                        title: typeof j.title === 'string' ? { en: j.title, kh: j.title } : (j.title || { en: '', kh: '' }),
                        loc: typeof j.loc === 'string' ? { en: j.loc, kh: j.loc } : (j.loc || { en: '', kh: '' }),
                        type: typeof j.type === 'string' ? { en: j.type, kh: j.type } : (j.type || { en: '', kh: '' }),
                        date: typeof (j as any).postedDate === 'string' ? { en: (j as any).postedDate, kh: (j as any).postedDate } : ((j as any).postedDate || { en: '', kh: '' }),
                        dept: j.dept || 'Operations',
                        summary: typeof j.summary === 'string' ? { en: j.summary, kh: j.summary } : (j.summary || { en: '', kh: '' }),
                        salary: typeof j.salary === 'string' ? { en: j.salary, kh: j.salary } : (j.salary || { en: 'Negotiable', kh: 'ចរចា' }),
                        experience: typeof j.experience === 'string' ? { en: j.experience, kh: j.experience } : (j.experience || { en: '2+ Years', kh: '២+ ឆ្នាំ' }),
                        responsibilities: (j.responsibilities || []).map(r => typeof r === 'string' ? { en: r, kh: r } : r),
                        requirements: (j.requirements || []).map(r => typeof r === 'string' ? { en: r, kh: r } : r),
                        benefits: (j.benefits || []).map(b => typeof b === 'string' ? { en: b, kh: b } : b)
                    }));

                    setJobs([...updatedJobs, ...onlyInStatic]);
                }
            } catch (err) {
                console.error('Fetch jobs failed:', err);
            }
        };
        fetchJobs();
    }, []);

    const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
        homeData.testimonials.map(t => ({
            id: t.id,
            author: typeof t.author === 'string' ? { en: t.author, kh: t.author } : t.author,
            quote: typeof t.quote === 'string' ? { en: t.quote, kh: t.quote } : t.quote,
            role: typeof t.role === 'string' ? { en: t.role, kh: t.role } : t.role
        }))
    );

    const [milestones, setMilestones] = useState<Milestone[]>(() =>
        staticMilestones.map(m => ({
            year: m.year,
            title: typeof m.title === 'string' ? { en: m.title, kh: m.title } : m.title,
            desc: typeof m.desc === 'string' ? { en: m.desc, kh: m.desc } : m.desc,
            image: m.image,
            projects: m.projects?.map(p => typeof p === 'string' ? { en: p, kh: p } : p) || []
        }))
    );

    const [contact, setContact] = useState({
        address: {
            en: contactData.address.en,
            kh: contactData.address.kh || contactData.address.en
        },
        phone: contactData.phone.join(', '),
        email: contactData.email.join(', '),
        hours: {
            en: contactData.hours.en,
            kh: contactData.hours.kh || contactData.hours.en
        },
        googleMapsUrl: contactData.googleMapsUrl,
        socials: {
            facebook: contactData.socials.facebook,
            linkedin: contactData.socials.linkedin,
            instagram: contactData.socials.instagram,
        }
    });

    useEffect(() => {
        setActiveSection(sectionParam);
        if (typeof window !== 'undefined' && window.location.hash) {
            const id = window.location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [sectionParam]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (activeSection === 'about') {
                const updatedAboutData = {
                    story: aboutStory,
                    values: values
                };

                const res1 = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'aboutData.ts', data: updatedAboutData })
                });

                const res2 = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'milestonesData.ts', data: milestones })
                });

                if (!res1.ok || !res2.ok) throw new Error('Failed to save content');
            }

            if (activeSection === 'services') {
                const updatedServiceData = {
                    services,
                    process: processStepsService,
                    sectors
                };

                const res1 = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'serviceData.ts', data: updatedServiceData })
                });
                if (!res1.ok) throw new Error('Failed to save serviceData');

                const res2 = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'serviceDetailData.ts', data: detailsMap })
                });
                if (!res2.ok) throw new Error('Failed to save serviceDetailData');
            }

            if (activeSection === 'home' || activeSection === 'testimonials') {
                const updatedHomeData = {
                    hero: homeHero,
                    stats: stats,
                    process: processSteps,
                    testimonials: testimonials
                };

                const response = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'homeData.ts', data: updatedHomeData })
                });

                if (!response.ok) throw new Error('Failed to save content');
            }

            if (activeSection === 'careers') {
                const updatedJobData = jobs.map(j => {
                    const orig = jobData.find(oj => oj.id === j.id);
                    return {
                        ...orig,
                        id: j.id,
                        title: j.title,
                        loc: j.loc,
                        type: j.type,
                        postedDate: j.date,
                        dept: j.dept,
                        summary: j.summary,
                        salary: j.salary,
                        experience: j.experience,
                        responsibilities: j.responsibilities,
                        requirements: j.requirements,
                        benefits: j.benefits
                    };
                });

                const response = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'jobData.ts', data: updatedJobData })
                });

                if (!response.ok) throw new Error('Failed to save job listings');

                const careerRes = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'careerContent.ts', data: careerMain })
                });

                if (!careerRes.ok) throw new Error('Failed to save career content');
            }

            if (activeSection === 'contact') {
                const updatedContactData = {
                    ...contactData,
                    address: contact.address,
                    phone: contact.phone.split(',').map(p => p.trim()),
                    email: contact.email.split(',').map(e => e.trim()),
                    hours: contact.hours,
                    googleMapsUrl: contact.googleMapsUrl,
                    socials: contact.socials
                };

                const res = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'contactData.ts', data: updatedContactData })
                });
                if (!res.ok) throw new Error('Failed to save contactData');
            }

            showToast('Changes saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving:', error);
            showToast('Failed to save changes.', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    // --- HANDLERS ---
    const addProcessStep = () => {
        const nextStep = (processSteps.length + 1).toString().padStart(2, '0');
        setProcessSteps([...processSteps, {
            id: Date.now().toString(),
            step: nextStep,
            title: { en: 'New Process Step', kh: 'ជំហានថ្មី' },
            desc: { en: 'Step description', kh: 'ការពិពណ៌នា' }
        }]);
    };

    const deleteProcessStep = (id: string) => {
        setProcessSteps(processSteps.filter(s => s.id !== id).map((s, i) => ({
            ...s,
            step: (i + 1).toString().padStart(2, '0')
        })));
    };

    const addStat = () => {
        setStats([...stats, { label: { en: 'New Stat', kh: 'ស្ថិតិថ្មី' }, value: { en: '0+', kh: '០+' }, iconName: 'Award' }]);
    };

    const deleteStat = (index: number) => {
        setStats(stats.filter((_, i) => i !== index));
    };

    const addValue = () => {
        setValues([...values, { id: Date.now().toString(), title: { en: 'New Value', kh: 'គុណតម្លៃថ្មី' }, content: { en: 'Value content', kh: 'មាតិកា' } }]);
    };

    const deleteValue = (id: string) => {
        setValues(values.filter(v => v.id !== id));
    };

    const addJob = () => {
        const id = Date.now().toString();
        const today = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const newJob: Job = {
            id,
            title: { en: 'New Position', kh: 'មុខតំណែងថ្មី' },
            loc: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
            type: { en: 'Full-time', kh: 'ពេញម៉ោង' },
            date: { en: today, kh: today },
            dept: 'Operations',
            summary: { en: 'Add job description here.', kh: 'បន្ថែមការពិពណ៌នាការងារនៅទីនេះ។' },
            salary: { en: 'Negotiable', kh: 'ចរចា' },
            experience: { en: '2+ Years', kh: '២+ ឆ្នាំ' },
            responsibilities: [{ en: 'Key responsibility here...', kh: 'ការទទួលខុសត្រូវសំខាន់...' }],
            requirements: [{ en: 'Key qualification here...', kh: 'លក្ខណៈសម្បត្តិសំខាន់...' }],
            benefits: [{ en: 'Key benefit here...', kh: 'អត្ថប្រយោជន៍សំខាន់...' }]
        };
        setJobs([...jobs, newJob]);
        setEditingJobId(id);
        showToast('New position added. Please configure details.', 'info');
    };

    const deleteJob = async (id: string, nameen: string) => {
        const isConfirmed = await confirm({
            title: 'Delete Position',
            message: `Are you sure you want to delete the position "${nameen}"? This will be removed from the list but won't be permanent until you click "Save Changes".`,
            confirmText: 'Delete',
            type: 'danger'
        });

        if (isConfirmed) {
            setJobs(prev => prev.filter(j => j.id !== id));
            showToast('Position removed from list.', 'success');
        }
    };

    const addTestimonial = () => {
        setTestimonials([...testimonials, { id: Date.now().toString(), author: { en: 'Client Name', kh: 'ឈ្មោះអតិថិជន' }, quote: { en: 'Experience shared here...', kh: 'បទពិសោធន៍...' }, role: { en: 'Organization', kh: 'ស្ថាប័ន' } }]);
    };

    const deleteTestimonial = async (id: string, authorEn: string) => {
        const isConfirmed = await confirm({
            title: 'Delete Testimonial',
            message: `Are you sure you want to delete the testimonial from "${authorEn}"?`,
            confirmText: 'Delete',
            type: 'danger'
        });

        if (isConfirmed) {
            setTestimonials(prev => prev.filter(t => t.id !== id));
            showToast('Testimonial removed from list.', 'success');
        }
    };

    const editServiceDetails = (id: string) => {
        setEditingServiceId(id);
    };

    const closeServiceDetails = () => {
        setEditingServiceId(null);
    };

    const addService = () => {
        const id = 'svc-' + Date.now();
        const newSvc: ServiceItem = {
            id,
            title: { en: 'New Service', kh: 'សេវាកម្មថ្មី' },
            desc: { en: 'Brief description of the service offering.', kh: 'ការពិពណ៌នាសង្ខេបអំពីសេវាកម្ម។' },
            image: '/images/projects/Thumbnail-1.jpg',
            features: [
                { en: 'Key Feature 1', kh: 'លក្ខណៈពិសេសទី ១' }
            ]
        };
        setServices([...services, newSvc]);

        const newDetail: ServiceDetail = {
            id,
            title: { en: 'New Service', kh: 'សេវាកម្មថ្មី' },
            subtitle: { en: 'Professional excellence in every project.', kh: 'ឧត្តមភាពវិជ្ជាជីវៈក្នុងគ្រប់គម្រោង។' },
            heroImage: '/images/projects/Thumbnail-1.jpg',
            description: { en: '<p>Detailed description goes here...</p>', kh: '<p>ការពិពណ៌នាលម្អិតនៅទីនេះ...</p>' },
            targetAudience: { en: '<p>Who is this for?</p>', kh: '<p>តើនេះសម្រាប់អ្នកណា?</p>' },
            scopeOfWork: [
                { en: 'Initial Planning', kh: 'ការរៀបចំផែនការដំបូង' },
                { en: 'Technical Implementation', kh: 'ការអនុវត្តតាមបច្ចេកទេស' }
            ],
            process: [
                { step: '01', title: { en: 'Consultation', kh: 'ការប្រឹក្សា' }, desc: { en: 'Meeting needs.', kh: 'ការឆ្លើយតបតម្រូវការ។' } }
            ],
            benefits: [
                { title: { en: 'Quality Assurance', kh: 'ការធានាគុណភាព' }, desc: { en: 'Top tier results.', kh: 'លទ្ធផលល្អបំផុត។' } }
            ],
            relatedProjects: []
        };
        setDetailsMap(prev => ({ ...prev, [id]: newDetail }));
        showToast('New service added. Please configure it.', 'info');
    };

    const deleteService = async (id: string, name: string) => {
        const isConfirmed = await confirm({
            title: 'Delete Service',
            message: `Are you sure you want to delete ${name}? All related details will be removed.`,
            confirmText: 'Delete',
            type: 'danger'
        });

        if (isConfirmed) {
            setServices(services.filter(s => s.id !== id));
            const newDetails = { ...detailsMap };
            delete newDetails[id];
            setDetailsMap(newDetails);
            showToast('Service removed.', 'success');
        }
    };

    const addSector = () => {
        const newSec: SectorItem = {
            id: 'sec-' + Date.now(),
            title: { en: 'New Sector', kh: 'វិស័យថ្មី' },
            image: '/images/projects/Thumbnail-1.jpg'
        };
        setSectors([...sectors, newSec]);
        showToast('Sector added.', 'success');
    };

    const deleteSector = (id: string) => {
        setSectors(sectors.filter(s => s.id !== id));
        showToast('Sector removed.', 'info');
    };

    const addMilestone = () => {
        setMilestones([...milestones, {
            year: new Date().getFullYear().toString(),
            title: { en: 'New Milestone', kh: 'សមិទ្ធិផលថ្មី' },
            desc: { en: 'Milestone description...', kh: 'ការពិពណ៌នា...' },
            image: '/images/projects/Thumbnail-1.jpg',
            projects: []
        }]);
        showToast('Milestone added.', 'success');
    };

    const deleteMilestone = (index: number) => {
        setMilestones(milestones.filter((_, i) => i !== index));
        showToast('Milestone removed.', 'info');
    };

    const addGlobalProcessStep = () => {
        const newStep: ProcessItem = {
            id: 'p-' + Date.now(),
            step: (processStepsService.length + 1).toString().padStart(2, '0'),
            title: { en: 'New Process Step', kh: 'ជំហានថ្មី' },
            desc: { en: 'Description of the global process.', kh: 'ការពិពណ៌នាអំពីដំណើរការ។' }
        };
        setProcessStepsService([...processStepsService, newStep]);
        showToast('Process step added.', 'success');
    };

    const deleteGlobalProcessStep = (id: string) => {
        setProcessStepsService(processStepsService.filter(p => p.id !== id).map((p, i) => ({
            ...p,
            step: (i + 1).toString().padStart(2, '0')
        })));
        showToast('Process step removed.', 'info');
    };

    const updateServiceDetail = (updated: ServiceDetail) => {
        setDetailsMap({
            ...detailsMap,
            [updated.id]: updated
        });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, serviceId: string, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const id = `svc-img-${serviceId}`;
        setUploadingId(id);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/cms/upload', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            if (data.url) {
                const updated = [...services];
                updated[index].image = data.url;
                setServices(updated);
                showToast('Image uploaded and updated!', 'success');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            showToast('Failed to upload image.', 'error');
        } finally {
            setUploadingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Site Content Editor</h1>
                    <p className="text-sm text-slate-500 mt-1">Update the textual and visual information on the {activeSection} section.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                        <Eye size={16} />
                        Preview
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Section:</span>
                        <div className="relative">
                            <select
                                value={activeSection}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    window.history.pushState(null, '', `/admin/content?section=${val}`);
                                    setActiveSection(val);
                                }}
                                className="appearance-none bg-white border border-slate-200 text-indigo-700 text-sm font-bold uppercase tracking-wider rounded-lg outline-none pl-4 pr-10 py-2 hover:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer shadow-sm w-full md:w-auto"
                            >
                                <option value="home">🏠 Home Page</option>
                                <option value="about">📖 About Us</option>
                                <option value="services">⚙️ Services</option>
                                <option value="careers">💼 Careers & Jobs</option>
                                <option value="testimonials">⭐ Testimonials</option>
                                <option value="contact">📞 Contact Info</option>
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={16} />
                        </div>
                    </div>

                    <div className="flex items-center bg-slate-200/50 p-1 rounded-lg border border-slate-200 w-fit">
                        <button
                            onClick={() => setEditLang('en')}
                            className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${editLang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            English (EN)
                        </button>
                        <button
                            onClick={() => setEditLang('kh')}
                            className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${editLang === 'kh' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Khmer (KH)
                        </button>
                    </div>
                </div>

                <div className="p-8 pb-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* --- HOME --- */}
                            {activeSection === 'home' && (
                                <div className="space-y-12">
                                    <section id="hero" className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Hero Section</h3>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Headline ({editLang.toUpperCase()})</label>
                                                <input
                                                    className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                    value={homeHero.title[editLang]}
                                                    onChange={(e) => setHomeHero({ ...homeHero, title: { ...homeHero.title, [editLang]: e.target.value } })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hero Description ({editLang.toUpperCase()})</label>
                                                <textarea
                                                    rows={3}
                                                    className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium resize-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                    value={homeHero.subtitle[editLang]}
                                                    onChange={(e) => setHomeHero({ ...homeHero, subtitle: { ...homeHero.subtitle, [editLang]: e.target.value } })}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section id="why" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Core Statistics</h3>
                                            <button onClick={addStat} className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                                                <Plus size={14} /> Add Stat
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {stats.map((stat, i) => (
                                                <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3 relative group">
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ActionDropdown onDelete={() => deleteStat(i)} />
                                                    </div>
                                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-indigo-600">
                                                        {stat.iconName === 'ShieldCheck' && <ShieldCheck size={16} />}
                                                        {stat.iconName === 'Trophy' && <Trophy size={16} />}
                                                        {stat.iconName === 'Clock' && <Clock size={16} />}
                                                        {stat.iconName === 'Target' && <Target size={16} />}
                                                        {stat.iconName === 'Award' && <Award size={16} />}
                                                        {!['ShieldCheck', 'Trophy', 'Clock', 'Target', 'Award'].includes(stat.iconName) && <Type size={16} />}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <input
                                                            className={`w-full bg-transparent text-sm font-bold text-slate-900 outline-none border-b border-transparent focus:border-slate-300 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={stat.label[editLang] || ''}
                                                            onChange={(e) => {
                                                                const newStats = [...stats];
                                                                newStats[i].label = { ...newStats[i].label, [editLang]: e.target.value };
                                                                setStats(newStats);
                                                            }}
                                                        />
                                                        <input
                                                            className={`w-full bg-transparent text-xs text-slate-500 outline-none border-b border-transparent focus:border-slate-300 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={stat.value[editLang] || ''}
                                                            onChange={(e) => {
                                                                const newStats = [...stats];
                                                                newStats[i].value = { ...newStats[i].value, [editLang]: e.target.value };
                                                                setStats(newStats);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section id="process" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Working Process</h3>
                                            <button onClick={addProcessStep} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                                                <Plus size={14} /> Add Step
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {processSteps.map((p, i) => (
                                                <div key={p.id} className="p-5 border border-slate-200 rounded-xl relative group">
                                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ActionDropdown onDelete={() => deleteProcessStep(p.id)} />
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">{p.step}</div>
                                                        <div className="flex-1 space-y-1">
                                                            <input
                                                                className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none focus:bg-slate-50 rounded px-1 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={p.title[editLang]}
                                                                onChange={(e) => {
                                                                    const newSteps = [...processSteps];
                                                                    newSteps[i].title = { ...newSteps[i].title, [editLang]: e.target.value };
                                                                    setProcessSteps(newSteps);
                                                                }}
                                                            />
                                                            <input
                                                                className={`w-full text-xs text-slate-500 bg-transparent outline-none focus:bg-slate-50 rounded px-1 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={p.desc[editLang]}
                                                                onChange={(e) => {
                                                                    const newSteps = [...processSteps];
                                                                    newSteps[i].desc = { ...newSteps[i].desc, [editLang]: e.target.value };
                                                                    setProcessSteps(newSteps);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section id="testimonials" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Testimonials</h3>
                                            <button onClick={addTestimonial} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                                <Plus size={14} /> Add Testimonial
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {testimonials.map((t, i) => (
                                                <div key={t.id} className="p-5 border border-slate-200 rounded-xl relative group bg-white shadow-sm hover:border-slate-300 transition-colors">
                                                    <div className="absolute top-2 right-2">
                                                        <ActionDropdown onDelete={() => deleteTestimonial(t.id, t.author.en)} />
                                                    </div>
                                                    <div className="flex items-center gap-1 text-amber-400 mb-3 mt-4">
                                                        {[...Array(5)].map((_, i) => <Award key={i} size={14} fill="currentColor" />)}
                                                    </div>
                                                    <textarea
                                                        className={`w-full text-sm italic text-slate-600 bg-transparent outline-none mb-4 resize-none h-24 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={t.quote[editLang]}
                                                        onChange={(e) => {
                                                            const updated = [...testimonials];
                                                            updated[i].quote = { ...updated[i].quote, [editLang]: e.target.value };
                                                            setTestimonials(updated);
                                                        }}
                                                    />
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                            <Quote size={20} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <input
                                                                className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={t.author[editLang]}
                                                                onChange={(e) => {
                                                                    const updated = [...testimonials];
                                                                    updated[i].author = { ...updated[i].author, [editLang]: e.target.value };
                                                                    setTestimonials(updated);
                                                                }}
                                                            />
                                                            <input
                                                                className={`w-full text-xs text-slate-500 bg-transparent outline-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={t.role[editLang]}
                                                                onChange={(e) => {
                                                                    const updated = [...testimonials];
                                                                    updated[i].role = { ...updated[i].role, [editLang]: e.target.value };
                                                                    setTestimonials(updated);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {/* --- SERVICES --- */}
                            {activeSection === 'services' && (
                                <div className="space-y-10">
                                    <section id="services-list" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Service Cards</h3>
                                            <button
                                                onClick={addService}
                                                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <Plus size={14} /> Add New Service
                                            </button>
                                        </div>
                                        <div className="space-y-6">
                                            {services.map((svc, i) => (
                                                <div key={svc.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3 relative">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Service {i + 1}</span>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => editServiceDetails(svc.id)}
                                                                className="text-xs font-bold text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"
                                                            >
                                                                <Eye size={14} /> Edit Detail Page
                                                            </button>
                                                            <ActionDropdown
                                                                onDelete={() => deleteService(svc.id, svc.title[editLang] || svc.title.en)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title ({editLang.toUpperCase()})</label>
                                                            <input
                                                                className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={svc.title[editLang] || ''}
                                                                onChange={(e) => {
                                                                    const updated = [...services];
                                                                    updated[i].title = { ...updated[i].title, [editLang]: e.target.value };
                                                                    setServices(updated);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5 flex flex-col">
                                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Service Image</label>
                                                            <div className="flex gap-2">
                                                                <div className="relative flex-1 group/img">
                                                                    <input
                                                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-mono focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none pr-10"
                                                                        value={svc.image}
                                                                        onChange={(e) => {
                                                                            const updated = [...services]; updated[i].image = e.target.value; setServices(updated);
                                                                        }}
                                                                    />
                                                                    {svc.image && (
                                                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-slate-200 overflow-hidden shadow-sm">
                                                                            <img src={svc.image} className="w-full h-full object-cover" alt="" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <label className="shrink-0">
                                                                    <div className={`flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-sm ${uploadingId === `svc-img-${svc.id}` ? 'opacity-50 pointer-events-none' : ''}`}>
                                                                        {uploadingId === `svc-img-${svc.id}` ? (
                                                                            <Loader2 size={14} className="animate-spin" />
                                                                        ) : (
                                                                            <Upload size={14} />
                                                                        )}
                                                                        {uploadingId === `svc-img-${svc.id}` ? 'Uploading...' : 'Upload'}
                                                                    </div>
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        onChange={(e) => handleFileUpload(e, svc.id, i)}
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description ({editLang.toUpperCase()})</label>
                                                        <textarea
                                                            rows={3}
                                                            className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={svc.desc[editLang] || ''}
                                                            onChange={(e) => {
                                                                const updated = [...services];
                                                                updated[i].desc = { ...updated[i].desc, [editLang]: e.target.value };
                                                                setServices(updated);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Features ({editLang.toUpperCase()}, comma-separated)</label>
                                                        <input
                                                            className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={svc.features.map(f => f[editLang] || f.en).join(', ')}
                                                            onChange={(e) => {
                                                                const vals = e.target.value.split(',').map(v => v.trim());
                                                                const updated = [...services];
                                                                updated[i].features = vals.map((v, idx) => {
                                                                    const existing = updated[i].features[idx];
                                                                    return {
                                                                        en: editLang === 'en' ? v : (existing?.en || v),
                                                                        kh: editLang === 'kh' ? v : (existing?.kh || v)
                                                                    };
                                                                });
                                                                setServices(updated);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section id="services-process" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Working Process</h3>
                                            <button
                                                onClick={addGlobalProcessStep}
                                                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <Plus size={14} /> Add Step
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {processStepsService.map((p, i) => (
                                                <div key={p.id} className="p-5 border border-slate-200 rounded-xl relative group">
                                                    <button
                                                        onClick={() => deleteGlobalProcessStep(p.id)}
                                                        className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">{p.step}</div>
                                                        <div className="flex-1 space-y-1">
                                                            <input
                                                                className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none focus:bg-slate-50 rounded px-1 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={p.title[editLang] || ''}
                                                                onChange={(e) => {
                                                                    const updated = [...processStepsService];
                                                                    updated[i].title = { ...updated[i].title, [editLang]: e.target.value };
                                                                    setProcessStepsService(updated);
                                                                }}
                                                            />
                                                            <input
                                                                className={`w-full text-xs text-slate-500 bg-transparent outline-none focus:bg-slate-50 rounded px-1 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={p.desc[editLang] || ''}
                                                                onChange={(e) => {
                                                                    const updated = [...processStepsService];
                                                                    updated[i].desc = { ...updated[i].desc, [editLang]: e.target.value };
                                                                    setProcessStepsService(updated);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section id="services-sectors" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Sectors We Serve</h3>
                                            <button
                                                onClick={addSector}
                                                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <Plus size={14} /> Add Sector
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {sectors.map((sec, i) => (
                                                <div key={sec.id} className="p-4 border border-slate-200 rounded-xl flex items-center gap-4 group relative">
                                                    <button
                                                        onClick={() => deleteSector(sec.id)}
                                                        className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">{i + 1}</div>
                                                    <div className="flex-1 space-y-1">
                                                        <input
                                                            className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={sec.title[editLang] || ''}
                                                            onChange={(e) => {
                                                                const updated = [...sectors];
                                                                updated[i].title = { ...updated[i].title, [editLang]: e.target.value };
                                                                setSectors(updated);
                                                            }}
                                                        />
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center gap-2 group/img relative">
                                                                <input
                                                                    className="w-full text-[10px] text-slate-400 font-mono bg-transparent outline-none focus:text-indigo-600 transition-colors pr-6"
                                                                    value={sec.image}
                                                                    onChange={(e) => {
                                                                        const updated = [...sectors]; updated[i].image = e.target.value; setSectors(updated);
                                                                    }}
                                                                />
                                                                {sec.image && (
                                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded border border-slate-200 overflow-hidden">
                                                                        <img src={sec.image} className="w-full h-full object-cover" alt="" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <label className="flex items-center gap-1 text-[10px] text-indigo-600 font-bold cursor-pointer hover:text-indigo-700 w-fit">
                                                                {uploadingId === `sec-img-${sec.id}` ? <Loader2 size={10} className="animate-spin" /> : <Upload size={10} />}
                                                                {uploadingId === `sec-img-${sec.id}` ? 'Uploading...' : 'Upload Image'}
                                                                <input
                                                                    type="file"
                                                                    className="hidden"
                                                                    accept="image/*"
                                                                    onChange={async (e) => {
                                                                        const file = e.target.files?.[0];
                                                                        if (!file) return;
                                                                        const id = `sec-img-${sec.id}`;
                                                                        setUploadingId(id);
                                                                        try {
                                                                            const formData = new FormData();
                                                                            formData.append('file', file);
                                                                            const res = await fetch('/api/cms/upload', { method: 'POST', body: formData });
                                                                            const data = await res.json();
                                                                            if (data.url) {
                                                                                const updated = [...sectors]; updated[i].image = data.url; setSectors(updated);
                                                                                showToast('Sector image updated!', 'success');
                                                                            }
                                                                        } catch (err) { showToast('Upload failed', 'error'); }
                                                                        finally { setUploadingId(null); }
                                                                    }}
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {/* --- ABOUT --- */}
                            {activeSection === 'about' && (
                                <div className="space-y-10">
                                    <section id="story" className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Our Story</h3>
                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Corporate Narrative ({editLang.toUpperCase()})</label>
                                            <textarea
                                                rows={8}
                                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium leading-relaxed ${editLang === 'kh' ? 'font-siemreap text-lg' : ''}`}
                                                value={aboutStory[editLang]}
                                                onChange={(e) => setAboutStory({ ...aboutStory, [editLang]: e.target.value })}
                                            />
                                        </div>
                                    </section>

                                    <section id="values" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Core Values</h3>
                                            <button onClick={addValue} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                                <Plus size={14} /> Add Value
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {values.map((v, i) => (
                                                <div key={v.id} className="p-5 border border-slate-200 rounded-xl relative group bg-white shadow-sm hover:border-slate-300 transition-colors">
                                                    <div className="absolute top-2 right-2">
                                                        <ActionDropdown onDelete={() => deleteValue(v.id)} />
                                                    </div>
                                                    <input
                                                        className={`w-full text-base font-bold text-slate-900 bg-transparent outline-none mb-3 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={v.title[editLang]}
                                                        onChange={(e) => {
                                                            const newVals = [...values];
                                                            newVals[i].title = { ...newVals[i].title, [editLang]: e.target.value };
                                                            setValues(newVals);
                                                        }}
                                                    />
                                                    <textarea
                                                        className={`w-full text-sm text-slate-500 bg-transparent outline-none h-32 resize-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={v.content[editLang]}
                                                        onChange={(e) => {
                                                            const newVals = [...values];
                                                            newVals[i].content = { ...newVals[i].content, [editLang]: e.target.value };
                                                            setValues(newVals);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section id="milestones" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Project Milestones</h3>
                                            <button onClick={addMilestone} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                                <Plus size={14} /> Add Milestone
                                            </button>
                                        </div>
                                        <div className="space-y-6">
                                            {milestones.map((m, i) => (
                                                <div key={i} className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm space-y-4 relative group">
                                                    <div className="absolute top-4 right-4">
                                                        <ActionDropdown onDelete={() => deleteMilestone(i)} />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                                        <div className="md:col-span-1 space-y-4">
                                                            <div>
                                                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Year/Period</label>
                                                                <input
                                                                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded lg outline-none focus:border-indigo-500 text-sm font-bold"
                                                                    value={m.year}
                                                                    onChange={(e) => {
                                                                        const updated = [...milestones]; updated[i].year = e.target.value; setMilestones(updated);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5 overflow-hidden">
                                                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Image</label>
                                                                <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-100 mb-2">
                                                                    {m.image ? <img src={m.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-slate-300" /></div>}
                                                                </div>
                                                                <input
                                                                    className="w-full text-[10px] font-mono p-1.5 border border-slate-200 rounded mb-2 overflow-hidden text-ellipsis"
                                                                    value={m.image}
                                                                    onChange={(e) => {
                                                                        const updated = [...milestones]; updated[i].image = e.target.value; setMilestones(updated);
                                                                    }}
                                                                />
                                                                <label className="flex items-center justify-center gap-2 w-full py-2 bg-slate-900 text-white text-[11px] font-bold rounded cursor-pointer hover:bg-slate-800 transition-all">
                                                                    <Upload size={14} /> Upload Image
                                                                    <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                                                        const file = e.target.files?.[0]; if (!file) return;
                                                                        const formData = new FormData(); formData.append('file', file);
                                                                        const res = await fetch('/api/cms/upload', { method: 'POST', body: formData });
                                                                        const data = await res.json();
                                                                        if (data.url) {
                                                                            const updated = [...milestones]; updated[i].image = data.url; setMilestones(updated);
                                                                            showToast('Milestone image updated!', 'success');
                                                                        }
                                                                    }} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="md:col-span-3 space-y-4">
                                                            <div>
                                                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Title ({editLang})</label>
                                                                <input
                                                                    className={`w-full p-2 bg-slate-50 border border-slate-200 rounded lg outline-none focus:border-indigo-500 font-bold ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                    value={m.title[editLang] || ''}
                                                                    onChange={(e) => {
                                                                        const updated = [...milestones]; updated[i].title = { ...updated[i].title, [editLang]: e.target.value }; setMilestones(updated);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Description ({editLang})</label>
                                                                <textarea
                                                                    rows={3}
                                                                    className={`w-full p-2 bg-slate-50 border border-slate-200 rounded lg outline-none focus:border-indigo-500 text-sm ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                    value={m.desc[editLang] || ''}
                                                                    onChange={(e) => {
                                                                        const updated = [...milestones]; updated[i].desc = { ...updated[i].desc, [editLang]: e.target.value }; setMilestones(updated);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Associated Projects ({editLang}, comma-separated)</label>
                                                                <input
                                                                    className={`w-full p-2 bg-slate-50 border border-slate-200 rounded lg outline-none focus:border-indigo-500 text-sm ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                    value={m.projects?.map(p => p[editLang] || p.en).join(', ') || ''}
                                                                    onChange={(e) => {
                                                                        const vals = e.target.value.split(',').map(v => v.trim());
                                                                        const updated = [...milestones];
                                                                        updated[i].projects = vals.map((v, idx) => {
                                                                            const existing = updated[i].projects?.[idx];
                                                                            return {
                                                                                en: editLang === 'en' ? v : (existing?.en || v),
                                                                                kh: editLang === 'kh' ? v : (existing?.kh || v)
                                                                            };
                                                                        });
                                                                        setMilestones(updated);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {/* --- CAREERS --- */}
                            {activeSection === 'careers' && (
                                <div className="space-y-10">
                                    {/* Hero Section */}
                                    <section className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Careers Hero Section</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Tagline ({editLang})</label>
                                                    <input
                                                        className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={careerMain.hero.tagline[editLang] || ''}
                                                        onChange={(e) => setCareerMain({ ...careerMain, hero: { ...careerMain.hero, tagline: { ...careerMain.hero.tagline, [editLang]: e.target.value } } })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Headline Line 1 ({editLang})</label>
                                                    <input
                                                        className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={careerMain.hero.title1[editLang] || ''}
                                                        onChange={(e) => setCareerMain({ ...careerMain, hero: { ...careerMain.hero, title1: { ...careerMain.hero.title1, [editLang]: e.target.value } } })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Headline Line 2 ({editLang})</label>
                                                    <input
                                                        className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={careerMain.hero.title2[editLang] || ''}
                                                        onChange={(e) => setCareerMain({ ...careerMain, hero: { ...careerMain.hero, title2: { ...careerMain.hero.title2, [editLang]: e.target.value } } })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Subtext ({editLang})</label>
                                                <textarea
                                                    rows={6}
                                                    className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                    value={careerMain.hero.subtext[editLang] || ''}
                                                    onChange={(e) => setCareerMain({ ...careerMain, hero: { ...careerMain.hero, subtext: { ...careerMain.hero.subtext, [editLang]: e.target.value } } })}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    {/* Stats Section */}
                                    <section className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Careers Key Stats</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                                            <div>
                                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Team Size</label>
                                                <input
                                                    className="w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500"
                                                    value={careerMain.stats.teamMembers}
                                                    onChange={(e) => setCareerMain({ ...careerMain, stats: { ...careerMain.stats, teamMembers: e.target.value } })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Projects</label>
                                                <input
                                                    className="w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500"
                                                    value={careerMain.stats.activeProjects}
                                                    onChange={(e) => setCareerMain({ ...careerMain, stats: { ...careerMain.stats, activeProjects: e.target.value } })}
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-3">
                                                <div>
                                                    <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Award Title ({editLang})</label>
                                                    <input
                                                        className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={careerMain.stats.awardTitle[editLang] || ''}
                                                        onChange={(e) => setCareerMain({ ...careerMain, stats: { ...careerMain.stats, awardTitle: { ...careerMain.stats.awardTitle, [editLang]: e.target.value } } })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Why Join Section */}
                                    <section className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Why Choose Kimmex? Section</h3>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Section Title ({editLang})</label>
                                                    <input
                                                        className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={careerMain.whyJoin.title[editLang] || ''}
                                                        onChange={(e) => setCareerMain({ ...careerMain, whyJoin: { ...careerMain.whyJoin, title: { ...careerMain.whyJoin.title, [editLang]: e.target.value } } })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Section Subtext ({editLang})</label>
                                                    <input
                                                        className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={careerMain.whyJoin.subtext[editLang] || ''}
                                                        onChange={(e) => setCareerMain({ ...careerMain, whyJoin: { ...careerMain.whyJoin, subtext: { ...careerMain.whyJoin.subtext, [editLang]: e.target.value } } })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {careerMain.whyJoin.cards.map((card, idx) => (
                                                    <div key={card.id} className="p-4 bg-white border border-slate-200 rounded-lg space-y-3 relative">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">{idx + 1}</div>
                                                            <input
                                                                className={`text-xs font-bold text-slate-900 bg-transparent outline-none flex-1 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={card.title[editLang] || ''}
                                                                onChange={(e) => {
                                                                    const newCards = [...careerMain.whyJoin.cards];
                                                                    newCards[idx].title = { ...newCards[idx].title, [editLang]: e.target.value };
                                                                    setCareerMain({ ...careerMain, whyJoin: { ...careerMain.whyJoin, cards: newCards } });
                                                                }}
                                                            />
                                                        </div>
                                                        <textarea
                                                            rows={3}
                                                            className={`w-full text-[11px] text-slate-500 bg-transparent outline-none resize-none border-t pt-2 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={card.desc[editLang] || ''}
                                                            onChange={(e) => {
                                                                const newCards = [...careerMain.whyJoin.cards];
                                                                newCards[idx].desc = { ...newCards[idx].desc, [editLang]: e.target.value };
                                                                setCareerMain({ ...careerMain, whyJoin: { ...careerMain.whyJoin, cards: newCards } });
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Hiring Process Section */}
                                    <section className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Hiring Process Section</h3>
                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Tagline ({editLang})</label>
                                                    <input
                                                        className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={careerMain.process.tagline[editLang] || ''}
                                                        onChange={(e) => setCareerMain({ ...careerMain, process: { ...careerMain.process, tagline: { ...careerMain.process.tagline, [editLang]: e.target.value } } })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Headline ({editLang})</label>
                                                    <input
                                                        className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={careerMain.process.title[editLang] || ''}
                                                        onChange={(e) => setCareerMain({ ...careerMain, process: { ...careerMain.process, title: { ...careerMain.process.title, [editLang]: e.target.value } } })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Subtext ({editLang})</label>
                                                    <input
                                                        className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={careerMain.process.subtext[editLang] || ''}
                                                        onChange={(e) => setCareerMain({ ...careerMain, process: { ...careerMain.process, subtext: { ...careerMain.process.subtext, [editLang]: e.target.value } } })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                {careerMain.process.steps.map((step, idx) => (
                                                    <div key={idx} className="p-4 bg-white border border-slate-200 rounded-lg space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-black text-indigo-600 border border-indigo-100">{step.step}</div>
                                                            <input
                                                                className={`text-xs font-bold text-slate-900 bg-transparent outline-none flex-1 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={step.title[editLang] || ''}
                                                                onChange={(e) => {
                                                                    const newSteps = [...careerMain.process.steps];
                                                                    newSteps[idx].title = { ...newSteps[idx].title, [editLang]: e.target.value };
                                                                    setCareerMain({ ...careerMain, process: { ...careerMain.process, steps: newSteps } });
                                                                }}
                                                            />
                                                        </div>
                                                        <textarea
                                                            rows={3}
                                                            className={`w-full text-[11px] text-slate-500 bg-transparent outline-none resize-none border-t pt-2 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={step.desc[editLang] || ''}
                                                            onChange={(e) => {
                                                                const newSteps = [...careerMain.process.steps];
                                                                newSteps[idx].desc = { ...newSteps[idx].desc, [editLang]: e.target.value };
                                                                setCareerMain({ ...careerMain, process: { ...careerMain.process, steps: newSteps } });
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                    <section className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Listings Header (Current Openings)</h3>
                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                                            <div>
                                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Section Headline ({editLang})</label>
                                                <input
                                                    className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                    value={careerMain.openings.title[editLang] || ''}
                                                    onChange={(e) => setCareerMain({ ...careerMain, openings: { ...careerMain.openings, title: { ...careerMain.openings.title, [editLang]: e.target.value } } })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Section Subtext ({editLang})</label>
                                                <input
                                                    className={`w-full p-2 bg-white border border-slate-200 rounded lg outline-none focus:border-indigo-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                    value={careerMain.openings.subtext[editLang] || ''}
                                                    onChange={(e) => setCareerMain({ ...careerMain, openings: { ...careerMain.openings, subtext: { ...careerMain.openings.subtext, [editLang]: e.target.value } } })}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <div className="flex items-center justify-between border-b pb-4">
                                        <h3 className="text-lg font-bold text-slate-900">Individual job Listings</h3>
                                        <button onClick={addJob} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">
                                            Post New Position
                                        </button>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 border-b border-slate-200">
                                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Position</th>
                                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</th>
                                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Posted</th>
                                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {jobs.map((job) => (
                                                    <tr key={job.id} className="hover:bg-slate-50 transition-colors group">
                                                        <td className="px-6 py-4">
                                                            <div className={`text-sm font-bold text-slate-900 ${editLang === 'kh' ? 'font-siemreap' : ''}`}>{job.title[editLang]}</div>
                                                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{job.id}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 border border-slate-200 uppercase">{job.dept}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className={`text-xs text-slate-600 flex items-center gap-1.5 ${editLang === 'kh' ? 'font-siemreap' : ''}`}>
                                                                <MapPin size={12} className="text-slate-300" /> {job.loc[editLang]}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className={`text-xs text-slate-500 ${editLang === 'kh' ? 'font-siemreap' : ''}`}>{job.type[editLang]}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-xs text-slate-500 font-medium">{job.date[editLang]}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <ActionDropdown
                                                                onEdit={() => setEditingJobId(job.id)}
                                                                onDelete={() => deleteJob(job.id, job.title.en)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {jobs.length === 0 && (
                                            <div className="p-12 text-center text-slate-400">
                                                No job positions posted yet.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* --- TESTIMONIALS --- */}
                            {activeSection === 'testimonials' && (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <h3 className="text-lg font-bold text-slate-900">Client Testimonials</h3>
                                        <button onClick={addTestimonial} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
                                            <Plus size={16} /> Add Testimonial
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {testimonials.map((t, i) => (
                                            <div key={t.id} className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all relative group">
                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ActionDropdown onDelete={() => deleteTestimonial(t.id, t.author.en)} />
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Testimonial Quote ({editLang.toUpperCase()})</label>
                                                        <textarea
                                                            rows={4}
                                                            className={`w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm italic text-slate-600 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-none transition-all ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={t.quote[editLang] || ''}
                                                            onChange={(e) => {
                                                                const newT = [...testimonials];
                                                                newT[i].quote = { ...newT[i].quote, [editLang]: e.target.value };
                                                                setTestimonials(newT);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Name</label>
                                                            <input
                                                                className={`w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/10 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={t.author[editLang] || ''}
                                                                onChange={(e) => {
                                                                    const newT = [...testimonials];
                                                                    newT[i].author = { ...newT[i].author, [editLang]: e.target.value };
                                                                    setTestimonials(newT);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Organization/Role</label>
                                                            <input
                                                                className={`w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/10 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={t.role[editLang] || ''}
                                                                onChange={(e) => {
                                                                    const newT = [...testimonials];
                                                                    newT[i].role = { ...newT[i].role, [editLang]: e.target.value };
                                                                    setTestimonials(newT);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* --- CONTACT --- */}
                            {activeSection === 'contact' && (
                                <div className="space-y-10">
                                    <section className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Location & Schedule</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Office Address ({editLang.toUpperCase()})</label>
                                                    <textarea
                                                        rows={3}
                                                        className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none ${editLang === 'kh' ? 'font-siemreap' : 'font-medium'}`}
                                                        value={contact.address[editLang] || ''}
                                                        onChange={(e) => setContact({ ...contact, address: { ...contact.address, [editLang]: e.target.value } })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Working Hours ({editLang.toUpperCase()})</label>
                                                    <input
                                                        className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all ${editLang === 'kh' ? 'font-siemreap' : 'font-medium'}`}
                                                        value={contact.hours[editLang] || ''}
                                                        onChange={(e) => setContact({ ...contact, hours: { ...contact.hours, [editLang]: e.target.value } })}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Google Maps URL</label>
                                                    <input
                                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono text-xs"
                                                        value={contact.googleMapsUrl}
                                                        onChange={(e) => setContact({ ...contact, googleMapsUrl: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Communication</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Numbers (comma separated)</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                                                    value={contact.phone}
                                                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Addresses (comma separated)</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                                                    value={contact.email}
                                                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Social Presence</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Facebook</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-xs"
                                                    value={contact.socials.facebook}
                                                    onChange={(e) => setContact({ ...contact, socials: { ...contact.socials, facebook: e.target.value } })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">LinkedIn</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-xs"
                                                    value={contact.socials.linkedin}
                                                    onChange={(e) => setContact({ ...contact, socials: { ...contact.socials, linkedin: e.target.value } })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Instagram</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-xs"
                                                    value={contact.socials.instagram}
                                                    onChange={(e) => setContact({ ...contact, socials: { ...contact.socials, instagram: e.target.value } })}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence >
                </div >
            </div >

            {/* Service Detail Modal Editor */}
            <AnimatePresence>
                {
                    editingServiceId && detailsMap[editingServiceId] && (
                        <ServiceDetailEditor
                            detail={detailsMap[editingServiceId]}
                            editLang={editLang}
                            onClose={closeServiceDetails}
                            onSave={(updated) => {
                                updateServiceDetail(updated);
                                closeServiceDetails();
                            }}
                        />
                    )
                }
                {
                    editingJobId && jobs.find(j => j.id === editingJobId) && (
                        <JobEditor
                            job={jobs.find(j => j.id === editingJobId)!}
                            editLang={editLang}
                            onClose={() => setEditingJobId(null)}
                            onSave={(updated) => {
                                const newJobs = jobs.map(j => j.id === updated.id ? updated : j);
                                setJobs(newJobs);
                                setEditingJobId(null);
                            }}
                        />
                    )
                }
            </AnimatePresence >
        </div >
    );
}

export default function SiteContentPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-slate-400 font-medium">Loading Editor...</div>}>
            <AdminContentEditor />
        </Suspense>
    );
}
