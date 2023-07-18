import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InterviewComponent } from '../master/interview/interview.component';
import { CandidateComponent } from './dashboard/candidate/candidate.component';
import { CandidateListComponent } from './dashboard/candidate-list/candidate-list.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
@NgModule({
  declarations: [DashboardComponent,CandidateComponent,InterviewComponent, CandidateListComponent,HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
