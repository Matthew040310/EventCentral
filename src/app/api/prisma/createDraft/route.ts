import prisma from '../dbClient';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

// createDraft.ts
export async function POST(request: Request) {
  try {
    // If method is not POST, immediately return error
    const body = await request.json();

    const eventDetails = body['Event Details'];
    const impactAssessment = body['Impact Assessment'];

    delete eventDetails.id;
    let parentEventID = "";
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

    return Response.json(
      { message: 'Draft successfully saved!', id: parentEventID }, { status: 201 }
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to create draft", error) },
      { status: 500 });
  }
}