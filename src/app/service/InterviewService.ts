import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Interview } from "../model/Interview";

@Injectable({ providedIn: 'root' })
export class Interviewsevice{
  
   
    
    private apiurl = 'http://localhost:8080/api/v1/interview';
    headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    httpOptions = {
        headers: this.headers
    };

    loginData: any;
    flag = false;
    documentList: Document[] = [];
    constructor(
        private httpService: HttpClient
    ) {

    }
    private handleError(error: any) {
        console.error(error);                                       //Created a function to handle and log errors, in case
        return throwError(error);
      }

    addInterview(candidateId : number,interview: Interview,employeeId : number): Observable<Interview> {
        debugger
        const url = `${this.apiurl}/${candidateId}/${employeeId}`;
        return this.httpService.post<Interview>(url, interview, this.httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError))
    }

    getInterview() : Observable<Interview[]>{
        return this.httpService.get<Interview[]>(this.apiurl,this.httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError))
    }


    updateInterview(id: number, interview: Interview): Observable<Interview> {
        const url = `${this.apiurl}/${id}`;
        return this.httpService.put<Interview>(url, interview, this.httpOptions).pipe(tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
    getByIdCandidate(id : number) : Observable<Interview> {
    const url = `${this.apiurl}/${id}`;
    return this.httpService.get<Interview>(url).pipe(
        catchError(this.handleError)
    );

    }

    updateInterviewResuchdule(candidateId: number, interviewId: number, interview : any, employeeId: any) {
        debugger
        const url = `${this.apiurl}/${interviewId}/${candidateId}/${employeeId}`;
        return this.httpService.put<Interview>(url, interview, this.httpOptions).pipe(tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
    getInterviewBycandidateId(candidateId: number) : Observable<Interview> {
        debugger
        const url = "http://localhost:8080/api/v1/interviewGet"
        const seturl = `${url}/${candidateId}`;
        return this.httpService.get<Interview>(seturl).pipe(
            catchError(this.handleError)
        );
      }
    
}