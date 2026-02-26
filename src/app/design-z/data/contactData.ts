import { LocalizedString } from '../context/LanguageContext';

export interface ContactData {
    address: LocalizedString;
    phone: string[];
    email: string[];
    hours: LocalizedString;
    googleMapsUrl: string;
    socials: {
        facebook: string;
        linkedin: string;
        instagram: string;
    };
}

export const contactData: ContactData = {
    "address": {
        "en": "#56, Street 315, Boeng Kak 1,\nTuol Kouk, Phnom Penh, Cambodia",
        "kh": "#៥៦ ផ្លូវ ៣១៥ សង្កាត់បឹងកក់ ១\nខណ្ឌទួលគោក រាជធានីភ្នំពេញ កម្ពុជា"
    },
    "phone": [
        "+855 23 999 000"
    ],
    "email": [
        "info@kimmex.com",
        "sales@kimmex.com"
    ],
    "hours": {
        "en": "Mon - Sat, 8am - 5pm",
        "kh": "ច័ន្ទ - សៅរ៍ ម៉ោង ៨ព្រឹក - ៥ល្ងាច"
    },
    "googleMapsUrl": "https://maps.google.com/?q=KIM+MEX+Construction",
    "socials": {
        "facebook": "#",
        "linkedin": "#",
        "instagram": "#"
    }
};