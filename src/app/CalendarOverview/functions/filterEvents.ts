import { useMemo } from 'react';
import FullEventReport from '@/types/IFullEventReport';
import RBCEvent from '@/types/IRBCEvent';

function filterEventsByDepartment(
    selectedDepartments: string[],
    event: Partial<FullEventReport> | RBCEvent
): boolean {
    if (selectedDepartments.length === 0) return true;
    else return selectedDepartments.includes(event.department || "")
}

function filterEventsByCategory(
    selectedCategories: string[],
    event: Partial<FullEventReport> | RBCEvent
): boolean {
    if (selectedCategories.length === 0) return true;
    let renderEvent = false;

    if (selectedCategories.includes("High Impact")) {
        renderEvent = (event.submittedImpactAssessment?.perceivedUnhappiness === "Yes" || event.embargoed === "Yes")
    }

    if (selectedCategories.includes("New/Changes")) {
        renderEvent = (event.type === "New" || event.type === "Existing with Changes")
    }

    if (selectedCategories.includes("Existing")) {
        renderEvent = (event.type === "Existing")
    }

    return renderEvent;
}

function filterEvents(
    selectedDepartments: string[],
    selectedCategories: string[],
    event: Partial<FullEventReport> | RBCEvent
): boolean {
    return (
        filterEventsByDepartment(selectedDepartments, event) &&
        filterEventsByCategory(selectedCategories, event)
    );
}

export default function useFilterEvents(
    selectedDepartments: string[],
    selectedCategories: string[],
    events: Partial<FullEventReport>[] | RBCEvent[],
) {
    return useMemo(() => {
        return events.filter(event =>
            filterEvents(selectedDepartments, selectedCategories, event)
        );
    }, [selectedDepartments, selectedCategories, events]);
}