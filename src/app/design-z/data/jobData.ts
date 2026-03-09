import { LocalizedString } from '../context/LanguageContext';

export interface Job {
    id: string;
    title: LocalizedString;
    dept: string;
    loc: LocalizedString;
    type: LocalizedString;
    tags: LocalizedString[];
    salary: LocalizedString;
    experience: LocalizedString;
    postedDate: LocalizedString;
    summary: LocalizedString;
    responsibilities: LocalizedString[];
    requirements: LocalizedString[];
    benefits: LocalizedString[];
}

export const jobData: Job[] = [
    {
        "id": "general-application",
        "title": {
            "en": "General Application",
            "kh": "General Application"
        },
        "loc": {
            "en": "Any",
            "kh": "Any"
        },
        "type": {
            "en": "Full-time",
            "kh": "Full-time"
        },
        "postedDate": {
            "en": "3/6/2026",
            "kh": "3/6/2026"
        },
        "dept": "Operations",
        "summary": {
            "en": null,
            "kh": null
        },
        "salary": {
            "en": "Negotiable",
            "kh": "Negotiable"
        },
        "experience": {
            "en": "2-3 Years",
            "kh": "2-3 Years"
        },
        "responsibilities": [],
        "requirements": [],
        "benefits": []
    },
    {
        "id": "1",
        "title": {
            "en": "Senior Civil Engineer",
            "kh": "Senior Civil Engineer"
        },
        "loc": {
            "en": "Phnom Penh",
            "kh": "Phnom Penh"
        },
        "type": {
            "en": "Full-time",
            "kh": "Full-time"
        },
        "postedDate": {
            "en": "3/6/2026",
            "kh": "3/6/2026"
        },
        "dept": "Engineering",
        "summary": {
            "en": "We are seeking a highly experienced Senior Civil Engineer to lead complex structural projects. You will be responsible for overseeing design integrity, ensuring compliance with international standards, and mentoring junior engineers.",
            "kh": "We are seeking a highly experienced Senior Civil Engineer to lead complex structural projects. You will be responsible for overseeing design integrity, ensuring compliance with international standards, and mentoring junior engineers."
        },
        "salary": {
            "en": "Negotiable",
            "kh": "Negotiable"
        },
        "experience": {
            "en": "2-3 Years",
            "kh": "2-3 Years"
        },
        "tags": [
            {
                "en": "Engineering",
                "kh": "វិស្វកម្ម"
            }
        ],
        "responsibilities": [],
        "requirements": [],
        "benefits": []
    },
    {
        "id": "1772693723748",
        "title": {
            "en": "Operation Assistant",
            "kh": "Operation Assistant"
        },
        "loc": {
            "en": "Tamork",
            "kh": "Tamork"
        },
        "type": {
            "en": "Full-time",
            "kh": "Full-time"
        },
        "postedDate": {
            "en": "3/6/2026",
            "kh": "3/6/2026"
        },
        "dept": "Operations",
        "summary": {
            "en": "",
            "kh": ""
        },
        "salary": {
            "en": "Negotiable",
            "kh": "Negotiable"
        },
        "experience": {
            "en": "2-3 Years",
            "kh": "2-3 Years"
        },
        "tags": [
            {
                "en": "Operations",
                "kh": "ប្រតិបត្តិការ"
            }
        ],
        "responsibilities": [],
        "requirements": [],
        "benefits": []
    }
];