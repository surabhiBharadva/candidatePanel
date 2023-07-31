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
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  positionEnum = PositionEnum;
  candidateStatus = CandidateStatusEnum;
  cadidateAvailability= CandidateAvailabilityEnum;
  enumKeys = {};
  enumKeyStatus = {};
  enumKeyCandiddateStatus = {};
  formData!: FormGroup;
  loading = false;
  submitted = false;
  submitting =false;
  login: any;
  id: number = 0;
  id2: string = "null";
  num: number = 0;
  updateCandidate = false;
  candiDateObjet: Candidate = {};
  title: string = "Add";
  candidateObj: Candidate[] = [];
  file!:any;
 
  enum: any;
  selectedUser: any ;
  keyAvailability= {};
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
    this.enumKeys = Object.keys(this.positionEnum);
    this.enumKeyCandiddateStatus = Object.keys(this.candidateStatus)
    this.keyAvailability = Object.keys(this.cadidateAvailability)
    this.formData = this.formBuilder.group({
      candidateName: [null, Validators.required],
      position: [null,Validators.required],
      email: [null,Validators.required],
      phone: [null,Validators.required],
      skills: [null,Validators.required],
      fileUpload: [null,Validators.required],
      jDate: [null],
      comment: [null],
      candidateStatus:[''],
      candidateAvailability:['',Validators.required]
    });
    
    // edit mode
    if (this.id2) {
      this.title = "Edit";
      this.loading = true;
      this.num = parseInt(this.id2);
      this.candidate.getCadidateById(this.num).subscribe(
        data => {
         this.formData.patchValue({
          candidateName : data.candidateName,
          skills : data.skills,
          email : data.email,
          phone : data.phone,
          jDate : data.jDate,
          comment : data.comment,
          position : data.position
         });
        }
      )
      this.loading = false;
      this.updateCandidate = true;
    }
  }
  get f() {
    return this.formData.controls;
  }
  get position() {
    return this.formData.get("position");
  }
  
  changePosition(name: any) {
    debugger
   const name2 = name.target.value
   const indexOfS = Object.values(PositionEnum).indexOf(name2 as unknown as PositionEnum);
    this.enum = Object.keys(PositionEnum)[indexOfS];
    this.formData.get("position")?.setValue(this.enum, {
      onlySelf: true
    });
  }
  
  onSubmit() {
   debugger
      if (this.updateCandidate) {
        this.submitted = true;
        if (this.formData.invalid) {
          return;
      }
      this.submitting = true;
        this.candidate.UpdateCandidate(this.num,this.formData.value).subscribe(
          data => console.log(data)
        )
        this.loading = false;
        this.submitting = false;
        this.submitted = false;
       
      } else {
        this.submitted = true;
        if (this.formData.invalid) {
          return;
      }
      this.submitting = true;
        const indexOfS = Object.values(CandidateStatusEnum).indexOf(CandidateStatusEnum.pending as unknown as CandidateStatusEnum);
        this.enum = Object.keys(CandidateStatusEnum)[indexOfS];
        this.formData.get("candidateStatus")?.setValue(this.enum);
        this.candidate.addCandidadte(this.formData.value,this.file).subscribe({
          next: () => {
            this.notification.success("Candidate Add Successfully");
          },
          error: error => {
            this.notification.error(error.error);
          }
      })
        
        this.loading = false;
        this.submitting = false;
        this.submitted = false;
        this.formData.updateValueAndValidity();
       
        this.formData.reset();
      }
    
  }
  changeEmployeeStatus(name : any ){
    const name2 = name.target.value;
    const indexOfS = Object.values(CandidateStatusEnum).indexOf(name2 as unknown as CandidateStatusEnum);
     this.enum = Object.keys(CandidateStatusEnum)[indexOfS];
     this.formData.get("candidateStatus")?.setValue(this.enum);
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
  changeAvailability(name : any){
    const name2 = name.target.value;
    const indexOfS = Object.values(CandidateAvailabilityEnum).indexOf(name2 as unknown as CandidateAvailabilityEnum);
     this.enum = Object.keys(CandidateAvailabilityEnum)[indexOfS];
     this.formData.get("candidateAvailability")?.setValue(this.enum);
 }
}


