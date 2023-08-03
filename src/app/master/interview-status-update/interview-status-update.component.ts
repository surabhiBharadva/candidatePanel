import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusEnum } from 'src/app/enum/StatusEnum';
import { Candidate } from 'src/app/model/Candidate';
import { Interviewsevice } from 'src/app/service/InterviewService';
import { NotificationService } from 'src/app/service/NotificationService';

@Component({
  selector: 'app-interview-status-update',
  templateUrl: './interview-status-update.component.html',
  styleUrls: ['./interview-status-update.component.css']
})
export class InterviewStatusUpdateComponent implements OnInit {
  id : any;
  statusEnum = StatusEnum;
  interviewStatus = {};
  formData!: FormGroup;
  loading = false;
  submitted = false;
  enum: string = "null";
  interviewId :number = 0;
  candidateObject?: Candidate = {};

  constructor(private route: ActivatedRoute,private router: Router,private interviewSevice : Interviewsevice,private formBuilder: FormBuilder,
   private notification : NotificationService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.interviewStatus = Object.keys(this.statusEnum)
    this.interviewId = parseInt(this.id) 
    this.formData = this.formBuilder.group({
      feedback: [''],
      status : ['null',Validators.required]
    });
    this.interviewSevice.getByIdCandidate(this.interviewId).subscribe(
      data => {
        this.candidateObject = data.candidate;
       this.formData.patchValue({
        status : this.patchStatus(data.status)
       })
      }
    )
  }
  patchStatus(status : any){
    const indexOfS = Object.keys(StatusEnum).indexOf(status);
    return Object.values(StatusEnum)[indexOfS];
  }
  onSubmit() {
    if (this.formData.valid) {
      let candidateAvailability = this.changeStatus(this.formData.get("status")?.value);
      this.formData.get("status")?.setValue(candidateAvailability);

      this.interviewSevice.updateInterview(this.interviewId, this.formData.value).subscribe((response: any) => {
        if (response.status.error) {
          this.notification.error(response.status.error)
        } else {
          this.notification.success(response.message);
          this.close();
        }
      },
        (error: any) => {
          this.notification.error(error.error)
        })

    }
  }
  changeStatus(status : any){
    const indexOfS = Object.values(StatusEnum).indexOf(status as unknown as StatusEnum);
    return this.enum = Object.keys(StatusEnum)[indexOfS];
  }
  get f() {
    return this.formData.controls;
  }
  getStatus(){
    return Object.values(StatusEnum).filter((k) => isNaN(Number(k)));
  }

  clearFrom() {
    this.formData.reset();
  }
  close() {
    this.router.navigate(["./dashboard/"]);
  }
}
