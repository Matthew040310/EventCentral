import prisma from './dbClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

export default async function createDraft(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // If method is not POST, immediately return error
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const eventDetails = req.body['Event Details'];
  const impactAssessment = req.body['Impact Assessment']

  delete eventDetails.id;
  let parentEventID = "";
  try {
    await prisma.$transaction(async (tx) => {

      // Create event details draft in draftEvent table
      const createdEventDraft = await tx.draftEvent.create({
        data: eventDetails
      });

      // Auto generated parentEventID to update impactAssessmentId and return thereafter
      parentEventID = createdEventDraft.id

      // Create impact assessment draft in draftImpactAssessment Table
      // Need to create even if deleting later (when type == recurring) due Foreign Key constraints
      impactAssessment.id = impactAssessment.id || parentEventID;
      await tx.draftImpactAssessment.create({
        data: impactAssessment
      });

      await tx.draftEvent.update({
        where: { id: parentEventID },
        data: {
          impactAssessmentId: impactAssessment.id     // Update event details draft's impactAssessmentId
        }
      });

      // If event type is "Existing", delete impact assessment draft.
      // Will be tagged to existing impact assessment submission in handleSubmit
      if (eventDetails.type === "Existing") {
        await tx.draftImpactAssessment.delete({
          where: { id: impactAssessment.id }
        })
      };
    })

    return res.status(201).json({
      message: 'Draft successfully saved!',
      id: parentEventID
    });
  }
  catch (error: any) {
    return res.status(500).json({
      error: primsaErrorHandler("Failed to create draft", error)
    });
  }
}