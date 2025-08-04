const template_CIA = {
    "perceivedUnhappiness": "",
    "perceivedUnhappinessDetails": "",
    "generateInterest": "",
    "generateInterestDetails": "",
    "haveAnnouncement": "",
    "announcementTypes": [],
    "haveNotification": "",
    "notificationTypes": [],
    "notificationDetails": "",
    "haveActionRequired": "",
    "actionRequiredDetails": "",
    "dataInsightDetails": "",
    "initiativesDetails": "",
    "eventWriteUp": ``
}

// AMD
const EVENT4_DETAILS =
{
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-07T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Notification of 2025 Medisave Bonus",
    "scheme": "Medisave",
    "description": "Bulk notification (SMS / Letter) of MediSave Bonus (MSB)",
    "affectedCohortDescription": "Young Seniors and Merdeka Generation seniors born between 1950 and 1973 with MediSave bonus",
    "estimatedCohortSize": 280000,
    "cluster": "SVC",
    "group": "ASG",
    "department": "AMD",
    "OIC": "AD(AMD) Lim Lan Si",
    "OICEmail": "Lim.Lan.Si@cpf.com.sg",
    // "reportStatus": "Completed"
}

const EVENT4_CIA = {
    "perceivedUnhappiness": "No",
    "perceivedUnhappinessDetails": "",
    "generateInterest": "Yes",
    "generateInterestDetails": "",
    "haveAnnouncement": "No",
    "announcementTypes": [],
    "haveNotification": "Yes",
    "notificationTypes": [
        "Letter",
        "SMS",
        "Post Payment Notification"
    ],
    "notificationDetails": "",
    "haveActionRequired": "No",
    "actionRequiredDetails": "",
    "dataInsightDetails": "",
    "initiativesDetails": "",
    "eventWriteUp": `MOH has announced that there will be a one-time MediSave Bonus of $500 in 2025 for Young Seniors and Merdeka Generation seniors who were born between 1950 and 1973 (inclusive) and have lower MediSave balances (i.e. less than $37,750 which is half of Basic Healthcare Sum). This bonus aims to help cushion the increase in MediShield Life premiums.
                    280,000 eligible citizens will receive their one- time MediSave Bonus in July 2025. They will be notified through SMS on their Singpass - registered mobile number, or through a hardcopy letter sent to their NRIC - registered address.The notification will include the bonus amount credited to their CPF MediSave account and direct them to the govbenefits website for more information.Anticipated minimal or no impact to frontline as no action will be required from these members.
                    Calls will be handled by: National Projects Hotline(TDCX)
                    `
}

const EVENT5_DETAILS = {
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-03T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Bulk payment of SGH MediSave Bonus",
    "scheme": "MediSave",
    "description": "Bulk payment of SGH MediSave Bonus (MSB) for eligible Singaporeans under 2025 MediSave Bonus exercise.",
    "affectedCohortDescription": "Eligible Singaporeans aged 51 to 74 in 2024 ",
    "estimatedCohortSize": 280000,
    "cluster": "SVC",
    "group": "ASG",
    "department": "AMD",
    "OIC": "SDD(AMD) Yvonne Chong",
    "OICEmail": "Yvonne.Chong@cpf.com.sg",
    // "reportStatus": "Completed"
};

const EVENT9_DETAILS = {
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-07-07T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "GST Voucher (GSTV) – Press Release",
    "scheme": "GSTV",
    "description": "Press Release for GST Voucher (GSTV)",
    "affectedCohortDescription": "Eligible Singaporeans aged 21 and above",
    "estimatedCohortSize": 14000000,
    "cluster": "SVC",
    "group": "ASG",
    "department": "AMD",
    "OIC": "AD(AMD) Lim Lan Si",
    "OICEmail": "Lim.Lan.Si@cpf.com.sg",
    // "reportStatus": "Completed"
};

// MPD
const EVENT27_DETAILS = {
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-02T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "eDM series for members aged 36-54 without a child",
    "scheme": "",
    "description": "eDM series for members aged 36-54 without a child to start planning their finances",
    "affectedCohortDescription": "Subscribers",
    "estimatedCohortSize": 350000,
    "cluster": "PCD",
    "group": "COM",
    "department": "MPD",
    "OIC": "DD(MP) Joanne Lim",
    "OICEmail": "Joanne.Lim@cpf.com.sg",
    // "reportStatus": "Completed"
};

const EVENT28_DETAILS = {
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-02T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "eDM series for members aged 19 to 40 with young children",
    "scheme": "",
    "description": "eDM series for members aged 19 to 40 with young children less than 1 year old",
    "affectedCohortDescription": "Subscribers",
    "estimatedCohortSize": 350000,
    "cluster": "PCD",
    "group": "COM",
    "department": "MPD",
    "OIC": "DD(MP) Joanne Lim",
    "OICEmail": "Joanne.Lim@cpf.com.sg",
    // "reportStatus": "Completed"
};

const EVENT30_DETAILS = {
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-02T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "CPF70 eDM",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "Subscribers",
    "estimatedCohortSize": 350000,
    "cluster": "PCD",
    "group": "COM",
    "department": "MPD",
    "OIC": "DD(MP) Joanne Lim",
    "OICEmail": "Joanne.Lim@cpf.com.sg",
    // "reportStatus": "Completed"
};

