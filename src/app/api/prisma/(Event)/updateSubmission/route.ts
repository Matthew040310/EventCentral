// updateSubmission.ts
import prisma from '@/app/api/prisma/dbClient';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';
import TRecurringDateParams from '@/types/TRecurringDateParams';
import { UPDATE_OPTIONS } from '@/constants/EventCentralConstants';
import { recurringDates } from '@/util/replicateEventDates';
import deleteSubmissionsByParentId from './deleteSubmissionsByParentId';


// Get the buttonOptions values from the UPDATE_OPTIONS constant
const userResponses: String[] = UPDATE_OPTIONS.map(option => option.buttonOption);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const eventDetails = body['Event Details']
    const impactAssessment = body['Impact Assessment']
    const updateScope = body['Update Scope']

    const newParentEventID = eventDetails.id;
    let { id, estimatedStartDate, ...updatedEventSubmission } = eventDetails;   // "let" declaration as updatedEventSubmission will be modified later

    await prisma.$transaction(async (tx) => {
      // Create new impactAssessment for new submission
      impactAssessment.id = newParentEventID;
      await tx.submittedImpactAssessment.upsert({
        where: { id: newParentEventID },
        update: impactAssessment,
        create: impactAssessment
      });

      // Update submittedEvent details
      const originalParentEventID = eventDetails.parentid;
      updatedEventSubmission.parentid = newParentEventID;
      updatedEventSubmission.impactAssessmentId = newParentEventID;

      // Update single event
      await tx.submittedEvent.update({
        where: { id: newParentEventID },
        data: updatedEventSubmission
      });

      if (updateScope !== userResponses[0]) {
        if (eventDetails.frequency !== "One-off") {

          updatedEventSubmission.type = "Existing";

          // Determine date range scope based on user response
          const dateRangeScope = {
            eventDate: { gt: eventDetails.eventDate },
          };

          await deleteSubmissionsByParentId(originalParentEventID, dateRangeScope, tx);

          // Get all recurring dates based on eventDetails
          const recurringDateParams = {
            startDate: new Date(eventDetails.eventDate),    // We reference eventDate here because: 1) If this event is the parent event, eventDate == startDate
            endDate: new Date(eventDetails.eventDate),      //                                      2) If this event is a replication, we do not want previous events to be affected
            frequency: eventDetails.frequency,
            frequencyInterval: eventDetails.frequencyInterval,
            ...(eventDetails.customFrequency ? { customFrequency: eventDetails.customFrequency } : {}),
            ...(eventDetails.selectedDay ? { selectedDay: eventDetails.selectedDay } : {}),
          } as TRecurringDateParams
          const dates = recurringDates(recurringDateParams);

          // Filter for original eventDetails eventDate
          const originalStartDate = new Date(eventDetails.eventDate).toISOString().slice(0, 10);
          const replicationDates = dates.all().filter(date => date.toISOString().slice(0, 10) !== originalStartDate);

          for (let date of replicationDates) {
            updatedEventSubmission.eventDate = new Date(date);
            await tx.submittedEvent.create({
              data: updatedEventSubmission
            });
          }
        }

        // If response is to overwrite future events, and updated event type is "One-off"
        // Delete all future submissions with the same parentid
        else if (updateScope === userResponses[1]) {
          await deleteSubmissionsByParentId(originalParentEventID,
            { eventDate: { gt: eventDetails.eventDate } }, tx);
        }
      }
    })

    // Returns success message if all prisma transactions successful
    return Response.json(
      { message: 'Submission successfully updated!' },
      { status: 201 }
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to update submission", error) },
      { status: 500 }
    );
  }
}