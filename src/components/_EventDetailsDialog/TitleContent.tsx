import { Stack, Typography, Chip } from '@mui/material';
import { EventAvailable } from '@mui/icons-material';

import FullEventReport from '@/types/IFullEventReport';
import dateFormatter from '@/util/dateFormatter';

interface TitleContentProps {
    eventDetails: Partial<FullEventReport>;
    eventColor: string;
}

const TitleContent: React.FC<TitleContentProps> = ({
    eventDetails,
    eventColor,
}) => {
    const { title, eventDate, embargoed } = eventDetails;

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={1}>
                <EventAvailable sx={{ color: eventColor }} />
                <Typography variant="h6" component="span" sx={{ flexGrow: 1 }} color={eventColor}>
                    {title}
                </Typography>
                {embargoed === "Yes" &&
                    <Chip label="Embargoed" size="small" color="error" />
                }
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt={0.2}>
                <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Event Date:
                </Typography>
                <Typography variant="subtitle1" component="span">
                    {dateFormatter(eventDate as Date)}
                </Typography>
            </Stack>
        </>
    )
}

export default TitleContent