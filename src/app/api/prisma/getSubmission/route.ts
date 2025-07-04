// getSubmission.ts
import prisma from '../dbClient';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

// Handles GET requests (no filters)
export async function GET(request: Request) {
  try {
    const submittedEvents = await prisma.submittedEvent.findMany({
      where: {},
      orderBy: [],
      include: { submittedImpactAssessment: true }
    });

    return Response.json(
      { response: submittedEvents },
      { status: 200 }
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to retrieve submission", error) },
      { status: 500 }
    );
  }
}

// Handles POST requests (with filters and sortby)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filters = body.filters || {};
    const sortby = body.sortby || [];

    const submittedEvents = await prisma.submittedEvent.findMany({
      where: filters,
      orderBy: sortby,
      include: { submittedImpactAssessment: true }
    });

    return Response.json(
      { response: submittedEvents },
      { status: 200 }
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to retrieve submission", error) },
      { status: 500 }
    );
  }
}