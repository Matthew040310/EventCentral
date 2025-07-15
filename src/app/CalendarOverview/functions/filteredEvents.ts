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

    return (
        (selectedCategories.has('High Impact') &&
            (submittedImpactAssessment?.perceivedUnhappiness === 'Yes' || embargoed === 'Yes')) ||

        (selectedCategories.has('New/Changes') &&
            (type === 'New' || type === 'Existing with Changes')) ||

        (selectedCategories.has('Existing') &&
            type === 'Existing')
    );
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

export default function filteredEvents(
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