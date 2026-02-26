import { LocalizedString } from '../context/LanguageContext';

export interface AboutValue {
    id: string;
    title: string | LocalizedString;
    content: string | LocalizedString;
}

export interface AboutData {
    story: string | LocalizedString;
    values: AboutValue[];
}

export const aboutData: AboutData = {
    story: {
        en: "With over 25 years of experience, we have established ourselves as Cambodia's most trusted construction partner, delivering projects that stand the test of time and elevate communities.",
        kh: "ជាមួយនឹងបទពិសោធន៍ជាង ២៥ ឆ្នាំ យើងបានបង្កើតខ្លួនយើងជាដៃគូសាងសង់ដែលគួរឱ្យទុកចិត្តបំផុតនៅកម្ពុជា ដែលផ្តល់នូវគម្រោងដែលដើរតួជាការសាកល្បងនៃពេលវេលា និងលើកកម្ពស់សហគមន៍។"
    },
    values: [
        { id: 'v1', title: { en: 'Our Vision', kh: 'ចក្ខុវិស័យរបស់យើង' }, content: { en: 'To be the most trusted and innovative construction partner in Cambodia.', kh: 'ដើម្បីក្លាយជាដៃគូសាងសង់ដែលគួរឱ្យទុកចិត្ត និងប្រកបដោយភាពច្នៃប្រឌិតបំផុតនៅកម្ពុជា។' } },
        { id: 'v2', title: { en: 'Our Mission', kh: 'បេសកកម្មរបស់យើង' }, content: { en: 'To bridge the gap between concept and reality through exceptional engineering and safety.', kh: 'បញ្ចប់គម្លាតរវាងគំនិត និងភាពពិតប្រាកដតាមរយៈវិស្វកម្ម និងសុវត្ថិភាពដ៏ល្អឥតខ្ចោះ។' } },
        { id: 'v3', title: { en: 'Our Goal', kh: 'គោលដៅរបស់យើង' }, content: { en: 'To complete every project on time and within budget with zero-accident safety.', kh: 'ដើម្បីបញ្ចប់រាល់គម្រោងទាន់ពេលវេលា និងក្នុងថវិកាដោយសុវត្ថិភាពគ្មានគ្រោះថ្នាក់។' } }
    ]
};
