import EventDetails from "src/types/IEventDetails";
import ImpactAssessment from "src/types/IImpactAssessment";
import router from 'next/router'; // To enable after all functions completed
import type { AlertColor } from '@mui/material/Alert';

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
    var targetLink = "/api/prisma/createSubmission";
    var scope = {};

    // If updateScope is provided, change targetLink to updateSubmission
    // and add updateScope to the request body
    if (updateScope) {
        targetLink = "/api/prisma/updateSubmission";
        scope = { "Update Scope": updateScope };
    };

    impactAssessment = cleanImpactAssessment(impactAssessment);
    let requestBody = {
        "Event Details": eventDetails,
        "Impact Assessment": impactAssessment,
        ...scope
    }

    try {
        const response = await fetch(targetLink, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorMessage = await response.json()
            throw new Error(
                `HTTP error! Status: ${response.status}.\n${errorMessage.error}`);
        }

        const result = await response.json();
        setAlert({ open: true, severity: 'success', message: result.message });
        // To enable after all functions completed
        // router.push('/');
    } catch (error: any) {
        setAlert({ open: true, severity: 'error', message: error.message });
        throw error;
    }
}
