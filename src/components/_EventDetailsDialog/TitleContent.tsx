import { Stack, Typography, Chip } from '@mui/material';
import { EventAvailable } from '@mui/icons-material';
import FullEventReport from '@/types/IFullEventReport';

interface TitleContentProps {
    eventDetails: Partial<FullEventReport>;
    eventColor: string;
}

const TitleContent: React.FC<TitleContentProps> = ({
    eventDetails,
    eventColor,
}) => {
    const { title, embargoed } = eventDetails;

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <EventAvailable sx={{ color: eventColor }} />
            <Typography variant="h6" component="span" sx={{ flexGrow: 1 }} color={eventColor}>
                {title}
            </Typography>
            {embargoed === "Yes" &&
                <Chip label="Embargoed" size="small" sx={{ color: eventColor }} />
            }
        </Stack>
    )
}

export default TitleContent