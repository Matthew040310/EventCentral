import FullEventReport from "@/types/IFullEventReport";
import RBCEvent from "@/types/IRBCEvent";
import { Event_Legend } from "@/styles/theme";

export default function determineColor(
    row: Partial<FullEventReport> | RBCEvent
) {
    const estimatedCohortSize = row.estimatedCohortSize || 0;

    // If estimatedCohortSize is not defined or is zero, return black
    if (!estimatedCohortSize) return Event_Legend['Existing (<100k)'];   // Black       

    if (row.type === "Existing") {
        if (estimatedCohortSize >= 100000) return Event_Legend['Existing (>100k)'];   // Blue
        else if (estimatedCohortSize < 100000) return Event_Legend['Existing (<100k)'];    // Black
    }
    else {
        if (estimatedCohortSize >= 1000000) return Event_Legend['New/Change (>1m)'];   // Red
        else if (estimatedCohortSize >= 100000) return Event_Legend['New/Change (>100k)'];   // Orange
        else if (estimatedCohortSize < 100000) return Event_Legend['New/Change (<100k)'];   // Purple
    }
}