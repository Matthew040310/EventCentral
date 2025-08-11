import NextAuth from "next-auth";
import type UserDetails from "./IUserDetails";

declare module "next-auth" {
    interface Session {
        user: UserDetails & DefaultSession["user"];
    }

    interface User extends UserDetails { }

    interface JWT extends UserDetails { }
}
