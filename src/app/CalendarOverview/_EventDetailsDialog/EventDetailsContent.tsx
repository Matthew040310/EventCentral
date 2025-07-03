import React, { useEffect, useMemo, useState } from 'react';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { Person, Email } from '@mui/icons-material';
import FullEventReport from '@/types/IFullEventReport';
import TRecurringDateParams from '@/types/TRecurringDateParams';

import getChildrenEvents from '@/util/Prisma-API-handlers/getChildrenEvents';
import dateFormatter from '@/util/dateFormatter';
import { lastRecurringDate } from '@/util/replicateEventDates';

import { TypographyS2 } from './DialogComponents';

const EventDetailsContent = ({ eventDetails }: { eventDetails: Partial<FullEventReport> }) => {
    const { parentid, startDate, endDate, frequency, frequencyInterval, customFrequency, selectedDay,
        scheme, cluster, group, department, description,
        affectedCohortDescription, estimatedCohortSize, reportStatus,
        OIC, OICEmail
    } = eventDetails;

    const [childrenCount, setChildrenCount] = useState(0);

    useEffect(() => {
        const fetchChildrenCount = async () => {
            const count = await getChildrenEvents(parentid as string, startDate as Date);
            setChildrenCount(count);
        }
        fetchChildrenCount();
    }, [parentid, startDate]);

    const recurrenceMessage = useMemo(() => {
        if (endDate) {
            const recurringDateParams = {
                startDate: new Date(startDate || ""),
                endDate: new Date(endDate || ""),
                frequency: frequency,
                frequencyInterval: frequencyInterval,
                ...(customFrequency ? { customFrequency: customFrequency } : {}),
                ...(selectedDay ? { selectedDay: selectedDay } : {}),
            } as TRecurringDateParams

            const message = lastRecurringDate(recurringDateParams)["recurringResult"]
            return `(${message.split("until")[0].trim()})`;
        }
        return "";
    }, [startDate, endDate, frequency, frequencyInterval, customFrequency, selectedDay]);

    return (
        <Grid container spacing={2}>
            {/* Left Content */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TypographyS2 mt={0}>Event Period</TypographyS2>
                <Typography>
                    {dateFormatter(startDate || null)}
                    {endDate && (" - ")}
                    {dateFormatter(endDate || null)}
                </Typography>
                <TypographyS2>
                    Frequency <Box component="i" sx={{ mx: 0.5 }}>{recurrenceMessage}</Box>
                </TypographyS2>
                <Typography component="span">
                    {frequency}
                    {childrenCount > 0 && (
                        <Chip variant="outlined" color="secondary" size="small" sx={{ ml: 1 }}
                            label={`${childrenCount} more upcoming`} />
                    )}
                </Typography>
                <TypographyS2>Scheme</TypographyS2>
                <Typography>{scheme}</Typography>
                <TypographyS2>Cluster / Group / Department</TypographyS2>
                <Typography>{cluster} / {group} / {department}</Typography>
            </Grid>
            {/* Right Content */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TypographyS2 mt={0}>Description</TypographyS2>
                <Typography>{description}</Typography>
                <TypographyS2>Affected Cohort</TypographyS2>
                <Typography>{affectedCohortDescription}</Typography>
                <TypographyS2>Estimated Cohort Size</TypographyS2>
                <Typography>{estimatedCohortSize?.toLocaleString()}</Typography>
                <TypographyS2>Report Status</TypographyS2>
                <Typography>{reportStatus}</Typography>
            </Grid>
            {/* Contact Details */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                    <Person color="action" />
                    <TypographyS2 mt={0}>OIC: </TypographyS2>
                </Stack>
                <Typography>{OIC}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                    <Email color="action" />
                    <TypographyS2 mt={0}>OIC Email</TypographyS2>
                </Stack>
                <Typography>{OICEmail}</Typography>
            </Grid>
        </Grid>
    );
}

export default EventDetailsContent