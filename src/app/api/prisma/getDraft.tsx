import prisma from './dbClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

export default async function getDraftEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Accept POST method as the filter criterias may exceed the GET limit of 2000 characters
  if (req.method !== 'POST' && req.method !== "GET") {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // If request method === POST, use filters in request body (if provided)
  // Else default to using {} (No filters)
  const filters = req.method === 'POST' ? req.body.filters : {}
  const sortby = req.method === 'POST' ? req.body.sortby : []

  try {
    const draftEvents = await prisma.draftEvent.findMany({
      where: filters,
      orderBy: sortby,
      include: { draftImpactAssessment: true }
    })

    return res.status(200).json({
      response: draftEvents
    });
  }
  catch (error: any) {
    return res.status(500).json({
      error: primsaErrorHandler("Failed to retrieve draft", error)
    });
  }
}