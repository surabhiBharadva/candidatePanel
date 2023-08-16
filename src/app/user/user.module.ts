import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InterviewComponent } from '../master/interview/interview.component';
import { CandidateComponent } from './dashboard/candidate/candidate.component';
import { CandidateListComponent } from './dashboard/candidate-list/candidate-list.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { EmployeeComponent } from '../master/employee/employee.component';
import { EmployeeListComponent } from '../master/employee-list/employee-list.component';
import { CandidateViewComponent } from './dashboard/candidate-view/candidate-view.component';
import { InterviewListComponent } from '../master/interview-list/interview-list.component';
import { TimeSheetComponent } from '../time-sheet/time-sheet.component';

@NgModule({
    declarations: [EmployeeComponent, InterviewListComponent ,EmployeeListComponent, 
      DashboardComponent, CandidateComponent, InterviewComponent, CandidateListComponent, 
      HeaderComponent, FooterComponent, CandidateViewComponent,
    TimeSheetComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    
  ]
})
export class UserModule { }
