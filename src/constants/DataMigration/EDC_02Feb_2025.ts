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
const ROW5_DETAILS =
{
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-02-02T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Payment of AP Senior Bonus",
    "scheme": "Assurance Package (AP)",
    "description": "Bulk payment of AP Senior Bonus",
    "affectedCohortDescription": "Eligible Singaporeans aged 21 & above",
    "estimatedCohortSize": 850000,
    "cluster": "SVC",
    "group": "ASG",
    "department": "AMD",
    "OIC": "SDD(AMD) Yvonne Chong",
    "OICEmail": "Yvonne.Chong@cpf.com.sg",
    // "reportStatus": "Completed"
}

const ROW6_DETAILS =
{
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-02-02T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Payment of AP MTS",
    "scheme": "Assurance Package (AP)",
    "description": "Bulk payment of AP MTS",
    "affectedCohortDescription": "Eligible Singaporeans aged 20 & below, and 55 & above",
    "estimatedCohortSize": 2000000,
    "cluster": "SVC",
    "group": "ASG",
    "department": "AMD",
    "OIC": "SDD(AMD) Yvonne Chong",
    "OICEmail": "Yvonne.Chong@cpf.com.sg",
    // "reportStatus": "Completed"
}

const ROW7_DETAILS =
{
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-02-10T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Post-Crediting Notification for AP Senior Bonus",
    "scheme": "Assurance Package (AP)",
    "description": "Send post-crediting notification (SMS/Letter) to notify citizens who received AP SB from bulk payment",
    "affectedCohortDescription": "Eligible Singaporeans aged 55 & above",
    "estimatedCohortSize": 850000,
    "cluster": "SVC",
    "group": "ASG",
    "department": "AMD",
    "OIC": "AD(AMD) Lim Lan Si",
    "OICEmail": "Lim.Lan.Si@cpf.com.sg",
    // "reportStatus": "Completed"
}

const ROW8_DETAILS =
{
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-02-10T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Post-Crediting Notification for AP Medisave Bonus",
    "scheme": "Assurance Package (AP)",
    "description": "Send post-crediting notification (SMS/Letter) to notify citizens who received AP MA frm bulk payment",
    "affectedCohortDescription": "Eligible Singaporeans aged 20 & below or 50 & above",
    "estimatedCohortSize": 2000000,
    "cluster": "SVC",
    "group": "ASG",
    "department": "AMD",
    "OIC": "AD(AMD) Lim Lan Si",
    "OICEmail": "Lim.Lan.Si@cpf.com.sg",
    // "reportStatus": "Completed"
}

