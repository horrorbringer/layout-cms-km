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
    "mef": {
        "title": {
            "en": "Ministry of Economy and Finance (MEF)",
            "kh": "ផ្ទះញុម"
        },
        "subtitle": {
            "en": "GOVERNMENT_OFFICE",
            "kh": "GOVERNMENT_OFFICE"
        },
        "location": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "client": {
            "en": "Ministry of Economy & Finance",
            "kh": "Ministry of Economy & Finance"
        },
        "sector": {
            "en": "GOVERNMENT_OFFICE",
            "kh": "GOVERNMENT_OFFICE"
        },
        "area": "38,000 sqm",
        "year": "2022",
        "status": {
            "en": "COMPLETED",
            "kh": "COMPLETED"
        },
        "image": "/images/projects/Thumbnail-2.jpg",
        "description": {
            "background": {
                "en": "New headquarters designed to centralize financial operations with high-tech infrastructure.",
                "kh": "New headquarters designed to centralize financial operations with high-tech infrastructure."
            },
            "objectives": {
                "en": "Construct a highly functional, secure, and prestigious workspace that accommodates the growing staff of the ministry.",
                "kh": "Construct a highly functional, secure, and prestigious workspace that accommodates the growing staff of the ministry."
            },
            "concept": {
                "en": "Modernist solidity combined with traditional Khmer motifs on the facade.",
                "kh": "Modernist solidity combined with traditional Khmer motifs on the facade."
            }
        },
        "services": [
            {
                "en": "General Construction",
                "kh": "General Construction"
            },
            {
                "en": "MEP Works",
                "kh": "MEP Works"
            },
            {
                "en": "External Infrastructures",
                "kh": "External Infrastructures"
            }
        ],
        "challenges": [
            {
                "en": "Deep basement construction in high water table area.",
                "kh": "Deep basement construction in high water table area."
            },
            {
                "en": "Complex data center cooling requirements.",
                "kh": "Complex data center cooling requirements."
            }
        ],
        "gallery": [
            "/images/projects/Thumbnail-5.jpg",
            "/images/projects/Thumbnail-6.jpg",
            "/images/projects/Thumbnail-7.jpg",
            "/images/projects/Thumbnail-8.jpg"
        ]
    },
    "kt-wtp": {
        "title": {
            "en": "Khleang Toeuk Water Treatment Plant",
            "kh": "Khleang Toeuk Water Treatment Plant"
        },
        "subtitle": {
            "en": "Systems",
            "kh": "SYSTEMS"
        },
        "location": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "client": {
            "en": "Phnom Penh Water Supply Authority",
            "kh": "Phnom Penh Water Supply Authority"
        },
        "sector": {
            "en": "Systems",
            "kh": "SYSTEMS"
        },
        "area": "12 Hectares",
        "year": "2024",
        "status": {
            "en": "ONGOING",
            "kh": "ONGOING"
        },
        "image": "/images/projects/Thumbnail-1.jpg",
        "description": {
            "background": {
                "en": "Strategic infrastructure project increasing water supply capacity.",
                "kh": "Strategic infrastructure project increasing water supply capacity."
            },
            "objectives": {
                "en": "Increase production capacity by 50,000 m3/day and ensure compliance with WHO water quality standards.",
                "kh": "Increase production capacity by 50,000 m3/day and ensure compliance with WHO water quality standards."
            },
            "concept": {
                "en": "Industrial efficiency meeting sustainable hydraulic engineering.",
                "kh": "Industrial efficiency meeting sustainable hydraulic engineering."
            }
        },
        "services": [
            {
                "en": "Civil Works",
                "kh": "Civil Works"
            },
            {
                "en": "Pipe Laying",
                "kh": "Pipe Laying"
            },
            {
                "en": "Pumping Station Construction",
                "kh": "Pumping Station Construction"
            },
            {
                "en": "Reservoir Building",
                "kh": "Reservoir Building"
            }
        ],
        "challenges": [
            {
                "en": "Soft soil conditions requiring extensive piling.",
                "kh": "Soft soil conditions requiring extensive piling."
            },
            {
                "en": "Coordination with existing underground utilities.",
                "kh": "Coordination with existing underground utilities."
            }
        ],
        "gallery": [
            "/images/projects/Thumbnail-6.jpg",
            "/images/projects/Thumbnail-7.jpg",
            "/images/projects/Thumbnail-8.jpg"
        ]
    },
    "mekong-slope": {
        "title": {
            "en": "Mekong River Bank Protection",
            "kh": "Mekong River Bank Protection"
        },
        "subtitle": {
            "en": "Systems",
            "kh": "PUBLIC_SERVICE"
        },
        "location": {
            "en": "Kandal",
            "kh": "Kandal"
        },
        "client": {
            "en": "Ministry of Public Works",
            "kh": "Ministry of Public Works"
        },
        "sector": {
            "en": "Systems",
            "kh": "PUBLIC_SERVICE"
        },
        "area": "5km Length",
        "year": "2021",
        "status": {
            "en": "Completed",
            "kh": "COMPLETED"
        },
        "image": "/images/projects/Thumbnail-3.jpg",
        "description": {
            "background": {
                "en": "Geotechnical engineering project stabilizing 5km of riverbank against erosion.",
                "kh": "Geotechnical engineering project stabilizing 5km of riverbank against erosion."
            },
            "objectives": {
                "en": "Stabilize the riverbank using sustainable and durable geotechnical solutions.",
                "kh": "Stabilize the riverbank using sustainable and durable geotechnical solutions."
            },
            "concept": {
                "en": "Gabion walls combined with vegetation to prevent soil erosion naturally.",
                "kh": "Gabion walls combined with vegetation to prevent soil erosion naturally."
            }
        },
        "services": [
            {
                "en": "Geotechnical Survey",
                "kh": "Geotechnical Survey"
            },
            {
                "en": "Slope Stabilization",
                "kh": "Slope Stabilization"
            },
            {
                "en": "Gabion Installation",
                "kh": "Gabion Installation"
            }
        ],
        "challenges": [
            {
                "en": "Working against strong river currents.",
                "kh": "Working against strong river currents."
            },
            {
                "en": "Accessibility for heavy machinery on soft ground.",
                "kh": "Accessibility for heavy machinery on soft ground."
            }
        ],
        "gallery": [
            "/images/projects/Thumbnail-7.jpg",
            "/images/projects/Thumbnail-1.jpg",
            "/images/projects/Thumbnail-4.jpg"
        ]
    },
    "mpt-office": {
        "title": {
            "en": "Ministry of Post and Telecommunication",
            "kh": "ផ្ទះញុម"
        },
        "subtitle": {
            "en": "Water Treatment Plant",
            "kh": "PUBLIC_SERVICE"
        },
        "location": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "client": {
            "en": "Ministry of Post and Telecommunication",
            "kh": "Ministry of Post and Telecommunication"
        },
        "sector": {
            "en": "Water Treatment Plant",
            "kh": "PUBLIC_SERVICE"
        },
        "area": "8,950 sqm",
        "year": "2016",
        "status": {
            "en": "Under Construction",
            "kh": "ONGOING"
        },
        "image": "/images/projects/mpt-office.jpg",
        "description": {
            "background": {
                "en": "Size: 4 floors, 8,950m2. Includes advanced IT infrastructure and office spaces.",
                "kh": "Size: 4 floors, 8,950m2. Includes advanced IT infrastructure and office spaces."
            },
            "objectives": {
                "en": "To provide modern facilities equipped with generator system work, telephone, Ethernet, voice, air conditioning system, and 2 elevators.",
                "kh": "To provide modern facilities equipped with generator system work, telephone, Ethernet, voice, air conditioning system, and 2 elevators."
            },
            "concept": {
                "en": "A multi-building complex designed for administrative and technological operations.",
                "kh": "A multi-building complex designed for administrative and technological operations."
            }
        },
        "services": [
            {
                "en": "Building Construction",
                "kh": "Building Construction"
            },
            {
                "en": "IT & Networking Installation",
                "kh": "IT & Networking Installation"
            },
            {
                "en": "HVAC Systems",
                "kh": "HVAC Systems"
            }
        ],
        "challenges": [
            {
                "en": "Integrating extensive IT infrastructure.",
                "kh": "Integrating extensive IT infrastructure."
            }
        ],
        "gallery": [
            "/images/projects/mpt-office.jpg",
            "/images/projects/Thumbnail-5.jpg",
            "/images/projects/Thumbnail-6.jpg"
        ]
    },
    "edc": {
        "title": {
            "en": "Electricite du Cambodge (EDC)",
            "kh": "Electricite du Cambodge (EDC)"
        },
        "subtitle": {
            "en": "GOVERNMENT_OFFICE",
            "kh": "GOVERNMENT_OFFICE"
        },
        "location": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "client": {
            "en": "",
            "kh": ""
        },
        "sector": {
            "en": "GOVERNMENT_OFFICE",
            "kh": "GOVERNMENT_OFFICE"
        },
        "area": "",
        "year": "",
        "status": {
            "en": "COMPLETED",
            "kh": "COMPLETED"
        },
        "image": "/images/projects/Thumbnail-3.jpg",
        "description": {
            "background": {
                "en": "Modern office tower for the national electricity utility provider.",
                "kh": "Modern office tower for the national electricity utility provider."
            },
            "objectives": {
                "en": "",
                "kh": ""
            },
            "concept": {
                "en": "",
                "kh": ""
            }
        },
        "services": [],
        "challenges": [],
        "gallery": []
    },
    "acu": {
        "title": {
            "en": "Anti-Corruption Unit (ACU)",
            "kh": "Anti-Corruption Unit (ACU)"
        },
        "subtitle": {
            "en": "GOVERNMENT_OFFICE",
            "kh": "GOVERNMENT_OFFICE"
        },
        "location": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "client": {
            "en": "",
            "kh": ""
        },
        "sector": {
            "en": "GOVERNMENT_OFFICE",
            "kh": "GOVERNMENT_OFFICE"
        },
        "area": "",
        "year": "",
        "status": {
            "en": "COMPLETED",
            "kh": "COMPLETED"
        },
        "image": "/images/projects/Thumbnail-6.jpg",
        "description": {
            "background": {
                "en": "Headquarters designed with transparency and security at its core.",
                "kh": "Headquarters designed with transparency and security at its core."
            },
            "objectives": {
                "en": "",
                "kh": ""
            },
            "concept": {
                "en": "",
                "kh": ""
            }
        },
        "services": [],
        "challenges": [],
        "gallery": []
    },
    "pv-wtp": {
        "title": {
            "en": "Phum Prek Water Treatment Plant",
            "kh": "Phum Prek Water Treatment Plant"
        },
        "subtitle": {
            "en": "Water Treatment Plant",
            "kh": "Water Treatment Plant"
        },
        "location": {
            "en": "Kandal",
            "kh": "Kandal"
        },
        "client": {
            "en": "",
            "kh": ""
        },
        "sector": {
            "en": "Water Treatment Plant",
            "kh": "Water Treatment Plant"
        },
        "area": "",
        "year": "",
        "status": {
            "en": "Completed",
            "kh": "Completed"
        },
        "image": "/images/projects/Thumbnail-2.jpg",
        "description": {
            "background": {
                "en": "",
                "kh": ""
            },
            "objectives": {
                "en": "",
                "kh": ""
            },
            "concept": {
                "en": "",
                "kh": ""
            }
        },
        "services": [],
        "challenges": [],
        "gallery": []
    },
    "bvm-slope": {
        "title": {
            "en": "BVM Slope Stabilization",
            "kh": "BVM Slope Stabilization"
        },
        "subtitle": {
            "en": "Slope Construction",
            "kh": "Slope Construction"
        },
        "location": {
            "en": "Sihanoukville",
            "kh": "Sihanoukville"
        },
        "client": {
            "en": "",
            "kh": ""
        },
        "sector": {
            "en": "Slope Construction",
            "kh": "Slope Construction"
        },
        "area": "",
        "year": "",
        "status": {
            "en": "Completed",
            "kh": "Completed"
        },
        "image": "/images/projects/Thumbnail-4.jpg",
        "description": {
            "background": {
                "en": "",
                "kh": ""
            },
            "objectives": {
                "en": "",
                "kh": ""
            },
            "concept": {
                "en": "",
                "kh": ""
            }
        },
        "services": [],
        "challenges": [],
        "gallery": []
    }
};