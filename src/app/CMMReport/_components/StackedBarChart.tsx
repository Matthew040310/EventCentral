import React, { useMemo } from 'react';
import dayjs from 'dayjs';

import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography } from '@mui/material';
import categoriseMonthlyEvents from '../_functions/categoriseMonthlyEvents';

import useDashboardEventReports from '@/hooks/useDashboardEventReports';

const xAxisLabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", " Oct", "Nov", "Dec"];

interface StackedBarChartProps {
    datumDate: Date;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
    datumDate
}) => {
    const year = dayjs(datumDate).year()

    // Custom Hook to fetch Event Reports
    const { submittedEventReports } = useDashboardEventReports(
        () => {
            const startOfYear = dayjs(datumDate).startOf('year').toDate();
            const endOfYear = dayjs(datumDate).endOf('year').toDate();
            return { startDate: { gte: startOfYear, lte: endOfYear } }
        }, [year]);

    const { HighImpact, Change_New, Existing } = useMemo(() => {
        return categoriseMonthlyEvents(submittedEventReports);
    }, [submittedEventReports]);

    return (
        <>
            <Typography variant="h6" sx={{ fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center", my: 2 }}>
                Events Overview for {dayjs(datumDate).format('YYYY')}
            </Typography>

            <Box component="div"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50vh",
                }}>

                <BarChart
                    xAxis={[{ data: xAxisLabel, label: 'Month', labelStyle: { fontSize: 16 } }]}
                    yAxis={[{ label: 'Number of Events', labelStyle: { fontSize: 16 } }]}
                    grid={{ horizontal: true }}
                    series={
                        [
                            { ...HighImpact },
                            { ...Change_New },
                            { ...Existing },
                        ]}
                />
            </Box >

        </>
    );
}

export default StackedBarChart;