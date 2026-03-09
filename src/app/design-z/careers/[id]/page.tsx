import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { jobData, Job } from '../../data/jobData';
import CareerDetailView from './CareerDetailView';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params;
    // Try to get real title from DB
    const dbJob = await prisma.jobPosting.findUnique({ where: { slug: id } });
    const title = dbJob?.title || id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ');
    return {
        title: `${title} | Careers | Kimmex`,
    };
}

export default async function CareerDetailPage(props: { params: { id: string } }) {
    const { id } = await props.params;

    let job: Job | undefined;

    // 1. Try database FIRST (authoritative source managed by admin dashboard)
    const dbJob = await prisma.jobPosting.findUnique({
        where: { slug: id },
        include: { department: true }
    });

    if (dbJob) {
        job = {
            id: dbJob.slug,
            title: { en: dbJob.title, kh: dbJob.titleKm || dbJob.title },
            dept: dbJob.department?.name || 'General',
            loc: { en: dbJob.location, kh: dbJob.locationKm || dbJob.location },
            type: { en: dbJob.type === 'FULL_TIME' ? 'Full-time' : 'Contract', kh: dbJob.type === 'FULL_TIME' ? 'Full-time' : 'Contract' },
            summary: { en: dbJob.summary || '', kh: dbJob.summaryKm || dbJob.summary || '' },
            responsibilities: (dbJob as any).responsibilities
                ? (dbJob as any).responsibilities.split('\n').filter(Boolean).map((r: string, i: number) => ({
                    en: r,
                    kh: (dbJob as any).responsibilitiesKm?.split('\n')[i] || r
                }))
                : [{ en: 'See exact responsibilities in the description.', kh: 'សូមមើលការទទួលខុសត្រូវក្នុងសេចក្តីពិពណ៌នា។' }],
            requirements: dbJob.requirements
                ? dbJob.requirements.split('\n').filter(Boolean).map((r, i) => ({
                    en: r,
                    kh: dbJob.requirementsKm?.split('\n')[i] || r
                }))
                : [{ en: 'See exact requirements in the description.', kh: 'សូមមើលតម្រូវការពិស្តារ។' }],
            benefits: dbJob.benefits
                ? dbJob.benefits.split('\n').filter(Boolean).map((b, i) => ({
                    en: b,
                    kh: dbJob.benefitsKm?.split('\n')[i] || b
                }))
                : [{ en: 'Competitive Salary', kh: 'ប្រាក់ខែប្រកួតប្រជែង' }],
            salary: { en: (dbJob as any).salary || 'Negotiable', kh: (dbJob as any).salaryKm || (dbJob as any).salary || 'ចរចា' },
            experience: { en: (dbJob as any).experience || '2+ Years', kh: (dbJob as any).experienceKm || (dbJob as any).experience || '២+ ឆ្នាំ' },
            postedDate: { en: new Date(dbJob.createdAt).toLocaleDateString(), kh: new Date(dbJob.createdAt).toLocaleDateString() },
            tags: [{ en: 'Open', kh: 'បើកចំហ' }]
        };
    }

    // 2. Fallback to static jobData.ts if not in DB
    if (!job) {
        job = jobData.find(j => j.id === id);
    }

    // 3. 404 if not found anywhere
    if (!job) {
        notFound();
    }

    return <CareerDetailView job={job} />;
}
