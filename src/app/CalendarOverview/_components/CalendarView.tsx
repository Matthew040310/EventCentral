import "react-big-calendar/lib/css/react-big-calendar.css"
import { useCallback } from 'react'
import { Button, Grid } from '@mui/material'
import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import { Calendar, Components, EventWrapperProps, View, Views, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import FullEventReport from '@/types/IFullEventReport';
import RBCEvent from "@/types/IRBCEvent"
import CalendarEvent from './CalendarEvent'

interface CalendarViewProps {
  events: Partial<FullEventReport>[];
  view: View,
  datumDate: Date | null;
  selectedDepartments: string[];
  setDate: (date: Date) => void;
  onCalendarEventClick: (event: RBCEvent) => void;
}

function filterEvents(selectedDepartments: string[], event: RBCEvent): boolean {
  return (
    selectedDepartments.length === 0 ||
    selectedDepartments.includes(event.department || "")
  );
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events = [],
  view,
  datumDate,
  selectedDepartments,
  setDate,
  onCalendarEventClick
}) => {
  const localizer = dayjsLocalizer(dayjs)

  const normalizedEvents: RBCEvent[] = events
    .map(event => ({
      ...event,
      startDate: event.startDate ? new Date(event.startDate) : null,
      end: event.startDate ? new Date(event.startDate) : null,      // required field for rendering
    }))
    .filter(event =>
      filterEvents(selectedDepartments, event)
    );

  const components: Components<RBCEvent, object> = {
    eventWrapper: ({ event }: EventWrapperProps<RBCEvent>) => {
      return (
        <CalendarEvent EventObject={event} handleClick={onCalendarEventClick} />
      )
    }
  }

  const onPrevClick = useCallback(() => {
    if (view === Views.WEEK) {
      setDate(dayjs(datumDate).subtract(1, "w").toDate());
    } else {
      setDate(dayjs(datumDate).subtract(1, "M").toDate());
    }
  }, [view, datumDate]);

  const onNextClick = useCallback(() => {
    if (view === Views.WEEK) {
      setDate(dayjs(datumDate).add(1, "w").toDate());
    } else {
      setDate(dayjs(datumDate).add(1, "M").toDate());
    }
  }, [view, datumDate]);

  return (
    <Grid container bgcolor={"white"}>
      <Grid justifyContent={"center"} display="flex" size={2}>
        <Button sx={{ color: "grey" }} onClick={onPrevClick}>
          Previous {view}
          <ArrowLeft sx={{ fontSize: 100 }} />
        </Button>
      </Grid>
      <Grid pb={5} size={8}>
        <Calendar<RBCEvent, object>
          localizer={localizer}
          style={{ height: "75vh" }}
          startAccessor="startDate"
          toolbar={false}
          components={components}

          view={view}
          date={datumDate as Date}

          events={normalizedEvents}
          popup={true}
          selectable={true}
          onView={() => { }}          // To remove console error as state is managed in parent component. Non-functional
          onNavigate={() => { }}      // To remove console error as state is managed in parent component. Non-functional
        />
      </Grid>
      <Grid justifyContent={"center"} display="flex" size={2}>
        <Button sx={{ color: "grey" }} onClick={onNextClick}>
          <ArrowRight sx={{ fontSize: 100 }} />
          Next {view}
        </Button>
      </Grid>
    </Grid >
  );
}

export default CalendarView