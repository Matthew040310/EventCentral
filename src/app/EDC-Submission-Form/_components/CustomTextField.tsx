import { Grid, TextField, TextFieldProps } from '@mui/material';

type CustomTextFieldProps = TextFieldProps & {
    xs?: number;
    sm?: number;
    margin?: "none" | "dense" | "normal";
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    xs = 12,
    sm = 6,
    margin = "dense",
    ...textFieldProps
}) => (
    <Grid mt={1} size={{ xs: xs, sm: sm }}>
        <TextField
            sx={{ bgcolor: "white" }}
            fullWidth
            margin={margin}
            required
            {...textFieldProps}
        />
    </Grid>
);

export default CustomTextField;