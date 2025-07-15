"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';

import FullEventReport from '@/types/IFullEventReport';
import UserRole from '@/types/TUserRole';

import Header from '@/app/CalendarOverview/_components/Header';
import SubHeader from './SubHeader';
import EventTable from '@/app/CalendarOverview/_components/EventTable';
import EventDetailsDialog from '@/app/CalendarOverview/_components/EventDetailsDialog';

import getFullEventReports from '@/util/Prisma-API-handlers/getFullEventReports'
import filteredEvents from '@/util/filteredEvents';
import getDashboardData from '@/util/getDashboardData';

const SearchEvents: React.FC = () => {
    const [role, setRole] = useState<UserRole>('Admin');

    const [datumStartDate, setDatumStartDate] = useState<Date | null>(dayjs().startOf('year').toDate());
    const [datumEndDate, setDatumEndDate] = useState<Date | null>(dayjs().endOf('year').toDate());
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [draftEventReports, setdraftEventReports] = useState<Partial<FullEventReport>[]>([]);
    const [submittedEventReports, setSubmittedEventReports] = useState<FullEventReport[]>([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Partial<FullEventReport>>({});

    // Fetch Event Data for Render
    const prismaFilters = useMemo(() => {
        return {
            startDate: {
                gte: datumStartDate ?? undefined,
                lte: datumEndDate ?? undefined
            }
        }
    }, [datumStartDate, datumEndDate]);

    const fetchDashboardData = getDashboardData(prismaFilters);

    useEffect(() => {
        fetchDashboardData().then(({ submitted, draft }) => {
            setSubmittedEventReports(submitted as FullEventReport[] || []);
            setdraftEventReports(draft || []);
        });
    }, [fetchDashboardData]);

    const filteredSubmittedEvents = filteredEvents([], selectedCategories, submittedEventReports)
    const filteredDraftEvents = filteredEvents([], selectedCategories, draftEventReports)
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

            <SubHeader
                datumStartDate={datumStartDate}
                setDatumStartDate={setDatumStartDate}
                datumEndDate={datumEndDate}
                setDatumEndDate={setDatumEndDate}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword} />

            <EventTable
                state="Submitted"
                role={role}
                EventReports={filteredSubmittedEvents}
                onDeleteSuccess={fetchDashboardData}
                onHyperlinkClick={showEventDialog}
                unifiedSearch={true}
                searchKeyword={searchKeyword}
            />

            <EventTable
                state="Draft"
                role={role}
                EventReports={filteredDraftEvents}
                onDeleteSuccess={fetchDashboardData}
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