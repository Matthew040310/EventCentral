import { auth, signIn } from "@/auth"
import { Box, Button } from "@mui/material";

export default async function SignIn() {
    const session = await auth();

    return (
        <Box mt={5} component={"div"} display="flex" flexDirection="column" alignItems="center">
            <form
                action={async () => {
                    "use server"
                    await signIn("google", { redirectTo: "/", })
                }}
            >
                <Button type="submit" variant="outlined" color="primary" size="large">
                    Sign in with Google
                </Button>
            </form>
        </Box>

    )
}