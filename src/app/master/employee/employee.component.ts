import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeStatus } from 'src/app/enum/EmployeeStatus';
import { EmployeeService } from 'src/app/service/EmployeeService';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  title = "Add Employee";
  empForm!: FormGroup;
  loading = false;
  id2: any;
  num: number = 0;
  fileList: File[] = [];
  file: any;
  enum: any;

  employeeStatus = EmployeeStatus;
  employeeStatusList = {};

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {

    this.id2 = this.route.snapshot.params['id'];
    this.employeeStatusList = Object.keys(this.employeeStatus);

    this.empForm = this.formBuilder.group({

      employeeId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: [''],
      email: [''],
      aadharCardNumber: [''],
      dateofBirth: [''],

      organizationDetails: this.formBuilder.group({
        employeeId: [''],
        reportingPerson: [''],
        designation: [''],
        role: [''],
        joiningDate: [''],
        joiningStatus: [''],
        companyEmail: [''],
        companyUserLogin: ['']
      }),

      educationDetails: this.formBuilder.group({
        universityName: [''],
        courseName: [''],
        branch: [''],
        CGPAOrPercentage: [''],
        marksheetFile: ['']
      }),

      workExperienceDetails: this.formBuilder.group({
        companyName: [''],
        yearsOfExperience: [''],
        designation: [''],
        description: [''],
        relievingLetter: ['']
      }),

      address: this.formBuilder.group({
        areaAndStreet: [''],
        city: [''],
        state: [''],
        pinCode: [''],
        addressType: ['']
      }),


    })

    if (this.id2) {
      this.loading = true;
      this.num = parseInt(this.id2);
      this.employeeService.getEmployeeById(this.num).subscribe(
        data => {
          this.empForm.patchValue(data);
        }
      )
      this.loading = false;
    }

  }

  get f() {
    return this.empForm.controls;
  }

  onSubmit() {
    if (this.empForm.valid) {
      this.employeeService.updateEmployee(this.num, this.empForm.value).subscribe(data =>
        console.log(data)
      );
    }
  }
  // onChange(event: any) {
  //   this.file = event.target.files[0];
  //   this.fileList.push(this.file);
  // }

  onFileChange(event: any) {
    console.log(event);
    this.file.push(event.target.files[0])
  }

  clearFrom() {
    this.empForm.reset();
  }
  close() {
    window.history.back();
  }

  changeStatus(name: any) {
    const name2 = name.target.value;
    const indexOfS = Object.values(EmployeeStatus).indexOf(name2 as unknown as EmployeeStatus);
    this.enum = Object.keys(EmployeeStatus)[indexOfS];
    this.empForm.get("status")?.setValue(this.enum);
  }

}