import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { configDataMasterValuesService } from 'src/app/service/configDataMasterValuesService';
import { ConfigDataMasterValues } from 'src/app/model/ConfigDataMasterValues';
import { DocumentData } from 'src/app/model/DocumentData';
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
  filePath! : any;
  fileName! : any ;
    loading = false;
  submitted = false;
  submitting = false;
  updateCandidate = false;
  patch = false;
  selectedPosition: string = '';
  candidateObj: Candidate[] = [];
  candiDateObjet: Candidate = {};
  createBy: string = 'admin';
  modifiedBy: string = 'admin';
  message: string = '';
  configDataMasterValues: ConfigDataMasterValues[] = [];

  reopenUpload = false;
  // todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpClient,
    private candidate: candidateservice,
    private notification: NotificationService,
    private configDataMasterValuesService: configDataMasterValuesService) {
  }

  ngOnInit(): void {

    this.id2 = this.route.snapshot.params['id'];
    this.getCandidateStatus();
    this.formData = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      jobRequirement: ['', Validators.required],
      email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNo: ['',[Validators.required,Validators.pattern('[0-9]\\d{9}')]],
      skills: [null, Validators.required],
      resume: [null, Validators.required],
      joiningDate: [null, Validators.required],
      comments: [null],
      candidateStatus: ['', Validators.required],
      joiningAvailability: ['', Validators.required],
      id: ['']
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
            lastName: data.lastName,
            skills: data.skills,
            email: data.email,
            phoneNo: data.phoneNo,
            joiningDate: data.joiningDate,
            comments: data.comments,
            jobRequirement: this.patchPosition(data.jobRequirement),
            candidateStatus: data.candidateStatus,
            joiningAvailability: this.patchValueAvailability(data.joiningAvailability),
            fileUpload: data.resume,
            id: data.id
          });
          
          this.fileName = data.documentDetails
          
        }
      );
      this.loading = false;
      this.updateCandidate = true;
    }
    this.resetAndUpdate();

  }
  
  

  resetAndUpdate() {
    if (!this.updateCandidate) {
      debugger
      this.formData.controls['joiningDate'].setValidators(null);
      this.formData.controls['joiningDate'].updateValueAndValidity();
      this.formData.controls['joiningDate'].clearValidators();
      this.formData.controls['candidateStatus'].setValidators(null);
      this.formData.controls['candidateStatus'].updateValueAndValidity();
      this.formData.controls['candidateStatus'].clearValidators();
    }
  }
  get f() {

    return this.formData.controls;

  }
  download(filename: any) {  
    debugger  
    this.candidate.downloadFile(filename).subscribe(event => {
      debugger
      let blob: Blob = event.body as Blob;

      var urlOpean = URL.createObjectURL(blob);
      window.open(urlOpean, '_blank');

    }, error => {
      console.log("Error via downloading file..." + error);

    });
  }
  reupoladClick(reupoladClick : boolean){
    this.reopenUpload =reupoladClick;
  }
  onSubmit() {
    debugger
    if (this.updateCandidate) {

      //update Code 
      this.submitted = true;
      if (this.formData.invalid) {
        if (this.selectedStatus === "OfferAccepted") {
          if (!this.reopenUpload) {
            this.formData.controls['resume'].setValidators(null);
            this.formData.controls['resume'].updateValueAndValidity();
            this.formData.controls['resume'].clearValidators();
            if (this.formData.invalid) {
              return;
            }
          } else {
            return;
          }
        } else {
          this.formData.controls['joiningDate'].setValidators(null);
          this.formData.controls['joiningDate'].updateValueAndValidity();
          this.formData.controls['joiningDate'].clearValidators();
          if (this.formData.invalid) {
            if (!this.reopenUpload) {
              this.formData.controls['resume'].setValidators(null);
              this.formData.controls['resume'].updateValueAndValidity();
              this.formData.controls['resume'].clearValidators();
              if (this.formData.invalid) {
                return;
              }
            } else {
              return;
            }

          }
        }

      }
      this.submitting = true;
      let value = this.changePosition(this.formData.get("jobRequirement")?.value);
      this.formData.get("jobRequirement")?.setValue(value);

      let candidateAvailability = this.changeAvailability(this.formData.get("joiningAvailability")?.value);
      this.formData.get("joiningAvailability")?.setValue(candidateAvailability);
      const formData2 = new FormData()
     
      this.candidate.addCandidadte(this.formData.value, this.file).subscribe(
        (response: any) => {
          if (response.status === 'Error') {
            this.message = response.message
            this.patchValue(this.num);
          } else {
            this.message = response.message;
            this.patchValue(this.num);
          }
        },
        (error: any) => {
          this.message = error.error;
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

      let value = this.changePosition(this.formData.get("jobRequirement")?.value);
      this.formData.get("jobRequirement")?.setValue(value);

      let candidateAvailability = this.changeAvailability(this.formData.get("joiningAvailability")?.value);
      this.formData.get("joiningAvailability")?.setValue(candidateAvailability);
      
      this.candidate.addCandidadte(this.formData.value, this.file).subscribe(
        (response: any) => {
          if (response.status.error) {
            this.message = response.message
          } else {
            this.message = response.message;
          }
        },
        (error: any) => {
          this.message = error.error;
        }
      )

      this.loading = false;
      this.submitting = false;
      this.submitted = false;
      this.formData.reset();

    }

  }


  onChange(event: any) {
    debugger
    this.file = event.target.files[0];
    this.fileName = this.file.name
  }
  clearFrom() {
    if (!this.updateCandidate) {
      this.formData.setValidators(null);
      this.formData.updateValueAndValidity();
      this.formData.clearValidators();
      this.formData.reset();

    } else {
      this.patchValue(this.num);
      
      this.reopenUpload = false
    }

  }
  patchValue(num: number) {
    this.candidate.getCadidateById(num).subscribe(
      data => {
        debugger
        this.formData.patchValue({

          firstName: data.firstName,
          lastName: data.lastName,
          skills: data.skills,
          email: data.email,
          phoneNo: data.phoneNo,
          joiningDate: data.joiningDate,
          comment: data.comments,
          jobRequirement: this.patchPosition(data.jobRequirement),
          candidateStatus: data.candidateStatus,
          joiningAvailability: this.patchValueAvailability(data.joiningAvailability),
          fileUpload: data.resume,
          
        });

      }
    )
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
  getCandidateStatus() {
    debugger
    this.configDataMasterValuesService.getCandidateStatus().subscribe(
      (response: any) => {
        if (response.status.error) {
          this.message = response.status.error;

        } else {
          debugger
          this.configDataMasterValues = response.body;
        }
      },
      (error: any) => {
        this.message = error.error;
      }
    )
  }
  patchValueAvailability(availability: any) {

    const indexOfS = Object.keys(CandidateAvailabilityEnum).indexOf(availability);
    return Object.values(CandidateAvailabilityEnum)[indexOfS];
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

}


