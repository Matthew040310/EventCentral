import UserRole from "./TUserRole";
import { Departments, Groups, Clusters } from "./Organisation";

interface UserDetails {
    id: string;
    email: string;
    name: string;
    department: Departments[];
    group: Groups;
    cluster: Clusters;
    role: UserRole;
}

export default UserDetails;