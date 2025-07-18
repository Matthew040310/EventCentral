"use client";
import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';

import FullEventReport from '@/types/IFullEventReport';
import UserRole from '@/types/TUserRole';

import Header from '@/app/CalendarOverview/_components/Header';
import SearchEventToolBar from './ToolBar';
import EventTable from '@/app/CalendarOverview/_components/EventTable';
import EventDetailsDialog from '@/components/EventDetailsDialog';

import filteredEvents from '@/util/filteredEvents';
import useDashboardEventReports from '@/hooks/useDashboardEventReports';

const SearchEvents: React.FC = () => {
    const [role, setRole] = useState<UserRole>('Admin');

    const [datumStartDate, setDatumStartDate] = useState<Date>(dayjs().startOf('year').toDate());
    const [datumEndDate, setDatumEndDate] = useState<Date>(dayjs().endOf('year').toDate());
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Partial<FullEventReport>>({});

    // Custom Hook to fetch Event Reports
    const { submittedEventReports, draftEventReports, refetch } = useDashboardEventReports(
        () => ({ startDate: { gte: datumStartDate, lte: datumEndDate } }),
        [datumStartDate, datumEndDate]);

    const { filteredSubmittedEvents, filteredDraftEvents } = useMemo(() =>
        filteredEvents(submittedEventReports, draftEventReports, selectedDepartments, selectedCategories),
        [submittedEventReports, draftEventReports, selectedDepartments, selectedCategories]);
    //

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

            <Header />

            <SearchEventToolBar
                datumStartDate={datumStartDate}
                setDatumStartDate={setDatumStartDate}
                datumEndDate={datumEndDate}
                setDatumEndDate={setDatumEndDate}
                selectedDepartments={selectedDepartments}
                setSelectedDepartments={setSelectedDepartments}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword} />

            <EventTable
                state="Submitted"
                role={role}
                EventReports={filteredSubmittedEvents}
                onDeleteSuccess={refetch}
                onHyperlinkClick={showEventDialog}
                unifiedSearch={true}
                searchKeyword={searchKeyword}
            />

            <EventTable
                state="Draft"
                role={role}
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