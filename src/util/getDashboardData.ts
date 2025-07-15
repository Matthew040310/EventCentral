// hooks/getDashboardData.ts
import { useCallback } from 'react';
import getFullEventReports from '@/util/Prisma-API-handlers/getFullEventReports';
import { FullEventReportWithFilters } from '@/types/IFullEventReportParams';

export default function getDashboardData(prismaFilters: Partial<FullEventReportWithFilters>) {
    const getEventData = useCallback(async () => {
        try {
            const allSubmissions = await getFullEventReports({
                state: 'Submitted',
                sortby: [{ type: 'desc' }, { estimatedCohortSize: 'desc' }],
                filters: prismaFilters,
            });

            const allDrafts = await getFullEventReports({
                state: 'Draft',
                sortby: [{ type: 'desc' }, { estimatedCohortSize: 'desc' }],
                filters: prismaFilters,
            });

            return {
                submitted: allSubmissions,
                draft: allDrafts
            };
        }
        catch (error) {
            console.error('Error fetching event reports:', error);
            return { submitted: [], draft: [] };
        }
    }, [prismaFilters]);

    return getEventData;
}