export interface OrgNode {
    id: string;
    name: string;
    role: string;
    image?: string;
    children?: OrgNode[];
    type?: 'director' | 'manager' | 'staff' | 'department';
}

export const orgChartData: OrgNode = {
    id: 'ceo',
    name: 'Okhna. TOUCH KIM',
    role: 'Chief Executive Officer / Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800',
    type: 'director',
    children: [
        {
            id: 'deputy-gm',
            name: 'Mr. PAUCH BUNPHEAKDEY',
            role: 'Deputy General Manager',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800',
            type: 'director',
            children: [
                {
                    id: 'finance-dir',
                    name: 'Mr. LENG VANNARITH',
                    role: 'Finance Director',
                    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800',
                    type: 'director',
                    children: [
                        {
                            id: 'accounting',
                            name: 'Finance & Accounting',
                            role: 'Department',
                            type: 'department',
                            children: [
                                { id: 'acct-1', name: 'Ms. OREY BREYNA', role: 'Finance Manager', type: 'manager' },
                                { id: 'acct-2', name: 'YIM PHALLANY', role: 'Chief Accountant', type: 'staff' },
                            ]
                        }
                    ]
                },
                {
                    id: 'ops-dir',
                    name: 'Mr. MAY SOPHORN',
                    role: 'Operations Director',
                    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800',
                    type: 'director',
                    children: [
                        {
                            id: 'pm-dept',
                            name: 'Project Management',
                            role: 'Department',
                            type: 'department',
                            children: [
                                { id: 'pm-1', name: 'Mr. OUNG CHAKNORA', role: 'Senior PM', type: 'manager' },
                                { id: 'pm-2', name: 'Mr. CHHANN VEASNA', role: 'Project Manager', type: 'manager' },
                            ]
                        }
                    ]
                },
                {
                    id: 'tech-dir',
                    name: 'Mr. CHHUNDY RYTA',
                    role: 'Technical Director',
                    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800',
                    type: 'director',
                    children: [
                        {
                            id: 'design-dept',
                            name: 'Design & Architecture',
                            role: 'Department',
                            type: 'department',
                            children: [
                                { id: 'arch-1', name: 'Mr. TOUCH PUTHEANY', role: 'Design Manager', type: 'manager' },
                                { id: 'mep-1', name: 'Mr. KRAI KEAK', role: 'MEP Manager', type: 'manager' },
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
