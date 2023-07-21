import { Interview } from "./Interview";

export class Candidate{
    id?:number;
    position?: string;
    firstName ?: String;
    lname ?: String;
    email ?: String;
    phone ?: String;
    skills ?: string;
    fileUpload?: string;
    jDate?: string;
    comment?: string;
    schduleDateTime?: string;
    status?:string;
    hireOrNotHire?:boolean;
    interview ?: Interview;
}