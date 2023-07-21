import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateComponent } from './dashboard/candidate/candidate.component';
import { InterviewComponent } from '../master/interview/interview.component';
import { CandidateListComponent } from './dashboard/candidate-list/candidate-list.component';
import { EmployeeComponent } from '../master/employee/employee.component';

const routes: Routes = [ 
  { path: '', component: DashboardComponent,
  children: [
    { path: '', component: CandidateListComponent},{
      path: 'candidate', component: CandidateComponent},{ 
      path: 'edit/:id', component: CandidateComponent },{
      path: 'interview', component: InterviewComponent },{
      path: 'employee', component: EmployeeComponent },{
      path: 'interview/:id', component: InterviewComponent }
  ] },
  { path : 'candidate',component:CandidateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
