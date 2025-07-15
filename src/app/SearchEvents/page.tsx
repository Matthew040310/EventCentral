"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';

import FullEventReport from '@/types/IFullEventReport';
import UserRole from '@/types/TUserRole';

import Header from '@/app/CalendarOverview/_components/Header';
import SubHeader from './SubHeader';
import EventTable from '@/app/CalendarOverview/_components/EventTable';
import EventDetailsDialog from '@/app/CalendarOverview/_components/EventDetailsDialog';

import getFullEventReports from '@/util/Prisma-API-handlers/getFullEventReports'

const SearchEvents: React.FC = () => {
    const [role, setRole] = useState<UserRole>('Admin');

    const [datumStartDate, setDatumStartDate] = useState<Date | null>(dayjs().startOf('year').toDate());
    const [datumEndDate, setDatumEndDate] = useState<Date | null>(dayjs().endOf('year').toDate());
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [prismaFilters, setPrismaFilters] = useState({});
    const [draftEventReports, setdraftEventReports] = useState<Partial<FullEventReport>[]>([]);
    const [submittedEventReports, setSubmittedEventReports] = useState<FullEventReport[]>([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Partial<FullEventReport>>({});

    const fetchDashboardData = async () => {
        try {
            const allSubmissions = await getFullEventReports({ state: "Submitted", sortby: [{ type: "desc" }, { estimatedCohortSize: "desc" }], filters: prismaFilters })
            setSubmittedEventReports(allSubmissions as FullEventReport[] || [])

            const allDrafts = await getFullEventReports({ state: "Draft", sortby: [{ type: "desc" }, { estimatedCohortSize: "desc" }], filters: prismaFilters });
            setdraftEventReports(allDrafts || [])
        } catch (error) {
            console.error('Error fetching event reports:', error);
        }
    }

    useEffect(() => {
        setPrismaFilters({ startDate: { gte: datumStartDate, lte: datumEndDate } })
    }, [datumStartDate, datumEndDate]);

    useEffect(() => {
        fetchDashboardData()
    }, [prismaFilters]);

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
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword} />

            <EventTable
                state="Submitted"
                role={role}
                EventReports={submittedEventReports}
                onDeleteSuccess={fetchDashboardData}
                onHyperlinkClick={showEventDialog}
                unifiedSearch={true}
                searchKeyword={searchKeyword}
            />

            <EventTable
                state="Draft"
                role={role}
                EventReports={draftEventReports}
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