const EVENT31_DETAILS = {
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-02T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Press release on CPF70 book launch",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "All Members",
    "estimatedCohortSize": 1000000,
    "cluster": "PCD",
    "group": "COM",
    "department": "MPD",
    "OIC": "SM(MP) Zafirah Salim",
    "OICEmail": "Zafirah.Salim@cpf.com.sg",
    // "reportStatus": "Completed"
};

// OPD
const EVENT33_DETAILS = {
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-04T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Life's Supermart, CPF Talk Series, CPF70 Book Launch and Commemorative Displays",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "CPF Members",
    "estimatedCohortSize": 6000,
    "cluster": "PCD",
    "group": "COM",
    "department": "OPD",
    "OIC": "AD(Nur Diana Jamaludin)",
    "OICEmail": "Nur.Diana.Jamaludin@cpf.com.sg",
    // "reportStatus": "Completed"
};

const EVENT34_DETAILS = {
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-12T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "CPFV x CPF 70 Carnival",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "CPF volunteers",
    "estimatedCohortSize": 200,
    "cluster": "PCD",
    "group": "COM",
    "department": "OPD",
    "OIC": "DD(OP) Teo Zhijia",
    "OICEmail": "Teo.Zhijia@cpf.com.sg",
    // "reportStatus": "Completed"
};

// HED
const EVENT116_DETAILS = {
    "type": "Existing with Changes",
    "embargoed": "No",
    "startDate": new Date("2025-07-25T16:00:00.000Z"),
    "endDate": new Date("2025-08-25T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Invitation for HPS Cover with Premium Loading",
    "scheme": "HPS",
    "description": "Invitation notifications to members who might qualify for an HPS cover with premium loading",
    "affectedCohortDescription": "Members who are who might qualify for an HPS cover with premium loading",
    "estimatedCohortSize": 50,
    "cluster": "SVC",
    "group": "HIG",
    "department": "HED",
    "OIC": "M(HE) Yeo PeiXiu",
    "OICEmail": "Yeo.PeiXiu@cpf.com.sg",
    // "reportStatus": "Completed"
};

// RSD
const EVENT123_DETAILS = {
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-10T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Public launch of PLAN with CPF",
    "scheme": "PLAN with CPF",
    "description": `Public launch of PLAN with CPF (Phase 2)
                    - In July 2025, we will be implementing the following enhancements to PLAN with CPF:
                    a) Revamped pre-login page serves as an explainer on the value proposition and key features of the PLAN dashboard
                    b) New post-login PLAN dashboard, where members can access the various planners and easily track their planning progress
                    c) New Financial Health Questionnaire in collaboration with MoneySense, to help members train their financial fitness beyond CPF`,
    "affectedCohortDescription": "All CPF members 16 and above (excluding members not alive, account is dormant, amalgamated, foreigner, UM members, RLE members)",
    "estimatedCohortSize": 10000000,
    "cluster": "SVC",
    "group": "RIG",
    "department": "RSG",
    "OIC": "SDD(RS) Jit Yong Yap",
    "OICEmail": "Jit.Yong.Yap@cpf.com.sg",
    // "reportStatus": "Completed"
};

const EVENT124_DETAILS = {
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-10T16:00:00.000Z"),
    "endDate": new Date("2025-08-10T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "MSF's press release on new disability registration process and criteria",
    "scheme": "",
    "description": `MSF's press release on new disability registration process and criteria
                    - MSF will inform persons with disabilities who are already registered that no further action is needed as they will be automatically assessed for MRSS in 2026
                    - For persons with disabilities who are unregistered, they will need to register with MSF to be assessed for MRSS
                    - MSF registration will commence in Aug 2025`,
    "affectedCohortDescription": "Persons with disabilities",
    "estimatedCohortSize": 450000,
    "cluster": "SVC",
    "group": "RIG",
    "department": "RSG",
    "OIC": "SDD(RS) Serene Goh",
    "OICEmail": "Serene.Goh@cpf.com.sg",
    // "reportStatus": "Completed"
};

// NAC
const EVENT155_DETAILS = {
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-07-28T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Reminder letter to foreigners to withdraw their CPF savings after account closure",
    "scheme": "",
    "description": ``,
    "affectedCohortDescription": "Foreigners with CPF account and monies are in GMF",
    "estimatedCohortSize": 1000000,
    "cluster": "SVC",
    "group": "RIG",
    "department": "NAC",
    "OIC": "M(NAC) Alezec Wang",
    "OICEmail": "Alezec.Wang@cpf.com.sg",
    // "reportStatus": "Completed"
};

const EVENTS = [
    { "Event Details": EVENT4_DETAILS, "Impact Assessment": EVENT4_CIA },
    { "Event Details": EVENT5_DETAILS, "Impact Assessment": EVENT4_CIA },
    { "Event Details": EVENT9_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": EVENT27_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": EVENT28_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": EVENT30_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": EVENT31_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": EVENT33_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": EVENT34_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": EVENT116_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": EVENT123_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": EVENT124_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": EVENT155_DETAILS, "Impact Assessment": template_CIA }

]

export default EVENTS;