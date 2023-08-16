import { Interview } from "./Interview";
import { DocumentData } from "./DocumentData";

export class Candidate{
    id?:number;
    firstName ?: string;
    lastName ?: string;
    jobRequirement?: string;
    email ?: string;
    phoneNo ?: string;
    skills ?: string;
    resume?: string;
    joiningDate?:Date;
    comments?:string;
    candidateStatus?:string;
    hireOrNotHire?:boolean;
    interview ?: Interview;
    documentDetails?: DocumentData;
    joiningAvailability?:string;
    status?:boolean;
    applicationDate?:Date;
    deleteFlag?:string;
    createdBy?:string;
    createdDate?:Date;
    modifiedBy?:string;
    modifiedDate?:Date;
    
}