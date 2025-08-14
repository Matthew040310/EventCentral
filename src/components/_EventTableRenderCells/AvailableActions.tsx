import { JSX } from "react";
import { GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { ContentCopy, Delete, Edit } from "@mui/icons-material";

// Interfaces
import EventState from "@/types/TEventState";

// Functions
import { canEditEvent, canDeleteEvent } from "@/util/AccessRights";

// Declared as function as it elements are required to be returned as an array
export default function AvailableActions(
    router: ReturnType<typeof useRouter>,
    params: GridRowParams,
    state: EventState,
    sessionToken: Session | null,
    openDeleteDialog: (eventID: string) => void
): JSX.Element[] {

    const canDelete = sessionToken?.user?.role === "Admin"

    const AllowedActions = [
        <GridActionsCellItem label="Duplicate" title="Duplicate" icon={<ContentCopy />}
            onClick={() => router.push(`/EDC-Submission-Form?id=${params.id}&state=${state}&duplicate=true`)}
        />,
        <GridActionsCellItem label="Edit" title="Edit" icon={<Edit />}
            onClick={() => router.push(`/EDC-Submission-Form?id=${params.id}&state=${state}`)}
        />
    ];

    if (canDelete) {
        AllowedActions.push(
            <GridActionsCellItem label="Delete" title="Delete" icon={<Delete />}
                onClick={() => openDeleteDialog(params.id as string)}
            />
        );
    }
    return AllowedActions;
}