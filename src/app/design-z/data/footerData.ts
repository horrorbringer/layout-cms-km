import { LocalizedString } from '../context/LanguageContext';

export interface FooterData {
    description: LocalizedString;
    social: {
        facebook: string;
        linkedin: string;
        youtube: string;
        instagram: string;
    };
    contact: {
        addressLine1: LocalizedString;
        addressLocation: LocalizedString;
        mapLink: string;
        phone: string;
        email: string;
    };
    copyrightYear: string;
}

export const footerData: FooterData = {
    "description": {
        "en": "KIM MEX CONSTRUCTION & INVESTMENT CO., LTD is Cambodia's premier partner for large-scale construction, civil engineering, and infrastructure projects, bringing vision to reality since 1999.",
        "kh": "ក្រុមហ៊ុន គីម ម៉ិច ខនស្ត្រាក់សិន & អ៊ិនវេសមិន ឯ.ក ជាដៃគូអនុវត្តគម្រោងសំណង់ខ្នាតធំ វិស្វកម្មស៊ីវិល និងហេដ្ឋារចនាសម្ព័ន្ធឈានមុខគេនៅកម្ពុជា ចាប់តាំងពីឆ្នាំ ១៩៩៩។"
    },
    "social": {
        "facebook": "https://www.facebook.com/kimmex168/?locale=km_KH",
        "linkedin": "https://linkedin.com/company/kimmex",
        "youtube": "https://youtube.com/@kimmex",
        "instagram": "https://instagram.com/kimmex"
    },
    "contact": {
        "addressLine1": {
            "en": "#123 Monivong Blvd, Boeung Keng Kang 1,",
            "kh": "អគារលេខ១២៣ មហាវិថីព្រះមុនីវង្ស បឹងកេងកងទី១,"
        },
        "addressLocation": {
            "en": "Phnom Penh, Cambodia",
            "kh": "រាជធានីភ្នំពេញ កម្ពុជា"
        },
        "mapLink": "https://maps.google.com/?q=KIMMEX+MONIVONG",
        "phone": "+855 23 999 888",
        "email": "info@kimmex.com.kh"
    },
    "copyrightYear": "2024"
};