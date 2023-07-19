import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Candidate } from 'src/app/model/Candidate';
import { candidateservice } from 'src/app/service/candidateservice';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  formData! : FormGroup;
  loading = false;
  submitted = false;
  candidat ?: Candidate [] = []

  constructor(
    private candidate : candidateservice,
    private formBuilder : FormBuilder
  ) { debugger 
    this.candidat = this.candidate.getCandidate();}

  ngOnInit(): void {
    debugger
    this.formData = this.formBuilder.group({
      
      jdate : ['null'] });
  }
  get f() {
    return this.formData.controls;
  }
  onSubmit(){
    if(this.formData.valid){
      debugger
      this.submitted = true;
     
    }
    }
}
