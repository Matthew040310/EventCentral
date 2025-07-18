import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography } from '@mui/material';

const xAxisLabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", " Oct", "Nov", "Dec"];

const NEW_2025 = {
    data: [3, 1, 4, 2, 1, 3, 2, 4, 5, 1, 2, 3],
    label: "New",
    stack: '2025',
    color: 'Orange'
};
const CHANGE_2025 = {
    data: [2, 1, 4, 2, 1, 3, 2, 4, 5, 1, 2, 3],
    label: "Existing with Change",
    stack: '2025',
    color: 'Blue'
};
const EXISTING_2025 = {
    data: [3, 1, 4, 2, 1, 3, 2, 4, 5, 1, 2, 3],
    label: "Existing",
    stack: '2025',
    color: 'Grey'
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
                            { ...EXISTING_2025 },
                            { ...CHANGE_2025 },
                            { ...NEW_2025 },
                        ]}
                />
            </Box >

        </>
    );
}

export default StackedBarChart;