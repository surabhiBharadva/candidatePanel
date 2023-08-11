import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http: HttpClient) { }

  save(body: any) {
    return this.http.post('http://localhost:8080/timesheet/addOrUpdate', body)
  }
  
  getProjects() {
    return this.http.get('http://localhost:8080/project/getProduct'); // Adjust the URL
  }

  getTasksByProjectId(projectId: number) {
    return this.http.get<any[]>('http://localhost:8080/task/getTasks/' + projectId);
  }

  getlastSyncDate(employeeId:number){
    return this.http.get<any[]>('http://localhost:8080/timesheet/getLastSyncDate/' + employeeId);
  }
}