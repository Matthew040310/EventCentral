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

export default async function deleteSubmissionsByParentId(
    oldParentID: string,
    filters: Prisma.SubmittedEventWhereInput,
    tx?: Prisma.TransactionClient
) {
    const run = async (client: Prisma.TransactionClient) => {
        const deletedImpactAssessmentIDs = await client.submittedEvent.findMany({
            where: { parentid: oldParentID, ...filters },
            select: { impactAssessmentId: true }
        });

        await client.submittedEvent.deleteMany({
            where: { parentid: oldParentID, ...filters }
        });

        await purgeImpactAssessments(deletedImpactAssessmentIDs, client);
    };

    if (tx) {
        await run(tx);
    } else {
        await prisma.$transaction(run);
    }
}