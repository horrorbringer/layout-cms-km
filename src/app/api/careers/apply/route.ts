import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { jobId, firstName, lastName, email, phone, cvUrl, coverLetter } = body;

        let finalJobId = '';

        // Find the job by slug (since jobId in the UI is currently the slug)
        // If it's a general application, we might receive 'general'
        if (jobId && jobId !== 'general') {
            let job = await prisma.jobPosting.findUnique({
                where: { slug: jobId }
            });

            if (!job) {
                // The frontend uses static job data IDs, gracefully insert it into Prisma
                job = await prisma.jobPosting.create({
                    data: {
                        title: `Job Application (${jobId})`,
                        slug: jobId,
                        location: 'Any',
                        isActive: true
                    }
                });
            }
            finalJobId = job.id;
        } else {
            // Find or create 'general' job posting
            let generalJob = await prisma.jobPosting.findUnique({
                where: { slug: 'general-application' }
            });
            if (!generalJob) {
                generalJob = await prisma.jobPosting.create({
                    data: {
                        title: 'General Application',
                        slug: 'general-application',
                        location: 'Any',
                        isActive: true
                    }
                });
            }
            finalJobId = generalJob.id;
        }

        const application = await prisma.jobApplication.create({
            data: {
                jobId: finalJobId,
                applicantName: `${firstName} ${lastName}`,
                email,
                phone,
                resumeUrl: cvUrl || '/placeholder-cv.pdf',
                coverLetter: coverLetter || '',
                status: 'PENDING'
            }
        });

        return NextResponse.json({ success: true, application });
    } catch (error) {
        console.error('Failed to submit job application:', error);
        return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }
}
