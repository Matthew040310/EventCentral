// Seperate database delete and API call logic
// So that the database delete function can be reused without API call
import prisma from '../../dbClient';
import purgeImpactAssessments from './purgeImpactAssessments';

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