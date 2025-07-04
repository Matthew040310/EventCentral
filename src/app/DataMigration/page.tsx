'use client';
import Head from 'next/head';

// Components
import { Button, Container, Stack } from '@mui/material';

// Functions
import handleSubmit from '@/util/Prisma-API-handlers/handleSubmit';
import JAN_EVENTS from '@/constants/DataMigration/EDC_01Jan_2025';
import FEB_EVENTS from '@/constants/DataMigration/EDC_02Feb_2025';
import MAR_EVENTS from '@/constants/DataMigration/EDC_03Mar_2025';
import APR_EVENTS from '@/constants/DataMigration/EDC_04Apr_2025';
import MAY_EVENTS from '@/constants/DataMigration/EDC_05May_2025';
import JUN_EVENTS from '@/constants/DataMigration/EDC_06June_2025';
import JUL_EVENTS from '@/constants/DataMigration/EDC_07July_2025';

function MigrateHistoricData(targetEvents: any) {
    for (const event of targetEvents) {
        const eventDetails = event["Event Details"];
        const impactAssessment = event["Impact Assessment"];

        // Call handleSubmit for each event
        handleSubmit(eventDetails, impactAssessment, (alert) => {
            console.log("Alert:", alert);
        });
    }
}

let allData = [JAN_EVENTS, FEB_EVENTS, MAR_EVENTS, APR_EVENTS, MAY_EVENTS, JUN_EVENTS, JUL_EVENTS];
function MigrateAllData() {
    for (let monthEvents of allData) {
        MigrateHistoricData(monthEvents)
    }
}

const DataMigration = () => (
    < Container maxWidth="sm" >
        <Head>
            <title>Event Central - Migrate Data</title>
        </Head>
        <h2>Migrate 2025 EDC Data</h2>

        <Stack spacing={2}>
            <Button onClick={() => { MigrateHistoricData(JAN_EVENTS) }} variant='contained'>Migrate Jan 25 Data</Button>
            <Button onClick={() => { MigrateHistoricData(FEB_EVENTS) }} variant='contained'>Migrate Feb 25 Data</Button>
            <Button onClick={() => { MigrateHistoricData(MAR_EVENTS) }} variant='contained'>Migrate Mar 25 Data</Button>
            <Button onClick={() => { MigrateHistoricData(APR_EVENTS) }} variant='contained'>Migrate Apr 25 Data</Button>
            <Button onClick={() => { MigrateHistoricData(MAY_EVENTS) }} variant='contained'>Migrate May 25 Data</Button>
            <Button onClick={() => { MigrateHistoricData(JUN_EVENTS) }} variant='contained'>Migrate Jun 25 Data</Button>
            <Button onClick={() => { MigrateHistoricData(JUL_EVENTS) }} variant='contained'>Migrate Jul 25 Data</Button>
        </Stack>

        <Stack mt={5}>
            <Button onClick={MigrateAllData} variant='outlined' color='warning'>Migrate All Data</Button>
        </Stack>

    </Container >
);

export default DataMigration;