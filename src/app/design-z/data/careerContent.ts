import { LocalizedString } from '../context/LanguageContext';

export interface CareerContent {
    hero: {
        tagline: LocalizedString;
        title1: LocalizedString;
        title2: LocalizedString;
        subtext: LocalizedString;
    };
    stats: {
        teamMembers: string;
        teamMembersLabel: LocalizedString;
        activeProjects: string;
        activeProjectsLabel: LocalizedString;
        awardTitle: LocalizedString;
        awardSub: LocalizedString;
    };
    whyJoin: {
        title: LocalizedString;
        subtext: LocalizedString;
        cards: Array<{
            id: string;
            title: LocalizedString;
            desc: LocalizedString;
            icon: string;
        }>;
    };
    process: {
        tagline: LocalizedString;
        title: LocalizedString;
        subtext: LocalizedString;
        steps: Array<{
            step: string;
            title: LocalizedString;
            desc: LocalizedString;
        }>;
    };
    openings: {
        title: LocalizedString;
        subtext: LocalizedString;
    };
}

export const careerContent: CareerContent = {
    "hero": {
        "tagline": {
            "en": "We are Hiring",
            "kh": "យើងកំពុងជ្រើសរើសបុគ្គលិក"
        },
        "title1": {
            "en": "BUILD YOUR",
            "kh": "សាងសង់"
        },
        "title2": {
            "en": "LEGACY",
            "kh": "មត៌កសម្បត្តិ"
        },
        "subtext": {
            "en": "Join a team of visionaries. At Kimmex, we don't just construct buildings; we shape the skyline and engineering future of Cambodia.",
            "kh": "ចូលរួមក្រុមមនុស្សមានចក្ខុវិស័យ។ នៅ Kimmex យើងមិនត្រឹមតែសាងសង់អគារ; យើងកំណត់រូបភាពអនាគតសំណង់របស់កម្ពុជា។"
        }
    },
    "stats": {
        "teamMembers": "500+",
        "teamMembersLabel": {
            "en": "Team Members",
            "kh": "សមាជិកក្រុម"
        },
        "activeProjects": "30+",
        "activeProjectsLabel": {
            "en": "Active Projects",
            "kh": "គម្រោងសកម្ម"
        },
        "awardTitle": {
            "en": "Top Employer",
            "kh": "និយោជកលំដាប់ខ្ពស់"
        },
        "awardSub": {
            "en": "Awarded 2024 - 2025",
            "kh": "ទទួលរង្វាន់ ២០២៤ - ២០២៥"
        }
    },
    "whyJoin": {
        "title": {
            "en": "Why Choose Kimmex?",
            "kh": "ហេតុអ្វីជ្រើស Kimmex?"
        },
        "subtext": {
            "en": "We offer more than a job. We offer a career that matters, a community that supports, and projects that leave a lasting legacy.",
            "kh": "យើងផ្តល់ជូនច្រើនជាងការងារ។ យើងផ្តល់ជូននូវវិជ្ជាជីវៈដែលមានន័យ សហគមន៍គាំទ្រ និងគម្រោងដែលទុកនូវមត៌កសម្បត្តិ។"
        },
        "cards": [
            {
                "id": "1",
                "title": {
                    "en": "Excellence Driven",
                    "kh": "ជំរុញឧត្តមភាព"
                },
                "desc": {
                    "en": "We set the highest standards in construction, pushing boundaries to deliver projects that outlast generations.",
                    "kh": "យើងកំណត់ស្តង់ដារខ្ពស់បំផុតក្នុងការសាងសង់ ជំរុញព្រំដែនដើម្បីផ្ដល់គម្រោងដែលរស់រានជាងជំនាន់។"
                },
                "icon": "Award"
            },
            {
                "id": "2",
                "title": {
                    "en": "Impactful Work",
                    "kh": "ការងារប៉ះពាល់ជីវិត"
                },
                "desc": {
                    "en": "Every project you work on shapes Cambodia's infrastructure — roads, hospitals, government buildings that serve millions.",
                    "kh": "គ្រប់គម្រោងដែលអ្នកធ្វើ ចូលរួមកំណត់ហេដ្ឋារចនាសម្ព័ន្ធរបស់កម្ពុជា — ផ្លូវ មន្ទីរពេទ្យ អគាររដ្ឋាភិបាលដែលបម្រើប្រជាជនរាប់លាននាក់។"
                },
                "icon": "Target"
            },
            {
                "id": "3",
                "title": {
                    "en": "Mentorship Culture",
                    "kh": "វប្បធម៌ណែនាំ"
                },
                "desc": {
                    "en": "Learn from Cambodia's top engineers and project managers. Grow faster with dedicated mentors.",
                    "kh": "រៀនពីវិស្វករ និងអ្នកគ្រប់គ្រងគម្រោងកំពូលរបស់កម្ពុជា។ រីកចម្រើនលឿនជាមួយអ្នកណែនាំ។"
                },
                "icon": "Users"
            }
        ]
    },
    "process": {
        "tagline": {
            "en": "What To Expect",
            "kh": "អ្វីដែលត្រូវរំពឹង"
        },
        "title": {
            "en": "Our Hiring Process",
            "kh": "ដំណើរការជ្រើសរើសបុគ្គលិក"
        },
        "subtext": {
            "en": "A transparent and efficient process designed to find the best fit — for both you and us.",
            "kh": "ដំណើរការតម្លាភាព និងប្រសិទ្ធភាពដែលត្រូវបានរចនាឡើងដើម្បីស្វែងរកភាពសមស្របរវាងអ្នក និងយើង។"
        },
        "steps": [
            {
                "step": "01",
                "title": {
                    "en": "Application",
                    "kh": "ពាក្យសុំ"
                },
                "desc": {
                    "en": "Submit your CV & Portfolio via our portal.",
                    "kh": "ដាក់ CV & ស្នាដៃរបស់អ្នកតាមរយៈប្រព័ន្ធរបស់យើង។"
                }
            },
            {
                "step": "02",
                "title": {
                    "en": "Screening",
                    "kh": "ការត្រងជ្រើស"
                },
                "desc": {
                    "en": "Initial call with HR to discuss fit & basics.",
                    "kh": "ការហៅទូរស័ព្ទដំបូងជាមួយ HR ដើម្បីពិភាក្សាមូលដ្ឋាន។"
                }
            },
            {
                "step": "03",
                "title": {
                    "en": "Interview",
                    "kh": "ការសម្ភាសន៍"
                },
                "desc": {
                    "en": "Deep-dive interview with the department led.",
                    "kh": "ការសម្ភាសន៍ស៊ីជម្រៅជាមួយប្រធានផ្នែក។"
                }
            },
            {
                "step": "04",
                "title": {
                    "en": "Offer",
                    "kh": "ការស្នើ"
                },
                "desc": {
                    "en": "Finalizing the details and welcoming you to the team.",
                    "kh": "បញ្ចប់លម្អិត និងស្វាគមន៍អ្នកមកកាន់ក្រុម។"
                }
            }
        ]
    },
    "openings": {
        "title": {
            "en": "Current Openings",
            "kh": "មុខតំណែងបច្ចុប្បន្ន"
        },
        "subtext": {
            "en": "Find your place among Cambodia's most impactful construction projects.",
            "kh": "ស្វែងរកទីតាំងរបស់អ្នកក្នុងចំណោមគម្រោងសំណង់ដ៏មានឥទ្ធិពលបំផុតរបស់កម្ពុជា។"
        }
    }
};