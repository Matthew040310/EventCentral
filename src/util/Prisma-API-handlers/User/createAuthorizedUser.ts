import { AlertColor } from "@mui/material/Alert";
import UserDetails from "@/types/IUserDetails";

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default async function createAuthorizedUser(
    userDetails: UserDetails,
    setAlert: (alert: { open: boolean, severity: AlertColor, message: string }) => void,
) {
    const targetLink = `${APP_BASE_PATH}/api/prisma/createAuthorizedUser`;

    try {
        const response = await fetch(targetLink, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails)
        })

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