import { LocalizedString } from '../context/LanguageContext';

export type ProjectDetail = {
    title: LocalizedString;
    subtitle: LocalizedString;
    location: LocalizedString;
    client: LocalizedString;
    sector: LocalizedString;
    area: string;
    year: string;
    status: LocalizedString;
    image: string;
    description: {
        background: LocalizedString;
        objectives: LocalizedString;
        concept: LocalizedString;
    };
    services: LocalizedString[];
    challenges: LocalizedString[];
    gallery: string[];
};

export const projectDetails: Record<string, ProjectDetail> = {
    'moi': {
        title: { en: 'Ministry of Interior (MOI)', kh: 'ក្រសួងមហាផ្ទៃ (MOI)' },
        subtitle: { en: 'Government Office Building - Phnom Penh', kh: 'អគារការិយាល័យរដ្ឋាភិបាល - ភ្នំពេញ' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        client: { en: 'Royal Government of Cambodia', kh: 'រាជរដ្ឋាភិបាលកម្ពុជា' },
        sector: { en: 'Government', kh: 'រដ្ឋាភិបាល' },
        area: '45,000 sqm',
        year: '2023',
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-1.jpg',
        description: {
            background: {
                en: 'The new Ministry of Interior complex was commissioned to centralize administrative functions and provide a modern, secure facility for government operations.',
                kh: 'អគារថ្មីនៃក្រសួងមហាផ្ទៃត្រូវបានសាងសង់ឡើងដើម្បីប្រមូលផ្ដុំមុខងាររដ្ឋបាល និងផ្តល់នូវកន្លែងទំនើប និងមានសុវត្ថិភាពសម្រាប់ប្រតិបត្តិការរបស់រដ្ឋាភិបាល។'
            },
            objectives: {
                en: 'To create a landmark building that reflects Khmer architectural heritage while incorporating state-of-the-art security, energy efficiency, and functional office spaces.',
                kh: 'ដើម្បីបង្កើតអគារនិមិត្តរូបដែលឆ្លុះបញ្ចាំងពីបេតិកភណ្ឌស្ថាបត្យកម្មខ្មែរ ក្នុងពេលដំណាលគ្នានឹងការរួមបញ្ចូលសន្តិសុខទំនើប ប្រសិទ្ធភាពថាមពល និងកន្លែងការិយាល័យដែលផ្តល់ភាពងាយស្រួល។'
            },
            concept: {
                en: 'The design draws inspiration from the lotus flower, symbolizing purity and strength, with a central tiered roof structure and symmetrical wings.',
                kh: 'ការរចនាដកស្រង់ចេញពីផ្ការំដួល ដែលតំណាងឱ្យភាពបរិសុទ្ធ និងភាពរឹងមាំ ជាមួយនឹងរចនាសម្ព័ន្ធដំបូលថ្នាក់កណ្តាល និងស្លាបសងខាងដែលមានតុល្យភាព។'
            }
        },
        services: [
            { en: 'Structural Engineering', kh: 'វិស្វកម្មរចនាសម្ព័ន្ធ' },
            { en: 'Architectural Design', kh: 'ការរចនាស្ថាបត្យកម្ម' },
            { en: 'MEP Installation', kh: 'ការដំឡើង MEP' },
            { en: 'Interior Fit-out', kh: 'ការតុបតែងខាងក្នុង' },
            { en: 'Landscape Architecture', kh: 'ស្ថាបត្យកម្មទេសភាព' }
        ],
        challenges: [
            { en: 'Strict security protocols requiring compartmentalized access control.', kh: 'ពិធីសារសុវត្ថិភាពតឹងរ៉ឹងដែលតម្រូវឱ្យមានការត្រួតពិនិត្យការចូលប្រើប្រាស់តាមផ្នែក។' },
            { en: 'Integration of advanced IT infrastructure within a traditional aesthetic.', kh: 'ការរួមបញ្ចូលហេដ្ឋារចនាសម្ព័ន្ធព័ត៌មានវិទ្យាកម្រិតខ្ពស់នៅក្នុងសោភ័ណភាពប្រពៃណី។' },
            { en: 'Short timeline requiring 24/7 construction shifts.', kh: 'រយៈពេលខ្លីដែលតម្រូវឱ្យមានការសាងសង់ ២៤ម៉ោងលើ២៤ម៉ោង។' }
        ],
        gallery: [
            '/images/projects/Thumbnail-2.jpg',
            '/images/projects/Thumbnail-3.jpg',
            '/images/projects/Thumbnail-4.jpg'
        ]
    },
    'mef': {
        title: { en: 'Ministry of Economy & Finance (MEF)', kh: 'ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ (MEF)' },
        subtitle: { en: 'Government Office Building - Phnom Penh', kh: 'អគារការិយាល័យរដ្ឋាភិបាល - ភ្នំពេញ' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        client: { en: 'Ministry of Economy & Finance', kh: 'ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ' },
        sector: { en: 'Government', kh: 'រដ្ឋាភិបាល' },
        area: '38,000 sqm',
        year: '2022',
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-2.jpg',
        description: {
            background: {
                en: 'A dedicated headquarters for the nation\'s financial planning and economic management.',
                kh: 'ទីស្នាក់ការកណ្តាលសម្រាប់ផែនការហិរញ្ញវត្ថុ និងការគ្រប់គ្រងសេដ្ឋកិច្ចរបស់ជាតិ។'
            },
            objectives: {
                en: 'Construct a highly functional, secure, and prestigious workspace that accommodates the growing staff of the ministry.',
                kh: 'សាងសង់កន្លែងធ្វើការដែលមានមុខងារខ្ពស់ មានសុវត្ថិភាព និងមានកិត្យានុភាព ដែលអាចផ្ទុកបុគ្គលិកដែលកំពុងកើនឡើងរបស់ក្រសួង។'
            },
            concept: {
                en: 'Modernist solidity combined with traditional Khmer motifs on the facade.',
                kh: 'ភាពរឹងមាំបែបទំនើបនិយមរួមបញ្ចូលគ្នាជាមួយក្បាច់ខ្មែរបុរាណនៅលើជញ្ជាំងខាងមុខ។'
            }
        },
        services: [
            { en: 'General Construction', kh: 'ការសាងសង់ទូទៅ' },
            { en: 'MEP Works', kh: 'ការងារ MEP' },
            { en: 'External Infrastructures', kh: 'ហេដ្ឋារចនាសម្ព័ន្ធខាងក្រៅ' }
        ],
        challenges: [
            { en: 'Deep basement construction in high water table area.', kh: 'ការសាងសង់ជាន់ក្រោមដីជ្រៅនៅក្នុងតំបន់ដែលមានកម្រិតទឹកក្រោមដីខ្ពស់។' },
            { en: 'Complex data center cooling requirements.', kh: 'តម្រូវការប្រព័ន្ធត្រជាក់មជ្ឈមណ្ឌលទិន្នន័យដ៏ស្មុគស្មាញ។' }
        ],
        gallery: [
            '/images/projects/Thumbnail-5.jpg',
            '/images/projects/Thumbnail-6.jpg',
            '/images/projects/Thumbnail-7.jpg',
            '/images/projects/Thumbnail-8.jpg'
        ]
    },
    'kt-wtp': {
        title: { en: 'Khleang Toeuk WTP', kh: 'ស្ថានីយ៍ប្រព្រឹត្តកម្មទឹក ខ្លែងទឹក' },
        subtitle: { en: 'Water Treatment Plant', kh: 'ស្ថានីយ៍ប្រព្រឹត្តកម្មទឹក' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        client: { en: 'Phnom Penh Water Supply Authority', kh: 'រដ្ឋាករទឹកស្វយ័តក្រុងភ្នំពេញ' },
        sector: { en: 'Infrastructure', kh: 'ហេដ្ឋារចនាសម្ព័ន្ធ' },
        area: '12 Hectares',
        year: '2024',
        status: { en: 'Under Construction', kh: 'កំពុងសាងសង់' },
        image: '/images/projects/Thumbnail-1.jpg',
        description: {
            background: {
                en: 'A critical infrastructure project designed to alleviate water shortages in the western districts of Phnom Penh.',
                kh: 'គម្រោងហេដ្ឋារចនាសម្ព័ន្ធដ៏សំខាន់ដែលត្រូវបានរចនាឡើងដើម្បីកាត់បន្ថយការខ្វះខាតទឹកនៅក្នុងសង្កាត់ភាគខាងលិចនៃទីក្រុងភ្នំពេញ។'
            },
            objectives: {
                en: 'Increase production capacity by 50,000 m3/day and ensure compliance with WHO water quality standards.',
                kh: 'បង្កើនសមត្ថភាពផលិត ៥០,០០០ ម៉ែត្រគូបក្នុងមួយថ្ងៃ និងធានាបាននូវការអនុលោមតាមស្តង់ដារគុណភាពទឹករបស់អង្គការសុខភាពពិភពលោក។'
            },
            concept: {
                en: 'Industrial efficiency meeting sustainable hydraulic engineering.',
                kh: 'ប្រសិទ្ធភាពឧស្សាហកម្មជួបជាមួយវិស្វកម្មធារាសាស្ត្រប្រកបដោយនិរន្តរភាព។'
            }
        },
        services: [
            { en: 'Civil Works', kh: 'ការងារស៊ីវិល' },
            { en: 'Pipe Laying', kh: 'ការដាក់ទុយោ' },
            { en: 'Pumping Station Construction', kh: 'ការសាងសង់ស្ថានីយ៍បូមទឹក' },
            { en: 'Reservoir Building', kh: 'ការសាងសង់អាងស្តុកទឹក' }
        ],
        challenges: [
            { en: 'Soft soil conditions requiring extensive piling.', kh: 'ស្ថានភាពដីទន់ដែលតម្រូវឱ្យមានការបុកគ្រឹះទ្រង់ទ្រាយធំ។' },
            { en: 'Coordination with existing underground utilities.', kh: 'ការសម្របសម្រួលជាមួយប្រព័ន្ធប្រើប្រាស់ក្រោមដីដែលមានស្រាប់។' }
        ],
        gallery: [
            '/images/projects/Thumbnail-6.jpg',
            '/images/projects/Thumbnail-7.jpg',
            '/images/projects/Thumbnail-8.jpg'
        ]
    },
    'mekong-slope': {
        title: { en: 'Mekong River Bank Protection', kh: 'ការការពារច្រាំងទន្លេមេគង្គ' },
        subtitle: { en: 'Slope Construction', kh: 'ការសាងសង់ជម្រាល' },
        location: { en: 'Kandal Province', kh: 'ខេត្តកណ្តាល' },
        client: { en: 'Ministry of Public Works', kh: 'ក្រសួងសាធារណការ' },
        sector: { en: 'Infrastructure', kh: 'ហេដ្ឋារចនាសម្ព័ន្ធ' },
        area: '5km Length',
        year: '2021',
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-3.jpg',
        description: {
            background: {
                en: 'Severe erosion along the Mekong riverbank threatened local communities and agricultural land.',
                kh: 'ការច្រោះច្រាំងយ៉ាងធ្ងន់ធ្ងរនៅតាមដងទន្លេមេគង្គបានគំរាមកំហែងដល់សហគមន៍មូលដ្ឋាន និងដីកសិកម្ម។'
            },
            objectives: {
                en: 'Stabilize the riverbank using sustainable and durable geotechnical solutions.',
                kh: 'ធ្វើឱ្យច្រាំងទន្លេមានលំនឹងដោយប្រើដំណោះស្រាយភូមិសាស្ត្របច្ចេកទេសប្រកបដោយនិរន្តរភាព និងយូរអង្វែង។'
            },
            concept: {
                en: 'Gabion walls combined with vegetation to prevent soil erosion naturally.',
                kh: 'ជញ្ជាំង Gabion រួមបញ្ចូលគ្នាជាមួយរុក្ខជាតិដើម្បីការពារការច្រោះដីតាមបែបធម្មជាតិ។'
            }
        },
        services: [
            { en: 'Geotechnical Survey', kh: 'ការស្ទង់មតិភូមិសាស្ត្របច្ចេកទេស' },
            { en: 'Slope Stabilization', kh: 'ស្ថេរភាពជម្រាល' },
            { en: 'Gabion Installation', kh: 'ការដំឡើង Gabion' }
        ],
        challenges: [
            { en: 'Working against strong river currents.', kh: 'ធ្វើការប្រឆាំងនឹងចរន្តទឹកទន្លេខ្លាំង។' },
            { en: 'Accessibility for heavy machinery on soft ground.', kh: 'លទ្ធភាពចូលប្រើប្រាស់សម្រាប់គ្រឿងចក្រធុនធ្ងន់នៅលើដីទន់។' }
        ],
        gallery: [
            '/images/projects/Thumbnail-7.jpg',
            '/images/projects/Thumbnail-1.jpg',
            '/images/projects/Thumbnail-4.jpg'
        ]
    }
};
