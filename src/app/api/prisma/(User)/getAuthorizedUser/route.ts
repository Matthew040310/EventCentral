// getAuthorizedUser.ts
import prisma from '@/app/api/prisma/dbClient';
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const existingAuthorizedUser = await prisma.authorizedUsers.findUnique({
            where: { email: body.email },
        });

        return Response.json(
            { response: existingAuthorizedUser },
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