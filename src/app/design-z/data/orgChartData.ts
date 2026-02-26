import { LocalizedString } from '../context/LanguageContext';

export interface OrgNode {
    name: string;
    role: LocalizedString;
    image?: string;
    phone?: string;
    memberCount?: number;
    children?: OrgNode[];
    isGroup?: boolean;
    type?: 'director' | 'manager' | 'staff' | 'department';
}

export const orgChartData: OrgNode = {
    name: 'Okhna. TOUCH KIM',
    role: { en: 'Chief Executive Officer', kh: 'នាយកប្រតិបត្តិ' },
    image: '/images/team-leadership-professional/touch_kim.jpg',
    type: 'director',
    children: [
        {
            name: 'Mr. MAY SOPHORN',
            role: { en: 'Deputy Chief Executive Officer', kh: 'នាយករងប្រតិបត្តិ' },
            image: '/images/team-leadership-professional/may_sophorn.png',
            type: 'director',
            children: [
                {
                    name: 'Mr. PAUCH BUNPHEAKDEY',
                    role: { en: 'Deputy General Manager', kh: 'នាយករងទូទៅ' },
                    image: '/images/team-leadership-professional/pauch_bunpheakdey.jpg',
                    type: 'director',
                    children: [
                        {
                            name: 'Mr. LENG VANNARITH',
                            role: { en: 'Finance Director', kh: 'នាយកហិរញ្ញវត្ថុ' },
                            image: '/images/team-leadership-professional/leng_vannarith.jpg',
                            type: 'director',
                            children: [
                                {
                                    name: 'LOGISTICS & ASSETS',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. HONG BUNNA',
                                            role: { en: 'Warehouse Manager', kh: 'អ្នកគ្រប់គ្រងឃ្លាំង' },
                                            image: '/images/team-leadership-professional/hong_bunna.jpg',
                                            phone: '016 423 236',
                                            type: 'manager',
                                            memberCount: 9,
                                            children: [
                                                { name: 'KIM SREY', role: { en: 'In-Outdoor Pur.', kh: 'ការទិញ' }, type: 'staff' },
                                                { name: 'SOK VIPHET', role: { en: 'Warehouse Sup.', kh: 'ការគ្រប់គ្រងឃ្លាំង' }, type: 'staff' },
                                                { name: 'KHOUNG CHANNEY', role: { en: 'Logistic Sup.', kh: 'ភស្តុភារ' }, type: 'staff' },
                                                { name: 'KONG SOK', role: { en: 'Maintenance', kh: 'ថែទាំ' }, type: 'staff' },
                                                { name: 'TSR', role: { en: 'Warehouse Admin', kh: 'រដ្ឋបាលឃ្លាំង' }, type: 'staff' },
                                            ]
                                        },
                                        {
                                            name: 'TSR',
                                            role: { en: 'Stock Manager', kh: 'អ្នកគ្រប់គ្រងស្តុក' },
                                            image: '/images/team-leadership-professional/staff_placeholder.png',
                                            phone: 'TBR',
                                            type: 'manager',
                                            children: [
                                                {
                                                    name: 'PORK KEOSOPHANITH',
                                                    role: { en: 'Sap & Office Support', kh: 'គាំទ្រ SAP & ការិយាល័យ' },
                                                    phone: '010 911 870',
                                                    memberCount: 5,
                                                    type: 'staff',
                                                    image: '/images/team-leadership-professional/sap_office_suppor.png'
                                                },
                                                {
                                                    name: 'HORN KIMHEANG',
                                                    role: { en: 'Stock by Project Site', kh: 'ស្តុកតាមទីតាំងគម្រោង' },
                                                    phone: '069 758 577',
                                                    memberCount: 26,
                                                    type: 'staff',
                                                    image: '/images/team-leadership-professional/stock_project_site_1.png'
                                                },
                                                {
                                                    name: 'TY HOCH',
                                                    role: { en: 'Stock by Project Site', kh: 'ស្តុកតាមទីតាំងគម្រោង' },
                                                    phone: '11 220 252',
                                                    memberCount: 8,
                                                    type: 'staff',
                                                    image: '/images/team-leadership-professional/stock_project_site_2.png'
                                                },
                                                {
                                                    name: 'TEAV VICHHAI',
                                                    role: { en: 'Stock by Project Site', kh: 'ស្តុកតាមទីតាំងគម្រោង' },
                                                    phone: '066 698 757',
                                                    memberCount: 8,
                                                    type: 'staff',
                                                    image: '/images/team-leadership-professional/stock_project_site_3.png'
                                                },
                                                {
                                                    name: 'Tamork Warehouse',
                                                    role: { en: 'Stock Admin', kh: 'រដ្ឋបាលស្តុក' },
                                                    memberCount: 5,
                                                    type: 'staff',
                                                    image: '/images/team-leadership-professional/staff_placeholder.png'
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'HUMAN RESOURCES & ADMIN',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. SUM TO',
                                            role: { en: 'HR & Admin Manager', kh: 'អ្នកគ្រប់គ្រង HR & រដ្ឋបាល' },
                                            image: '/images/team-leadership-professional/sum_rotana.jpg',
                                            phone: '092 567 783',
                                            type: 'manager',
                                            memberCount: 121,
                                            children: [
                                                { name: 'SOVANN VUTHY', role: { en: 'IT', kh: 'បច្ចេកវិជ្ជាព័ត៌មាន' }, phone: '011 610 564', memberCount: 6, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'TEP TOUSOVANDARA', role: { en: 'HR', kh: 'ធនធានមនុស្ស' }, phone: '096 522 4292', memberCount: 4, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'PHEN SOPHAL', role: { en: 'Admin', kh: 'រដ្ឋបាល' }, phone: '093 394 222', memberCount: 9, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'MORN RINA', role: { en: 'General Affair', kh: 'កិច្ចការទូទៅ' }, phone: '078 870 069', memberCount: 4, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'ROM VANARA', role: { en: 'Health & HSE', kh: 'សុខភាព & HSE' }, phone: '096 977 8852', memberCount: 9, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'PHON SOPHAL', role: { en: 'Security', kh: 'សន្តិសុខ' }, phone: '017 936 665', memberCount: 32, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'KHON CHAMROEUN', role: { en: 'Heavy Equipment', kh: 'គ្រឿងម៉ាស៊ីនធុនធ្ងន់' }, phone: '081 500 307', memberCount: 21, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'SEAB SEUN', role: { en: 'Tower Crane', kh: 'ជ័រ Tower Crane' }, phone: '096 243 7446', memberCount: 17, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'DETH VA', role: { en: 'Survey', kh: 'ការស្ទង់ស្ទង' }, phone: '087 985 652', memberCount: 18, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'FINANCE',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Ms. BREY SREYNA',
                                            role: { en: 'Finance Manager', kh: 'អ្នកគ្រប់គ្រងហិរញ្ញវត្ថុ' },
                                            image: '/images/team-leadership-professional/chhundy_ryta.jpg',
                                            phone: '095 616 911',
                                            type: 'manager',
                                            memberCount: 32,
                                            children: [
                                                { name: 'YIM PHALLANY', role: { en: 'Accounting', kh: 'គណនេយ្យ' }, phone: '081 222 333', memberCount: 8, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'LO KOHOR', role: { en: 'Treasury', kh: 'រតនាគារ' }, phone: '012 999 888', memberCount: 6, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'KHEANG KHUNMATHOU', role: { en: 'Taxation', kh: 'ពន្ធ' }, phone: '096 444 555', memberCount: 12, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'MEAS CHANSAK', role: { en: 'Audit', kh: 'សវនកម្ម' }, phone: '010 777 666', memberCount: 6, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'KMS & TECHNICAL',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. LY HONGLEANG',
                                            role: { en: 'KMS', kh: 'KMS' },
                                            image: '/images/team-leadership-professional/ly_hongleang.jpg',
                                            phone: '018 6 631 013',
                                            memberCount: 24,
                                            type: 'manager'
                                        },
                                        {
                                            name: 'Mr. SAM RITHY',
                                            role: { en: 'LD', kh: 'LD' },
                                            image: '/images/team-leadership-professional/ry_ken.jpg',
                                            phone: '012 484 144',
                                            memberCount: 19,
                                            type: 'manager'
                                        },
                                        {
                                            name: 'Mr. KIM VENGHONG',
                                            role: { en: 'Decor', kh: 'តុបតែង' },
                                            image: '/images/team-leadership-professional/krai_keak.jpg',
                                            phone: '010 633 743',
                                            memberCount: 26,
                                            type: 'manager'
                                        },
                                        {
                                            name: 'Mr. MEAN SOCHEAT',
                                            role: { en: 'MVAC', kh: 'MVAC' },
                                            image: '/images/team-leadership-professional/oung_chaknora.jpg',
                                            phone: '016 719 209',
                                            memberCount: 9,
                                            type: 'manager'
                                        },
                                        {
                                            name: 'Mr. TOUCH PUTHEANY',
                                            role: { en: 'MEP', kh: 'MEP' },
                                            image: '/images/team-leadership-professional/touch_putheany.jpg',
                                            phone: '011 802 800',
                                            memberCount: 13,
                                            type: 'manager'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'Ms. CHHUON FLORINA',
                            role: { en: 'SC Director', kh: 'នាយកខ្សែសង្វាក់ផ្គត់ផ្គង់' },
                            image: '/images/team-leadership-professional/chhuon_florina.png',
                            type: 'director',
                            children: [
                                {
                                    name: 'SUPPLY CHAIN OFFICE',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Ms. CHHUON FLORINA',
                                            role: { en: 'Directorate Lead', kh: 'ប្រធានអគ្គនាយកដ្ឋាន' },
                                            type: 'manager',
                                            children: [
                                                { name: 'Mr. CHUM CHANBOREY', role: { en: 'Internal Audit', kh: 'សវនកម្មផ្ទៃក្នុង' }, type: 'staff' },
                                                { name: 'Ms. HONG SORITA', role: { en: 'Supply Chain', kh: 'ខ្សែសង្វាក់ផ្គត់ផ្គង់' }, type: 'staff' },
                                                { name: 'Mr. MANCHIA', role: { en: 'MA', kh: 'MA' }, type: 'staff' },
                                                { name: 'Mr. SING BORY', role: { en: 'Media/Box', kh: 'ប្រព័ន្ធផ្សព្វផ្សាយ' }, type: 'staff' },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'Mr. PAUCH BUNPHEAKDEY',
                            role: { en: 'DGM (Design)', kh: 'នាយករង (ការរចនា)' },
                            image: '/images/team-leadership-professional/pauch_bunpheakdey.jpg',
                            type: 'director',
                            children: [
                                {
                                    name: 'LD',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. SAM RITHY',
                                            role: { en: 'LD Manager', kh: 'អ្នកគ្រប់គ្រង LD' },
                                            image: '/images/team-leadership-professional/sam_rithy.jpg',
                                            phone: '012 484 144',
                                            type: 'manager',
                                            memberCount: 19,
                                        }
                                    ]
                                },
                                {
                                    name: 'DECOR',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. KIM VENGHONG',
                                            role: { en: 'Decor Manager', kh: 'អ្នកគ្រប់គ្រងតុបតែង' },
                                            image: '/images/team-leadership-professional/kim_venghong.jpg',
                                            phone: '010 633 743',
                                            type: 'manager',
                                            memberCount: 26,
                                        }
                                    ]
                                },
                                {
                                    name: 'MVAC',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. MEAN SOCHEAT',
                                            role: { en: 'MVAC Manager', kh: 'អ្នកគ្រប់គ្រង MVAC' },
                                            image: '/images/team-leadership-professional/mean_socheat.jpg',
                                            phone: '016 719 209',
                                            type: 'manager',
                                            memberCount: 9,
                                        }
                                    ]
                                },
                                {
                                    name: 'MEP',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. TOUCH PUTHEANY',
                                            role: { en: 'MEP Manager', kh: 'អ្នកគ្រប់គ្រង MEP' },
                                            image: '/images/team-leadership-professional/touch_putheany.jpg',
                                            phone: '011 802 800',
                                            type: 'manager',
                                            memberCount: 13,
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'Mr. MAY SOPHORN',
                            role: { en: 'DCEO (Operations)', kh: 'នាយករងប្រតិបត្តិ (ប្រតិបត្តិការ)' },
                            image: '/images/team-leadership-professional/may_sophorn.png',
                            type: 'director',
                            children: [
                                {
                                    name: 'MEP & TECHNICAL',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. SUM ROTANA',
                                            role: { en: 'MEP Manager', kh: 'អ្នកគ្រប់គ្រង MEP' },
                                            image: '/images/team-leadership-professional/sum_rotana.jpg',
                                            type: 'manager',
                                            children: [
                                                { name: 'Mr. PHIN PHANIT', role: { en: 'EL/TIC', kh: 'EL/TIC' }, type: 'staff' },
                                                { name: 'Ms. TET SREYNICH', role: { en: 'Special Tech', kh: 'បច្ចេកទេសពិសេស' }, type: 'staff' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'SITE OPERATION',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. CHHANN VEASNA',
                                            role: { en: 'Project Manager', kh: 'អ្នកគ្រប់គ្រងគម្រោង' },
                                            type: 'manager',
                                            children: [
                                                { name: 'Team Alpha', role: { en: 'Site Ops', kh: 'ប្រតិបត្តិការទីតាំង' }, type: 'staff' },
                                                { name: 'Team Beta', role: { en: 'Site Ops', kh: 'ប្រតិបត្តិការទីតាំង' }, type: 'staff' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'QS & QUALITY',
                                    role: { en: 'Column Head', kh: 'ផ្នែក' },
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. RY KEN',
                                            role: { en: 'QS Lead', kh: 'ប្រធាន QS' },
                                            image: '/images/team-leadership-professional/ry_ken.jpg',
                                            type: 'manager',
                                            children: [
                                                { name: 'QA/QC Team', role: { en: 'Quality', kh: 'គុណភាព' }, type: 'staff' },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
