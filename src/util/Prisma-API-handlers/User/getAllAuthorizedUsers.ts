const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default async function getAllAuthorizedUsers() {
    const targetLink = `${APP_BASE_PATH}/api/prisma/getAllAuthorizedUsers`;

    try {
        const response = await fetch(targetLink, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const errorMessage = await response.json()
            throw new Error(
                `HTTP error! Status: ${response.status}.\n${errorMessage.error}`);
        }

        const result = await response.json();
        return result.response;

    } catch (error) {
        throw new Error(`Failed to fetch event report: ${(error as Error).message}`);
    }
}