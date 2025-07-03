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
const ROW4_DETAILS = {
    "id": "",
    "type": "Existing with Changes",
    "embargoed": "No",
    "startDate": new Date("2025-04-22T16:00:00.000Z"),
    "endDate": new Date("2026-12-28T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Verification of Employment Status for Selected WIS Recipients",
    "scheme": "Workfare Income Supplement (WIS)",
    "description": "Workfare Income Supplement (WIS) Verification of employment status for selected group of WIS recipients",
    "affectedCohortDescription": "Selected WIS recipients & their employers",
    "estimatedCohortSize": 600,
    "cluster": "SVC",
    "group": "ASG",
    "department": "AMD",
    "OIC": "DD(AMD) Victor Yan ",
    "OICEmail": "Victor.Yan@cpf.com.sg",
    "reportStatus": "Completed"
}

const ROW6_DETAILS = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-04-22T16:00:00.000Z"),
    "endDate": null,
    "frequency": "Ad-hoc",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Annual notification (SMS / Letter) of Earn and Save Bonus (ESB)",
    "scheme": "Majulah Package (MP)",
    "description": "",
    "affectedCohortDescription": "Eligible Singaporeans born in 1973 or ealier",
    "estimatedCohortSize": 600000,
    "cluster": "SVC",
    "group": "ASG",
    "department": "AMD",
    "OIC": "AD(AMD) Lim Lan Si ",
    "OICEmail": "Lim.Lan.Si@cpf.com.sg",
    "reportStatus": "Completed"
}

const ROW7_DETAILS = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-04-22T16:00:00.000Z"),
    "endDate": new Date("2026-12-28T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "WIS Monthly Payment Run",
    "scheme": "Workfare Income Supplement (WIS)",
    "description": "Workfare Income Supplement (WIS)/Training Commitment Award (TCA) Monthly Payment Run",
    "affectedCohortDescription": "Low-wage workers",
    "estimatedCohortSize": 350000,
    "cluster": "SVC",
    "group": "ASG",
    "department": "AMD",
    "OIC": "AD(AMD) Vivien Goh ",
    "OICEmail": "Vivien.Goh@cpf.com.sg",
    "reportStatus": "Completed"
}

// COM
const ROW33_DETAILS = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-04-28T16:00:00.000Z"),
    "endDate": null,
    "frequency": "Ad-hoc",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "CPFV 4th Anniversary Event",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "CPF volunteers",
    "estimatedCohortSize": 180,
    "cluster": "PCD",
    "group": "COM",
    "department": "MPD",
    "OIC": "DD(OP) Teo Zhi Jia",
    "OICEmail": "Teo.Zhi.Jia@cpf.com.sg",
    "reportStatus": "Completed"
}

// DSD
const ROW44_DETAILS = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-04-07T16:00:00.000Z"),
    "endDate": null,
    "frequency": "Ad-hoc",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Recruiting participants for CPF EDN Loan Research Study",
    "scheme": "",
    "description": "Recruiting participants for research study to understand members' experience applying for CPF EDN Loan",
    "affectedCohortDescription": "CPF EDN Loan applicants",
    "estimatedCohortSize": 100,
    "cluster": "IDS",
    "group": "DSG",
    "department": "DSD",
    "OIC": "SM(DS) Tan Yong Heng",
    "OICEmail": "Tan.Yong.Heng@cpf.com.sg",
    "reportStatus": "Completed"
}

// CSD
const ROW55_DETAILS = {
    "id": "",
    "type": "Existing with Changes",
    "embargoed": "No",
    "startDate": new Date("2025-04-22T16:00:00.000Z"),
    "endDate": new Date("2026-02-28T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "CPF EzPay's Main Menu Page Annnouncment Regarding increase in CPF OW ceiling",
    "scheme": "",
    "description": "Announcement on CPF EZPay's main menu page to inform employers on the increase in CPF OW ceiling to $8000 and CPF contribution rate change for senior workers from 1 Jan 2026",
    "affectedCohortDescription": "''e' employers using EZPay",
    "estimatedCohortSize": 100001,
    "cluster": "SVC",
    "group": "ECE",
    "department": "CSD",
    "OIC": "SM(CS) Anuradha ",
    "OICEmail": "Anuradha@cpf.com.sg",
    "reportStatus": "Completed"
}

const ROW55_CIA = {
    "perceivedUnhappiness": "Yes",
    "perceivedUnhappinessDetails": "Increase in employer's cost and reduction in employee's take-home pay.",
    "generateInterest": "Yes",
    "generateInterestDetails": "Employers will receive CPF transition offset and for employees, it improves their retirement adequacy.",
    "haveAnnouncement": "Yes",
    "announcementTypes": ["Budget Speech", "CPF Website"],
    "haveNotification": "No",
    "notificationTypes": [],
    "notificationDetails": "",
    "haveActionRequired": "No",
    "actionRequiredDetails": "",
    "dataInsightDetails": "NA",
    "initiativesDetails": "NA",
    "eventWriteUp": ``
}

const ROW58_DETAILS = {
    "id": "",
    "type": "Existing with Changes",
    "embargoed": "No",
    "startDate": new Date("2025-04-01T16:00:00.000Z"),
    "endDate": null,
    "frequency": "Ad-hoc",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Disable the Additional Wage ceiling refund option in the All-in-One Refund form",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "Employers who have paid excess contributions above the Additional Wage ceiling",
    "estimatedCohortSize": 5000,
    "cluster": "SVC",
    "group": "ECE",
    "department": "CSD",
    "OIC": "AD Ye Xiu Yin ",
    "OICEmail": "Ye.Xiu.Yin@cpf.com.sg",
    "reportStatus": "Completed"
}

// HCP
const ROW69_DETAILS = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-04-01T16:00:00.000Z"),
    "endDate": null,
    "frequency": "Ad-hoc",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "MSHL and MSV Cancer Drug List Update",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "All members who are covered under MSHL",
    "estimatedCohortSize": 300000,
    "cluster": "SVC",
    "group": "HFG",
    "department": "HCP",
    "OIC": "SDD(HCP) Tan Mei Peng ",
    "OICEmail": "Tan.Mei.Peng@cpf.com.sg",
    "reportStatus": "Completed"
}

