import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LayoutComponent } from '../user/dashboard/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InterviewComponent } from '../master/interview/interview.component';
import { CandidateComponent } from './dashboard/candidate/candidate.component';
import { CandidateListComponent } from './dashboard/candidate-list/candidate-list.component';
@NgModule({
  declarations: [DashboardComponent,CandidateComponent,LayoutComponent,InterviewComponent, CandidateListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
