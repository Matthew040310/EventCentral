"use client";
import { TextField } from "@mui/material";

interface TextInputFieldProps {
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    required?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
    label,
    value,
    onChange,
    required = true,
}) => {
    return (
        <TextField
            sx={{ bgcolor: "white" }}
            fullWidth
            margin="dense"
            label={label}
            value={value || ""}
            required={required}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default TextInputField;