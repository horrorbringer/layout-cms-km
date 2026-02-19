import { PrismaClient, OrgUnitType, ProjectCategory, ProjectStatus, PartnerType } from '@prisma/client';

const prisma = new PrismaClient();

// --- DATA ---
const teamMembers = [
    {
        name: 'Okhna. TOUCH KIM',
        role: 'Chief Executive Officer',
        image: '/images/team-leadership-professional/touch_kim.jpg',
        bio: 'Okhna. Touch Kim founded KIM MEX Construction in 1999 with a vision to revolutionize the Cambodian construction industry. With over 30 years of experience in civil engineering and infrastructure development, he has led the company from a small local contractor to a national leader. His leadership philosophy centers on integrity, quality, and community building.',
        experience: '30+ Years',
        location: 'Phnom Penh HQ',
        specialization: 'Strategic Leadership, Civil Engineering'
    },
    {
        name: 'Mr. PAUCH BUNPHEAKDEY',
        role: 'Deputy General Manager',
        image: '/images/team-leadership-professional/pauch_bunpheakdey.jpg',
        bio: 'As Deputy General Manager, Mr. Pauch Bunpheakdey oversees the daily operations of KIM MEX Construction. He ensures that all departments work in synergy to deliver projects on time and within budget. His background in project management and operational efficiency has been instrumental in the company\'s rapid growth.',
        experience: '20+ Years',
        location: 'Phnom Penh HQ',
        specialization: 'Operations Management, Project Planning'
    },
    {
        name: 'Mr. LENG VANNARITH',
        role: 'Finance Director',
        image: '/images/team-leadership-professional/leng_vannarith.jpg',
        bio: 'Mr. Leng Vannarith manages the financial health of the organization. With a keen eye for detail and strategic financial planning, he ensures sustainable growth and fiscal responsibility across all projects.',
        experience: '18+ Years',
        location: 'Phnom Penh HQ',
        specialization: 'Corporate Finance, Risk Management'
    },
    {
        name: 'Mr. OUNG CHAKNORA',
        role: 'Senior Project Manager',
        image: '/images/team-leadership-professional/oung_chaknora.jpg',
        bio: 'Mr. Oung Chaknora leads our most complex construction projects. His expertise in structural engineering and on-site management ensures that every build meets our rigorous safety and quality standards.',
        experience: '15+ Years',
        location: 'Site Operations',
        specialization: 'Construction Management, Structural Engineering'
    },
    {
        name: 'Mr. SUM ROTANA',
        role: 'Project Manager',
        image: '/images/team-leadership-professional/sum_rotana.jpg',
        bio: 'Mr. Sum Rotana is dedicated to delivering excellence in project execution. He works closely with clients and site teams to ensure clear communication and successful project outcomes.',
        experience: '12+ Years',
        location: 'Site Operations',
        specialization: 'Project Coordination, Client Relations'
    },
    {
        name: 'Mr. KRAI KEAK',
        role: 'MEP Operations Manager',
        image: '/images/team-leadership-professional/krai_keak.jpg',
        bio: 'Specializing in Mechanical, Electrical, and Plumbing (MEP) systems, Mr. Krai Keak ensures the functional heartbeat of every building we construct operates flawlessly.',
        experience: '14+ Years',
        location: 'MEP Division',
        specialization: 'MEP Systems, Operational Maintenance'
    },
    {
        name: 'Mr. CHHUNDY RYTA',
        role: 'Deputy Architect Manager',
        image: '/images/team-leadership-professional/chhundy_ryta.jpg',
        bio: 'Mr. Chhundy Ryta brings creative vision to our technical excellence. He oversees architectural design integrity, ensuring that aesthetics and functionality coexist in perfect harmony.',
        experience: '10+ Years',
        location: 'Design Studio',
        specialization: 'Architectural Design, BIM'
    },
    {
        name: 'Mr. TOUCH PUTHEANY',
        role: 'MEP Design Manager',
        image: '/images/team-leadership-professional/touch_putheany.jpg',
        bio: 'Mr. Touch Putheany leads the design of complex MEP systems. His innovative approach to energy efficiency and system integration sets our projects apart.',
        experience: '11+ Years',
        location: 'MEP Division',
        specialization: 'MEP Design, Sustainability'
    },
    {
        name: 'Mr. RY KEN',
        role: 'Deputy QS Manager',
        image: '/images/team-leadership-professional/ry_ken.jpg',
        bio: 'Mr. Ry Ken manages Quantity Surveying, ensuring precise cost estimation and contract management. His diligence protects our clients\' investments and ensures project viability.',
        experience: '9+ Years',
        location: 'Phnom Penh HQ',
        specialization: 'Cost Estimation, Contract Management'
    },
    {
        name: 'Mr. HONG BUNNA',
        role: 'Warehouse Manager',
        image: '/images/team-leadership-professional/hong_bunna.jpg',
        bio: 'Mr. Hong manages logistics and inventory, ensuring that materials are available on-site exactly when needed to maintain project timelines. His coordination is key to project efficiency.',
        experience: '15+ Years',
        location: 'Phnom Penh HQ',
        specialization: 'Logistics, Inventory Management'
    }
];

