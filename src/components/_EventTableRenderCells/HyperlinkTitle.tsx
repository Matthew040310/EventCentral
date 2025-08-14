import { GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";
import { PriorityHigh } from "@mui/icons-material";

import EventState from "@/types/TEventState";
import FullEventReport from "@/types/IFullEventReport";

interface HyperlinkTitleProps extends GridRenderCellParams<any, String> {
    state: EventState;
    onHyperlinkClick: (eventDetails: Partial<FullEventReport>) => void
}

const HyperlinkTitle: React.FC<HyperlinkTitleProps> = (props) => {
    const { value, row, state, onHyperlinkClick } = props;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }} title={row.title}
                onClick={(e) => {
                    e.stopPropagation();
                    onHyperlinkClick(row);
                }}>
                {value}
            </span >
            {state === "Submitted" && row?.embargoed === "Yes" && (
                <Chip sx={{ ml: 1 }} color="warning" size="small" variant="outlined"
                    label="Embargoed" icon={<PriorityHigh />} />
            )}
        </Box>
    );
};

export default HyperlinkTitle;