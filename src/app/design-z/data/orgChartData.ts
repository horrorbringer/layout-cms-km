export interface OrgNode {
    name: string;
    role: string;
    image?: string;
    phone?: string;
    memberCount?: number; // Added memberCount property
    children?: OrgNode[];
    isGroup?: boolean;
    type?: 'director' | 'manager' | 'staff' | 'department';
}

export const orgChartData: OrgNode = {
    name: 'Okhna. TOUCH KIM',
    role: 'Chief Executive Officer',
    image: '/images/team-leadership-professional/touch_kim.jpg',
    type: 'director',
    children: [
        {
            name: 'Mr. MAY SOPHORN',
            role: 'Deputy Chief Executive Officer',
            image: '/images/team-leadership-professional/may_sophorn.png',
            type: 'director',
            children: [
                {
                    name: 'Mr. PAUCH BUNPHEAKDEY',
                    role: 'Deputy General Manager',
                    image: '/images/team-leadership-professional/pauch_bunpheakdey.jpg',
                    type: 'director',
                    children: [
                        {
                            name: 'Mr. LENG VANNARITH',
                            role: 'Finance Director',
                            image: '/images/team-leadership-professional/leng_vannarith.jpg',
                            type: 'director',
                            children: [
                                {
                                    name: 'LOGISTICS & ASSETS',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. HONG BUNNA',
                                            role: 'Warehouse Manager',
                                            image: '/images/team-leadership-professional/hong_bunna.jpg',
                                            phone: '016 423 236',
                                            type: 'manager',
                                            memberCount: 9, // Added member count
                                            children: [
                                                { name: 'KIM SREY', role: 'In-Outdoor Pur.', type: 'staff' },
                                                { name: 'SOK VIPHET', role: 'Warehouse Sup.', type: 'staff' },
                                                { name: 'KHOUNG CHANNEY', role: 'Logistic Sup.', type: 'staff' },
                                                { name: 'KONG SOK', role: 'Maintenance', type: 'staff' },
                                                { name: 'TSR', role: 'Warehouse Admin', type: 'staff' },
                                            ]
                                        },
                                        {
                                            name: 'TSR',
                                            role: 'Stock Manager',
                                            image: '/images/team-leadership-professional/staff_placeholder.png',
                                            phone: 'TBR',
                                            type: 'manager',
                                            children: [
                                                {
                                                    name: 'PORK KEOSOPHANITH',
                                                    role: 'Sap & Office Suppor',
                                                    phone: '010 911 870',
                                                    memberCount: 5,
                                                    type: 'staff',
                                                    image: '/images/team-leadership-professional/sap_office_suppor.png'
                                                },
                                                {
                                                    name: 'HORN KIMHEANG',
                                                    role: 'Stock by Project Site',
                                                    phone: '069 758 577',
                                                    memberCount: 26,
                                                    type: 'staff',
                                                    image: '/images/team-leadership-professional/stock_project_site_1.png'
                                                },
                                                {
                                                    name: 'TY HOCH',
                                                    role: 'Stock by Project Site',
                                                    phone: '11 220 252',
                                                    memberCount: 8,
                                                    type: 'staff',
                                                    image: '/images/team-leadership-professional/stock_project_site_2.png'
                                                },
                                                {
                                                    name: 'TEAV VICHHAI',
                                                    role: 'Stock by Project Site',
                                                    phone: '066 698 757',
                                                    memberCount: 8,
                                                    type: 'staff',
                                                    image: '/images/team-leadership-professional/stock_project_site_3.png'
                                                },
                                                {
                                                    name: 'Tamork Warehouse',
                                                    role: 'Stock Admin',
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
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. SUM TO',
                                            role: 'HR & Admin Manager',
                                            image: '/images/team-leadership-professional/staff_placeholder.png',
                                            phone: '092 567 783',
                                            type: 'manager',
                                            memberCount: 121,
                                            children: [
                                                { name: 'SOVANN VUTHY', role: 'IT', phone: '011 610 564', memberCount: 6, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'TEP TOUSOVANDARA', role: 'HR', phone: '096 522 4292', memberCount: 4, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'PHEN SOPHAL', role: 'Admin', phone: '093 394 222', memberCount: 9, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'MORN RINA', role: 'General Affair', phone: '078 870 069', memberCount: 4, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'ROM VANARA', role: 'Health & HSE', phone: '096 977 8852', memberCount: 9, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'PHON SOPHAL', role: 'Security', phone: '017 936 665', memberCount: 32, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'KHON CHAMROEUN', role: 'Heavy Equipment', phone: '081 500 307', memberCount: 21, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'SEAB SEUN', role: 'Tower Crane', phone: '096 243 7446', memberCount: 17, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'DETH VA', role: 'Survey', phone: '087 985 652', memberCount: 18, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'FINANCE',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Ms. BREY SREYNA',
                                            role: 'Finance Manager',
                                            image: '/images/team-leadership-professional/staff_placeholder.png',
                                            phone: '095 616 911',
                                            type: 'manager',
                                            memberCount: 32,
                                            children: [
                                                { name: 'YIM PHALLANY', role: 'Accounting', phone: '081 222 333', memberCount: 8, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'LO KOHOR', role: 'Treasury', phone: '012 999 888', memberCount: 6, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'KHEANG KHUNMATHOU', role: 'Taxation', phone: '096 444 555', memberCount: 12, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                                { name: 'MEAS CHANSAK', role: 'Audit', phone: '010 777 666', memberCount: 6, type: 'staff', image: '/images/team-leadership-professional/staff_placeholder.png' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'KMS',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. LY HONGLEANG',
                                            role: 'KMS Specialist',
                                            image: '/images/team-leadership-professional/ly_hongleang.jpg', // Updated image
                                            phone: '018 6 631 013',
                                            type: 'manager'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'Ms. CHHUON FLORINA',
                            role: 'SC Director',
                            image: '/images/team-leadership-professional/chhuon_florina.png',
                            type: 'director',
                            children: [
                                {
                                    name: 'SUPPLY CHAIN OFFICE',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Ms. CHHUON FLORINA',
                                            role: 'Directorate Lead',
                                            type: 'manager',
                                            children: [
                                                { name: 'Mr. CHUM CHANBOREY', role: 'Internal Audit', type: 'staff' },
                                                { name: 'Ms. HONG SORITA', role: 'Supply Chain', type: 'staff' },
                                                { name: 'Mr. MANCHIA', role: 'MA', type: 'staff' },
                                                { name: 'Mr. SING BORY', role: 'Media/Box', type: 'staff' },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'Mr. PAUCH BUNPHEAKDEY',
                            role: 'DGM (Design)',
                            image: '/images/team-leadership-professional/pauch_bunpheakdey.jpg',
                            type: 'director',
                            children: [
                                {
                                    name: 'LD',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. SAM RITHY',
                                            role: 'LD Manager',
                                            image: '/images/team-leadership-professional/sam_rithy.jpg',
                                            phone: '012 484 144',
                                            type: 'manager',
                                            memberCount: 19,
                                        }
                                    ]
                                },
                                {
                                    name: 'DECOR',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. KIM VENGHONG',
                                            role: 'Decor Manager',
                                            image: '/images/team-leadership-professional/kim_venghong.jpg',
                                            phone: '010 633 743',
                                            type: 'manager',
                                            memberCount: 26,
                                        }
                                    ]
                                },
                                {
                                    name: 'MVAC',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. MEAN SOCHEAT',
                                            role: 'MVAC Manager',
                                            image: '/images/team-leadership-professional/mean_socheat.jpg',
                                            phone: '016 719 209', // Corrected phone number
                                            type: 'manager',
                                            memberCount: 9,
                                        }
                                    ]
                                },
                                {
                                    name: 'MEP',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. TOUCH PUTHEANY',
                                            role: 'MEP Manager',
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
                            role: 'DCEO (Operations)',
                            image: '/images/team-leadership-professional/may_sophorn.png',
                            type: 'director',
                            children: [
                                {
                                    name: 'MEP & TECHNICAL',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. SUM ROTANA',
                                            role: 'MEP Manager',
                                            image: '/images/team-leadership-professional/sum_rotana.jpg',
                                            type: 'manager',
                                            children: [
                                                { name: 'Mr. PHIN PHANIT', role: 'EL/TIC', type: 'staff' },
                                                { name: 'Ms. TET SREYNICH', role: 'Special Tech', type: 'staff' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'SITE OPERATION',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. CHHANN VEASNA',
                                            role: 'Project Manager',
                                            type: 'manager',
                                            children: [
                                                { name: 'Team Alpha', role: 'Site Ops', type: 'staff' },
                                                { name: 'Team Beta', role: 'Site Ops', type: 'staff' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'QS & QUALITY',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. RY KEN',
                                            role: 'QS Lead',
                                            image: '/images/team-leadership-professional/ry_ken.jpg',
                                            type: 'manager',
                                            children: [
                                                { name: 'QA/QC Team', role: 'Quality', type: 'staff' },
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
