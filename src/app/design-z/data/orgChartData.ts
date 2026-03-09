import { LocalizedString } from '../context/LanguageContext';

export interface OrgNode {
    name: string;
    role: LocalizedString;
    bio?: LocalizedString;
    image?: string;
    phone?: string;
    memberCount?: number;
    children?: OrgNode[];
    isGroup?: boolean;
    type?: 'director' | 'manager' | 'staff' | 'department';
}

export const orgChartData: OrgNode = {
    "name": "Okhna. TOUCH KIM",
    "role": {
        "en": "Chief Executive Officer",
        "kh": "នាយកប្រតិបត្តិ"
    },
    "image": "/images/team-leadership-professional/touch_kim.jpg",
    "type": "director",
    "children": [
        {
            "name": "Mr. PAUCH BUNPHEAKDEY",
            "role": {
                "en": "DGM",
                "kh": "តួនាទី"
            },
            "type": "manager",
            "children": [
                {
                    "name": "Mr. LENG VANNARITH",
                    "role": {
                        "en": "Finance Director",
                        "kh": "តួនាទី"
                    },
                    "type": "director",
                    "children": [
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        },
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        },
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        },
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        },
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        }
                    ],
                    "phone": ""
                },
                {
                    "name": "New Node",
                    "role": {
                        "en": "Position Title",
                        "kh": "តួនាទី"
                    },
                    "type": "director",
                    "children": [
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        },
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        },
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        },
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "New Node",
                    "role": {
                        "en": "Position Title",
                        "kh": "តួនាទី"
                    },
                    "type": "director",
                    "children": [
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": [
                                {
                                    "name": "New Node",
                                    "role": {
                                        "en": "Position Title",
                                        "kh": "តួនាទី"
                                    },
                                    "type": "staff",
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "New Node",
                    "role": {
                        "en": "Position Title",
                        "kh": "តួនាទី"
                    },
                    "type": "director",
                    "children": [
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        },
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "New Node",
                    "role": {
                        "en": "Position Title",
                        "kh": "តួនាទី"
                    },
                    "type": "director",
                    "children": [
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        },
                        {
                            "name": "New Node",
                            "role": {
                                "en": "Position Title",
                                "kh": "តួនាទី"
                            },
                            "type": "staff",
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]
};