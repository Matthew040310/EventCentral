import FullEventReport from '@/types/IFullEventReport';
import RBCEvent from '@/types/IRBCEvent';
import determineCategory from './determineCategory';
import { LEGEND_ITEMS } from '@/styles/theme';

type Event = Partial<FullEventReport> | RBCEvent

function filterEventsByDepartment(
    event: Event,
    selectedDepartments: Set<string>,
): boolean {
    if (selectedDepartments.size === 0) return true;
    else return selectedDepartments.has(event.department || "")
}

function filterEventsByCategory(
    event: Event,
    selectedCategories: Set<string>,
): boolean {
    if (selectedCategories.size === 0) return true;

    const { label } = determineCategory(event);

    for (const [category, color] of LEGEND_ITEMS) {
        if (category === label) {
            return selectedCategories.has(category);
        }
    }

    return false;
}

function filterEvent(
    event: Event,
    departmentSet: Set<string>,
    categorySet: Set<string>
): boolean {
    return (
        filterEventsByDepartment(event, departmentSet) &&
        filterEventsByCategory(event, categorySet)
    );
}

function applyFilters(
    selectedDepartments: string[],
    selectedCategories: string[],
    events: Event[],
) {
    const departmentSet = new Set(selectedDepartments);
    const categorySet = new Set(selectedCategories);
    return events.filter(event =>
        filterEvent(event, departmentSet, categorySet)
    );
}

export default function filteredEvents(
    submittedEvents: FullEventReport[],
    draftEvents: Partial<FullEventReport>[],
    selectedDepartments: string[],
    selectedCategories: string[],
) {
    const filteredSubmittedEvents = applyFilters(selectedDepartments, selectedCategories, submittedEvents);

    // Draft events only filtered by department
    const filteredDraftEvents = applyFilters(selectedDepartments, [], draftEvents);

    const isDraftSelected = selectedCategories.includes("Draft");
    const showAllCategories = selectedCategories.length === 0;
    const isOnlyDraftSelected = isDraftSelected && selectedCategories.length === 1;

    const returnSubmittedEvents = showAllCategories
        ? filteredSubmittedEvents
        : isOnlyDraftSelected
            ? []
            : filteredSubmittedEvents

    const returnDraftEvents = showAllCategories || isDraftSelected
        ? filteredDraftEvents
        : [];

    return {
        filteredSubmittedEvents: returnSubmittedEvents,
        filteredDraftEvents: returnDraftEvents
    }
}