// getDraft.ts
import prisma from '@/app/api/prisma/dbClient';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

// Handles GET requests (no filters)
export async function GET(request: Request) {
  try {
    const draftEvents = await prisma.draftEvent.findMany({
      where: {},
      orderBy: [],
      include: { draftImpactAssessment: true }
    });

    return Response.json(
      { response: draftEvents },
      { status: 200 }
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to retrieve draft", error) },
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

    const draftEvents = await prisma.draftEvent.findMany({
      where: filters,
      orderBy: sortby,
      include: { draftImpactAssessment: true }
    });

    return Response.json(
      { response: draftEvents },
      { status: 200 }
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to retrieve draft", error) },
      { status: 500 }
    );
  }
}