 // OR app/api/health/route.js (App Router)
export async function GET() {
  return Response.json({ status: 'ok' });
}