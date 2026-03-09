import React from 'react';
import prisma from '@/lib/prisma';
import AboutPageView from './_components/AboutPageView';

export default async function AboutUsPage() {
    // Fetch dynamic data from database
    const systemSettings = await (prisma as any).systemSetting.findMany({
        where: {
            key: {
                in: ['about_story', 'about_values', 'company_stats', 'about_milestones']
            }
        }
    });

    const storySetting = systemSettings.find((s: any) => s.key === 'about_story');
    const valuesSetting = systemSettings.find((s: any) => s.key === 'about_values');
    const statsSetting = systemSettings.find((s: any) => s.key === 'company_stats');
    const milestonesSetting = systemSettings.find((s: any) => s.key === 'about_milestones');

    // Fetch org chart structure
    const rootOrgUnit = await prisma.orgUnit.findFirst({
        where: { parentId: null },
        include: {
            employee: true,
            children: {
                include: {
                    employee: true,
                    children: {
                        include: {
                            employee: true,
                            children: {
                                include: {
                                    employee: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    // Simple mapping for AboutPageView
    const mappedAboutData = {
        story: storySetting?.value || null,
        values: valuesSetting?.value || []
    };

    // Helper to recursively map org units to the frontend's expected format
    function mapOrgNode(unit: any): any {
        if (!unit) return null;
        return {
            name: unit.employee?.name || unit.title,
            role: { en: unit.employee?.role || unit.title, kh: unit.employee?.roleKm || unit.title },
            image: unit.employee?.image,
            phone: unit.employee?.phone,
            type: unit.type.toLowerCase(),
            children: unit.children?.map((child: any) => mapOrgNode(child)) || []
        };
    }

    const mappedOrgChart = rootOrgUnit ? mapOrgNode(rootOrgUnit) : null;

    return (
        <AboutPageView
            initialAboutData={mappedAboutData.story ? mappedAboutData : null}
            initialOrgChart={mappedOrgChart}
            initialMilestones={milestonesSetting?.value}
            initialStats={statsSetting?.value}
        />
    );
}
