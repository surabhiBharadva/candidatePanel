import { Interview } from "./Interview";
import { DocumentData } from "./DocumentData";
import { CandidateStatusEnum } from "../enum/CandidateEnum";
import { PositionEnum } from "../enum/PositionEnum";
import { CandidateAvailabilityEnum } from "../enum/CandidateAvailabilityEnum";

export class Candidate{
    id?:number;
    candidateName ?: String;
    position?: PositionEnum;
    email ?: String;
    phone ?: String;
    skills ?: String;
    fileUpload?: String;
    jDate?:Date;
    comment?:String;
    candidateStatus?:CandidateStatusEnum;
    hireOrNotHire?:boolean;
    interview ?: Interview;
    documentDetails?: DocumentData;
    candidateAvailability?:CandidateAvailabilityEnum;
    status?:boolean;
    candidateDate?:Date;
    
}