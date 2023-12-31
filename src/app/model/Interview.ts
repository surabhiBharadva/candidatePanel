import { Candidate } from "./Candidate";
import { Employee } from "./Employee";
import { StatusEnum } from "../enum/StatusEnum";

export class Interview{
    id?:number;
    comment?: string;
    interviewSlot?: Date;
    interviewStatus?:string;
    candidate ?: Candidate;
    candidateId?: number;
    feedback?:string;
    employee ?: Employee;
    createdBy?:string;
    createdDate?:Date;
    modifiedBy?:string;
    modifiedDate?:Date;
    interviewCount?:number;
}