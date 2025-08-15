import { Container, Typography } from "@mui/material";

const NotAuthorized = () => {
    return (
        <>
            <title>EventCentral - Not Authorized</title>

            <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
                <Typography variant="h3" color="error" gutterBottom>
                    Not Authorized
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    You do not have permission to access this page.<br />
                    Please contact your administrator if you believe this is an error.
                </Typography>
            </Container>
        </>
    );
}

export default NotAuthorized;