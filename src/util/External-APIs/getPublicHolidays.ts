//API Source for Singapore Public Holidays: https://data.gov.sg/collections/691/view
interface HolidayIdAPIResponse {
    data: {
        collectionMetadata: {
            childDatasets: string[]
        }
    }
}

interface PublicHolidayRecord {
    date: string,
    day: string,
    holiday: string
}

interface PublicHoliday {
    result: {
        records: PublicHolidayRecord[]
    }
}

async function getHolidaysCollectionID(): Promise<String[]> {
    const publicHolidayCollectionId = "691"
    const publicHolidayCollectionURL = `https://api-production.data.gov.sg/v2/public/api/collections/${publicHolidayCollectionId}/metadata`

    try {
        const response = await fetch(publicHolidayCollectionURL)
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const data: HolidayIdAPIResponse = await response.json()
        return data.data.collectionMetadata.childDatasets
    } catch (error) {
        console.error('Error fetching data:', error)
        return [];
    }
}

export async function getPublicHolidays(
    year?: string
): Promise<PublicHolidayRecord[]> {
    let allPublicHolidays: PublicHolidayRecord[] = [];
    const holidaysCollectionIDs = await getHolidaysCollectionID();

    if (holidaysCollectionIDs?.length) {
        for (const ID of holidaysCollectionIDs) {
            const targetURL = `https://data.gov.sg/api/action/datastore_search?resource_id=${ID}`

            try {
                const response = await fetch(targetURL)
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const data: PublicHoliday = await response.json()

                if (year) {
                    // If year is provided, check first record's date
                    const firstRecordDate = data.result.records[0]?.date
                    if (firstRecordDate?.startsWith(year)) {
                        allPublicHolidays.push(...data.result.records)
                        break
                    }
                } else {
                    // No year filter - include all
                    allPublicHolidays.push(...data.result.records)
                }
            } catch (error) {
                throw new Error(`Error fetching data: ${error}`)
            }
        }
    }

    if (allPublicHolidays.length === 0) { throw new Error("No public holidays data found for the specified year.") }
    else return allPublicHolidays;
}