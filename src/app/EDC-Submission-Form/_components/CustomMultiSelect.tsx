import { Autocomplete, Chip, Grid, TextField, } from '@mui/material';

interface CustomMultiSelectProps {
    value: string[];
    onChange: (event: React.SyntheticEvent, newValue: string[] | null) => void;
    options: string[];
    label: string;
    freeSolo?: boolean;
    required?: boolean;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
    value,
    onChange,
    options,
    label,
    freeSolo = true,
    required = true

}) => (
    <Grid mt={1} size={{ xs: 12, sm: 9 }}>
        <Autocomplete
            sx={{ bgcolor: "white" }}
            multiple
            freeSolo={freeSolo}
            options={options}
            value={value}
            onChange={onChange}
            renderValue={(value, props) =>
                value.map((option, index) => (
                    <Chip label={option} {...props({ index })} key={index} />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder="Type to create new tags"
                    required={required}
                />
            )}
        />
    </Grid>
)

export default CustomMultiSelect;