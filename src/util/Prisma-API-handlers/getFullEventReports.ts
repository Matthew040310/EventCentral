import FullEventReport from "@/types/IFullEventReport";
import FullEventReportParams from "@/types/IFullEventReportParams";

export default async function getFullEventReports(
    params: FullEventReportParams,
): Promise<
    FullEventReport[] | Partial<FullEventReport>[]
> {
    // Default endpoint target is getDraft
    const targetLink = params.state === "Submitted"
        ? "/api/prisma/getSubmission"
        : "/api/prisma/getDraft"

    const HTTP_METHOD = params.filters ? 'POST' : 'GET';
    let body = {};

    if (HTTP_METHOD === 'POST') {
        let requestBody = { filters: {}, sortby: {} }
        if (params.filters) requestBody.filters = params.filters
        if (params.sortby) requestBody.sortby = params.sortby;
        body = { body: JSON.stringify(requestBody) };
    }

    try {
        const response = await fetch(targetLink, {
            method: HTTP_METHOD,
            headers: { 'Content-Type': 'application/json' },
            ...body
        })

        if (!response.ok) {
            const errorMessage = await response.json()
            throw new Error(
                `HTTP error! Status: ${response.status}.\n${errorMessage.error}`);
        }

        const result = await response.json();
        return result.response as FullEventReport[] | Partial<FullEventReport>[];

    } catch (error) {
        throw new Error(`Failed to fetch event report: ${(error as Error).message}`);
    }
}
