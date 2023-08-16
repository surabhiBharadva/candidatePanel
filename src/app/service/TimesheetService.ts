import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  backendUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }
  private handleError(error: any) {
    console.error(error);                                       //Created a function to handle and log errors, in case
    return throwError(error);
  }
  save(body: any) {
    return this.http.post('http://localhost:8080/timesheet/add-or-update', body)
  }
  
  getProjects() {
    return this.http.get('http://localhost:8080/project/getProject'); // Adjust the URL
  }

  getTasksByProjectId(projectId: number) {
    return this.http.get<any[]>('http://localhost:8080/task/getTasks/' + projectId);
  }

  getlastSyncDate(employeeId:number){
    return this.http.get<any[]>(`${this.backendUrl}/timesheet/get-last-sync-date/` + employeeId);
  }

  // getWeekData(employeeId:number){
  //   return this.http.get<any[]>(`${this.backendUrl}/timesheet/get-week/` + employeeId).subscribe(
  //     (data: any) => {
  //       console.log(data)
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }


   getWeekData(employeeId:number,s:Date,e:Date){
    // const queryString = `employeeId=${employeeId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    const params = new HttpParams()
      .set('startDate', s.toISOString())
      .set('endDate', e.toISOString());
    const url = `${this.backendUrl}/timesheet/get-week-hours/${employeeId}`;
    console.log(url);
    return this.http.get(url, { params });
  } 
}