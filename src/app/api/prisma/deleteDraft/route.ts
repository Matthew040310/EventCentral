// deleteDraft.ts
import prisma from '../dbClient';
import type { Prisma } from '@prisma/client';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

// Seperate database delete and API call logic
// So that the database delete function can be reused without API call (e.g. By createSubmission)
export async function deleteDrafts(
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

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    await deleteDrafts(body["TargetIDs"])

    return Response.json(
      { message: "Draft successfully deleted!" },
      { status: 200 }
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to delete draft", error) },
      { status: 500 }
    );
  }
}