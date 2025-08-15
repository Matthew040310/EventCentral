// SignIn/Onboarding/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Alert, AlertColor, Autocomplete, Box, Button, Container, Fade, Grid, TextField, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import Link from "next/link";

import UserDetails from "@/types/IUserDetails";
import DefaultUserDetails from '@/constants/DefaultUserDetails'
import { ALL_DEPARTMENTS, ALL_GROUPS, ALL_CLUSTERS, Department_Group_Cluster_Map } from "@/constants/EventCentralConstants";

import createAuthorizedUser from "@/util/Prisma-API-handlers/User/createAuthorizedUser";

const Onboarding = () => {
    const { data: session } = useSession();
    const [userDetails, setUserDetails] = useState<UserDetails>(DefaultUserDetails);
    const [alert, setAlert] = useState<{ open: boolean; severity: AlertColor; message: string }>
        ({ open: false, severity: 'success', message: '' });

    useEffect(() => {
        if (session?.user) {
            setUserDetails((prev) => ({
                ...prev,
                email: session.user.email.toUpperCase() || "",
                name: session.user.name || "",
            }));
        }
    }, [session]);

    const handleFieldChange = (fieldName: keyof UserDetails) => (newValue: string | null) => {
        if (fieldName === "department") {
            const department = newValue || "";
            // Get mapped group and cluster for new department or fallback empty
            const mapping = Department_Group_Cluster_Map[department] || { group: "", cluster: "" };

            setUserDetails((prev) => ({
                ...prev,
                department: [department],
                group: mapping.group,
                cluster: mapping.cluster,
            }));
        } else {
            setUserDetails((prev) => ({
                ...prev,
                [fieldName]: newValue || "",
            }));
        }
    };

    const fieldsValid = (): Boolean =>
        !!userDetails.name?.trim() &&
        !!userDetails.email?.trim() &&
        Array.isArray(userDetails.department) &&
        userDetails.department.length > 0 &&
        !!userDetails.group?.trim() &&
        !!userDetails.cluster?.trim() &&
        !!userDetails.role?.trim();

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

            <TextField sx={{ mb: 2 }}
                fullWidth
                margin="dense"
                required
                disabled
                label="Email"
                value={userDetails.email || ""}
            />

            <TextField sx={{ mb: 2 }}
                fullWidth
                margin="dense"
                required
                disabled
                label="Name"
                value={userDetails.name || ""}
            />

            <Grid container sx={{ mb: 2 }} spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Autocomplete
                        sx={{ bgcolor: "white" }}
                        options={ALL_DEPARTMENTS}
                        value={userDetails.department[0] || ""}
                        onChange={(event, newValue) => handleFieldChange("department")(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label={"Department"} required={true} />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <Autocomplete
                        sx={{ bgcolor: "white" }}
                        options={ALL_GROUPS}
                        value={userDetails.group}
                        onChange={(event, newValue) => handleFieldChange("group")(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label={"Group"} required={true} />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <Autocomplete
                        sx={{ bgcolor: "white" }}
                        options={ALL_CLUSTERS}
                        value={userDetails.cluster}
                        onChange={(event, newValue) => handleFieldChange("cluster")(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label={"Cluster"} required={true} />
                        )}
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
                <Fade in={alert.open} timeout={1000}>
                    <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                        {alert.message}
                        <br />
                        <Link href="/" style={{
                            display: "flex", marginTop: "5px",
                            alignItems: "center", justifyContent: "center", textDecoration: "underline"
                        }}>
                            <Home />Return to Home
                        </Link>
                    </Alert>
                </Fade>
            </Box>
        </Container>
    )
}

export default Onboarding