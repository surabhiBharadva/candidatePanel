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
  
  private url = 'http://localhost:8080/api/v1/candidate';
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
    const url = `${this.url}/${id}`;
    return this.httpService.get<Candidate>(url).pipe(
    catchError(this.handleError)
    );
  }

  addCandidadte(candidate: Candidate): Observable<Candidate> {
    debugger
    return this.httpService.post<Candidate>(`${this.url}`, candidate).pipe(tap(data => console.log(data)),
    catchError(this.handleError)
    )
  }
  getCandidateList(): Observable<Candidate[]> {
    return this.httpService.get<Candidate[]>(this.url + "/getCandidate").pipe(tap(
      data => this.candidateList = data),
      catchError(this.handleError)
    );
  }
  UpdateCandidate(id:number, candidat : any) :Observable<Candidate>{
    debugger
    const url = `${this.url}/${id}`;
    candidat.id = 1;
    return this.httpService.put<Candidate>(url, candidat, this.httpOptions).pipe(tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  UpdateCandidateList(id:number, interview : Interview) :Observable<Candidate>{
    debugger
    const url = `${this.url}/${id}`;
    interview.id = 1;
    this.getCadidateById(id).subscribe(data => this.candidateObject = data);
    let interviewObj = {
      "id" : 1,
      "interview" : {
        "id" : interview.id,
        "schduleDateTime" : interview.schduleDateTime,
        "employeeName" : interview.employeeName
      }
    }
    return this.httpService.put<Candidate>(url, interviewObj, this.httpOptions).pipe(tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
}