import prisma from '@/app/api/prisma/dbClient';
import type { Prisma } from '@prisma/client';
import purgeImpactAssessments from '../deleteSubmission/purgeImpactAssessments';

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