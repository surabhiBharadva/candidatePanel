import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { InterviewRescheduledHistory } from "../model/InterviewRescheduledHistory";

@Injectable({ providedIn: 'root' })
export class InterviewRescheduledHistoryService{
    private apiurl = 'http://localhost:8080/api/v1/interviewReschedule';
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

    getInterview(): Observable<InterviewRescheduledHistory[]> {

        return this.httpService.get<InterviewRescheduledHistory[]>(this.apiurl, this.httpOptions).pipe(tap((data: any) => console.log(data)), catchError(this.handleError))
    }
    getReScheduleInterviewById(interviewId: number): Observable<InterviewRescheduledHistory[]> {
        const url = `${this.apiurl}/${interviewId}`;
        return this.httpService.get<InterviewRescheduledHistory[]>(url).pipe(
            catchError(this.handleError)
        );

    }

}