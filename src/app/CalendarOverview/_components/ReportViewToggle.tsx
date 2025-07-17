import React from 'react'
import { Button, Paper, Stack } from '@mui/material'

interface ReportViewToggleProps {
    selectedReportView: string;
    setSelectedReportView: (view: string) => void;
}

const ReportViewToggle: React.FC<ReportViewToggleProps> = ({
    selectedReportView,
    setSelectedReportView
}) => {
    return (
        <Paper sx={{ width: '100%', px: 3, py: 1, mt: 2, bgcolor: "white" }}>
            <Stack direction="row" alignItems="center">
                <Button variant={selectedReportView === "Table" ? 'contained' : 'outlined'}
                    onClick={() => setSelectedReportView("Table")}>
                    Table View
                </Button>
                <Button variant={selectedReportView === "Write Up" ? 'contained' : 'outlined'}
                    onClick={() => setSelectedReportView("Write Up")}>
                    Write Up Only
                </Button>
            </Stack>
        </Paper>
    )
}

export default ReportViewToggle