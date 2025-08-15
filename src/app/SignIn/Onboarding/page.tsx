"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AlertColor, Box, Button, Container, Grid, Typography } from "@mui/material";

// Components
import ActionStatusAlert from "@/components/ActionStatusAlert";
import TextInputField from "./_components/TextInputField";
import DropDownField from "./_components/DropDownField";
// Types and Constants
import { ALL_DEPARTMENTS, ALL_GROUPS, ALL_CLUSTERS } from "@/constants/EventCentralConstants";
// Functions
import useOnboardingForm from "./_hooks/useOnboardingForm";
import createAuthorizedUser from "@/util/Prisma-API-handlers/User/createAuthorizedUser";

const Onboarding = () => {
    const { data: session } = useSession();
    const { userDetails, handleFieldChange, fieldsValid } = useOnboardingForm(session);
    const [alert, setAlert] = useState<{ open: boolean; severity: AlertColor; message: string }>({ open: false, severity: 'success', message: '' });


    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h2" textAlign="center" gutterBottom>
                Onboarding
            </Typography>

            <Typography variant="h6" gutterBottom>
                Hi there, looks like you are new here!
            </Typography>

            <Typography variant="subtitle1" mb={5}>
                To complete your onboarding, please select your <b>department</b> in the following dropdown.<br />
                Groups and Cluster will be automatically assigned based on your department, but you may edit them as required.
            </Typography>

            <TextInputField label="Name" value={userDetails.name} />

            <TextInputField label="Email" value={userDetails.email} />

            <Grid container sx={{ mb: 2 }} spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <DropDownField
                        label="Department"
                        options={ALL_DEPARTMENTS}
                        value={userDetails.department[0] || ""}
                        onChange={handleFieldChange("department")}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <DropDownField
                        label="Group"
                        options={ALL_GROUPS}
                        value={userDetails.group}
                        onChange={handleFieldChange("group")}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <DropDownField
                        label="Cluster"
                        options={ALL_CLUSTERS}
                        value={userDetails.cluster}
                        onChange={handleFieldChange("cluster")}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button variant="contained" color="primary" size="large" disabled={!fieldsValid()}
                    onClick={() => { createAuthorizedUser(userDetails, setAlert) }}>
                    Complete
                </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center", mt: 2 }}>
                <ActionStatusAlert alert={alert} setAlert={setAlert} />
            </Box>
        </Container>
    )
}

export default Onboarding;