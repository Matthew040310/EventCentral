import { Department_Group_Cluster_Map } from "@/constants/EventCentralConstants";
import type UserDetails from "@/types/IUserDetails";

const useUserDetailsHandlers = (
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>
) => {
    const handleFieldChange =
        <K extends keyof UserDetails>(fieldName: K) =>
            (newValue: UserDetails[K] | null) => {
                if (fieldName === "department") {
                    const departments = (newValue as string[]) ?? [];
                    const mapping =
                        Department_Group_Cluster_Map[departments[0]] ?? { group: "", cluster: "" };
                    setUserDetails((prev) => ({
                        ...prev,
                        department: departments,
                        group: mapping.group,
                        cluster: mapping.cluster,
                    }));
                } else {
                    setUserDetails((prev) => ({
                        ...prev,
                        [fieldName]: (newValue as string) ?? "",
                    }));
                }
            };

    const UserDetailsValid = (details: UserDetails) =>
        !!details.name?.trim() &&
        !!details.email?.trim() &&
        Array.isArray(details.department) &&
        details.department.length > 0 &&
        !!details.group?.trim() &&
        !!details.cluster?.trim() &&
        !!details.role?.trim();

    return { handleFieldChange, UserDetailsValid };
};

export default useUserDetailsHandlers;