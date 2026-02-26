import { LocalizedString } from '../context/LanguageContext';

export interface ServiceFeature extends LocalizedString { }

export interface Service {
    id: string;
    title: LocalizedString;
    desc: LocalizedString;
    image: string;
    features: ServiceFeature[];
}

export interface ProcessStep {
    id: string;
    step: string;
    title: LocalizedString;
    desc: LocalizedString;
}

export interface Sector {
    id: string;
    title: LocalizedString;
    image: string;
}

export interface ServiceData {
    services: Service[];
    process: ProcessStep[];
    sectors: Sector[];
}

export const serviceData: ServiceData = {
    services: [
        {
            id: 'design-build',
            title: { en: 'Design & Build', kh: 'រចនា និងសាងសង់' },
            desc: { en: 'A seamless integration of architectural creativity and engineering precision. We handle the entire lifecycle from concept to completion.', kh: 'ការរួមបញ្ចូលគ្នារវាងភាពច្នៃប្រឌិតស្ថាបត្យកម្ម និងភាពជាក់លាក់នៃវិស្វកម្ម។ យើងគ្រប់គ្រងវដ្តជីវិតទាំងមូលពីគំនិតដល់ការបញ្ចប់។' },
            image: '/images/projects/Thumbnail-6.jpg',
            features: [
                { en: 'Architectural Design', kh: 'ការរចនាស្ថាបត្យកម្ម' },
                { en: 'Structural Engineering', kh: 'វិស្វកម្មសំណង់' },
                { en: 'Permit Acquisition', kh: 'ការស្នើសុំលិខិតអនុញ្ញាត' },
                { en: 'Turnkey Construction', kh: 'សេវាកម្មសាងសង់ទាំងស្រុង' }
            ]
        },
        {
            id: 'construction',
            title: { en: 'Construction', kh: 'ការសាងសង់' },
            desc: { en: 'World-class building and civil engineering solutions. We deliver robust structures tailored to residential, commercial, and industrial needs.', kh: 'ដំណោះស្រាយវិស្វកម្មស៊ីវិល និងសំណង់កម្រិតពិភពលោក។ យើងផ្តល់ជូននូវរចនាសម្ព័ន្ធរឹងមាំតម្រូវតាមតម្រូវការលំនៅដ្ឋាន ពាណិជ្ជកម្ម និងឧស្សាហកម្ម។' },
            image: '/images/projects/Thumbnail-4.jpg',
            features: [
                { en: 'Civil Engineering', kh: 'វិស្វកម្មស៊ីវិល' },
                { en: 'Building Structure', kh: 'រចនាសម្ព័ន្ធអគារ' },
                { en: 'MEP Systems', kh: 'ប្រព័ន្ធទឹក ភ្លើង និងម៉ាស៊ីន (MEP)' },
                { en: 'Industrial Plants', kh: 'រោងចក្រឧស្សាហកម្ម' }
            ]
        },
        {
            id: 'project-management',
            title: { en: 'Project Management', kh: 'ការគ្រប់គ្រងគម្រោង' },
            desc: { en: 'Comprehensive oversight and strategic advisory ensuring on-time, on-budget delivery. We combine rigorous on-field management with technical and financial insights.', kh: 'ការត្រួតពិនិត្យដ៏ទូលំទូលាយ និងការផ្តល់ប្រឹក្សាយុទ្ធសាស្រ្តធានាបាននូវការដឹកជញ្ជូនទាន់ពេល និងចំថវិកា។ យើងរួមបញ្ចូលការគ្រប់គ្រងយ៉ាងតឹងរ៉ឹងជាមួយចំណេះដឹងផ្នែកបច្ចេកទេស និងហិរញ្ញវត្ថុ។' },
            image: '/images/projects/Thumbnail-5.jpg',
            features: [
                { en: 'Cost Control & Value Engineering', kh: 'ការគ្រប់គ្រងថ្លៃដើម និងវិស្វកម្មតម្លៃ' },
                { en: 'Feasibility Studies', kh: 'ការសិក្សាសមិទ្ធភាព' },
                { en: 'Quality & Safety Compliance', kh: 'ការអនុលោមតាមគុណភាព និងសុវត្ថិភាព' },
                { en: 'Regulatory Advice', kh: 'ការប្រឹក្សាបទប្បញ្ញត្តិ' }
            ]
        }
    ],
    process: [
        { id: 'p1', step: '01', title: { en: 'Consultation & Analysis', kh: 'ការប្រឹក្សា និងការវិភាគ' }, desc: { en: 'Understanding requirements, performing site data deep dives, and feasibility analysis.', kh: 'ការយល់ដឹងអំពីតម្រូវការ ការវិភាគទិន្នន័យទីតាំង និងការវិភាគសមិទ្ធភាព។' } },
        { id: 'p2', step: '02', title: { en: 'Planning & Procurement', kh: 'ការរៀបចំផែនការ និងការទិញ' }, desc: { en: 'Defining project roadmap, budgets, baselines, and vendor selection.', kh: 'ការកំណត់ផែនទីបង្ហាញផ្លូវគម្រោង ថវិកា និងការជ្រើសរើសអ្នកផ្គត់ផ្គង់។' } },
        { id: 'p3', step: '03', title: { en: 'Execution & Advisory', kh: 'ការអនុវត្ត និងការប្រឹក្សា' }, desc: { en: 'On-site management, daily coordination, and ongoing strategic guidance.', kh: 'ការគ្រប់គ្រងនៅនឹងកន្លែង ការសម្របសម្រួលប្រចាំថ្ងៃ និងការណែនាំយុទ្ធសាស្រ្ត។' } },
        { id: 'p4', step: '04', title: { en: 'Systems Integration', kh: 'ការរួមបញ្ចូលប្រព័ន្ធ' }, desc: { en: 'Implementing smart building tech, MEP systems, and advanced automation.', kh: 'ការអនុវត្តបច្ចេកវិទ្យាអគារឆ្លាតវៃ ប្រព័ន្ធ MEP និងការធ្វើស្វ័យប្រវត្តិកម្ម។' } },
        { id: 'p5', step: '05', title: { en: 'Close-out & Reporting', kh: 'ការបញ្ចប់ និងការរាយការណ៍' }, desc: { en: 'Final accounting, documentation, and delivering actionable recommendations.', kh: 'គណនេយ្យចុងក្រោយ ឯកសារ និងការផ្តល់អនុសាសន៍។' } }
    ],
    sectors: [
        { id: 's1', title: { en: 'Government', kh: 'រដ្ឋាភិបាល' }, image: '/images/projects/Thumbnail-1.jpg' },
        { id: 's2', title: { en: 'Public Service', kh: 'សេវាសាធារណៈ' }, image: '/images/projects/Thumbnail-9.jpg' },
        { id: 's3', title: { en: 'Commercial', kh: 'ពាណិជ្ជកម្ម' }, image: '/images/projects/Thumbnail-2.jpg' },
        { id: 's4', title: { en: 'Infrastructure', kh: 'ហេដ្ឋារចនាសម្ព័ន្ធ' }, image: '/images/projects/Thumbnail-7.jpg' },
        { id: 's5', title: { en: 'Water Treatment', kh: 'ប្រព្រឹត្តិកម្មទឹក' }, image: '/images/projects/Thumbnail-1.jpg' },
        { id: 's6', title: { en: 'Systems', kh: 'ប្រព័ន្ធទូទៅ' }, image: '/images/projects/Thumbnail-6.jpg' }
    ]
};
