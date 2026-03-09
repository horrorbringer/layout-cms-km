
import prisma from './src/lib/prisma';

async function checkDb() {
    try {
        const jobs = await prisma.jobPosting.findMany();
        console.log('JOBS:', JSON.stringify(jobs, null, 2));

        const services = await prisma.service.findMany();
        console.log('SERVICES COUNT:', services.length);

        const settings = await prisma.systemSetting.findMany();
        console.log('SETTINGS KEYS:', settings.map(s => s.key));
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        await prisma.$disconnect();
    }
}

checkDb();
