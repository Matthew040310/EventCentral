"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';
import { View, Views } from 'react-big-calendar';

import FullEventReport from '@/types/IFullEventReport';
import UserRole from '@/types/TUserRole';

import CalendarOverviewHeader from './_components/Header';
import CalendarToolBar from './_components/ToolBar';
import CalendarView from './_components/CalendarView';
import EventTable from './_components/EventTable';
import EventDetailsDialog from './_components/EventDetailsDialog';

import eventFilter from './functions/filteredEvents';
import getDashboardData from '@/util/getDashboardData';

const CalendarOverview: React.FC = () => {
  const [role, setRole] = useState<UserRole>('Admin');

  const [datumDate, setDatumDate] = useState<Date | null>(dayjs().toDate());
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["High Impact", "New/Changes"]);
  const [selectedView, setSelectedView] = useState<View>(Views.MONTH)
  const [draftEventReports, setdraftEventReports] = useState<Partial<FullEventReport>[]>([]);
  const [submittedEventReports, setSubmittedEventReports] = useState<FullEventReport[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<FullEventReport>>({});

  // Fetch Event Data for Render
  const prismaFilters = useMemo(() => {
    const startOfMonth = dayjs(datumDate).startOf("month").startOf('week').toDate();
    const endOfMonth = dayjs(datumDate).endOf("month").endOf('week').toDate();
    return { startDate: { gte: startOfMonth, lte: endOfMonth } };
  }, [datumDate]);

  const fetchDashboardData = getDashboardData(prismaFilters);

  useEffect(() => {
    fetchDashboardData().then(({ submitted, draft }) => {
      setSubmittedEventReports(submitted as FullEventReport[] || []);
      setdraftEventReports(draft || []);
    });
  }, [fetchDashboardData]);

  const filteredSubmittedEvents = eventFilter(selectedDepartments, selectedCategories, submittedEventReports)
  const filteredDraftEvents = eventFilter(selectedDepartments, selectedCategories, draftEventReports)
  //

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
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <CalendarView
        events={[...filteredSubmittedEvents, ...filteredDraftEvents]}
        view={selectedView}
        datumDate={datumDate}
        setDate={setDatumDate}
        onCalendarEventClick={showEventDialog} />

      <EventTable
        state="Submitted"
        role={role}
        EventReports={filteredSubmittedEvents}
        onDeleteSuccess={fetchDashboardData}
        onHyperlinkClick={showEventDialog}
      />

      <EventTable
        state="Draft"
        role={role}
        EventReports={filteredDraftEvents}
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