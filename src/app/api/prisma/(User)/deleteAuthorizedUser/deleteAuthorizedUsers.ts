// Seperate database delete and API call logic
// So that the database delete function can be reused without API call
import prisma from '@/app/api/prisma/dbClient';

export default async function deleteAuthorizedUsers(emails: string | string[]) {

    // Ensure that targetEmails format is always String[] type, even if only one TargetEmail is provided
    // This allows this function to be reused for multi delete and single delete
    const targetEmails = Array.isArray(emails) ? emails : [emails];

    await prisma.authorizedUsers.deleteMany({
        where: {
            email: { in: targetEmails }
        }
    })
}