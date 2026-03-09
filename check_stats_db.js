
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const setting = await prisma.systemSetting.findUnique({ where: { key: 'company_stats' } });
        console.log('company_stats:', JSON.stringify(setting, null, 2));
        await prisma.$disconnect();
    } catch (e) {
        console.error('Error during check:', e);
        process.exit(1);
    }
}

check();