const ROW70_DETAILS = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-04-01T16:00:00.000Z"),
    "endDate": null,
    "frequency": "Ad-hoc",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "MSHL 2024 Review",
    "scheme": "",
    "description": `i.	Refresh of inpatient, day surgery and outpatient limits 
                    ii.	Refresh of MediShield Life pro-ration factors
                    iii.	Different pro-ration factors to be applied to ward charges and surgical fees respectively 
                    iv.	Revised pro-ration factors for outpatient dialysis and erythropoietin treatments, with new pro-ration settings for Voluntary Welfare Organisations (VWOs)
                    v.	Raising of the MediShield Life policy year limit from $150,000 to $200,000
                    vi.	Increase in inpatient deductible `,
    "affectedCohortDescription": "All members who are covered under MSHL",
    "estimatedCohortSize": 300000,
    "cluster": "SVC",
    "group": "HFG",
    "department": "HCP",
    "OIC": "SDD(HCP) Tan Mei Peng ",
    "OICEmail": "Tan.Mei.Peng@cpf.com.sg",
    "reportStatus": "Completed"
}

// RIU
const ROW113_DETAILS = {
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-04-21T16:00:00.000Z"),
    "endDate": null,
    "frequency": "Ad-hoc",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Notification for RSS members who starts payouts in the following month",
    "scheme": "",
    "description": "Monthly notification for RSS members who starts payouts in the following month",
    "affectedCohortDescription": "Affects RSS members starting payouts in the next month",
    "estimatedCohortSize": 10000,
    "cluster": "SVC",
    "group": "HFG",
    "department": "HCP",
    "OIC": "AM(RW) Arina Lim",
    "OICEmail": "Arina.Lim@cpf.com.sg",
    "reportStatus": "Completed"
}

const ROW114_DETAILS = {
    "id": "",
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-04-21T16:00:00.000Z"),
    "endDate": null,
    "frequency": "Ad-hoc",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Ad-hoc Push Notification (PN) for CPF Withdrawal Lock",
    "scheme": "",
    "description": "Ad-hoc Push Notification (PN) to encourage members aged 55 and above who have not activated CPF Withdrawal Lock to do so",
    "affectedCohortDescription": "All post-55 members with CPF Mobile app installed, less those who have already activated CPF Withdrawal Lock",
    "estimatedCohortSize": 200000,
    "cluster": "SVC",
    "group": "HFG",
    "department": "HCP",
    "OIC": "SM(RW) Merwyn Low",
    "OICEmail": "Merwyn.Low@cpf.com.sg",
    "reportStatus": "Completed"
}

const ROW115_DETAILS = {
    "id": "",
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-04-14T16:00:00.000Z"),
    "endDate": null,
    "frequency": "Ad-hoc",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Notification to update RLE members of new monthly payout rate ",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "RLE members affected by the new floor rate",
    "estimatedCohortSize": 1500,
    "cluster": "SVC",
    "group": "HFG",
    "department": "HCP",
    "OIC": "M(RW) Jeremy Choo",
    "OICEmail": "Jeremy.Choo@cpf.com.sg",
    "reportStatus": "Completed"
}

const EVENTS = [
    { "Event Details": ROW4_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW6_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW7_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW33_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW44_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW55_DETAILS, "Impact Assessment": ROW55_CIA },
    { "Event Details": ROW58_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW69_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW70_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW113_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW114_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW115_DETAILS, "Impact Assessment": template_CIA }
]

export default EVENTS