import React from "react";
import { Dialog, DialogTitle, DialogContent, Grid } from "@mui/material";
import { Info, Subject, } from "@mui/icons-material";

import { DividerWithText, TypographyB2 } from "./_EventDetailsDialog/DialogComponents";
import TitleContent from "./_EventDetailsDialog/TitleContent";
import EventDetailsContent from "./_EventDetailsDialog/EventDetailsContent";
import ImpactAssessmentContent from "./_EventDetailsDialog/ImpactAssessmentContent";
import DialogButtons from "./_EventDetailsDialog/DialogButtons";

import FullEventReport from "@/types/IFullEventReport";

interface EventDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    eventDetails: Partial<FullEventReport>;
}

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
    open,
    onClose,
    eventDetails
}) => {
    if (!eventDetails) return null;

    const { id, submittedImpactAssessment, draftImpactAssessment } = eventDetails;
    const impactAssessmentReference = submittedImpactAssessment || draftImpactAssessment;
    const state = impactAssessmentReference == submittedImpactAssessment ? "Submitted" : "Draft";

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <TitleContent eventDetails={eventDetails} />
            </DialogTitle>
            <DialogContent dividers>
                <EventDetailsContent eventDetails={eventDetails} />

                <DividerWithText icon={<Info color="action" />}>Impact Assessment</DividerWithText>

                <Grid container spacing={2}>
                    {impactAssessmentReference
                        ? <ImpactAssessmentContent eventDetails={eventDetails} />
                        : <TypographyB2>No Impact Assessment submitted.</TypographyB2>
                    }
                </Grid>

                {impactAssessmentReference && (
                    <>
                        <DividerWithText icon={<Subject color="action" />}>Event Write Up</DividerWithText>
                        <TypographyB2>{impactAssessmentReference.eventWriteUp}</TypographyB2>
                    </>
                )}
            </DialogContent>
            <DialogButtons id={id} state={state} onClose={onClose} />
        </Dialog>
    );
}

export default EventDetailsDialog;