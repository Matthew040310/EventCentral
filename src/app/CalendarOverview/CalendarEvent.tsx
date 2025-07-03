import RBCEvent from "@/types/IRBCEvent"
import determineColor from "./determineColor"
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
    let eventColor = determineColor(event)
    if (event.draftImpactAssessment) {
        eventColor = "#BDC3C7";                                   // Override color for draft impact assessments
    }

    const embargoedLabel = event.embargoed === "Yes"
        ? { color: "black", backgroundColor: "#F7CA18" }
        : {}

    const buttonTitle = event.embargoed === "Yes"
        ? `${event.title} (Embargoed)`
        : event.title;

    const backgroundColor = (event?.estimatedCohortSize ?? 0) > 100000
        ? eventColor
        : "none"

    const dummyBackgroundColor = (event?.draftImpactAssessment?.perceivedUnhappiness === "Yes" || event?.submittedImpactAssessment?.perceivedUnhappiness === "Yes")
        ? eventColor
        : "none"

    return (
        <Button variant="outlined" title={buttonTitle}
            sx={{
                bgcolor: backgroundColor,
                '&:hover': { bgcolor: '#BDC3C7', color: '#000000' },
                width: "100%",
                height: "2vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textTransform: "capitalize",
                border: 3, borderColor: eventColor                    // Future feature: Highlight row selected items
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
                    color: backgroundColor == "none" ? "black" : "white",
                    ...embargoedLabel,
                }}
            >
                {event.title}
            </span>
        </Button>
    )
}

export default CalendarEvent