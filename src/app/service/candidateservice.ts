import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Candidate } from "../model/Candidate";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class candidateservice {
   loginData : any ;
    flag = false;
    candidateList : Candidate[] = [];
    constructor(
      private httpService : HttpClient
    ) {
       
    }
   
    login(value : string , value2 : string){
      this.httpService.get('./assets/login.json').subscribe({ 
        next: data => {
            this.loginData = data as string [];	          
         }})
         if(this.loginData){
            for(let check of this.loginData){
              if((check.email === value) && 
                 (check.password === value2)){
               //  this.router.navigate(["./dashboard/"]);
                 this.flag = true
              }
            }
          }
        }

    getCandidate(id: string){
        let candidat: Candidate = {};
        this.candidateList.map(val=>{
          if(val.id == id) candidat = val;
        });
        return this.candidateList;
      }
  
}