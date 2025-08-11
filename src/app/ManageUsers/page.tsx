import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import ManageUsers_Client from "./ManageUsers.client";

const ManageUsers = async () => {
    const session = await auth();

    // TO CHANGE LOGIC TO CHECK USER ROLE
    if (session?.user?.email === "matthew160619@gmail.com") {
        redirect("/NotAuthorized")
    }

    return (
        <div>
            <SessionProvider>
                <ManageUsers_Client />
            </SessionProvider>
        </div>
    )
}

export default ManageUsers