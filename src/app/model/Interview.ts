import { Candidate } from "./Candidate";

export class Interview{
    id?:number;
    comment?: string;
    schduleDateTime?: string;
    status?:string;
    employeeName?: string;
    candidate ?: Candidate
}