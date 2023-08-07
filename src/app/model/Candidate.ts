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
    joiningAvailability?:String;
    status?:boolean;
    applicationDate?:Date;
    deleteFlag?:string;
    createBy?:string;
    craeteDate?:Date;
    modifiedBy?:string;
    modifiedDate?:Date;
    
}