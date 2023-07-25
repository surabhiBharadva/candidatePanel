import { Interview } from "./Interview";
import { PositionEnum } from "./PositionEnum";
import { DocumentData } from "./DocumentData";

export class Candidate{
    id?:number;
    firstName ?: String;
    lname ?: String;
    position?: PositionEnum;
    email ?: String;
    phone ?: String;
    skills ?: String;
    fileUpload?: String;
    jDate?:Date;
    comment?:String;
    status?:String;
    hireOrNotHire?:boolean;
    interview ?: Interview;
    documentDetails?: DocumentData;
}