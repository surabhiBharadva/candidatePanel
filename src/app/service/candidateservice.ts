import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Candidate } from "../model/Candidate";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class candidateservice {
   
    candidateList : Candidate[] = [];
    constructor(
      
    ) {
       
    }
   
    getCandidate(id: string){
        let candidat: Candidate = {};
        this.candidateList.map(val=>{
          if(val.id == id) candidat = val;
        });
        return this.candidateList;
      }
  
}