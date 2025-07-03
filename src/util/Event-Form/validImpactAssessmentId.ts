import getEventReportByID from 'src/util/Prisma-API-handlers/getEventReportByID';

export default async function validImpactAssessmentId(
    eventType: string,
    impactAssessmentId: string,
    setInvalidImpactAssessmentId: (val: boolean) => void
) {
    if (eventType === "Existing") {
        const result = await getEventReportByID(impactAssessmentId, "Submitted");
        if (!result?.impactAssessment.id) {
            setInvalidImpactAssessmentId(true);
            return false;
        }
    }
    return true;
}
