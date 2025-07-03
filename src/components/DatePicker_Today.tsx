import React from 'react'
import dayjs from 'dayjs'
import { Button, Grid, Stack } from '@mui/material'
import CustomDatePicker from './CustomDatePicker'

interface DatePicker_TodayProps {
    label: string;
    datumDate: Date | null;
    setDatumDate: (date: Date | null) => void;
    minSelectableDate?: Date;
}

const DatePicker_Today: React.FC<DatePicker_TodayProps> = ({
    label,
    datumDate,
    setDatumDate,
    minSelectableDate = null
}) => (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={{ xl: 2, lg: 0 }}>
        <CustomDatePicker md={8}
            label={label} required={false}
            value={datumDate} minSelectableDate={minSelectableDate}
            onChange={(date) => { setDatumDate(date); }}
        />
        <Grid
            alignItems="center"
            justifyContent={{ md: "flex-end", xs: "flex-start" }}
            ml={{ xs: 2 }} mt={{ xs: 1.5 }}
            display="flex"
            size={{ lg: 3, md: 4, xs: 3 }}>
            <Button variant='contained' size='large' onClick={() => { setDatumDate(dayjs().toDate()) }}>Today</Button>
        </Grid>
    </Stack>
)


export default DatePicker_Today