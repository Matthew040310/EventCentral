// Filter unique impactAssessment IDs from the returned IDs
export default function filterUniqueImpactAssessmentIDs(returnedIDs: { impactAssessmentId: string | null }[]) {
    // Create unique array of impactAssessment IDs to check for deletion
    const filterIDs = new Set(
        returnedIDs
            .map(item => item.impactAssessmentId)
            .filter((id): id is string => id !== null));
    return Array.from(filterIDs);
}