import { Autocomplete, Grid, TextField } from '@mui/material';

type CustomDropDownProps = {
    label: string;
    options: string[];
    value: string | null;
    onChange: (event: React.SyntheticEvent, newValue: string | null) => void;

    // Optional props
    disabled?: boolean;
    xs?: number;
    sm?: number;
    required?: boolean;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
    label,
    options,
    value,
    onChange,

    // Default values for optional props
    disabled = false,
    xs = 12,
    sm = 6,
    required = true,
}) => (
    <Grid mt={1} size={{ xs: xs, sm: sm }}>
        <Autocomplete
            sx={{ bgcolor: "white" }}
            options={options}
            value={value}
            onChange={onChange}
            disabled={disabled}
            renderInput={(params) => (
                <TextField {...params} label={label} required={required} />
            )}
        />
    </Grid>
);

export default CustomDropDown;