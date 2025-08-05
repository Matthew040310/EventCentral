// createSubmission.ts
import prisma from '../dbClient';
import TRecurringDateParams from '@/types/TRecurringDateParams';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';
import { recurringDates } from '@/util/replicateEventDates';
import deleteDrafts from '../deleteDraft/deleteDrafts';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const eventDetails = body['Event Details'];
    const impactAssessment = body['Impact Assessment'];

    // If eventDetails does not have existing uuid assigned from saved draft
    // reset eventDetails.id so that Prisma will auto assign an id upon creation
    if (!eventDetails.id) {
      delete eventDetails.id;
    };

    delete eventDetails.estimatedStartDate; // Not an accepted field for submittedEvent
    let createdEventSubmission: any;
    await prisma.$transaction(async (tx) => {

      // Create event details draft in submittedEvent table
      if (eventDetails.type === "Existing") {
        // If impactAssessmentId provided, tag to parent and impact assessment
        if (impactAssessment.id) {
          eventDetails.parentid = impactAssessment.id
          eventDetails.impactAssessmentId = impactAssessment.id;
        }
        createdEventSubmission = await tx.submittedEvent.create({
          data: eventDetails
        });

        // For Migration Only
        if (!impactAssessment.id) {
          const parentEventID = createdEventSubmission.id;
          createdEventSubmission = await tx.submittedEvent.update({
            where: { id: parentEventID },
            data: {
              parentid: parentEventID,
            }
          });
        }
      }
      else {
        createdEventSubmission = await tx.submittedEvent.create({
          data: eventDetails
        });
        const parentEventID = createdEventSubmission.id;

        // Create impact assessment draft in submittedImpactAssessment Table
        impactAssessment.id = parentEventID;
        await tx.submittedImpactAssessment.create({
          data: impactAssessment
        });

        // Update newly created event submission with parentid and impactAssessmentId
        createdEventSubmission = await tx.submittedEvent.update({
          where: { id: parentEventID },
          data: {
            parentid: parentEventID,
            impactAssessmentId: parentEventID
          }
        });
      }

      // Do auto replication of event dates if eventDetails.frequency is not "One-off"
      if (eventDetails.frequency !== "One-off") {

        // Reset id so that Prisma will auto assign an id upon creation
        const { id, ...replicatedEvent } = createdEventSubmission;
        replicatedEvent.type = "Existing";

        // Get all recurring dates based on eventDetails
        const recurringDateParams = {
          startDate: new Date(eventDetails.startDate),
          endDate: new Date(eventDetails.endDate),
          frequency: eventDetails.frequency,
          frequencyInterval: eventDetails.frequencyInterval,
          ...(eventDetails.customFrequency ? { customFrequency: eventDetails.customFrequency } : {}),
          ...(eventDetails.selectedDay ? { selectedDay: eventDetails.selectedDay } : {}),
        } as TRecurringDateParams
        const dates = recurringDates(recurringDateParams);

        // Filter for original eventDetails startDate
        const originalStartDate = new Date(eventDetails.startDate).toISOString().slice(0, 10);
        const replicationDates = dates.all().filter(date => date.toISOString().slice(0, 10) !== originalStartDate);

        // Create new entry in submittedEvent table for each date
        for (let date of replicationDates) {
          replicatedEvent.eventDate = new Date(date);
          await tx.submittedEvent.create({
            data: replicatedEvent
          });
        }
      }

      // Delete draft if draft exists, using handleDelete function
      if (eventDetails.id) {
        await deleteDrafts(eventDetails.id, tx)
      };
    })

    // Returns success message if above code all successful
    return Response.json(
      { message: 'Submission successful!' }, { status: 201 }
      // No need to return id as user will be routed to /thank-you upon submission success
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Submission failed", error) },
      { status: 500 });
  }
}