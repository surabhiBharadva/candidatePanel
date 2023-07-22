import { InMemoryDbService } from "angular-in-memory-web-api";
import { Employee } from "../model/Employee";

export class EmployeeSer implements InMemoryDbService{
    createDb(){
        const employee: Employee[] = [
            
            { id : 1, name: 'bharadva',lname : 'surabhi',email:"asdsddf",jDate:"2023-07-20"},
            { id : 2, name: 'bharadvadf',lname : 'surabhisdf',email:"asdsds",jDate:"2023-07-20"},
            { id : 3, name: 'bharadva df',lname : 'surabhisdf',email:"asdsd",jDate:"2023-07-20"}, 
            { id : 4, name: 'bharadva sf',lname : 'surabhi',email:"asdsddf",jDate:"2023-07-20"},
           
          ];
          return {employee};
    }
   
}