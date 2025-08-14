import EventDetails from './IEventDetails';
import ImpactAssessment from './IImpactAssessment';

export default interface FullEventReport extends EventDetails {
    parentid: string | null;
    impactAssessmentId: string | null;
    submittedImpactAssessment?: ImpactAssessment;
    draftImpactAssessment?: ImpactAssessment;
    lastUpdatedBy: string;
    lastUpdated: Date;
}