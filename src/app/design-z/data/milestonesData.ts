import { LocalizedString } from '../context/LanguageContext';

export interface Milestone {
    year: string;
    title: LocalizedString;
    desc: LocalizedString;
    image: string;
    projects?: LocalizedString[];
}

export const milestones: Milestone[] = [
    {
        year: '1999',
        title: { en: 'Foundation', kh: 'ការបង្កើតឡើង' },
        desc: { en: 'Kim Mex Construction & Investment Co.,Ltd. was established and registered in accordance with the regulations and laws of the Kingdom of Cambodia.', kh: 'ក្រុមហ៊ុន Kim Mex Construction & Investment Co.,Ltd. ត្រូវបានបង្កើតឡើង និងចុះបញ្ជីស្របតាមបទប្បញ្ញត្តិ និងច្បាប់នៃព្រះរាជាណាចក្រកម្ពុជា។' },
        image: '/images/projects/Thumbnail-1.jpg'
    },
    {
        year: '2001-2004',
        title: { en: 'Early Growth', kh: 'កំណើនដំបូង' },
        desc: { en: 'Laying the groundwork for excellence in provincial infrastructure and building quality partnerships across the kingdom.', kh: 'ការរៀបចំមូលដ្ឋានគ្រឹះសម្រាប់ឧត្តមភាពនៅក្នុងហេដ្ឋារចនាសម្ព័ន្ធខេត្ត និងការកសាងភាពជាដៃគូប្រកបដោយគុណភាពនៅទូទាំងព្រះរាជាណាចក្រកម្ពុជា។' },
        image: '/images/projects/Thumbnail-2.jpg'
    },
    {
        year: '2005-2013',
        title: { en: 'Expanding Horizons', kh: 'ការពង្រីកវិសាលភាព' },
        desc: { en: 'Significant expansion of services into specialized building construction and large-scale public utility projects.', kh: 'ការពង្រីកសេវាកម្មយ៉ាងសំខាន់ទៅក្នុងការសាងសង់អគារឯកទេស និងគម្រោងហេដ្ឋារចនាសម្ព័ន្ធសាធារណៈខ្នាតធំ។' },
        image: '/images/projects/Thumbnail-3.jpg'
    },
    {
        year: '2014-2017',
        title: { en: 'Institutional Partnerships', kh: 'ភាពជាដៃគូស្ថាប័ន' },
        desc: { en: 'Delivery of key institutional projects including:', kh: 'ការប្រគល់គម្រោងស្ថាប័នសំខាន់ៗរួមមាន៖' },
        projects: [
            { en: 'Ministry of Economy and Finance', kh: 'ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ' },
            { en: 'Ministry of Post and Telecommunication', kh: 'ក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍' },
            { en: 'Clean Water in Mondulkiri Province', kh: 'ទឹកស្អាតខេត្តមណ្ឌលគិរី' },
            { en: 'Electricity of Cambodia Wat Phnom', kh: 'អគ្គិសនីកម្ពុជា វត្តភ្នំ' },
            { en: 'Al Serkal Mosque', kh: 'វិហារអ៊ីស្លាម អាល់សឺកាល់' }
        ],
        image: '/images/projects/Thumbnail-4.jpg'
    },
    {
        year: '2018-2020',
        title: { en: 'Scaling Innovation', kh: 'ការពង្រីកនវានុវត្តន៍' },
        desc: { en: 'Integration of modern systems and complex structural works:', kh: 'ការរួមបញ្ចូលនៃប្រព័ន្ធទំនើប និងការអនុវត្តរចនាសម្ព័ន្ធស្មុគស្មាញ៖' },
        projects: [
            { en: 'Anti-Corruption Unit', kh: 'អង្គភាពប្រឆាំងអំពើពុករលួយ' },
            { en: 'Siem Reap Electricity', kh: 'អគ្គិសនីខេត្តសៀមរាប' },
            { en: 'Ministry of Economy Underground Parking Lot', kh: 'ចំណតឡានក្រោមដីក្រសួងសេដ្ឋកិច្ច' },
            { en: 'General Department of National Treasury', kh: 'អគ្គនាយកដ្ឋានរតនាគារជាតិ' }
        ],
        image: '/images/projects/Thumbnail-5.jpg'
    },
    {
        year: '2021-2022',
        title: { en: 'Infrastructure Excellence', kh: 'ឧត្តមភាពហេដ្ឋារចនាសម្ព័ន្ធ' },
        desc: { en: 'Securing major national landmarks and utility hubs:', kh: 'សាងសង់ហេដ្ឋារចនាសម្ព័ន្ធសំខាន់ៗ និងមជ្ឈមណ្ឌលអគ្គិសនីជាតិ៖' },
        projects: [
            { en: 'Stung Treng Water Purification Station', kh: 'ស្ថានីយ៍ប្រព្រឹត្តិកម្មទឹកស្អាតខេត្តស្ទឹងត្រែង' },
            { en: 'General Department of Customs and Excise', kh: 'អគ្គនាយកដ្ឋានគយ និងរដ្ឋាករកម្ពុជា' },
            { en: 'Securities and Exchange Commission of Cambodia', kh: 'គណៈកម្មការមូលបត្រកម្ពុជា' },
            { en: 'Electricity of Cambodia (EDC)', kh: 'អគ្គិសនីកម្ពុជា (EDC)' }
        ],
        image: '/images/projects/Thumbnail-6.jpg'
    },
    {
        year: '2023',
        title: { en: 'Strategic Progress', kh: 'វឌ្ឍនភាពយុទ្ធសាស្ត្រ' },
        desc: { en: 'Completion of high-profile government headquarters:', kh: 'ការបញ្ចប់អគារទីស្នាក់ការកណ្តាលរបស់រដ្ឋាភិបាល៖' },
        projects: [
            { en: 'Ministry of Interior HQ', kh: 'ទីស្នាក់ការកណ្តាល ក្រសួងមហាផ្ទៃ' },
            { en: 'National Social Security Fund (NSSF)', kh: 'បេឡាជាតិរបបសន្តិសុខសង្គម (ប.ស.ស)' }
        ],
        image: '/images/projects/Thumbnail-7.jpg'
    },
    {
        year: '2024',
        title: { en: 'Future Foundations', kh: 'មូលដ្ឋានគ្រឹះអនាគត' },
        desc: { en: 'Expanding into healthcare and regulatory sectors:', kh: 'ការពង្រីកខ្លួនចូលក្នុងវិស័យថែទាំសុខភាព និងបទប្បញ្ញត្តិ៖' },
        projects: [
            { en: 'Commercial Gambling Management Commission', kh: 'គណៈកម្មការគ្រប់គ្រងល្បែងពាណិជ្ជកម្មកម្ពុជា' },
            { en: 'Chea Chumneas Hospital', kh: 'មន្ទីរពេទ្យ ជ័យជំនះ' }
        ],
        image: '/images/projects/Thumbnail-8.jpg'
    },
    {
        year: '2025',
        title: { en: 'Vision 2025', kh: 'ចក្ខុវិស័យ ២០២៥' },
        desc: { en: 'Ongoing and future flagship developments:', kh: 'ការអភិវឌ្ឍកំពុងបន្ត និងគម្រោងសំខាន់ៗនាពេលអនាគត៖' },
        projects: [
            { en: 'National Election Committee HQ', kh: 'ទីស្នាក់ការកណ្តាល គណៈកម្មាធិការជាតិរៀបចំការបោះឆ្នោត' }
        ],
        image: '/images/projects/Thumbnail-9.jpg'
    }
];
