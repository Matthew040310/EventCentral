"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import UserDetails from "@/types/IUserDetails";
import ManageUsersTable from "./_component/ManageUsersTable";

const ManageUsers: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            if (session?.user?.role !== "Admin") {
                router.push("/NotAuthorized");
            }
        }
        if (status === "unauthenticated") {
            router.push("/SignIn");
        }
    }, [status, session, router]);

    const Users: UserDetails[] = [
        {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            department: "Engineering",
            group: "Development",
            cluster: "Cluster A",
            role: "Admin"
        },
        {
            id: "2",
            name: "Adam Doe",
            email: "adam.doe@example.com",
            department: "Engineering",
            group: "Development",
            cluster: "Cluster A",
            role: "Admin"
        }
    ]

    return (
        session?.user?.role === "Admin" &&
        <>
            <ManageUsersTable
                users={Users}
                onDeleteSuccess={() => {
                    console.log("Delete successful");
                }}
            />
        </>
    )
}

export default ManageUsers