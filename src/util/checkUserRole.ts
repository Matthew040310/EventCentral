import { Session } from "next-auth";

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default async function checkUserRole(
    session: Session | null,
    setIsAdmin: (isAdmin: boolean) => void,
) {
    if (session?.user?.email) {
        try {
            const response = await fetch(`${APP_BASE_PATH}/api/prisma/getUserRole?email=${session.user.email}`);
            if (response.ok) {
                const data = await response.json();
                if (data.role === "admin") {
                    setIsAdmin(true);
                }
            }
        } catch (error) {
            console.error("Error checking user role:", error);
        }
    }
}