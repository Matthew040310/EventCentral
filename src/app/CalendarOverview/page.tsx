"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';
import { View, Views } from 'react-big-calendar';

import FullEventReport from '@/types/IFullEventReport';
import { FullEventReportWithFilters } from '@/types/IFullEventReportParams';
import UserRole from '@/types/TUserRole';

import CalendarOverviewHeader from './_components/Header';
import CalendarToolBar from './_components/ToolBar';
import CalendarView from './_components/CalendarView';
import EventTable from './_components/EventTable';
import EventDetailsDialog from './_components/EventDetailsDialog';

import getFullEventReports from '@/util/Prisma-API-handlers/getFullEventReports'

const CalendarOverview: React.FC = () => {
  const [role, setRole] = useState<UserRole>('Admin');

  const [datumDate, setDatumDate] = useState<Date | null>(dayjs().toDate());
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState<View>(Views.MONTH)
  const [prismaFilters, setPrismaFilters] = useState<Partial<FullEventReportWithFilters>>({});
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
    }
    catch (error) {
      console.error('Error fetching event reports:', error);
    }
  }

  useEffect(() => {
    const startOfMonth = dayjs(datumDate).startOf("month").startOf('week').toDate();
    const endOfMonth = dayjs(datumDate).endOf("month").endOf('week').toDate();
    setPrismaFilters({ startDate: { gte: startOfMonth, lte: endOfMonth } })
  }, [datumDate]);

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
        <title>EventCentral - Calendar Overview</title>
        <meta name="description" content="Centralized event tracking and forecasting system" />
      </Head>

      <CalendarOverviewHeader />

      <CalendarToolBar
        datumDate={datumDate}
        setDatumDate={setDatumDate}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        selectedDepartments={selectedDepartments}
        setSelectedDepartments={setSelectedDepartments}
      />

      <CalendarView
        events={[...submittedEventReports, ...draftEventReports]}
        view={selectedView}
        datumDate={datumDate}
        selectedDepartments={selectedDepartments}
        setDate={setDatumDate}
        onCalendarEventClick={showEventDialog} />

      <EventTable
        state="Submitted"
        role={role}
        EventReports={submittedEventReports}
        onDeleteSuccess={fetchDashboardData}
        onHyperlinkClick={showEventDialog}
      />

      <EventTable
        state="Draft"
        role={role}
        EventReports={draftEventReports}
        onDeleteSuccess={fetchDashboardData}
        onHyperlinkClick={showEventDialog}
      />

      <EventDetailsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        eventDetails={selectedEvent}
      />
    </>
  );
};

export default CalendarOverview;