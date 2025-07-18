"use client";
import React, { useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import Head from 'next/head';
import dayjs from 'dayjs';
import { View, Views } from 'react-big-calendar';

import FullEventReport from '@/types/IFullEventReport';
import UserRole from '@/types/TUserRole';

import CalendarToolBar from '../CalendarOverview/_components/ToolBar';
import EventStatistics from './_components/EventStatistics';
import CalendarView from '../CalendarOverview/_components/CalendarView';
import EventWriteUpSection from './_components/EventWriteUpSection';
import StackedBarChart from './_components/StackedBarChart';
import EventDetailsDialog from '@/components/EventDetailsDialog';

import filteredEvents from '@/util/filteredEvents';
import useDashboardEventReports from '@/hooks/useDashboardEventReports';

const CMMReport: React.FC = () => {
  const [role, setRole] = useState<UserRole>('Admin');

  const [datumDate, setDatumDate] = useState<Date>(dayjs().toDate());
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["High Impact", "New/Changes"]);
  const [selectedCalendarView, setSelectedCalendarView] = useState<View>(Views.MONTH)

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<FullEventReport>>({});

  // Custom Hook to fetch Event Reports
  const { submittedEventReports, draftEventReports } = useDashboardEventReports(
    () => {
      const startOfMonth = dayjs(datumDate).startOf("month").startOf("week").toDate();
      const endOfMonth = dayjs(datumDate).endOf("month").endOf("week").toDate();
      return { startDate: { gte: startOfMonth, lte: endOfMonth } };
    }, [datumDate]);

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
        <title>EventCentral - Core Management Meeting Report</title>
      </Head>

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

      <Grid container bgcolor="white" py={3} borderTop="1px dotted #E0E0E0">
        <Grid size={{ lg: 8 }} sx={{ height: "800px", display: "flex", flexDirection: "column" }}>
          <EventStatistics submittedEventReports={submittedEventReports} />

          <CalendarView
            events={[...filteredSubmittedEvents, ...filteredDraftEvents]}
            view={selectedCalendarView}
            datumDate={datumDate}
            setDate={setDatumDate}
            onCalendarEventClick={showEventDialog} />
        </Grid>

        <Grid size={{ lg: 4 }}
          sx={{ height: "800px", display: "flex", flexDirection: "column" }}
          px={{ xs: 10, lg: 0 }}
          mt={{ xs: 2, lg: 0 }}>
          <EventWriteUpSection
            eventDetailsArray={filteredSubmittedEvents}
            onWriteUpClick={showEventDialog} />
        </Grid>
      </Grid >

      <StackedBarChart
        datumDate={datumDate} />

      <EventDetailsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        eventDetails={selectedEvent}
      />

    </>
  );
};

export default CMMReport;