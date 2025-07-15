import { useMemo } from 'react';
import FullEventReport from '@/types/IFullEventReport';
import RBCEvent from '@/types/IRBCEvent';

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

    const { submittedImpactAssessment, embargoed, type } = event;

    const isHighImpact =
        submittedImpactAssessment?.perceivedUnhappiness === 'Yes' || embargoed === 'Yes';

    // High Impact takes precedence and is exclusive
    if (isHighImpact) {
        return selectedCategories.has('High Impact');
    }

    // Non-High-Impact categories
    if (selectedCategories.has('New/Changes') && (type === 'New' || type === 'Existing with Changes')) {
        return true;
    }

    if (selectedCategories.has('Existing') && type === 'Existing') {
        return true;
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
    const departmentSet = useMemo(() => new Set(selectedDepartments), [selectedDepartments]);
    const categorySet = useMemo(() => new Set(selectedCategories), [selectedCategories]);
    return useMemo(() => {
        return events.filter(event =>
            filterEvent(event, departmentSet, categorySet)
        );
    }, [selectedDepartments, selectedCategories, events]);
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