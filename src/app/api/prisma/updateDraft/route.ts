import prisma from '../dbClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

export default async function updateDrafts(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const eventDetails = req.body['Event Details']
  const impactAssessment = req.body['Impact Assessment']

  try {
    await prisma.$transaction(async (tx) => {
      // Update event details draft in draftEvent Table
      await tx.draftEvent.update({
        where: { id: eventDetails.id },
        data: eventDetails
      });

      // Try update impact assessment draft in draftImpactAssessment Table
      if (eventDetails.type !== "Existing") {
        impactAssessment.id = eventDetails.id;
        await tx.draftImpactAssessment.upsert({
          where: { id: eventDetails.id },
          update: impactAssessment,
          create: impactAssessment,
        });

        // If eventDetails does not have an impactAssessmentId i.e. Was saved as recurring event, but now is not, 
        // Update impactAssessmentId to tag to created impactAssessmentDraft
        if (!eventDetails.impactAssessmentId) {
          await tx.draftEvent.update({
            where: { id: eventDetails.id },
            data: { impactAssessmentId: eventDetails.id }
          });
        }
      }
    })

    // Returns success message if all prisma transactions successful
    return res.status(201).json({
      message: 'Draft successfully updated!',
    });
  }
  catch (error: any) {
    return res.status(500).json({
      error: primsaErrorHandler("Failed to update draft", error)
    });
  }
}