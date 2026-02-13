export interface OrgNode {
    name: string;
    role: string;
    image?: string;
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
                                            type: 'manager',
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
                                            type: 'manager',
                                            children: [
                                                { name: 'HUNN SOKSOPHYRITH', role: 'Raw & Outer', type: 'staff' },
                                                { name: 'CHHUM SREYSOR', role: 'Stock & Pur', type: 'staff' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'HUMAN RESOURCES',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Ms. TOR CHANAKKESA',
                                            role: 'HR Lead',
                                            image: '/images/team-leadership-professional/staff_placeholder.png',
                                            type: 'manager',
                                            children: [
                                                { name: 'BORSOR LOTHIA', role: 'IT Support', type: 'staff' },
                                                { name: 'POK SAMARA', role: 'Acct & HR', type: 'staff' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'ADMIN & SECURITY',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Mr. SAM TO',
                                            role: 'Admin Manager',
                                            image: '/images/team-leadership-professional/staff_placeholder.png',
                                            type: 'manager',
                                            children: [
                                                { name: 'PHEN SOPHAL', role: 'Admin', type: 'staff' },
                                                { name: 'BOPHA', role: 'General Affair', type: 'staff' },
                                                { name: 'PHON SOPHEL', role: 'Security', type: 'staff' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'FINANCE & KMS',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Ms. OREY BREYNA',
                                            role: 'Finance Manager',
                                            image: '/images/team-leadership-professional/staff_placeholder.png',
                                            type: 'manager',
                                            children: [
                                                { name: 'YIM PHALLANY', role: 'Accounting', type: 'staff' },
                                                { name: 'LO KOHOR', role: 'Treasury', type: 'staff' },
                                                { name: 'KHEANG KHUNMATHOU', role: 'Taxation', type: 'staff' },
                                            ]
                                        },
                                        {
                                            name: 'Mr. LE HOMELEANG',
                                            role: 'KMS Specialist',
                                            image: '/images/team-leadership-professional/staff_placeholder.png',
                                            type: 'manager',
                                            children: [
                                                { name: 'SAM REYY', role: 'I.D.', type: 'staff' },
                                                { name: 'KIM MENGHONG', role: 'Operations', type: 'staff' },
                                            ]
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
                                    name: 'ARCHITECTURE & MEP',
                                    role: 'Column Head',
                                    type: 'department',
                                    children: [
                                        {
                                            name: 'Detail Design Dept.',
                                            role: 'Department Head',
                                            type: 'manager',
                                            children: [
                                                { name: 'Mr. CHHUNDY RYTA', role: 'Architecture', type: 'staff' },
                                                { name: 'Mr. SOTHEN SOPHEAKTH', role: 'Structural', type: 'staff' },
                                                { name: 'Mr. LOU SITHAT', role: 'ID & Design', type: 'staff' },
                                                { name: 'Mr. TOUCH PUTHEANY', role: 'MEP Design', type: 'staff' },
                                            ]
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
