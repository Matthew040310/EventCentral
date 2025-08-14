"use client";
import { useCallback, useEffect, useState } from "react";
import useRequireRole from "@/hooks/useRequiredRole";
import getAllAuthorizedUsers from "@/util/Prisma-API-handlers/User/getAllAuthorizedUsers";
import UserDetails from "@/types/IUserDetails";
import ManageUsersTable from "./_component/ManageUsersTable";

const ManageUsers: React.FC = () => {
    // Function that requires the user to have the "Admin" role
    // If the user does not have the required role, they will be redirected to the NotAuthorized page
    const { session } = useRequireRole("Admin");

    const [authorisedUsers, setAuthorisedUsers] = useState<UserDetails[]>([]);

    const fetchAuthorizedUsers = useCallback(async () => {
        const allAuthorizedUsers = await getAllAuthorizedUsers();
        setAuthorisedUsers(allAuthorizedUsers as UserDetails[] || []);
    }, []);

    useEffect(() => {
        fetchAuthorizedUsers();
    }, [fetchAuthorizedUsers]);

    return (
        session?.user?.role === "Admin" &&
        <>
            <ManageUsersTable
                users={authorisedUsers}
                onDeleteSuccess={fetchAuthorizedUsers}
            />
        </>
    )
}

export default ManageUsers;