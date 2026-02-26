import { LocalizedString } from '../context/LanguageContext';

export type ServiceDetail = {
    id: string;
    title: LocalizedString;
    subtitle: LocalizedString;
    heroImage: string;
    description: LocalizedString;
    targetAudience: LocalizedString;
    scopeOfWork: LocalizedString[];
    process: { step: string; title: LocalizedString; desc: LocalizedString }[];
    benefits: { title: LocalizedString; desc: LocalizedString }[];
    relatedProjects: { id: string; title: LocalizedString; location: LocalizedString; category: LocalizedString; image: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
    'design-build': {
        id: 'design-build',
        title: { en: 'Design & Build', kh: 'រចនា និងសាងសង់' },
        subtitle: { en: 'From Concept to Creation', kh: 'ពីគំនិតដល់ការបង្កើតថ្មី' },
        heroImage: '/images/projects/Thumbnail-6.jpg',
        description: { en: 'Our flagship service integrating architectural creativity with engineering precision. We manage the entire project lifecycle, ensuring a seamless transition from the drawing board to the final handover. This unified approach minimizes risks and accelerates delivery.', kh: 'សេវាកម្មដ៏សំខាន់របស់យើងរួមបញ្ចូលភាពច្នៃប្រឌិតស្ថាបត្យកម្ម និងភាពជាក់លាក់នៃវិស្វកម្ម។ យើងគ្រប់គ្រងវដ្តជីវិតគម្រោងទាំងមូល ធានាបាននូវការផ្លាស់ប្តូរយ៉ាងរលូនពីការគូសប្លង់រហូតដល់ការប្រគល់ជូន។ វិធីសាស្រ្តរួមនេះកាត់បន្ថយហានិភ័យ និងជំរុញការចែកចាយឲ្យបានរហ័ស។' },
        targetAudience: { en: 'Ideal for property developers, commercial business owners, and private investors looking for a single point of responsibility.', kh: 'ស័ក្តិសមសម្រាប់អ្នកអភិវឌ្ឍន៍អចលនទ្រព្យ ម្ចាស់អាជីវកម្មពាណិជ្ជកម្ម និងអ្នកវិនិយោគឯកជនដែលកំពុងស្វែងរកការទទួលខុសត្រូវតែមួយ។' },
        scopeOfWork: [
            { en: 'Architectural Conceptualization & 3D Rendering', kh: 'គំនូសព្រាងស្ថាបត្យកម្ម និងលក្ខណៈ 3D' },
            { en: 'Structural & Civil Engineering', kh: 'វិស្វកម្មសំណង់ និងស៊ីវិល' },
            { en: 'Mechanical, Electrical, & Plumbing (MEP) Design', kh: 'ការរចនាប្រព័ន្ធទឹក ភ្លើង និងម៉ាស៊ីន (MEP)' },
            { en: 'Permit Acquisition & Regulatory Approvals', kh: 'ការស្នើសុំលិខិតអនុញ្ញាត និងការយល់ព្រមតាមច្បាប់' },
            { en: 'Turnkey Construction Execution', kh: 'ការប្រតិបត្តិការសាងសង់ទាំងស្រុង' },
            { en: 'Interior Design & Fit-out', kh: 'ការរចនា និងតុបតែងផ្នែកខាងក្នុង' }
        ],
        process: [
            { step: '01', title: { en: 'Consultation', kh: 'ការប្រឹក្សា' }, desc: { en: 'Understanding your vision, budget, and feasibility analysis.', kh: 'ការយល់ដឹងពីចក្ខុវិស័យ ថវិកា និងការវិភាគសមិទ្ធភាព។' } },
            { step: '02', title: { en: 'Design & Plan', kh: 'រចនា និងយុទ្ធសាស្រ្ត' }, desc: { en: 'Developing detailed architectural and engineering blueprints.', kh: 'ការបង្កើតប្លង់ស្ថាបត្យកម្ម និងយុទ្ធសាស្រ្តលម្អិត។' } },
            { step: '03', title: { en: 'Build', kh: 'សាងសង់' }, desc: { en: 'Construction execution with rigorous quality control.', kh: 'ការអនុវត្តសាងសង់ប្រកបដោយការគ្រប់គ្រងគុណភាព។' } },
            { step: '04', title: { en: 'Handover', kh: 'ប្រគល់ជូន' }, desc: { en: 'Final inspection, documentation, and key delivery.', kh: 'ការត្រួតពិនិត្យចុងក្រោយ ឯកសារ និងការប្រគល់សោ។' } }
        ],
        benefits: [
            { title: { en: 'Single Point of Contact', kh: 'ចំណុចទំនាក់ទំនងតែមួយ' }, desc: { en: 'Streamlined communication and accountability.', kh: 'ការប្រាស្រ័យទាក់ទង និងការទទួលខុសត្រូវមានប្រសិទ្ធភាព។' } },
            { title: { en: 'Accelerated Timeline', kh: 'ពេលវេលាលឿនរហ័ស' }, desc: { en: 'Overlapping design and construction phases.', kh: 'ការត្រួតគ្នានៃដំណាក់កាលរចនា និងការសាងសង់។' } },
            { title: { en: 'Cost Certainty', kh: 'ភាពប្រាកដប្រជាថ្លៃដើម' }, desc: { en: 'Minimized change orders and precise budgeting.', kh: 'កាត់បន្ថយការផ្លាស់ប្តូរ និងរៀបចំថវិកាបានត្រឹមត្រូវ។' } },
            { title: { en: 'Quality Assurance', kh: 'ធានាគុណភាព' }, desc: { en: 'Integrated teams ensure design intent is met.', kh: 'ក្រុមការងារប្រកបដោយវិជ្ជាជីវៈធានាបាននូវការរចនាស្របតាមគោលដៅ។' } }
        ],
        relatedProjects: [
            { id: '1', title: { en: 'Vattanac Capital Extension', kh: 'ការពង្រីកបរិវេណ វឌ្ឍនៈ កាពីតាល' }, location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' }, category: { en: 'Commercial', kh: 'ពាណិជ្ជកម្ម' }, image: '/images/projects/Thumbnail-1.jpg' },
            { id: '2', title: { en: 'Skyline Residential', kh: 'អគារលំនៅដ្ឋាន Skyline' }, location: { en: 'Siem Reap', kh: 'សៀមរាប' }, category: { en: 'Residential', kh: 'លំនៅដ្ឋាន' }, image: '/images/projects/Thumbnail-4.jpg' }
        ]
    },
    'construction': {
        id: 'construction',
        title: { en: 'Construction', kh: 'ការសាងសង់' },
        subtitle: { en: 'Building the Future with Precision', kh: 'កសាងអនាគតជាមួយនឹងភាពច្បាស់លាស់' },
        heroImage: '/images/projects/Thumbnail-4.jpg',
        description: { en: 'We specialize in high-quality construction of residential, commercial, and industrial structures. From ground-breaking to the final coat of paint, our expert team ensures structural integrity, modern aesthetics, and adherence to the strictest safety standards.', kh: 'យើងមានជំនាញក្នុងការសាងសង់លំនៅដ្ឋាន ពាណិជ្ជកម្ម និងរចនាសម្ព័ន្ធឧស្សាហកម្មប្រកបដោយគុណភាពខ្ពស់។ ពីដំណាក់កាលបុកគ្រឹះរហូតដល់ការលាបពណ៌ចុងក្រោយ ក្រុមការងាររបស់យើងធានាបាននូវភាពរឹងមាំ សោភ័ណភាព និងការអនុលោមតាមស្តង់ដារសុវត្ថិភាពយ៉ាងតឹងរ៉ឹងបំផុត។' },
        targetAudience: { en: 'Ideal for property developers, government agencies, and private investors seeking reliable construction excellence.', kh: 'ស័ក្តិសមសម្រាប់អ្នកអភិវឌ្ឍន៍អចលនទ្រព្យ ស្ថាប័នរដ្ឋាភិបាល និងអ្នកវិនិយោគឯកជនដែលកំពុងស្វែងរកស្ថេរភាពសំណង់។' },
        scopeOfWork: [
            { en: 'Structural Engineering & Foundations', kh: 'វិស្វកម្មសំណង់ និងការរៀបចំគ្រឹះ' },
            { en: 'Reinforced Concrete Works', kh: 'ការងារបេតុងប្រដាប់ដែក' },
            { en: 'Steel Structure Fabrication & Erection', kh: 'ការផលិត និងការដំឡើងរចនាសម្ព័ន្ធដែក' },
            { en: 'Masonry & Structural Framing', kh: 'ការសាងសង់ជញ្ជាំង និងរចនាសម្ព័ន្ធអគារ' },
            { en: 'MEP System Installation', kh: 'ការដំឡើងប្រព័ន្ធទឹក ភ្លើង និងម៉ាស៊ីន (MEP)' },
            { en: 'Comprehensive Site Finishing', kh: 'បញ្ចប់ការងារសំណង់ទាំងស្រុង' }
        ],
        process: [
            { step: '01', title: { en: 'Survey', kh: 'ការសិក្សាទីតាំង' }, desc: { en: 'Detailed site analysis, topographical survey, and soil testing.', kh: 'ការវិភាគទីតាំង ទម្រង់ដី និងការធ្វើតេស្តលក្ខណៈដី។' } },
            { step: '02', title: { en: 'Preparation', kh: 'ការរៀបចំ' }, desc: { en: 'Site clearing, mobilization of equipment, and foundation layout.', kh: 'ការសម្អាតទីតាំង ការបញ្ជូនសម្ភារៈ និងការផ្តើមគ្រឹះ។' } },
            { step: '03', title: { en: 'Execution', kh: 'ការអនុវត្ត' }, desc: { en: 'Phased construction with expert supervision and QA/QC.', kh: 'ការសាងសង់តាមដំណាក់កាលជាមួយនឹងការគ្រប់គ្រងគុណភាព (QA/QC)។' } },
            { step: '04', title: { en: 'Finalization', kh: 'ការបញ្ចប់ការងារ' }, desc: { en: 'Structural certification, site cleanup, and project handover.', kh: 'ការផ្ទៀងផ្ទាត់គុណភាព ការសម្អាតទីតាំង និងការប្រគល់គម្រោង។' } }
        ],
        benefits: [
            { title: { en: 'Structural Integrity', kh: 'ភាពរឹងមាំរចនាសម្ព័ន្ធ' }, desc: { en: 'Built to exceed standard building codes and regulations.', kh: 'សាងសង់ល្អជាងបទដ្ឋាន និងប្បញ្ញត្តិសំណង់។' } },
            { title: { en: 'Expert Craftsmanship', kh: 'ភាពប៉ិនប្រសប់វិជ្ជាជីវៈ' }, desc: { en: 'Attention to detail in every brick and beam.', kh: 'យកចិត្តទុកដាក់លម្អិតនៅគ្រប់ឥដ្ឋ និងធ្នឹម។' } },
            { title: { en: 'Safety Commitment', kh: 'ការប្តេជ្ញាចិត្តសុវត្ថិភាព' }, desc: { en: 'Zero-incident policy on all construction sites.', kh: 'គោលការណ៍កាត់បន្ថយគ្រោះថ្នាក់បានទាំងស្រុងនៅគ្រប់ទីតាំងសំណង់។' } },
            { title: { en: 'Value Engineering', kh: 'ការវាយតម្លៃវិស្វកម្ម' }, desc: { en: 'Optimizing materials for durability and cost-efficiency.', kh: 'ចំណេញវត្ថុធាតុនៃការសាងសង់ដើម្បីបានគុណភាព និងសន្សំសំចៃ។' } }
        ],
        relatedProjects: [
            { id: '3', title: { en: 'Colonial Villa Restoration', kh: 'ការស្តារវីឡាកូឡូនីស' }, location: { en: 'Kep', kh: 'កែប' }, category: { en: 'Heritage', kh: 'បេតិកភណ្ឌ' }, image: '/images/projects/Thumbnail-9.jpg' },
            { id: '4', title: { en: 'Tech Hub Office', kh: 'ការិយាល័យ Tech Hub' }, location: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' }, category: { en: 'Corporate', kh: 'សាជីវកម្ម' }, image: '/images/projects/Thumbnail-2.jpg' }
        ]
    },
    'project-management': {
        id: 'project-management',
        title: { en: 'Project Management', kh: 'ការគ្រប់គ្រងគម្រោង' },
        subtitle: { en: 'Strategic Oversight & Expert Advisory', kh: 'ការត្រួតពិនិត្យយុទ្ធសាស្រ្ត និងការប្រឹក្សាជំនាញ' },
        heroImage: '/images/projects/Thumbnail-5.jpg',
        description: { en: 'Comprehensive oversight ensuring your project is delivered to the highest standards. We combine professional disciplined management of contractors, schedules, and costs with strategic technical insights and feasibility studies to optimize your investment value.', kh: 'ការត្រួតពិនិត្យទូលំទូលាយធានាបាននូវគម្រោងប្រគល់ដល់គុណភាពខ្ពស់។ យើងរួមបញ្ចូលការគ្រប់គ្រងអ្នកម៉ៅការសាងសង់ កាលវិភាគ និងការចំណាយជាមួយជំនាញត្រួតពិនិត្យបច្ចេកទេសដើម្បីបង្កើនតម្លៃនៃការវិនិយោគរបស់លោកអ្នក។' },
        targetAudience: { en: 'Investors and owners who need expert representation, control over complex projects, and data-driven strategic advice.', kh: 'អ្នកវិនិយោគ និងម្ចាស់គម្រោងដែលត្រូវការតំណាងវិជ្ជាជីវៈ ការគ្រប់គ្រងលើគម្រោងស្មុគស្មាញ និងការណែនាំយុទ្ធសាស្រ្តផ្ទាល់ខ្លួន។' },
        scopeOfWork: [
            { en: 'Project Planning, Scheduling & Budget Control', kh: 'ការធ្វើផែនការគម្រោង ការកំណត់ពេលវេលា និងការគ្រប់គ្រងថវិកា' },
            { en: 'Feasibility Studies & Market Analysis', kh: 'ការសិក្សាសមិទ្ធភាព និងការវិភាគទីផ្សារ' },
            { en: 'Contract Administration & Risk Management', kh: 'ការគ្រប់គ្រងកិច្ចសន្យា និងហានិភ័យ' },
            { en: 'Quality Assurance (QA/QC) & HSE Oversight', kh: 'ការធានាគុណភាព (QA/QC) និងប្រព័ន្ធសុវត្ថិភាព(HSE)' },
            { en: 'Value Engineering & Cost Optimization', kh: 'ការវាយតម្លៃវិស្វកម្ម និងការសន្សំសំចំណាយ' },
            { en: 'Regulatory Compliance Advisory', kh: 'ការអនុលោមតាមបទប្បញ្ញត្តិច្បាប់' }
        ],
        process: [
            { step: '01', title: { en: 'Consultation & Analysis', kh: 'ការប្រឹក្សា និងការវិភាគ' }, desc: { en: 'Understanding requirements, performing site data deep dives, and feasibility analysis.', kh: 'ការយល់ដឹងពីតម្រូវការ ការសិក្សាទីតាំង និងការសិក្សាសមិទ្ធភាព។' } },
            { step: '02', title: { en: 'Planning & Procurement', kh: 'ការធ្វើផែនការ និងការផ្គត់ផ្គង់' }, desc: { en: 'Defining project roadmap, budgets, baselines, and vendor selection.', kh: 'កំណត់គុណតម្លៃគម្រោង ការគ្រប់គ្រងថវិកា និងជ្រើសរើសអ្នកផ្គត់ផ្គង់។' } },
            { step: '03', title: { en: 'Execution & Advisory', kh: 'ការអនុវត្ត និងការប្រឹក្សា' }, desc: { en: 'On-site management, daily coordination, and ongoing strategic guidance.', kh: 'គ្រប់គ្រងនៅទីតាំងផ្ទាល់ សម្របសម្រួលប្រចាំថ្ងៃ និងណែនាំយុទ្ធសាស្រ្ត។' } },
            { step: '04', title: { en: 'Close-out & Reporting', kh: 'ការបញ្ចប់ និងការរាយការណ៍' }, desc: { en: 'Final accounting, documentation, and delivering actionable recommendations.', kh: 'របាយការណ៍គណនេយ្យចុងក្រោយ រៀបចំឯកសារ និងបញ្ជូនអនុសាសន៍។' } }
        ],
        benefits: [
            { title: { en: 'Informed Decisions', kh: 'ការសម្រេចចិត្តប្រកបដោយចំណេះដឹង' }, desc: { en: 'Data-driven insights to reduce investment risk effectively.', kh: 'ផ្អែកលើទិន្នន័យច្បាស់លាស់ដើម្បីកាត់បន្ថយហានិភ័យវិនិយោគប្រកបដោយប្រសិទ្ធភាព។' } },
            { title: { en: 'Budget & Cost Control', kh: 'ការគ្រប់គ្រងថវិកា និងចំណាយ' }, desc: { en: 'Detailed tracking and value engineering prevent cost overruns.', kh: 'ការតាមដានលម្អិត និងបច្ចេកទេសវិស្វកម្មតម្លៃបង្ការការចំណាយហួសកម្រិត។' } },
            { title: { en: 'Timely Quality Delivery', kh: 'ការប្រគល់ជូនទាន់ពេលវេលាដែលមានគុណភាព' }, desc: { en: 'Strict schedule enforcement and quality standards.', kh: 'អនុវត្តយ៉ាងម៉ឺងម៉ាត់តាមកម្មវិធីការងារ និងស្តង់ដារគុណភាព។' } },
            { title: { en: 'Risk & Strategy', kh: 'ហានិភ័យ និងយុទ្ធសាស្រ្ត' }, desc: { en: 'Proactive issue resolution and smooth regulatory navigation.', kh: 'ដោះស្រាយបញ្ហាយ៉ាងសកម្ម និងរុករកយ៉ាងរលូនរាល់បទប្បញ្ញត្តិដែលមានស្រាប់។' } }
        ],
        relatedProjects: [
            { id: '5', title: { en: 'Logistics Center Ph-1', kh: 'មជ្ឈមណ្ឌលភស្តុភារ ដំណាក់កាលទី ១' }, location: { en: 'Sihanoukville', kh: 'ព្រះសីហនុ' }, category: { en: 'Industrial', kh: 'ឧស្សាហកម្ម' }, image: '/images/projects/Thumbnail-7.jpg' },
            { id: '6', title: { en: 'Eco-Resort Masterplan', kh: 'ផែនការមេសណ្ឋាគារធម្មជាតិ' }, location: { en: 'Koh Kong', kh: 'កោះកុង' }, category: { en: 'Hospitality', kh: 'បដិសណ្ឋារកិច្ច' }, image: '/images/projects/Thumbnail-8.jpg' }
        ]
    }
};
