"use client";
import { TextField } from "@mui/material";

interface TextInputFieldProps {
    label: string;
    value: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
    label,
    value,
}) => {
    return (
        <TextField sx={{ mb: 2 }}
            fullWidth
            margin="dense"
            disabled
            label={label}
            value={value || ""}
        />
    );
}

export default TextInputField;