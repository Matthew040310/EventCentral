import React from 'react'
import { useMemo } from 'react'
import { Box } from '@mui/material'
import FullEventReport from '@/types/IFullEventReport';
import { Event_Legend } from '@/styles/theme';

import EventStatisticsCard from '@/components/EventStatisticsCard';
import eventStatistics from '@/util/summariseEventStats'

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
            <EventStatisticsCard count={eventStats.HighImpact} color={Event_Legend["High Impact"]}>
                High Impact Events
            </EventStatisticsCard>

            <EventStatisticsCard count={eventStats.Change_New} color={Event_Legend["New/Changes"]}>
                New / Changes Events
            </EventStatisticsCard>

            <EventStatisticsCard count={eventStats.Existing_MoreThan100k} color={Event_Legend["Existing >=100k"]}>
                Existing Events {">="} 100k Cohort Size
            </EventStatisticsCard>

            <EventStatisticsCard count={eventStats.Existing_LessThan100k} color={Event_Legend["Existing <100k"]}>
                Existing Events {"<"} 100k Cohort Size
            </EventStatisticsCard>

            <EventStatisticsCard count={eventStats.total} color='black'>
                Total Events
            </EventStatisticsCard>

        </Box>
    )
}

export default EventStatistics