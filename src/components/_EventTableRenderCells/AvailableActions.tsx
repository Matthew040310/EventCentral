import { JSX } from "react";
import { GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { ContentCopy, Delete, Edit } from "@mui/icons-material";
import EventState from "@/types/TEventState";
import UserRole from "@/types/TUserRole";

// Declared as function as it elements are required to be returned as an array
export default function AvailableActions(
    params: GridRowParams,
    state: EventState,
    role: UserRole = "User",
    openDeleteDialog: (eventID: string) => void, // WIP: To delete specific event
): JSX.Element[] {

    const canDelete = role === "Admin"
    const router = useRouter();

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