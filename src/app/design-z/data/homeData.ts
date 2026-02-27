import { LocalizedString } from '../context/LanguageContext';

export interface HomeData {
    hero: {
        title: LocalizedString;
        subtitle: LocalizedString;
    };
    stats: {
        label: LocalizedString;
        val: LocalizedString;
        iconName: string;
    }[];
    process: {
        id: string;
        step: string;
        title: LocalizedString;
        desc: LocalizedString;
        iconName: string;
    }[];
    testimonials: {
        id: string;
        quote: LocalizedString;
        author: LocalizedString;
        role: LocalizedString;
        rating: number;
    }[];
}

export const homeData: HomeData = {
    "hero": {
        "title": {
            "en": "Building Excellence Since 1955",
            "kh": "ការកសាងឧត្តមភាពចាប់តាំងពីឆ្នាំ ១៩៩៩"
        },
        "subtitle": {
            "en": "With over 25 years of experience, we have established ourselves as Cambodia's most trusted partner.",
            "kh": "ជាមួយនឹងបទពិសោធន៍ជាង ២៥ ឆ្នាំ យើងបានបង្កើតខ្លួនយើងជាដៃគូដែលគួរឱ្យទុកចិត្តបំផុតរបស់កម្ពុជា។"
        }
    },
    "stats": [
        {
            "label": {
                "en": "Safety First",
                "kh": "សុវត្ថិភាពជាចម្បង"
            },
            "val": {
                "en": "Zero accident policy",
                "kh": "គោលនយោបាយគ្រោះថ្នាក់សូន្យ"
            },
            "iconName": "ShieldCheck"
        },
        {
            "label": {
                "en": "ISO Certified",
                "kh": "វិញ្ញាបនបត្រ ISO"
            },
            "val": {
                "en": "9001:2015 standards",
                "kh": "ស្តង់ដារ ៩០០១:២០១៥"
            },
            "iconName": "Award"
        },
        {
            "label": {
                "en": "On-Time Delivery",
                "kh": "ការប្រគល់ជូនទាន់ពេល"
            },
            "val": {
                "en": "98% completion rate",
                "kh": "អត្រាបញ្ចប់ ៩៨%"
            },
            "iconName": "Clock"
        },
        {
            "label": {
                "en": "Quality Focus",
                "kh": "ផ្តោតលើគុណភាព"
            },
            "val": {
                "en": "Exceeding expectations",
                "kh": "លើសពីការរំពឹងទុក"
            },
            "iconName": "Target"
        }
    ],
    "process": [
        {
            "id": "1",
            "step": "01",
            "title": {
                "en": "Consultation",
                "kh": "ការពិគ្រោះយោបល់"
            },
            "desc": {
                "en": "Understanding your vision and project requirements.",
                "kh": "ការយល់ដឹងពីចក្ខុវិស័យ និងតម្រូវការគម្រោងរបស់អ្នក។"
            },
            "iconName": "Target"
        },
        {
            "id": "2",
            "step": "02",
            "title": {
                "en": "Planning",
                "kh": "ការរៀបចំផែនការ"
            },
            "desc": {
                "en": "Detailed blueprints and strategic project mapping.",
                "kh": "ប្លង់លម្អិត និងការរៀបចំផែនទីគម្រោងយុទ្ធសាស្ត្រ។"
            },
            "iconName": "PenTool"
        },
        {
            "id": "3",
            "step": "03",
            "title": {
                "en": "Construction",
                "kh": "ការសាងសង់"
            },
            "desc": {
                "en": "Expert execution with high-quality standards.",
                "kh": "ការអនុវត្តដោយអ្នកជំនាញដែលមានស្តង់ដារគុណភាពខ្ពស់។"
            },
            "iconName": "Hammer"
        },
        {
            "id": "4",
            "step": "04",
            "title": {
                "en": "Handover",
                "kh": "ការប្រគល់ជូន"
            },
            "desc": {
                "en": "Final quality inspection and project completion.",
                "kh": "ការត្រួតពិនិត្យគុណភាពចុងក្រោយ និងការបញ្ចប់គម្រោង។"
            },
            "iconName": "Trophy"
        }
    ],
    "testimonials": [
        {
            "id": "t1",
            "quote": {
                "en": "Kimmex delivered our project on time and exceeded our quality expectations. Their professionalism is unmatched.",
                "kh": "Kimmex បានប្រគល់គម្រោងរបស់យើងទាន់ពេលវេលា និងលើសពីការរំពឹងទុករបស់យើង។ វិជ្ជាជីវៈរបស់ពួកគេគឺមិនអាចប្រៀបផ្ទឹមបានទេ។"
            },
            "author": {
                "en": "H.E. Minister of Economy",
                "kh": "ឯកឧត្តម រដ្ឋមន្ត្រីក្រសួងសេដ្ឋកិច្ច"
            },
            "role": {
                "en": "Government Client",
                "kh": "ស្ថាប័នរដ្ឋាភិបាល"
            },
            "rating": 5
        },
        {
            "id": "t2",
            "quote": {
                "en": "Working with Kimmex was a seamless experience. They understood our vision and brought it to life perfectly.",
                "kh": "ការធ្វើការជាមួយ Kimmex គឺជាបទពិសោធន៍ដ៏រលូនមួយ។ ពួកគេយល់ពីចក្ខុវិស័យរបស់យើង និងធ្វើអោយវាក្លាយជាការពិត។"
            },
            "author": {
                "en": "Mr. Chen Wei",
                "kh": "លោក Chen Wei"
            },
            "role": {
                "en": "CEO, Vattanac Group",
                "kh": "អគ្គនាយកសម្ព័ន្ធ វឌ្ឍនៈ"
            },
            "rating": 5
        },
        {
            "id": "t3",
            "quote": {
                "en": "The attention to safety and quality standards sets Kimmex apart from other contractors in Cambodia.",
                "kh": "ការយកចិត្តទុកដាក់លើស្តង់ដារសុវត្ថិភាព និងគុណភាព ធ្វើឲ្យ Kimmex មានភាពលេចធ្លោជាងក្រុមហ៊ុនម៉ៅការដទៃនៅក្នុងប្រទេសកម្ពុជា។"
            },
            "author": {
                "en": "Dr. Sarah Johnson",
                "kh": "បណ្ឌិត Sarah Johnson"
            },
            "role": {
                "en": "World Bank Representative",
                "kh": "តំណាងធនាគារពិភពលោក"
            },
            "rating": 5
        }
    ]
};