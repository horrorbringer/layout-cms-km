       import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { data, fileName } = await request.json();

        // Security check: only allow updating files in the data directory
        const allowedFiles = ['orgChartData.ts', 'teamData.ts', 'newsData.ts'];
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
        }

        await fs.writeFile(filePath, content, 'utf8');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to save file:', error);
        return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
    }
}
