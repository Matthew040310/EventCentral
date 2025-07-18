import React from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'

import TitleContent from "@/components/_EventDetailsDialog/TitleContent";
import FullEventReport from "@/types/IFullEventReport";

import dateFormatter from '@/util/dateFormatter';

interface EventWriteUpProps {
    eventDetails: Partial<FullEventReport>;
    eventColor: string;
    onClick: (event: Partial<FullEventReport>) => void;
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
    </Paper>

)

export default EventWriteUp;