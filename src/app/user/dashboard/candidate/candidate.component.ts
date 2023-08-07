import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validateHeaderName } from 'http';
import { first } from 'rxjs';
import { PositionEnum } from 'src/app/enum/PositionEnum';
import { Candidate } from 'src/app/model/Candidate';
import { CandidateStatusEnum } from 'src/app/enum/CandidateEnum';
import { StatusEnum } from 'src/app/enum/StatusEnum';
import { NotificationService } from 'src/app/service/NotificationService';
import { candidateservice } from 'src/app/service/candidateservice';
import { CandidateAvailabilityEnum } from 'src/app/enum/CandidateAvailabilityEnum';
import { error } from 'console';
import { TranslateService } from '@ngx-translate/core';
@Component({
  
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
 
  keyAvailability = {};
  positionEnum!: PositionEnum;
  formData!: FormGroup;
  
  login: any;
  id: number = 0;
  id2: string = "null";
  selectedStatus!: string;
  num: number = 0;
  title: string = "Add";
  file!: any;
  enum: any;
  selectedUser: any;

  loading = false;
  submitted = false;
  submitting = false;
  updateCandidate = false;
  patch = false;
  selectedPosition: string = '';
  candidateObj: Candidate[] = [];
  candiDateObjet: Candidate = {};
  createBy : string ='admin';
  modifiedBy : string ='admin';
  // todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpClient,
    private candidate: candidateservice,
    private notification: NotificationService) {
  }

  ngOnInit(): void {

    this.id2 = this.route.snapshot.params['id'];
   
    this.formData = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      position: ['', Validators.required],
      email: [null, Validators.required],
      phoneNo : [null, Validators.required],
      skills: [null, Validators.required],
      resume : [null, Validators.required],
      joiningDate: [null, Validators.required],
      comment: [null],
      candidateStatus: ['', Validators.required],
      joiningAvailability: ['', Validators.required]
    });

    // edit mode
    if (this.id2) {
      this.title = "Edit";
      this.loading = true;
      this.num = parseInt(this.id2);
      this.candidate.getCadidateById(this.num).subscribe(
        data => {
          debugger
          this.formData.patchValue({
            firstName: data.firstName,
            lastName: data.lastName ,
            skills: data.skills,
            email: data.email,
            phoneNo: data.phoneNo,
            joiningDate: data.joiningDate,
            comment: data.comment,
            position: this.patchPosition(data.position),
            candidateStatus : this.patchCandidateStatusData(data.candidateStatus),
            joiningAvailability : this.patchValueAvailability(data.joiningAvailability),
            fileUpload : data.resume

          });

        }
      )
      this.loading = false;
      this.updateCandidate = true;
    }
    this.resetAndUpdate();
  }


 

  resetAndUpdate(){
    if(!this.updateCandidate){
      debugger
      this.formData.get('joiningDate')?.updateValueAndValidity();
      this.formData.get('joiningDate')?.clearValidators();
      this.formData.get('candidateStatus')?.updateValueAndValidity();
      this.formData.get('candidateStatus')?.clearValidators();
    }else{
      if(this.selectedStatus != 'Offer-Accepted'){
      this.formData.get('joiningDate')?.updateValueAndValidity();
      this.formData.get('joiningDate')?.clearValidators();
      this.formData.get('fileUpload')?.updateValueAndValidity();
      this.formData.get('fileUpload')?.clearValidators();
      }else{
        this.formData.get('fileUpload')?.updateValueAndValidity();
        this.formData.get('fileUpload')?.clearValidators();
      }
    }
  }
  get f() {
    debugger
   
    return this.formData.controls;

  }
  



  onSubmit() {
    debugger
    if (this.updateCandidate) {

      //update Code 
      this.submitted = true;
      if (this.formData.invalid) {
        return;
      }
      this.submitting = true;
      let value = this.changePosition(this.formData.get("position")?.value);
      this.formData.get("position")?.setValue(value);
      let position = this.changeEmployeeStatus(this.formData.get("candidateStatus")?.value);
      this.formData.get("candidateStatus")?.setValue(position);

      let candidateAvailability = this.changeAvailability(this.formData.get("joiningAvailability")?.value);
      this.formData.get("joiningAvailability")?.setValue(candidateAvailability);

      this.candidate.UpdateCandidate(this.num, this.formData.value).subscribe(
        (response: any) => {
          if (response.status === 'Error') {
            this.notification.error(response.message)
          } else {
            this.notification.success(response.message);
            this.close();
          }
        },
        (error: any) => {
          this.notification.error(error.error)
        }
      )
      this.loading = false;
      this.submitting = false;
      this.submitted = false;

    } else {

      //add here 
      this.submitted = true;
      if (this.formData.invalid) {
        return;
      }
      this.submitting = true;

      let value = this.changePosition(this.formData.get("position")?.value);
      this.formData.get("position")?.setValue(value);

      let candidateAvailability = this.changeAvailability(this.formData.get("joiningAvailability")?.value);
      this.formData.get("joiningAvailability")?.setValue(candidateAvailability);

      this.candidate.addCandidadte(this.formData.value, this.file).subscribe(
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

      this.loading = false;
      this.submitting = false;
      this.submitted = false;
      this.formData.reset();
     
    }

  }


  onChange(event: any) {
    this.file = event.target.files[0];
  }
  clearFrom() {
    if(!this.updateCandidate){
      this.formData.updateValueAndValidity();
      this.formData.clearValidators();
      this.formData.reset();
     
    }else{
      this.candidate.getCadidateById(this.num).subscribe(
        data => {
          debugger
          this.formData.patchValue({
            firstName: data.firstName,
            lastName: data.lastName ,
            skills: data.skills,
            email: data.email,
            phoneNo: data.phoneNo,
            joiningDate: data.joiningDate,
            comment: data.comment,
            position: this.patchPosition(data.position),
            candidateStatus : this.patchCandidateStatusData(data.candidateStatus),
            joiningAvailability : this.patchValueAvailability(data.joiningAvailability),
            fileUpload : data.resume

          });

        }
      )
    }
   
  }
  close() {
    this.router.navigate(["./dashboard/candidateList"]);
  }

  getAvailability(): string[] {
    return Object.values(CandidateAvailabilityEnum).filter((k) => isNaN(Number(k)));
    
  }
  getPosition(): string[] {
    return Object.values(PositionEnum).filter((k) => isNaN(Number(k)));
  }
  getCandidateStatus(): string[] {
    return Object.values(CandidateStatusEnum).filter((k) => isNaN(Number(k)));
  }

  patchValueAvailability(availability: any) {

    const indexOfS = Object.keys(CandidateAvailabilityEnum).indexOf(availability);
    return Object.values(CandidateAvailabilityEnum)[indexOfS];
  }
  patchCandidateStatusData(status: any) {
    const indexOfS = Object.keys(CandidateStatusEnum).indexOf(status);
    return Object.values(CandidateStatusEnum)[indexOfS];
  }
  patchPosition(position: any) {
    const indexOfS = Object.keys(PositionEnum).indexOf(position);
    return Object.values(PositionEnum)[indexOfS];
  }


  changeAvailability(name: any) {
    const indexOfS = Object.values(CandidateAvailabilityEnum).indexOf(name as unknown as CandidateAvailabilityEnum);
     return this.enum = Object.keys(CandidateAvailabilityEnum)[indexOfS];
   }
 
  changePosition(name: any) {
    const indexOfS = Object.values(PositionEnum).indexOf(name as unknown as PositionEnum);
    return this.enum = Object.keys(PositionEnum)[indexOfS];
 
  }
  changeEmployeeStatus(name: any) {
    const indexOfS = Object.values(CandidateStatusEnum).indexOf(name as unknown as CandidateStatusEnum);
    return this.enum = Object.keys(CandidateStatusEnum)[indexOfS];
  }
}


