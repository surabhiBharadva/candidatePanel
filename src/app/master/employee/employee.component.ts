import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeStatus } from 'src/app/enum/EmployeeStatus';
import { EmployeeService } from 'src/app/service/EmployeeService';
import { NotificationService } from 'src/app/service/NotificationService';
import { candidateservice } from 'src/app/service/candidateservice';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  formData!: FormGroup;
  loading = false;
  submitted = false;
  id2: any;
  num: number =0 ;
  doc !: FormArray; 
  fileList: File[] = [];
  listOfFiles: any[] = []; 
  file : any;
  enum : any;
 
  employeeStatus = EmployeeStatus;
  employeeStatusList = {};
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService : EmployeeService,
    ) { }

  ngOnInit(): void {

    this.id2 = this.route.snapshot.params['id'];
    this.employeeStatusList = Object.keys(this.employeeStatus);
    this.formData = this.formBuilder.group({
      firstName : ['', Validators.required],
      lname : ['', Validators.required],
      jDate : [''],
      phone : [''],
      email : [''],
      acardNum : [''],
      city:[''],
      state:[''],
      country:[''],
      dob:[''],
      adadharcard:[''],
      pancard:[''],
      marksheet:[''],
      ststus:['']
    })
    if (this.id2) {
      this.loading = true;
      this.num = parseInt(this.id2);
      this.employeeService.getEmployeeById(this.num).subscribe(
        data => {
         this.formData.patchValue(data);
        }
      )
      this.loading = false;
    }

  }

  get f() {
    return this.formData.controls;
  }
 
  onSubmit() {
    if(this.formData.valid){
      this.employeeService.updateEmployee(this.num ,this.formData.value).subscribe(data =>
        console.log(data)
        );
    }
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    this.fileList.push(this.file);
  }
  clearFrom() {
    this.formData.reset();
  }
  close() {
    this.router.navigate(["interviewList"]);
  }

  changeStatus(name : any){
    const name2 = name.target.value;
    const indexOfS = Object.values(EmployeeStatus).indexOf(name2 as unknown as EmployeeStatus);
     this.enum = Object.keys(EmployeeStatus)[indexOfS];
     this.formData.get("status")?.setValue(this.enum);
  }
}
