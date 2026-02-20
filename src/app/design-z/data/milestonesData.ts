export interface Milestone {
    year: string;
    title: string;
    desc: string;
    image: string;
    projects?: string[];
}

export const milestones: Milestone[] = [
    {
        year: '1999',
        title: 'Foundation',
        desc: 'Kim Mex Construction & Investment Co.,Ltd. was established and registered in accordance with the regulations and laws of the Kingdom of Cambodia.',
        image: '/images/projects/Thumbnail-1.jpg'
    },
    {
        year: '2001-2004',
        title: 'Early Growth',
        desc: 'Laying the groundwork for excellence in provincial infrastructure and building quality partnerships across the kingdom.',
        image: '/images/projects/Thumbnail-2.jpg'
    },
    {
        year: '2005-2013',
        title: 'Expanding Horizons',
        desc: 'Significant expansion of services into specialized building construction and large-scale public utility projects.',
        image: '/images/projects/Thumbnail-3.jpg'
    },
    {
        year: '2014-2017',
        title: 'Institutional Partnerships',
        desc: 'Delivery of key institutional projects including:',
        projects: [
            'Ministry of Economy and Finance',
            'Ministry of Post and Telecommunication',
            'Clean Water in Mondulkiri Province',
            'Electricity of Cambodia Wat Phnom',
            'Al Serkal Mosque'
        ],
        image: '/images/projects/Thumbnail-4.jpg'
    },
    {
        year: '2018-2020',
        title: 'Scaling Innovation',
        desc: 'Integration of modern systems and complex structural works:',
        projects: [
            'Anti-Corruption Unit',
            'Siem Reap Electricity',
            'Ministry of Economy Underground Parking Lot',
            'General Department of National Treasury'
        ],
        image: '/images/projects/Thumbnail-5.jpg'
    },
    {
        year: '2021-2022',
        title: 'Infrastructure Excellence',
        desc: 'Securing major national landmarks and utility hubs:',
        projects: [
            'Stung Treng Water Purification Station',
            'General Department of Customs and Excise',
            'Securities and Exchange Commission of Cambodia',
            'Electricity of Cambodia (EDC)'
        ],
        image: '/images/projects/Thumbnail-6.jpg'
    },
    {
        year: '2023',
        title: 'Strategic Progress',
        desc: 'Completion of high-profile government headquarters:',
        projects: [
            'Ministry of Interior HQ',
            'National Social Security Fund (NSSF)'
        ],
        image: '/images/projects/Thumbnail-7.jpg'
    },
    {
        year: '2024',
        title: 'Future Foundations',
        desc: 'Expanding into healthcare and regulatory sectors:',
        projects: [
            'Commercial Gambling Management Commission',
            'Chea Chumneas Hospital'
        ],
        image: '/images/projects/Thumbnail-8.jpg'
    },
    {
        year: '2025',
        title: 'Vision 2025',
        desc: 'Ongoing and future flagship developments:',
        projects: [
            'National Election Committee HQ'
        ],
        image: '/images/projects/Thumbnail-9.jpg'
    }
];
