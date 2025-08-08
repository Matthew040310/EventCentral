function canManageUsers(accessRights: string[]): boolean {
    // If getAuthorizedUser.role === "Admin" then return true
    // Else return false
    return Boolean(null);
}

function enableEventTableDeleteAll(accessRights: string[]): boolean {
    // If getAuthorizedUser.role === "Admin" then return true
    // Else return false
    return Boolean(null);
}

import FullEventReport from "@/types/IFullEventReport";
function canDeleteEvent(accessRights: string[], event: FullEventReport): boolean {
    // If getAuthorizedUser.role === "Admin" then return true for any event
    // Elseif getAuthorizedUser.role === "Director" || getAuthorizedUser.role === "EDC-Rep"
    // **caa Aug 25. Director and EDC-Rep have the same access rights. Separate category for future proofing
    //      && If getAuthorizedUser.group === event.group then return true
    // Elseif getAuthorizedUser.email === event.lastUpdatedBy then return true
    // Else return false
    return Boolean(null);
}

function canEditEvent(accessRights: string[], event: FullEventReport): boolean {
    // If getAuthorizedUser.role === "Admin" then return true for any event
    // Elseif getAuthorizedUser.role === "Director" || getAuthorizedUser.role === "EDC-Rep"
    //      If getAuthorizedUser.group === event.group then return true
    // Elseif getAuthorizedUser.department === event.department then return true
    // Else return false
    return Boolean(null);
}