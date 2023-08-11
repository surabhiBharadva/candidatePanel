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
import { InterviewRescheduledHistoryService } from 'src/app/service/InterviewRescheduledHistoryService';
import { InterviewRescheduledHistory } from 'src/app/model/InterviewRescheduledHistory';

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
  interviewRescheduledHistory?: InterviewRescheduledHistory[] = [];
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
  interviewCounter:number = 0;
  selectedStatus : string = '';
  message : string ='';
  constructor(
    private candidateService: candidateservice,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private interviewSevice: Interviewsevice,
    private notification : NotificationService,
    private router: Router,
    private interviewReschduled : InterviewRescheduledHistoryService
  ) {
  }

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.params['id'];
    this.candidateIdNum = parseInt(this.candidateId);
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
        this.interviewList = data;
      }
    );
  
    if (this.interviewReschduled) {
      if (this.interviewId) {
        this.interviewReschduled.getReScheduleInterviewById(this.interviewId).subscribe(data => {
          this.interviewRescheduledHistory = data;
        })
      }
    }
    if (this.candidateIdNum) {
      this.interviewSevice.getInterviewBycandidateId(this.candidateIdNum).subscribe(data => {
        if (data != null) {
          this.interviewObejct = data;
          this.interviewId = this.interviewObejct.id;
          this.interviewReschdule = true;
        }
      })
    }
    this.formData = this.formBuilder.group({
      candidateId : ['null', Validators.required],
      employeeId: ['null', Validators.required],
      schduleDateTime: ['null', Validators.required],
      status:['null', Validators.required],
      feedback: ['',Validators.required],
      
    });
    if (this.candidateIdNum) {
      this.interviewSevice.getInterviewBycandidateId(this.candidateIdNum).subscribe(data => {
        debugger
        if (data != null) {
          debugger
          this.formData.patchValue({
            status : this.patchStatus(data.status),
            employeeId : data.employee?.id,
            schduleDateTime : data.schduleDateTime,
            feedback : data.feedback
          })
        }
      })
    }
    
    this.validationClear();
  }
  validationClear(){
    if(!this.candidateSelect){
      this.formData.get('candidateId')?.setValidators(null);
      this.formData.get('candidateId')?.updateValueAndValidity();
      this.formData.get('candidateId')?.clearValidators();
    }
    if(!this.interviewReschdule){
      this.formData.get('status')?.setValidators(null);
      this.formData.get('status')?.updateValueAndValidity();
      this.formData.get('status')?.clearValidators();
      this.formData.get('feedback')?.setValidators(null);
      this.formData.get('feedback')?.updateValueAndValidity();
      this.formData.get('feedback')?.clearValidators();
    }
  }
  getStatus(){
    return Object.values(StatusEnum).filter((k) => isNaN(Number(k)));
  }
  get f() {
   
    return this.formData.controls;
  }
  onSubmit() {
    if (this.formData.valid) {

      if (!this.candidateSelect) {
        if (this.interviewReschdule) {

          let status = this.changeStatus(this.formData.get("status")?.value);
          this.formData.get("status")?.setValue(status);

          this.interviewSevice.updateInterviewResuchdule(this.candidateIdNum, this.interviewId, this.formData.value, this.formData.get('employeeId')?.value)
            .subscribe(
              (response: any) => {
                if (response.status.error) {
                  this.message = response.status.error
                 
                } else {
                  this.message = response.message
                  
                }
              },
              (error: any) => {
                this.message = error.error
                
              }
            )


        } else {

          this.interviewSevice.addInterview(this.candidateIdNum, this.formData.value, this.formData.get('employeeId')?.value)
            .subscribe(
              (response: any) => {
                if (response.status.error) {
                  this.message = response.status.error
                } else {
                  this.message = response.message
                  
                }
              },
              (error: any) => {
                this.message = error.error
              
              }
            )
        }
      } else {
        this.interviewSevice.addInterview(this.formData.get('candidateId')?.value, this.formData.value, this.formData.get('employeeId')?.value)
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
    }
  }
  changeStatus(status : any){
    const indexOfS = Object.values(StatusEnum).indexOf(status as unknown as StatusEnum);
    return this.enum = Object.keys(StatusEnum)[indexOfS];
  }
  patchPosition(position: any) {
    const indexOfS = Object.keys(PositionEnum).indexOf(position);
    return Object.values(PositionEnum)[indexOfS];
  }
  close() {
    this.router.navigate(["./dashboard/interviewList"]);
  }

  clearFrom() {
    this.formData.reset();
  }
  patchStatus(status : any){
    const indexOfS = Object.keys(StatusEnum).indexOf(status);
    return Object.values(StatusEnum)[indexOfS];
  }

  getValue(id: any) {
    const indexOfS = Object.keys(StatusEnum).indexOf(id);
    return Object.values(StatusEnum)[indexOfS];
  }
  getInetviewStatus(name: any) {
    const indexOfS = Object.keys(StatusEnum).indexOf(name);
    let status = Object.values(StatusEnum)[indexOfS];
    if (status === "Interview-Scheduled") {
      return "Scheduled";
    } else if (status === "Interview-Selected") {
      return "Selected";
    } else if (status === "Interview-Rejected") {
      return "Rejected"
    } else if (status === "Interview-Rescheduled") {
      return "Resuchduled";
    } else if (status === "Interview-Cancelled") {
      return "Cancelled"
    }

    return;
  }
}
