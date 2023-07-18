import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validateHeaderName } from 'http';
import { PositionEnum } from 'src/app/model/PositionEnum';
import { NotificationService } from 'src/app/service/NotificationService';
import { candidateservice } from 'src/app/service/candidateservice';
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  positionEnum = PositionEnum;
  enumKeys={};
  formData! : FormGroup;
  loading = false;
  submitted = false;
  login : any ;
  id?: string;
  constructor( private formBuilder : FormBuilder,
    

    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpClient,
    private candidate: candidateservice,
    private notification: NotificationService) {
      this.enumKeys=Object.keys(this.positionEnum);
   }

  ngOnInit(): void {
    this.id = "1"
    this.formData = this.formBuilder.group({
      position : [null],
      firstName : [null , Validators.required],
      lname :[null,Validators.required],
      email : [null],
      phone : [null, Validators.min(10)],
      skills : [null],
      fileUpload : [null],
      jDate : [null],
      comment : [null]

    });

  }
  get f() {
    return this.formData.controls;
  }

  changePosition(name : any){
    debugger
    this.formData.get("position")?.setValue(name.target.value);
  }
  onSubmit(){
    debugger
    if(this.formData.valid){
      debugger
      this.submitted = true;
      this.candidate.candidateList.push(this.formData.value);
      this.notification.success("add Success candidate"); 
    }
    }
   
  }
