import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/model/Candidate';
import { Employee } from 'src/app/model/Employee';
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
  ) {
  }

  ngOnInit(): void {
    debugger
    this.id2 = this.route.snapshot.params['id'];
    this.num = parseInt(this.id2);
    this.candidat = this.candidate.getCandidate();

    this.formData = this.formBuilder.group({
      employeeName: ['null', Validators.required],
      schduleDateTime: ['null', Validators.required]
    });
  }
  get f() {
    return this.formData.controls;
  }
  onSubmit() {
    debugger
    if (this.formData.valid) {
      this.candidate.candidateList.map(u => u.id !== this.formData.value.id ? u : this.formData.value);
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
