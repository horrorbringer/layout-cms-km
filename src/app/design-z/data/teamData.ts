import { LocalizedString } from '../context/LanguageContext';

export type TeamMember = {
    name: string;
    role: LocalizedString;
    image?: string;
    bio: LocalizedString;
    experience: string;
    location: LocalizedString;
    specialization: LocalizedString;
};

export const teamMembers: TeamMember[] = [
    {
        name: 'Okhna. TOUCH KIM',
        role: {
            en: 'Chief Executive Officer',
            kh: 'នាយកប្រតិបត្តិ'
        },
        image: '/images/team-leadership-professional/touch_kim.jpg',
        bio: {
            en: 'Okhna. Touch Kim founded KIM MEX Construction in 1999 with a vision to revolutionize the Cambodian construction industry. With over 30 years of experience in civil engineering and infrastructure development, he has led the company from a small local contractor to a national leader. His leadership philosophy centers on integrity, quality, and community building.',
            kh: 'ឧកញ៉ា ទូច គីម បានបង្កើត KIM MEX Construction នៅឆ្នាំ ១៩៩៩ ដោយមានចក្ខុវិស័យក្នុងការធ្វើបដិវត្តឧស្សាហកម្មសំណង់នៅកម្ពុជា។ ជាមួយបទពិសោធន៍ជាង ៣០ ឆ្នាំក្នុងវិស្វកម្មសំណង់ និងការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធ គាត់បានដឹកនាំក្រុមហ៊ុនចេញពីម៉ៅការតូចទៅជាអ្នកដឹកនាំជាតិ។ ទស្សនៈភាពដឹកនាំរបស់គាត់ផ្ដោតទៅលើសុចរិតភាព គុណភាព និងការកសាងសហគមន៍។'
        },
        experience: '30+ Years',
        location: { en: 'Phnom Penh HQ', kh: 'ទីស្នាក់ការ ភ្នំពេញ' },
        specialization: { en: 'Strategic Leadership, Civil Engineering', kh: 'ភាពដឹកនាំយុទ្ធសាស្ត្រ, វិស្វកម្មសំណង់' }
    },
    {
        name: 'Mr. PAUCH BUNPHEAKDEY',
        role: {
            en: 'Deputy General Manager',
            kh: 'នាយករងទូទៅ'
        },
        image: '/images/team-leadership-professional/pauch_bunpheakdey.jpg',
        bio: {
            en: 'As Deputy General Manager, Mr. Pauch Bunpheakdey oversees the daily operations of KIM MEX Construction. He ensures that all departments work in synergy to deliver projects on time and within budget. His background in project management and operational efficiency has been instrumental in the company\'s rapid growth.',
            kh: 'ក្នុងនាមជានាយករងទូទៅ លោក ប៉ោច បុណ្យភ័ក្ដី ទទួលខុសត្រូវការិយាល័យប្រតិបត្តិប្រចាំថ្ងៃនៃ KIM MEX Construction។ គាត់ធានាថាគ្រប់ផ្នែកទាំងអស់ធ្វើការសម្របសម្រួលជាមួយគ្នា ដើម្បីបញ្ចប់គម្រោងទាន់ពេល និងក្នុងថវិកា។ ជំនាញរបស់គាត់ក្នុងការគ្រប់គ្រងគម្រោង និងប្រសិទ្ធភាពប្រតិបត្តិការ បានរួមចំណែកយ៉ាងខ្លាំងដល់ការលូតលាស់យ៉ាងឆាប់រហ័សរបស់ក្រុមហ៊ុន។'
        },
        experience: '20+ Years',
        location: { en: 'Phnom Penh HQ', kh: 'ទីស្នាក់ការ ភ្នំពេញ' },
        specialization: { en: 'Operations Management, Project Planning', kh: 'គ្រប់គ្រងប្រតិបត្តិការ, ការរៀបចំផែនការគម្រោង' }
    },
    {
        name: 'Mr. LENG VANNARITH',
        role: {
            en: 'Finance Director',
            kh: 'នាយកហិរញ្ញវត្ថុ'
        },
        image: '/images/team-leadership-professional/leng_vannarith.jpg',
        bio: {
            en: 'Mr. Leng Vannarith manages the financial health of the organization. With a keen eye for detail and strategic financial planning, he ensures sustainable growth and fiscal responsibility across all projects.',
            kh: 'លោក លេង វណ្ណរិទ្ធ គ្រប់គ្រងស្ថានភាពហិរញ្ញវត្ថុរបស់អង្គភាព។ ជាមួយនឹងការយកចិត្តទុកដាក់ខ្ពស់ចំពោះព័ត៌មានលម្អិត និងការរៀបចំផែនការហិរញ្ញវត្ថុជាយុទ្ធសាស្ត្រ គាត់ធានាការលូតលាស់ប្រកបដោយនិរន្តរភាព និងការទទួលខុសត្រូវហិរញ្ញវត្ថុ។'
        },
        experience: '18+ Years',
        location: { en: 'Phnom Penh HQ', kh: 'ទីស្នាក់ការ ភ្នំពេញ' },
        specialization: { en: 'Corporate Finance, Risk Management', kh: 'ហិរញ្ញវត្ថុក្រុមហ៊ុន, គ្រប់គ្រងហានិភ័យ' }
    },
    {
        name: 'Mr. OUNG CHAKNORA',
        role: {
            en: 'Senior Project Manager',
            kh: 'អ្នកគ្រប់គ្រងគម្រោងជាន់ខ្ពស់'
        },
        image: '/images/team-leadership-professional/oung_chaknora.jpg',
        bio: {
            en: 'Mr. Oung Chaknora leads our most complex construction projects. His expertise in structural engineering and on-site management ensures that every build meets our rigorous safety and quality standards.',
            kh: 'លោក អ៊ូង ចក្ណុរ ដឹកនាំគម្រោងសំណង់ដ៏ស្មុគ្រស្មាញបំផុតរបស់យើង។ ជំនាញរបស់គាត់ក្នុង វិស្វកម្មរចនាសម្ព័ន្ធ និងការគ្រប់គ្រងនៅទីតាំង ធានាថារាល់ការសាងសង់符合នឹងស្តង់ដារសុវត្ថិភាព និងគុណភាពតឹងរ៉ឹងរបស់យើង។'
        },
        experience: '15+ Years',
        location: { en: 'Site Operations', kh: 'ប្រតិបត្តិការទីតាំង' },
        specialization: { en: 'Construction Management, Structural Engineering', kh: 'គ្រប់គ្រងសំណង់, វិស្វកម្មរចនាសម្ព័ន្ធ' }
    },
    {
        name: 'Mr. SUM ROTANA',
        role: {
            en: 'Project Manager',
            kh: 'អ្នកគ្រប់គ្រងគម្រោង'
        },
        image: '/images/team-leadership-professional/sum_rotana.jpg',
        bio: {
            en: 'Mr. Sum Rotana is dedicated to delivering excellence in project execution. He works closely with clients and site teams to ensure clear communication and successful project outcomes.',
            kh: 'លោក សំ រតនា ប្រកបដោយការប្តេជ្ញាក្នុងការផ្តល់ភាពល្អឥតខ្ចោះក្នុងការអនុវត្តគម្រោង។ គាត់ធ្វើការយ៉ាងជិតស្និទ្ធជាមួយអតិថិជន និងក្រុមការងារនៅទីតាំង ដើម្បីធានាការទំនាក់ទំនងប្រកដ និងលទ្ធផលគម្រោងជោគជ័យ។'
        },
        experience: '12+ Years',
        location: { en: 'Site Operations', kh: 'ប្រតិបត្តិការទីតាំង' },
        specialization: { en: 'Project Coordination, Client Relations', kh: 'សម្របសម្រួលគម្រោង, ទំនាក់ទំនងអតិថិជន' }
    },
    {
        name: 'Mr. KRAI KEAK',
        role: {
            en: 'MEP Operations Manager',
            kh: 'អ្នកគ្រប់គ្រងប្រតិបត្តិការ MEP'
        },
        image: '/images/team-leadership-professional/krai_keak.jpg',
        bio: {
            en: 'Specializing in Mechanical, Electrical, and Plumbing (MEP) systems, Mr. Krai Keak ensures the functional heartbeat of every building we construct operates flawlessly.',
            kh: 'ឯកទេសខាងប្រព័ន្ធមេកានិច អគ្គិសនី និងប្រព័ន្ធទឹក (MEP) លោក គ្រៃ គាក ធានាថាចង្វាក់ប្រតិបត្តិការនៃរាល់អគារដែលយើងសាងសង់ដំណើរការបានប្រក្រតី។'
        },
        experience: '14+ Years',
        location: { en: 'MEP Division', kh: 'ផ្នែក MEP' },
        specialization: { en: 'MEP Systems, Operational Maintenance', kh: 'ប្រព័ន្ធ MEP, ថែទាំប្រតិបត្តិការ' }
    },
    {
        name: 'Mr. CHHUNDY RYTA',
        role: {
            en: 'Deputy Architect Manager',
            kh: 'អ្នកគ្រប់គ្រងស្ថាបត្យកររង'
        },
        image: '/images/team-leadership-professional/chhundy_ryta.jpg',
        bio: {
            en: 'Mr. Chhundy Ryta brings creative vision to our technical excellence. He oversees architectural design integrity, ensuring that aesthetics and functionality coexist in perfect harmony.',
            kh: 'លោក ឈុននី រ៉ីតា នាំយកចក្ខុវិស័យច្នៃប្រឌិតមកកង់ភាពល្អឥតខ្ចោះបច្ចេកទេសរបស់យើង។ គាត់ត្រួតពិនិត្យភាពស្និទ្ធស្នាលនៃការរចនាស្ថាបត្យកម្ម ដោយធានាថារូបរាង និងមុខងារស្រប​ស្ដីនឹងគ្នា។'
        },
        experience: '10+ Years',
        location: { en: 'Design Studio', kh: 'ស្ទូឌីយ៉ូរចនា' },
        specialization: { en: 'Architectural Design, BIM', kh: 'ការរចនាស្ថាបត្យកម្ម, BIM' }
    },
    {
        name: 'Mr. TOUCH PUTHEANY',
        role: {
            en: 'MEP Design Manager',
            kh: 'អ្នកគ្រប់គ្រងការរចនា MEP'
        },
        image: '/images/team-leadership-professional/touch_putheany.jpg',
        bio: {
            en: 'Mr. Touch Putheany leads the design of complex MEP systems. His innovative approach to energy efficiency and system integration sets our projects apart.',
            kh: 'លោក ទូច ពុទ្ធានី ដឹកនាំការរចនាប្រព័ន្ធ MEP ស្មុគ្រស្មាញ។ វិធីសាស្ត្រច្នៃប្រឌិតរបស់គាត់ចំពោះប្រសិទ្ធភាពថាមពល និងការរួមបញ្ចូលប្រព័ន្ធ ធ្វើឱ្យគម្រោងរបស់យើងលេចធ្លោ។'
        },
        experience: '11+ Years',
        location: { en: 'MEP Division', kh: 'ផ្នែក MEP' },
        specialization: { en: 'MEP Design, Sustainability', kh: 'ការរចនា MEP, និរន្តរភាព' }
    },
    {
        name: 'Mr. RY KEN',
        role: {
            en: 'Deputy QS Manager',
            kh: 'អ្នកគ្រប់គ្រង QS រង'
        },
        image: '/images/team-leadership-professional/ry_ken.jpg',
        bio: {
            en: 'Mr. Ry Ken manages Quantity Surveying, ensuring precise cost estimation and contract management. His diligence protects our clients\' investments and ensures project viability.',
            kh: 'លោក រី គែន គ្រប់គ្រងការស្ទង់ និងការប៉ាន់ស្មានប្រមាណ ដោយធានានូវវិភាគតម្លៃត្រឹមត្រូវ និងការគ្រប់គ្រងកិច្ចសន្យា។ ការយកចិត្តទុកដាក់របស់គាត់ការពារការវិនិយោគរបស់អតិថិជន និងធានាភាពអាចប្រើបានរបស់គម្រោង។'
        },
        experience: '9+ Years',
        location: { en: 'Phnom Penh HQ', kh: 'ទីស្នាក់ការ ភ្នំពេញ' },
        specialization: { en: 'Cost Estimation, Contract Management', kh: 'ការប៉ាន់ស្មានតម្លៃ, គ្រប់គ្រងកិច្ចសន្យា' }
    },
    {
        name: 'Mr. HONG BUNNA',
        role: {
            en: 'Warehouse Manager',
            kh: 'អ្នកគ្រប់គ្រងឃ្លាំង'
        },
        image: '/images/team-leadership-professional/hong_bunna.jpg',
        bio: {
            en: 'Mr. Hong manages logistics and inventory, ensuring that materials are available on-site exactly when needed to maintain project timelines. His coordination is key to project efficiency.',
            kh: 'លោក ហុង គ្រប់គ្រងភស្តុភារ និងស្តុក ដោយធានាថាសម្ភារៈមានអ្ចស្រេចនៅទីតាំងឱ្យបានទៀងទាត់ ដើម្បីរក្សាកាលវិភាគគម្រោង។ ការសម្របសម្រួលរបស់គាត់គឺជាគន្លឹះសម្រាប់ប្រសិទ្ធភាពគម្រោង។'
        },
        experience: '15+ Years',
        location: { en: 'Phnom Penh HQ', kh: 'ទីស្នាក់ការ ភ្នំពេញ' },
        specialization: { en: 'Logistics, Inventory Management', kh: 'ភស្តុភារ, គ្រប់គ្រងស្តុក' }
    }
];
