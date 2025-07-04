import React from 'react'
import dayjs from 'dayjs'
import { Grid, Stack, Button, Typography } from '@mui/material'
import { View, Views } from 'react-big-calendar';
import DatePicker from '@/components/DatePicker_Today';
import Legend from '@/components/Legend';

const dateHeader = (date: Date, view: View) => {
    if (view === Views.MONTH) {
        return dayjs(date).format('MMMM YYYY');
    }
    else {
        const startOfWeek = dayjs(date).startOf('week');
        const endOfWeek = dayjs(date).endOf('week');
        return `${startOfWeek.format('D MMMM')} - ${endOfWeek.format('D MMMM')}`;
    }
}

interface CalendarToolBarProps {
    datumDate: Date | null;
    setDatumDate: (date: Date | null) => void;
    selectedView: View;
    setSelectedView: (view: View) => void;
}

const CalendarToolBar: React.FC<CalendarToolBarProps> = (
    { datumDate, setDatumDate, selectedView, setSelectedView }
) =>
(
    <Grid container mt={1} alignItems={"center"}
        justifyContent={{ lg: "center", sm: "flex-start" }}
        textAlign={{ lg: "center", sm: "left" }} spacing={2} bgcolor={"white"} >
        <Grid size={1}></Grid>

        <Grid size={{ xl: 2, xs: 10 }}>
            <DatePicker
                label='Go to Date'
                datumDate={datumDate}
                setDatumDate={setDatumDate}
            />
        </Grid>

        <Grid mt={2} size={{ xl: 7, lg: 12 }}>
            <Legend width={"90%"} />
        </Grid>

        <Grid justifyContent={{ xl: "flex-end", xs: "center" }} display="flex"
            size={{ xl: 1, xs: 12 }}>
            <Stack direction="row" alignItems="center" justifyContent="center">
                <Button variant={selectedView === "month" ? 'contained' : 'outlined'}
                    onClick={() => setSelectedView(Views.MONTH)}>
                    Month
                </Button>
                <Button variant={selectedView === "week" ? 'contained' : 'outlined'}
                    onClick={() => setSelectedView(Views.WEEK)}>
                    Week
                </Button>
            </Stack>
        </Grid>

        <Grid size={1}></Grid>
        <Grid container textAlign='center' justifyContent="center" size={12}>
            <Typography variant='h6' fontSize={"3vh"} mb={1}>{dateHeader(datumDate!, selectedView)}</Typography>
        </Grid>
    </Grid>
)


export default CalendarToolBar