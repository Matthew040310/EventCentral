// SignIn/Onboarding/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

import { ALL_DEPARTMENTS, ALL_GROUPS, ALL_CLUSTERS, Department_Group_Cluster_Map } from "@/constants/EventCentralConstants";
import UserDetails from "@/types/IUserDetails";

const Onboarding = () => {
    const session = useSession();
    const [userDetails, setUserDetails] = useState<Omit<UserDetails, 'id'>>({
        email: "Temporary User",
        name: "Temporary Name",
        department: "",
        group: "",
        cluster: "",
        role: "Guest"
    });

    const handleFieldChange = (fieldName: keyof UserDetails) => (newValue: string | null) => {
        if (fieldName === "department") {
            const department = newValue || "";
            // Get mapped group and cluster for new department or fallback empty
            const mapping = Department_Group_Cluster_Map[department] || { group: "", cluster: "" };

            setUserDetails((prev) => ({
                ...prev,
                department,
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

    const fieldsValid = (): Boolean => {
        return Object.values(userDetails).every(
            (v) => typeof v === 'string' && v.trim().length > 0
        );
    }

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
                        value={userDetails.department}
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
                <Button variant="contained" color="primary" size="large" disabled={!fieldsValid()}>
                    Complete
                </Button>
            </Box>
        </Container>
    )
}

export default Onboarding