"use client";
import { useSession } from "next-auth/react";

const ManageUsers_Client = () => {
    const { data: session } = useSession();

    return (
        <div>Manage Users - Client Component</div>
    )
}

export default ManageUsers_Client