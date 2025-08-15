import { Session } from "next-auth";
import { useEffect, useState } from "react";
import type UserDetails from "@/types/IUserDetails";
import DefaultUserDetails from '@/constants/DefaultUserDetails'
import { Department_Group_Cluster_Map } from "@/constants/EventCentralConstants";

export default function useOnboardingForm(session: Session | null) {
    const [userDetails, setUserDetails] = useState<UserDetails>(DefaultUserDetails);

    useEffect(() => {
        if (session?.user) {
            setUserDetails(prev => ({
                ...prev,
                email: session.user.email || "",
                name: session.user.name || "",
            }));
        }
    }, [session]);

    const handleFieldChange = (field: keyof UserDetails) => (value: string | null) => {
        if (field === "department") {
            const department = value || "";
            const mapping = Department_Group_Cluster_Map[department] || { group: "", cluster: "" };
            setUserDetails(prev => ({
                ...prev,
                department: [department],
                group: mapping.group,
                cluster: mapping.cluster,
            }));
        } else {
            setUserDetails(prev => ({
                ...prev,
                [field]: value || "",
            }));
        }
    };

    const fieldsValid = () => (
        !!userDetails.name?.trim() &&
        !!userDetails.email?.trim() &&
        Array.isArray(userDetails.department) &&
        userDetails.department[0]?.trim().length > 0 &&
        !!userDetails.group?.trim() &&
        !!userDetails.cluster?.trim() &&
        !!userDetails.role?.trim()
    );

    return { userDetails, handleFieldChange, fieldsValid };
}