// MPD
const ROW25_DETAILS =
{
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-02-15T16:00:00.000Z"),
    "endDate": new Date("2025-12-31T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 3,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Press release on Q2 CPF interest rates",
    "scheme": "CPF OA, SA, RA",
    "description": "",
    "affectedCohortDescription": "All Members",
    "estimatedCohortSize": 4000000,
    "cluster": "PCD",
    "group": "COM",
    "department": "MPD",
    "OIC": "DD(MP) Adeline Leu",
    "OICEmail": "Adeline.Leu@cpf.com.sg",
    // "reportStatus": "Completed"
}

const ROW27_DETAILS =
{
    "id": "",
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-02-07T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Media Publicity on CPF",
    "scheme": "",
    "description": "Behind Singapore's CPF (Retirement Adequacy Video Series with Lianhe Zaobao)",
    "affectedCohortDescription": "All Members",
    "estimatedCohortSize": 4000000,
    "cluster": "PCD",
    "group": "COM",
    "department": "MPD",
    "OIC": "AD(MP) Liang Qipei",
    "OICEmail": "Liang.Qipei@cpf.com.sg",
    // "reportStatus": "Completed"
}

// DSD
const ROW45_DETAILS =
{
    "id": "",
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-02-03T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Participant Recruitment for EZPay Research Study",
    "scheme": "EZPay",
    "description": "Recruiting participants for research study to evaluate the new flows for EZPay",
    "affectedCohortDescription": "EZPay users",
    "estimatedCohortSize": 350,
    "cluster": "IDS",
    "group": "DSG",
    "department": "DSD",
    "OIC": "M (DSD) Rachel Hor",
    "OICEmail": "Rachel.Hor@cpf.com.sg",
    // "reportStatus": "Completed"
}

const ROW46_DETAILS =
{
    "id": "",
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-02-06T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Participant Recruitment for CPF Digital Services Research Study",
    "scheme": "",
    "description": "Recruiting participants for research study to understand how members interact with our digital services.",
    "affectedCohortDescription": "Members aged 50 and above",
    "estimatedCohortSize": 230,
    "cluster": "IDS",
    "group": "DSG",
    "department": "DSD",
    "OIC": "SDD(DS) Jillian Foo",
    "OICEmail": "Jillian.Foo@cpf.com.sg",
    // "reportStatus": "Completed"
}

// CSD
const ROW54_DETAILS =
{
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-02-02T16:00:00.000Z"),
    "endDate": new Date("2025-04-02T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Remind 'e' employers to pay CPF contributions",
    "scheme": "EZPay",
    "description": "Email blast to remind 'e' employers to pay CPF contributions before the last day of the grace period",
    "affectedCohortDescription": "'e' employers",
    "estimatedCohortSize": 5000,
    "cluster": "SVC",
    "group": "ECE",
    "department": "CSD",
    "OIC": "M(CS) Tanagaletchimi",
    "OICEmail": "Tanagaletchimi@cpf.com.sg",
    // "reportStatus": "Completed"
}

const ROW55_DETAILS =
{
    "id": "",
    "type": "New",
    "embargoed": "No",
    "startDate": new Date("2025-02-05T16:00:00.000Z"),
    "endDate": new Date("2025-04-05T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Notification to EZPay Employers on Changes to CPF Payment Processes",
    "scheme": "EZPay",
    "description": "To inform CPF EZPay employers using Corporate PayNow that they will need to make payment within 7 working days from date of submission before submission expires (instead of about 2 months currently)",
    "affectedCohortDescription": `'(a) EZPay employers paying CPF via PayNow QR [Size: 40k]
                                    (b) EZPay/PAT employers paying CPF via bank transfer (MEPS) [Size: 1k]
                                    (c) PAT employers on Direct Debit 'Last Day Deduction' option [Size: 2k]` ,
    "estimatedCohortSize": 43000,
    "cluster": "SVC",
    "group": "ECE",
    "department": "CSD",
    "OIC": "AD(CSD) Chen Ying Ping",
    "OICEmail": "Chen.Ying.Ping@cpf.com.sg",
    // "reportStatus": "Completed"
}

const ROW55_CIA = {
    "perceivedUnhappiness": "Yes",
    "perceivedUnhappinessDetails": `(a) & (b) - Shorter timeframe for employers to make PayNow QR payments or bank transfers (MEPS)
                                    (c) - Employers can no longer enjoy deduction on last day of grace period and would need to shift their submission behaviour
                                    if they want to plan deduction on last day of grace period.`,
    "generateInterest": "No",
    "generateInterestDetails": "",
    "haveAnnouncement": "No",
    "announcementTypes": [],
    "haveNotification": "Yes",
    "notificationTypes": ["Email"],
    "notificationDetails": "Refer Write Up",
    "haveActionRequired": "yes",
    "actionRequiredDetails": "Refer Write Up",
    "dataInsightDetails": `The new 7-working-day payment deadline is expected to have minimal impact on employers. 
                            Our data shows that only 0.16% of employers currently make PayNow payments beyond 7 working days from the submission date;
                            this represents an average of 84 employers per month`,
    "initiativesDetails": "",
    "eventWriteUp": `CSD will be sending one-time email notifications in early Feb 2025 to these 3 groups of employers affected by CPF payment processes due to Employer Contribution Revamp Project (ERCON Revamp) implementation on 1 Apr 2025:
                    1) Changes to PayNow payment process wef 1 Apr 2025 – To inform CPF EZPay employers using Corporate PayNow that they will need to make payment within 7 working days from date of submission before submission expires (instead of about 2 months currently). [~40k employers] [Note: The new 7-working-day payment deadline is expected to have minimal impact on employers. Our data shows that only 0.16% of employers currently make PayNow payments beyond 7 working days from the submission date; this represents an average of 84 employers per month.]
                    2) Changes to bank transfer (MEPS) payment process wef 1 Apr 2025 – To inform CPF EZPay/PAT employers using bank transfer that they will need to enter CSN without dashes in bank payment reference and need to make payment within 7 working days from date of submission before submission expires. [ ~ 1k employers] [Note: The new 7-working-day payment deadline is expected to have minimal impact on employers. Our data shows that only 7.03% of employers are currently making MEPS payments beyond 7 working days from submission date; this represents an average of 105 employers per month.]
                    3) Discontinuation of Direct Debit 'Last Day Deduction’ wef 1 Apr 2025 for PAT employers – To inform Provident and Tax (PAT) employers on Direct Debit ‘Last Day Deduction’ that all deductions will take place 2 working days upon CPF submission (currently deduction will take place on 14th of the month if they submit between 1st to 12th of the month, or 2 working days later if they submit after 12th of the month). [~2k employers] 

                    For email notifications (1) and (2), we will implement a two-phase approach:
                    •	Phase 1 (First week of Feb 2025): We will send the email notification to a pilot cohort comprising employers who have been paying beyond 7 working days from date of submission. After the email notification is sent, CSD will then call selected employers to gather feedback on the clarity of the communicated changes and find out if employers have any concerns about meeting the new payment deadline of 7 working days. 
                    •	Phase 2 (Second week of Feb 2025): Based on the feedback received, CSD will refine the email content if necessary. The updated email notification will then be sent to all remaining employers.
                    Subsequently, CSD will send email reminders in second week of Mar 2025 for all 3 email notifications.
                    CSD anticipate that there may be some enquiries from employers about the changes and will share more information, including FAQs, holding lines and notification templates with CUG nearer to the date for sending the notifications.`
}

const ROW62_DETAILS =
{
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-02-28T16:00:00.000Z"),
    "endDate": new Date("2026-02-28T16:00:00.000Z"),
    "frequency": "Yearly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Auto refund of contributions paid above the Annual Limit in 2024",
    "scheme": "",
    "description": "Auto refund of contributions paid in 2024 above the Annual Limit of $37,740 - Exercise will span across few months, starting from end Feb 2025",
    "affectedCohortDescription": "Employees whose mandatory contributions exceeded the Annual Limit of $37,740 in 2024",
    "estimatedCohortSize": 5000,
    "cluster": "SVC",
    "group": "ECE",
    "department": "CSD",
    "OIC": "SM(CSD) Veron Tay",
    "OICEmail": "Veron.Tay@cpf.com.sg",
    // "reportStatus": "Completed"
}

const ROW67_DETAILS =
{
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-02-22T16:00:00.000Z"),
    "endDate": new Date("2025-12-30T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "PW CPF Contribution Alert",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "Platform workers who received CPF contributions from platform operators",
    "estimatedCohortSize": 88000,
    "cluster": "SVC",
    "group": "ECE",
    "department": "CSD",
    "OIC": "M(SE) Shawn Soo",
    "OICEmail": "Shawn.Soo@cpf.com.sg",
    // "reportStatus": "Completed"
}

// HID
const ROW105_DETAILS =
{
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-02-17T16:00:00.000Z"),
    "endDate": new Date("2025-12-30T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Supplement Plan First MA Deduction Letter",
    "scheme": "Medisave",
    "description": "Supplement Plan First MA deduction Letter to Payer (Sent by CPFB)",
    "affectedCohortDescription": "First MA deduction/change of payers/change of insurer with Supplement plan in Feb 2025.",
    "estimatedCohortSize": 12000,
    "cluster": "SVC",
    "group": "HFG",
    "department": "HID",
    "OIC": "SDD(HID) Jocelyn Low",
    "OICEmail": "Jocelyn.Low@cpf.com.sg",
    // "reportStatus": "Completed"
}

// HED
const ROW111_DETAILS =
{
    "id": "",
    "type": "Existing",
    "embargoed": "No",
    "startDate": new Date("2025-02-17T16:00:00.000Z"),
    "endDate": new Date("2025-12-30T16:00:00.000Z"),
    "frequency": "Monthly",
    "frequencyInterval": 6,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Invitation Notifications to Members without Home Protection Scheme (HPS)",
    "scheme": "HPS",
    "description": "Invitation Notifications to Members without Home Protection Scheme (HPS) cover but using CPF for Monthly Instalment ",
    "affectedCohortDescription": "Members who are using CPF for monthly housing instalments but have lapsed their HPS covers",
    "estimatedCohortSize": 20000,
    "cluster": "SVC",
    "group": "HIG",
    "department": "HED",
    "OIC": "AD(HE) Eileen Chua",
    "OICEmail": "Eileen.Chua@cpf.com.sg",
    // "reportStatus": "Completed"
}

// RSG
const ROW118_DETAILS =
{
    "id": "",
    "type": "Existing with Changes",
    "embargoed": "No",
    "startDate": new Date("2025-02-03T16:00:00.000Z"),
    "endDate": new Date("2026-12-30T16:00:00.000Z"),
    "frequency": "Yearly",
    "frequencyInterval": 1,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Notifications to all MRSS-eligible members",
    "scheme": "MRSS",
    "description": "Notifications to all MRSS-eligible members (around 800K) in two waves to notify them of their 2025 eligibility and grants received for qualifying 2024 top-ups (if applicable)",
    "affectedCohortDescription": "MRSS members (aged 55 and above)",
    "estimatedCohortSize": 800000,
    "cluster": "SVC",
    "group": "RIG",
    "department": "RSG",
    "OIC": "SM(RS) Tan Shu Liang",
    "OICEmail": "Tan.Shu.Liang@cpf.com.sg",
    // "reportStatus": "Completed"
}

// POD
const ROW161_DETAILS =
{
    "id": "",
    "type": "Existing with Changes",
    "embargoed": "No",
    "startDate": new Date("2025-02-03T16:00:00.000Z"),
    "endDate": null,
    "frequency": "One-off",
    "frequencyInterval": null,
    "customFrequency": null,
    "selectedDay": null,
    "title": "Budget/ COS 2025",
    "scheme": "",
    "description": "",
    "affectedCohortDescription": "All Members",
    "estimatedCohortSize": 4000000,
    "cluster": "PCD",
    "group": "PSR",
    "department": "POD",
    "OIC": "SM(PO) Brent Seah",
    "OICEmail": "Brent.Seah@cpf.com.sg",
    // "reportStatus": "Completed"
}

const EVENTS = [
    { "Event Details": ROW5_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW6_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW7_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW8_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW25_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW27_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW45_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW46_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW54_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW55_DETAILS, "Impact Assessment": ROW55_CIA },
    { "Event Details": ROW62_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW67_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW105_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW111_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW118_DETAILS, "Impact Assessment": template_CIA },
    { "Event Details": ROW161_DETAILS, "Impact Assessment": template_CIA }
]

export default EVENTS