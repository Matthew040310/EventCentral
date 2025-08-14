import "react-big-calendar/lib/css/react-big-calendar.css"
import { useCallback } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import { Calendar, Components, EventWrapperProps, View, Views, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'

// Components
import CalendarEvent from '@/components/CalendarEvent'
// Types
import FullEventReport from '@/types/IFullEventReport';
import RBCEvent from "@/types/IRBCEvent"
// Functions
import filterUniqueCalendarEvents from "@/util/filterUniqueCalendarEvents"

interface CalendarViewProps {
  events: Partial<FullEventReport>[];
  view: View,
  datumDate: Date | null;
  setDate: (date: Date) => void;
  onCalendarEventClick: (event: RBCEvent) => void;
}

const dateHeader = (date: Date, view: View) => {
  if (view === Views.MONTH) {
    return dayjs(date).format('MMMM YYYY');
  }
  else {
    const startOfWeek = dayjs(date).startOf('week');
    const endOfWeek = dayjs(date).endOf('week');
    return `${startOfWeek.format('D MMMM')} - ${endOfWeek.format('D MMMM')}`;
  }
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events = [],
  view,
  datumDate,
  setDate,
  onCalendarEventClick
}) => {
  const localizer = dayjsLocalizer(dayjs)
  const calendarEvents = filterUniqueCalendarEvents(events)

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
    <Box pb={2}
      bgcolor="white" height="100%" width="100%"
      display="flex" flexDirection="column">

      {/* Calendar Header */}
      <Box textAlign="center" my={1}>
        <Typography variant='h6' fontSize={"3vh"}>{dateHeader(datumDate!, view)}</Typography>
      </Box>

      {/* Calendar */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        <Box sx={{
          width: '16.66%',    // 2/12 or xs={2}
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button sx={{ color: "grey" }} onClick={onPrevClick}>
            Previous {view}
            <ArrowLeft sx={{ fontSize: 100 }} />
          </Button>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Calendar<RBCEvent, object>
            localizer={localizer}
            startAccessor="eventDate"
            toolbar={false}
            components={components}

            view={view}
            date={datumDate as Date}

            events={calendarEvents}
            popup={true}
            selectable={true}
            onView={() => { }}          // To remove console error as state is managed in parent component. Non-functional
            onNavigate={() => { }}      // To remove console error as state is managed in parent component. Non-functional
          />
        </Box>

        <Box sx={{
          width: '16.66%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button sx={{ color: "grey" }} onClick={onNextClick}>
            <ArrowRight sx={{ fontSize: 100 }} />
            Next {view}
          </Button>
        </Box>
      </Box >
    </Box>
  );
}

export default CalendarView;