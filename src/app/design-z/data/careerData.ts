import { LocalizedString } from '../context/LanguageContext';

export interface Job {
    id: number;
    title: LocalizedString;
    dept: string;
    loc: string;
    type: string;
    tags: LocalizedString[];
    salary: string;
    experience: string;
    postedDate: LocalizedString;
    summary: LocalizedString;
    responsibilities: LocalizedString[];
    requirements: LocalizedString[];
    benefits: LocalizedString[];
}

export const allJobs: Job[] = [
    {
        id: 1,
        title: { en: 'Senior Civil Engineer', kh: 'វិស្វករស៊ីវិលជាន់ខ្ពស់' },
        dept: 'Engineering',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: [{ en: 'Construction', kh: 'សំណង់' }, { en: 'Planning', kh: 'ផែនការ' }],
        salary: '$2,500 - $3,500',
        experience: '5+ Years',
        postedDate: { en: '2 days ago', kh: '២ ថ្ងៃមុន' },
        summary: {
            en: 'We are seeking a highly experienced Senior Civil Engineer to lead complex structural projects. You will be responsible for overseeing design integrity, ensuring compliance with international standards, and mentoring junior engineers.',
            kh: 'យើងកំពុងស្វែងរកវិស្វករស៊ីវិលជាន់ខ្ពស់ដែលមានបទពិសោធន៍ខ្ពស់ដើម្បីដឹកនាំគម្រោងរចនាសម្ព័ន្ធស្មុគស្មាញ។ អ្នកនឹងទទួលខុសត្រូវលើការត្រួតពិនិត្យសុចរិតភាពនៃការរចនា ធានានូវការអនុលោមតាមស្តង់ដារអន្តរជាតិ និងការណែនាំវិស្វករជំនាន់ក្រោយ។'
        },
        responsibilities: [
            { en: 'Lead structural analysis and design for high-rise commercial and residential projects.', kh: 'ដឹកនាំការវិភាគ និងការរចនារចនាសម្ព័ន្ធសម្រាប់គម្រោងពាណិជ្ជកម្ម និងលំនៅដ្ឋានខ្ពស់ៗ។' },
            { en: 'Collaborate with architects and MEP engineers to ensure fully integrated designs.', kh: 'សហការជាមួយស្ថាបត្យករ និងវិស្វករ MEP ដើម្បីធានានូវការរចនាដែលរួមបញ្ចូលគ្នាយ៉ាងពេញលេញ។' },
            { en: 'Review and approve technical drawings, specifications, and calculations.', kh: 'ពិនិត្យ និងអនុម័តគំនូរបច្ចេកទេស លក្ខណៈបច្ចេកទេស និងការគណនា។' },
            { en: 'Conduct site inspections to verify construction quality and adherence to design.', kh: 'ធ្វើការត្រួតពិនិត្យការដ្ឋានដើម្បីផ្ទៀងផ្ទាត់គុណភាពសំណង់ និងការអនុវត្តតាមការរចនា។' },
            { en: 'Mentor junior engineering staff and provide technical guidance.', kh: 'ណែនាំបុគ្គលិកវិស្វកម្មជំនាន់ក្រោយ និងផ្តល់ការណែនាំបច្ចេកទេស។' }
        ],
        requirements: [
            { en: 'Master’s Degree in Civil or Structural Engineering.', kh: 'សញ្ញាបត្រអនុបណ្ឌិតផ្នែកវិស្វកម្មស៊ីវិល ឬរចនាសម្ព័ន្ធ។' },
            { en: 'Minimum 8 years of experience in structural design and construction supervision.', kh: 'បទពិសោធន៍យ៉ាងតិច ៨ ឆ្នាំក្នុងការរចនារចនាសម្ព័ន្ធ និងការត្រួតពិនិត្យការសាងសង់។' },
            { en: 'Proficiency in ETABS, SAP2000, and AutoCAD.', kh: 'ជំនាញច្បាស់លាស់ក្នុងកម្មវិធី ETABS, SAP2000, និង AutoCAD។' },
            { en: 'Strong knowledge of ACI, Eurocodes, and local building regulations.', kh: 'ចំណេះដឹងរឹងមាំអំពី ACI, Eurocodes និងបទប្បញ្ញត្តិសំណង់ក្នុងស្រុក។' },
            { en: 'Excellent problem-solving and communication skills.', kh: 'ជំនាញដោះស្រាយបញ្ហា និងការប្រាស្រ័យទាក់ទងយ៉ាងល្អប្រសើរ។' }
        ],
        benefits: [
            { en: 'Competitive salary and performance-based bonuses.', kh: 'ប្រាក់បៀវត្សរ៍ប្រកួតប្រជែង និងប្រាក់រង្វាន់ផ្អែកលើលទ្ធផលការងារ។' },
            { en: 'Health insurance coverage for employee and family.', kh: 'ការធានារ៉ាប់រងសុសុខភាពសម្រាប់បុគ្គលិក និងក្រុមគ្រួសារ។' },
            { en: 'Professional development allowance.', kh: 'ប្រាក់ឧបត្ថម្ភសម្រាប់ការអភិវឌ្ឍវិជ្ជាជីវៈ។' },
            { en: '18 days annual leave + public holidays.', kh: 'ការឈប់សម្រាកប្រចាំឆ្នាំ ១៨ ថ្ងៃ + ថ្ងៃឈប់សម្រាកសាធារណៈ។' }
        ]
    },
    {
        id: 2,
        title: { en: 'Site Manager', kh: 'អ្នកគ្រប់គ្រងទីតាំង' },
        dept: 'Operations',
        loc: 'Sihanoukville',
        type: 'Contract',
        tags: [{ en: 'Management', kh: 'គ្រប់គ្រង' }, { en: 'On-site', kh: 'នៅទីតាំង' }],
        salary: '$1,800 - $2,500',
        experience: '3-5 Years',
        postedDate: { en: '5 days ago', kh: '៥ ថ្ងៃមុន' },
        summary: {
            en: 'The Site Manager will oversee day-to-day operations on our new industrial park project. You will ensure safety, quality, and schedule targets are met.',
            kh: 'អ្នកគ្រប់គ្រងទីតាំងនឹងត្រួតពិនិត្យប្រតិបត្តិការប្រចាំថ្ងៃលើគម្រោងសួនឧស្សាហកម្មថ្មីរបស់យើង។ អ្នកនឹងធានាថាគោលដៅសុវត្ថិភាព គុណភាព និងកាលវិភាគត្រូវបានសម្រេច។'
        },
        responsibilities: [
            { en: 'Manage daily site activities and coordinate subcontractors.', kh: 'គ្រប់គ្រងសកម្មភាពការដ្ឋានប្រចាំថ្ងៃ និងសម្របសម្រួលអ្នកម៉ៅការបន្ត។' },
            { en: 'Ensure strict adherence to HSE policies.', kh: 'ធានាឱ្យមានការអនុវត្តយ៉ាងតឹងរ៉ឹងតាមគោលនយោបាយ HSE ។' },
            { en: 'Monitor project schedule and report progress to headquarters.', kh: 'តាមដានកាលវិភាគគម្រោង និងរាយការណ៍វឌ្ឍនភាពទៅកាន់ទីស្នាក់ការកណ្តាល។' }
        ],
        requirements: [
            { en: 'Bachelor’s Degree in Construction Management or Civil Engineering.', kh: 'សញ្ញាបត្របរិញ្ញាបត្រផ្នែកគ្រប់គ្រងសំណង់ ឬវិស្វកម្មស៊ីវិល។' },
            { en: '5+ years on-site management experience.', kh: 'បទពិសោធន៍គ្រប់គ្រងការដ្ឋានលើសពី ៥ ឆ្នាំ។' },
            { en: 'Strong leadership and conflict resolution skills.', kh: 'ជំនាញដឹកនាំរឹងមាំ និងជំនាញដោះស្រាយវិវាទ។' }
        ],
        benefits: [
            { en: 'Housing allowance', kh: 'ប្រាក់ឧបត្ថម្ភផ្ទះស្នាក់នៅ' },
            { en: 'Travel stipend', kh: 'កម្រៃសោហ៊ុយធ្វើដំណើរ' },
            { en: 'Project completion bonus', kh: 'ប្រាក់រង្វាន់បញ្ចប់គម្រោង' }
        ]
    },
    {
        id: 3,
        title: { en: 'Architectural Designer', kh: 'អ្នករចនាស្ថាបត្យកម្ម' },
        dept: 'Design',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: [{ en: 'Creativity', kh: 'ភាពច្នៃប្រឌិត' }, { en: 'CAD', kh: 'CAD' }],
        salary: '$1,200 - $1,800',
        experience: '2+ Years',
        postedDate: { en: '1 week ago', kh: '១ សប្ដាហ៍មុន' },
        summary: { en: 'Creative designer for architectural projects.', kh: 'អ្នករចនាដែលមានភាពច្នៃប្រឌិតសម្រាប់គម្រោងស្ថាបត្យកម្ម។' },
        responsibilities: [{ en: 'Design concepts', kh: 'រចនាគោលគំនិត' }],
        requirements: [{ en: 'Architecture degree', kh: 'សញ្ញាបត្រស្ថាបត្យកម្ម' }],
        benefits: [{ en: 'Healthcare', kh: 'ការថែទាំសុខភាព' }]
    },
    {
        id: 4,
        title: { en: 'Procurement Officer', kh: 'មន្ត្រីការស្នើប្រើ' },
        dept: 'Supply Chain',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: [{ en: 'Logistics', kh: 'ភស្តុភារ' }, { en: 'Finance', kh: 'ហិរញ្ញវត្ថុ' }],
        salary: '$800 - $1,200',
        experience: '1-3 Years',
        postedDate: { en: '1 week ago', kh: '១ សប្ដាហ៍មុន' },
        summary: { en: 'Sourcing materials.', kh: 'ការស្វែងរកសម្ភារៈ។' },
        responsibilities: [{ en: 'Purchasing', kh: 'ការទិញ' }],
        requirements: [{ en: 'Exp in supply chain', kh: 'បទពិសោធន៍ក្នុងខ្សែសង្វាក់ផ្គត់ផ្គង់' }],
        benefits: [{ en: 'Bonus', kh: 'ប្រាក់រង្វាន់' }]
    },
    {
        id: 5,
        title: { en: 'Safety Inspector (HSE)', kh: 'អ្នកត្រួតពិនិត្យសុវត្ថិភាព (HSE)' },
        dept: 'Quality & Safety',
        loc: 'Kampot',
        type: 'Full-time',
        tags: [{ en: 'Safety', kh: 'សុវត្ថិភាព' }, { en: 'Inspection', kh: 'ការត្រួតពិនិត្យ' }],
        salary: '$1,000 - $1,500',
        experience: '3+ Years',
        postedDate: { en: '2 weeks ago', kh: '២ សប្ដាហ៍មុន' },
        summary: { en: 'Safety compliance.', kh: 'ការអនុលោមតាមសុវត្ថិភាព។' },
        responsibilities: [{ en: 'Inspection', kh: 'ការត្រួតពិនិត្យ' }],
        requirements: [{ en: 'HSE cert', kh: 'វិញ្ញាបនប័ត្រ HSE' }],
        benefits: [{ en: 'Housing', kh: 'ការស្នាក់នៅ' }]
    },
    {
        id: 6,
        title: { en: 'MEP Engineer', kh: 'វិស្វករ MEP' },
        dept: 'Engineering',
        loc: 'Siem Reap',
        type: 'Full-time',
        tags: [{ en: 'Electrical', kh: 'អគ្គិសនី' }, { en: 'Mechanical', kh: 'មេកានិច' }],
        salary: '$1,500 - $2,200',
        experience: '4+ Years',
        postedDate: { en: '2 weeks ago', kh: '២ សប្ដាហ៍មុន' },
        summary: { en: 'MEP systems management.', kh: 'ការគ្រប់គ្រងប្រព័ន្ធ MEP ។' },
        responsibilities: [{ en: 'Engineering design', kh: 'ការរចនាវិស្វកម្ម' }],
        requirements: [{ en: 'MEP degree', kh: 'សញ្ញាបត្រ MEP' }],
        benefits: [{ en: 'Company car', kh: 'ឡានក្រុមហ៊ុន' }]
    }
];
