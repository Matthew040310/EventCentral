import Link from 'next/link'
import { Button, Grid, Typography } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'

const CalendarHeader = () => (
    <Grid container pb={1.5} alignItems={"center"}
        justifyContent={{ xs: "center", sm: "flex-start" }}
        textAlign={{ xs: "center", sm: "left" }} spacing={2} >
        <Grid display={{ xs: "none", sm: "block" }} size={{ sm: 1 }}></Grid>

        <Grid size={{ sm: 5, xs: 12 }} mt={3}>
            <Typography variant='h6' fontSize={20}>Welcome to EventCentral</Typography>
            <Typography variant='body2'>Your centralised event tracking and forecasting system</Typography>
        </Grid>

        <Grid mt={1.5} justifyContent={"flex-end"} display="flex" size={{ sm: 5 }}>
            <Link href="/EDC-Submission-Form">
                <Button variant="contained" startIcon={<AddCircleOutline />} sx={{ '&:hover': { bgcolor: '#46866F' }, }}>
                    Submit New Event
                </Button>
            </Link>
        </Grid>

        <Grid display={{ xs: "none", sm: "block" }} size={{ sm: 1 }}></Grid>
    </Grid >
)

export default CalendarHeader