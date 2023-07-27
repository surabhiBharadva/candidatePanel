import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validateHeaderName } from 'http';
import { first } from 'rxjs';
import { Candidate } from 'src/app/model/Candidate';
import { CandidateStatusEnum } from 'src/app/model/CandidateEnum';
import { PositionEnum } from 'src/app/model/PositionEnum';
import { StatusEnum } from 'src/app/model/StatusEnum';
import { NotificationService } from 'src/app/service/NotificationService';
import { candidateservice } from 'src/app/service/candidateservice';
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  positionEnum  =  PositionEnum;
  positionEnum2  = typeof PositionEnum;
  candidateStatus = CandidateStatusEnum;
  enumKeys = {};
  enumKeyStatus = {};
  enumKeyCandiddateStatus = {};
  formData!: FormGroup;
  loading = false;
  submitted = false;
  login: any;
  id: number = 0;
  id2: string = "null";
  num: number = 0;
  updateCandidate = false;
  candiDateObjet: Candidate = {};
  title: string = "Add";
  candidateObj: Candidate[] = [];
  file!:any;
  statusenum = StatusEnum;
  enum: any;
  selectedUser: any ;
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
    this.enumKeyStatus = Object.keys(this.statusenum);
    this.enumKeyCandiddateStatus = Object.keys(this.candidateStatus)
    
    this.formData = this.formBuilder.group({
      firstName: [null, Validators.required],
      lname: [null, Validators.required],
      position: [null],
      email: [null],
      phone: [null, Validators.min(10)],
      skills: [null],
      fileUpload: [null],
      jDate: [null],
      comment: [null],
      status:['']
    });
    
    // edit mode
    if (this.id2) {
      this.title = "Edit";
      this.loading = true;
      this.num = parseInt(this.id2);
      this.candidate.getCadidateById(this.num).subscribe(
        data => {
         this.formData.patchValue({
          firstName : data.firstName,
          lname : data.lname,
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
    if (this.formData.valid) {
      debugger
      if (this.updateCandidate) {
        this.submitted = true;
        this.candidate.UpdateCandidate(this.num,this.formData.value).subscribe(
          data => console.log(data)
        )
        this.notification.success("Update Success candidate");
        this.formData.reset();
      } else {
        this.submitted = true;
        const indexOfS = Object.values(CandidateStatusEnum).indexOf(CandidateStatusEnum.pending as unknown as CandidateStatusEnum);
        this.enum = Object.keys(CandidateStatusEnum)[indexOfS];
        this.formData.get("status")?.setValue(this.enum);
        this.candidate.addCandidadte(this.formData.value,this.file).subscribe(data => {
          this.candiDateObjet = data;
          console.log(this.candiDateObjet);
        })
        this.notification.success("add Success candidate");
        this.formData.reset();
      }
    }
  }
  changeEmployeeStatus(name : any ){
    const name2 = name.target.value;
    const indexOfS = Object.values(CandidateStatusEnum).indexOf(name2 as unknown as CandidateStatusEnum);
     this.enum = Object.keys(CandidateStatusEnum)[indexOfS];
     this.formData.get("status")?.setValue(this.enum);
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
}


