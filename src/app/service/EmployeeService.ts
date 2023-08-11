import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Employee } from "../model/Employee";

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private apiurl = 'http://localhost:8080/api/v1/employee';
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

  addEmployee(employee: any, file: any): Observable<Employee> {
    const fileData = new FormData();
    if (file) {
      fileData.append("employee", JSON.stringify(employee))
      fileData.append("files", file)
    }
    return this.httpService.post<Employee>(this.apiurl + "/save", employee, this.httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError))
  }

  getEmployeeById(id: number) {
    const url = `${this.apiurl}/getById/${id}`;
    return this.httpService.get<Employee>(url).pipe(
      catchError(this.handleError)
    );
  }


  getEmplyeeList(): Observable<Employee[]> {
    return this.httpService.get<Employee[]>(this.apiurl+"/getAll").pipe(tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }


  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const url = `${this.apiurl}/getById/${id}`;
    return this.httpService.put<Employee>(url, employee, this.httpOptions).pipe(tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }


}