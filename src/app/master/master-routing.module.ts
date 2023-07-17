import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from '../user/dashboard/candidate/candidate.component';
import { LayoutComponent } from '../user/dashboard/layout/layout.component';

const routes: Routes = [ 
  
  {  path: '', component: LayoutComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
