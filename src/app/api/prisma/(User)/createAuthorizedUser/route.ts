// createAuthorizedUser.ts
import prisma from '@/app/api/prisma/dbClient';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';
import UserDetails from '@/types/IUserDetails';

export async function POST(request: Request) {

    try {
        const userDetails: UserDetails = await request.json();

        // For new user, remove default "" id field, so that Prisma will auto-generate it
        const { id, ...newUserDetails } = userDetails;
        await prisma.authorizedUsers.create({
            data: newUserDetails,
        });

        return Response.json(
            { message: 'User creation successful!' },
            { status: 201 }
        );
    }
    catch (error: any) {
        return Response.json(
            { error: primsaErrorHandler("Failed to create Authorized User", error) },
            { status: 500 }
        );
    }
}