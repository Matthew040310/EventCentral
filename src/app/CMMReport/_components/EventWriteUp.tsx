import React from 'react'
import { useMemo, useState } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

import TitleContent from "../../../components/_EventDetailsDialog/TitleContent";
import FullEventReport from "@/types/IFullEventReport";

import dateFormatter from '@/util/dateFormatter';
import determineColor from '../../CalendarOverview/_functions/determineColor';
import sortWriteUps from '../_functions/sortWriteUp';

interface EventWriteUpProps {
    eventDetails: Partial<FullEventReport>;
    eventColor: string;
    onClick: (event: Partial<FullEventReport>) => void;
}

interface EventWriteUpSectionProps {
    eventDetailsArray: Partial<FullEventReport>[];
    onWriteUpClick: (event: Partial<FullEventReport>) => void;
}

const EventWriteUp: React.FC<EventWriteUpProps> = ({
    eventDetails,
    eventColor,
    onClick
}) => (
    <Paper sx={{
        p: 2, mb: 1,
        border: `1px solid ${eventColor}`
    }}
        onClick={() => { onClick(eventDetails) }}
        title="Click to view more details"
    >
        <TitleContent eventDetails={eventDetails} eventColor={eventColor} />

        <Box component="div" px={2} py={1}>
            {/* Event Date */}
            <Stack direction="row">
                <Typography variant="subtitle2" fontSize={15}>
                    Impact Period:
                </Typography>
                <Typography variant='subtitle2' ml={1} color="text.secondary" fontSize={15}>
                    {dateFormatter(eventDetails.startDate || null)}
                    {eventDetails.endDate && (" - ")}
                    {dateFormatter(eventDetails.endDate || null)}
                </Typography>
            </Stack>

            {/* Event Write Up */}
            <Typography variant="subtitle2" fontSize={15} color='text.secondary' mt={1}>
                {eventDetails.submittedImpactAssessment?.eventWriteUp || "No write up provided."}
            </Typography>
        </Box>
    </Paper >

)


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
                height: "79.3vh", overflowY: "auto",
            }}>

                {/* Event Write Ups */}
                {sortedEventDetailsArray.map((eventDetails, idx) => {
                    const { label, borderColor } = determineColor(eventDetails);

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

export default EventWriteUpSection