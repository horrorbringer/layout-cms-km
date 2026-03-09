import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { data, fileName } = await request.json();

        // Security check: only allow updating files in the data directory
        const allowedFiles = ['careerContent.ts', 'orgChartData.ts', 'teamData.ts', 'newsData.ts', 'projectData.ts', 'aboutData.ts', 'projectDetailData.ts', 'serviceData.ts', 'serviceDetailData.ts', 'documentData.ts', 'contactData.ts', 'messagesData.ts', 'homeData.ts', 'jobData.ts', 'configData.ts', 'milestonesData.ts', 'footerData.ts'];
        if (!allowedFiles.includes(fileName)) {
            return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'src/app/design-z/data', fileName);

        let content = '';
        if (fileName === 'configData.ts') {
            content = `export type KhmerFontName = 'Siemreap' | 'Koulen' | 'Battambang' | 'System';

export interface ConfigData {
    khmerFont: KhmerFontName;
}

export const configData: ConfigData = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'orgChartData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export interface OrgNode {
    name: string;
    role: LocalizedString;
    bio?: LocalizedString;
    image?: string;
    phone?: string;
    memberCount?: number;
    children?: OrgNode[];
    isGroup?: boolean;
    type?: 'director' | 'manager' | 'staff' | 'department';
}

export const orgChartData: OrgNode = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'teamData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export type TeamMember = {
    name: string;
    role: LocalizedString;
    image?: string;
    bio: LocalizedString;
    experience: string;
    location: LocalizedString;
    specialization: LocalizedString;
};

export const teamMembers: TeamMember[] = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'newsData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export type NewsItem = {
    id: string;
    title: LocalizedString;
    category: string;
    date: LocalizedString;
    readTime: LocalizedString;
    image: string;
    excerpt: LocalizedString;
    featured: boolean;
    trending: boolean;
    author: LocalizedString;
    year: string;
    content?: LocalizedString;
    tags?: string[];
    gallery?: string[];
    documents?: { name: string; size: string }[];
};

export const allNews: NewsItem[] = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'projectData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export type Project = {
    id: string;
    title: LocalizedString;
    location: LocalizedString;
    type: LocalizedString;
    status: LocalizedString;
    image: string;
    summary: LocalizedString;
};

export const projects: Project[] = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'aboutData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export interface AboutValue {
    id: string;
    title: string | LocalizedString;
    content: string | LocalizedString;
}

export interface AboutData {
    story: string | LocalizedString;
    values: AboutValue[];
}

export const aboutData: AboutData = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'careerContent.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export interface CareerContent {
    hero: {
        tagline: LocalizedString;
        title1: LocalizedString;
        title2: LocalizedString;
        subtext: LocalizedString;
    };
    stats: {
        teamMembers: string;
        teamMembersLabel: LocalizedString;
        activeProjects: string;
        activeProjectsLabel: LocalizedString;
        awardTitle: LocalizedString;
        awardSub: LocalizedString;
    };
    whyJoin: {
        title: LocalizedString;
        subtext: LocalizedString;
        cards: Array<{
            id: string;
            title: LocalizedString;
            desc: LocalizedString;
            icon: string;
        }>;
    };
    process: {
        tagline: LocalizedString;
        title: LocalizedString;
        subtext: LocalizedString;
        steps: Array<{
            step: string;
            title: LocalizedString;
            desc: LocalizedString;
        }>;
    };
    openings: {
        title: LocalizedString;
        subtext: LocalizedString;
    };
}

export const careerContent: CareerContent = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'projectDetailData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export type ProjectDetail = {
    title: LocalizedString;
    subtitle: LocalizedString;
    location: LocalizedString;
    client: LocalizedString;
    sector: LocalizedString;
    area: string;
    year: string;
    status: LocalizedString;
    image: string;
    description: {
        background: LocalizedString;
        objectives: LocalizedString;
        concept: LocalizedString;
    };
    services: LocalizedString[];
    challenges: LocalizedString[];
    gallery: string[];
};

export const projectDetails: Record<string, ProjectDetail> = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'serviceData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export interface ServiceFeature extends LocalizedString {}

export interface Service {
    id: string;
    title: LocalizedString;
    desc: LocalizedString;
    image: string;
    features: ServiceFeature[];
}

export interface ProcessStep {
    id: string;
    step: string;
    title: LocalizedString;
    desc: LocalizedString;
}

export interface Sector {
    id: string;
    title: LocalizedString;
    image: string;
}

export interface ServiceData {
    services: Service[];
    process: ProcessStep[];
    sectors: Sector[];
}

export const serviceData: ServiceData = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'serviceDetailData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export type ServiceDetail = {
    id: string;
    title: LocalizedString;
    subtitle: LocalizedString;
    heroImage: string;
    description: LocalizedString;
    targetAudience: LocalizedString;
    scopeOfWork: LocalizedString[];
    process: { step: string; title: LocalizedString; desc: LocalizedString }[];
    benefits: { title: LocalizedString; desc: LocalizedString }[];
    relatedProjects: { id: string; title: LocalizedString; location: LocalizedString; category: LocalizedString; image: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'documentData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export interface Document {
    id: number;
    title: LocalizedString;
    date: string;
    category: string;
    size: string;
    type: string;
    description: LocalizedString;
    image: string;
}

export const allDocuments: Document[] = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'contactData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export interface ContactData {
    address: LocalizedString;
    phone: string[];
    email: string[];
    hours: LocalizedString;
    googleMapsUrl: string;
    socials: {
        facebook: string;
        linkedin: string;
        instagram: string;
    };
}

export const contactData: ContactData = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'messagesData.ts') {
            content = `export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    date: string;
    status: 'new' | 'read' | 'replied';
}

