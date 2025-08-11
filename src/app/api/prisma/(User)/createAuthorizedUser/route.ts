// createAuthorizedUser.ts
import prisma from '@/app/api/prisma/dbClient';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';
import UserDetails from '@/types/IUserDetails';

export async function POST(request: Request) {

    try {
        const userDetails: UserDetails = await request.json();
        const newUser = await prisma.authorizedUsers.create({
            data: userDetails,
        });

        return Response.json(
            { response: newUser },
            { status: 200 }
        );
    }
    catch (error: any) {
        return Response.json(
            { error: primsaErrorHandler("Failed to retrieve Authorized User", error) },
            { status: 500 }
        );
    }
}