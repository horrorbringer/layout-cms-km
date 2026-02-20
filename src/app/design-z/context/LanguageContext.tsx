'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Siemreap } from 'next/font/google';

// Configure Khmer Font
const khmerFont = Siemreap({
    weight: '400',
    subsets: ['khmer'],
    display: 'swap',
    variable: '--font-siemreap',
});

type Language = 'en' | 'kh';

type Translations = {
    [key: string]: {
        en: string;
        kh: string;
    };
};

// Dictionary
const dictionary: Translations = {
    // Nav Items
    'About Us': { en: 'About Us', kh: 'អំពីយើង' },
    'Company Profile': { en: 'Company Profile', kh: 'ប្រវត្តិក្រុមហ៊ុន' },
    'Leadership': { en: 'Leadership', kh: 'ថ្នាក់ដឹកនាំ' },
    'Quality & Safety': { en: 'Quality & Safety', kh: 'គុណភាព & សុវត្ថិភាព' },
    'Services': { en: 'Services', kh: 'សេវាកម្ម' },
    'Design & Build': { en: 'Design & Build', kh: 'រចនា & សាងសង់' },
    'Building Renovation': { en: 'Construction', kh: 'សំណង់អគារ' },
    'Project Management': { en: 'Project Management', kh: 'គ្រប់គ្រងគម្រោង' },
    'Projects': { en: 'Projects', kh: 'គម្រោង' },
    'Done Projects': { en: 'Completed Projects', kh: 'គម្រោងបានបញ្ចប់' },
    'Implement Projects': { en: 'Project In Progress', kh: 'គម្រោងកំពុងអនុវត្ត' },
    'Government': { en: 'Government', kh: 'រដ្ឋាភិបាល' },
    'Public Service': { en: 'Public Service', kh: 'សេវាសាធារណៈ' },
    'Private': { en: 'Private Service', kh: 'សេវាឯកជន' },
    'Water Treatment': { en: 'Water Treatment', kh: 'ស្ថានីយ៍ប្រព្រឹត្តកម្មទឹក' },
    'Slope': { en: 'Slope', kh: 'ការសាងសង់ជម្រាល' },
    'Systems': { en: 'Systems', kh: 'ប្រព័ន្ធបច្ចេកទេស' },
    'News': { en: 'News', kh: 'ព័ត៌មាន' },
    'News & Updates': { en: 'News & Updates', kh: 'ព័ត៌មាន & បច្ចុប្បន្នភាព' },
    'Doc Collection': { en: 'Doc Collection', kh: 'ឯកសារ' },
    'Careers': { en: 'Careers', kh: 'ការងារ' },
    'Contact': { en: 'Contact', kh: 'ទំនាក់ទំនង' },

    // UI Elements
    'Get Quote': { en: 'Get Quote', kh: 'ស្នើសុំតម្លៃ' },
    'Get a Free Quote': { en: 'Get a Free Quote', kh: 'ស្នើសុំតម្លៃឥតគិតថ្លៃ' },
    'Search...': { en: 'Search...', kh: 'ស្វែងរក...' },
    'Phnom Penh, Cambodia': { en: 'Phnom Penh, Cambodia', kh: 'ភ្នំពេញ, កម្ពុជា' },
    'Construction & Investment': { en: 'Construction & Investment', kh: 'សំណង់ & វិនិយោគ' },
    'Quick Links': { en: 'Quick Links', kh: 'តំណរហ័ស' },
    'Categories': { en: 'Categories', kh: 'ប្រភេទ' },
    'View Projects': { en: 'View Projects', kh: 'មើលគម្រោង' },
    'Contact Us': { en: 'Contact Us', kh: 'ទាក់ទងយើង' },

    // Sub-menu descriptions (Optional: translate these or keep simple)
    'Learn about our history': { en: 'Learn about our history', kh: 'ស្វែងយល់អំពីប្រវត្តិរបស់យើង' },
    'Meet our team': { en: 'Meet our team', kh: 'ជួបជាមួយក្រុមការងារ' },
    'Our standards': { en: 'Our standards', kh: 'ស្តង់ដាររបស់យើង' },
    'Full lifecycle solutions': { en: 'Full lifecycle solutions', kh: 'ដំណោះស្រាយពេញលេញ' },
    'Revitalize existing structures': { en: 'Expert building & construction', kh: 'ការសាងសង់អគារដោយអ្នកជំនាញ' },
    'Oversight & control': { en: 'Strategic oversight & control', kh: 'ការត្រួតពិនិត្យយុទ្ធសាស្ត្រ & ការគ្រប់គ្រង' },
    'View our portfolio': { en: 'View our portfolio', kh: 'មើលស្នាដៃរបស់យើង' },
    'Current developments': { en: 'Current developments', kh: 'ការអភិវឌ្ឍន៍បច្ចុប្បន្ន' },
    'Latest announcements': { en: 'Latest announcements', kh: 'សេចក្តីប្រកាសចុងក្រោយ' },
    'Resources & documents': { en: 'Resources & documents', kh: 'ធនធាន & ឯកសារ' },

    // Footer
    'Explore': { en: 'Explore', kh: 'រុករក' },
    'Capabilities': { en: 'Capabilities', kh: 'សមត្ថភាព' },
    'News & Insights': { en: 'News & Insights', kh: 'ព័ត៌មាន & ចំណេះដឹង' },
    'General Construction': { en: 'General Construction', kh: 'សំណង់ទូទៅ' },
    'MEP Engineering': { en: 'MEP Engineering', kh: 'វិស្វកម្ម MEP' },
    'Steel Structure': { en: 'Steel Structure', kh: 'រចនាសម្ព័ន្ធដែក' },
    'Renovation': { en: 'Renovation', kh: 'ការកែលម្អ' },
    'Privacy Policy': { en: 'Privacy Policy', kh: 'គោលការណ៍ឯកជនភាព' },
    'Terms of Service': { en: 'Terms of Service', kh: 'លក្ខខណ្ឌប្រើប្រាស់' },
    'All rights reserved': { en: 'All rights reserved', kh: 'រក្សាសិទ្ធិគ្រប់យ៉ាង' },
    'Footer Desc': {
        en: 'Engineering the future of Cambodia since 1999. Delivering excellence in high-rise, infrastructure, and industrial construction with unwavering commitment to quality and safety.',
        kh: 'កសាងអនាគតរបស់កម្ពុជាតាំងពីឆ្នាំ ១៩៩៩។ ផ្តល់ជូននូវឧត្តមភាពក្នុងការសាងសង់អគារខ្ពស់ ហេដ្ឋារចនាសម្ព័ន្ធ និងឧស្សាហកម្ម ដោយមានការប្តេជ្ញាចិត្តខ្ពស់ចំពោះគុណភាព និងសុវត្ថិភាព។'
    },
    'All Stories': { en: 'All Stories', kh: 'រឿងរ៉ាវទាំងអស់' },
    'Year': { en: 'Year', kh: 'ឆ្នាំ' },
    'All': { en: 'All', kh: 'ទាំងអស់' },
    'Read Story': { en: 'Read Story', kh: 'អានបន្ត' },
    'Featured Story': { en: 'Featured Story', kh: 'រឿងរ៉ាវលេចធ្លោ' },
    'Clear Filter': { en: 'Clear Filter', kh: 'សម្អាតការចម្រាញ់' },
    'By': { en: 'By', kh: 'ដោយ' },
    'Email Address': { en: 'Email Address', kh: 'អាសយដ្ឋានអ៊ីមែល' },
    'Subscribe Now': { en: 'Subscribe Now', kh: 'ចុះឈ្មោះឥឡូវនេះ' },
    'INSIGHTS & UPDATES': { en: 'INSIGHTS & UPDATES', kh: 'ចំណេះដឹង & បច្ចុប្បន្នភាព' },
    'NEWSROOM': { en: 'NEWSROOM', kh: 'បន្ទប់ព័ត៌មាន' },
    'Newsroom Subtitle': {
        en: 'Your central hub for the latest construction announcements, project milestones, and industry insights from Kimmex.',
        kh: 'មជ្ឈមណ្ឌលសម្រាប់សេចក្តីប្រកាសសំណង់ចុងក្រោយបំផុត សមិទ្ធផលគម្រោង និងចំណេះដឹងឧស្សាហកម្មពី Kimmex។'
    },
    'Innovation': { en: 'Innovation', kh: 'នវានុវត្តន៍' },
    'Safety': { en: 'Safety', kh: 'សុវត្ថិភាព' },
    'Sustainability': { en: 'Sustainability', kh: 'និរន្តរភាព' },
    'Culture': { en: 'Culture', kh: 'វប្បធម៌' },
    'Project Updates': { en: 'Project Updates', kh: 'បច្ចុប្បន្នភាពគម្រោង' },
    'Awards': { en: 'Awards', kh: 'ពានរង្វាន់' },
    'Trending': { en: 'Trending', kh: 'ពេញនិយម' },
    'View All Trends': { en: 'View All Trends', kh: 'មើលនិន្នាការទាំងអស់' },
    'Topics': { en: 'Topics', kh: 'ប្រធានបទ' },
    'All Years': { en: 'All Years', kh: 'ឆ្នាំទាំងអស់' }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    fontClassName: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        // Remove trailing/leading spaces for lookup
        const lookupKey = key.trim();
        // Return translation or original key if not found
        return dictionary[lookupKey]?.[language] || key;
    };

    const fontClassName = language === 'kh' ? khmerFont.className : 'font-sans';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, fontClassName }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
