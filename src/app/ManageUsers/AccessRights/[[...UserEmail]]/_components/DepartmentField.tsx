"use client";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { ALL_DEPARTMENTS } from "@/constants/EventCentralConstants";

interface DepartmentFieldProps {
    value: string[];
    onChange: (newValue: string[] | null) => void;
}

const DepartmentField: React.FC<DepartmentFieldProps> = ({
    value, onChange
}) => {
    return (
        <Autocomplete
            sx={{ bgcolor: "white" }}
            multiple
            freeSolo
            options={ALL_DEPARTMENTS}
            value={value || []}
            onChange={(_, newValue) => onChange(newValue)}
            renderValue={(selected, getTagProps) =>
                selected.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} key={option} />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Department"
                    placeholder="Type to create new tags"
                    required
                />
            )}
        />
    );
}

export default DepartmentField;