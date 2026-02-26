import { LocalizedString } from '../context/LanguageContext';

export interface Document {
    id: number;
    title: LocalizedString;
    date: string;
    category: string;
    size: string;
    type: string;
    description: LocalizedString;
    image: string;
}

export const allDocuments: Document[] = [
    {
        id: 1,
        title: { en: 'Kimmex Engineering Standards 2026: High-Rise Structural Integrity', kh: 'ស្តង់ដារវិស្វកម្ម Kimmex ២០២៦: សុចរិតភាពរចនាសម្ព័ន្ធអាគារខ្ពស់' },
        date: 'Jan 10, 2026',
        category: 'Engineering',
        size: '15.4 MB',
        type: 'PDF',
        description: { en: 'Comprehensive guidelines and technical specifications for structural steel and concrete reinforcement in high-rise developments greater than 40 floors.', kh: 'គោលការណ៍ណែនាំ និងលក្ខណៈបច្ចេកទេសសំរាប់ដែកថែប និងការពង្រឹងបេតុងក្នុងការអភិវឌ្ឍអាគារខ្ពស់ជាង ៤០ ជាន់។' },
        image: '/images/projects/Thumbnail-1.jpg'
    },
    {
        id: 2,
        title: { en: 'Sustainable Materials Research: Green Concrete Viability', kh: 'ការស្រាវជ្រាវសម្ភារៈនិរន្តរ: ការអាចប្រើប្រាស់បេតុងបៃតង' },
        date: 'Dec 15, 2025',
        category: 'Research',
        size: '4.2 MB',
        type: 'PDF',
        description: { en: 'Internal research findings on the cost-benefit analysis and long-term durability of recycled aggregate concrete in tropical climates.', kh: 'លទ្ធផលស្រាវជ្រាវផ្ទៃក្នុងស្ដីអំពីការវិភាគចំណូល-ចំណាយ និងភាពស្ថិតស្ថេររយៈពេលវែងនៃបេតុងចាក់ក្នុងអាកាសធាតុត្រូពិក។' },
        image: '/images/projects/Thumbnail-8.jpg'
    },
    {
        id: 3,
        title: { en: 'Standard Operating Procedures (SOP): Heavy Machinery Safety', kh: 'នីតិវិធីប្រតិបត្តិការស្តង់ដារ (SOP): សុវត្ថិភាពម៉ាស៊ីនធ្ងន់' },
        date: 'Nov 22, 2025',
        category: 'Safety',
        size: '12.8 MB',
        type: 'PDF',
        description: { en: 'Mandatory safety protocols for crane and excavator operators, including pre-start checks and emergency shutdown procedures.', kh: 'ពិធីការសុវត្ថិភាពចាំបាច់សំរាប់អ្នកបើកប្រវ័ញ្ច និងយន្ត្រករ ទាំងការត្រួតពិនិត្យមុនចាប់ផ្ដើម និងនីតិវិធីបិទអន្ត្រាយ។' },
        image: '/images/projects/Thumbnail-6.jpg'
    },
    {
        id: 4,
        title: { en: 'Urban Planning Case Study: Phnom Penh 2030', kh: 'ករណីសិក្សាការរៀបចំទីក្រុង: ភ្នំពេញ ២០៣០' },
        date: 'Oct 05, 2025',
        category: 'Case Study',
        size: '25 MB',
        type: 'PDF',
        description: { en: 'A forward-looking analysis of infrastructure needs for the expanding metropolitan area, prepared by Kimmex Strategy Division.', kh: 'ការវិភាគទស្សន៍ទ្រនិចអំពីតម្រូវការហេដ្ឋារចនាសម្ព័ន្ធសម្រាប់តំបន់ទីក្រុងកំពុងពង្រីក ដោយនាយកដ្ឋានយុទ្ធសាស្ត្ររបស់ Kimmex។' },
        image: '/images/projects/Thumbnail-2.jpg'
    },
    {
        id: 5,
        title: { en: 'ISO 9001:2015 Quality Management Framework', kh: 'ក្របខ័ណ្ឌគ្រប់គ្រងគុណភាព ISO 9001:2015' },
        date: 'Sep 12, 2025',
        category: 'Corporate',
        size: '3.5 MB',
        type: 'PDF',
        description: { en: 'Official documentation of our quality assurance processes, utilized across all project lifecycles.', kh: 'ឯកសាររបស់ការធានាគុណភាពផ្លូវការ ដែលត្រូវបានប្រើប្រាស់ក្នុងវដ្តជីវិតគម្រោងទាំងអស់។' },
        image: '/images/projects/Thumbnail-5.jpg'
    },
    {
        id: 6,
        title: { en: 'Technical Specification: Solar Facade Integration', kh: 'លក្ខណៈបច្ចេកទេស: ការបញ្ចូលស្រាប់ព្រះអាទិត្យ' },
        date: 'Aug 20, 2025',
        category: 'Technical',
        size: '8.1 MB',
        type: 'PDF',
        description: { en: 'Technical drawings and electrical specifications for integrating BIPV (Building Integrated Photovoltaics) into glass facades.', kh: 'គំនូររូបភាពបច្ចេកទេស និងលក្ខណៈអគ្គិសនីសម្រាប់ការបញ្ចូល BIPV (ថាមពលព្រះអាទិត្យបញ្ចូលក្នុងអគារ) ទៅក្នុងមុខអគារកញ្ចក់។' },
        image: '/images/projects/Thumbnail-9.jpg'
    }
];
