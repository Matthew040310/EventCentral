import prisma from '../dbClient';
import type { Prisma } from '@prisma/client';

// Filter unique impactAssessment IDs from the returned IDs
function filterUniqueImpactAssessmentIDs(returnedIDs: { impactAssessmentId: string | null }[]) {
    // Create unique array of impactAssessment IDs to check for deletion
    const filterIDs = new Set(
        returnedIDs
            .map(item => item.impactAssessmentId)
            .filter((id): id is string => id !== null));
    return Array.from(filterIDs);
}

async function purgeImpactAssessments(
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

export default async function deleteSubmissions(IDs: string | string[]) {

    // Ensure that targetIDs format is always String[] type, even if only one TargetID is provided
    // This allows this function to be reused for multi delete and single delete
    const targetIDs = Array.isArray(IDs) ? IDs : [IDs];

    await prisma.$transaction(async (tx) => {
        // Fetch records that will be deleted, as deleteMany does not return the deleted records
        const deletedImpactAssessmentIDs = await tx.submittedEvent.findMany({
            where: {
                id: { in: targetIDs }
            },
            select: { impactAssessmentId: true }
        })

        // Delete from submittedEvent table
        await tx.submittedEvent.deleteMany({
            where: {
                id: { in: targetIDs }
            }
        })

        await purgeImpactAssessments(deletedImpactAssessmentIDs, tx);
    })
}