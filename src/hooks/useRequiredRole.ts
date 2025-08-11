"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useRequireRole(requiredRole?: string) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && requiredRole && session?.user?.role !== requiredRole) {
            router.push("/NotAuthorized");
        } else if (status === "unauthenticated") {
            router.push("/SignIn");
        }
    }, [status, session, router, requiredRole]);

    return { session, status };
}
