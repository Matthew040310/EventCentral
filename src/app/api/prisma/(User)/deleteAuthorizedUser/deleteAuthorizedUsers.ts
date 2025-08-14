// Seperate database delete and API call logic
// So that the database delete function can be reused without API call
import prisma from '@/app/api/prisma/dbClient';
import UserDetails from '@/types/IUserDetails';

export default async function deleteAuthorizedUsers(id: UserDetails["id"] | UserDetails["id"][]) {

    // Ensure that targetEmails format is always String[] type, even if only one TargetEmail is provided
    // This allows this function to be reused for multi delete and single delete
    const targetIds = Array.isArray(id) ? id : [id];

    await prisma.authorizedUsers.deleteMany({
        where: {
            id: { in: targetIds }
        }
    })
}