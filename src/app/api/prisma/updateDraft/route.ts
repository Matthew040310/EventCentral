// updateDraft.ts
import prisma from '../dbClient';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const eventDetails = body['Event Details']
    const impactAssessment = body['Impact Assessment']

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
    return Response.json(
      { message: 'Draft successfully updated!' },
      { status: 201 }
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to update draft", error) },
      { status: 500 }
    );
  }
}