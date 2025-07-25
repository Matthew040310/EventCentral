import FullEventReport from '@/types/IFullEventReport';
import determineCategory from "@/util/determineCategory";

export default function eventStatistics(eventDetailsArray: Partial<FullEventReport>[]) {
    const HighImpact = new Set<string>();
    const Change_New = new Set<string>();
    const Existing_MoreThan100k = new Set<string>();
    const Existing_LessThan100k = new Set<string>();

    for (const evt of eventDetailsArray) {
        const cat = determineCategory(evt).label;
        if (cat === "High Impact") HighImpact.add(evt.parentid as string);
        else if (cat === "New/Changes") Change_New.add(evt.parentid as string);
        else if (cat === "Existing >=100k") Existing_MoreThan100k.add(evt.parentid as string);
        else if (cat === "Existing <100k") Existing_LessThan100k.add(evt.parentid as string);
    }

    return {
        total: (HighImpact.size + Change_New.size + Existing_MoreThan100k.size + Existing_LessThan100k.size),
        HighImpact: HighImpact.size,
        Change_New: Change_New.size,
        Existing_MoreThan100k: Existing_MoreThan100k.size,
        Existing_LessThan100k: Existing_LessThan100k.size,
    }
}