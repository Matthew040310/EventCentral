import EventDetails from "src/types/IEventDetails";
import ImpactAssessment from "src/types/IImpactAssessment";
import FullEventReportParams from "src/types/IFullEventReportParams";
import EventState from "src/types/TEventState";
import getFullEventReports from "src/util/Prisma-API-handlers/getFullEventReports";

interface ExtendedEventDetails extends EventDetails {
    parentid?: string;
    impactAssessmentId?: ImpactAssessment;
}

export default async function getEventReportByID(
    eventID: string,
    state: EventState = "Draft",
): Promise<{
    eventDetails: ExtendedEventDetails;
    impactAssessment: ImpactAssessment;
}> {

    const impactAssessmentLink = state === "Submitted"
        ? "submittedImpactAssessment"
        : "draftImpactAssessment"

    const params: FullEventReportParams = {
        state: state,
        filters: {
            id: eventID
        }
    }

    try {
        const result = await getFullEventReports(params)

        let existingEventDetails = { ...result[0] };
        const existingImpactAssessment = { ...existingEventDetails[impactAssessmentLink] };

        // Parse existingEventDetails for suitable format
        delete existingEventDetails[impactAssessmentLink]; // Remove impact assessment from event details
        existingEventDetails.startDate = existingEventDetails.startDate && new Date(existingEventDetails.startDate);
        existingEventDetails.endDate = existingEventDetails.endDate && new Date(existingEventDetails.endDate);

        return {
            eventDetails: existingEventDetails as ExtendedEventDetails,
            impactAssessment: existingImpactAssessment as ImpactAssessment
        };

    } catch (error) {
        throw new Error(`Failed to fetch event report: ${(error as Error).message}`);
    }
}
