import type { AlertColor } from '@mui/material/Alert';
import EventState from 'src/types/TEventState';

export default async function handleDelete(
    eventID: string | string[] | null,
    setAlert: (alert: { open: boolean, severity: AlertColor, message: string }) => void,
    state: EventState = "Draft",
) {
    // Default endpoint target is deleteDraft
    const targetLink = state === "Draft"
        ? "/api/prisma/deleteDraft"
        : "/api/prisma/deleteSubmission"

    try {
        const response = await fetch(targetLink, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "TargetIDs": eventID,
            }),
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
