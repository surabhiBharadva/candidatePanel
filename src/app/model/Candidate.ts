import { Interview } from "./Interview";
import { DocumentData } from "./DocumentData";
import { CandidateStatusEnum } from "../enum/CandidateEnum";
import { PositionEnum } from "../enum/PositionEnum";
import { CandidateAvailabilityEnum } from "../enum/CandidateAvailabilityEnum";

export class Candidate{
    id?:number;
    firstName ?: String;
    lastName ?: String;
    position?: String;
    email ?: String;
    phone ?: String;
    skills ?: String;
    resume?: String;
    joiningDate?:Date;
    comment?:String;
    candidateStatus?:CandidateStatusEnum;
    hireOrNotHire?:boolean;
    interview ?: Interview;
    documentDetails?: DocumentData;
    joiningAvailability?:String;
    status?:boolean;
    candidateDate?:Date;
    deleteFlag?:string;
    
}