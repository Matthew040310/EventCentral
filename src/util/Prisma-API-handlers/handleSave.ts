import EventDetails from "@/types/IEventDetails";
import ImpactAssessment from "@/types/IImpactAssessment";
import type { AlertColor } from '@mui/material/Alert';

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

type SectionMap = {
    // formSection    : fieldName types
    "Event Details": EventDetails;
    "Impact Assessment": ImpactAssessment;
};

export default async function handleSave(
    eventDetails: EventDetails,
    impactAssessment: ImpactAssessment,
    updateId: <S extends keyof SectionMap>(formSection: S) => (fieldName: keyof SectionMap[S]) => (
        newValue: string | string[] | number | Date | null
    ) => void,
    setAlert: (alert: { open: boolean, severity: AlertColor, message: string }) => void,
) {
    const targetLink = (eventDetails.id)
        ? `${APP_BASE_PATH}/api/prisma/updateDraft`
        : `${APP_BASE_PATH}/api/prisma/createDraft`;

    try {
        const response = await fetch(targetLink, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Event Details": eventDetails,
                "Impact Assessment": impactAssessment
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.json()
            throw new Error(
                `HTTP error! Status: ${response.status}.\n${errorMessage.error}`);
        }

        const result = await response.json();
        setAlert({ open: true, severity: 'success', message: result.message });

        // If createDraft endpoint was used, update entry's id
        if (targetLink === `${APP_BASE_PATH}/api/prisma/createDraft`) {
            updateId("Event Details")("id")(result.id)
            if (eventDetails.type !== "Existing") {
                updateId("Impact Assessment")("id")(result.id)
            }
        }
    } catch (error: any) {
        setAlert({ open: true, severity: 'error', message: error.message });
        throw error;
    }
}
