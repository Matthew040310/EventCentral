//deleteAuthorizedUser.ts
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';
import deleteAuthorizedUsers from './deleteAuthorizedUsers';

export async function DELETE(request: Request) {

    try {
        const body = await request.json();
        await deleteAuthorizedUsers(body);

        return Response.json(
            { message: "User(s) successfully deleted!" },
            { status: 200 }
        );
    }
    catch (error: any) {
        return Response.json(
            { error: primsaErrorHandler("Failed to delete Authorized User", error) },
            { status: 500 }
        );
    }
}