import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { data, fileName } = await request.json();

        // Security check: only allow updating files in the data directory
        const allowedFiles = ['orgChartData.ts', 'teamData.ts', 'newsData.ts', 'projectData.ts', 'aboutData.ts', 'projectDetailData.ts', 'serviceData.ts', 'serviceDetailData.ts', 'documentData.ts', 'contactData.ts', 'messagesData.ts', 'homeData.ts', 'jobData.ts'];
        if (!allowedFiles.includes(fileName)) {
            return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'src/app/design-z/data', fileName);

        let content = '';
        if (fileName === 'orgChartData.ts') {
            content = `export interface OrgNode {
    name: string;
    role: string;
    image?: string;
    phone?: string;
    memberCount?: number;
    children?: OrgNode[];
    isGroup?: boolean;
    type?: 'director' | 'manager' | 'staff' | 'department';
}

export const orgChartData: OrgNode = ${JSON.stringify(data, null, 4)};`;
        } else if (fileName === 'teamData.ts') {
            content = `export type TeamMember = {
    name: string;
    role: string;
    image?: string;
    bio: string;
    experience: string;
    location: string;
    specialization: string;
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
    loc: string;
    type: string;
    tags: LocalizedString[];
    salary: string;
    experience: string;
    postedDate: LocalizedString;
}

export const jobData: Job[] = ${JSON.stringify(data, null, 4)};`;
        }

        await fs.writeFile(filePath, content, 'utf8');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to save file:', error);
        return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
    }
}
