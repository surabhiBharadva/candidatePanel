import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/model/Candidate';
import { Employee } from 'src/app/model/Employee';
import { Interview } from 'src/app/model/Interview';
import { EmployeeService } from 'src/app/service/EmployeeService';
import { Interviewsevice } from 'src/app/service/InterviewService';
import { candidateservice } from 'src/app/service/candidateservice';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  formData!: FormGroup;
  loading = false;
  submitted = false;
  employees?: Employee[] = []
  candidat?: Candidate[] = [];
  candidateObject?: Candidate = {};
  todayDate = new Date();
  id2: string = "null";
  candiDateObjet: Candidate = {};
  num: number = 0;
  constructor(
    private candidate: candidateservice,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private interviewSevice: Interviewsevice
  ) {
  }

  ngOnInit(): void {
    debugger
    this.id2 = this.route.snapshot.params['id'];
    debugger
    this.num = parseInt(this.id2);
    this.employeeService.getEmplyeeList().subscribe(
      data => {
        this.employees = data;
      }
    );
    this.candidate.getCandidateList().subscribe(data => 
      this.candidat = data
      );


    this.formData = this.formBuilder.group({
      employeeName: ['null', Validators.required],
      schduleDateTime: ['null', Validators.required]

    });
  }
  get f() {
    return this.formData.controls;
  }
  onSubmit() {
    if (this.formData.valid) {
      this.interviewSevice.AddInterview(this.formData.value).subscribe(data => {
       this.candidate.UpdateCandidateList(this.num , data).subscribe(data => console.log(data))
      })
    }
  }
  changeName(name: any) {
    this.formData.get("employeeName")?.setValue(name.target.value);
  }
  clearFrom() {
    this.formData.reset();
  }
  close() {
    this.router.navigate(["./dashboard/"]);
  }
}
