export { auth as middleware } from "@/auth"

// import { NextResponse } from "next/server";
// import { auth } from "@/auth";

// const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// export default auth((req) => {
//     const reqUrl = new URL(req.url);
//     if (!req.auth && reqUrl?.pathname !== "/") {
//         return NextResponse.redirect(
//             new URL(
//                 `${BASE_PATH}/profile?callbackUrl=${encodeURIComponent(
//                     reqUrl?.pathname
//                 )}`,
//                 req.url
//             )
//         );
//     }
// });