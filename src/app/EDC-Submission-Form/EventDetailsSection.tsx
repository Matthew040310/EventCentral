import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import CustomDropDown from "@/app/EDC-Submission-Form/_components/CustomDropDown"
import CustomTextField from "@/app/EDC-Submission-Form/_components/CustomTextField"
import CustomDatePicker from "@/components/CustomDatePicker"
import EventDetailsProps from '@/types/IEventDetailsProps';
import TRecurringDateParams from '@/types/TRecurringDateParams';

import { EVENT_FREQUENCY, CUSTOM_EVENT_FREQUENCY, ALL_DEPARTMENTS, ALL_GROUPS, ALL_CLUSTERS } from '@/constants/EventCentralConstants';
import { lastRecurringDate } from '@/util/replicateEventDates';

const EventDetailsSection: React.FC<EventDetailsProps> = ({
    handleInputChange,
    inputFields,
    state = "Draft"
}) => {
    const [knowStartDate, setKnowStartDate] = useState("");

    // Initialize knowStartDate based on async inputFields.startDate change
    useEffect(() => {
        // Check both startDate and estimatedStartDate
        if (inputFields?.startDate) {
            setKnowStartDate("Yes");
        }
        else if (inputFields?.estimatedStartDate) {
            setKnowStartDate("No");
        }
    }, [inputFields?.startDate, inputFields?.estimatedStartDate]);

    useEffect(() => {
        if (knowStartDate === "No") {
            handleInputChange("startDate")(null);
            handleInputChange("endDate")(null);
            handleInputChange("frequency")("One-off");
            handleInputChange("frequencyInterval")(null);
            handleInputChange("customFrequency")(null);
            handleInputChange("selectedDay")(null);
        }
        else if (knowStartDate === "Yes") {
            handleInputChange("estimatedStartDate")(null);
        }
    }, [knowStartDate]);

    const recurringDateParams = {
        startDate: inputFields.startDate,
        endDate: inputFields.endDate,
        frequency: inputFields.frequency,
        frequencyInterval: inputFields.frequencyInterval,
        ...(inputFields.customFrequency ? { customFrequency: inputFields.customFrequency } : {}),
        ...(inputFields.selectedDay ? { selectedDay: inputFields.selectedDay } : {}),
    } as TRecurringDateParams

    const showRecurringMessage =
        // If frequency is not One-off or Custom, and both startDate, endDate and frequencyInterval are required
        (inputFields?.frequency !== "One-off" && inputFields?.frequency !== "Custom" && inputFields?.startDate && inputFields?.endDate && inputFields?.frequencyInterval) ||
        // Else if frequency is Custom, and all required fields are provided
        (inputFields?.frequency === "Custom" && inputFields?.startDate && inputFields?.endDate && inputFields?.frequencyInterval && inputFields?.customFrequency && inputFields?.selectedDay);

    return (
        <Box>
            <Grid container columnSpacing={2} rowSpacing={0}>
                <CustomDropDown label="Event Type"
                    options={["New", "Existing"]}
                    value={inputFields?.type}
                    onChange={(_, newValue) => handleInputChange("type")(newValue)}
                    disabled={state === "Submitted"} />
                <CustomDropDown label="Embargoed?"
                    options={['Yes', 'No']}
                    value={inputFields?.embargoed}
                    onChange={(_, newValue) => handleInputChange("embargoed")(newValue)} />
                <CustomDropDown label="Do You Have the Exact Start Date?" sm={knowStartDate === "No" ? 6 : 12}
                    options={['Yes', 'No']}
                    value={knowStartDate === "" ? null : knowStartDate}
                    onChange={(e) => setKnowStartDate(e.currentTarget.textContent!)} />
                {knowStartDate === "No" &&
                    <CustomDatePicker label="Estimated Event Start Date"
                        value={inputFields.estimatedStartDate || null}
                        onChange={(date) => handleInputChange("estimatedStartDate")(date)} />
                }

                {knowStartDate === "Yes" &&
                    <>
                        <CustomDatePicker label="Event Start Date"
                            value={inputFields.startDate}
                            onChange={(date) => handleInputChange("startDate")(date)} />

                        {inputFields?.frequency !== "One-off" && inputFields?.frequency !== null && (
                            <CustomDatePicker label="Event End Date"
                                value={inputFields.endDate ?? null}
                                onChange={(date) => handleInputChange("endDate")(date)}
                                minSelectableDate={inputFields.startDate ?? null} />
                        )}

                        <CustomDropDown label="Event Recurrence Frequency"
                            options={Object.keys(EVENT_FREQUENCY)}
                            value={inputFields?.frequency}
                            onChange={(_, newValue) => handleInputChange("frequency")(newValue)} />

                        {inputFields?.frequency !== "One-off" && inputFields?.frequency !== null && (
                            <>
                                <CustomTextField label="Recurrence Interval"
                                    name="frequencyInterval"
                                    type="number"
                                    value={inputFields?.frequencyInterval ?? ""}
                                    onChange={(e) => handleInputChange("frequencyInterval")(Number(e.target.value) ?? null)}
                                    required={false} />

                                {/* Show custom frequency and day dropdowns if frequency is Custom */}
                                {inputFields?.frequency === "Custom" && (
                                    <>
                                        <CustomDropDown label="Custom Frequency"
                                            options={Object.keys(CUSTOM_EVENT_FREQUENCY)}
                                            value={inputFields?.customFrequency ?? null}
                                            onChange={(_, newValue) => handleInputChange("customFrequency")(newValue)}
                                            disabled={inputFields?.frequency !== "Custom"} />
                                        <CustomDropDown label="Custom Day"
                                            options={inputFields.customFrequency ? Object.keys(CUSTOM_EVENT_FREQUENCY[inputFields.customFrequency!]) : ["NA"]}
                                            value={inputFields?.selectedDay ?? null}
                                            onChange={(_, newValue) => handleInputChange("selectedDay")(newValue)}
                                            disabled={!inputFields.customFrequency} />
                                    </>
                                )}

                                {/* Show message after required fields have been filled */}
                                {showRecurringMessage && (
                                    <Grid sx={{ mb: 1 }} size={12}>
                                        <Typography variant={"body2"}>
                                            <Box component="span" sx={{ float: "left", display: { xs: "block", sm: "inline" }, width: { xs: "100%", sm: "auto" } }}>
                                                <i>{lastRecurringDate(recurringDateParams)["recurringResult"]}.</i>
                                            </Box>
                                            <Box component="span" sx={{ float: { xs: "left", sm: "right" }, display: { xs: "block", sm: "inline" }, width: { xs: "100%", sm: "auto" } }}>
                                                Total Number of Events: <u><b>{lastRecurringDate(recurringDateParams)["count"]}</b></u>
                                            </Box>
                                            <Box component="span" sx={{ float: "left", display: { xs: "block", sm: "inline" }, width: { xs: "100%", sm: "auto" } }}>
                                                Date of first event: <b><u>{lastRecurringDate(recurringDateParams)["firstRecurringDate"] ?? "NA"}</u></b>
                                            </Box>
                                            <Box component="span" sx={{ float: { xs: "left", sm: "right" }, display: { xs: "block", sm: "inline" }, width: { xs: "100%", sm: "auto" } }}>
                                                Date of last event: <b><u>{lastRecurringDate(recurringDateParams)["lastRecurringDate"] ?? "NA"}</u></b>
                                            </Box>
                                            {!lastRecurringDate(recurringDateParams)["recurringDatesHasStartDate"] && (
                                                <Box component="span" sx={{ float: "left", display: { xs: "block", sm: "inline" }, width: { xs: "100%", sm: "auto" }, color: 'error.main' }}>
                                                    <b>NOTE: </b><i>Start date was outside the provided recurrence schedule, but has been added.</i>
                                                </Box>
                                            )}
                                        </Typography>
                                    </Grid>
                                )}
                            </>
                        )}
                    </>
                }

                <CustomTextField label="Event Title" sm={12}
                    name="eventTitle"
                    value={inputFields?.title}
                    onChange={(e) => handleInputChange("title")(e.target.value)} />

                <CustomTextField label="Scheme Involved" sm={12}
                    name="eventScheme"
                    value={inputFields?.scheme}
                    onChange={(e) => handleInputChange("scheme")(e.target.value)} />

                <CustomTextField label="Description of Event" sm={12}
                    name="eventDescription"
                    multiline rows={4}
                    value={inputFields?.description}
                    onChange={(e) => handleInputChange("description")(e.target.value)} />

                <CustomTextField label="Description of Affected Cohort" sm={12}
                    name="affectedCohortDescription"
                    multiline
                    value={inputFields?.affectedCohortDescription}
                    onChange={(e) => handleInputChange("affectedCohortDescription")(e.target.value)} />

                <CustomTextField label="Estimated Cohort Size"
                    name="estimatedCohortSize"
                    type="number"
                    value={inputFields?.estimatedCohortSize ?? ""}
                    onChange={(e) => handleInputChange("estimatedCohortSize")(Number(e.target.value) ?? null)} />

                <Grid size={12}><Typography variant="subtitle2" sx={{ mt: 2 }}>
                    Overall In Charge Details
                </Typography></Grid>

                <CustomDropDown label="Department" xs={4} sm={4}
                    options={ALL_DEPARTMENTS}
                    value={inputFields?.department}
                    onChange={(_, newValue) => handleInputChange("department")(newValue)} />
                <CustomDropDown label="Group" xs={4} sm={4}
                    options={ALL_GROUPS}
                    value={inputFields?.group}
                    onChange={(_, newValue) => handleInputChange("group")(newValue)} />
                <CustomDropDown label="Cluster" xs={4} sm={4}
                    options={ALL_CLUSTERS}
                    value={inputFields?.cluster}
                    onChange={(_, newValue) => handleInputChange("cluster")(newValue)} />


                <CustomTextField label="Event OIC Name" sm={12}
                    name="eventOIC"
                    multiline
                    value={inputFields?.OIC}
                    onChange={(e) => handleInputChange("OIC")(e.target.value)} />
                <CustomTextField label="Event OIC Email" sm={12}
                    name="eventOICEmail"
                    multiline
                    value={inputFields?.OICEmail}
                    onChange={(e) => handleInputChange("OICEmail")(e.target.value)} />

            </Grid>
        </Box>
    );
};

export default EventDetailsSection;
