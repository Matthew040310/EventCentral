import RBCEvent from "@/types/IRBCEvent";
import FullEventReport from "@/types/IFullEventReport";

export default function filterUniqueCalendarEvents(events: Partial<FullEventReport>[]): RBCEvent[] {
    const seenParentIds = new Set<string | null | undefined>();  // Use correct type for parentid if possible
    const result: RBCEvent[] = [];

    for (const event of events) {
        if (!event.parentid) {
            // If parentid is null or undefined, add the draft event directly
            result.push({
                ...event,
                startDate: event.startDate ? new Date(event.startDate) : null,
                end: event.startDate ? new Date(event.startDate) : null,  // required for rendering
            });
        }
        else if (!seenParentIds.has(event.parentid)) {
            seenParentIds.add(event.parentid);
            result.push({
                ...event,
                startDate: event.startDate ? new Date(event.startDate) : null,
                end: event.startDate ? new Date(event.startDate) : null,  // required for rendering
            });
        }
    }

    return result;
}
