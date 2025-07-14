import FullEventReport from '@/types/IFullEventReport';
import RBCEvent from '@/types/IRBCEvent';

export default function filterEventsByCategory(selectedCategories: string[], event: Partial<FullEventReport> | RBCEvent): boolean {
    return (
        // selectedCategories.length === 0 ||
        // selectedCategories.includes(event.department || "")
        true
    );
}