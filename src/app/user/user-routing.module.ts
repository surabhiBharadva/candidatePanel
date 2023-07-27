import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateComponent } from './dashboard/candidate/candidate.component';
import { InterviewComponent } from '../master/interview/interview.component';
import { CandidateListComponent } from './dashboard/candidate-list/candidate-list.component';
import { EmployeeComponent } from '../master/employee/employee.component';
import { InterviewStatusUpdateComponent } from '../master/interview-status-update/interview-status-update.component';
import { EmployeeListComponent } from '../master/employee-list/employee-list.component';
const routes: Routes = [ 
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: CandidateListComponent },
      { path: '', component: EmployeeListComponent },
      { path: 'candidate', component: CandidateComponent },
      { path: 'edit/:id', component: CandidateComponent },
      { path: 'interview', component: InterviewComponent },
      { path: 'employeeEdit/:id', component: EmployeeComponent}, 
      { path: 'interview/:id', component: InterviewComponent  }, 
      { path: 'employeeList', component: EmployeeListComponent
        , children: [
          { path: 'employeeUpdate/:id', component: EmployeeComponent }
        ]
      }, 
      { path: 'employeeUpdate/:id', component: EmployeeComponent},
      { 
        path: 'interviewUpdate/:id', component: InterviewStatusUpdateComponent}
    ]
  },
  
  { path: 'employee', component: EmployeeComponent },
  { path: 'candidate', component: CandidateComponent },
  { path : 'interviewUpdate/:id' , component : InterviewStatusUpdateComponent},
  { path: 'employeeUpdate/:id', component: EmployeeComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
