"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DataGrid, GridCallbackDetails, GridFilterModel, GridRowId, GridInitialState, GridRowSelectionModel } from '@mui/x-data-grid';
import { Alert, AlertColor, Box, Button, Fade, Paper, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

import PopUpDialog from '@/components/popUpDialog';

import UserDetails from '@/types/IUserDetails';
import { DELETE_OPTIONS } from '@/constants/EventCentralConstants';
import ManageUsersTableHeaders from './ManageUsersTableHeader';


const initialState: GridInitialState = {
    pagination: {
        paginationModel: { pageSize: 5, },
    },
    sorting: {
        sortModel: [{ field: 'name', sort: 'asc' }],
    }
}

interface ManageUsersTableProps {
    backgroundColor?: string;
    users: UserDetails[];
    onDeleteSuccess: () => void
}

const ManageUsersTable: React.FC<ManageUsersTableProps> = ({
    backgroundColor = "white",
    users,
    onDeleteSuccess,
}) => {
    const router = useRouter();
    const [selectedUsers, setSelectedUsers] = useState<GridRowId[]>([]);
    const [alert, setAlert] = useState<{ open: boolean; severity: AlertColor; message: string }>({ open: false, severity: 'success', message: '' })
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleRowSelection = (
        newSelection: GridRowSelectionModel,
        details: GridCallbackDetails) => {
        setSelectedUsers([...newSelection.ids])
    }

    const openDeleteDialog = (userID: GridRowId) => {
        setSelectedUsers([userID])
        setDialogOpen(true)
    }

    const handleDelete = async (userResponse: string) => {
        if (userResponse === "Confirm") {
            console.log("Trigger Delete")
            onDeleteSuccess()
        }
        setDialogOpen(false)
        setSelectedUsers([])
    }

    useEffect(() => {
        if (alert.open) {
            const timer = setTimeout(() => {
                setAlert(prev => ({ ...prev, open: false }))
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [alert.open]);

    const headers = useMemo(() => ManageUsersTableHeaders(router, openDeleteDialog), []);
    const pageSizeOptions = useMemo(() => [5, 10, 20, 50], []);
    const deleteDescription = useMemo(() => `Are you sure you want to delete <u><b>${selectedUsers.length}</b></u> user(s)? This action cannot be undone.`, [selectedUsers.length]);

    return (
        <Paper sx={{ width: '100%', px: 3, py: 1, mb: 2, bgcolor: backgroundColor }}>

            {/* Header with delete button */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    Manage Users
                </Typography>

                <Fade in={alert.open} timeout={1000}>
                    <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                        {alert.message}
                    </Alert>
                </Fade>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Add Button */}
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => router.push("#")}
                        endIcon={<Add />}>
                        Add New User
                    </Button>

                    {/* Delete Button */}
                    <Button
                        variant='contained'
                        color='error'
                        disabled={selectedUsers.length === 0}
                        onClick={() => setDialogOpen(true)}
                        endIcon={<Delete />}>
                        Delete Users
                    </Button>
                </Box>
            </Box>

            {/* Dialog for Delete Button Click */}
            <PopUpDialog
                open={dialogOpen}
                onClose={() => { setDialogOpen(false); }}
                onClick={(userResponse) => handleDelete(userResponse)}
                title="Warning"
                description={deleteDescription}
                buttons={DELETE_OPTIONS} />

            {/* Event Table */}
            <DataGrid sx={{ border: 0, backgroundColor: backgroundColor }}
                columns={headers}
                rows={users}
                initialState={initialState}
                pageSizeOptions={pageSizeOptions}
                checkboxSelection
                onRowSelectionModelChange={handleRowSelection}
                showToolbar
            />

        </Paper>
    )
}

export default ManageUsersTable;