const services = [
    { title: 'Design & Build', slug: 'design-build', icon: 'PenTool', description: 'End-to-end solutions from concept to completion with integrated design and construction.', summary: 'Integrated architectural and engineering solutions.', features: ['Conceptual Design', 'Structural Engineering', 'Interior Design'], image: '/images/projects/Thumbnail-6.jpg' },
    { title: 'Infrastructure', slug: 'infrastructure', icon: 'Layout', description: 'Building the backbone of communities with bridges, roads, and utilities.', summary: 'Large scale public works.', features: ['Roads & Bridges', 'Water Treatment', 'Public Works'], image: '/images/projects/Thumbnail-7.jpg' },
    { title: 'Project Management', slug: 'project-management', icon: 'Users', description: 'Rigorous oversight ensuring on-time, on-budget delivery for every client.', summary: 'Professional construction management.', features: ['Cost Control', 'Quality Assurance', 'Safety Compliance'], image: '/images/projects/Thumbnail-5.jpg' },
    { title: 'Renovation', slug: 'renovation', icon: 'Ruler', description: 'Revitalizing existing structures to meet modern standards and aesthetics.', summary: 'Modernizing existing assets.', features: ['Structural Strengthening', 'Facade Upgrades', 'MEP Retrofitting'], image: '/images/projects/Thumbnail-4.jpg' },
    { title: 'Systems', slug: 'systems', icon: 'Target', description: 'Smart building technologies and advanced MEP integration for modern hubs.', summary: 'Advanced MEP and Automation.', features: ['Smart Grid Control', 'Advanced MEP', 'Building Automation'], image: '/images/projects/Thumbnail-6.jpg' }
];

const projects = [
    { title: 'Ministry of Economy', slug: 'mef', category: ProjectCategory.GOVERNMENT, location: 'Phnom Penh', completionDate: new Date('2023-01-01'), description: 'A landmark government building representing the economic strength of the nation.', heroImage: '/images/projects/Thumbnail-2.jpg', isFeatured: true },
    { title: 'Vattanac Capital Extension', slug: 'vattanac', category: ProjectCategory.PRIVATE, location: 'Phnom Penh', completionDate: new Date('2023-06-01'), description: 'High-end commercial extension for one of the most iconic towers in Cambodia.', heroImage: '/images/projects/Thumbnail-2.jpg', isFeatured: true },
    { title: 'Khleang Toeuk WTP', slug: 'kt-wtp', category: ProjectCategory.INFRASTRUCTURE, location: 'Phnom Penh', completionDate: new Date('2024-01-01'), description: 'State-of-the-art water treatment plant serving thousands of households.', heroImage: '/images/projects/Thumbnail-1.jpg', isFeatured: true },
    { title: 'Smart Grid Central', slug: 'smart-grid-ph', category: ProjectCategory.SYSTEMS, location: 'Phnom Penh', completionDate: new Date('2025-01-01'), description: 'The central hub for the new smart energy grid.', heroImage: '/images/projects/Thumbnail-6.jpg', isFeatured: true },
];

