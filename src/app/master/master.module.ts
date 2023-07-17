import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { EmployeeComponent } from './employee/employee.component';
@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }
