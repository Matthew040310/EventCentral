"use client";
import { Autocomplete, TextField } from "@mui/material";

interface DropDownFieldProps {
    label: string;
    options: string[];
    value: string;
    onChange: (newValue: string | null) => void;
}

const DropDownField: React.FC<DropDownFieldProps> = ({
    label, options, value, onChange
}) => {
    return (
        <Autocomplete
            sx={{ bgcolor: "white" }}
            options={options}
            value={value || ""}
            onChange={(_, newValue) => onChange(newValue)}
            renderInput={(params) => (
                <TextField {...params} label={label} required />
            )}
        />
    );
}

export default DropDownField;