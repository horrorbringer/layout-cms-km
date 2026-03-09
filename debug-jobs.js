const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const jobs = await prisma.jobPosting.findMany({
            select: {
                slug: true,
                title: true,
                isActive: true,
            }
        });
        console.log('JOBS_COUNT:', jobs.length);
        console.log('JOBS:', JSON.stringify(jobs, null, 2));
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
