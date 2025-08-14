"use client";
import { useMemo, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import dayjs from 'dayjs';

// Components
import Header from './Header';
import SearchEventToolBar from './ToolBar';
import EventTable from '@/components/EventTable';
import EventDetailsDialog from '@/components/EventDetailsDialog';

// Interfaces & Constants
import FullEventReport from '@/types/IFullEventReport';

// Functions
import filteredEvents from '@/util/filteredEvents';
import dateFormatter from '@/util/dateFormatter';
import useDashboardEventReports from '@/hooks/useDashboardEventReports';

const SearchEvents: React.FC = () => {
    const { data: session } = useSession();

    const [datumStartDate, setDatumStartDate] = useState<Date>(dayjs().startOf('year').toDate());
    const [datumEndDate, setDatumEndDate] = useState<Date>(dayjs().endOf('year').toDate());
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Partial<FullEventReport>>({});

    // Custom Hook to fetch Event Reports
    const { submittedEventReports, draftEventReports, refetch } = useDashboardEventReports(
        () => ({ eventDate: { gte: datumStartDate, lte: datumEndDate } }),
        [datumStartDate, datumEndDate]);

    const { filteredSubmittedEvents, filteredDraftEvents } = useMemo(() =>
        filteredEvents(submittedEventReports, draftEventReports, selectedDepartments, selectedCategories),
        [submittedEventReports, draftEventReports, selectedDepartments, selectedCategories]);

    const showEventDialog = (eventDetails: Partial<FullEventReport>) => {
        setSelectedEvent(eventDetails);
        setOpenDialog(true);
    };

    return (
        <>
            <Head>
                <title>EventCentral - Search Events</title>
                <meta name="description" content="Centralized event tracking and forecasting system" />
            </Head>

            <Header
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword} />

            <SearchEventToolBar
                datumStartDate={datumStartDate}
                setDatumStartDate={setDatumStartDate}
                datumEndDate={datumEndDate}
                setDatumEndDate={setDatumEndDate}
                selectedDepartments={selectedDepartments}
                setSelectedDepartments={setSelectedDepartments}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories} />

            <Grid size={12} textAlign="center" pt={3} bgcolor={"white"}>
                <Typography variant='h6' fontSize={"3vh"}>
                    All Events From <u>{dateFormatter(datumStartDate)}</u> to <u>{dateFormatter(datumEndDate)}</u>
                </Typography>
            </Grid>

            <EventTable
                state="Submitted"
                sessionToken={session}
                EventReports={filteredSubmittedEvents}
                onDeleteSuccess={refetch}
                onHyperlinkClick={showEventDialog}
                unifiedSearch={true}
                searchKeyword={searchKeyword}
            />

            <EventTable
                state="Draft"
                sessionToken={session}
                EventReports={filteredDraftEvents}
                onDeleteSuccess={refetch}
                onHyperlinkClick={showEventDialog}
                unifiedSearch={true}
                searchKeyword={searchKeyword}
            />

            <EventDetailsDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                eventDetails={selectedEvent}
            />
        </>
    );
};

export default SearchEvents;