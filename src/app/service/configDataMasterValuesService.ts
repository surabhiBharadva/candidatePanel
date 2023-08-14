import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ConfigDataMaster } from "../model/ConfigDataMaster";
import { ConfigDataMasterValues } from "../model/ConfigDataMasterValues";

@Injectable({ providedIn: 'root' })
export class configDataMasterValuesService {
 
 
  private url = 'http://localhost:8080/api';
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
  getCandidateStatus(): Observable<ConfigDataMasterValues[]> {

    let url = this.url+"/candidateStatusValue";
    return this.httpService.get<ConfigDataMasterValues[]>(url).pipe(tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  interviewStatus(): Observable<ConfigDataMasterValues[]> {
    let url = this.url+"/interviewStatusValue";
    return this.httpService.get<ConfigDataMasterValues[]>(url).pipe(tap(data => console.log(data)),
      catchError(this.handleError)
    );
  } 
}