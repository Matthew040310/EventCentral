import { Box, Stack, Chip, } from '@mui/material';
import { Event_Legend } from '@/styles/theme';

const LegendExplanation = [
    "New or Existing with Change Event – Affects > 1,000,000 citizens",
    "New or Existing with Change Event – Affects >= 100,000 citizens",
    "New or Existing with Change Event – Affects < 100,000 citizens",
    "Existing Event – Affects >= 100,000 citizens",
    "Existing Event – Affects < 100,000 citizens"
]

const CalendarLegend = ({ width }: { width: string }) => (
    <Box sx={{ p: 2, my: 2, width: { width } }}>
        <Stack direction="row" textAlign='center' justifyContent="center" spacing={2}>
            {Object.keys(Event_Legend).map((key, index) => (
                <Chip
                    key={key}
                    label={key}
                    title={LegendExplanation[index]}
                    sx={{
                        backgroundColor: Event_Legend[key as keyof typeof Event_Legend],
                        color: '#fff',
                        fontWeight: 500,
                        boxShadow: 1,
                        minWidth: '7vw',
                    }}
                />
            ))}
        </Stack>
    </Box>
);

export default CalendarLegend;