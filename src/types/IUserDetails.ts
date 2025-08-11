import UserRole from "./TUserRole";

interface UserDetails {
    id: string;
    email: string;
    name: string;
    department: string;
    group: string;
    cluster: string;
    role: UserRole;
}

export default UserDetails;