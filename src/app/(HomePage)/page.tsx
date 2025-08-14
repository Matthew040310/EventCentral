"use client";
import React, { useMemo, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Head from 'next/head';
import dayjs from 'dayjs';
import { View, Views } from 'react-big-calendar';

import FullEventReport from '@/types/IFullEventReport';
import UserRole from '@/types/TUserRole';

import CalendarOverviewHeader from '@/app/(HomePage)/_components/Header';
import CalendarToolBar from '@/app/(HomePage)/_components/ToolBar';
import EventStatistics from '@/components/EventStatistics';
import CalendarView from '@/components/CalendarView';
import EventTable from '@/components/EventTable';
import EventDetailsDialog from '@/components/EventDetailsDialog';

import filteredEvents from '@/util/filteredEvents';
import useDashboardEventReports from '@/hooks/useDashboardEventReports';

const HomePage: React.FC = () => {
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
      return { eventDate: { gte: startOfMonth, lte: endOfMonth } };
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

      <Grid container bgcolor="white">
        <Grid size={2}></Grid>
        <Grid size={8}>
          <EventStatistics submittedEventReports={submittedEventReports} />
        </Grid>
        <Grid size={2}></Grid>
      </Grid >

      <Box height="800px"> {/* Required as Calendar Inherits height from parent */}
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

      {selectedCategories.includes("Draft") || selectedCategories.length === 0
        && (
          <EventTable
            state="Draft"
            role={role}
            EventReports={filteredDraftEvents}
            onDeleteSuccess={refetch}
            onHyperlinkClick={showEventDialog}
          />
        )}

      <EventDetailsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        eventDetails={selectedEvent}
      />
    </>
  );
};

export default HomePage;