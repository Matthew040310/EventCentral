'use client'
import { use, useEffect, useState } from 'react'
import UserDetails from '@/types/IUserDetails'
import DefaultUserDetails from '@/constants/DefaultUserDetails'
import useRequireRole from "@/hooks/useRequiredRole";
import getAuthorizedUser from '@/util/Prisma-API-handlers/User/getAuthorizedUser';
import UserDetailsFields from './_components/UserDetailsFields';

const AccessRights = ({
    params,
}: {
    params: Promise<{ UserEmail?: string[] }>
}) => {
    // Function that requires the user to have the "Admin" role
    // If the user does not have the required role, they will be redirected to the NotAuthorized page
    const { session } = useRequireRole("Admin");

    const { UserEmail } = use(params);
    const decodedEmail = UserEmail && UserEmail.length > 0
        ? decodeURIComponent(UserEmail[0])
        : undefined;
    const [userDetails, setUserDetails] = useState(DefaultUserDetails);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const user = await getAuthorizedUser(decodedEmail!.toLowerCase());
                if (user) {
                    setUserDetails(user);
                }
            }
            catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
        if (decodedEmail !== "New" && decodedEmail) {
            getUserDetails();
        }
    }, [decodedEmail]);

    return (
        <UserDetailsFields userDetails={userDetails} setUserDetails={setUserDetails} />
    )
}

export default AccessRights;