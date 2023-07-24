import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Interview } from "../model/Interview";

@Injectable({ providedIn: 'root' })
export class Interviewsevice{
    id: number = 6;
    apiurl = "api/interview";
    headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    httpOptions = {
        headers: this.headers
    };
    constructor(
        private httpService: HttpClient
    ) {

    }
    private handleError(error: any) {
        console.error(error);                                       //Created a function to handle and log errors, in case
        return throwError(error);
    }
    AddInterview(interview: Interview): Observable<Interview> {
        interview.id = this.id++;
        return this.httpService.post<Interview>(this.apiurl, interview, this.httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError))
    }
    UpdateCandidate(id:number, interview : Interview) :Observable<Interview>{
       debugger
        const url = `${this.apiurl}/${id}`;
        interview.id = 1;
        return this.httpService.put<Interview>(url, interview, this.httpOptions).pipe(tap(data => console.log(data)),
          catchError(this.handleError)
        );
      }
}