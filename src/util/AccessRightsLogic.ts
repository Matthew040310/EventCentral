import { Session } from "next-auth";
import FullEventReport from "@/types/IFullEventReport";
import UserDetails from "@/types/IUserDetails";

function canManageUsers() {
    // If session.role === "Admin" then return true
    // Else return false

    // NOTE: Implemented Directly within ManageUsers/page.tsx using useRequiredRole hook
    return;
}

function enableEventTableDeleteAll() {
    // If session.role === "Admin" then return true
    // Else return false

    // NOTE: Implemented Directly within EventTable.tsx using session?.user?.role
    return;
}

function canDeleteEvent(session: Session | null, eventDetails: FullEventReport): boolean {
    // If session.role === "Admin" then return true for any event
    // Elseif session.role === "GD" && session.group === event.group then return true
    // Elseif session.role === "HOD" || session.role === "EDC-Rep"
    //      && If session.department === event.department then return true
    // Elseif session.email === event.lastUpdatedBy then return true
    // Else return false

    const { role, cluster, group, department, email }: Partial<UserDetails> = session?.user || {};

    if (!session) return false;
    if (role === "Admin") return true;
    if (role === "Deputy CEO" && cluster === eventDetails.cluster) return true;
    if (role === "Group Director" && group === eventDetails.group) return true;
    if ((role === "HOD" || role === "EDC-Rep") && department?.includes(eventDetails.department ?? "")) return true;
    if (email === eventDetails.lastUpdatedBy) return true;

    return false;
}

function canEditEvent(session: Session | null, eventDetails: FullEventReport): boolean {
    // If session.role === "Admin" then return true for any event
    // Elseif session.role === "GD" && session.group === event.group then return true
    // Elseif session.department === event.department then return true
    // Else return false

    if (!session) return false;

    const { role, cluster, group, department }: Partial<UserDetails> = session?.user;
    if (role === "Admin") return true;
    if (role === "Deputy CEO" && cluster === eventDetails.cluster) return true;
    if (role === "Group Director" && group === eventDetails.group) return true;
    if (department?.includes(eventDetails.department ?? "")) return true;

    return false;
}

export { canDeleteEvent, canEditEvent }