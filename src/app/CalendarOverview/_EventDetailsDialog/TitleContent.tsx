import { Stack, Typography, Chip } from '@mui/material';
import { EventAvailable } from '@mui/icons-material';
import FullEventReport from '@/types/IFullEventReport';

const TitleContent = ({ eventDetails }: { eventDetails: Partial<FullEventReport> }) => {
    const { title, type, embargoed } = eventDetails;

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <EventAvailable color="primary" />
            <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                {title}
            </Typography>
            <Chip label={type} color={type === "New" ? "success" : "info"} size="small" />
            <Chip label={embargoed === "Yes" ? "Embargoed" : "Not Embargoed"} size="small" color={embargoed === "Yes" ? "warning" : "default"} />
        </Stack>
    )
}

export default TitleContent