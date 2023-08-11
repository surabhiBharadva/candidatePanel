import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/EmployeeService';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: any = [];
  constructor(
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmplyeeList().subscribe(data => {
      this.employeeList = data;
      console.log(this.employeeList)
    }
    );
  }

  open(){
    
  }

}