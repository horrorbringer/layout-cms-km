import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkNews() {
    try {
        const news = await prisma.newsArticle.findMany({
            select: { slug: true, title: true, category: true }
        });
        console.log('--- NEWS CATEGORIES ---');
        news.forEach(n => {
            console.log(`[${n.slug}] ${n.title}: "${n.category}"`);
        });

        const categories = Array.from(new Set(news.map(n => n.category)));
        console.log('\nUnique categories in DB:', categories);

    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        await prisma.$disconnect();
    }
}

checkNews();
