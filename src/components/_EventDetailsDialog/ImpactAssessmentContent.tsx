import { Campaign, Groups, Interests, Insights, Quiz, NotificationsActive, SentimentVeryDissatisfied } from '@mui/icons-material';

// Components
import { ImpactAssessmentQuestion } from './DialogComponents';
// Types
import FullEventReport from '@/types/IFullEventReport';
import ImpactAssessment from '@/types/IImpactAssessment';

const ImpactAssessmentContent = ({ eventDetails }: { eventDetails: Partial<FullEventReport> }) => {
    const impactAssessmentReference = eventDetails.submittedImpactAssessment || eventDetails.draftImpactAssessment;
    const { perceivedUnhappiness, perceivedUnhappinessDetails,
        generateInterest, generateInterestDetails,
        haveAnnouncement, announcementTypes,
        haveNotification, notificationTypes, notificationDetails,
        haveActionRequired, actionRequiredDetails,
        dataInsightDetails,
        initiativesDetails
    } = impactAssessmentReference as ImpactAssessment

    return (
        <>
            <ImpactAssessmentQuestion mt={0}
                icon={<SentimentVeryDissatisfied color="action" />}
                question={"Will this event have perceived unhappiness from members?"}
                answer={perceivedUnhappiness}
                details={perceivedUnhappinessDetails}
            />

            <ImpactAssessmentQuestion
                icon={<Interests color="action" />}
                question={"Will this event generate interest from members?"}
                answer={generateInterest}
                details={generateInterestDetails}
            />

            <ImpactAssessmentQuestion
                icon={<Campaign color="action" />}
                question={"Will there be any announcement for the event?"}
                answer={haveAnnouncement}
                types={announcementTypes || []}
            />

            <ImpactAssessmentQuestion
                icon={<NotificationsActive color="action" />}
                question={"Will there be notifications sent to members?"}
                answer={haveNotification}
                types={notificationTypes || []}
                details={notificationDetails}
            />

            <ImpactAssessmentQuestion
                icon={<Groups color="action" />}
                question={"Will this event require any action from members?"}
                answer={haveActionRequired}
                details={actionRequiredDetails}
            />

            <ImpactAssessmentQuestion
                icon={<Insights color="action" />}
                question={"What are your data insights of the response rate based on historical events?"}
                details={dataInsightDetails}
            />

            <ImpactAssessmentQuestion
                icon={<Quiz color="action" />}
                question={"What are the initiatives in place to promote self-help or manage customers’ enquiries?"}
                details={initiativesDetails}
            />
        </>
    )
}

export default ImpactAssessmentContent