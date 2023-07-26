import { Candidate } from "./Candidate";
import { StatusEnum } from "./StatusEnum";

export class Interview{
    id?:number;
    comment?: string;
    schduleDateTime?: string;
    status?:StatusEnum;
    employeeName?: string;
    candidate ?: Candidate;
    candidateId?: number;
    feedback?:string;
}