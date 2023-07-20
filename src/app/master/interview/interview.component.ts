import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  candidateObject ?: Candidate  ={};
  todayDate = new Date();
  constructor(
    private candidate : candidateservice,
    private formBuilder : FormBuilder
  ) {  
    }

  ngOnInit(): void {
    this.candidat = this.candidate.getCandidate();
    if(this.candidat){
      for(let i of this.candidat){
        if(i.schduleDateTime === this.todayDate){
          this.candidat.push(i);
        }
      }
    }
    this.formData = this.formBuilder.group({
      lname : ['null',Validators.required],
      schduleDateTime : ['null', Validators.required] });
  }
  get f() {
    return this.formData.controls;
  }
  onSubmit(){
    if(this.formData.valid){
      console.log(this.formData.get('lname')?.value);
     this.candidat = this.candidat?.filter(this.formData.get('lname')?.value);
    }
    }
    changeName(name : any){
      this.formData.get("lname")?.setValue(name.target.value);
    }
}
