import UserDetails from "@/types/IUserDetails";
import { ALL_DEPARTMENTS } from "../EventCentralConstants";

const USERS: UserDetails[] = [
    // ADMINS
    { id: "", email: "MATTHEW_AW@CPF.GOV.SG", name: "Matthew Aw", department: ["SLD"], group: "CUG", cluster: "SVC", role: "Admin" },
    { id: "", email: "CHIA_SEOK_HAN@CPF.GOV.SG", name: "Seok Han Chia", department: ["SLD"], group: "CUG", cluster: "SVC", role: "Admin" },
    { id: "", email: "SHEENA_TAN@CPF.GOV.SG", name: "Sheena Tan", department: ["SLD"], group: "CUG", cluster: "SVC", role: "Admin" },
    { id: "", email: "CHERIE_LIM@CPF.GOV.SG", name: "Cherie Lim", department: ["SLD"], group: "CUG", cluster: "SVC", role: "Admin" },
    { id: "", email: "HONG_ZHEN@CPF.GOV.SG", name: "Zhen Hong", department: ["SLD"], group: "CUG", cluster: "SVC", role: "Admin" },

    // SVC EDC-REPS
    // ASG
    { id: "", email: "FELICIA_SEOW@CPF.GOV.SG", name: "Felicia Sun", department: ["AGP", "AMD"], group: "ASG", cluster: "SVC", role: "EDC-Rep" },
    // CUG
    { id: "", email: "NG_SWEE_TENG@CPF.GOV.SG", name: "Ng Swee Teng", department: ["SLD"], group: "CUG", cluster: "SVC", role: "EDC-Rep" },
    { id: "", email: "CYNTHIA_HENG@CPF.GOV.SG", name: "Cynthia Heng", department: ["SLD"], group: "CUG", cluster: "SVC", role: "EDC-Rep" },
    // ECE
    { id: "", email: "LIM_LI_LI@CPF.GOV.SG", name: "Lim Li Li", department: ["CED"], group: "ECE", cluster: "SVC", role: "EDC-Rep" },
    { id: "", email: "HOR_LEE_LING@CPF.GOV.SG", name: "Hor Lee Ling", department: ["CSD"], group: "ECE", cluster: "SVC", role: "EDC-Rep" },
    { id: "", email: "FIONA_GIAM@CPF.GOV.SG", name: "Fiona Giam", department: ["SED"], group: "ECE", cluster: "SVC", role: "EDC-Rep" },
    // HFG
    { id: "", email: "SARAH_TAN@CPF.GOV.SG", name: "Sarah Tan", department: ["HCP"], group: "HFG", cluster: "SVC", role: "EDC-Rep" },
    { id: "", email: "NUR_AMIRAH_MUHAMAD_JAYA@CPF.GOV.SG", name: "Nur Amirah Muhamad Jaya", department: ["HID"], group: "HFG", cluster: "SVC", role: "EDC-Rep" },
    { id: "", email: "CHARMAINE_SM_LIM@CPF.GOV.SG", name: "Charmaine Lim", department: ["HPD"], group: "HFG", cluster: "SVC", role: "EDC-Rep" },
    // HIG
    { id: "", email: "CHEN_YUWEN@CPF.GOV.SG", name: "Chen Yuwen", department: ["HED"], group: "HIG", cluster: "SVC", role: "EDC-Rep" },
    { id: "", email: "BENJAMIN_LOY@CPF.GOV.SG", name: "Benjamin Loy", department: ["HSD"], group: "HIG", cluster: "SVC", role: "EDC-Rep" },
    { id: "", email: "JOVI_CHEW@CPF.GOV.SG", name: "Jovi Chew", department: ["IVD"], group: "HIG", cluster: "SVC", role: "EDC-Rep" },
    // RIG
    { id: "", email: "TOH_JIN_TING@CPF.GOV.SG", name: "Toh Jin Ting", department: ["RSD"], group: "RIG", cluster: "SVC", role: "EDC-Rep" },
    { id: "", email: "CHAN_XUE_TING@CPF.GOV.SG", name: "Chan Xue Ting", department: ["RWD"], group: "RIG", cluster: "SVC", role: "EDC-Rep" },
    { id: "", email: "SHIRLEY_ANG@CPF.GOV.SG", name: "Shirley Ang", department: ["NAC"], group: "RIG", cluster: "SVC", role: "EDC-Rep" },

    // IDS EDC-REPS
    { id: "", email: "LEE_YEN_CHING@CPF.GOV.SG", name: "Lee Yen Ching", department: ["DSD"], group: "DSG", cluster: "IDS", role: "EDC-Rep" },

    // PCD EDC-REPS
    { id: "", email: "JOANNA_LAM@CPF.GOV.SG", name: "Joanna Lam", department: ["MPD"], group: "COM", cluster: "PCD", role: "EDC-Rep" },
    { id: "", email: "CHRISTINE_YEO_FROM.TP@CPF.GOV.SG", name: "Christine Yeo", department: ["OPD"], group: "COM", cluster: "PCD", role: "EDC-Rep" },
    { id: "", email: "YIONG_HONG_HONG@CPF.GOV.SG", name: "Yiong Hong Hong", department: ["FOT"], group: "FPG", cluster: "PCD", role: "EDC-Rep" },
    { id: "", email: "BRANDON_NUI@CPF.GOV.SG", name: "Brandon Nui", department: ["POD"], group: "PSR", cluster: "PCD", role: "EDC-Rep" },
    { id: "", email: "BAY_PUAY_SIEN@CPF.GOV.SG", name: "Bay Puay Sien", department: ["AIS"], group: "PSR", cluster: "PCD", role: "EDC-Rep" },
    { id: "", email: "NEO_MING_YUAN@CPF.GOV.SG", name: "Neo Ming Yuan", department: ["RHS"], group: "SRG", cluster: "PCD", role: "EDC-Rep" },

    // HODs
    // SVC
    { id: "", email: "SUN_HUI_YEE@CPF.GOV.SG", name: "Sun Hui Yee", department: ["AMD"], group: "ASG", cluster: "SVC", role: "HOD" },
    { id: "", email: "ALICIA_LEE@CPF.GOV.SG", name: "Alicia Lee", department: ["AGP"], group: "ASG", cluster: "SVC", role: "HOD" },
    { id: "", email: "LINDA_SIOW@CPF.GOV.SG", name: "Linda Siow", department: ["SED"], group: "ECE", cluster: "SVC", role: "HOD" },
    { id: "", email: "LIN_LIM@CPF.GOV.SG", name: "Lim Lin", department: ["HPD"], group: "HFG", cluster: "SVC", role: "HOD" },
    { id: "", email: "ONG_ENG_CHIN@CPF.GOV.SG", name: "Ong Eng Chin", department: ["HCP"], group: "HFG", cluster: "SVC", role: "HOD" },
    { id: "", email: "JESS_TEO@CPF.GOV.SG", name: "Jess Teo", department: ["HID"], group: "HFG", cluster: "SVC", role: "HOD" },
    { id: "", email: "ONG_WOEI_JIIN@CPF.GOV.SG", name: "Ong Woei Jiin", department: ["RSD"], group: "RIG", cluster: "SVC", role: "HOD" },
    { id: "", email: "STEPHANIE_NG@CPF.GOV.SG", name: "Stephanie Ng", department: ["RWD"], group: "RIG", cluster: "SVC", role: "HOD" },
    { id: "", email: "SHARON_KHOO@CPF.GOV.SG", name: "Sharon Khoo", department: ["NAC"], group: "RIG", cluster: "SVC", role: "HOD" },
    { id: "", email: "LYNDIS_KANG@CPF.GOV.SG", name: "Lyndis Kang", department: ["HED"], group: "HIG", cluster: "SVC", role: "HOD" },
    { id: "", email: "SARAH_ANG@CPF.GOV.SG", name: "Sarah Ang", department: ["HSD"], group: "HIG", cluster: "SVC", role: "HOD" },
    { id: "", email: "WU_MEEI@CPF.GOV.SG", name: "Wu Meei", department: ["IVD"], group: "HIG", cluster: "SVC", role: "HOD" },
    { id: "", email: "CHUA_HWEE_LENG@CPF.GOV.SG", name: "Chua Hwee Leng", department: ["CSD"], group: "ECE", cluster: "SVC", role: "HOD" },
    { id: "", email: "YEO_HWEE_HWEE@CPF.GOV.SG", name: "Yeo Hwee Hwee", department: ["CED"], group: "ECE", cluster: "SVC", role: "HOD" },
    { id: "", email: "GOH_JING_YEEN@CPF.GOV.SG", name: "Goh Jing Yeen", department: ["DSD"], group: "DSG", cluster: "IDS", role: "HOD" },
    { id: "", email: "CACHEREL_SIM@CPF.GOV.SG", name: "Cacherel Sim", department: ["MPD"], group: "COM", cluster: "PCD", role: "HOD" },
    { id: "", email: "JOANNE_TAN@CPF.GOV.SG", name: "Joanne Tan", department: ["OPD"], group: "COM", cluster: "PCD", role: "HOD" },
    { id: "", email: "DANIEL_TEO@CPF.GOV.SG", name: "Daniel Teo", department: ["POD"], group: "PSR", cluster: "PCD", role: "HOD" },
    { id: "", email: "IVY_HO@CPF.GOV.SG", name: "Ivy Ho", department: ["AIS"], group: "ASG", cluster: "SVC", role: "HOD" },
    { id: "", email: "KENNY_GOH@CPF.GOV.SG", name: "Kenny Goh", department: ["RHS"], group: "SRG", cluster: "PCD", role: "HOD" },
    { id: "", email: "LIM_BOON_LEONG@CPF.GOV.SG", name: "Lim Boon Leong", department: ["FOT"], group: "FPG", cluster: "PCD", role: "HOD" },

    // CMs
    { id: "", email: "MELISSA_KHOO@CPF.GOV.SG", name: "Melissa Khoo", department: ALL_DEPARTMENTS, group: "", cluster: "", role: "Admin" },
    // SVC
    { id: "", email: "WONG_YAN_JUN@CPF.GOV.SG", name: "Yan Jun Wong", department: [], group: "", cluster: "SVC", role: "Deputy CEO" },
    { id: "", email: "DESMOND_CHEW@CPF.GOV.SG", name: "Desmond Chew", department: [], group: "ASG", cluster: "SVC", role: "Group Director" },
    { id: "", email: "SOH_TSE_MIN@CPF.GOV.SG", name: "Tse Min Soh", department: [], group: "CUG", cluster: "SVC", role: "Group Director" },
    { id: "", email: "CHEE_SOK_LIN@CPF.GOV.SG", name: "Sok Lin Chee", department: [], group: "ECE", cluster: "SVC", role: "Group Director" },
    { id: "", email: "LOW_PAT_CHIN@CPF.GOV.SG", name: "Pat Chin Low", department: [], group: "HFG", cluster: "SVC", role: "Group Director" },
    { id: "", email: "JANICE_LAI@CPF.GOV.SG", name: "Janice Lai", department: [], group: "HIG", cluster: "SVC", role: "Group Director" },
    { id: "", email: "GREGORY_CHIA@CPF.GOV.SG", name: "Gregory Chia", department: [], group: "RIG", cluster: "SVC", role: "Group Director" },
    //IDS
    { id: "", email: "NG_HOCK_KEONG@CPF.GOV.SG", name: "Hock Keong Ng", department: [], group: "", cluster: "IDS", role: "Deputy CEO" },
    { id: "", email: "MARCUS_ONG@CPF.GOV.SG", name: "Marcus Ong", department: [], group: "AHC", cluster: "", role: "Group Director" },
    { id: "", email: "TAN_CHOON_SWEE@CPF.GOV.SG", name: "Choon Swee Tan", department: [], group: "BAS", cluster: "IDS", role: "Group Director" },
    { id: "", email: "SIM_TOW_HUA@CPF.GOV.SG", name: "Tow Hua Sim", department: [], group: "", cluster: "CIG", role: "Group Director" },
    { id: "", email: "LIU_LUNG_KWAN@CPF.GOV.SG", name: "Lung Kwan Liu", department: [], group: "DSG", cluster: "", role: "Group Director" },
    // PCD
    { id: "", email: "TANG_LEE_HUAT@CPF.GOV.SG", name: "Lee Huat Tang", department: [], group: "AIG", cluster: "PCD", role: "Group Director" },
    { id: "", email: "PEH_ER_YAN@CPF.GOV.SG", name: "Er Yan Peh", department: [], group: "COM", cluster: "PCD", role: "Group Director" },
    { id: "", email: "GOH_FANG_MIN@CPF.GOV.SG", name: "Fang Min Goh", department: [], group: "FPG", cluster: "PCD", role: "Group Director" },
    { id: "", email: "TEY_CHEE_KEONG@CPF.GOV.SG", name: "Chee Keong Tey", department: [], group: "HCM", cluster: "PCD", role: "Group Director" },
    { id: "", email: "JESLYN_SU@CPF.GOV.SG", name: "Jeslyn Su", department: [], group: "PSR", cluster: "PCD", role: "Group Director" },
    { id: "", email: "WINSTON_YEAN@CPF.GOV.SG", name: "Winston Yean", department: [], group: "SRG", cluster: "PCD", role: "Group Director" },
];

export default USERS;