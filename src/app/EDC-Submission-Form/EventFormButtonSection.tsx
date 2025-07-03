import { Session } from 'next-auth';
import { Grid } from '@mui/material';
import { Delete, Save, Send } from '@mui/icons-material';

import ButtonWithDialog from '@/components/ButtonWithDialog'
import CustomButton from '@/components/CustomButton';

import EventDetails from '@/types/IEventDetails';
import EventState from '@/types/TEventState';
import { UPDATE_OPTIONS, DELETE_OPTIONS } from '@/constants/EventCentralConstants';

const updateDescription = `
    <b>Update this Event Only</b>:<br> 
    <i>Only the selected event will be updated. Other events remain unchanged.</i><br><br>
    <b>Update Future Events</b>: <br>
    <i>Updates all events from the specified start date to the end date. The new event frequency will replace the existing schedule within this period.</i><br><br>
    <span style='color:red'><b>Overwrite Future Events</b></span>: <br>
    <i>Deletes all future events after this one, then recreates them using the current event’s details and schedule.</i>
    `;

interface EventFormButtonsProps {
    session: Session | null;
    eventDetails: EventDetails;
    isFieldsValid: boolean;
    state: EventState;
    handleDelete: (e: string) => void;
    handleSave: () => void;
    handleSubmit: () => void;
    handleUpdate: (e: string) => void;
}

const EventFormButtonSection: React.FC<EventFormButtonsProps> = ({
    session,
    eventDetails,
    isFieldsValid,
    state,
    handleDelete,
    handleSave,
    handleSubmit,
    handleUpdate,
}) => (
    <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }} spacing={2}>
        {/* Delete Button */}
        <ButtonWithDialog
            color="error"
            disabled={!session || !eventDetails.id}
            endIcon={<Delete />}
            dialogOnClick={handleDelete}
            title="Warning"
            description="Are you sure you want to delete this event? This action cannot be undone."
            buttons={DELETE_OPTIONS}
        >
            Delete
        </ButtonWithDialog>

        {/* Save Button */}
        <CustomButton
            color="secondary"
            disabled={!session || (!eventDetails.estimatedStartDate && !eventDetails.startDate)}
            endIcon={<Save />}
            onClick={handleSave}
        >
            Save
        </CustomButton>

        {/* Submit / Update Button */}
        {state !== "Submitted"
            ? (<CustomButton
                color="success"
                disabled={!isFieldsValid || !session}
                endIcon={<Send />}
                onClick={handleSubmit}>
                Submit
            </CustomButton>)

            : (<ButtonWithDialog
                color="success"
                disabled={!isFieldsValid || !session}
                endIcon={<Send />}
                dialogOnClick={handleUpdate}
                title="Check Scope of Update"
                description={updateDescription}
                buttons={UPDATE_OPTIONS}>
                Update
            </ButtonWithDialog>)
        }
    </Grid >
);

export default EventFormButtonSection;
