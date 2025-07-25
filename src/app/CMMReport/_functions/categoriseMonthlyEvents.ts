import dayjs from 'dayjs';
import FullEventReport from '@/types/IFullEventReport';
import determineCategory from '@/util/determineCategory';
import { Event_Legend } from '@/styles/theme';

interface CategoryData {
    data: number[];
    stack: "total";
    label: string;
    color: string;
}

interface CategorizedResult {
    HighImpact: CategoryData;
    Change_New: CategoryData;
    Existing: CategoryData;
}

export default function categorizeMonthlyEvents(submittedEventReports: FullEventReport[]): CategorizedResult {
    // Prepare empty arrays for 12 months
    const highImpactCounts = Array(12).fill(0);
    const changeNewCounts = Array(12).fill(0);
    const existingCounts = Array(12).fill(0);

    submittedEventReports.forEach((event) => {
        const month = dayjs(event.eventDate).month();
        const category = determineCategory(event).label;

        if (category === "High Impact") {
            highImpactCounts[month]++;
        }
        else if (category === "New/Changes") {
            changeNewCounts[month]++;
        }
        else if (category === "Existing") {
            existingCounts[month]++;
        }
    })

    return {
        HighImpact: {
            data: highImpactCounts,
            stack: "total",
            label: "High Impact",
            color: Event_Legend["High Impact"]
        },
        Change_New: {
            data: changeNewCounts,
            stack: "total",
            label: "Change / New",
            color: Event_Legend["New/Changes"]
        },
        Existing: {
            data: existingCounts,
            stack: "total",
            label: "Existing",
            color: Event_Legend["Existing"]
        }
    }
};