import { Candidate } from "./Candidate";
import { Employee } from "./Employee";
import { Interview } from "./Interview";

export class InterviewRescheduledHistory{
    id?:number;
	interviewSlot?: Date;
    interviewStatus?:string;
	feedback?:string;
	candidate ?:Candidate;
	employee?: Employee;
	interview ?: Interview
	interviewCount?:number;;
	createdDate?:Date;
	createdBy?:string;
	modifiedDate?:Date;
	modifiedBy?:string;
	deleteFlag?:string;
}