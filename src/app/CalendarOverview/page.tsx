"use client";
import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import dayjs from 'dayjs';
import { View, Views } from 'react-big-calendar';

import FullEventReport from '@/types/IFullEventReport';
import UserRole from '@/types/TUserRole';

import CalendarOverviewHeader from './_components/Header';
import CalendarToolBar from './_components/ToolBar';
import CalendarView from './_components/CalendarView';
import EventTable from './_components/EventTable';
import EventDetailsDialog from '@/components/EventDetailsDialog';

import filteredEvents from '../../util/filteredEvents';
import useDashboardEventReports from '@/hooks/useDashboardEventReports';

const CalendarOverview: React.FC = () => {
  const [role, setRole] = useState<UserRole>('Admin');

  const [datumDate, setDatumDate] = useState<Date>(dayjs().toDate());
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["High Impact", "New/Changes"]);
  const [selectedCalendarView, setSelectedCalendarView] = useState<View>(Views.MONTH)

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<FullEventReport>>({});

  // Custom Hook to fetch Event Reports
  const { submittedEventReports, draftEventReports, refetch } = useDashboardEventReports(
    () => {
      const startOfMonth = dayjs(datumDate).startOf("month").startOf("week").toDate();
      const endOfMonth = dayjs(datumDate).endOf("month").endOf("week").toDate();
      return { startDate: { gte: startOfMonth, lte: endOfMonth } };
    }, [datumDate]);

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
        <title>EventCentral - Calendar Overview</title>
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

      <Box height="80vh"> {/* Required as Calendar Inherits height from parent */}
        <CalendarView
          events={[...filteredSubmittedEvents, ...filteredDraftEvents]}
          view={selectedCalendarView}
          datumDate={datumDate}
          setDate={setDatumDate}
          onCalendarEventClick={showEventDialog} />
      </Box>

      <EventTable
        state="Submitted"
        role={role}
        EventReports={filteredSubmittedEvents}
        onDeleteSuccess={refetch}
        onHyperlinkClick={showEventDialog}
      />

      <EventTable
        state="Draft"
        role={role}
        EventReports={filteredDraftEvents}
        onDeleteSuccess={refetch}
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