import FullEventReportParams from "@/types/IFullEventReportParams";
import getFullEventReports from "@/util/Prisma-API-handlers/getFullEventReports";

export default async function getChildrenEvents(
    parentid: string,
    startDate: Date,
): Promise<number> {

    const params: FullEventReportParams = {
        state: "Submitted",
        filters: {
            parentid: parentid,
            startDate: { gt: startDate }
        }
    }

    try {
        const result = await getFullEventReports(params)
        return result.length;
    }
    catch (error) {
        throw new Error(`Failed to fetch event report: ${(error as Error).message}`);
    }
}