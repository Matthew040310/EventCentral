// deleteSubmission.ts
import primsaErrorHandler from '@/util/Prisma-API-handlers/prismaErrorHandler';
import deleteSubmissions from './deleteSubmissions';

export async function DELETE(request: Request) {

  try {
    const body = await request.json();
    await deleteSubmissions(body["TargetIDs"])

    return Response.json(
      { message: "Submission(s) successfully deleted!" },
      { status: 200 }
    )
  }
  catch (error: any) {
    return Response.json(
      { error: primsaErrorHandler("Failed to delete submission", error) },
      { status: 500 }
    );
  }
}