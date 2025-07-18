import determineCategory from "@/util/determineCategory";
import FullEventReport from "@/types/IFullEventReport";

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
            if (!a.startDate && !b.startDate) return 0;
            if (!a.startDate) return 1;
            if (!b.startDate) return -1;
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        } else if (sortBy === "Category") {
            const labelA = determineCategory(a).label;
            const labelB = determineCategory(b).label;
            const idxA = CATEGORY_INDEX[labelA] ?? 99;
            const idxB = CATEGORY_INDEX[labelB] ?? 99;
            if (idxA !== idxB) return idxA - idxB;
            // fallback to date within the same category
            if (!a.startDate && !b.startDate) return 0;
            if (!a.startDate) return 1;
            if (!b.startDate) return -1;
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        }
        return 0;
    });
}