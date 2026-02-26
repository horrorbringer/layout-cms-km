import { LocalizedString } from '../context/LanguageContext';

export type Project = {
    id: string;
    title: LocalizedString;
    location: LocalizedString;
    type: LocalizedString;
    status: LocalizedString;
    image: string;
    summary: LocalizedString;
};

export const projects: Project[] = [
    // --- Government Office Building ---
    {
        id: 'moi',
        title: { en: 'Ministry of Interior (MOI)', kh: 'ក្រសួងមហាផ្ទៃ (MOI)' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Government Office Building', kh: 'អគារការិយាល័យរដ្ឋាភិបាល' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-1.jpg',
        summary: {
            en: 'A landmark administrative complex featuring khmer-inspired architecture and modern security systems.',
            kh: 'ស្នាដៃស្ថាបត្យកម្មរដ្ឋបាលដ៏ស្រស់ស្អាត ដែលរួមបញ្ចូលស្ថាបត្យកម្មខ្មែរ និងប្រព័ន្ធសន្តិសុខទំនើប។'
        }
    },
    {
        id: 'mef',
        title: { en: 'Ministry of Economy and Finance (MEF)', kh: 'ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ (MEF)' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Government Office Building', kh: 'អគារការិយាល័យរដ្ឋាភិបាល' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-2.jpg',
        summary: {
            en: 'New headquarters designed to centralize financial operations with high-tech infrastructure.',
            kh: 'ទីស្នាក់ការថ្មីដែលបានរចនាដើម្បីកណ្ដើបប្រតិបត្តិការហិរញ្ញវត្ថុ ជាមួយហេដ្ឋារចនាសម្ព័ន្ធបច្ចេកទេសខ្ពស់។'
        }
    },
    {
        id: 'edc',
        title: { en: 'Electricite du Cambodge (EDC)', kh: 'អគ្គិសនីកម្ពុជា (EDC)' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Government Office Building', kh: 'អគារការិយាល័យរដ្ឋាភិបាល' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-3.jpg',
        summary: {
            en: 'Modern office tower for the national electricity utility provider.',
            kh: 'អគារការិយាល័យទំនើបសម្រាប់អ្នកផ្តល់សេវាអគ្គិសនីជាតិ។'
        }
    },
    {
        id: 'nssf',
        title: { en: 'National Social Security Fund (NSSF)', kh: 'បេឡាជាតិរបបសន្តិសុខសង្គម (ប.ស.ស)' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Government Office Building', kh: 'អគារការិយាល័យរដ្ឋាភិបាល' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-4.jpg',
        summary: {
            en: 'Administrative center ensuring social security services for the nation.',
            kh: 'មជ្ឈមណ្ឌលរដ្ឋបាលដែលធានាសេវាសន្តិសុខសង្គមសម្រាប់ប្រទេសជាតិ។'
        }
    },
    {
        id: 'gdce',
        title: { en: 'General Dept. of Customs and Excise (GDCE)', kh: 'អគ្គនាយកដ្ឋានគយ និងរដ្ឋាករ (GDCE)' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Government Office Building', kh: 'អគារការិយាល័យរដ្ឋាភិបាល' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-5.jpg',
        summary: {
            en: 'High-security facility managing national customs operations.',
            kh: 'អគារសន្តិសុខខ្ពស់ ដែលគ្រប់គ្រងប្រតិបត្តិការគយជាតិ។'
        }
    },
    {
        id: 'acu',
        title: { en: 'Anti-Corruption Unit (ACU)', kh: 'អង្គភាពប្រឆាំងអំពើពុករលួយ (ACU)' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Government Office Building', kh: 'អគារការិយាល័យរដ្ឋាភិបាល' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-6.jpg',
        summary: {
            en: 'Headquarters designed with transparency and security at its core.',
            kh: 'ទីស្នាក់ការដែលបានរចនាដោយផ្ដោតទៅលើតម្លាភាព និងសន្តិសុខ។'
        }
    },

    // --- Public Service Building ---
    {
        id: 'ccrh',
        title: { en: 'Cambodia-China Friendship Hospital (CCRH)', kh: 'មន្ទីរពេទ្យមិត្តភាពកម្ពុជា-ចិន (CCRH)' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Public Service Building', kh: 'អគារសេវាសាធារណៈ' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-7.jpg',
        summary: {
            en: 'State-of-the-art medical facility specializing in critical care and surgery.',
            kh: 'មន្ទីរពេទ្យទំនើបឯកទេសខាងការថែទាំសំខាន់ និងការវះកាត់។'
        }
    },
    {
        id: 'ntti',
        title: { en: 'National Technical Training Institute (NTTI)', kh: 'វិទ្យាស្ថានបណ្តុះបណ្ដាលបច្ចេកទេសជាតិ (NTTI)' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Public Service Building', kh: 'អគារសេវាសាធារណៈ' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-8.jpg',
        summary: {
            en: 'Educational complex fostering the next generation of engineers.',
            kh: 'ស្ថានីយ៍អប់រំដែលជំរុញអ្នកជំនាន់ក្រោយនៃវិស្វករ។'
        }
    },
    {
        id: 'rupp',
        title: { en: 'Royal University of Phnom Penh (RUPP)', kh: 'សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ (RUPP)' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Public Service Building', kh: 'អគារសេវាសាធារណៈ' },
        status: { en: 'Under Construction', kh: 'កំពុងសាងសង់' },
        image: '/images/projects/Thumbnail-9.jpg',
        summary: {
            en: 'New STEM building expansion to support advanced research capabilities.',
            kh: 'ការពង្រីកអគារ STEM ថ្មី ដើម្បីគាំទ្រសមត្ថភាពស្រាវជ្រាវកម្រិតខ្ពស់។'
        }
    },
    {
        id: 'pnt-stadium',
        title: { en: 'National Stadium Expansion', kh: 'ការពង្រីកស្ដេហ៍ជាតិ' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Public Service Building', kh: 'អគារសេវាសាធារណៈ' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail.jpg',
        summary: {
            en: 'Upgrading facilities to meet international sporting standards.',
            kh: 'ការធ្វើឱ្យប្រសើរឡើងនូវកន្លែងជួប ដើម្បីបំពេញនូវស្តង់ដារកីឡាអន្តរជាតិ។'
        }
    },

    // --- Water Treatment Plant ---
    {
        id: 'kt-wtp',
        title: { en: 'Khleang Toeuk Water Treatment Plant', kh: 'ស្ថានីយ៍ប្រព្រឹត្តកម្មទឹក ខ្លែងទឹក' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Water Treatment Plant', kh: 'ស្ថានីយ៍ប្រព្រឹត្តកម្មទឹក' },
        status: { en: 'Under Construction', kh: 'កំពុងសាងសង់' },
        image: '/images/projects/Thumbnail-1.jpg',
        summary: {
            en: 'Strategic infrastructure project increasing water supply capacity.',
            kh: 'គម្រោងហេដ្ឋារចនាសម្ព័ន្ធជាយុទ្ធសាស្ត្រ ដែលបង្កើនសមត្ថភាពផ្គត់ផ្គង់ទឹក។'
        }
    },
    {
        id: 'pv-wtp',
        title: { en: 'Phum Prek Water Treatment Plant', kh: 'ស្ថានីយ៍ប្រព្រឹត្តកម្មទឹក ភូមិព្រែក' },
        location: { en: 'Kandal', kh: 'កណ្ដាល' },
        type: { en: 'Water Treatment Plant', kh: 'ស្ថានីយ៍ប្រព្រឹត្តកម្មទឹក' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-2.jpg',
        summary: {
            en: 'Ensuring clean water access for the growing provincial population.',
            kh: 'ធានាការប្រើប្រាស់ទឹកស្អាតសម្រាប់ប្រជាជនខេត្តដែលកំពុងកើនឡើង។'
        }
    },

    // --- Slope Construction ---
    {
        id: 'mekong-slope',
        title: { en: 'Mekong River Bank Protection', kh: 'ការការពារច្រាំងទន្លេមេគង្គ' },
        location: { en: 'Kandal', kh: 'កណ្ដាល' },
        type: { en: 'Slope Construction', kh: 'ការសាងសង់ជម្រាល' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-3.jpg',
        summary: {
            en: 'Geotechnical engineering project stabilizing 5km of riverbank against erosion.',
            kh: 'គម្រោងភូ-បច្ចេកទេសសម្រាប់ការពារ ៥ គីឡូម៉ែត្រច្រាំងទន្លេ ពីការ침ហ្ស័ត។'
        }
    },
    {
        id: 'bvm-slope',
        title: { en: 'BVM Slope Stabilization', kh: 'ការបង្ហាប់ជម្រាល BVM' },
        location: { en: 'Sihanoukville', kh: 'ក្រុងស្ីហនុ' },
        type: { en: 'Slope Construction', kh: 'ការសាងសង់ជម្រាល' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-4.jpg',
        summary: {
            en: 'Advanced soil reinforcement for hillside development safety.',
            kh: 'ការពង្រឹងដីកម្រិតខ្ពស់ ដើម្បីធានាចំពោះការអភិវឌ្ឍនៅជំរៅភ្នំ។'
        }
    },
    {
        id: 'vattanac',
        title: { en: 'Vattanac Capital Tower Fit-out', kh: 'ការតុបតែងអគារ Vattanac Capital Tower' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Private Building', kh: 'អគារឯកជន' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-5.jpg',
        summary: {
            en: 'Luxury office and retail fit-out for one of Cambodia\'s tallest skyscrapers.',
            kh: 'ការតុបតែងការិយាល័យ និងហាងលក់រៀបរយខ្ពស់ សម្រាប់អគារត្រពាំងដ៏ខ្ពស់បំផុតក្នុង​ ប្រទេសកម្ពុជា។'
        }
    },
    // --- Systems Integration ---
    {
        id: 'smart-grid-ph',
        title: { en: 'Smart Grid Central Control', kh: 'ការគ្រប់គ្រងបណ្ដាញ Smart Grid' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Systems', kh: 'ប្រព័ន្ធ' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-6.jpg',
        summary: {
            en: 'Implementation of advanced energy management systems for the city central grid.',
            kh: 'ការអនុវត្តប្រព័ន្ធគ្រប់គ្រងថាមពលកម្រិតខ្ពស់ សម្រាប់បណ្ដាញអគ្គិសនីកណ្ដាលក្រុង។'
        }
    },
    {
        id: 'mep-retrofit',
        title: { en: 'Olympic Stadium MEP Retrofit', kh: 'ការធ្វើ MEP ថ្មីស្ដេហ៍អូឡាំពិក' },
        location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
        type: { en: 'Systems', kh: 'ប្រព័ន្ធ' },
        status: { en: 'Completed', kh: 'បានបញ្ចប់' },
        image: '/images/projects/Thumbnail-7.jpg',
        summary: {
            en: 'Complete modernization of mechanical, electrical, and plumbing systems for international competition standards.',
            kh: 'ការធ្វើទំនើបភាវូបនីយកម្មពេញលេញនៃប្រព័ន្ធមេកានិច អគ្គិសនី និងទឹក ដើម្បីស្តង់ដារប្រកួតប្រជែងអន្តរជាតិ។'
        }
    }
];
