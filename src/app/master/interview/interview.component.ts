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
import { PositionEnum } from 'src/app/enum/PositionEnum';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  formData!: FormGroup;
  loading = false;
  submitted = false;
  employeesList?: Employee[] = []
  candidateList?: Candidate[] = [];
  interviewList?: Interview[] = [];
  candidateObject?: Candidate = {};
  interviewObejct?: Interview = {};
  todayDate = new Date();
  candidateId: string = "null";
  candidateIdNum  : number = 0;
  enum: any;
  id: number = 0;
  mymodel : any;
  candidateSelect = false;
  candidateView =false
  interviewSchedule = false;
  interviewReschdule = false;
  interviewId : any;
  constructor(
    private candidateService: candidateservice,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private interviewSevice: Interviewsevice,
    private notification : NotificationService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.params['id'];
    this.candidateIdNum = parseInt(this.candidateId);
    debugger
    if(!this.candidateId){
    this.candidateService.getCandidatePendingInterview().subscribe(
      data => {
        if (data != null) {
          this.candidateSelect = true
          this.candidateList = data;
        }
      }  
    )
    }
    this.candidateService.getCadidateById(this.candidateIdNum).subscribe(
      data => {
        if (data != null) {
          this.candidateView = true
          this.candidateObject = data
        }
      }
    )
    this.employeeService.getEmplyeeList().subscribe(
      data => {
        this.employeesList = data;
      }
    );
    this.interviewSevice.getInterview().subscribe(
      data => {
        debugger
        this.interviewList = data;
      }
    );
   if(this.candidateIdNum){
    debugger
    this.interviewSevice.getInterviewBycandidateId(this.candidateIdNum).subscribe(data =>{
      debugger
      if(data != null){
      this.interviewObejct = data;
      this.interviewId = this.interviewObejct.id;
      this.interviewReschdule = true;
      }
    })
   }
    this.formData = this.formBuilder.group({
      candidateId : ['', Validators.required],
      employeeId: ['', Validators.required],
      schduleDateTime: ['null', Validators.required],
      status:['null']
    });
    this.validationClear();
  }
  validationClear(){
    if(!this.candidateSelect){
      this.formData.get('candidateId')?.setValidators(null);
      this.formData.get('candidateId')?.updateValueAndValidity();
      this.formData.get('candidateId')?.clearValidators();
    }
  }
  get f() {
   
    return this.formData.controls;
  }
  onSubmit() {
    debugger
    if (this.formData.valid) {
      debugger

      if (!this.candidateSelect) {
        debugger
        if (this.interviewReschdule) {
          this.interviewSevice.updateInterviewResuchdule(this.candidateIdNum,this.interviewId, this.formData.value, this.formData.get('employeeId')?.value)
          .subscribe(
            (response: any) => {
              if (response.status.error) {
                this.notification.error(response.status.error)
              } else {
                this.notification.success(response.message);
              }
            },
            (error: any) => {
              this.notification.error(error.error)
            }
          )
        } else {

          this.interviewSevice.addInterview(this.candidateIdNum, this.formData.value, this.formData.get('employeeId')?.value)
            .subscribe(
              (response: any) => {
                if (response.status.error) {
                  this.notification.error(response.status.error)
                } else {
                  this.notification.success(response.message);
                }
              },
              (error: any) => {
                this.notification.error(error.error)
              }
            )
        }
    }else{
      this.interviewSevice.addInterview(this.formData.get('candidateId')?.value,this.formData.value,this.formData.get('employeeId')?.value)
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
  }
  patchPosition(position: any) {
    const indexOfS = Object.keys(PositionEnum).indexOf(position);
    return Object.values(PositionEnum)[indexOfS];
  }
  close(){
    this.router.navigate(["./dashboard/interviewList"]);
  }

  clearFrom() {
    this.formData.reset();
  }

  getValue(id : any){
    const indexOfS = Object.keys(StatusEnum).indexOf(id);
    return Object.values(StatusEnum)[indexOfS];
  }

}
