import FullEventReport from "@/types/IFullEventReport";
import RBCEvent from "@/types/IRBCEvent";
import { Event_Legend } from "@/styles/theme";

export default function determineColor(
    event: Partial<FullEventReport> | RBCEvent
) {
    let styleObject = {
        backgroundColor: "none",
        borderColor: "none",
        textColor: "white",
    }

    if (event.draftImpactAssessment) {
        styleObject.textColor = Event_Legend['Draft']
        styleObject.borderColor = Event_Legend['Draft']
    }
    else if (event.embargoed === "Yes" || event.submittedImpactAssessment?.perceivedUnhappiness === "Yes") {
        styleObject.backgroundColor = Event_Legend['High Impact']
        styleObject.borderColor = Event_Legend['High Impact']
    }
    else if (event.type !== "Existing") {
        styleObject.backgroundColor = Event_Legend['New/Changes']
        styleObject.borderColor = Event_Legend['New/Changes']
    }
    else {
        styleObject.textColor = Event_Legend['Existing']
        styleObject.borderColor = Event_Legend['Existing']
    };

    return styleObject
}