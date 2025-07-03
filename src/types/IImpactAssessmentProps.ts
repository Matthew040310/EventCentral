import ImpactAssessment from './IImpactAssessment';

export default interface ImpactAssessmentProps {
    handleInputChange: (fieldName: keyof ImpactAssessment) => (value: string | string[] | number | Date | null) => void;
    inputFields: ImpactAssessment;
}