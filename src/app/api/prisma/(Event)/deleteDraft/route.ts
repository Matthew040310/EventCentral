// deleteDraft.ts
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';
import deleteDrafts from './deleteDrafts';

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    await deleteDrafts(body["TargetIDs"])

    return Response.json(
      { message: "Draft successfully deleted!" },
      { status: 200 }
    );
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to delete draft", error) },
      { status: 500 }
    );
  }
}