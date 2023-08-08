import { Interview } from "./Interview";
import { DocumentData } from "./DocumentData";

export class Candidate{
    id?:number;
    firstName ?: string;
    lastName ?: string;
    position?: string;
    email ?: string;
    phoneNo ?: string;
    skills ?: string;
    resume?: string;
    joiningDate?:Date;
    comment?:string;
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