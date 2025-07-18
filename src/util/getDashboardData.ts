import getFullEventReports from '@/util/Prisma-API-handlers/getFullEventReports';
import { FullEventReportWithFilters } from '@/types/IFullEventReportParams';

export default function getDashboardData(prismaFilters: Partial<FullEventReportWithFilters>) {
    return async () => {
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
    }
}