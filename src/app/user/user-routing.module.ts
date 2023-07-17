import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateComponent } from './dashboard/candidate/candidate.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { EmployeeComponent } from '../master/employee/employee.component';
import { InterviewComponent } from '../master/interview/interview.component';
import { CandidateListComponent } from './dashboard/candidate-list/candidate-list.component';

const routes: Routes = [ 
  { path: '', component: DashboardComponent,
  children: [
    { path: '', component: CandidateListComponent},{
      path: 'candidate', component: CandidateComponent},{
      path: 'interview', component: InterviewComponent },{
      path: 'employee', component: EmployeeComponent },
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
