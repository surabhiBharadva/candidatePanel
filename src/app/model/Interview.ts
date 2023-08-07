import { Candidate } from "./Candidate";
import { Employee } from "./Employee";
import { StatusEnum } from "../enum/StatusEnum";

export class Interview{
    id?:number;
    comment?: string;
    schduleDateTime?: string;
    status?:StatusEnum;
    employeeName?: string;
    candidate ?: Candidate;
    candidateId?: number;
    feedback?:string;
    employee?:Employee;
    createBy?:string;
    craeteDate?:Date;
    modifiedBy?:string;
    modifiedDate?:Date;
}