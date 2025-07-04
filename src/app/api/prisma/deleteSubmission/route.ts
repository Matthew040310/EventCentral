// deleteSubmission.ts
import prisma from '../dbClient';
import type { Prisma } from '@prisma/client';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

// Filter unique impactAssessment IDs from the returned IDs
function filterUniqueImpactAssessmentIDs(returnedIDs: { impactAssessmentId: string | null }[]) {
  // Create unique array of impactAssessment IDs to check for deletion
  const filterIDs = new Set(
    returnedIDs
      .map(item => item.impactAssessmentId)
      .filter((id): id is string => id !== null));
  return Array.from(filterIDs);
}

// For each impactAssessmentId within returned Prisma Object,
// check if any other submittedEvent is using its submittedImpactAssessment
// If not, delete the submittedImpactAssessment. Prevent clutter in the database
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

// Separate database delete and API call logic
// So that the database delete function can be reused without API call
export async function deleteSubmissions(IDs: string | string[]) {

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

export async function deleteSubmissionsByParentId(
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

export async function DELETE(request: Request) {

  try {
    const body = await request.json();
    await deleteSubmissions(body["TargetIDs"])

    return Response.json(
      { message: "Submission(s) successfully deleted!" },
      { status: 200 }
    )
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to delete submission", error) },
      { status: 500 }
    );
  }
}