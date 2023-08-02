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
  positionEnum = PositionEnum;
  candidateStatus = CandidateStatusEnum;
  cadidateAvailability = CandidateAvailabilityEnum;

  keyAvailability = {};
 
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
 
  selectedPosition: string = '';
  candidateObj: Candidate[] = [];
  candiDateObjet: Candidate = {};
 
  // todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpClient,
    private candidate: candidateservice,
    private notification: NotificationService,public translateService: TranslateService) {
  }

  ngOnInit(): void {

    this.id2 = this.route.snapshot.params['id'];
   
    this.keyAvailability = Object.keys(this.cadidateAvailability)
    this.formData = this.formBuilder.group({
      candidateName: [null, Validators.required],
      position: ['', Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      skills: [null, Validators.required],
      fileUpload: [null, Validators.required],
      jDate: [null],
      comment: [null],
      candidateStatus: [''],
      candidateAvailability: ['', Validators.required]
    });

    // edit mode
    if (this.id2) {
      this.title = "Edit";
      this.loading = true;
      this.num = parseInt(this.id2);
      this.candidate.getCadidateById(this.num).subscribe(
        data => {
          this.formData.patchValue({
            
            candidateName: data.candidateName,
            skills: data.skills,
            email: data.email,
            phone: data.phone,
            jDate: data.jDate,
            comment: data.comment,
            position: this.patchPosition(data.position),
            candidateStatus : this.patchCandidateStatusData(data.candidateStatus),
            candidateAvailability : this.patchValueAvailability(data.candidateAvailability)
          });

        }
      )
      this.loading = false;
      this.updateCandidate = true;
    }
  }


  patchValueAvailability(status : any){
    const indexOfS = Object.keys(CandidateAvailabilityEnum).indexOf(status);
    return Object.values(CandidateAvailabilityEnum)[indexOfS];
  }
  patchCandidateStatusData(status : any){
    const indexOfS = Object.keys(CandidateStatusEnum).indexOf(status);
    return Object.values(CandidateStatusEnum)[indexOfS];
  }
  patchPosition(position: any) {
    const indexOfS = Object.keys(PositionEnum).indexOf(position);
    return Object.values(PositionEnum)[indexOfS];
  }


  get f() {
    return this.formData.controls;
  }
  get position() {
    return this.formData.get("position");
  }



  onSubmit() {
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

      let candidateAvailability = this.changeAvailability(this.formData.get("candidateAvailability")?.value);
      this.formData.get("candidateAvailability")?.setValue(candidateAvailability);


      this.candidate.UpdateCandidate(this.num, this.formData.value).subscribe(
        (response: any) => {
          if(response.status === 'Error'){
            this.notification.error(response.message)
          }else{
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

    } else {

      //add here 
      this.submitted = true;
      if (this.formData.invalid) {
        return;
      }
      this.submitting = true;

      let value = this.changePosition(this.formData.get("position")?.value);
      this.formData.get("position")?.setValue(value)

      let candidateAvailability = this.changeAvailability(this.formData.get("candidateAvailability")?.value);
      this.formData.get("candidateAvailability")?.setValue(candidateAvailability)


      const indexOfS = Object.values(CandidateStatusEnum).indexOf(CandidateStatusEnum.PENDING as unknown as CandidateStatusEnum);
      this.enum = Object.keys(CandidateStatusEnum)[indexOfS];
      this.formData.get("candidateStatus")?.setValue(this.enum);
      this.candidate.addCandidadte(this.formData.value, this.file).subscribe(
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

      this.loading = false;
      this.submitting = false;
      this.submitted = false;
      this.formData.updateValueAndValidity();

      this.formData.reset();
    }

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

  onChange(event: any) {
    this.file = event.target.files[0];
  }
  clearFrom() {
    this.formData.reset();
  }
  close() {
    this.router.navigate(["./dashboard/"]);
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
}


