import FullEventReport from '@/types/IFullEventReport';
import determineCategory from "@/util/determineCategory";

export default function eventStatistics(eventDetailsArray: Partial<FullEventReport>[]) {
    let highImpact = 0;
    let newChanges = 0;
    let existing = 0;

    for (const evt of eventDetailsArray) {
        const cat = determineCategory(evt).label;
        if (cat === "High Impact") highImpact++;
        else if (cat === "New/Changes") newChanges++;
        else if (cat === "Existing") existing++;
    }

    return {
        total: eventDetailsArray.length,
        highImpact,
        newChanges,
        existing,
    }
}