import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusEnum } from 'src/app/enum/StatusEnum';
import { Interviewsevice } from 'src/app/service/InterviewService';

@Component({
  selector: 'app-interview-status-update',
  templateUrl: './interview-status-update.component.html',
  styleUrls: ['./interview-status-update.component.css']
})
export class InterviewStatusUpdateComponent implements OnInit {
  id : any;
  statusEnum = StatusEnum;
  interviewStatus = {};
  formData!: FormGroup;
  loading = false;
  submitted = false;
  enum: string = "null";
  interviewIdNum :number = 0;
  constructor(private route: ActivatedRoute,private router: Router,private interviewSevice : Interviewsevice,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.interviewStatus = Object.keys(this.statusEnum)
    this.interviewIdNum = parseInt(this.id) 
    this.formData = this.formBuilder.group({
      feedback: [''],
      status : ['null']
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      
      this.interviewSevice.updateInterview(this.interviewIdNum,this.formData.value).subscribe(data => {
        console.log(data);
      })
    }
  }
  changeStatus(name : any){
    const name2 = name.target.value;
    const indexOfS = Object.values(StatusEnum).indexOf(name2 as unknown as StatusEnum);
     this.enum = Object.keys(StatusEnum)[indexOfS];
     this.formData.get("status")?.setValue(this.enum);
  }

  clearFrom() {
    this.formData.reset();
  }
  close() {
    this.router.navigate(["./dashboard/"]);
  }

}
