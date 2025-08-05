import EventDetails from "@/types/IEventDetails";
import ImpactAssessment from "@/types/IImpactAssessment";
import type { AlertColor } from '@mui/material/Alert';

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

function cleanImpactAssessment(impactAssessment: ImpactAssessment): ImpactAssessment {
    // Remove unrequired fields on the backend
    if (impactAssessment.perceivedUnhappiness === "No") {
        impactAssessment.perceivedUnhappinessDetails = null;
    }

    if (impactAssessment.generateInterest === "No") {
        impactAssessment.generateInterestDetails = null;
    }

    if (impactAssessment.haveAnnouncement === "No") {
        impactAssessment.announcementTypes = [];
    }

    if (impactAssessment.haveNotification === "No") {
        impactAssessment.notificationTypes = [];
        impactAssessment.notificationDetails = null;
    }

    if (impactAssessment.haveActionRequired === "No") {
        impactAssessment.actionRequiredDetails = null;
    }

    return impactAssessment;
}

export default async function handleSubmit(
    eventDetails: EventDetails,
    impactAssessment: ImpactAssessment,
    setAlert: (alert: { open: boolean, severity: AlertColor, message: string }) => void,
    updateScope?: string
) {
    // Default api endpoint is createSubmission
    var targetLink = `${APP_BASE_PATH}/api/prisma/createSubmission`;
    var scope = {};

    // If updateScope is provided, change targetLink to updateSubmission
    // and add updateScope to the request body
    if (updateScope) {
        targetLink = `${APP_BASE_PATH}/api/prisma/updateSubmission`;
        scope = { "Update Scope": updateScope };
    };

    // Automatically modify eventDetails and impactAssessment before sending
    eventDetails.eventDate = eventDetails.startDate || eventDetails.estimatedStartDate || null;
    impactAssessment = cleanImpactAssessment(impactAssessment);

    try {
        const response = await fetch(targetLink, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Event Details": eventDetails,
                "Impact Assessment": impactAssessment,
                ...scope
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.json()
            throw new Error(
                `HTTP error! Status: ${response.status}.\n${errorMessage.error}`);
        }

        const result = await response.json();
        setAlert({ open: true, severity: 'success', message: result.message });
    }
    catch (error: any) {
        setAlert({ open: true, severity: 'error', message: error.message });
        throw error;
    }
}