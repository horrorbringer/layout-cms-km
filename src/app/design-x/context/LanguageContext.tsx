'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Siemreap, Koulen, Battambang } from 'next/font/google';
import { configData } from '../../design-z/data/configData';

// Configure Khmer Fonts
const siemreap = Siemreap({
    weight: '400',
    subsets: ['khmer'],
    display: 'swap',
});

const koulen = Koulen({
    weight: '400',
    subsets: ['khmer'],
    display: 'swap',
});

const battambang = Battambang({
    weight: '400',
    subsets: ['khmer'],
    display: 'swap',
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
    'Construction': { en: 'Construction', kh: 'ការសាងសង់' },
    'Project Management': { en: 'Project Management', kh: 'គ្រប់គ្រងគម្រោង' },
    'Consultants': { en: 'Consultants', kh: 'ប្រឹក្សាយោបល់' },
    'Projects': { en: 'Projects', kh: 'គម្រោង' },
    'Done Projects': { en: 'Done Projects', kh: 'គម្រោងបានបញ្ចប់' },
    'Implement Projects': { en: 'Implement Projects', kh: 'គម្រោងកំពុងអនុវត្ត' },
    'Government': { en: 'Government', kh: 'រដ្ឋាភិបាល' },
    'Public Service': { en: 'Public Service', kh: 'សេវាសាធារណៈ' },
    'Private': { en: 'Private', kh: 'ឯកជន' },
    'Water Treatment': { en: 'Water Treatment', kh: 'ស្ថានីយ៍ប្រព្រឹត្តកម្មទឹក' },
    'Slope': { en: 'Slope', kh: 'ការសាងសង់ជម្រាល' },
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
    'Phnom Penh': { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
    'Cinematic': { en: 'Cinematic', kh: 'ភាពយន្ត' },
    'Gallery': { en: 'Gallery', kh: 'វិចិត្រសាល' },
    'Construction & Investment': { en: 'Construction & Investment', kh: 'សំណង់ & វិនិយោគ' },
    'Construction Site': { en: 'Construction Site', kh: 'ការដ្ឋានសាងសង់' },
    'Team Meeting': { en: 'Team Meeting', kh: 'កិច្ចប្រជុំក្រុមការងារ' },
    'Architecture': { en: 'Architecture', kh: 'ស្ថាបត្យកម្ម' },
    'Quick Links': { en: 'Quick Links', kh: 'តំណរហ័ស' },
    'Categories': { en: 'Categories', kh: 'ប្រភេទ' },
    'View Projects': { en: 'View Projects', kh: 'មើលគម្រោង' },
    'Contact Us': { en: 'Contact Us', kh: 'ទាក់ទងយើង' },
    'Get Free Quote': { en: 'Get Free Quote', kh: 'ស្នើសុំតម្លៃឥតគិតថ្លៃ' },
    'Corporate': { en: 'Corporate', kh: 'សាជីវកម្ម' },
    'Environment': { en: 'Environment', kh: 'បរិស្ថាន' },
    'CSR': { en: 'CSR', kh: 'ទំនួលខុសត្រូវសង្គម' },
    'View All News': { en: 'View All News', kh: 'មើលព័ត៌មានទាំងអស់' },

    // Sub-menu descriptions (Optional: translate these or keep simple)
    'Learn about our history': { en: 'Learn about our history', kh: 'ស្វែងយល់អំពីប្រវត្តិរបស់យើង' },
    'Meet our team': { en: 'Meet our team', kh: 'ជួបជាមួយក្រុមការងារ' },
    'Our standards': { en: 'Our standards', kh: 'ស្តង់ដាររបស់យើង' },
    'Full lifecycle solutions': { en: 'Full lifecycle solutions', kh: 'ដំណោះស្រាយពេញលេញ' },
    'Building the backbone': { en: 'Building the backbone of communities', kh: 'ការសាងសង់ឆ្អឹងខ្នងនៃសហគមន៍' },
    'Strategic oversight & control': { en: 'Strategic oversight & control', kh: 'ការត្រួតពិនិត្យ និងគ្រប់គ្រងយុទ្ធសាស្ត្រ' },
    'Revitalize existing structures': { en: 'Revitalize existing structures', kh: 'កែលម្អអគារដែលមានស្រាប់' },
    'Conceptual Design': { en: 'Conceptual Design', kh: 'រចនាបថគំរូ' },
    'Structural Engineering': { en: 'Structural Engineering', kh: 'វិស្វកម្មគ្រឿងបង្គុំ' },
    'Interior Design': { en: 'Interior Design', kh: 'តុបតែងខាងក្នុង' },
    'Public Works': { en: 'Public Works', kh: 'ការដ្ឋានសាធារណៈ' },
    'Cost Control': { en: 'Cost Control', kh: 'ការគ្រប់គ្រងតម្លៃ' },
    'Quality Assurance': { en: 'Quality Assurance', kh: 'ការធានាគុណភាព' },
    'Safety Compliance': { en: 'Safety Compliance', kh: 'ការអនុលោមតាមសុវត្ថិភាព' },
    'Oversight & control': { en: 'Oversight & control', kh: 'ការត្រួតពិនិត្យ & គ្រប់គ្រង' },
    'Expert advisory services': { en: 'Expert advisory services', kh: 'សេវាកម្មប្រឹក្សាយោបល់' },
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
    'Privacy Policy': { en: 'Privacy Policy', kh: 'គោលការណ៍ឯកជនភាព' },
    'Terms of Service': { en: 'Terms of Service', kh: 'លក្ខខណ្ឌប្រើប្រាស់' },
    'All rights reserved': { en: 'All rights reserved', kh: 'រក្សាសិទ្ធិគ្រប់យ៉ាង' },
    'Footer Desc': {
        en: 'Engineering the future of Cambodia since 1999. Delivering excellence in high-rise, infrastructure, and industrial construction with unwavering commitment to quality and safety.',
        kh: 'កសាងអនាគតរបស់កម្ពុជាតាំងពីឆ្នាំ ១៩៩៩។ ផ្តល់ជូននូវឧត្តមភាពក្នុងការសាងសង់អគារខ្ពស់ ហេដ្ឋារចនាសម្ព័ន្ធ និងឧស្សាហកម្ម ដោយមានការប្តេជ្ញាចិត្តខ្ពស់ចំពោះគុណភាព និងសុវត្ថិភាព។'
    },

    // === HOME PAGE ===
    'Why Choose Kimmex': { en: 'Why Choose Kimmex', kh: 'ហេតុអ្វីជ្រើសរើស Kimmex' },
    'Experience & Excellence': { en: 'Experience & Excellence', kh: 'បទពិសោធន៍ & ឧត្តមភាព' },
    'Building Excellence Since': { en: 'Building Excellence Since', kh: 'ការកសាងឧត្តមភាពតាំងពីឆ្នាំ' },
    'Industry Leadership': { en: '25+ Years of Industry Leadership', kh: 'ភាពដឹកនាំក្នុងឧស្សាហកម្មជាង ២៥ឆ្នាំ' },
    'Experience Desc': { en: "With over 25 years of experience, we have established ourselves as Cambodia's most trusted construction partner, delivering projects that stand the test of time.", kh: 'ជាមួយនឹងបទពិសោធន៍ជាង ២៥ឆ្នាំ យើងបានបង្កើតខ្លួនយើងជាដៃគូសាងសង់ដែលគួរឱ្យទុកចិត្តបំផុតរបស់កម្ពុជា ដោយផ្តល់ជូននូវគម្រោងដែលស្ថិតស្ថេរតាមពេលវេលា។' },
    'Safety First': { en: 'Safety First', kh: 'សុវត្ថិភាពជាចំបង' },
    'Zero accident policy': { en: 'Zero accident policy', kh: 'គោលនយោបាយគ្រោះថ្នាក់សូន្យ' },
    'ISO Certified': { en: 'ISO Certified', kh: 'វិញ្ញាបនប័ត្រ ISO' },
    '9001:2015 standards': { en: '9001:2015 standards', kh: 'ស្តង់ដារ ៩០០១:២០១៥' },
    'On-Time Delivery': { en: 'On-Time Delivery', kh: 'ការប្រគល់ជូនទាន់ពេល' },
    '98% completion rate': { en: '98% completion rate', kh: 'អត្រាបញ្ចប់ ៩៨%' },
    'Quality Focus': { en: 'Quality Focus', kh: 'ផ្ដោតលើគុណភាព' },
    'Exceeding expectations': { en: 'Exceeding expectations', kh: 'លើសពីការរំពឹងទុក' },
    'Learn More About Us': { en: 'Learn More About Us', kh: 'ស្វែងយល់បន្ថែមអំពីយើង' },
    'Years of Excellence': { en: 'Years of Excellence', kh: 'ឆ្នាំនៃឧត្តមភាព' },
    'Our Services': { en: 'Our Services', kh: 'សេវាកម្មរបស់យើង' },
    'Comprehensive Construction Solutions': { en: 'Comprehensive Construction Solutions', kh: 'ដំណោះស្រាយសំណង់គ្រប់ជ្រុងជ្រោយ' },
    'From design to completion': { en: 'From design to completion, we offer end-to-end construction services tailored to your needs.', kh: 'ពីការរចនារហូតដល់ការបញ្ចប់ យើងផ្តល់ជូននូវសេវាកម្មសាងសង់ពេញលេញដែលតម្រូវតាមតម្រូវការរបស់អ្នក។' },
    'Our Process': { en: 'Our Process', kh: 'ដំណើរការរបស់យើង' },
    'How We Work': { en: 'How We Work', kh: 'របៀបដែលយើងធ្វើការ' },
    'A streamlined approach': { en: 'A streamlined approach ensuring quality, efficiency, and transparency at every stage.', kh: 'វិធីសាស្រ្តសម្របសម្រួលដែលធានានូវគុណភាព ប្រសិទ្ធភាព និងតម្លាភាពនៅគ្រប់ដំណាក់កាល។' },
    'Consultation': { en: 'Consultation', kh: 'ការពិគ្រោះយោបល់' },
    'Consultation Desc': { en: 'Understanding your vision and requirements', kh: 'ស្វែងយល់ពីចក្ខុវិស័យ និងតម្រូវការរបស់អ្នក' },
    'Planning': { en: 'Planning', kh: 'ការរៀបចំផែនការ' },
    'Planning Desc': { en: 'Detailed blueprints and project timeline', kh: 'ប្លង់លម្អិត និងកាលវិភាគគម្រោង' },
    'Construction Desc': { en: 'Expert execution with safety first', kh: 'ការអនុវត្តដោយអ្នកជំនាញជាមួយសុវត្ថិភាពជាចំបង' },
    'Handover': { en: 'Handover', kh: 'ការប្រគល់ជូន' },
    'Handover Desc': { en: 'Quality inspection and delivery', kh: 'ការត្រួតពិនិត្យគុណភាព និងការប្រគល់ជូន' },
    'Our Portfolio': { en: 'Our Portfolio', kh: 'ស្នាដៃរបស់យើង' },
    'Featured Projects': { en: 'Featured Projects', kh: 'គម្រោងលេចធ្លោ' },
    'View All Projects': { en: 'View All Projects', kh: 'មើលគម្រោងទាំងអស់' },
    'Testimonials': { en: 'Testimonials', kh: 'មតិអតិថិជន' },
    'What Our Clients Say': { en: 'What Our Clients Say', kh: 'អ្វីដែលអតិថិជនរបស់យើងនិយាយ' },
    'Home Testimonials Desc': { en: 'Trusted by government ministries, international organizations, and leading corporations.', kh: 'ទទួលបានការទុកចិត្តពីក្រសួងរដ្ឋាភិបាល អង្គការអន្តរជាតិ និងក្រុមហ៊ុនឈានមុខនានា។' },
    'Latest Insights': { en: 'Latest Insights', kh: 'ការយល់ដឹងចុងក្រោយបំផុត' },
    'Read Story': { en: 'Read Story', kh: 'អានរឿង' },
    'Read More': { en: 'Read More', kh: 'អានបន្ថែម' },
    'Ready to Start Your Project?': { en: 'Ready to Start Your Project?', kh: 'ត្រៀមខ្លួនរួចរាល់ក្នុងការចាប់ផ្តើមគម្រោងរបស់អ្នកហើយឬនៅ?' },
    'Home CTA Desc': { en: "Contact us today for a free consultation and let's build something extraordinary together.", kh: 'ទាក់ទងមកយើងថ្ងៃនេះសម្រាប់ការពិគ្រោះយោបល់ឥតគិតថ្លៃ ហើយមករួមគ្នាបង្កើតអ្វីដែលអស្ចារ្យ។' },
    'Our Partners': { en: 'Our Partners', kh: 'ដៃគូរបស់យើង' },
    'Trusted By Leading Institutions': { en: 'Trusted By Leading Institutions', kh: 'ទុកចិត្តដោយស្ថាប័នឈានមុខ' },
    'View All Services': { en: 'View All Services', kh: 'មើលសេវាកម្មទាំងអស់' },
    'Call Now': { en: 'Call Now', kh: 'ហៅឥឡូវនេះ' },
    'Partners': { en: 'Partners', kh: 'ដៃគូសហការ' },
    'Years Trust': { en: 'Years Trust', kh: 'ឆ្នាំនៃការទុកចិត្ត' },
    'Renovation': { en: 'Renovation', kh: 'ការកែលម្អឡើងវិញ' },
    'Revitalizing structures': { en: 'Revitalizing existing structures to meet modern standards.', kh: 'ការធ្វើឱ្យរចនាសម្ព័ន្ធដែលមានស្រាប់រស់ឡើងវិញ ដើម្បីឆ្លើយតបនឹងស្តង់ដារទំនើប។' },
    'Structural Strengthening': { en: 'Structural Strengthening', kh: 'ការពង្រឹងរចនាសម្ព័ន្ធ' },
    'Facade Upgrades': { en: 'Facade Upgrades', kh: 'ការកែលម្អរូបរាងខាងក្រៅ' },
    'MEP Retrofitting': { en: 'MEP Retrofitting', kh: 'ការបំពាក់ប្រព័ន្ធ MEP ឡើងវិញ' },
    'Ministry of Economy': { en: 'Ministry of Economy', kh: 'ក្រសួងសេដ្ឋកិច្ច' },
    'Vattanac Capital Extension': { en: 'Vattanac Capital Extension', kh: 'វឌ្ឍនៈ កាពីតាល់ (គម្រោងពង្រីក)' },
    'Khleang Toeuk WTP': { en: 'Khleang Toeuk WTP', kh: 'រោងចក្រទឹកស្អាតឃ្លាំងតឹក' },
    'Government Client': { en: 'Government Client', kh: 'អតិថិជនរដ្ឋបាល' },
    'Building': { en: 'Building', kh: 'ការសាងសង់' },
    'YOUR VISION': { en: 'YOUR VISION', kh: 'ចក្ខុវិស័យរបស់អ្នក' },
    'Rating': { en: 'Rating', kh: 'ចំណាត់ថ្នាក់' },
    'ISO': { en: 'ISO', kh: 'អាយអេសអូ' },
    'Team': { en: 'Team', kh: 'ក្រុមការងារ' },
    'Years': { en: 'Years', kh: 'ឆ្នាំ' },
    'Kimmex Awarded New Government Contract': { en: 'Kimmex Awarded New Government Contract', kh: 'Kimmex ទទួលបានកិច្ចសន្យារដ្ឋាភិបាលថ្មី' },
    'Sustainability Goals 2030 Achieved Early': { en: 'Sustainability Goals 2030 Achieved Early', kh: 'គោលដៅនិរន្តរភាពឆ្នាំ ២០៣០ សម្រេចបានមុនកាលកំណត់' },
    'Annual Charity Gala for Education': { en: 'Annual Charity Gala for Education', kh: 'កម្មវិធីសប្បុរសធម៌ប្រចាំឆ្នាំសម្រាប់ការអប់រំ' },
    'Since 1999': { en: 'Since 1999', kh: 'តាំងពីឆ្នាំ ១៩៩៩' },
    'Our Projects': { en: 'Our Projects', kh: 'គម្រោងរបស់យើង' },
    'Slide 1 Desc': { en: 'A landmark of modern governance and architectural excellence.', kh: 'ជានិមិត្តរូបនៃអភិបាលកិច្ចទំនើប និងឧត្តមភាពស្ថាបត្យកម្ម។' },
    'Slide 2 Desc': { en: 'Pushing the boundaries of vertical design and engineering.', kh: 'ការជំរុញព្រំដែននៃការរចនាបញ្ឈរ និងវិស្វកម្ម។' },
    'Slide 3 Desc': { en: 'Building the gateway to global trade with robust infrastructure.', kh: 'ការកសាងច្រកទ្វារទៅកាន់ពាណិជ្ជកម្មពិភពលោកជាមួយនឹងហេដ្ឋារចនាសម្ព័ន្ធដ៏រឹងមាំ។' },
    'View Project': { en: 'View Project', kh: 'មើលគម្រោង' },
    'Scroll': { en: 'Scroll', kh: 'រំកិលចុះ' },
    'Commercial': { en: 'Commercial', kh: 'ពាណិជ្ជកម្ម' },
    'Industrial': { en: 'Industrial', kh: 'ឧស្សាហកម្ម' },
    'Infrastructure': { en: 'Infrastructure', kh: 'ហេដ្ឋារចនាសម្ព័ន្ធ' },
    'Management': { en: 'Management', kh: 'ការគ្រប់គ្រង' },
    'Strategic Oversight': { en: 'Strategic Oversight', kh: 'ការត្រួតពិនិត្យយុទ្ធសាស្ត្រ' },
    'High-rise & Office': { en: 'High-rise & Office', kh: 'អាគារខ្ពស់ៗ និងការិយាល័យ' },
    'Factory & Warehouse': { en: 'Factory & Warehouse', kh: 'រោងចក្រ និងឃ្លាំង' },
    'Roads & Bridges': { en: 'Roads & Bridges', kh: 'ផ្លូវ និងស្ពាន' },
    'Est. 1999': { en: 'Est. 1999', kh: 'បោះបង្គោលតាំងពីឆ្នាំ ១៩៩៩' },
    "CAMBODIA'S FUTURE": { en: "CAMBODIA'S FUTURE", kh: 'អនាគតរបស់កម្ពុជា' },
    'Years Experience': { en: 'Years Experience', kh: 'ឆ្នាំនៃបទពិសោធន៍' },
    'Projects Completed': { en: 'Projects Completed', kh: 'គម្រោងដែលបានបញ្ចប់' },
    'Team Members': { en: 'Team Members', kh: 'សមាជិកក្រុម' },
    'Client Satisfaction': { en: 'Client Satisfaction', kh: 'ការពេញចិត្តរបស់អតិថិជន' },
    'Who We Are': { en: 'Who We Are', kh: 'តើពួកយើងជានរណា' },
    "Cambodia's Premier": { en: "Cambodia's Premier", kh: 'ក្រុមហ៊ុនឈានមុខគេរបស់កម្ពុជា' },
    'Construction Partner': { en: 'Construction Partner', kh: 'ដៃគូសាងសង់' },
    'Our Mission': { en: 'Our Mission', kh: 'បេសកកម្មរបស់យើង' },
    'Our Vision': { en: 'Our Vision', kh: 'ចក្ខុវិស័យរបស់យើង' },
    'Our Goal': { en: 'Our Goal', kh: 'គោលដៅរបស់យើង' },
    'Integrity': { en: 'Integrity', kh: 'ភាពស្មោះត្រង់' },
    'Excellence': { en: 'Excellence', kh: 'ឧត្តមភាព' },
    'Partnership': { en: 'Partnership', kh: 'ភាពជាដៃគូ' },
    'Innovation': { en: 'Innovation', kh: 'នវានុវត្តន៍' },
    'Growth': { en: 'Growth', kh: 'ការរីកចម្រើន' },
    'Organization Structure': { en: 'Organization Structure', kh: 'រចនាសម្ព័ន្ធអង្គការ' },
    'Message From CEO': { en: 'Message From CEO', kh: 'សារពីអគ្គនាយក' },
    'Okhna. TOUCH KIM': { en: 'Okhna. TOUCH KIM', kh: 'ឧកញ៉ា ទូច គឹម' },
    'Chief Executive Officer': { en: 'Chief Executive Officer', kh: 'អគ្គនាយក' },
    'Company Milestones': { en: 'Company Milestones', kh: 'សមិទ្ធផលសំខាន់ៗរបស់ក្រុមហ៊ុន' },
    'Our Journey': { en: 'Our Journey', kh: 'ដំណើររបស់យើង' },
    'Foundation': { en: 'Foundation', kh: 'ការបង្កើត' },
    'First Major Project': { en: 'First Major Project', kh: 'គម្រោងធំដំបូង' },
    'Major Expansion': { en: 'Major Expansion', kh: 'ការពង្រីកខ្លួនដ៏ធំ' },
    'ISO Certification': { en: 'ISO Certification', kh: 'វិញ្ញាបនប័ត្រ ISO' },
    'National Recognition': { en: 'National Recognition', kh: 'ការទទួលស្គាល់ថ្នាក់ជាតិ' },
    'Our Standards': { en: 'Our Standards', kh: 'ស្តង់ដាររបស់យើង' },
    'Quality & Safety First': { en: 'Quality & Safety First', kh: 'គុណភាព និងសុវត្ថិភាពជាចំបង' },
    'Zero Accidents': { en: 'Zero Accidents', kh: 'គ្រោះថ្នាក់សូន្យ' },
    '100% Compliance': { en: '100% Compliance', kh: 'ការអនុលោមតាម ១០០%' },
    'Quality Management Certified': { en: 'Quality Management Certified', kh: 'ទទួលបានវិញ្ញាបនប័ត្រគ្រប់គ្រងគុណភាព' },
    'Safety record policy': { en: 'Safety record policy', kh: 'គោលនយោបាយកំណត់ត្រាសុវត្ថិភាព' },
    'Building code adherence': { en: 'Building code adherence', kh: 'ការគោរពតាមក្រមសីលធម៌អាគារ' },
    '9001:2015 Certified': { en: '9001:2015 Certified', kh: 'ទទួលបានវិញ្ញាបនប័ត្រ ៩០០១:២០១៥' },
    'About Hero Desc': {
        en: "For over 25 years, KIM MEX Construction has been at the forefront of Cambodia's infrastructure development, transforming visions into landmarks.",
        kh: 'អស់រយៈពេលជាង ២៥ ឆ្នាំមកនេះ ក្រុមហ៊ុនសំណង់ គីម ម៉ិច បានស្ថិតនៅជួរមុខនៃការអភិវឌ្ឍន៍ហេដ្ឋារចនាសម្ព័ន្ធរបស់កម្ពុជា ដោយបំប្លែងចក្ខុវិស័យទៅជាស្នាដៃដ៏អស្ចារ្យ។'
    },
    'Who We Are Desc': {
        en: "Since 1999, KIM MEX Construction has been a cornerstone of Cambodia's infrastructure development. We are more than builders; we are partners in national progress, dedicated to delivering excellence in every beam, brick, and blueprint.",
        kh: 'ចាប់តាំងពីឆ្នាំ ១៩៩៩ មក ក្រុមហ៊ុនសំណង់ គីម ម៉ិច បានក្លាយជាជ្រុងដ៏សំខាន់នៃការអភិវឌ្ឍន៍ហេដ្ឋារចនាសម្ព័ន្ធរបស់កម្ពុជា។ យើងលើសពីអ្នកសាងសង់ យើងជាដៃគូក្នុងវឌ្ឍនភាពជាតិ ដែលប្តេជ្ញាផ្តល់នូវឧត្តមភាពក្នុងគ្រប់ធ្នឹម ឥដ្ឋ និងប្លង់រចនា។'
    },
    'CEO Quote Desc': {
        en: "At KIM MEX, we believe that construction is not just about concrete and steel, but about building current and future dreams. Our commitment to integrity and quality has been the cornerstone of our success for over 20 years. We look forward to continuing to build the foundations of Cambodia's growth.",
        kh: 'នៅ គីម ម៉ិច យើងជឿជាក់ថាការសាងសង់មិនមែនគ្រាន់តែនិយាយអំពីបេតុង និងដែកប៉ុណ្ណោះទេ ប៉ុន្តែគឺអំពីការកសាងក្តីសុបិនបច្ចុប្បន្ន និងអនាគត។ ការប្តេជ្ញាចិត្តរបស់យើងចំពោះភាពស្មោះត្រង់ និងគុណភាពគឺជាមូលដ្ឋានគ្រឹះនៃភាពជោគជ័យរបស់យើងអស់រយៈពេលជាង ២០ ឆ្នាំមកហើយ។ យើងទន្ទឹងរង់ចាំបន្តកសាងមូលដ្ឋានគ្រឹះនៃកំណើនរបស់កម្ពុជា។'
    },
    'QA/QC Desc': {
        en: "We implement rigorous Quality Assurance (QA) and Quality Control (QC) protocols on every site. Our safety record is a testament to our commitment to our workforce and our clients.",
        kh: 'យើងអនុវត្តពិធីសារធានាគុណភាព (QA) និងការត្រួតពិនិត្យគុណភាព (QC) យ៉ាងតឹងរ៉ឹងនៅគ្រប់ការដ្ឋាន។ កំណត់ត្រាសុវត្ថិភាពរបស់យើងគឺជាសក្ខីភាពបញ្ជាក់ពីការប្តេជ្ញាចិត្តរបស់យើងចំពោះកម្លាំងពលកម្ម និងអតិថិជនរបស់យើង។'
    },
    'CTA Desc': {
        en: "Partner with Cambodia's most trusted construction company for your next project.",
        kh: 'ចាប់ដៃគូជាមួយក្រុមហ៊ុនសំណង់ដែលគួរឱ្យទុកចិត្តបំផុតរបស់កម្ពុជាសម្រាប់គម្រោងបន្ទាប់របស់អ្នក។'
    },
    'Ready to Build Together?': { en: 'Ready to Build Together?', kh: 'តើអ្នកត្រៀមខ្លួនរួចរាល់ក្នុងការសាងសង់ជាមួយគ្នាហើយឬនៅ?' },
    'We uphold the highest ethical standards in every project and relationship.': { en: 'We uphold the highest ethical standards in every project and relationship.', kh: 'យើងប្រកាន់ខ្ជាប់នូវស្តង់ដារសីលធម៌ខ្ពស់បំផុតក្នុងគ្រប់គម្រោង និងទំនាក់ទំនងទាំងអស់។' },
    'We strive for perfection in every beam, brick, and blueprint we deliver.': { en: 'We strive for perfection in every beam, brick, and blueprint we deliver.', kh: 'យើងខិតខំដើម្បីភាពល្អឥតខ្ចោះក្នុងគ្រប់ធ្នឹម ឥដ្ឋ និងប្លង់ដែលយើងផ្តល់ជូន។' },
    'We build lasting relationships with clients, partners, and communities.': { en: 'We build lasting relationships with clients, partners, and communities.', kh: 'យើងបង្កើតទំនាក់ទំនងយូរអង្វែងជាមួយអតិថិជន ដៃគូ និងសហគមន៍។' },
    'We embrace new technologies and methods to deliver better solutions.': { en: 'We embrace new technologies and methods to deliver better solutions.', kh: 'យើងទទួលយកបច្ចេកវិទ្យា និងវិធីសាស្រ្តថ្មីៗដើម្បីផ្តល់នូវដំណោះស្រាយកាន់តែប្រសើរ។' },
    'We prioritize the wellbeing of our team and everyone on our sites.': { en: 'We prioritize the wellbeing of our team and everyone on our sites.', kh: 'យើងផ្តល់អាទិភាពដល់សុខុមាលភាពរបស់ក្រុមការងារ និងអ្នករាល់គ្នានៅក្នុងការដ្ឋានរបស់យើង។' },
    'We continuously improve and invest in our people and capabilities.': { en: 'We continuously improve and invest in our people and capabilities.', kh: 'យើងកែលម្អជាប្រចាំ និងវិនិយោគលើធនធានមនុស្ស និងសមត្ថភាពរបស់យើង។' },
    'KIM MEX Construction was established with a vision to redefine Cambodia\'s skyline. Starting with a humble team of 10 engineers, we laid the first stone of our legacy.': { en: 'KIM MEX Construction was established with a vision to redefine Cambodia\'s skyline. Starting with a humble team of 10 engineers, we laid the first stone of our legacy.', kh: 'ក្រុមហ៊ុនសំណង់ គីម ម៉ិច ត្រូវបានបង្កើតឡើងជាមួយនឹងចក្ខុវិស័យក្នុងការកំណត់រូបរាងមេឃរបស់កម្ពុជាឡើងវិញ។ ដោយចាប់ផ្តើមជាមួយក្រុមវិស្វករចំនួន ១០ នាក់ យើងបានចាក់គ្រឹះដំបូងនៃកេរដំណែលរបស់យើង។' },
    'Completed our first government infrastructure project, establishing our reputation for quality and reliability in the public sector.': { en: 'Completed our first government infrastructure project, establishing our reputation for quality and reliability in the public sector.', kh: 'បានបញ្ចប់គម្រោងហេដ្ឋារចនាសម្ព័ន្ធរដ្ឋាភិបាលដំបូងបង្អស់របស់យើង ដែលបង្កើតកេរ្តិ៍ឈ្មោះរបស់យើងសម្រាប់គុណភាព និងភាពជឿជាក់ក្នុងវិស័យសាធារណៈ។' },
    'Following successful commercial projects in Phnom Penh, we expanded operations to Siem Reap and Sihanoukville, securing contracts for major hotel resorts.': { en: 'Following successful commercial projects in Phnom Penh, we expanded operations to Siem Reap and Sihanoukville, securing contracts for major hotel resorts.', kh: 'បន្ទាប់ពីទទួលបានជោគជ័យលើគម្រោងពាណិជ្ជកម្មក្នុងរាជធានីភ្នំពេញ យើងបានពង្រីកប្រតិបត្តិការទៅកាន់ខេត្តសៀមរាប និងខេត្តព្រះសីហនុ ដោយទទួលបានកិច្ចសន្យាសម្រាប់រមណីយដ្ឋានសណ្ឋាគារធំៗ។' },
    'Our commitment to excellence was recognized with ISO 9001:2015 accreditation, validating our rigorous Quality Management Systems and safety protocols.': { en: 'Our commitment to excellence was recognized with ISO 9001:2015 accreditation, validating our rigorous Quality Management Systems and safety protocols.', kh: 'ការប្តេជ្ញាចិត្តរបស់យើងចំពោះឧត្តមភាពត្រូវបានទទួលស្គាល់តាមរយៈការទទួលស្គាល់ ISO 9001:2015 ដែលបញ្ជាក់ពីប្រព័ន្ធគ្រប់គ្រងគុណភាពដ៏តឹងរ៉ឹង និងពិធីសារសុវត្ថិភាពរបស់យើង។' },
    'Awarded "Top Infrastructure Partner" by the Ministry of Public Works for our contribution to national road development projects.': { en: 'Awarded "Top Infrastructure Partner" by the Ministry of Public Works for our contribution to national road development projects.', kh: 'ទទួលបានពានរង្វាន់ "ដៃគូហេដ្ឋារចនាសម្ព័ន្ធឆ្នើម" ពីក្រសួងសាធារណការ និងដឹកជញ្ជូន សម្រាប់ការរួមចំណែកក្នុងគម្រោងអភិវឌ្ឍន៍ផ្លូវជាតិ។' },
    'What Drives Us': { en: 'What Drives Us', kh: 'អ្វីដែលជំរុញទឹកចិត្តយើង' },
    'Our Core Values': { en: 'Our Core Values', kh: 'គុណតម្លៃស្នូលរបស់យើង' },
    'Mr. PAUCH BUNPHEAKDEY': { en: 'Mr. PAUCH BUNPHEAKDEY', kh: 'លោក ពៅ ប៊ុនភក្តី' },
    'Mr. LENG VANNARITH': { en: 'Mr. LENG VANNARITH', kh: 'លោក ឡេង វណ្ណារិទ្ធ' },
    'Mr. OUNG CHAKNORA': { en: 'Mr. OUNG CHAKNORA', kh: 'លោក អ៊ុង ច័ន្ទណូរ៉ា' },
    'Mr. SUM ROTANA': { en: 'Mr. SUM ROTANA', kh: 'លោក ស៊ុម រតនា' },
    'Mr. KRAI KEAK': { en: 'Mr. KRAI KEAK', kh: 'លោក ក្រៃ កាយ' },
    'Mr. CHHUNDY RYTA': { en: 'Mr. CHHUNDY RYTA', kh: 'លោក ឈុនឌី រីតា' },
    'Mr. TOUCH PUTHEANY': { en: 'Mr. TOUCH PUTHEANY', kh: 'លោក ទូច ពុទ្ធានី' },
    'Mr. RY KEN': { en: 'Mr. RY KEN', kh: 'លោក រី ខេន' },
    'Mr. HONG BUNNA': { en: 'Mr. HONG BUNNA', kh: 'លោក ហុង ប៊ុនណា' },
    'Deputy General Manager': { en: 'Deputy General Manager', kh: 'អគ្គនាយករង' },
    'Finance Director': { en: 'Finance Director', kh: 'នាយកហិរញ្ញវត្ថុ' },
    'Senior Project Manager': { en: 'Senior Project Manager', kh: 'អ្នកគ្រប់គ្រងគម្រោងជាន់ខ្ពស់' },
    'Project Manager': { en: 'Project Manager', kh: 'អ្នកគ្រប់គ្រងគម្រោង' },
    'MEP Operation Manager': { en: 'MEP Operation Manager', kh: 'អ្នកគ្រប់គ្រងប្រតិបត្តិការ MEP' },
    'Deputy Architect Manager': { en: 'Deputy Architect Manager', kh: 'អនុប្រធានផ្នែកស្ថាបត្យករ' },
    'MEP Design Manager': { en: 'MEP Design Manager', kh: 'អ្នកគ្រប់គ្រងការរចនា MEP' },
    'Deputy QS Manager': { en: 'Deputy QS Manager', kh: 'អនុប្រធានផ្នែកវាស់វែង (QS)' },
    'Warehouse Manager': { en: 'Warehouse Manager', kh: 'អ្នកគ្រប់គ្រងឃ្លាំង' },
    'Deputy General Manager Bio': {
        en: 'As Deputy General Manager, Mr. Pauch ensures operational excellence across all departments. He brings over 18 years of experience in construction management and strategic planning.',
        kh: 'ក្នុងនាមជាអគ្គនាយករង លោក ពៅ ធានានូវឧត្តមភាពប្រតិបត្តិការនៅគ្រប់នាយកដ្ឋានទាំងអស់។ លោកនាំមកនូវបទពិសោធន៍ជាង ១៨ ឆ្នាំក្នុងការគ្រប់គ្រងសំណង់ និងផែនការយុទ្ធសាស្ត្រ។'
    },
    'Finance Director Bio': {
        en: 'Mr. Leng overlooks the financial health of KIM MEX, ensuring sustainable growth and robust fiscal policies that allow for ambitious project undertakings.',
        kh: 'លោក ឡេង ត្រួតពិនិត្យសុខភាពហិរញ្ញវត្ថុរបស់ គីម ម៉ិច ដោយធានានូវកំណើនប្រកបដោយនិរន្តរភាព និងគោលនយោបាយសារពើពន្ធដ៏រឹងមាំដែលអនុញ្ញាតឱ្យមានការអនុវត្តគម្រោងប្រកបដោយមហិច្ឆតា។'
    },
    'Senior Project Manager Bio': {
        en: 'Leading our largest developments, Mr. Oung is known for his rigorous attention to detail and ability to deliver complex high-rise projects ahead of schedule.',
        kh: 'ដឹកនាំការអភិវឌ្ឍន៍ដ៏ធំបំផុតរបស់យើង លោក អ៊ុង ត្រូវបានគេស្គាល់តាមរយៈការយកចិត្តទុកដាក់យ៉ាងម៉ត់ចត់ចំពោះព័ត៌មានលម្អិត និងសមត្ថភាពក្នុងការប្រគល់គម្រោងអគារខ្ពស់ៗដ៏ស្មុគស្មាញមុនកាលកំណត់។'
    },
    'Project Manager Bio': {
        en: 'Mr. Sum specializes in commercial and industrial projects, coordinating diverse teams to ensure safety and quality standards are met at every stage.',
        kh: 'លោក ស៊ុម ជំនាញលើគម្រោងពាណិជ្ជកម្ម និងឧស្សាហកម្ម ដោយសម្របសម្រួលក្រុមចម្រុះ ដើម្បីធានាថាស្តង់ដារសុវត្ថិភាព និងគុណភាពត្រូវបានឆ្លើយតបនៅគ្រប់ដំណាក់កាល។'
    },
    'MEP Operation Manager Bio': {
        en: 'Overseeing Mechanical, Electrical, and Plumbing operations, Mr. Krai ensures that the vital systems of our buildings function perfectly and efficiently.',
        kh: 'ត្រួតពិនិត្យប្រតិបត្តិការមេកានិច អគ្គិសនី និងបំពង់ទឹក (MEP) លោក ក្រៃ ធានាថាប្រព័ន្ធសំខាន់ៗនៃអគាររបស់យើងដំណើរការយ៉ាងល្អឥតខ្ចោះ និងប្រកបដោយប្រសិទ្ធភាព។'
    },
    'Deputy Architect Manager Bio': {
        en: 'Mr. Chhundy brings creative vision to life, working closely with clients to translate their dreams into structural reality while strictly adhering to codes.',
        kh: 'លោក ឈុនឌី នាំមកនូវចក្ខុវិស័យច្នៃប្រឌិតមកកាន់ជីវិតពិត ដោយធ្វើការយ៉ាងជិតស្និទ្ធជាមួយអតិថិជនដើម្បីបកប្រែបំណងប្រាថ្នារបស់ពួកគេទៅជាការពិត ខណៈពេលដែលប្រកាន់ខ្ជាប់យ៉ាងតឹងរ៉ឹងនូវក្រមសីលធម៌។'
    },
    'MEP Design Manager Bio': {
        en: 'Leading the MEP design team, Mr. Touch focuses on sustainable and energy-efficient system designs for modern infrastructure.',
        kh: 'ដឹកនាំក្រុមរចនា MEP លោក ទូច ផ្តោតលើការរចនាប្រព័ន្ធដែលមាននិរន្តរភាព និងសន្សំសំចៃថាមពលសម្រាប់ហេដ្ឋារចនាសម្ព័ន្ធទំនើប។'
    },
    'Deputy QS Manager Bio': {
        en: 'With precision and expertise, Mr. Ry manages quantity surveying, ensuring accurate cost estimation and resource management for all projects.',
        kh: 'ដោយមានភាពជាក់លាក់ និងជំនាញ លោក រី គ្រប់គ្រងការវាស់វែងបរិមាណ (QS) ដោយធានានូវការប៉ាន់ស្មានតម្លៃត្រឹមត្រូវ និងការគ្រប់គ្រងធនធានសម្រាប់គ្រប់គម្រោង។'
    },
    'Warehouse Manager Bio': {
        en: 'Mr. Hong manages logistics and inventory, ensuring that materials are available on-site exactly when needed to maintain project timelines.',
        kh: 'លោក ហុង គ្រប់គ្រងភស្តុភារ និងសារពើភ័ណ្ឌ ដោយធានាថាសម្ភារៈមាននៅការដ្ឋានតាមតម្រូវការ ដើម្បីរក្សាកាលវិភាគគម្រោង។'
    },
    'Verified Leadership': { en: 'Verified Leadership', kh: 'ថ្នាក់ដឹកនាំដែលទទួលបានការបញ្ជាក់' },
    'Executive Biography': { en: 'Executive Biography', kh: 'ប្រវត្តិសង្ខេបរបស់ថ្នាក់ដឹកនាំ' },
    'Directorate': { en: 'Directorate', kh: 'គណៈនាយក' },
    'KIMMEX GROUP': { en: 'KIMMEX GROUP', kh: 'គីម ម៉ិច គ្រុប' },
    'Full Biography': { en: 'Full Biography', kh: 'ប្រវត្តិសង្ខេបទាំងស្រុង' },
    'First': { en: 'First', kh: 'ជាចំបង' },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    fontClassName: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('kh');

    const t = (key: string): string => {
        // Remove trailing/leading spaces for lookup
        const lookupKey = key.trim();
        // Return translation or original key if not found
        return dictionary[lookupKey]?.[language] || key;
    };

    const getFontClassName = () => {
        if (language !== 'kh') return 'font-sans';

        switch (configData.khmerFont) {
            case 'Koulen': return koulen.className;
            case 'Battambang': return battambang.className;
            case 'System': return 'font-sans';
            case 'Siemreap':
            default: return siemreap.className;
        }
    };

    const fontClassName = getFontClassName();

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
