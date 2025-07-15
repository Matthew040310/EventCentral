import React from 'react'
import { Grid, Typography } from '@mui/material'
import CustomDatePicker from '@/components/CustomDatePicker'
import Legend from '@/components/Legend'
import dateFormatter from '@/util/dateFormatter'

interface SubHeaderProps {
    datumStartDate: Date | null;
    setDatumStartDate: (date: Date | null) => void;
    datumEndDate: Date | null;
    setDatumEndDate: (date: Date | null) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({
    datumStartDate,
    setDatumStartDate,
    datumEndDate,
    setDatumEndDate
}) => (
    <Grid container mt={1} alignItems={"center"}
        justifyContent={{ lg: "center", sm: "flex-start" }}
        textAlign={{ lg: "center", sm: "left" }} spacing={1} bgcolor={"white"} >

        <Grid size={1} display={{ xs: "none", md: "block" }}></Grid>

        <Grid size={{ xl: 2, md: 5, xs: 12 }}>
            <CustomDatePicker md={8}
                label={"Start Date"} required={false}
                value={datumStartDate} minSelectableDate={null}
                onChange={(date) => { setDatumStartDate(date); }}
            />
        </Grid>

        <Grid size={{ xl: 2, md: 5, xs: 12 }}>
            <CustomDatePicker md={8}
                label={"End Date"} required={false}
                value={datumEndDate} minSelectableDate={null}
                onChange={(date) => { setDatumEndDate(date); }}
            />
        </Grid>


        <Grid size={1} display={{ xs: "none", md: "block", xl: "none" }}></Grid>

        <Grid mt={2} size={{ xl: 7, lg: 12 }}>
            <Legend width={"100%"} />
        </Grid>

        <Grid size={1} display={{ xs: "none", xl: "block" }}></Grid>


        <Grid size={12}>
            <Typography variant='h6' fontSize={"3vh"} mb={1}>
                All Events From <u>{dateFormatter(datumStartDate)}</u> to <u>{dateFormatter(datumEndDate)}</u>
            </Typography>
        </Grid>
    </Grid >
)


export default SubHeader