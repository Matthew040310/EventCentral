import EventDetails from './IEventDetails';
import EventState from './TEventState';

export default interface EventDetailsProps {
    handleInputChange: (fieldName: keyof EventDetails) => (value: string | string[] | number | Date | null) => void;
    inputFields: EventDetails;
    state?: EventState;
}