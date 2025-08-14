import FullEventReport from "@/types/IFullEventReport";
import determineCategory from "@/util/determineCategory";

const CATEGORY_INDEX: Record<string, number> = {
    "High Impact": 0,
    "New/Changes": 1,
    "Existing": 2,
    "Draft": 3,
};

export default function sortEventDetailsArray(
    events: Partial<FullEventReport>[],
    sortBy: string
): Partial<FullEventReport>[] {
    return [...events].sort((a, b) => {
        if (sortBy === "Date") {
            if (!a.eventDate && !b.eventDate) return 0;
            if (!a.eventDate) return 1;
            if (!b.eventDate) return -1;
            return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
        } else if (sortBy === "Category") {
            const labelA = determineCategory(a).label;
            const labelB = determineCategory(b).label;
            const idxA = CATEGORY_INDEX[labelA] ?? 99;
            const idxB = CATEGORY_INDEX[labelB] ?? 99;
            if (idxA !== idxB) return idxA - idxB;
            // fallback to date within the same category
            if (!a.eventDate && !b.eventDate) return 0;
            if (!a.eventDate) return 1;
            if (!b.eventDate) return -1;
            return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
        }
        return 0;
    });
}