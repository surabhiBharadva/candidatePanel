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
  cadidateAvailability = CandidateAvailabilityEnum;

  keyAvailability = {};
  enumKeys = {};
  enumKeyStatus = {};
  enumKeyCandiddateStatus = {};
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
    private notification: NotificationService) {
  }

  ngOnInit(): void {

    this.id2 = this.route.snapshot.params['id'];
    this.enumKeys = Object.keys(this.positionEnum);
    this.enumKeyCandiddateStatus = Object.keys(this.candidateStatus)
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
          debugger
          this.formData.patchValue({
            
            candidateName: data.candidateName,
            skills: data.skills,
            email: data.email,
            phone: data.phone,
            jDate: data.jDate,
            comment: data.comment,
            position: this.getData(data.position),
            candidateStatus : this.candidateStatusData(data.candidateStatus)
          });
        }
      )
      this.loading = false;
      this.updateCandidate = true;
    }
  }

  candidateStatusData(status : any){
    const indexOfS = Object.keys(CandidateStatusEnum).indexOf(status);
    return Object.values(CandidateStatusEnum)[indexOfS];
  }
  getData(position: any) {
    debugger
    const indexOfS = Object.keys(PositionEnum).indexOf(position);
    return Object.values(PositionEnum)[indexOfS];
    
    
  }
  get f() {
    return this.formData.controls;
  }
  get position() {
    return this.formData.get("position");
  }

  changePosition(name: any) {
    const indexOfS = Object.values(PositionEnum).indexOf(name as unknown as PositionEnum);
    return this.enum = Object.keys(PositionEnum)[indexOfS];
   
  }

  onSubmit() {
    debugger
    if (this.updateCandidate) {
      this.submitted = true;
      if (this.formData.invalid) {
        return;
      }
      this.submitting = true;
     
      let value = this.changePosition(this.formData.get("position")?.value);
      this.formData.get("position")?.setValue(value);

      let position = this.changeEmployeeStatus(this.formData.get("candidateStatus")?.value);
      this.formData.get("candidateStatus")?.setValue(position);

      this.candidate.UpdateCandidate(this.num, this.formData.value).subscribe(
        (response: any) => {
          debugger
          console.log(response)
          this.notification.success(response.message);
        },
        (error: any) => {
          debugger
          this.notification.error(error.error)
        }
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

      let date = this.formData.get("position")?.value;
      let value = this.changePosition(date);
      this.formData.get("position")?.setValue(value)



      const indexOfS = Object.values(CandidateStatusEnum).indexOf(CandidateStatusEnum.PENDING as unknown as CandidateStatusEnum);
      this.enum = Object.keys(CandidateStatusEnum)[indexOfS];
      this.formData.get("candidateStatus")?.setValue(this.enum);
      this.candidate.addCandidadte(this.formData.value, this.file).subscribe(


        // Verified this things... 

        (response: any) => {

          this.notification.success(response.body);
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
  changeEmployeeStatus(name: any) {
    const indexOfS = Object.values(PositionEnum).indexOf(name as unknown as PositionEnum);
    return this.enum = Object.keys(PositionEnum)[indexOfS];
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
  changeAvailability(name: any) {
    const name2 = name.target.value;
    const indexOfS = Object.values(CandidateAvailabilityEnum).indexOf(name2 as unknown as CandidateAvailabilityEnum);
    this.enum = Object.keys(CandidateAvailabilityEnum)[indexOfS];
    this.formData.get("candidateAvailability")?.setValue(this.enum);
  }
  getPosition(): string[] {
    return Object.values(PositionEnum).filter((k) => isNaN(Number(k)));
  }
  getCandidateStatus(): string[] {
    return Object.values(CandidateStatusEnum).filter((k) => isNaN(Number(k)));
  }
}