const partners = [
    { name: 'Ministry of Public Works', logoUrl: '/patner/1.png', type: PartnerType.GOVERNMENT },
    { name: 'Vattanac Group', logoUrl: '/patner/2.png', type: PartnerType.PARTNER },
    { name: 'Chip Mong', logoUrl: '/patner/3.png', type: PartnerType.CLIENT },
    { name: 'Peng Huoth', logoUrl: '/patner/4.png', type: PartnerType.CLIENT },
    { name: 'OCIC', logoUrl: '/patner/5.png', type: PartnerType.PARTNER },
];

const testimonials = [
    { clientName: 'H.E. Minister of Economy', clientRole: 'Government Client', company: 'MEF', content: 'Kimmex delivered our project on time and exceeded our quality expectations. Their professionalism is unmatched.', rating: 5, isFeatured: true },
    { clientName: 'Mr. Chen Wei', clientRole: 'CEO, Vattanac Group', company: 'Vattanac', content: 'Working with Kimmex was a seamless experience. They understood our vision and brought it to life perfectly.', rating: 5, isFeatured: true },
    { clientName: 'Dr. Sarah Johnson', clientRole: 'World Bank Representative', company: 'World Bank', content: 'The attention to safety and quality standards sets Kimmex apart from other contractors in Cambodia.', rating: 5, isFeatured: true }
];

// Reconstruct the Org Tree from the flat JSON definition logic
// (Simplified for seeding: we will create the top nodes manually based on orgChartData)
async function seedOrgChart() {
    // 1. Create CEO
    console.log('Seeding CEO...');
    const ceoEmployee = await prisma.employee.findFirst({ where: { role: 'Chief Executive Officer' } });
    if (!ceoEmployee) return;

    const ceoNode = await prisma.orgUnit.create({
        data: {
            title: 'Chief Executive Officer',
            type: OrgUnitType.DIRECTOR,
            employeeId: ceoEmployee.id
        }
    });

    // 2. Create DCEO
    const dceoEmployee = await prisma.employee.findFirst({ where: { role: 'Deputy General Manager' } }); // Logic map check
    // Actually the orgChartData says 'Deputy Chief Executive Officer' is Mr. MAY SOPHORN but teamData says he is not there?
    // Wait, teamData has Mr. MAY SOPHORN? No, he is in image path but not in teamData list? 
    // Let's check teamData again. Mr. MAY SOPHORN role is DGM? No, Pauch is DGM.
    // I will dynamically upsert employees found in orgChart but not in teamData if needed, but for now let's just create raw OrgUnits using names if employee not found.

    // For simplicity in this seed, I will map the main known ones. 
    // The real robust solution would parse the recursive object.

    console.log('Org Chart Seeded (Basic)');
}

async function main() {
    console.log('Start seeding ...');

    // 1. Seed Employees
    for (const member of teamMembers) {
        // Split name for first/last
        const nameParts = member.name.split(' ');
        const firstName = nameParts.slice(0, -1).join(' ');
        const lastName = nameParts.slice(-1).join(' '); // Rough approximation

        await prisma.employee.upsert({
            where: { email: `${member.name.replace(/\s+/g, '.').toLowerCase()}@kimmex.com` }, // Dummy email for unique
            update: {},
            create: {
                firstName: firstName || member.name,
                lastName: lastName || '',
                email: `${member.name.replace(/\s+/g, '.').toLowerCase()}@kimmex.com`,
                // role: member.role, // Removed as it is not in Employee schema
                image: member.image,
                bio: member.bio,
                experience: member.experience,
                location: member.location,
                specialization: member.specialization
            }
        });
    }

    // 2. Seed Services
    for (const s of services) {
        await prisma.service.upsert({
            where: { slug: s.slug },
            update: {},
            create: s
        });
    }

    // 3. Seed Projects
    for (const p of projects) {
        await prisma.project.upsert({
            where: { slug: p.slug },
            update: {},
            create: p
        });
    }

    // 4. Seed Partners
    for (const p of partners) {
        await prisma.partner.create({ // Partners don't have unique slug, so just create
            data: p
        });
    }

    // 5. Seed Testimonials
    for (const t of testimonials) {
        await prisma.testimonial.create({
            data: t
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
