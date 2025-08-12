import UserDetails from "@/types/IUserDetails";

const DefaultUserDetails: Omit<UserDetails, 'id'> = {
    email: "",
    name: "",
    department: [],
    group: "",
    cluster: "",
    role: "Guest"
}

export default DefaultUserDetails;