import { Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/en-gb';

dayjs.extend(utc);

type CustomDatePickerProps = {
    label: string;
    value: Date | null;
    onChange: (date: Date | null) => void;

    // Optional props
    required?: boolean;
    xs?: number;
    sm?: number;
    md?: number;
    minSelectableDate?: Date | null;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    label,
    value,
    onChange,

    // Default values for optional props
    required = true,
    xs = 12,
    sm = 6,
    md = 6,
    minSelectableDate = new Date(),
}) => {
    // Handles dates with 16:00 UTC as the default time
    // and converts them to local time for display
    const handleDateChange = (newValue: Dayjs | null) => {
        const selectedDate = newValue?.hour() === 16
            ? newValue.utc().add(newValue.utcOffset(), 'minutes').toDate()
            : newValue?.toDate() ?? null;
        onChange(selectedDate);
    }

    return (
        <Grid mt={1} size={{ xs: xs, sm: sm, md: md }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DatePicker
                    label={label}
                    sx={{ mt: 1, width: "100%", bgcolor: "white" }}
                    minDate={dayjs(minSelectableDate)}
                    value={value ? dayjs(value) : null}
                    onChange={handleDateChange}
                    slotProps={{
                        textField: { required },
                        actionBar: { actions: ['today'] },
                    }}
                    views={['year', 'month', 'day']}
                />
            </LocalizationProvider>
        </Grid>
    );
}

export default CustomDatePicker;
