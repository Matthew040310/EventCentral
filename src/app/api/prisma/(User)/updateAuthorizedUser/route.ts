// updateAuthorizedUser.ts
import prisma from '@/app/api/prisma/dbClient';
import UserDetails from '@/types/IUserDetails';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

export async function POST(request: Request) {
    try {
        const UserDetails: UserDetails = await request.json();

        await prisma.authorizedUsers.update({
            where: { id: UserDetails.id },
            data: UserDetails
        });

        return Response.json(
            { message: 'User Details successfully updated!' },
            { status: 201 }
        );
    }
    catch (error: any) {
        return Response.json(
            { error: primsaErrorHandler("Failed to update user details", error) },
            { status: 500 }
        );
    }
}