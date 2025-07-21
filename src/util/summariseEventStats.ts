import FullEventReport from '@/types/IFullEventReport';
import determineCategory from "@/util/determineCategory";

export default function eventStatistics(eventDetailsArray: Partial<FullEventReport>[]) {
    const highImpact = new Set<string>();
    const newChanges = new Set<string>();
    const existing = new Set<string>();

    for (const evt of eventDetailsArray) {
        const cat = determineCategory(evt).label;
        if (cat === "High Impact") highImpact.add(evt.parentid as string);
        else if (cat === "New/Changes") newChanges.add(evt.parentid as string);
        else if (cat === "Existing") existing.add(evt.parentid as string);
    }

    return {
        total: (highImpact.size + newChanges.size + existing.size),
        highImpact: highImpact.size,
        newChanges: newChanges.size,
        existing: existing.size,
    }
}