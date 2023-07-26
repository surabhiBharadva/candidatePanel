import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/service/EmployeeService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList : Employee [] = [];
  constructor( 
    private employeeService :EmployeeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmplyeeList().subscribe(
      data => {
       
        this.employeeList = data;
        console.log(this.employeeList)
      }
    );
  }

}
