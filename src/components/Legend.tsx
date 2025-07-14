import { Box, Stack, Chip, } from '@mui/material';
import { Event_Legend } from '@/styles/theme';

const LegendExplanation = [
    "Potential to cause perceived unhappiness among members \nOR \nEmbargoed Event",
    "New or Existing with Changes Event",
    "Existing Event",
    "Draft Event"
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
                        color: key !== "Draft" ? "white" : "black",
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