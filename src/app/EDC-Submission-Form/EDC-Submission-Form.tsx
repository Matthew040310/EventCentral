"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';

// Components
import { Alert, Box, Button, Container, Fade, Grid, Tooltip, Typography } from '@mui/material';
import EventDetailsSection from './EventDetailsSection';
import ImpactAssessmentSection from './ImpactAssessmentSection';
import EventFormButtonSection from './EventFormButtonSection';
import CustomTextField from './_components/CustomTextField';
import CustomDropDown from './_components/CustomDropDown';
import PopUpDialog from '@/components/popUpDialog';

// Interfaces & Constants
import EventState from '@/types/TEventState';
import { STATUS } from '@/constants/EventCentralConstants';
import DefaultEventDetails from '@/constants/DefaultEventDetails';
import DefaultImpactAssessment from '@/constants/DefaultImpactAssessment';

// Functions
import getEventReportByID from '@/util/Prisma-API-handlers/getEventReportByID';
import clickToCopy from '@/util/clickToCopy';
import fieldsValid from './_functions/fieldsValid';

// Hooks
import useEventFormHandlers from './_functions/useEventFormHandlers';

const EventForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // useState hooks
    const [failedRetrieveEventID, setFailedRetrieveEventID] = useState({ id: "", state: "" });
    const [copied, setCopied] = useState(false);                      // For Impact Assessment ID copy success message upon button click
    const [invalidImpactAssessmentId, setInvalidImpactAssessmentId] = useState(false);

    const {
        eventDetails, setEventDetails,
        impactAssessment, setImpactAssessment,
        alert, setAlert,
        handleChange,
        handleDelete,
        handleSave,
        handleSubmit,
        handleUpdate,
    } = useEventFormHandlers(DefaultEventDetails, DefaultImpactAssessment, setInvalidImpactAssessmentId)

    /* Populate previous data if id is provided in the query */
    const id = searchParams.get('id');
    const state = searchParams.get('state');
    const duplicate = searchParams.get('duplicate');
    useEffect(() => {
        const loadData = async () => {
            if (id) {
                try {
                    const mappedState = state === "Submitted" ? "Submitted" : state === "Draft" ? "Draft" : undefined;
                    const result = await getEventReportByID(id as string, mappedState);
                    if (!result || !result.eventDetails.id) {
                        setFailedRetrieveEventID({ id: id as string, state: state == "Submitted" ? "Submitted" : "Draft" });
                        router.push('/EDC-Submission-Form');
                        return;
                    }

                    const { eventDetails, impactAssessment } = result;
                    if (state === "Submitted" && eventDetails.type === "Existing") {
                        eventDetails.type = "Existing with Changes";
                    }
                    setEventDetails(currentEventDetails => ({
                        ...currentEventDetails,
                        ...eventDetails,
                    }));
                    setImpactAssessment(currentImpactAssessment => ({
                        ...currentImpactAssessment,
                        ...impactAssessment,
                    }));

                    // Reset id fields and push if form is in duplicate mode
                    if (duplicate === "true") {
                        const { parentid, impactAssessmentId, ...duplicatedEventDetails } = eventDetails;
                        const { id: impactID, ...duplicatedImpactAssessment } = impactAssessment;
                        duplicatedEventDetails.id = null; // Remove id to create a new submission
                        setEventDetails({ ...duplicatedEventDetails });
                        setImpactAssessment({ ...duplicatedImpactAssessment });
                        router.push('/EDC-Submission-Form');
                    }
                }

                catch (error) {
                    console.error('Error loading data:', error);
                    router.push('/EDC-Submission-Form');
                }
            }
        };
        loadData();
    }, [id, state]);

    const isFieldsValid = useMemo(
        () => fieldsValid(eventDetails, impactAssessment),
        [eventDetails, impactAssessment]
    );

    return (
        <Container maxWidth="sm">
            <Head>
                <title>EventCentral - EDC Submission Form</title>
            </Head>
            {failedRetrieveEventID.id &&
                <Typography variant="subtitle1" sx={{ mt: 3, mb: 0.5 }} color="red">
                    Provided Event ID <b><u>{failedRetrieveEventID.id}</u></b> does not exist in <b><u>{failedRetrieveEventID.state}</u></b> state.
                </Typography>
            }
            <Box sx={{ mt: 3 }}>
                <h2>Event and Demand Submission Form</h2>

                <Typography fontSize={20} sx={{ mb: 2 }}>
                    1. Event Details
                </Typography>

                <EventDetailsSection
                    handleInputChange={handleChange("Event Details")}
                    inputFields={eventDetails}
                    state={state === "Submitted" ? "Submitted" : "Draft"} />

                {/* Impact Assessment Inputs - Only shown for New or Recurring with Changes Events */}
                {(eventDetails.type === "New" || eventDetails.type === "Existing with Changes") &&
                    <>
                        <Typography variant='subtitle2' sx={{ mt: 5, bgcolor: 'warning.light' }}>
                            As this is a <u>{eventDetails.type}</u> event, it requires collaboration with CUG to assess its impact and develop mitigation strategies.
                            Please provide the following details
                        </Typography>

                        <Typography fontSize={20} sx={{ mt: 2 }}>
                            2. Impact Assessment
                            {state === "Submitted" &&
                                <Tooltip title={copied ? "Copied!" : "Copy ID"} arrow>
                                    <Box component="span" sx={{ float: "right", width: { xs: "100%", sm: "auto" }, mb: 2, fontSize: '0.8rem' }} >
                                        ID:
                                        <Button color="info" size="small"
                                            onClick={() => clickToCopy(impactAssessment.id!, setCopied)}>
                                            {impactAssessment.id}
                                        </Button>
                                    </Box>
                                </Tooltip>}
                        </Typography>

                        <ImpactAssessmentSection
                            handleInputChange={handleChange("Impact Assessment")}
                            inputFields={impactAssessment} />
                    </>
                }

                {/* Optional field to tag existing event to previously submitted Impact Assessment */}
                {eventDetails.type === "Existing" &&
                    <>
                        <Typography variant='body2' sx={{ mt: 2, bgcolor: 'lightgrey' }}>
                            <u><strong>Optional</strong></u>:{" "}
                            Enter the <b>Original Impact Assessment ID</b> if you want to associate this event with an existing Impact Assessment.
                        </Typography>
                        <CustomTextField label="Impact Assessment ID"
                            name="parentid"
                            value={impactAssessment.id ?? ""}
                            onChange={(e) => handleChange("Impact Assessment")("id")(e.target.value) ?? ""}
                            disabled={state == "Submitted"}
                            required={false} />
                    </>}

                {/* Report Status */}
                <Grid size={12}>
                    <CustomDropDown label="Report Status?" sm={12}
                        options={STATUS}
                        value={eventDetails.reportStatus}
                        onChange={(_, newValue) => handleChange("Event Details")("reportStatus")(newValue)} />
                </Grid>

                <EventFormButtonSection
                    eventDetails={eventDetails}
                    isFieldsValid={isFieldsValid}
                    state={state as EventState}
                    handleDelete={handleDelete(state as EventState)}
                    handleSave={handleSave}
                    handleSubmit={handleSubmit}
                    handleUpdate={handleUpdate} />

                {/* Status Message of Button Click */}
                <Grid justifyContent={"center"} display={"flex"}>
                    <Fade in={alert.open} timeout={1000}>
                        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                            {alert.message}
                        </Alert>
                    </Fade>
                </Grid>

                {/* Error Message if Invalid Impact Assessment ID provided for recurring event */}
                <PopUpDialog
                    open={invalidImpactAssessmentId}
                    onClose={() => setInvalidImpactAssessmentId(false)}
                    onClick={() => setInvalidImpactAssessmentId(false)}
                    title={"Error"}
                    description={"Invalid Impact Assessment ID provided. Please check and try again."}
                    buttons={[{ buttonOption: "Ok" }]} />

            </Box >
        </Container >
    );
}

export default EventForm;