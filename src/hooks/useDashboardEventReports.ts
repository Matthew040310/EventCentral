import { useCallback, useEffect, useState } from "react";
import getDashboardData from "@/util/getDashboardData";
import FullEventReport from "@/types/IFullEventReport";
import { FullEventReportWithFilters } from '@/types/IFullEventReportParams';

export default function useDashboardEventReports(
    getFilters: () => Partial<FullEventReportWithFilters>,
    dependencies: any[]
) {
    const [submittedEventReports, setSubmittedEventReports] = useState<FullEventReport[]>([]);
    const [draftEventReports, setDraftEventReports] = useState<Partial<FullEventReport>[]>([]);

    const fetchDashboardData = useCallback(async () => {
        const PrismaFilters = getFilters();
        const { submitted, draft } = await getDashboardData(PrismaFilters);
        setSubmittedEventReports(submitted as FullEventReport[] || []);
        setDraftEventReports(draft || []);
    }, dependencies);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return {
        submittedEventReports,
        draftEventReports,
        refetch: fetchDashboardData
    };
}
