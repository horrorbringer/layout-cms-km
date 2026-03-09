import { LocalizedString } from '../context/LanguageContext';

export type NewsItem = {
    id: string;
    title: LocalizedString;
    category: string;
    date: LocalizedString;
    readTime: LocalizedString;
    image: string;
    excerpt: LocalizedString;
    featured: boolean;
    trending: boolean;
    author: LocalizedString;
    year: string;
    content?: LocalizedString;
    tags?: string[];
    gallery?: string[];
    documents?: { name: string; size: string }[];
};

export const allNews: NewsItem[] = [
    {
        "id": "1",
        "title": {
            "en": "Kimmex Awarded \"Best Commercial Project 2025\" at PropertyGuru Awards Gojo",
            "kh": "Kimmex ទទួលបានពានរង្វាន់ \"គម្រោងអចលនទ្រព្យពាណិជ្ជកម្មល្អបំផុតឆ្នាំ 2025\" នៅក្នុងកម្មវិធី PropertyGuru Awards"
        },
        "category": "Awards",
        "date": {
            "en": "Oct 15, 2025",
            "kh": "១៥ តុលា ២០២៥"
        },
        "readTime": {
            "en": "5 min read",
            "kh": "អាន ៥ នាទី"
        },
        "image": "/images/projects/Thumbnail-8.jpg",
        "excerpt": {
            "en": "We are honored to receive the prestigious Gold Award for the new Ministry of Interior complex, recognized for its architectural excellence and sustainable design.",
            "kh": "យើងពិតជាមានកិត្តិយសដែលទទួលបានពានរង្វាន់មាសដ៏មានកិត្យានុភាពសម្រាប់អគារថ្មីនៃក្រសួងមហាផ្ទៃ ដែលត្រូវបានទទួលស្គាល់នូវភាពល្អឥតខ្ចោះនៃស្ថាបត្យកម្ម និងការរចនាប្រកបដោយនិរន្តរភាពរបស់ខ្លួន។"
        },
        "featured": true,
        "trending": true,
        "author": {
            "en": "Sarah Jenkins",
            "kh": "សារ៉ា ចេនគីន (Sarah Jenkins)"
        },
        "year": "2025",
        "content": {
            "en": "<p class=\"lead\">We are thrilled to announce that Kimmex Construction has been honored with the Gold Award for \"Best Commercial Project\" at the 2025 PropertyGuru Cambodia Property Awards. This recognition celebrates our commitment to excellence in the design and construction of the new Ministry of Interior complex.</p>\n            \n            <h3>A Landmark Achievement</h3>\n            <p>The Ministry of Interior complex stands as a testament to modern engineering fused with traditional Khmer architectural elements. Spanning over 45,000 square meters, the project involved complex structural challenges and high-level security integration.</p>\n            \n            <p>Mr. Kim, CEO of Kimmex, accepted the award, stating: \"This award belongs to the hundreds of engineers, architects, and workers who dedicated their skills to this national landmark. It validates our mission to build structures that define the skyline and serve the nation.\"</p>\n\n            <h3>Sustainability & Innovation</h3>\n            <p>One of the key factors impressed the judges was the building's energy efficiency. We utilized advanced materials and a smart HVAC system that reduces energy consumption by 25% compared to standard regulations.</p>",
            "kh": "<p class=\"lead\">យើងមានសេចក្តីសោមនស្សរីករាយក្នុងការប្រកាសថា Kimmex Construction ទទួលបានពានរង្វាន់មាសសម្រាប់ \"គម្រោងអចលនទ្រព្យពាណិជ្ជកម្មល្អបំផុត\" នៅក្នុង PropertyGuru Cambodia Property Awards ឆ្នាំ 2025។ ការទទួលស្គាល់នេះគឺអបអរសាទរចំពោះការប្តេជ្ញាចិត្តរបស់យើងចំពោះភាពល្អឥតខ្ចោះក្នុងការរចនា និងសាងសង់អគារថ្មីនៃក្រសួងមហាផ្ទៃ។</p>\n            \n            <h3>សមិទ្ធផលជាប្រវត្តិសាស្ត្រ</h3>\n            <p>អគារក្រសួងមហាផ្ទៃឈរជាសក្ខីភាពបញ្ជាក់ពីវិស្វកម្មទំនើបរួមបញ្ចូលគ្នាជាមួយធាតុស្ថាបត្យកម្មខ្មែរប្រពៃណី។ គ្របដណ្តប់លើផ្ទៃដីជាង 45,000 ម៉ែត្រការ៉េ គម្រោងនេះពាក់ព័ន្ធនឹងបញ្ហាប្រឈមរចនាសម្ព័ន្ធស្មុគស្មាញ និងការធ្វើសមាហរណកម្មសន្តិសុខកម្រិតខ្ពស់។</p>\n            \n            <p>លោក Kim នាយកប្រតិបត្តិ Kimmex បានទទួលពានរង្វាន់ដោយមានប្រសាសន៍ថា៖ \"ពានរង្វាន់នេះជារបស់វិស្វករ ស្ថាបត្យករ និងកម្មកររាប់រយនាក់ដែលបានលះបង់ជំនាញរបស់ពួកគេសម្រាប់កន្លែងសម្គាល់ជាតិមួយនេះ។ វាបញ្ជាក់ពីបេសកកម្មរបស់យើងក្នុងការសាងសង់រចនាសម្ព័ន្ធដែលកំណត់ទិដ្ឋភាពទីក្រុង និងបម្រើជាតិ។\"</p>\n\n            <h3>និរន្តរភាព និងនវានុវត្តន៍</h3>\n            <p>កត្តាសំខាន់មួយដែលធ្វើឱ្យគណៈកម្មការចាប់អារម្មណ៍គឺ ប្រសិទ្ធភាពថាមពលរបស់អគារ។ យើងបានប្រើប្រាស់សម្ភារទំនើបៗ និងប្រព័ន្ធ HVAC ឆ្លាតវៃដែលអាចកាត់បន្ថយការប្រើប្រាស់ថាមពល 25% បើប្រៀបធៀបទៅនឹងបទប្បញ្ញត្តិស្តង់ដារ។</p>"
        },
        "tags": [
            "Awards",
            "Commercial",
            "Ministry of Interior",
            "Gold Winner"
        ],
        "gallery": [
            "/images/projects/Thumbnail-1.jpg",
            "/images/projects/Thumbnail-2.jpg",
            "/images/projects/Thumbnail-3.jpg"
        ],
        "documents": [
            {
                "name": "Official Press Release.pdf",
                "size": "2.4 MB"
            },
            {
                "name": "Award Ceremony Highlights.pdf",
                "size": "1.2 MB"
            }
        ]
    },
    {
        "id": "2",
        "title": {
            "en": "Breaking Ground on the New Sihanoukville Logistics Hub",
            "kh": "ការបញ្ចុះបឋមសិលាបើកការដ្ឋានមជ្ឈមណ្ឌលភស្តុភារកម្មក្រុងព្រះសីហនុថ្មី"
        },
        "category": "Updates",
        "date": {
            "en": "Sep 22, 2025",
            "kh": "២២ កញ្ញា ២០២៥"
        },
        "readTime": {
            "en": "3 min read",
            "kh": "អាន ៣ នាទី"
        },
        "image": "/images/projects/Thumbnail-1.jpg",
        "excerpt": {
            "en": "Phase 1 of the massive logistics center has officially begun. This project aims to revolutionize the supply chain infrastructure in the coastal region.",
            "kh": "ដំណាក់កាលទី១ នៃមជ្ឈមណ្ឌលភស្តុភារកម្មដ៏ធំនេះបានចាប់ផ្តើមជាផ្លូវការហើយ។ គម្រោងនេះមានគោលបំណងធ្វើបដិវត្តហេដ្ឋារចនាសម្ព័ន្ធខ្សែសង្វាក់ផ្គត់ផ្គង់នៅក្នុងតំបន់ឆ្នេរ។"
        },
        "featured": false,
        "trending": true,
        "author": {
            "en": "David Chen",
            "kh": "ដេវីត ចេន (David Chen)"
        },
        "year": "2025",
        "content": {
            "en": "<p class=\"lead\">Phase 1 of the massive logistics center has officially begun. This project aims to revolutionize the supply chain infrastructure in the coastal region and support the growing export sector.</p>\n            <h3>Strategic Importance</h3>\n            <p>Located near the autonomous port, this hub will facilitate faster processing and storage of goods. Our team has mobilized heavy machinery this week to begin the foundation work.</p>",
            "kh": "<p class=\"lead\">ដំណាក់កាលទី1 នៃមជ្ឈមណ្ឌលភស្តុភារកម្មដ៏ធំនេះបានចាប់ផ្តើមជាផ្លូវការហើយ។ គម្រោងនេះមានគោលបំណងធ្វើបដិវត្តហេដ្ឋារចនាសម្ព័ន្ធខ្សែសង្វាក់ផ្គត់ផ្គង់នៅក្នុងតំបន់ឆ្នេរ និងគាំទ្រវិស័យនាំចេញដែលកំពុងកើនឡើង។</p>\n            <h3>សារៈសំខាន់ជាយុទ្ធសាស្ត្រ</h3>\n            <p>ស្ថិតនៅជិតកំពង់ផែស្វយ័ត មជ្ឈមណ្ឌលនេះនឹងជួយសម្រួលដល់ដំណើរការលឿនជាងមុន និងការផ្ទុកទំនិញ។ ក្រុមការងាររបស់យើងបានប្រមូលផ្តុំគ្រឿងចក្រធុនធ្ងន់ក្នុងសប្តាហ៍នេះ ដើម្បីចាប់ផ្តើមការងារគ្រឹះ។</p>"
        },
        "tags": [
            "Logistics",
            "Sihanoukville",
            "Infrastructure",
            "Phase 1"
        ],
        "gallery": [
            "/images/projects/Thumbnail-4.jpg",
            "/images/projects/Thumbnail-5.jpg"
        ],
        "documents": []
    },
    {
        "id": "3",
        "title": {
            "en": "Safety First: Achieving 2 Million Man-Hours Without Lost Time Injury",
            "kh": "សុវត្ថិភាពជាចម្បង៖ សម្រេចបានចំនួន ២លានម៉ោង ដោយគ្មានគ្រោះថ្នាក់ការងារ"
        },
        "category": "Safety",
        "date": {
            "en": "Aug 05, 2025",
            "kh": "០៥ សីហា ២០២៥"
        },
        "readTime": {
            "en": "4 min read",
            "kh": "អាន ៤ នាទី"
        },
        "image": "/images/projects/Thumbnail-2.jpg",
        "excerpt": {
            "en": "A milestone achievement for our construction teams at the Calmette Hospital site, proving that safety and speed can go hand in hand.",
            "kh": "សមិទ្ធផលដ៏ដ៍សំខាន់សម្រាប់ក្រុមការងារសាងសង់របស់យើងនៅការដ្ឋានមន្ទីរពេទ្យកាល់ម៉ែត ដែលបង្ហាញថាសុវត្ថិភាព និងល្បឿនអាចដើរទន្ទឹមគ្នាបាន។"
        },
        "featured": false,
        "trending": false,
        "author": {
            "en": "HSE Dept",
            "kh": "ផ្នែក HSE"
        },
        "year": "2025"
    },
    {
        "id": "4",
        "title": {
            "en": "Introducing Our New \"Green Build\" Initiative",
            "kh": "ការណែនាំអំពីគំនិតផ្តួចផ្តើម \"សំណង់បៃតង\" ថ្មីរបស់យើង"
        },
        "category": "Sustainability",
        "date": {
            "en": "Jul 12, 2025",
            "kh": "១២ កក្កដា ២០២៥"
        },
        "readTime": {
            "en": "6 min read",
            "kh": "អាន ៦ នាទី"
        },
        "image": "/images/projects/Thumbnail-7.jpg",
        "excerpt": {
            "en": "Commiting to a sustainable future, Kimmex pledges to reduce carbon footprint by 30% across all new projects starting 2026.",
            "kh": "ការប្តេជ្ញាចិត្តចំពោះអនាគតប្រកបដោយនិរន្តរភាព Kimmex ប្តេជ្ញាកាត់បន្ថយកាបូនចំនួន ៣០% នៅទូទាំងគម្រោងថ្មីទាំងអស់ចាប់ពីឆ្នាំ២០២៦។"
        },
        "featured": false,
        "trending": false,
        "author": {
            "en": "Eco Team",
            "kh": "ក្រុមអេកូ"
        },
        "year": "2025"
    },
    {
        "id": "5",
        "title": {
            "en": "Annual Staff Retreat 2025: Building Bonds",
            "kh": "ដំណើរកម្សាន្តបុគ្គលិកប្រចាំឆ្នាំ ២០២៥៖ ការកសាងទំនាក់ទំនង"
        },
        "category": "Culture",
        "date": {
            "en": "Jun 20, 2025",
            "kh": "២០ មិថុនា ២០២៥"
        },
        "readTime": {
            "en": "8 min read",
            "kh": "អាន ៨ នាទី"
        },
        "image": "/images/projects/Thumbnail-5.jpg",
        "excerpt": {
            "en": "Our team gathered in Siem Reap for a weekend of team building, strategy planning, and celebrating our shared successes.",
            "kh": "ក្រុមការងាររបស់យើងបានជួបជុំគ្នានៅខេត្តសៀមរាបសម្រាប់ថ្ងៃចុងសប្តាហ៍ ដើម្បីកសាងទំនាក់ទំនង រៀបចំផែនការយុទ្ធសាស្ត្រ និងអបអរសាទរភាពជោគជ័យរួមរបស់យើង។"
        },
        "featured": false,
        "trending": false,
        "author": {
            "en": "HR Dept",
            "kh": "ផ្នែកធនធានមនុស្ស"
        },
        "year": "2025"
    },
    {
        "id": "6",
        "title": {
            "en": "Kimmex Partners with RUPP for Internship Program",
            "kh": "Kimmex ចាប់ដៃគូជាមួយសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ សម្រាប់កម្មវិធីកម្មសិក្សា"
        },
        "category": "Community",
        "date": {
            "en": "May 30, 2025",
            "kh": "៣០ ឧសភា ២០២៥"
        },
        "readTime": {
            "en": "2 min read",
            "kh": "អាន ២ នាទី"
        },
        "image": "/images/projects/Thumbnail-6.jpg",
        "excerpt": {
            "en": "Fostering the next generation of engineers, we are proud to announce a signed MoU with the Royal University of Phnom Penh.",
            "kh": "ដើម្បីជំរុញអ្នកជំនាន់ក្រោយនៃវិស្វករ យើងមានមោទនភាពក្នុងការប្រកាសការចុះហត្ថលេខាលើ MOU ជាមួយសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ។"
        },
        "featured": false,
        "trending": true,
        "author": {
            "en": "University Rel.",
            "kh": "ផ្នែកទំនាក់ទំនងសាកលវិទ្យាល័យ"
        },
        "year": "2025"
    },
    {
        "id": "7",
        "title": {
            "en": "Innovative Steel Structures: A New Era",
            "kh": "រចនាសម្ព័ន្ធដែកបែបនវានុវត្តន៍៖ យុគសម័យថ្មីវិស័យសំណង់"
        },
        "category": "Innovation",
        "date": {
            "en": "Apr 10, 2025",
            "kh": "១០ មេសា ២០២៥"
        },
        "readTime": {
            "en": "5 min read",
            "kh": "អាន ៥ នាទី"
        },
        "image": "/images/projects/Thumbnail-3.jpg",
        "excerpt": {
            "en": "Exploring the latest in steel fabrication technology and how it speeds up delivery times.",
            "kh": "ស្វែងយល់ពីបច្ចេកវិទ្យាផលិតដែកចុងក្រោយបង្អស់ និងរបៀបដែលវាជួយពន្លឿនពេលវេលាសាងសង់។"
        },
        "featured": false,
        "trending": false,
        "author": {
            "en": "Engineering",
            "kh": "ក្រុមការងារវិស្វកម្ម"
        },
        "year": "2025"
    },
    {
        "id": "8",
        "title": {
            "en": "Advanced MEP Systems Integration in High-Rise Buildings",
            "kh": "ការរួមបញ្ចូលប្រព័ន្ធ MEP កម្រិតយន្តបច្ចេកវិទ្យាក្នុងអគារខ្ពស់ៗ"
        },
        "category": "Systems",
        "date": {
            "en": "Mar 15, 2025",
            "kh": "១៥ មីនា ២០២៥"
        },
        "readTime": {
            "en": "7 min read",
            "kh": "អាន ៧ នាទី"
        },
        "image": "/images/projects/Thumbnail-4.jpg",
        "excerpt": {
            "en": "How we are implementing smart mechanical, electrical, and plumbing systems to improve building efficiency and sustainability.",
            "kh": "របៀបដែលយើងកំពុងអនុវត្តប្រព័ន្ធមេកានិច អគ្គិសនី និងប្រព័ន្ធទឹកឆ្លាតវៃ ដើម្បីកែលម្អប្រសិទ្ធភាព និងនិរន្តរភាពអគារ។"
        },
        "featured": false,
        "trending": false,
        "author": {
            "en": "Technical Team",
            "kh": "ក្រុមការងារបច្ចេកទេស"
        },
        "year": "2025"
    }
];