import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('--- PROJECTS ---');
        const projects = await prisma.project.findMany({ select: { slug: true, title: true } });
        projects.forEach(p => console.log(`[${p.slug}] ${p.title}`));

        console.log('\n--- SYSTEM SETTINGS ---');
        const settings = await prisma.systemSetting.findMany();
        settings.forEach(s => {
            console.log(`Key: ${s.key}`);
            if (s.key === 'home_hero') {
                console.log('Home Hero Value:', JSON.stringify(s.value, null, 2));
            }
        });
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
