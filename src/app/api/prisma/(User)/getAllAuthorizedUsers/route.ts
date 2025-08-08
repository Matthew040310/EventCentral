// getAllAuthorizedUser.ts
import prisma from '@/app/api/prisma/dbClient';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

export async function GET(request: Request) {

    try {
        const allAuthorizedUsers = await prisma.authorizedUsers.findMany();

        return Response.json(
            { response: allAuthorizedUsers },
            { status: 200 }
        );
    }
    catch (error: any) {
        return Response.json(
            { error: primsaErrorHandler("Failed to retrieve Authorized Users", error) },
            { status: 500 }
        );
    }
}