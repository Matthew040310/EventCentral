import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { AlertColor } from '@mui/material';

// Interface and Constants
import EventDetails from '@/types/IEventDetails';
import FullEventReport from '@/types/IFullEventReport';
import EventState from '@/types/TEventState';
import ImpactAssessment from '@/types/IImpactAssessment';
import { Department_Group_Cluster_Map } from '@/constants/EventCentralConstants';

// Utility Functions
import triggerSubmit from '@/util/Prisma-API-handlers/Event/handleSubmit';
import triggerDelete from '@/util/Prisma-API-handlers/Event/handleDelete';
import triggerSave from '@/util/Prisma-API-handlers/Event/handleSave';
import validImpactAssessmentId from './validImpactAssessmentId';

type SectionMap = {
    // formSection    : fieldName types
    "Event Details": EventDetails | FullEventReport;
    "Impact Assessment": ImpactAssessment;
};

export default function useEventFormHandlers(
    initialEventDetails: EventDetails | FullEventReport,
    initialImpactAssessment: ImpactAssessment,
    setInvalidImpactAssessmentId: (val: boolean) => void
) {
    const { data: session } = useSession();
    const [eventDetails, setEventDetails] = useState<EventDetails | FullEventReport>(initialEventDetails);
    const [impactAssessment, setImpactAssessment] = useState<ImpactAssessment>(initialImpactAssessment);
    const [alert, setAlert] = useState<{ open: boolean; severity: AlertColor; message: string }>({ open: false, severity: 'success', message: '' });

    const handleChange = <S extends keyof SectionMap>(formSection: S) => (fieldName: keyof SectionMap[S]) => (
        newValue: string | string[] | number | Date | null
    ) => {
        // Reset dependent fields based on the field being changed
        const resetDependencyFields = (): Partial<EventDetails | FullEventReport> => {
            if (fieldName === 'frequency') {
                return newValue === 'One-off'
                    ? { endDate: null, frequencyInterval: null, customFrequency: null, selectedDay: null }
                    : { customFrequency: null, selectedDay: null };
            }
            if (fieldName === 'customFrequency') return { selectedDay: null };
            if (fieldName === 'department') {
                const department = newValue as string;
                const { cluster, group } = Department_Group_Cluster_Map[department] || { cluster: null, group: null };
                return { cluster, group };
            }
            return {};
        };

        // Determines which state to modify. Event Details or Impact Assessment
        if (formSection === "Event Details") {
            setEventDetails((currentEventDetails: EventDetails | FullEventReport) => ({
                ...currentEventDetails,
                [fieldName]: newValue,
                ...resetDependencyFields()
            }));
        }
        else if (formSection === "Impact Assessment") {
            setImpactAssessment((currentImpactAssessment: ImpactAssessment) => ({
                ...currentImpactAssessment,
                [fieldName]: newValue,
            }));
        }
    };

    const handleDelete = (state: EventState) => (userResponse: string) => {
        if (userResponse === "Confirm") {
            triggerDelete(eventDetails.id, setAlert, state)
            setEventDetails((prev) => ({ ...prev, id: '' }));
        }
    };

    const handleSave = () => {
        eventDetails.lastUpdatedBy = session?.user?.email || "";
        triggerSave(eventDetails, impactAssessment, handleChange, setAlert)
    }

    const handleSubmit = async () => {
        eventDetails.lastUpdatedBy = session?.user?.email || "";
        const isValid = await validImpactAssessmentId(eventDetails, impactAssessment, setInvalidImpactAssessmentId);
        if (!isValid) return;
        triggerSubmit(eventDetails, impactAssessment, setAlert);
    }

    const handleUpdate = async (userResponse: string) => {
        eventDetails.lastUpdatedBy = session?.user?.email || "";
        triggerSubmit(eventDetails, impactAssessment, setAlert, userResponse);
    }

    return {
        eventDetails, setEventDetails,
        impactAssessment, setImpactAssessment,
        alert, setAlert,
        handleChange,
        handleDelete,
        handleSave,
        handleSubmit,
        handleUpdate,
    };
}