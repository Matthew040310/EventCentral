import React from 'react'
import { useMemo } from 'react'
import { Box } from '@mui/material'
import FullEventReport from '@/types/IFullEventReport';
import { Event_Legend } from '@/styles/theme';

import EventStatisticsCard from './EventStatisticsCard';
import eventStatistics from '../_functions/summariseEventStats'

interface EventStatisticsProps {
    submittedEventReports: Partial<FullEventReport>[];
}

const EventStatistics: React.FC<EventStatisticsProps> = ({
    submittedEventReports
}) => {
    const eventStats = useMemo(() => {
        return eventStatistics(submittedEventReports)
    }, [submittedEventReports])

    return (
        <Box sx={{
            p: 2, flexDirection: 'row',
            display: 'flex', justifyContent: 'space-evenly', alignItems: 'stretch',
        }}>
            <EventStatisticsCard count={eventStats.highImpact} color={Event_Legend["High Impact"]}>
                High Impact Events
            </EventStatisticsCard>

            <EventStatisticsCard count={eventStats.newChanges} color={Event_Legend["New/Changes"]}>
                New / Changes Events
            </EventStatisticsCard>

            <EventStatisticsCard count={eventStats.existing} color={Event_Legend["Existing"]}>
                Existing Events
            </EventStatisticsCard>

            <EventStatisticsCard count={eventStats.total}>
                Total Submitted Events
            </EventStatisticsCard>

        </Box>
    )
}

export default EventStatistics