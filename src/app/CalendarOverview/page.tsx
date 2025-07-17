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

import filteredEvents from '../../util/filteredEvents';
import getDashboardData from '@/util/getDashboardData';

const CalendarOverview: React.FC = () => {
  const [role, setRole] = useState<UserRole>('Admin');

  const [datumDate, setDatumDate] = useState<Date | null>(dayjs().toDate());
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["High Impact", "New/Changes"]);
  const [selectedCalendarView, setSelectedCalendarView] = useState<View>(Views.MONTH)
  const [selectedReportView, setSelectedReportView] = useState<string>('Table');
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

  const { filteredSubmittedEvents, filteredDraftEvents } =
    filteredEvents(submittedEventReports, draftEventReports, selectedDepartments, selectedCategories)

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
        selectedView={selectedCalendarView}
        setSelectedView={setSelectedCalendarView}
        selectedDepartments={selectedDepartments}
        setSelectedDepartments={setSelectedDepartments}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <CalendarView
        events={[...filteredSubmittedEvents, ...filteredDraftEvents]}
        view={selectedCalendarView}
        datumDate={datumDate}
        setDate={setDatumDate}
        onCalendarEventClick={showEventDialog} />

      {selectedReportView === 'Table'
        ? (<>
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
        </>)
        :
        <h1>To Be Populated</h1>
      }

      <EventDetailsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        eventDetails={selectedEvent}
      />
    </>
  );
};

export default CalendarOverview;