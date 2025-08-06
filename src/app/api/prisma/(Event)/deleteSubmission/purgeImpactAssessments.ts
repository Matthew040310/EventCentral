// For each impactAssessmentId within returned Prisma Object,
// check if any other submittedEvent is using its submittedImpactAssessment
// If not, delete the submittedImpactAssessment. Prevent clutter in the database

import type { Prisma } from '@prisma/client';
import filterUniqueImpactAssessmentIDs from './filterUniqueImpactAssessmentIDs';

export default async function purgeImpactAssessments(
    returnedIDs: { impactAssessmentId: string | null }[],
    tx: Prisma.TransactionClient,
) {
    // Use existing client
    const client = tx;

    // Create unique array of impactAssessment IDs to check for deletion
    const uniqueIDs = filterUniqueImpactAssessmentIDs(returnedIDs);

    if (uniqueIDs.length !== 0) {
        for (let ID of uniqueIDs) {
            let recurringEvents = await client.submittedEvent.findFirst({
                where: { impactAssessmentId: ID }
            })
            // If there are no remaining submittedEvents using the impactAssessmentID
            // delete submittedImpactAssessment
            if (recurringEvents === null) {
                await client.submittedImpactAssessment.delete({
                    where: { id: ID }
                })
            }
        }
    }
}