import EventDetails from '@/types/IEventDetails';
import ImpactAssessment from '@/types/IImpactAssessment';
import getEventReportByID from '@/util/Prisma-API-handlers/Event/getEventReportByID';

export default async function validImpactAssessmentId(
    eventDetails: EventDetails,
    impactAssessment: ImpactAssessment,
    setInvalidImpactAssessmentId: (val: boolean) => void
): Promise<boolean> {
    if (eventDetails.type === "Existing" && impactAssessment.id) {
        const result = await getEventReportByID(impactAssessment.id as string, "Submitted");
        if (!result?.impactAssessment.id) {
            setInvalidImpactAssessmentId(true);
            return false
        }
    }
    return true
}