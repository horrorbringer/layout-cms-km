import { LocalizedString } from '../context/LanguageContext';

export interface HomeData {
    hero: {
        title: LocalizedString;
        subtitle: LocalizedString;
    };
    stats: {
        label: LocalizedString;
        value: LocalizedString;
        iconName: string;
    }[];
    process: {
        id: string;
        step: string;
        title: LocalizedString;
        desc: LocalizedString;
        iconName?: string;
    }[];
    testimonials: {
        id: string;
        quote: LocalizedString;
        author: LocalizedString;
        role: LocalizedString;
        rating?: number;
    }[];
}

export const homeData: HomeData = {
    "hero": {
        "title": {
            "en": "Building Excellence Since 1998",
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
                "en": "Years Experience",
                "kh": "ឆ្នាំនៃបទពិសោធន៍"
            },
            "value": {
                "en": "25",
                "kh": "២៥"
            },
            "iconName": "Trophy"
        },
        {
            "label": {
                "en": "Projects Completed",
                "kh": "គម្រោងដែលបានបញ្ចប់"
            },
            "value": {
                "en": "150",
                "kh": "១៥០"
            },
            "iconName": "ShieldCheck"
        },
        {
            "label": {
                "en": "Ongoing Projects",
                "kh": "គម្រោងកំពុងសាងសង់"
            },
            "value": {
                "en": "12",
                "kh": "១២"
            },
            "iconName": "Hammer"
        },
        {
            "label": {
                "en": "Professional Team",
                "kh": "ក្រុមការងារជំនាញ"
            },
            "value": {
                "en": "500",
                "kh": "៥០០"
            },
            "iconName": "Users"
        }
    ],
    "process": [
        {
            "id": "1",
            "step": "01",
            "title": {
                "en": "Consultion",
                "kh": "ការពិគ្រោះយោបល់"
            },
            "desc": {
                "en": "Understanding your vision and project requirements.",
                "kh": "ការយល់ដឹងពីចក្ខុវិស័យ និងតម្រូវការគម្រោងរបស់អ្នក។"
            }
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
            }
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
            }
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
            }
        }
    ],
    "testimonials": [
        {
            "id": "t1",
            "author": {
                "en": "H.E. Minister of Economy",
                "kh": "ឯកឧត្តម រដ្ឋមន្ត្រីក្រសួងសេដ្ឋកិច្ច"
            },
            "quote": {
                "en": "Kimmex delivered our project on time and exceeded our quality expectations. Their professionalism is unmatched.",
                "kh": "Kimmex បានប្រគល់គម្រោងរបស់យើងទាន់ពេលវេលា និងលើសពីការរំពឹងទុករបស់យើង។ វិជ្ជាជីវៈរបស់ពួកគេគឺមិនអាចប្រៀបផ្ទឹមបានទេ។"
            },
            "role": {
                "en": "Government Client",
                "kh": "ស្ថាប័នរដ្ឋាភិបាល"
            }
        },
        {
            "id": "t2",
            "author": {
                "en": "Mr. Chen Wei",
                "kh": "លោក Chen Wei"
            },
            "quote": {
                "en": "Working with Kimmex was a seamless experience. They understood our vision and brought it to life perfectly.",
                "kh": "ការធ្វើការជាមួយ Kimmex គឺជាបទពិសោធន៍ដ៏រលូនមួយ។ ពួកគេយល់ពីចក្ខុវិស័យរបស់យើង និងធ្វើអោយវាក្លាយជាការពិត។"
            },
            "role": {
                "en": "CEO, Vattanac Group",
                "kh": "អគ្គនាយកសម្ព័ន្ធ វឌ្ឍនៈ"
            }
        },
        {
            "id": "t3",
            "author": {
                "en": "Dr. Sarah Johnson",
                "kh": "បណ្ឌិត Sarah Johnson"
            },
            "quote": {
                "en": "The attention to safety and quality standards sets Kimmex apart from other contractors in Cambodia.",
                "kh": "ការយកចិត្តទុកដាក់លើស្តង់ដារសុវត្ថិភាព និងគុណភាព ធ្វើឲ្យ Kimmex មានភាពលេចធ្លោជាងក្រុមហ៊ុនម៉ៅការដទៃនៅក្នុងប្រទេសកម្ពុជា។"
            },
            "role": {
                "en": "World Bank Representative",
                "kh": "តំណាងធនាគារពិភពលោក"
            }
        }
    ]
};