import EventDetails from "@/types/IEventDetails";
import ImpactAssessment from "@/types/IImpactAssessment";

export default function fieldsValid(
    eventDetails: EventDetails,
    impactAssessment: ImpactAssessment,
): boolean {
    if (eventDetails.type === "Existing") {
        return eventDetailsValid(eventDetails);
    }
    return eventDetailsValid(eventDetails) &&
        impactAssessmentValid(impactAssessment);
}

function eventDetailsValid(
    eventDetails: EventDetails,
): boolean {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let requiredFieldsValid = Boolean(
        eventDetails.type &&
        eventDetails.embargoed &&
        eventDetails.startDate &&
        eventDetails.frequency &&
        eventDetails.title &&
        eventDetails.scheme &&
        eventDetails.description &&
        eventDetails.affectedCohortDescription &&
        eventDetails.estimatedCohortSize &&
        eventDetails.cluster &&
        eventDetails.group &&
        eventDetails.department &&
        eventDetails.OIC &&
        eventDetails.OICEmail
        // && eventDetails.reportStatus
    )

    function nonAdHocFieldsValid(): boolean {
        if (eventDetails.frequency === "Custom") {
            return Boolean(
                (eventDetails.endDate && eventDetails.endDate > new Date()) &&
                eventDetails.frequencyInterval &&
                eventDetails.customFrequency &&
                eventDetails.selectedDay)
        }
        else if (eventDetails.frequency !== "One-off") {
            return Boolean(
                (eventDetails.endDate && eventDetails.endDate > new Date()) &&
                eventDetails.frequencyInterval)
        }
        return Boolean(eventDetails?.startDate);
    }

    return requiredFieldsValid && nonAdHocFieldsValid()
}

function impactAssessmentValid(
    impactAssessment: ImpactAssessment,
): boolean {
    return Boolean(
        (impactAssessment.perceivedUnhappiness === "Yes"
            ? impactAssessment.perceivedUnhappinessDetails
            : impactAssessment.perceivedUnhappiness) &&

        (impactAssessment.generateInterest === "Yes"
            ? impactAssessment.generateInterestDetails
            : impactAssessment.generateInterest) &&

        (impactAssessment.haveAnnouncement === "Yes"
            ? impactAssessment.announcementTypes!.length != 0
            : impactAssessment.haveAnnouncement) &&

        (impactAssessment.haveNotification === "Yes"
            ? impactAssessment.notificationTypes!.length != 0 && impactAssessment.notificationDetails
            : impactAssessment.haveNotification) &&

        (impactAssessment.haveActionRequired === "Yes"
            ? impactAssessment.actionRequiredDetails
            : impactAssessment.haveActionRequired) &&

        (impactAssessment.dataInsightDetails &&
            impactAssessment.initiativesDetails &&
            impactAssessment.eventWriteUp)
    );
}   