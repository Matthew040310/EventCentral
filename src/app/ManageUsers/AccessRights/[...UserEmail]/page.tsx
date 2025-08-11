'use client'
import { use, useEffect, useState } from 'react'
import UserDetails from '@/types/IUserDetails'
import DefaultUserDetails from '@/constants/DefaultUserDetails'
import useRequireRole from "@/hooks/useRequiredRole";
import getAuthorizedUser from '@/util/Prisma-API-handlers/User/getAuthorizedUser';

const AccessRights = ({
    params,
}: {
    params: Promise<{ UserEmail: string }>
}) => {
    // Function that requires the user to have the "Admin" role
    // If the user does not have the required role, they will be redirected to the NotAuthorized page
    const { session } = useRequireRole("Admin");

    const { UserEmail } = use(params)
    const decodedEmail = decodeURIComponent(UserEmail[0]);
    const [userDetails, setUserDetails] = useState<Omit<UserDetails, 'id'>>(DefaultUserDetails);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const user = await getAuthorizedUser(decodedEmail.toLowerCase());
                if (user) {
                    user.delete("id");
                    setUserDetails(user);
                }
                else {
                    setUserDetails({
                        ...DefaultUserDetails,
                        email: decodedEmail.toLowerCase(),
                    })
                }
            }
            catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
        getUserDetails();
    }, [decodedEmail]);

    return (
        <>
            <p>Hello</p>
            <p>{JSON.stringify(userDetails)}</p>
        </>
    )
}

export default AccessRights;