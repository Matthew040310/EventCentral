import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography } from '@mui/material';
import { Event_Legend } from '@/styles/theme';

const xAxisLabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", " Oct", "Nov", "Dec"];

const HighImpact = {
    data: [3, 1, 4, 2, 1, 3, 2, 4, 5, 1, 2, 3],
    stack: "total",
    label: "High Impact",
    color: Event_Legend["High Impact"]
};
const Change_New = {
    data: [2, 1, 4, 2, 1, 3, 2, 4, 5, 1, 2, 3],
    stack: "total",
    label: "Change / New",
    color: Event_Legend["New/Changes"]
};
const Existing = {
    data: [3, 1, 4, 2, 1, 3, 2, 4, 5, 1, 2, 3],
    stack: "total",
    label: "Existing",
    color: Event_Legend["Existing"]
};

const StackedBarChart: React.FC = () => {

    return (
        <>
            <Typography variant="h6" sx={{ fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center", my: 2 }}>2025</Typography>

            <Box component="div"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50vh",
                }}>

                <BarChart
                    xAxis={[{ data: xAxisLabel, label: 'Date', }]}
                    yAxis={[{ label: 'Number of Events' }]}
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