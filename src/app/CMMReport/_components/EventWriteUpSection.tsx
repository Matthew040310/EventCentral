import React from 'react'
import { useMemo, useState } from 'react';
import { Button, Paper, Stack } from '@mui/material'

import EventWriteUp from './EventWriteUp';
import FullEventReport from "@/types/IFullEventReport";

import determineCategory from '@/app/CalendarOverview/_functions/determineCategory';
import sortWriteUps from '../_functions/sortWriteUp';

interface EventWriteUpSectionProps {
    eventDetailsArray: Partial<FullEventReport>[];
    onWriteUpClick: (event: Partial<FullEventReport>) => void;
}

const EventWriteUpSection: React.FC<EventWriteUpSectionProps> = ({
    eventDetailsArray,
    onWriteUpClick
}) => {
    const [sortBy, setSortBy] = useState<string>('Date');

    const sortedEventDetailsArray = useMemo(
        () => sortWriteUps(eventDetailsArray, sortBy),
        [eventDetailsArray, sortBy]
    )

    return (
        <>
            {/* Filter Buttons */}
            <Stack direction="row" pb={2} alignItems="center" justifyContent="center" bgcolor="white">
                <Button variant={sortBy === "Date" ? 'contained' : 'outlined'}
                    onClick={() => setSortBy("Date")}>
                    Sort By Date
                </Button>
                <Button variant={sortBy === "Category" ? 'contained' : 'outlined'}
                    onClick={() => setSortBy("Category")}>
                    Sort By Category
                </Button>
            </Stack>

            {/* Scrollable Paper Element */}
            <Paper sx={{
                px: 3, pt: 1, border: "1px solid lightgrey",
                flex: 1, overflowY: "auto",
                minHeight: 0, // <-- Required for flex children of a column flex parent!
            }}>

                {/* Event Write Ups */}
                {sortedEventDetailsArray.map((eventDetails, idx) => {
                    const { label, borderColor } = determineCategory(eventDetails);

                    if (label === "High Impact" || label === "New/Changes") {
                        return <EventWriteUp key={idx}
                            eventDetails={eventDetails}
                            eventColor={borderColor}
                            onClick={onWriteUpClick} />
                    }
                })}
            </Paper>
        </>
    )
}

export default EventWriteUpSection;