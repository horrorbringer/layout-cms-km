import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const jobs = await prisma.jobPosting.findMany({
            orderBy: { createdAt: 'desc' },
            include: { department: true }
        });

        const mappedJobs = jobs.map(job => ({
            id: job.slug,
            title: { en: job.title, kh: job.titleKm || job.title },
            loc: { en: job.location, kh: job.locationKm || job.location },
            type: { en: job.type === 'FULL_TIME' ? 'Full-time' : 'Contract', kh: job.type === 'FULL_TIME' ? 'Full-time' : 'Contract' },
            postedDate: { en: new Date(job.createdAt).toLocaleDateString(), kh: new Date(job.createdAt).toLocaleDateString() },
            dept: job.department?.name || 'Operations',
            summary: { en: job.summary, kh: job.summaryKm || job.summary },
            salary: { en: (job as any).salary || 'Negotiable', kh: (job as any).salaryKm || (job as any).salary || 'ចរចា' },
            experience: { en: (job as any).experience || '2+ Years', kh: (job as any).experienceKm || (job as any).experience || '២+ ឆ្នាំ' },
            responsibilities: (job as any).responsibilities
                ? (job as any).responsibilities.split('\n').filter(Boolean).map((r: string, i: number) => ({
                    en: r,
                    kh: (job as any).responsibilitiesKm?.split('\n')[i] || r
                }))
                : [],
            requirements: job.requirements
                ? job.requirements.split('\n').filter(Boolean).map((r, i) => ({
                    en: r,
                    kh: job.requirementsKm?.split('\n')[i] || r
                }))
                : [],
            benefits: job.benefits
                ? job.benefits.split('\n').filter(Boolean).map((b, i) => ({
                    en: b,
                    kh: job.benefitsKm?.split('\n')[i] || b
                }))
                : []
        }));

        return NextResponse.json({ jobs: mappedJobs });
    } catch (err) {
        console.error('Fetch jobs error:', err);
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
}
