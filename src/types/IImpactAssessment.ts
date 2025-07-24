export default interface ImpactAssessment {
    id?: string | null;
    perceivedUnhappiness?: string | null;
    perceivedUnhappinessDetails?: string | null;
    generateInterest?: string | null;
    generateInterestDetails?: string | null;
    haveAnnouncement?: string | null;
    announcementTypes?: string[] | null;
    haveNotification?: string | null;
    notificationTypes?: string[] | null;
    notificationDetails?: string | null;
    haveActionRequired?: string | null;
    actionRequiredDetails?: string | null;
    dataInsightDetails?: string | null;
    initiativesDetails?: string | null;
    eventWriteUp?: string | null;
    clearingHOD?: string | null;
}