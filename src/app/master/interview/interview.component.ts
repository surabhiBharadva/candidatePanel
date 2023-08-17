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
import { ConfigDataMasterValues } from 'src/app/model/ConfigDataMasterValues';
import { configDataMasterValuesService } from 'src/app/service/configDataMasterValuesService';

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
  configDataMasterValues : ConfigDataMasterValues [] =[];
  constructor(
    private candidateService: candidateservice,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private interviewSevice: Interviewsevice,
    private notification : NotificationService,
    private router: Router,
    
    private configDataMasterValuesService : configDataMasterValuesService
  ) {
  }

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.params['id'];
    this.candidateIdNum = parseInt(this.candidateId);
    this.getInterViewStatus();
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
    if (this.candidateIdNum) {
      this.candidateService.getCadidateById(this.candidateIdNum).subscribe(
        data => {
          debugger
          if (data != null) {
            this.candidateView = true
            this.candidateObject = data
            this.validationClearAdd()
          }
        }
      )
    }
    this.employeeService.getEmplyeeList().subscribe(
      data => {
        debugger
        this.employeesList = data;
      }
    );
    this.interviewSevice.getInterview().subscribe(
      data => {
        if(data){
        this.interviewList = data;
        }
      }
    );
    if (this.candidateIdNum) {
      this.interviewSevice.getInterviewBycandidateId(this.candidateIdNum).subscribe(
        (response: any) => {
          if (response.status.error) {
            this.message = response.status.error
          } else {
            this.interviewObejct = response.body;
            this.interviewRescheduledHistory = response.body2;
            this.interviewId = this?.interviewObejct?.id;
            this.interviewReschdule = true;
          }
        },
        (error: any) => {
          this.message = error.error

        }
      )
    }

    this.formData = this.formBuilder.group({
      candidateId : ['', Validators.required],
      employeeId: ['', Validators.required],
      interviewSlot: ['null', Validators.required],
      interviewStatus:['null', Validators.required],
      feedback: ['',Validators.required],
      
    });
    if (this.candidateIdNum) {
      this.interviewSevice.getInterviewBycandidateId(this.candidateIdNum).subscribe(
        (response: any) => {
          if (response.status.error) {
            this.message = response.status.error
          } else {
            let data = response.body;
           
            this.formData.patchValue({
              interviewStatus: data.interviewStatus,
              employeeId: data.employee?.id,
              interviewSlot: data.interviewSlot,
              feedback: data.feedback
            })
          }
        },
        (error: any) => {
          this.message = error.error

        }
      )
      
    }

    this.validationClear();
  }
  validationClearAdd() {
    this.formData.controls['interviewStatus'].setValidators(null);
    this.formData.controls['interviewStatus'].updateValueAndValidity();
    this.formData.controls['interviewStatus'].clearValidators();
    this.formData.controls['feedback'].setValidators(null);
    this.formData.controls['feedback'].updateValueAndValidity();
    this.formData.controls['feedback'].clearValidators();
    this.formData.controls['candidateId'].setValidators(null);
    this.formData.controls['candidateId'].updateValueAndValidity();
    this.formData.controls['candidateId'].clearValidators();
  }
  getInterViewStatus() {
    this.configDataMasterValuesService.interviewStatus().subscribe(
      (response: any) => {
        if (response.status.error) {
          this.message = response.status.error;
          
        } else {
          
          this.configDataMasterValues = response.body;
        }
      },
      (error: any) => {
        this.message = error.error;
      }
    )
  }
  
  validationClear(){
    debugger
    if(!this.interviewReschdule){
      this.formData.controls['interviewStatus'].setValidators(null);
      this.formData.controls['interviewStatus'].updateValueAndValidity();
      this.formData.controls['interviewStatus'].clearValidators();
      this.formData.controls['feedback'].setValidators(null);
      this.formData.controls['feedback'].updateValueAndValidity();
      this.formData.controls['feedback'].clearValidators();
    }else{
      this.formData.controls['candidateId'].setValidators(null);
      this.formData.controls['candidateId'].updateValueAndValidity();
      this.formData.controls['candidateId'].clearValidators();
    }
  }
  getStatus(){
    return Object.values(StatusEnum).filter((k) => isNaN(Number(k)));
  }
  get f() {
   
    return this.formData.controls;
  }
  onSubmit() {
    debugger
    if (this.formData.valid) {
      

      if (!this.candidateSelect) {
        

        if (this.interviewReschdule) {

          this.interviewSevice.updateInterviewResuchdule(this.candidateIdNum, this.interviewId, this.formData.value, this.formData.get('employeeId')?.value)
            .subscribe(
              (response: any) => {
                debugger
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
 
  
}
