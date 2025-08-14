"use client";
import { useState } from "react";
import { Alert, AlertColor, Box, Button, Container, Fade, Grid, Stack, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import Link from "next/link";
import UserDetails from "@/types/IUserDetails";
import { ALL_GROUPS, ALL_CLUSTERS, USER_ROLES } from "@/constants/EventCentralConstants";
import TextInputField from "./TextInputField";
import DepartmentField from "./DepartmentField";
import DropDownField from "./DropDownField";
import useUserDetailsHandlers from "../_hooks/useUserDetailsHandler";

interface UserDetailsFieldsProps {
    userDetails: Omit<UserDetails, 'id'>;
    setUserDetails: React.Dispatch<React.SetStateAction<Omit<UserDetails, 'id'>>>;
}

const UserDetailsFields: React.FC<UserDetailsFieldsProps> = ({
    userDetails, setUserDetails
}) => {
    const { handleFieldChange, UserDetailsValid } = useUserDetailsHandlers(setUserDetails);
    const [alert, setAlert] = useState<{ open: boolean; severity: AlertColor; message: string }>({ open: false, severity: 'success', message: '' });

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Typography variant="h2" textAlign="center" gutterBottom>
                    Add New User
                </Typography>

                <Grid container sx={{ my: 3 }} spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextInputField
                            label="Name"
                            value={userDetails.name}
                            onChange={handleFieldChange("name")}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextInputField
                            label="Email"
                            value={userDetails.email}
                            onChange={handleFieldChange("email")}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Stack direction="column">
                            <DropDownField
                                label="Role"
                                options={Object.keys(USER_ROLES)}
                                value={userDetails.role}
                                onChange={(value) =>
                                    handleFieldChange("role")(value as UserDetails["role"] | null)
                                } />
                            {/* Role Access Right Description */}
                            {userDetails.role && (
                                <Typography variant="body2" mt={1} ml={1}>
                                    View and Submit Events <br />
                                    <b>+ </b>{USER_ROLES[userDetails.role]}
                                </Typography>
                            )}
                        </Stack>
                    </Grid>
                </Grid>


                <Typography variant="subtitle1" my={2}>
                    Please select user's <b>department(s)</b> with the following dropdown.<br />
                    - Groups and Cluster will be automatically assigned based on user's department, but you may edit them as required.<br />
                    <i>*For users with multiple departments, auto population of Groups and Clusters will be based on the <b>first department selected.</b></i>
                </Typography>

                <Grid container sx={{ mb: 2 }} spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <DepartmentField
                            value={userDetails.department}
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

                {/* Create New User */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button variant="contained" color="primary" size="large" disabled={!UserDetailsValid(userDetails)}
                        onClick={() => { console.log(userDetails) }}>
                        Create New User
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
        </>
    )
}

export default UserDetailsFields;