import { LocalizedString } from '../context/LanguageContext';

export interface Job {
    id: string;
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

export const jobData: Job[] = [
    {
        id: '1',
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
            kh: 'យើងកំពុងស្វែងរកវិស្វករស៊ីវិលជាន់ខ្ពស់ដែលមានបទពិសោធន៍ខ្ពស់ដើម្បីដឹកនាំគម្រោងរចនាសម្ព័ន្ធស្មុគស្មាញ។ អ្នកនឹងទទួលខុសត្រូវលើការត្រួតពិនិត្យសុពលភាពនៃការរចនា ធានានូវការអនុលោមតាមស្តង់ដារអន្តរជាតិ និងណែនាំវិស្វករវ័យក្មេង។'
        },
        responsibilities: [
            { en: 'Lead structural analysis and design for high-rise commercial and residential projects.', kh: 'ដឹកនាំការវិភាគ និងការរចនារចនាសម្ព័ន្ធសម្រាប់គម្រោងអគារពាណិជ្ជកម្ម និងលំនៅដ្ឋានខ្ពស់ៗ។' },
            { en: 'Collaborate with architects and MEP engineers to ensure fully integrated designs.', kh: 'សហការជាមួយស្ថាបត្យករ និងវិស្វករ MEP ដើម្បីធានាបាននូវការរចនាដែលរួមបញ្ចូលគ្នាយ៉ាងពេញលេញ។' },
            { en: 'Review and approve technical drawings, specifications, and calculations.', kh: 'ពិនិត្យ និងអនុម័តគំនូរបច្ចេកទេស លក្ខណៈបច្ចេកទេស និងការគណនា។' },
            { en: 'Conduct site inspections to verify construction quality and adherence to design.', kh: 'ចុះត្រួតពិនិត្យការដ្ឋានដើម្បីផ្ទៀងផ្ទាត់គុណភាពសំណង់ និងការគោរពតាមការរចនា។' },
            { en: 'Mentor junior engineering staff and provide technical guidance.', kh: 'ណែនាំបុគ្គលិកវិស្វករវ័យក្មេង និងផ្តល់ការណែនាំបច្ចេកទេស។' }
        ],
        requirements: [
            { en: 'Master’s Degree in Civil or Structural Engineering.', kh: 'សញ្ញាបត្របរិញ្ញាបត្រជាន់ខ្ពស់ផ្នែកវិស្វកម្មស៊ីវិល ឬរចនាសម្ព័ន្ធ។' },
            { en: 'Minimum 8 years of experience in structural design and construction supervision.', kh: 'បទពិសោធន៍យ៉ាងតិច ៨ ឆ្នាំក្នុងការរចនារចនាសម្ព័ន្ធ និងការត្រួតពិនិត្យការសាងសង់។' },
            { en: 'Proficiency in ETABS, SAP2000, and AutoCAD.', kh: 'ជំនាញប្រើប្រាស់ ETABS, SAP2000 និង AutoCAD។' },
            { en: 'Strong knowledge of ACI, Eurocodes, and local building regulations.', kh: 'ចំណេះដឹងរឹងមាំអំពី ACI, Eurocodes និងបទប្បញ្ញត្តិសំណង់ក្នុងស្រុក។' },
            { en: 'Excellent problem-solving and communication skills.', kh: 'ជំនាញដោះស្រាយបញ្ហា និងទំនាក់ទំនងល្អឥតខ្ចោះ។' }
        ],
        benefits: [
            { en: 'Competitive salary and performance-based bonuses.', kh: 'ប្រាក់ខែប្រកួតប្រជែង និងប្រាក់រង្វាន់លើកទឹកចិត្តផ្អែកលើលទ្ធផលការងារ។' },
            { en: 'Health insurance coverage for employee and family.', kh: 'ការធានារ៉ាប់រងសុខភាពសម្រាប់បុគ្គលិក និងក្រុមគ្រួសារ។' },
            { en: 'Professional development allowance.', kh: 'ថវិកាសម្រាប់ការអភិវឌ្ឍជំនាញវិជ្ជាជីវៈ។' },
            { en: '18 days annual leave + public holidays.', kh: 'ច្បាប់ឈប់សម្រាកប្រចាំឆ្នាំ ១៨ ថ្ងៃ + ថ្ងៃឈប់សម្រាកសាធារណៈ។' }
        ]
    },
    {
        id: '2',
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
            kh: 'អ្នកគ្រប់គ្រងការដ្ឋាននឹងត្រួតពិនិត្យប្រតិបត្តិការប្រចាំថ្ងៃលើគម្រោងសួនឧស្សាហកម្មថ្មីរបស់យើង។ អ្នកនឹងធានាថាគោលដៅសុវត្ថិភាព គុណភាព និងកាលវិភាគត្រូវបានសម្រេច។'
        },
        responsibilities: [
            { en: 'Manage daily site activities and coordinate subcontractors.', kh: 'គ្រប់គ្រងសកម្មភាពការដ្ឋានប្រចាំថ្ងៃ និងសម្របសម្រួលអ្នកម៉ៅការបន្ត។' },
            { en: 'Ensure strict adherence to HSE policies.', kh: 'ធានាការគោរពយ៉ាងតឹងរ៉ឹងចំពោះគោលនយោបាយ HSE។' },
            { en: 'Monitor project schedule and report progress to headquarters.', kh: 'តាមដានកាលវិភាគគម្រោង និងរាយការណ៍វឌ្ឍនភាពទៅកាន់ទីស្នាក់ការកណ្តាល។' }
        ],
        requirements: [
            { en: 'Bachelor’s Degree in Construction Management or Civil Engineering.', kh: 'សញ្ញាបត្របរិញ្ញាបត្រផ្នែកគ្រប់គ្រងការសាងសង់ ឬវិស្វកម្មស៊ីវិល។' },
            { en: '5+ years on-site management experience.', kh: 'បទពិសោធន៍គ្រប់គ្រងការដ្ឋានលើសពី ៥ ឆ្នាំ។' },
            { en: 'Strong leadership and conflict resolution skills.', kh: 'ជំនាញដឹកនាំ និងការដោះស្រាយជម្លោះខ្លាំង។' }
        ],
        benefits: [
            { en: 'Housing allowance', kh: 'ប្រាក់ឧបត្ថម្ភការស្នាក់នៅ' },
            { en: 'Travel stipend', kh: 'ប្រាក់ឧបត្ថម្ភការធ្វើដំណើរ' },
            { en: 'Project completion bonus', kh: 'ប្រាក់រង្វាន់បញ្ចប់គម្រោង' }
        ]
    },
    {
        id: '3',
        title: { en: 'Architectural Designer', kh: 'អ្នករចនាស្ថាបត្យកម្ម' },
        dept: 'Design',
        loc: 'Phnom Penh',
        type: 'Full-time',
        tags: [{ en: 'Creativity', kh: 'ភាពច្នៃប្រឌិត' }, { en: 'CAD', kh: 'CAD' }],
        salary: '$1,200 - $1,800',
        experience: '2+ Years',
        postedDate: { en: '1 week ago', kh: '១ សប្ដាហ៍មុន' },
        summary: {
            en: 'We are looking for a creative Architectural Designer to join our design team. You will be helping turn client visions into functional and beautiful blueprints.',
            kh: 'យើងកំពុងស្វែងរកអ្នករចនាស្ថាបត្យកម្មដែលមានភាពច្នៃប្រឌិតដើម្បីចូលរួមជាមួយក្រុមរចនារបស់យើង។ អ្នកនឹងជួយបង្វែរចក្ខុវិស័យរបស់អតិថិជនឱ្យទៅជាប្លង់វិស្វកម្មដែលមានមុខងារ និងស្រស់ស្អាត។'
        },
        responsibilities: [
            { en: 'Develop design concepts and detailed drawings for various construction projects.', kh: 'បង្កើតគំនិតរចនា និងគំនូរលម្អិតសម្រាប់គម្រោងសំណង់ផ្សេងៗ។' },
            { en: 'Prepare 3D models and renderings for client presentations.', kh: 'រៀបចំម៉ូដែល 3D និងរូបភាព Rendering សម្រាប់ការបង្ហាញដល់អតិថិជន។' },
            { en: 'Ensure designs comply with building codes and accessibility standards.', kh: 'ធានាថាការរចនាអនុលោមតាមក្រមសីលធម៌សំណង់ និងស្តង់ដារលទ្ធភាពប្រើប្រាស់។' }
        ],
        requirements: [
            { en: 'Bachelor’s Degree in Architecture or related field.', kh: 'សញ្ញាបត្របរិញ្ញាបត្រផ្នែកស្ថាបត្យកម្ម ឬជំនាញពាក់ព័ន្ធ។' },
            { en: 'Strong portfolio demonstrating creativity and technical skill.', kh: 'ស្នាដៃ (Portfolio) រឹងមាំដែលបង្ហាញពីភាពច្នៃប្រឌិត និងជំនាញបច្ចេកទេស។' },
            { en: 'Proficiency in Revit, Rhino, or AutoCAD.', kh: 'ជំនាញប្រើប្រាស់ Revit, Rhino ឬ AutoCAD។' }
        ],
        benefits: [
            { en: 'Creative workspace and collaborative environment.', kh: 'កន្លែងធ្វើការប្រកបដោយភាពច្នៃប្រឌិត និងបរិយាកាសសហការណ៍។' },
            { en: 'Learning opportunities for new design software.', kh: 'ឱកាសរៀនកម្មវិធីរចនាថ្មីៗ។' }
        ]
    }
];
