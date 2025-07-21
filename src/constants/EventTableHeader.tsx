import { GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';

import HyperlinkTitle from '@/components/_EventTableRenderCells/HyperlinkTitle';
import AvailableActions from '@/components/_EventTableRenderCells/AvailableActions';

import FullEventReport from '@/types/IFullEventReport';
import EventState from '@/types/TEventState';
import UserRole from '@/types/TUserRole';
import { EVENT_TYPE } from '@/constants/EventCentralConstants';

import dateFormatter from '@/util/dateFormatter';

const Yes_No_Params: Partial<GridColDef> = {
    type: "singleSelect",
    valueOptions: ['Yes', 'No'],
    align: 'center',
    headerAlign: 'center',
}

const EventTableHeader = (
    state: EventState,
    role: UserRole = "Admin",
    openDeleteDialog: (eventID: string) => void,
    onHyperlinkClick: (eventDetails: Partial<FullEventReport>) => void
) => {

    let impactAssessmentLink = "";
    if (state === 'Draft') impactAssessmentLink = "draftImpactAssessment";
    else impactAssessmentLink = "submittedImpactAssessment";

    const ColumnHeaders: GridColDef[] = [
        { field: 'type', headerName: 'Type', type: "singleSelect", valueOptions: EVENT_TYPE, flex: 1, },
        {
            field: 'title', headerName: 'Title', flex: 5,
            renderCell: (params) => <HyperlinkTitle{...params} state={state} onHyperlinkClick={onHyperlinkClick} />
        },
        { field: 'department', headerName: 'Department', flex: 1, },
        {
            field: 'startDate', headerName: 'Event Date', type: 'dateTime', flex: 1,
            valueFormatter: (value, row) => { return dateFormatter(value) }
        },
        { field: "affectedCohortDescription", headerName: "Affected Cohort", flex: 1, },
        { field: "estimatedCohortSize", headerName: "Volume", type: 'number', flex: 1, },
        {
            field: 'perceivedUnhappiness', headerName: 'Unhappiness?', ...Yes_No_Params, description: "Will this event have perceived unhappiness from members?",
            valueGetter: (value, row) => row[impactAssessmentLink]?.perceivedUnhappiness || '', align: 'center', flex: 1,
        },
        {
            field: 'generateInterest', headerName: 'Interest?', ...Yes_No_Params, description: "Will this event generate interest from members?",
            valueGetter: (value, row) => row[impactAssessmentLink]?.generateInterest || '', flex: 1,
        },
        {
            field: 'haveAnnouncement', headerName: 'Announcement?', ...Yes_No_Params, description: "Will there be any announcement for the event?",
            valueGetter: (value, row) => row[impactAssessmentLink]?.haveAnnouncement || '', flex: 1,
        },
        {
            field: 'haveNotification', headerName: 'Notifications?', ...Yes_No_Params, description: "Will there be notification(s) sent to members?",
            valueGetter: (value, row) => row[impactAssessmentLink]?.haveNotification || '', flex: 1,
        },
        {
            field: 'haveActionRequired', headerName: 'Call to Action?', ...Yes_No_Params, description: "Will this event require any action from members?",
            valueGetter: (value, row) => row[impactAssessmentLink]?.haveActionRequired || '', flex: 1,
        },
        {
            field: 'actions', type: 'actions', flex: 1,
            getActions: (params: GridRowParams) => (AvailableActions(params, state, role, openDeleteDialog))
        },
    ];

    return ColumnHeaders;
}

export default EventTableHeader