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
    {
        "id": "mef",
        "title": {
            "en": "Ministry of Economy and Finance (MEF)",
            "kh": "ផ្ទះញុម"
        },
        "location": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "type": {
            "en": "GOVERNMENT_OFFICE",
            "kh": "GOVERNMENT_OFFICE"
        },
        "status": {
            "en": "COMPLETED",
            "kh": "COMPLETED"
        },
        "image": "/images/projects/Thumbnail-2.jpg",
        "summary": {
            "en": "New headquarters designed to centralize financial operations with high-tech infrastructure.",
            "kh": "New headquarters designed to centralize financial operations with high-tech infrastructure."
        }
    },
    {
        "id": "edc",
        "title": {
            "en": "Electricite du Cambodge (EDC)",
            "kh": "Electricite du Cambodge (EDC)"
        },
        "location": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "type": {
            "en": "GOVERNMENT_OFFICE",
            "kh": "GOVERNMENT_OFFICE"
        },
        "status": {
            "en": "COMPLETED",
            "kh": "COMPLETED"
        },
        "image": "/images/projects/Thumbnail-3.jpg",
        "summary": {
            "en": "Modern office tower for the national electricity utility provider.",
            "kh": "Modern office tower for the national electricity utility provider."
        }
    },
    {
        "id": "acu",
        "title": {
            "en": "Anti-Corruption Unit (ACU)",
            "kh": "Anti-Corruption Unit (ACU)"
        },
        "location": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "type": {
            "en": "GOVERNMENT_OFFICE",
            "kh": "GOVERNMENT_OFFICE"
        },
        "status": {
            "en": "COMPLETED",
            "kh": "COMPLETED"
        },
        "image": "/images/projects/Thumbnail-6.jpg",
        "summary": {
            "en": "Headquarters designed with transparency and security at its core.",
            "kh": "Headquarters designed with transparency and security at its core."
        }
    },
    {
        "id": "kt-wtp",
        "title": {
            "en": "Khleang Toeuk Water Treatment Plant",
            "kh": "Khleang Toeuk Water Treatment Plant"
        },
        "location": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "type": {
            "en": "Systems",
            "kh": "SYSTEMS"
        },
        "status": {
            "en": "ONGOING",
            "kh": "ONGOING"
        },
        "image": "/images/projects/Thumbnail-1.jpg",
        "summary": {
            "en": "Strategic infrastructure project increasing water supply capacity.",
            "kh": "Strategic infrastructure project increasing water supply capacity."
        }
    },
    {
        "id": "pv-wtp",
        "title": {
            "en": "Phum Prek Water Treatment Plant",
            "kh": "Phum Prek Water Treatment Plant"
        },
        "location": {
            "en": "Kandal",
            "kh": "Kandal"
        },
        "type": {
            "en": "Water Treatment Plant",
            "kh": "Water Treatment Plant"
        },
        "status": {
            "en": "Completed",
            "kh": "Completed"
        },
        "image": "/images/projects/Thumbnail-2.jpg",
        "summary": {
            "en": "Ensuring clean water access for the growing provincial population.",
            "kh": "Ensuring clean water access for the growing provincial population."
        }
    },
    {
        "id": "mekong-slope",
        "title": {
            "en": "Mekong River Bank Protection",
            "kh": "Mekong River Bank Protection"
        },
        "location": {
            "en": "Kandal",
            "kh": "Kandal"
        },
        "type": {
            "en": "Systems",
            "kh": "PUBLIC_SERVICE"
        },
        "status": {
            "en": "Completed",
            "kh": "COMPLETED"
        },
        "image": "/images/projects/Thumbnail-3.jpg",
        "summary": {
            "en": "Geotechnical engineering project stabilizing 5km of riverbank against erosion.",
            "kh": "Geotechnical engineering project stabilizing 5km of riverbank against erosion."
        }
    },
    {
        "id": "bvm-slope",
        "title": {
            "en": "BVM Slope Stabilization",
            "kh": "BVM Slope Stabilization"
        },
        "location": {
            "en": "Sihanoukville",
            "kh": "Sihanoukville"
        },
        "type": {
            "en": "Slope Construction",
            "kh": "Slope Construction"
        },
        "status": {
            "en": "Completed",
            "kh": "Completed"
        },
        "image": "/images/projects/Thumbnail-4.jpg",
        "summary": {
            "en": "Advanced soil reinforcement for hillside development safety.",
            "kh": "Advanced soil reinforcement for hillside development safety."
        }
    },
    {
        "id": "mpt-office",
        "title": {
            "en": "Ministry of Post and Telecommunication",
            "kh": "ផ្ទះញុម"
        },
        "location": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "type": {
            "en": "Water Treatment Plant",
            "kh": "PUBLIC_SERVICE"
        },
        "status": {
            "en": "Under Construction",
            "kh": "ONGOING"
        },
        "image": "/images/projects/mpt-office.jpg",
        "summary": {
            "en": "Size: 4 floors, 8,950m2. Includes advanced IT infrastructure and office spaces.",
            "kh": "Size: 4 floors, 8,950m2. Includes advanced IT infrastructure and office spaces."
        }
    }
];