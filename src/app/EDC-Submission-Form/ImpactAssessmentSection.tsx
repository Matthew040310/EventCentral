import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import CustomDropDown from "@/app/EDC-Submission-Form/_components/CustomDropDown"
import CustomTextField from "@/app/EDC-Submission-Form/_components/CustomTextField"
import CustomMultiSelect from '@/app/EDC-Submission-Form/_components/CustomMultiSelect';
import ToggleSampleResponse from '@/components/ToggleSampleResponse';

import ImpactAssessmentProps from '@/types/IImpactAssessmentProps';
import { ANNOUNCEMENT_TYPES, NOTIFICATION_TYPES } from "@/constants/EventCentralConstants"

const ImpactAssessmentSection: React.FC<ImpactAssessmentProps> = ({
  handleInputChange,
  inputFields,
}) => (
  <Box>
    {/* Question 2.1 */}
    <Typography variant='subtitle2' sx={{ mt: 3, mb: 0.5 }}>
      2.1 Will this event cause perceived unhappiness among members? Consider
    </Typography>
    <Grid container>
      <Grid
        size={{
          xs: 12,
          sm: 9
        }}>
        <ul style={{ fontSize: "12px" }}>
          <li>Introduction of new policies or procedures</li>
          <li>Changes to existing benefits or services</li>
          <li>Adjustments to timelines or deadlines</li>
          <li>Modifications to eligibility criteria</li>
          <li>Updates to application processes</li>
        </ul>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 3
        }}>
        <CustomDropDown sm={12}
          label="Yes / No"
          options={["Yes", "No"]}
          value={inputFields?.perceivedUnhappiness ?? null}
          onChange={(_, newValue) => handleInputChange("perceivedUnhappiness")(newValue)} />
      </Grid>
    </Grid>
    {inputFields?.perceivedUnhappiness === "Yes" && (
      <CustomTextField label="Why will this event cause perceived unhappiness from members?" sm={12}
        name="perceivedUnhappinessDetails"
        value={inputFields?.perceivedUnhappinessDetails ?? ""}
        onChange={(e) => handleInputChange("perceivedUnhappinessDetails")(e.target.value)}
        rows={3} multiline />
    )}

    {/* Question 2.2 */}
    <Typography variant="subtitle2" sx={{ mt: 3, mb: 0.5 }}>
      2.2 Will the event generate interest from customers? Consider
    </Typography>
    <Grid container>
      <Grid
        size={{
          xs: 12,
          sm: 9
        }}>
        <ul style={{ fontSize: "12px" }}>
          <li>Introduction of new benefits or services</li>
          <li>Changes existing policies or procedures</li>
          <li>Potential attraction of media attention</li>
          <li>Modifications to eligibility criteria</li>
          <li>Updates to application processes</li>
        </ul>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 3
        }}>
        <CustomDropDown sm={12}
          label="Yes / No"
          options={["Yes", "No"]}
          value={inputFields?.generateInterest ?? null}
          onChange={(_, newValue) => handleInputChange("generateInterest")(newValue)} />
      </Grid>
    </Grid>
    {inputFields?.generateInterest === "Yes" && (
      <CustomTextField label="Why will this event generate member's interest?" sm={12}
        name="generateInterestDetails"
        value={inputFields?.generateInterestDetails ?? ""}
        onChange={(e) => handleInputChange("generateInterestDetails")(e.target.value)}
        rows={3} multiline />
    )}

    {/* Question 2.3 */}
    <Typography variant="subtitle2" sx={{ mt: 3, mb: 0.5 }}>
      2.3 Will there be any announcements for the event?
    </Typography>
    <Grid container columnSpacing={2}>
      <CustomDropDown sm={3}
        label="Yes / No"
        options={["Yes", "No"]}
        value={inputFields?.haveAnnouncement ?? null}
        onChange={(_, newValue) => handleInputChange("haveAnnouncement")(newValue)} />
      {inputFields.haveAnnouncement === "Yes" &&
        <CustomMultiSelect
          value={inputFields.announcementTypes ?? []}
          options={ANNOUNCEMENT_TYPES}
          label="Announcement Types"
          onChange={(_, newValue) => handleInputChange("announcementTypes")(newValue)} />}
    </Grid>

    {/* Question 2.4 */}
    <Typography variant="subtitle2" sx={{ mt: 3, mb: 0.5 }}>
      2.4 Will there be any notifications sent to customers?
    </Typography>
    <Grid container columnSpacing={2}>
      <CustomDropDown sm={3}
        label="Yes / No"
        options={["Yes", "No"]}
        value={inputFields?.haveNotification ?? null}
        onChange={(_, newValue) => handleInputChange("haveNotification")(newValue)} />
      {inputFields.haveNotification == "Yes" && <CustomMultiSelect
        label="Notification Types"
        value={inputFields.notificationTypes ?? []}
        options={NOTIFICATION_TYPES}
        onChange={(_, newValue) => handleInputChange("notificationTypes")(newValue)} />}
    </Grid>
    {inputFields?.haveNotification === "Yes" && (
      <>
        <Typography variant="body2" sx={{ mt: 2, mb: 0.5 }}>
          Please provide details on the following:
        </Typography>
        <ul style={{ fontSize: "12px" }}>
          <li>How and when will the notifications be sent?</li>
          <li>What is the intended message?</li>
          <li>Is there a call to action and what is it?</li>
          <li>Will customers be invited to contact our frontline channels?</li>
          <li>Will it be in 4 vernacular languages?</li>
        </ul>
        <ToggleSampleResponse>
          Email notifications will be sent on 15 June 2025 to all affected customers.
          The message will inform them of the new online service and guide them to update their information within 30 days.
          There will be a clear call-to-action button linking to the update form. Customers will be advised to contact our hotline if they need assistance.
          Notifications will only be in English. Draft templates will be shared with CUG by 1 June for review
        </ToggleSampleResponse>

        <CustomTextField label="Notification Details" sm={12}
          name="notificationDetails"
          value={inputFields?.notificationDetails ?? ""}
          onChange={(e) => handleInputChange("notificationDetails")(e.target.value)}
          rows={3} multiline />
      </>
    )}

    {/* Question 2.5 */}
    <Typography variant="subtitle2" sx={{ mt: 3, mb: 0.5 }}>
      2.5 Will there be any actions required from members?
    </Typography>
    <Grid container columnSpacing={2}>
      <CustomDropDown sm={3}
        label="Yes / No"
        options={["Yes", "No"]}
        value={inputFields?.haveActionRequired ?? null}
        onChange={(_, newValue) => handleInputChange("haveActionRequired")(newValue)} />
    </Grid>
    {inputFields?.haveActionRequired === "Yes" && (
      <>
        <Typography variant="body2" sx={{ mt: 2, mb: 0.5 }}>
          Please provide details on the following:
        </Typography>
        <ul style={{ fontSize: "12px" }}>
          <li>The exact duration (e.g., 30 days, 2 months, until 31 December 2025)</li>
          <li>Start and end dates of the response period</li>
          <li>Any grace periods or extensions</li>
          <li>Consequences of not responding within the given timeframe</li>
          <li>Reminders or follow-ups planned during the response period</li>
          <li>If the timeframe varies based on certain conditions, please explain briefly.</li>
        </ul>
        <ToggleSampleResponse>
          Customers are given 45 days to respond, starting from the date they receive the notification.
          The response period is from 1 July to 14 August 2025. A 15-day grace period will be granted until 31 August 2025 for late submissions.
          Reminder emails will be sent at 15 and 30 days after the initial notification.
          Customers who don't respond by 31 August may face delays in processing their benefits.
        </ToggleSampleResponse>
        <CustomTextField label="Action Required Details" sm={12}
          name="actionRequiredDetails"
          value={inputFields?.actionRequiredDetails ?? ""}
          onChange={(e) => handleInputChange("actionRequiredDetails")(e.target.value)}
          rows={3} multiline />
      </>
    )}

    {/* Not in ppt requirements but in CIA */}
    {/* Question 2.6 */}
    <Typography variant="subtitle2" sx={{ mt: 3, mb: 0.5 }}>
      2.6 What are your data insights of the response rate based on historical events? Please provide:
    </Typography>
    <ul style={{ fontSize: "12px" }}>
      <li>Expected response rate (if applicable)</li>
      <li>Data from similar past events or initiatives</li>
      <li>Recent trends in application or enquiry volumes</li>
      <li>Any factors that might influence the response rate for this event</li>
      <li>Breakdown by customer segments, if relevant</li>
      <li>Include specific numbers or percentages where possible. If no directly comparable data exists, provide your best estimate based on related experiences.</li>
    </ul>
    <ToggleSampleResponse>
      Similar events in the past 2 years had an average response rate of 35%.
      We expect a slightly higher rate of 40-45% for this event due to increased online accessibility.
      Application volumes for related services have increased by 20% in the last quarter.
      Historically, response rates are higher (around 60%) for customers aged 30-50.
      We anticipate 70% of responses within the first week, based on past trends.
    </ToggleSampleResponse>
    <CustomTextField label="Description of Data insights from historical events" sm={12}
      name="dataInsightDetails"
      value={inputFields?.dataInsightDetails ?? ""}
      onChange={(e) => handleInputChange("dataInsightDetails")(e.target.value)}
      rows={5} multiline />

    {/* Question 2.7 */}
    <Typography variant="subtitle2" sx={{ mt: 3, mb: 2 }}>
      2.7 What are the initiatives in place to promote self-help or manage customers’ enquiries? e.g. FAQs, Online Form/Checker, Notification to Affected Members etc
    </Typography>
    <ToggleSampleResponse>
      <span style={{ fontSize: 10.5 }}>
        FAQs: Comprehensive set on website, covering 20 key FAQs<br />
        Email Notifications: Personalised emails to all affected members (est. 100,000). Scheduled for 5 June 2025.<br />
        Online Eligibility Checker: Launch from15 June 2025.<br />
        Website Banner: Prominent on homepage, linking to dedicated info page. From 1 June 2025.<br />
        Social Media Campaign: Series of 5 infographics on Facebook and Instagram. Rolling out weekly from 1 June 2025.<br />
        Video Tutorial: 3-minute explainer video on YouTube and website. Available from 10 June 2025.<br />
      </span>
    </ToggleSampleResponse>
    <CustomTextField label="Description of All Initiatives Planned or Implemented" sm={12}
      name="initiativesDetails"
      value={inputFields?.initiativesDetails ?? ""}
      onChange={(e) => handleInputChange("initiativesDetails")(e.target.value)}
      rows={5} multiline />

    {/* Write Up for New Event */}
    <Typography variant="subtitle2" sx={{ mt: 3, mb: 0.5 }}>
      Please provide a HOD approved write-up for the event, including the following details:
    </Typography>
    <ul style={{ fontSize: "12px" }}>
      <li>Background of event</li>
      <li>When will it occur, and will members receive any personalised notifications</li>
      <li>Any key items of concern</li>
      <li>What measures (e.g. new FAQs in CPF website) will be/have been implemented for handling of enquiries from members?</li>
    </ul>
    <CustomTextField label="Event Write Up" sm={12}
      name="eventWriteUp"
      value={inputFields?.eventWriteUp ?? ""}
      onChange={(e) => handleInputChange("eventWriteUp")(e.target.value)}
      rows={5} multiline />

    <CustomTextField label="Clearing HOD Name" sm={12}
      name="clearingHOD"
      value={inputFields?.clearingHOD ?? ""}
      onChange={(e) => handleInputChange("clearingHOD")(e.target.value)} />
  </Box >
);

export default ImpactAssessmentSection;