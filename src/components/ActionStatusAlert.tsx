import Link from "next/link";
import { Alert, AlertColor, Fade } from "@mui/material";
import { Home } from "@mui/icons-material";

interface ActionStatusAlertProps {
    alert: { open: boolean; severity: AlertColor; message: string };
    setAlert: React.Dispatch<React.SetStateAction<{ open: boolean; severity: AlertColor; message: string }>>;
    enableReturnHome?: boolean;
}

const ActionStatusAlert: React.FC<ActionStatusAlertProps> = ({
    alert, setAlert,
    enableReturnHome = true
}) => {
    return (
        <Fade in={alert.open} timeout={1000}>
            <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                {alert.message}
                <br />
                {enableReturnHome && (
                    <Link href="/" style={{ display: "flex", alignItems: "center", marginTop: "5px", textDecoration: "underline" }}>
                        <Home />Return to Home
                    </Link>
                )}
            </Alert>
        </Fade>
    )
}

export default ActionStatusAlert;