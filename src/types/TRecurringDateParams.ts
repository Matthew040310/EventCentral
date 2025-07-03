import { EVENT_FREQUENCY } from "@/constants/EventCentralConstants";

type TRecurringDateParams = {
    startDate: Date;
    endDate: Date;
    frequency: keyof typeof EVENT_FREQUENCY;
    frequencyInterval: number;
    customFrequency?: string;
    selectedDay?: string;
};

export default TRecurringDateParams;