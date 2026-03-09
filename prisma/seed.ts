import { PrismaClient } from '@prisma/client';
import { projects } from '../src/app/design-z/data/projectData';
import { allNews } from '../src/app/design-z/data/newsData';
import { homeData } from '../src/app/design-z/data/homeData';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding projects...');
    for (const project of projects) {
        const status = project.status.en === 'Completed' ? 'COMPLETED' : 'ONGOING';

        let category = 'PUBLIC_SERVICE';
        if (project.type.en.includes('Government')) category = 'GOVERNMENT_OFFICE';
        else if (project.type.en.includes('Water Treatment')) category = 'WATER_TREATMENT';
        else if (project.type.en.includes('Slope')) category = 'SLOP_CONSTRUCTION';
        else if (project.type.en.includes('Private')) category = 'PRIVATE_BUILDING';

        await prisma.project.upsert({
            where: { slug: project.id },
            update: {},
            create: {
                title: project.title.en,
                titleKm: project.title.kh,
                slug: project.id,
                category: category as any,
                status: status as any,
                heroImage: project.image,
                location: project.location.en,
                locationKm: project.location.kh,
                description: project.summary.en,
                descriptionKm: project.summary.kh,
            },
        });
    }

    console.log('Seeding news...');
    for (const news of allNews) {
        let category = 'Updates';
        if (['Awards', 'Safety', 'Sustainability', 'Culture', 'Community', 'Innovation', 'Systems'].includes(news.category)) {
            category = news.category;
        }

        await prisma.newsArticle.upsert({
            where: { slug: news.id },
            update: {},
            create: {
                title: news.title.en,
                titleKm: news.title.kh,
                slug: news.id,
                coverImage: news.image,
                category: category as any,
                excerpt: news.excerpt.en,
                excerptKm: news.excerpt.kh,
                content: news.content?.en || news.excerpt.en,
                contentKm: news.content?.kh || news.excerpt.kh,
                publishedAt: new Date(),
                authorName: news.author.en,
                authorNameKm: news.author.kh,
            },
        });
    }

    console.log('Seeding team members...');
    const { teamMembers } = await import('../src/app/design-z/data/teamData');
    for (const member of teamMembers) {
        // Use a more stable ID generation for employees if possible, or name-based
        const email = `${member.name.toLowerCase().replace(/\s/g, '.')} @kimmex.com.kh`;
        await prisma.employee.upsert({
            where: { email },
            update: {},
            create: {
                name: member.name,
                role: member.role.en,
                roleKm: member.role.kh,
                image: member.image,
                bio: member.bio.en,
                bioKm: member.bio.kh,
                experience: member.experience,
                location: member.location.en,
                locationKm: member.location.kh,
                specialization: member.specialization.en,
                specializationKm: member.specialization.kh,
                email: email
            }
        });
    }

    console.log('Seeding testimonials...');
    if (homeData.testimonials) {
        for (const t of homeData.testimonials) {
            await prisma.testimonial.upsert({
                where: { id: t.id },
                update: {},
                create: {
                    id: t.id,
                    clientName: t.author.en,
                    clientRole: t.role.en,
                    content: t.quote.en,
                    rating: t.rating || 5,
                    isFeatured: true
                }
            });
        }
    }

    console.log('Seeding departments...');
    const depts = ['Engineering', 'Operations', 'Design', 'Administration', 'HR', 'Logistics', 'Finance', 'Technical'];
    for (const d of depts) {
        await prisma.department.upsert({
            where: { name: d },
            update: {},
            create: { name: d }
        });
    }

    console.log('Seeding Org Chart...');
    const { orgChartData } = await import('../src/app/design-z/data/orgChartData');

    async function seedOrgNode(node: any, parentId: string | null = null) {
        let employeeId: string | null = null;

        // If it's a person (not just a department placeholder)
        if (node.name && node.type !== 'department') {
            const employee = await prisma.employee.create({
                data: {
                    name: node.name,
                    role: node.role.en,
                    roleKm: node.role.kh,
                    image: node.image,
                    phone: node.phone
                }
            });
            employeeId = employee.id;
        }

        const orgUnit = await prisma.orgUnit.create({
            data: {
                title: node.name,
                type: node.type === 'director' ? 'DIRECTOR' :
                    node.type === 'manager' ? 'MANAGER' :
                        node.type === 'staff' ? 'STAFF' : 'DEPARTMENT_HEAD',
                parentId: parentId,
                employeeId: employeeId,
            }
        });

        if (node.children) {
            for (const child of node.children) {
                await seedOrgNode(child, orgUnit.id);
            }
        }
    }

    // Clear existing org units and employees before seeding hierarchy
    await prisma.orgUnit.deleteMany({});
    await prisma.employee.deleteMany({
        where: {
            articles: { none: {} } // Keep authors
        }
    });
    await seedOrgNode(orgChartData);

    console.log('Seeding jobs...');
    const { jobData } = await import('../src/app/design-z/data/jobData');
    for (const job of jobData) {
        const dept = await prisma.department.findUnique({ where: { name: job.dept } });
        await prisma.jobPosting.upsert({
            where: { slug: job.id },
            update: {},
            create: {
                title: job.title.en,
                slug: job.id,
                departmentId: dept?.id,
                location: job.loc.en,
                type: job.type.en === 'Full-time' ? 'FULL_TIME' : 'CONTRACT',
                summary: job.summary.en,
                requirements: job.requirements.map(r => r.en).join('\n'),
                benefits: job.benefits.map(b => b.en).join('\n'),
                isActive: true
            }
        });
    }

    console.log('Seeding system settings...');
    const settings = [
        {
            key: 'home_hero',
            value: {
                ...homeData.hero,
                slides: [
                    {
                        image: '/images/projects/Thumbnail-1.jpg',
                        subtitle: { en: 'Government Infrastructure', kh: 'ហេដ្ឋារចនាសម្ព័ន្ធរដ្ឋាភិបាល' },
                        title: { en: 'Ministry of Economy', kh: 'ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ' },
                        desc: { en: 'Our landmark project delivering state-of-the-art facilities.', kh: 'គម្រោងដ៏សំខាន់របស់យើងដែលផ្តល់ជូននូវសម្ភារៈទំនើបៗ។' },
                        link: '/design-z/projects/mef'
                    },
                    {
                        image: '/images/projects/Thumbnail-2.jpg',
                        subtitle: { en: 'Water Infrastructure', kh: 'ហេដ្ឋារចនាសម្ព័ន្ធទឹកស្អាត' },
                        title: { en: 'Khleang Toeuk WTP', kh: 'រោងចក្រទឹកស្អាតឃ្លាំងតឿក' },
                        desc: { en: 'Providing clean water with state-of-the-art treatment plant.', kh: 'ការផ្តល់ទឹកស្អាតជាមួយនឹងរោងចក្រប្រព្រឹត្តកម្មទំនើប។' },
                        link: '/design-z/projects/kt-wtp'
                    }
                ]
            }
        },
        {
            key: 'about_story',
            value: (await import('../src/app/design-z/data/aboutData')).aboutData.story
        },
        {
            key: 'about_values',
            value: (await import('../src/app/design-z/data/aboutData')).aboutData.values
        },
        {
            key: 'company_stats',
            value: [
                { label: 'Years Experience', value: 25 },
                { label: 'Projects Completed', value: 150 },
                { label: 'Team Members', value: 500 },
                { label: 'Client Satisfaction', value: 98 }
            ]
        },
        {
            key: 'about_milestones',
            value: (await import('../src/app/design-z/data/milestonesData')).milestones
        },
        {
            key: 'home_process',
            value: (await import('../src/app/design-z/data/homeData')).homeData.process
        }
    ];

    for (const s of settings) {
        await prisma.systemSetting.upsert({
            where: { key: s.key },
            update: { value: s.value as any },
            create: { key: s.key, value: s.value as any }
        });
    }

    console.log('Seeding finished.');
}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

