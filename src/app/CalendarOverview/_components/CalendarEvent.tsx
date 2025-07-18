import RBCEvent from "@/types/IRBCEvent"
import determineCategory from "../_functions/determineCategory"
import { Button } from "@mui/material"
import React from "react";

interface CalendarEventProps {
    EventObject: RBCEvent;
    handleClick: (event: RBCEvent) => void;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({
    EventObject: event,
    handleClick,
}) => {
    const { backgroundColor, borderColor, textColor } = determineCategory(event)

    return (
        <Button variant="outlined" title={event.title}
            sx={{
                '&:hover': { bgcolor: '#BDC3C7' },
                width: "100%",
                height: "2vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textTransform: "capitalize",
                borderColor: borderColor,
                backgroundColor: backgroundColor,
            }}
            onClick={() => { handleClick(event) }}
        >
            <span
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                    display: "block",
                    textAlign: "center",
                    color: textColor,
                }}
            >
                {event.title}
            </span>
        </Button>
    )
}

export default CalendarEvent