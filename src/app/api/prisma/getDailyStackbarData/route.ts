// Create separate API for retrieving daily stackbar data
// Uses prisma .groupby to aggregate data (other GET functions use .findMany)
// This API will handle the logic for fetching and grouping submitted events by date and type

// getDailyStackbarData.ts
import prisma from '../dbClient';
import dayjs from 'dayjs';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

export async function POST(request: Request) {

  try {
    const body = await request.json();

    // body : {datumDate: dateParam}
    const datumDate = dayjs(body.datumDate);
    const startOfMonth = datumDate.startOf('month').toDate();
    const endOfMonth = datumDate.endOf('month').toDate();
    const dateRange = { eventDate: { gte: startOfMonth, lte: endOfMonth } }

    const dailyStackbarData = await prisma.submittedEvent.groupBy({
      by: ["eventDate", "type"],
      _count: true,
      where: dateRange,
      orderBy: [{ eventDate: 'asc' }],
    })

    return Response.json(
      { response: dailyStackbarData },
      { status: 200 }
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to retrieve Submitted Events", error) },
      { status: 500 }
    );
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
          "eventDate": "2025-06-26T16:00:00.000Z",
          "type": "New"
      },
      {
          "_count": 2,
          "eventDate": "2025-06-26T16:00:00.000Z",
          "type": "Existing"
      },
      {
          "_count": 1,
          "eventDate": "2025-06-28T16:00:00.000Z",
          "type": "Existing"
      },
      ...Other entries
    ]
}
*/