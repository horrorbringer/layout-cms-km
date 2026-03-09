import React from 'react';
import prisma from '@/lib/prisma';
import CareersView from './_components/CareersView';
import { jobData as staticJobs } from '../data/jobData';

export const dynamic = 'force-dynamic';

export default async function CareersPage() {
    // Fetch ACTIVE jobs from database (set by admin dashboard Save Changes)
    const dbJobs = await prisma.jobPosting.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        include: { department: true }
    });

    // Map Prisma jobs
    const mappedDbJobs = dbJobs.map(job => ({
        id: job.slug,
        title: { en: job.title, kh: job.titleKm || job.title },
        dept: job.department?.name || 'General',
        loc: { en: job.location, kh: job.locationKm || job.location },
        type: { en: job.type === 'FULL_TIME' ? 'Full-time' : 'Contract', kh: job.type === 'FULL_TIME' ? 'Full-time' : 'Contract' },
        salary: { en: (job as any).salary || 'Negotiable', kh: (job as any).salaryKm || (job as any).salary || 'ចរចា' },
        experience: { en: (job as any).experience || '2+ Years', kh: (job as any).experienceKm || (job as any).experience || '២+ ឆ្នាំ' },
        postedDate: { en: new Date(job.createdAt).toLocaleDateString(), kh: new Date(job.createdAt).toLocaleDateString() },
        summary: { en: job.summary || '', kh: job.summaryKm || job.summary || '' },
        tags: [{ en: 'Open', kh: 'បើកចំហ' }]
    }));

    // Get IDs of jobs already in the database
    const dbJobSlugs = new Set(mappedDbJobs.map(j => j.id));

    // Combine with static jobs that are NOT in the database
    const onlyInStatic = staticJobs
        .filter(j => !dbJobSlugs.has(j.id))
        .map(j => ({
            ...j,
            summary: j.summary || { en: '', kh: '' }
        }));

    const allJobs = [...mappedDbJobs, ...onlyInStatic];

    return (
        <CareersView initialJobs={allJobs} />
    );
}
