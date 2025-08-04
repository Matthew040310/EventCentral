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

// MPD
const ROW25_EVENT = {
    "id": "",
    "type": "Existing with Changes",
    "embargoed": "No",
    "startDate": new Date("2025-05-30T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "GE's appointment as DPS insurer",
    "scheme": "",
    "description": "Media release on extension of GE's appointment as DPS insurer",
    "affectedCohortDescription": "All Members",
    "estimatedCohortSize": 1000000,
    "cluster": "PCD",
    "group": "COM",
    "department": "MPD",
    "OIC": "SM(MP) Zafirah Salim",
    "OICEmail": "Zafirah.Salim@cpf.com.sg",
    // "reportStatus": "Completed"
}

const ROW26_EVENT = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-05-15T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Implementation of single outbound number",
    "scheme": "",
    "description": "Media release on implementation of single outbound number",
    "affectedCohortDescription": "All Members",
    "estimatedCohortSize": 1000000,
    "cluster": "PCD",
    "group": "COM",
    "department": "MPD",
    "OIC": "DD(MP) Adeline Leu",
    "OICEmail": "Adeline.Leu@cpf.com.sg",
    // "reportStatus": "Completed"
}

// SLD
const ROW33_EVENT = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-05-05T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "2024 Member Services Survey",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "Members who have interacted with CPFB in 2024",
    "estimatedCohortSize": 40000,
    "cluster": "SVC",
    "group": "CUG",
    "department": "SLD",
    "OIC": "AD(SL) Yeo Khai Qin",
    "OICEmail": "Yeo.Khai.Qin@cpf.com.sg",
    // "reportStatus": "Completed"
}

// DSD
const ROW38_EVENT = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-05-12T16:00:00.000Z"),
    "endDate": new Date("2025-05-31T16:00:00.000Z"),
    "frequency": "Weekly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Home ownership dashboard survey",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "Survey to evaluate the Home ownership dashboard's effectiveness for property decision-making",
    "estimatedCohortSize": 500,
    "cluster": "IDS",
    "group": "DSG",
    "department": "DSD",
    "OIC": "SDD(DS) Jillian Foo",
    "OICEmail": "Jillian.Foo@cpf.com.sg",
    // "reportStatus": "Completed"
}

// CPG
const ROW50_EVENT = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-05-20T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Inform employers on the increase in CPF OW ceiling",
    "scheme": "CPF OW",
    "description": "Email blast to inform employers on the increase in CPF OW ceiling to $8000 and CPF contribution rate change for senior workers from 1 Jan 2026",
    "affectedCohortDescription": "Employers",
    "estimatedCohortSize": 1000000,
    "cluster": "SVC",
    "group": "ECE",
    "department": "CSD",
    "OIC": "SM (CS) Anuradha",
    "OICEmail": "Anuradha@cpf.com.sg",
    // "reportStatus": "Completed"
}

const ROW51_EVENT = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-05-20T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "CPF Submission Number Application",
    "scheme": "CPF EZPay",
    "description": `Apply for CPF Submission Number (CSN): Content change in notification email and acknowledgement page for completed applications [Tentatively from 20 May  2025 onwards].
                    a) Employer can submit CPF contributions via CPF EZPay the next calendar day (for CSN application submitted before 5pm) instead of the current two calendar days.`,
    "affectedCohortDescription": "Employers applying CPF Submission Number (CSN)",
    "estimatedCohortSize": 2500,
    "cluster": "SVC",
    "group": "ECE",
    "department": "CSD",
    "OIC": "SM (CS) Anuradha",
    "OICEmail": "Anuradha@cpf.com.sg",
    // "reportStatus": "Completed"
}

// HED
const ROW99_EVENT = {
    "id": "",
    "type": "Existing with Changes",
    "embargoed": "No",
    "startDate": new Date("2025-05-01T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Implementation of optional HPS cover ",
    "scheme": "HPS",
    "description": "Implementation of optional HPS cover with premium loading for less severe pre-existing health conditions",
    "affectedCohortDescription": "HPS members who have certain pre-existing conditions that are not so severe may be covered under HPS, subject to premium loading",
    "estimatedCohortSize": 100,
    "cluster": "SVC",
    "group": "HIG",
    "department": "HED",
    "OIC": "DD(HE) Marie Yam",
    "OICEmail": "Marie.Yam@cpf.com.sg",
    // "reportStatus": "Completed"
}

// NAC
const ROW126_EVENT = {
    "id": "",
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-05-19T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Singpass Face Verification (SFV) for all online nominations",
    "scheme": "Nomination",
    "description": "",
    "affectedCohortDescription": "Members who submit an online nomination",
    "estimatedCohortSize": 8000,
    "cluster": "SVC",
    "group": "RIG",
    "department": "NAC",
    "OIC": "SM (NAC) Shernice Png",
    "OICEmail": "Shernice.Png@cpf.com.sg",
    // "reportStatus": "Completed"
}

const EVENTS = [
    { "Event Details": ROW25_EVENT, "Impact Assessment": template_CIA },
    { "Event Details": ROW26_EVENT, "Impact Assessment": template_CIA },
    { "Event Details": ROW33_EVENT, "Impact Assessment": template_CIA },
    { "Event Details": ROW38_EVENT, "Impact Assessment": template_CIA },
    { "Event Details": ROW50_EVENT, "Impact Assessment": template_CIA },
    { "Event Details": ROW51_EVENT, "Impact Assessment": template_CIA },
    { "Event Details": ROW99_EVENT, "Impact Assessment": template_CIA },
    { "Event Details": ROW126_EVENT, "Impact Assessment": template_CIA }
]

export default EVENTS