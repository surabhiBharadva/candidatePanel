import { InMemoryDbService } from "angular-in-memory-web-api";
import { Candidate } from "../model/Candidate";
import { Employee } from "../model/Employee";
import { Interview } from "../model/Interview";

export class candiddateSer implements InMemoryDbService{
    createDb(){
        const candidate: Candidate[] = [
            
      
          ];
          const employee: Employee[] = [
            
            { id : 1, name: 'bharadva',lname : 'surabhi',email:"asdsddf",jDate:"2023-07-20"},
            { id : 2, name: 'bharadvadf',lname : 'surabhisdf',email:"asdsds",jDate:"2023-07-20"},
            { id : 3, name: 'bharadva df',lname : 'surabhisdf',email:"asdsd",jDate:"2023-07-20"}, 
            { id : 4, name: 'bharadva sf',lname : 'surabhi',email:"asdsddf",jDate:"2023-07-20"},
           
          ];
          const interview: Interview[] = [
            
            {  id : 1,comment :"sdsd",status:"pending",employeeName:"asd",schduleDateTime:"",candidate :{
                id: 1
            } },
            {  id : 2,comment :"sdsd",status:"pending",employeeName:"asd",schduleDateTime:"",candidate :{
                id: 2
            } },
            {  id : 3,comment :"sdsd",status:"pending",employeeName:"asd",schduleDateTime:"",candidate :{
                id: 3
            } },
            
          ];
          return {candidate,employee,interview};
    }
   
}