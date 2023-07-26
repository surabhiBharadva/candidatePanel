import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpClient,
    private candidate: candidateservice,
    private employeeService : EmployeeService,
    private notification: NotificationService) { }

  ngOnInit(): void {

    this.id2 = this.route.snapshot.params['id'];
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
      marksheet:['']
    })
    if (this.id2) {
      this.loading = true;
      this.num = parseInt(this.id2);
      this.candidate.getCadidateById(this.num).subscribe(
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
      debugger
      this.employeeService.addEmployee(this.formData.value,this.fileList).subscribe(data =>
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
    this.router.navigate(["./dashboard/"]);
  }
}
