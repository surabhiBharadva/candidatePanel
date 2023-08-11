import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateComponent } from './dashboard/candidate/candidate.component';
import { InterviewComponent } from '../master/interview/interview.component';
import { CandidateListComponent } from './dashboard/candidate-list/candidate-list.component';
import { EmployeeComponent } from '../master/employee/employee.component';
import { EmployeeListComponent } from '../master/employee-list/employee-list.component';
import { CandidateViewComponent } from './dashboard/candidate-view/candidate-view.component';
import { InterviewListComponent } from '../master/interview-list/interview-list.component';
import { TimeSheetComponent } from '../time-sheet/time-sheet.component';

const routes: Routes = [ 
  {
    path: '', component: DashboardComponent,
    children: [
      
      { path: 'candidateList', component: CandidateListComponent },
      { path: 'timeSheet', component: TimeSheetComponent },
      { path: 'candidate', component: CandidateComponent },
      { path: 'edit/:id', component: CandidateComponent },
      { path: 'interview', component: InterviewComponent },
      { path: 'view/:candidate', component: CandidateViewComponent },
      { path: 'employeeEdit/:id', component: EmployeeComponent}, 
      { path: 'interview/:id', component: InterviewComponent  }, 
      { path: 'employeeList', component: EmployeeListComponent
        , children: [
          { path: 'employeeUpdate/:id', component: EmployeeComponent }
        ]
      }, 
      { path: 'employeeUpdate/:id', component: EmployeeComponent},
     
      { path: 'interviewList', component: InterviewListComponent},
      { path: 'interviewUpdate', component: InterviewComponent },
      { path: 'employee', component: EmployeeComponent },
    ]
  },
  
  { path: 'interviewList', component: InterviewListComponent},
  { path: 'interviewUpdate', component: InterviewComponent },
  
  { path: 'candidate', component: CandidateComponent },
  { path: 'employeeUpdate/:id', component: EmployeeComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
