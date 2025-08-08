import FullEventReportParams from "@/types/IFullEventReportParams";
import getFullEventReports from "@/util/Prisma-API-handlers/Event/getFullEventReports";

export default async function getChildrenEvents(
    parentid: string,
    eventDate: Date,
): Promise<number> {

    const params: FullEventReportParams = {
        state: "Submitted",
        filters: {
            parentid: parentid,
            eventDate: { gt: eventDate }
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