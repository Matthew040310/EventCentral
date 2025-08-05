const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface DailyStackbarData {
    _count: number;
    datumDate: Date;
    type: string;
}

export default async function DailyStackbarData(
    datumDate: Date,
): Promise<DailyStackbarData[]> {
    try {
        const response = await fetch(`${APP_BASE_PATH}/api/prisma/getDailyStackbarData`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ datumDate: datumDate }),
        })

        if (!response.ok) {
            const errorMessage = await response.json()
            throw new Error(
                `HTTP error! Status: ${response.status}.\n${errorMessage.error}`);
        }

        const result = await response.json();
        return result.response as DailyStackbarData[];

    } catch (error) {
        throw new Error(`Failed to fetch event report: ${(error as Error).message}`);
    }
}