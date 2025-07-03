// Create separate API for retrieving daily stackbar data
// Uses prisma .groupby to aggregate data (other GET functions use .findMany)
// This API will handle the logic for fetching and grouping submitted events by date and type

import prisma from '../dbClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

export default async function getDailyStackbarData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // body : {datumDate: dateParam}
  const datumDate = dayjs(req.body.datumDate);
  const startOfMonth = datumDate.startOf('month').toDate();
  const endOfMonth = datumDate.endOf('month').toDate();
  const dateRange = { startDate: { gte: startOfMonth, lte: endOfMonth } }

  try {
    const dailyStackbarData = await prisma.submittedEvent.groupBy({
      by: ["startDate", "type"],
      _count: true,
      where: dateRange,
      orderBy: [{ startDate: 'asc' }],
    })

    return res.status(200).json({
      response: dailyStackbarData
    });

  }
  catch (error: any) {
    return res.status(500).json({
      error: primsaErrorHandler("Failed to retrieve Submitted Events", error)
    });
  }
}

/* 
Example of returned data
// NOTE:
// Each type of each day will return its own object and respective count
    E.g. 26 June 2025 returns two objects. It has 1 "New" event and 2 "Existing" events.
// Dates with no events will not be included
    E.g. 27 June 2025 has no events, so it is not included in the response

{"response"
  : [
      {
          "_count": 1,
          "startDate": "2025-06-26T16:00:00.000Z",
          "type": "New"
      },
      {
          "_count": 2,
          "startDate": "2025-06-26T16:00:00.000Z",
          "type": "Existing"
      },
      {
          "_count": 1,
          "startDate": "2025-06-28T16:00:00.000Z",
          "type": "Existing"
      },
      ...Other entries
    ]
}
*/