export const allMessages: ContactMessage[] = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'homeData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export interface HomeData {
    hero: {
        title: LocalizedString;
        subtitle: LocalizedString;
    };
    stats: {
        label: LocalizedString;
        val: LocalizedString;
        iconName: string;
    }[];
    process: {
        id: string;
        step: string;
        title: LocalizedString;
        desc: LocalizedString;
        iconName: string;
    }[];
    testimonials: {
        id: string;
        quote: LocalizedString;
        author: LocalizedString;
        role: LocalizedString;
        rating: number;
    }[];
}

export const homeData: HomeData = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'jobData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export interface Job {
    id: string;
    title: LocalizedString;
    dept: string;
    loc: LocalizedString;
    type: LocalizedString;
    tags: LocalizedString[];
    salary: LocalizedString;
    experience: LocalizedString;
    postedDate: LocalizedString;
    summary: LocalizedString;
    responsibilities: LocalizedString[];
    requirements: LocalizedString[];
    benefits: LocalizedString[];
}

export const jobData: Job[] = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'milestonesData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export interface MilestoneData {
    year: string;
    title: LocalizedString;
    desc: LocalizedString;
    image: string;
    projects: string[];
}

export const milestones: MilestoneData[] = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'footerData.ts') {
            content = `import { LocalizedString } from '../context/LanguageContext';

export interface FooterData {
    description: LocalizedString;
    social: {
        facebook: string;
        linkedin: string;
        youtube: string;
        instagram: string;
    };
    contact: {
        addressLine1: LocalizedString;
        addressLocation: LocalizedString;
        mapLink: string;
        phone: string;
        email: string;
    };
    copyrightYear: string;
}

export const footerData: FooterData = ${JSON.stringify(data, null, 4)};`;
        } else { }

        await fs.writeFile(filePath, content, 'utf8');

        // --- DATABASE SYNC ---
        // Synchronize file changes with the Prisma database to ensure the live site reflects edits.
        try {
            if (fileName === 'homeData.ts') {
                const home = data as any;
                if (home.hero) {
                    await prisma.systemSetting.upsert({
                        where: { key: 'home_hero' },
                        update: { value: home.hero },
                        create: { key: 'home_hero', value: home.hero }
                    });
                }
                if (home.stats) {
                    await prisma.systemSetting.upsert({
                        where: { key: 'company_stats' },
                        update: { value: home.stats },
                        create: { key: 'company_stats', value: home.stats }
                    });
                }
                if (home.process) {
                    await prisma.systemSetting.upsert({
                        where: { key: 'home_process' },
                        update: { value: home.process },
                        create: { key: 'home_process', value: home.process }
                    });
                }
                if (home.testimonials) {
                    const activeTIds = (home.testimonials as any[]).map(t => t.id);
                    await prisma.testimonial.deleteMany({
                        where: { id: { notIn: activeTIds } }
                    });

                    for (const t of home.testimonials) {
                        await prisma.testimonial.upsert({
                            where: { id: t.id },
                            update: {
                                clientName: t.author.en,
                                clientNameKm: t.author.kh ?? null,
                                clientRole: t.role.en,
                                clientRoleKm: t.role.kh ?? null,
                                content: t.quote.en,
                                contentKm: t.quote.kh ?? null,
                                rating: t.rating || 5,
                                image: t.image || null,
                                isFeatured: true,
                                orderIndex: 0
                            },
                            create: {
                                id: t.id,
                                clientName: t.author.en,
                                clientNameKm: t.author.kh ?? null,
                                clientRole: t.role.en,
                                clientRoleKm: t.role.kh ?? null,
                                content: t.quote.en,
                                contentKm: t.quote.kh ?? null,
                                rating: t.rating || 5,
                                image: t.image || null,
                                isFeatured: true,
                                orderIndex: 0
                            }
                        });
                    }
                }
            } else if (fileName === 'aboutData.ts') {
                const about = data as any;
                if (about.story) {
                    const storyEn = typeof about.story === 'string' ? about.story : about.story.en;
                    const storyKh = typeof about.story === 'string' ? about.story : about.story.kh;
                    await prisma.systemSetting.upsert({
                        where: { key: 'about_story' },
                        update: { value: { en: storyEn, kh: storyKh } },
                        create: { key: 'about_story', value: { en: storyEn, kh: storyKh } }
                    });
                }
                if (about.values) {
                    await prisma.systemSetting.upsert({
                        where: { key: 'about_values' },
                        update: { value: about.values },
                        create: { key: 'about_values', value: about.values }
                    });
                }
            } else if (fileName === 'projectData.ts') {
                const projectList = data as any[];
                const activeProjectSlugs = projectList.map(p => p.id);
                // Projects don't have isActive, they have status. For now we will delete they are not in the list if we want full sync
                // Or better, we could leave them but they won't show in the list anyway as the file is overwritten.
                // However, for consistency with jobs, lets delete them if they are removed from the master list.
                await prisma.project.deleteMany({
                    where: { slug: { notIn: activeProjectSlugs } }
                });

                for (const p of projectList) {
                    await prisma.project.upsert({
                        where: { slug: p.id },
                        update: {
                            title: p.title.en,
                            titleKm: p.title.kh ?? null,
                            location: p.location.en,
                            locationKm: p.location.kh ?? null,
                            description: p.summary.en,
                            descriptionKm: p.summary.kh ?? null,
                            heroImage: p.image,
                            category: (p.type.en.toUpperCase() === 'PUBLIC SERVICE' ? 'PUBLIC_SERVICE' :
                                p.type.en.toUpperCase() === 'GOVERNMENT' ? 'GOVERNMENT_OFFICE' :
                                    p.type.en.toUpperCase().replace(/\s/g, '_')) as any,
                            status: p.status.en.toUpperCase() as any
                        },
                        create: {
                            title: p.title.en,
                            titleKm: p.title.kh ?? null,
                            slug: p.id,
                            location: p.location.en,
                            locationKm: p.location.kh ?? null,
                            description: p.summary.en,
                            descriptionKm: p.summary.kh ?? null,
                            heroImage: p.image,
                            category: (p.type.en.toUpperCase() === 'PUBLIC SERVICE' ? 'PUBLIC_SERVICE' :
                                p.type.en.toUpperCase() === 'GOVERNMENT' ? 'GOVERNMENT_OFFICE' :
                                    p.type.en.toUpperCase().replace(/\s/g, '_')) as any,
                            status: p.status.en.toUpperCase() as any
                        }
                    });
                }
            } else if (fileName === 'newsData.ts') {
                const news = data as any[];
                const activeNewsSlugs = news.map(n => n.id);
                await prisma.newsArticle.deleteMany({
                    where: { slug: { notIn: activeNewsSlugs } }
                });

                for (const n of news) {
                    await prisma.newsArticle.upsert({
                        where: { slug: n.id },
                        update: {
                            title: n.title.en,
                            titleKm: n.title.kh ?? null,
                            excerpt: n.excerpt.en,
                            excerptKm: n.excerpt.kh ?? null,
                            content: n.content?.en || n.excerpt.en,
                            contentKm: (n.content?.kh || n.excerpt.kh) ?? null,
                            authorName: n.author.en,
                            authorNameKm: n.author.kh ?? null,
                            category: n.category as any,
                            coverImage: n.image,
                            isFeatured: !!n.featured,
                            isTrending: !!n.trending,
                            year: n.year
                        },
                        create: {
                            title: n.title.en,
                            titleKm: n.title.kh ?? null,
                            slug: n.id,
                            excerpt: n.excerpt.en,
                            excerptKm: n.excerpt.kh ?? null,
                            content: n.content?.en || n.excerpt.en,
                            contentKm: (n.content?.kh || n.excerpt.kh) ?? null,
                            authorName: n.author.en,
                            authorNameKm: n.author.kh ?? null,
                            category: n.category as any,
                            coverImage: n.image,
                            isFeatured: !!n.featured,
                            isTrending: !!n.trending,
                            year: n.year,
                            publishedAt: new Date()
                        }
                    });
                }
            } else if (fileName === 'teamData.ts') {
                const team = data as any[];
                const activeTeamNames = team.map(m => m.name);
                // We use name/email as identifier for team as they don't have a fixed id in teamData.ts usually
                // This is a bit risky but teamData.ts identifies by index/name.
                // Let's stick to email based on name for now as done below.
                const emails = team.map(m => `${m.name.toLowerCase().replace(/\s/g, '.')}@kimmex.com.kh`);
                await prisma.employee.deleteMany({
                    where: { email: { notIn: emails } }
                });

                for (const m of team) {
                    const email = `${m.name.toLowerCase().replace(/\s/g, '.')}@kimmex.com.kh`;
                    await prisma.employee.upsert({
                        where: { email },
                        update: {
                            name: m.name,
                            role: m.role.en,
                            roleKm: m.role.kh ?? null,
                            image: m.image,
                            bio: m.bio.en,
                            bioKm: m.bio.kh ?? null,
                            experience: m.experience,
                            location: m.location.en,
                            locationKm: m.location.kh ?? null,
                            specialization: m.specialization.en,
                            specializationKm: m.specialization.kh ?? null,
                        },
                        create: {
                            name: m.name,
                            email,
                            role: m.role.en,
                            roleKm: m.role.kh ?? null,
                            image: m.image,
                            bio: m.bio.en,
                            bioKm: m.bio.kh ?? null,
                            experience: m.experience,
                            location: m.location.en,
                            locationKm: m.location.kh ?? null,
                            specialization: m.specialization.en,
                            specializationKm: m.specialization.kh ?? null,
                        }
                    });
                }
            } else if (fileName === 'jobData.ts') {
                const jobs = data as any[];

                // Set all jobs to inactive first, then upsert current ones
                // Or more precisely: set isActive: false for jobs not in the current list
                const currentIds = jobs.map(j => j.id);
                await prisma.jobPosting.updateMany({
                    where: { slug: { notIn: currentIds } },
                    data: { isActive: false }
                });

                for (const j of jobs) {
                    await prisma.jobPosting.upsert({
                        where: { slug: j.id },
                        update: {
                            title: j.title.en,
                            titleKm: j.title.kh ?? null,
                            summary: j.summary?.en || '',
                            summaryKm: j.summary?.kh ?? null,
                            responsibilities: j.responsibilities?.map((r: any) => r.en).join('\n') || null,
                            responsibilitiesKm: j.responsibilities?.map((r: any) => r.kh).join('\n') ?? null,
                            requirements: j.requirements?.map((r: any) => r.en).join('\n') || null,
                            requirementsKm: j.requirements?.map((r: any) => r.kh).join('\n') ?? null,
                            benefits: j.benefits?.map((b: any) => b.en).join('\n') || null,
                            benefitsKm: j.benefits?.map((b: any) => b.kh).join('\n') ?? null,
                            location: j.loc?.en || 'Phnom Penh',
                            locationKm: j.loc?.kh ?? null,
                            type: (() => {
                                const t = (j.type?.en || '').toUpperCase().replace('-', '_').replace(' ', '_');
                                if (t === 'FULL_TIME' || t === 'FULLTIME') return 'FULL_TIME';
                                if (t === 'CONTRACT') return 'CONTRACT';
                                if (t === 'PART_TIME' || t === 'PARTTIME') return 'PART_TIME';
                                if (t === 'INTERNSHIP') return 'INTERNSHIP';
                                return 'FULL_TIME';
                            })() as any,
                            salary: typeof j.salary === 'object' ? j.salary.en : (j.salary || 'Negotiable'),
                            salaryKm: typeof j.salary === 'object' ? j.salary.kh : null,
                            experience: typeof j.experience === 'object' ? j.experience.en : (j.experience || '2+ Years'),
                            experienceKm: typeof j.experience === 'object' ? j.experience.kh : null,
                            isActive: true,
                        } as any,
                        create: {
                            title: j.title.en,
                            titleKm: j.title.kh ?? null,
                            slug: j.id,
                            summary: j.summary?.en || '',
                            summaryKm: j.summary?.kh ?? null,
                            responsibilities: j.responsibilities?.map((r: any) => r.en).join('\n') || null,
                            responsibilitiesKm: j.responsibilities?.map((r: any) => r.kh).join('\n') ?? null,
                            requirements: j.requirements?.map((r: any) => r.en).join('\n') || null,
                            requirementsKm: j.requirements?.map((r: any) => r.kh).join('\n') ?? null,
                            benefits: j.benefits?.map((b: any) => b.en).join('\n') || null,
                            benefitsKm: j.benefits?.map((b: any) => b.kh).join('\n') ?? null,
                            location: j.loc?.en || 'Phnom Penh',
                            locationKm: j.loc?.kh ?? null,
                            type: (() => {
                                const t = (j.type?.en || '').toUpperCase().replace('-', '_').replace(' ', '_');
                                if (t === 'FULL_TIME' || t === 'FULLTIME') return 'FULL_TIME';
                                if (t === 'CONTRACT') return 'CONTRACT';
                                if (t === 'PART_TIME' || t === 'PARTTIME') return 'PART_TIME';
                                if (t === 'INTERNSHIP') return 'INTERNSHIP';
                                return 'FULL_TIME';
                            })() as any,
                            salary: typeof j.salary === 'object' ? j.salary.en : (j.salary || 'Negotiable'),
                            salaryKm: typeof j.salary === 'object' ? j.salary.kh : null,
                            experience: typeof j.experience === 'object' ? j.experience.en : (j.experience || '2+ Years'),
                            experienceKm: typeof j.experience === 'object' ? j.experience.kh : null,
                            isActive: true,
                        } as any
                    });
                }
            } else if (fileName === 'serviceData.ts') {
                const sData = data as any;
                if (sData.services) {
                    const activeServiceSlugs = (sData.services as any[]).map(s => s.id);
                    await prisma.service.updateMany({
                        where: { slug: { notIn: activeServiceSlugs } },
                        data: { isActive: false }
                    });

                    for (const s of sData.services) {
                        await prisma.service.upsert({
                            where: { slug: s.id },
                            update: {
                                title: s.title.en,
                                titleKm: s.title.kh ?? null,
                                summary: s.desc.en,
                                summaryKm: s.desc.kh ?? null,
                                description: s.desc.en,
                                descriptionKm: s.desc.kh ?? null,
                                image: s.image,
                                icon: s.icon || 'PenTool',
                                features: s.features.map((f: any) => f.en),
                                isActive: true
                            },
                            create: {
                                title: s.title.en,
                                titleKm: s.title.kh ?? null,
                                slug: s.id,
                                summary: s.desc.en,
                                summaryKm: s.desc.kh ?? null,
                                description: s.desc.en,
                                descriptionKm: s.desc.kh ?? null,
                                image: s.image,
                                icon: s.icon || 'PenTool',
                                features: s.features.map((f: any) => f.en),
                                isActive: true
                            }
                        });
                    }
                }
                if (sData.process) {
                    await prisma.systemSetting.upsert({
                        where: { key: 'home_process' },
                        update: { value: sData.process },
                        create: { key: 'home_process', value: sData.process }
                    });
                }
                if (sData.sectors) {
                    await prisma.systemSetting.upsert({
                        where: { key: 'service_sectors' },
                        update: { value: sData.sectors },
                        create: { key: 'service_sectors', value: sData.sectors }
                    });
                }
            } else if (fileName === 'serviceDetailData.ts') {
                await prisma.systemSetting.upsert({
                    where: { key: 'service_details' },
                    update: { value: data },
                    create: { key: 'service_details', value: data }
                });
            } else if (fileName === 'contactData.ts') {
                await prisma.systemSetting.upsert({
                    where: { key: 'contact_info' },
                    update: { value: data },
                    create: { key: 'contact_info', value: data }
                });
            } else if (fileName === 'configData.ts') {
                await prisma.systemSetting.upsert({
                    where: { key: 'config' },
                    update: { value: data },
                    create: { key: 'config', value: data }
                });
            } else if (fileName === 'careerContent.ts') {
                await prisma.systemSetting.upsert({
                    where: { key: 'career_content' },
                    update: { value: data },
                    create: { key: 'career_content', value: data }
                });
            } else if (fileName === 'projectDetailData.ts') {
                await prisma.systemSetting.upsert({
                    where: { key: 'project_details' },
                    update: { value: data },
                    create: { key: 'project_details', value: data }
                });
            } else if (fileName === 'milestonesData.ts') {
                await prisma.systemSetting.upsert({
                    where: { key: 'about_milestones' },
                    update: { value: data },
                    create: { key: 'about_milestones', value: data }
                });
            }
        } catch (dbError) {
            console.error('Database sync failed:', dbError);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to save file:', error);
        return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
    }
}
