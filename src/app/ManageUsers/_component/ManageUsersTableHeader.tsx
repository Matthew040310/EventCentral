import { GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { ContentCopy, Delete, Edit } from "@mui/icons-material";

import { USER_ROLES, ALL_DEPARTMENTS, ALL_GROUPS, ALL_CLUSTERS } from '@/constants/EventCentralConstants';


const ManageUsersTableHeader = (
    router: ReturnType<typeof useRouter>,
    openDeleteDialog: (userID: string) => void,
) => {

    const ColumnHeaders: GridColDef[] = [
        { field: 'name', headerName: 'User Name', flex: 2, },
        { field: 'email', headerName: 'Email', flex: 2, },
        { field: 'role', headerName: 'Role', type: "singleSelect", valueOptions: USER_ROLES, flex: 1, },
        { field: 'department', headerName: 'Department', type: "singleSelect", valueOptions: ALL_DEPARTMENTS, flex: 1, },
        { field: 'group', headerName: 'Group', type: "singleSelect", valueOptions: ALL_GROUPS, flex: 1, },
        { field: 'cluster', headerName: 'Cluster', type: "singleSelect", valueOptions: ALL_CLUSTERS, flex: 1, },
        {
            field: 'actions', type: 'actions', flex: 1,
            getActions: (params: GridRowParams) => [
                // <GridActionsCellItem label="Duplicate" title="Duplicate" icon={<ContentCopy />}
                //     onClick={() => router.push(`#`)}
                // />,
                <GridActionsCellItem label="Edit" title="Edit" icon={<Edit />}
                    onClick={() => router.push(`/ManageUsers/AccessRights/${encodeURIComponent(params.row.email)}`)}
                />,
                <GridActionsCellItem label="Delete" title="Delete" icon={<Delete />}
                    onClick={() => openDeleteDialog(params.id as string)}
                />
            ]
        },
    ];

    return ColumnHeaders;
}

export default ManageUsersTableHeader