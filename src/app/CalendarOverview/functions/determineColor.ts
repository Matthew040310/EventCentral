import FullEventReport from "@/types/IFullEventReport";
import RBCEvent from "@/types/IRBCEvent";
import { Event_Legend } from "@/styles/theme";

export default function determineColor(
    event: Partial<FullEventReport> | RBCEvent
) {
    let styleObject = {
        label: "",
        backgroundColor: "none",
        borderColor: "none",
        textColor: "white",
    }

    // Draft and Existing Events colors are applied to border and text
    // No background color within the Calendar
    if (event.draftImpactAssessment) {
        styleObject.label = "Draft"
        styleObject.textColor = Event_Legend['Draft']
        styleObject.borderColor = Event_Legend['Draft']
    }

    // High Impact and New/Change Events colors are applied to border and background
    // Text default to white for contrast
    else if (event.embargoed === "Yes" || event.submittedImpactAssessment?.perceivedUnhappiness === "Yes") {
        styleObject.label = "High Impact"
        styleObject.backgroundColor = Event_Legend['High Impact']
        styleObject.borderColor = Event_Legend['High Impact']
    }
    else if (event.type !== "Existing") {
        styleObject.label = "New/Changes"
        styleObject.backgroundColor = Event_Legend['New/Changes']
        styleObject.borderColor = Event_Legend['New/Changes']
    }
    else if (event.type === "Existing") {
        styleObject.label = "Existing"
        styleObject.textColor = Event_Legend['Existing']
        styleObject.borderColor = Event_Legend['Existing']
    }

    return styleObject
}