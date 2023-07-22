import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Employee } from "../model/Employee";

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    id: number = 6;
    apiurl = "api/employee";
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
    getEmplyeeList(): Observable<Employee[]> {
        return this.httpService.get<Employee[]>(this.apiurl).pipe(tap(data => console.log(data)),
          catchError(this.handleError)
        );
      }
    
}