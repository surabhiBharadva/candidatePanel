import { Candidate } from "./Candidate";
import { Employee } from "./Employee";
import { StatusEnum } from "../enum/StatusEnum";

export class Interview{
    id?:number;
    comment?: string;
    schduleDateTime?: string;
    status?:StatusEnum;
    candidate ?: Candidate;
    candidateId?: number;
    feedback?:string;
    employee?:Employee;
    createdBy?:string;
    createdDate?:Date;
    modifiedBy?:string;
    modifiedDate?:Date;
}