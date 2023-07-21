import { InMemoryDbService } from "angular-in-memory-web-api";
import { Candidate } from "../model/Candidate";

export class candiddateSer implements InMemoryDbService{
    createDb(){
        const candidate: Candidate[] = [
            
            { id: 1, firstName: 'bharadva',lname : 'surabhi', position : "Anguler Developer",comment: "Pending" },
            { id: 2, firstName: 'Pencil',lname : 'surabhi', position : "Anguler Developer",comment: "Pending" },
            { id: 3, firstName: 'Table' ,lname : 'surabhi', position : "Anguler Developer",comment: "Pending"},
            { id: 4, firstName: 'Chair',lname : 'surabhi', position : "Anguler Developer",comment: "Pending"},
            { id: 5, firstName: 'Bed',lname : 'surabhi', position : "Anguler Developer",comment: "Pending"}
      
          ];
          return {candidate};
    }
   
}