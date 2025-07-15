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

export default function filterEvents(
    selectedDepartments: string[],
    selectedCategories: string[],
    event: Partial<FullEventReport> | RBCEvent
): boolean {
    return (
        filterEventsByDepartment(selectedDepartments, event) &&
        filterEventsByCategory(selectedCategories, event)
    );
}