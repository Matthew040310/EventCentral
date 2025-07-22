import { useState } from 'react';
import { AlertColor } from '@mui/material';
import EventDetails from '@/types/IEventDetails';
import ImpactAssessment from '@/types/IImpactAssessment';
import triggerSubmit from '@/util/Prisma-API-handlers/handleSubmit';
import triggerDelete from '@/util/Prisma-API-handlers/handleDelete';
import triggerSave from '@/util/Prisma-API-handlers/handleSave';
import validImpactAssessmentId from './validImpactAssessmentId';
import EventState from '@/types/TEventState';

type SectionMap = {
    // formSection    : fieldName types
    "Event Details": EventDetails;
    "Impact Assessment": ImpactAssessment;
};

export default function useEventFormHandlers(
    initialEventDetails: EventDetails,
    initialImpactAssessment: ImpactAssessment,
    setInvalidImpactAssessmentId: (val: boolean) => void
) {
    const [eventDetails, setEventDetails] = useState<EventDetails>(initialEventDetails);
    const [impactAssessment, setImpactAssessment] = useState<ImpactAssessment>(initialImpactAssessment);
    const [alert, setAlert] = useState<{ open: boolean; severity: AlertColor; message: string }>({ open: false, severity: 'success', message: '' });

    // handleChange
    const handleChange = <S extends keyof SectionMap>(formSection: S) => (fieldName: keyof SectionMap[S]) => (
        newValue: string | string[] | number | Date | null
    ) => {
        // Reset dependent fields based on the field being changed
        const resetDependencyFields = (): Partial<EventDetails> => {
            if (fieldName === 'frequency') {
                return newValue === 'One-off'
                    ? { endDate: null, frequencyInterval: null, customFrequency: null, selectedDay: null }
                    : { customFrequency: null, selectedDay: null };
            }
            if (fieldName === 'customFrequency') return { selectedDay: null };
            if (fieldName === 'cluster') return { group: null, department: null };
            if (fieldName === 'group') return { department: null };
            return {};
        };

        // Determines which state to modify. Event Details or Impact Assessment
        if (formSection === "Event Details") {
            setEventDetails((currentEventDetails: EventDetails) => ({
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

    // handleDelete
    const handleDelete = (state: EventState) => (userResponse: string) => {
        if (userResponse === "Confirm") {
            triggerDelete(eventDetails.id, setAlert, state)
            setEventDetails((prev) => ({ ...prev, id: '' }));
        }
    };

    // handleSave
    const handleSave = () => {
        triggerSave(eventDetails, impactAssessment, handleChange, setAlert)
    }

    // handleSubmit
    const handleSubmit = async () => {
        const isValid = await validImpactAssessmentId(eventDetails, impactAssessment, setInvalidImpactAssessmentId);
        if (!isValid) return;
        triggerSubmit(eventDetails, impactAssessment, setAlert);
    }

    // handleUpdate
    const handleUpdate = async (userResponse: string) => {
        triggerSubmit(eventDetails, impactAssessment, setAlert, userResponse);
    }

    return {
        eventDetails,
        setEventDetails,
        impactAssessment,
        setImpactAssessment,
        alert,
        setAlert,
        handleChange,
        handleDelete,
        handleSave,
        handleSubmit,
        handleUpdate,
    };
}