import React from "react"
import Link from "next/link"
import { Box, Button } from "@mui/material"
import { Close, Edit } from "@mui/icons-material"

interface DialogButtonsProps {
    id: string | null | undefined;
    state: string;
    onClose: () => void;
}

const DialogButtons: React.FC<DialogButtonsProps> = ({ id, state, onClose }) => (
    <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Link href={`/EDC-Submission-Form?id=${id}&state=${state}`}>
            <Button color="secondary" variant="contained" startIcon={<Edit />} sx={{ mr: 1 }}>
                Edit
            </Button>
        </Link>
        <Button onClick={onClose} sx={{ '&:hover': { bgcolor: '#6C9A8B' } }} variant="contained" startIcon={<Close />} >
            Close
        </Button>
    </Box >
)

export default DialogButtons;