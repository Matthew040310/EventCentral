import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

const Provider = process.env.NEXT_PUBLIC_AUTH_PROVIDER || "google";

const AuthGate = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    console.log(session, status);

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn(Provider, { callbackUrl: `/` });
        }
    }, [status]);

    if (status === "loading" || !session) return null;
    return <>{children}</>;
}

export default AuthGate