import prisma from './dbClient';
import type { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
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

export default async function deleteDraftAPI(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await deleteDrafts(req.body["TargetIDs"])

    return res.status(200).json({
      message: `Draft successfully deleted!`,
    });
  }
  catch (error: any) {
    return res.status(500).json({
      error: primsaErrorHandler("Failed to delete draft", error)
    });
  }
}