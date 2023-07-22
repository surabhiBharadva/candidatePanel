import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Candidate } from "../model/Candidate";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Interview } from "../model/Interview";

@Injectable({ providedIn: 'root' })
export class candidateservice {
  id : number = 6 ;
  
  apiurl = 'api/candidate';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  loginData: any;
  flag = false;
  candidateList: Candidate[] = [];
  candidateObject: Candidate = {};
  constructor(
    private httpService: HttpClient
  ) {

  }
  private handleError(error: any) {
    console.error(error);                                       //Created a function to handle and log errors, in case
    return throwError(error);
  }

  getCadidateById(id: number) : Observable<Candidate> {
    debugger
    const url = `${this.apiurl}/${id}`;
    return this.httpService.get<Candidate>(url).pipe(
    catchError(this.handleError)
    );
  }
  getById(id2: number) {
    for (let candidat of this.candidateList) {
      if (candidat.id === id2) {
        return this.candidateObject = candidat;;
      }
    }
    return this.candidateObject;
  }

  addCandidadte(candidate: Candidate): Observable<Candidate> {
    candidate.id = this.id++;;
    return this.httpService.post<Candidate>(this.apiurl, candidate, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  getCandidateList(): Observable<Candidate[]> {
    return this.httpService.get<Candidate[]>(this.apiurl).pipe(tap(
      data => this.candidateList = data),
      catchError(this.handleError)
    );
  }
  UpdateCandidate(id:number, candidat : any) :Observable<Candidate>{
    debugger
    const url = `${this.apiurl}/${id}`;
    candidat.id = 1;
    return this.httpService.put<Candidate>(url, candidat, this.httpOptions).pipe(tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  UpdateCandidateList(id:number, candidat : Interview) :Observable<Candidate>{
    debugger
    const url = `${this.apiurl}/${id}`;
    let interview = {
      employeeName : candidat.employeeName,
      schduleDateTime : candidat.schduleDateTime
    }
    candidat.id = 1;
    return this.httpService.put<Candidate>(url, interview, this.httpOptions).pipe(tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
}