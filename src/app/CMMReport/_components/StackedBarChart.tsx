import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography } from '@mui/material';

// Components
import Legend from '@/components/Legend';
// Functions
import categoriseMonthlyEvents from '../_functions/categoriseMonthlyEvents';
import useDashboardEventReports from '@/hooks/useDashboardEventReports';

const xAxisProps = {
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", " Oct", "Nov", "Dec"],
    label: 'Month',
    labelStyle: { fontSize: 16 }
}

const yAxisProps = {
    label: 'Number of Events',
    labelStyle: { fontSize: 16 },
    min: 0, tickMinStep: 1,
}

interface StackedBarChartProps {
    datumDate: Date;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
    datumDate
}) => {
    const year = dayjs(datumDate).year()
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["High Impact", "New/Changes"]);

    // Custom Hook to fetch Event Reports
    const { submittedEventReports } = useDashboardEventReports(
        () => {
            const startOfYear = dayjs(datumDate).startOf('year').toDate();
            const endOfYear = dayjs(datumDate).endOf('year').toDate();
            return { eventDate: { gte: startOfYear, lte: endOfYear } }
        }, [year]);

    const { HighImpact, Change_New, Existing_MoreThan100k, Existing_LessThan100k } = useMemo(() => {
        return categoriseMonthlyEvents(submittedEventReports);
    }, [submittedEventReports]);

    const shownData = useMemo(() => {
        const arr = [];
        if (selectedCategories.includes("High Impact")) arr.push({ ...HighImpact });
        if (selectedCategories.includes("New/Changes")) arr.push({ ...Change_New });
        if (selectedCategories.includes("Existing >=100k")) arr.push({ ...Existing_MoreThan100k });
        if (selectedCategories.includes("Existing <100k")) arr.push({ ...Existing_LessThan100k });

        // Default to showing all categories if none are selected
        if (arr.length === 0) {
            return [
                { ...HighImpact },
                { ...Change_New },
                { ...Existing_MoreThan100k },
                { ...Existing_LessThan100k }
            ]
        }

        return arr;
    }, [submittedEventReports, selectedCategories]);

    return (
        <>
            <Typography variant="h6" sx={{ fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center", my: 2 }}>
                Events Overview for {dayjs(datumDate).format('YYYY')}
            </Typography>

            <Legend
                width="100%"
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                noDraftChip={true}
                showExplaination={false} />

            <Box component="div"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "500px",
                }}>

                <BarChart
                    xAxis={[xAxisProps]}
                    yAxis={[yAxisProps]}
                    grid={{ horizontal: true }}
                    hideLegend={true}
                    series={shownData}
                />
            </Box >

        </>
    );
}

export default StackedBarChart;