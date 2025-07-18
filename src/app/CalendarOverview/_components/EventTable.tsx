"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid, GridCallbackDetails, GridFilterModel, GridRowId, GridInitialState, GridRowSelectionModel } from '@mui/x-data-grid';
import { Alert, AlertColor, Box, Button, Fade, Paper, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

import PopUpDialog from '@/components/popUpDialog';

import FullEventReport from "@/types/IFullEventReport";
import EventState from '@/types/TEventState';
import UserRole from '@/types/TUserRole';
import { DELETE_OPTIONS } from '@/constants/EventCentralConstants';
import EventTableHeader from '@/constants/EventTableHeader';

import triggerDelete from '@/util/Prisma-API-handlers/handleDelete';

const initialState: GridInitialState = {
  pagination: {
    paginationModel: { pageSize: 5, },
  },
  sorting: {
    sortModel: [{ field: 'startDate', sort: 'asc' }],
  }
}

interface EventTableProps {
  state: EventState;
  role: UserRole;
  backgroundColor?: string;
  EventReports: Partial<FullEventReport>[] | FullEventReport[];
  onDeleteSuccess: () => void
  onHyperlinkClick: (eventDetails: Partial<FullEventReport>) => void;
  unifiedSearch?: boolean;
  searchKeyword?: string;
}

const EventTable: React.FC<EventTableProps> = ({
  state,
  role,
  backgroundColor = "white",
  EventReports,
  onDeleteSuccess,
  onHyperlinkClick,
  unifiedSearch = false,
  searchKeyword = ""
}) => {
  const [selectedEvents, setSelectedEvents] = useState<GridRowId[]>([]);
  const [alert, setAlert] = useState<{ open: boolean; severity: AlertColor; message: string }>({ open: false, severity: 'success', message: '' })
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [],
  });

  useEffect(() => {
    setFilterModel((currentFilter) => ({
      ...currentFilter,
      quickFilterValues: searchKeyword
        ? searchKeyword.split(' ')
        : [],
    }));
  }, [searchKeyword]);

  const handleRowSelection = (
    newSelection: GridRowSelectionModel,
    details: GridCallbackDetails) => {
    setSelectedEvents([...newSelection.ids])
  }

  const openDeleteDialog = (eventID: GridRowId) => {
    setSelectedEvents([eventID])
    setDialogOpen(true)
  }

  const handleDelete = async (userResponse: string) => {
    if (userResponse === "Confirm") {
      await triggerDelete(selectedEvents as string[], setAlert, state)
      onDeleteSuccess()
    }
    setDialogOpen(false)
    setSelectedEvents([])
  }

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        setAlert(prev => ({ ...prev, open: false }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [alert.open]);

  const headers = useMemo(() => EventTableHeader(state, role, openDeleteDialog, onHyperlinkClick), [state, role, openDeleteDialog, onHyperlinkClick]);
  const pageSizeOptions = useMemo(() => [5, 10, 20, 50], []);
  const deleteDescription = useMemo(() => `Are you sure you want to delete <u><b>${selectedEvents.length}</b></u> event(s)? This action cannot be undone.`, [selectedEvents.length]);

  return (
    <Paper sx={{ width: '100%', px: 3, py: 1, mb: 2, bgcolor: backgroundColor }}>

      {/* Header with delete button */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          {state} Events{` (${EventReports.length})`}
        </Typography>

        <Fade in={alert.open} timeout={1000}>
          <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
            {alert.message}
          </Alert>
        </Fade>

        {/* Delete Button */}
        <Button
          variant='contained'
          color='error'
          disabled={selectedEvents.length === 0}
          onClick={() => setDialogOpen(true)}
          endIcon={<Delete />}>
          Delete
        </Button>
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
        rows={EventReports}
        initialState={initialState}
        onFilterModelChange={setFilterModel}
        filterModel={filterModel}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        autosizeOnMount
        showToolbar
        slotProps={{ toolbar: { showQuickFilter: (!unifiedSearch) } }}
      />
    </Paper>
  )
}

export default EventTable
