import FullEventReport from '@/types/IFullEventReport';
import RBCEvent from '@/types/IRBCEvent';

export default function filterEventsByDepartment(selectedDepartments: string[], event: Partial<FullEventReport> | RBCEvent): boolean {
    return (
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(event.department || "")
    );
}