import { Session } from "next-auth";
import FullEventReport from "@/types/IFullEventReport";

function canManageUsers(session: Session): boolean {
    // If session.role === "Admin" then return true
    // Else return false
    return Boolean(null);
}

function enableEventTableDeleteAll(session: Session): boolean {
    // If session.role === "Admin" then return true
    // Else return false
    return Boolean(null);
}

function canDeleteEvent(session: Session, event: FullEventReport): boolean {
    // If session.role === "Admin" then return true for any event
    // Elseif session.role === "GD" && session.group === event.group then return true
    // Elseif session.role === "HOD" || session.role === "EDC-Rep"
    //      && If session.department === event.department then return true
    // Elseif session.email === event.lastUpdatedBy then return true
    // Else return false
    return Boolean(null);
}

function canEditEvent(session: Session, event: FullEventReport): boolean {
    // If session.role === "Admin" then return true for any event
    // Elseif session.role === "GD" && session.group === event.group then return true
    // Elseif session.role === "HOD" || session.role === "EDC-Rep"
    //      && If session.department === event.department then return true
    // Elseif session.department === event.department then return true
    // Else return false
    return Boolean(null);
}