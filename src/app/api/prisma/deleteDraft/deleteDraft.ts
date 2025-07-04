// deleteDraft.ts
import prisma from '../dbClient';
import type { Prisma } from '@prisma/client';

export default async function deleteDrafts(
    IDs: string | string[],
    tx?: Prisma.TransactionClient
) {

    // Ensure that targetIDs format is always String[] type, even if only one TargetID is provided
    // This allows this function to be reused for multi delete and single delete
    const targetIDs = Array.isArray(IDs) ? IDs : [IDs];
    const client = tx || prisma;

    if (tx) {
        await client.draftEvent.deleteMany({
            where: { id: { in: targetIDs } }
        });
        await client.draftImpactAssessment.deleteMany({
            where: { id: { in: targetIDs } }
        });
        return;
    }

    await prisma.$transaction(async (tx) => {
        // Delete from draftEvent table
        await tx.draftEvent.deleteMany({
            where: {
                id: { in: targetIDs }
            }
        })

        // Delete from draftImpactAssessment table
        await tx.draftImpactAssessment.deleteMany({
            where: {
                id: { in: targetIDs }
            }
        })
    })
}