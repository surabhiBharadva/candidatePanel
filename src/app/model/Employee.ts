import { Address } from "./Address";
import { EmployeeStatus } from "../enum/EmployeeStatus";

export class Employee {
    id ?:number
    acardNum?:number
    firstName?: string;
    lname?: string;
    email?:string;
    jDate?:string;
    phone?:number;
    dob?: Date;
    country?:string
    state?:string
    city?:string
    adadharcard?:string;
    pancard?:string;
    marksheet?:string;
    status?:EmployeeStatus
}