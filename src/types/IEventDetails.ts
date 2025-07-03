export default interface EventDetails {
    id: string | null;
    type: string;
    embargoed: string | null;
    estimatedStartDate?: Date | null;           // optional field for draft events
    startDate: Date | null;
    endDate?: Date | null;                      // optional field for recurring events
    frequency: string;
    frequencyInterval?: number | null;          // optional field for recurring events
    customFrequency?: string | null;            // optional field for custom frequency
    selectedDay?: string | null;                // optional field for custom frequency (e.g., "First Monday of Month")  
    title: string;
    scheme: string;
    description: string;
    affectedCohortDescription: string;
    estimatedCohortSize: number | null;
    cluster: string | null;
    group: string | null;
    department: string | null;
    OIC: string;
    OICEmail: string;
    reportStatus: string | null;
}