"use client";
import { useState } from "react";
import { AlertColor, Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

// Components
import ActionStatusAlert from "@/components/ActionStatusAlert";
import TextInputField from "./TextInputField";
import DepartmentField from "./DepartmentField";
import DropDownField from "./DropDownField";
// Types and Constants
import UserDetails from "@/types/IUserDetails";
import { ALL_GROUPS, ALL_CLUSTERS, USER_ROLES } from "@/constants/EventCentralConstants";
// Functions
import useUserDetailsHandlers from "../_hooks/useUserDetailsHandler";
import createAuthorizedUser from "@/util/Prisma-API-handlers/User/createAuthorizedUser";
import updateAuthorizedUser from "@/util/Prisma-API-handlers/User/updateAuthorizedUser";

interface UserDetailsFieldsProps {
    userDetails: UserDetails;
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
    isNewUser: boolean;
}

const UserDetailsFields: React.FC<UserDetailsFieldsProps> = ({
    userDetails, setUserDetails, isNewUser
}) => {
    const { handleFieldChange, UserDetailsValid } = useUserDetailsHandlers(setUserDetails);
    const [alert, setAlert] = useState<{ open: boolean; severity: AlertColor; message: string }>({ open: false, severity: 'success', message: '' });

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Typography variant="h2" textAlign="center" gutterBottom>
                    {isNewUser ? "Add New User" : "Edit User Details"}
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

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={!UserDetailsValid(userDetails)}
                        onClick={() =>
                            isNewUser
                                ? createAuthorizedUser(userDetails, setAlert)
                                : updateAuthorizedUser(userDetails, setAlert)
                        }
                    >
                        {isNewUser ? "Create New User" : "Update User Details"}
                    </Button>
                </Box>


                <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center", mt: 2 }}>
                    <ActionStatusAlert alert={alert} setAlert={setAlert} />
                </Box>

            </Container >
        </>
    )
}

export default UserDetailsFields;