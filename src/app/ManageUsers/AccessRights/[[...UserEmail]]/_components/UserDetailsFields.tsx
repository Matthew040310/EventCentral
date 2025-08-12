"use client";
import { Autocomplete, Chip, Container, Grid, Stack, TextField, Typography, Box, Button } from "@mui/material";
import UserDetails from "@/types/IUserDetails";
import { ALL_DEPARTMENTS, ALL_GROUPS, ALL_CLUSTERS, Department_Group_Cluster_Map, USER_ROLES } from "@/constants/EventCentralConstants";

interface UserDetailsFieldsProps {
    userDetails: Omit<UserDetails, 'id'>;
    setUserDetails: React.Dispatch<React.SetStateAction<Omit<UserDetails, 'id'>>>;
}

const UserDetailsFields: React.FC<UserDetailsFieldsProps> = ({
    userDetails, setUserDetails
}) => {

    const handleFieldChange = (fieldName: keyof UserDetails) => (newValue: string | string[] | null) => {
        if (fieldName === "department") {
            const department = newValue || "";
            // Get mapped group and cluster for new department or fallback empty
            const mapping = Department_Group_Cluster_Map[department[0]] || { group: "", cluster: "" };

            setUserDetails((prev) => ({
                ...prev,
                department: department as string[],
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

    const UserDetailsValid = (): Boolean => {
        return Object.entries(userDetails).every(([key, value]) => {
            if (key === "department") {
                return Array.isArray(value) && value.length > 0;
            }
            return typeof value === "string" && value.trim() !== "";
        });
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Typography variant="h2" textAlign="center" gutterBottom>
                    Add New User
                </Typography>

                <Grid container sx={{ my: 3 }} spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField sx={{ bgcolor: "white" }}
                            fullWidth
                            margin="dense"
                            required
                            label="Name"
                            value={userDetails.name || ""}
                            onChange={(e) => handleFieldChange("name")(e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField sx={{ bgcolor: "white" }}
                            fullWidth
                            margin="dense"
                            required
                            label="Email"
                            value={userDetails.email || ""}
                            onChange={(e) => handleFieldChange("email")(e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Stack direction="column">
                            <Autocomplete
                                sx={{ bgcolor: "white" }}
                                options={Object.keys(USER_ROLES)}
                                value={userDetails.role}
                                onChange={(event, newValue) => handleFieldChange("role")(newValue)}
                                renderInput={(params) => (
                                    <TextField {...params} label={"Role"} required={true} />
                                )}
                            />
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
                        <Autocomplete
                            sx={{ bgcolor: "white" }}
                            multiple
                            freeSolo={true}
                            options={ALL_DEPARTMENTS}
                            value={userDetails.department}
                            onChange={(_, newValue) => handleFieldChange("department")(newValue)}
                            renderValue={(value, props) =>
                                value.map((option, index) => (
                                    <Chip label={option} {...props({ index })} key={index} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={"Department"}
                                    placeholder="Type to create new tags"
                                    required={true}
                                />
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

                {/* Create New User */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button variant="contained" color="primary" size="large" disabled={!UserDetailsValid()}
                        onClick={() => { console.log(userDetails) }}>
                        Create New User
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default UserDetailsFields;