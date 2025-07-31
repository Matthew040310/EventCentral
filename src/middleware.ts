import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // Add any custom middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // Protect all routes except auth-related ones
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}; 