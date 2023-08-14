import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Candidate } from "../model/Candidate";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Interview } from "../model/Interview";

@Injectable({ providedIn: 'root' })
export class candidateservice {
  

  id : number = 6 ;
  
  private url = 'http://localhost:8080/api/candidate';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  loginData: any;
  flag = false;
  candidateList: Candidate[] = [];
  candidateListInterView : Candidate[] = [];
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
  getCadidateByIdView(id: number)  : Observable<Candidate> {
    const url = `${this.url+"/candidateview"}/${id}`;
    return this.httpService.get<Candidate>(url).pipe(
    catchError(this.handleError)
    );
  }
  addCandidadte(candidate: any, file: any): Observable<Candidate> {
    const fileData = new FormData();
    if (file) {
      fileData.append("candidate", JSON.stringify(candidate))
      fileData.append("file", file)
    }
    return this.httpService.post<Candidate>(`${this.url}`, fileData).pipe(tap(data => console.log(data))
    )
  }
  getCandidateList(): Observable<Candidate[]> {
    return this.httpService.get<Candidate[]>(this.url).pipe(tap(
      data => this.candidateList = data),
      catchError(this.handleError)
    );
  }
  
 
  getCandidatePendingInterview() : Observable<Candidate[]> {
      let url = this.url+"/candidateList";
      return this.httpService.get<Candidate[]>(url).pipe(tap(
        data => this.candidateListInterView = data),
        catchError(this.handleError)
      );
    }
    downloadFile(fileName: string): Observable<any> {
      return this.httpService.get("http://localhost:8080/api/candidate/download/" + fileName, { observe: 'response', responseType: 'blob' });
    }
}