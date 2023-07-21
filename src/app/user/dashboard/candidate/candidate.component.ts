import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validateHeaderName } from 'http';
import { first } from 'rxjs';
import { Candidate } from 'src/app/model/Candidate';
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
  positionEnum = PositionEnum;
  enumKeys = {};
  enumKeyStatus = {};
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
  file: File | undefined;
  statusenum = StatusEnum;
  // todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpClient,
    private candidate: candidateservice,
    private notification: NotificationService) {
    this.enumKeys = Object.keys(this.positionEnum);
    this.enumKeyStatus = Object.keys(this.statusenum);
  }

  ngOnInit(): void {
    this.id2 = this.route.snapshot.params['id'];
    this.formData = this.formBuilder.group({
      position: [null],
      firstName: [null, Validators.required],
      lname: [null, Validators.required],
      email: [null],
      phone: [null, Validators.min(10)],
      skills: [null],
      fileUpload: [null,],
      jDate: [null],
      comment: [null],
      status: [null],
      schduleDateTime: [null]
    });
    // edit mode
    if (this.id2) {
      debugger
      this.title = "Edit";
      this.loading = true;
      this.num = parseInt(this.id2);
      debugger
      this.candidate.getCadidateById(this.num).subscribe(
        data => {
          debugger
          this.candiDateObjet = data;
        }
      )
      this.formData.patchValue(this.candiDateObjet);
      this.loading = false;
      this.updateCandidate = true;
    }
  }
  get f() {
    return this.formData.controls;
  }

  changePosition(name: any) {
    this.formData.get("position")?.setValue(name.target.value);
  }
  changeStatus(name: any) {
    this.formData.get("status")?.setValue(name.target.value);
  }
  onSubmit() {
    if (this.formData.valid) {
      debugger
      if (this.updateCandidate) {
        this.submitted = true;
      
        this.notification.success("Update Success candidate");
        this.formData.reset();
      } else {
        this.submitted = true;
        this.candidate.addCandidadte(this.formData.value).subscribe(data => {
          this.candiDateObjet = data;
          console.log(this.candiDateObjet);
        })
        this.notification.success("add Success candidate");
        this.formData.reset();
      }
    }
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
