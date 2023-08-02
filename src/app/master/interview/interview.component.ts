import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/model/Candidate';
import { Employee } from 'src/app/model/Employee';
import { Interview } from 'src/app/model/Interview';
import { StatusEnum } from 'src/app/enum/StatusEnum';
import { EmployeeService } from 'src/app/service/EmployeeService';
import { Interviewsevice } from 'src/app/service/InterviewService';
import { candidateservice } from 'src/app/service/candidateservice';
import { NotificationService } from 'src/app/service/NotificationService';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  formData!: FormGroup;
  loading = false;
  submitted = false;
  employees?: Employee[] = []
  candidate?: Candidate[] = [];
  interviewList?: Interview[] = [];
  candidateObject?: Candidate = {};
  todayDate = new Date();
  candidateId: string = "null";
  candidateIdNum  : number = 0;
  enum: any;
  id: number = 0;
  mymodel : any;
  candidateSelect = false;
  
  constructor(
    private candidateService: candidateservice,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private interviewSevice: Interviewsevice,
    private notification : NotificationService
  ) {
  }

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.params['id'];
    this.candidateIdNum = parseInt(this.candidateId);
    debugger
    if(!this.candidateId){
    this.candidateService.getCandidatePendingInterview().subscribe(
      data => {
        debugger
       this.candidateSelect = true
        this.candidate = data;
      }  
    )
    }
    this.candidateService.getCadidateById(this.candidateIdNum).subscribe(
      data => {
       this.candidateObject = data
      }
    )
    this.employeeService.getEmplyeeList().subscribe(
      data => {
        this.employees = data;
      }
    );
    this.interviewSevice.getInterview().subscribe(
      data => {
        debugger
        this.interviewList = data;
      }
    );
    this.formData = this.formBuilder.group({
      employeeId: ['null', Validators.required],
      schduleDateTime: ['null', Validators.required],
      status : ['']
    });
  }
  get f() {
    return this.formData.controls;
  }
  onSubmit() {
    if (this.formData.valid) {
      debugger
      const indexOfS = Object.values(StatusEnum).indexOf(StatusEnum.scheduled as unknown as StatusEnum);
      this.enum = Object.keys(StatusEnum)[indexOfS];
      this.formData.get("status")?.setValue(this.enum);
      this.interviewSevice.addInterview(this.candidateIdNum,this.formData.value,this.formData.get('employeeId')?.value)
      .subscribe(
        (response: any) => {
          if(response.status.error){
            this.notification.error(response.status.error)
          }else{
          this.notification.success(response.message);
          }
        },
        (error: any) => {
          this.notification.error(error.error)
        }
      )

    }
  }

  

  clearFrom() {
    this.formData.reset();
  }

  getValue(id : any){
    const indexOfS = Object.keys(StatusEnum).indexOf(id);
    return Object.values(StatusEnum)[indexOfS];
  }

}
