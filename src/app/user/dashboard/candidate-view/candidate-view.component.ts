import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLinkActive } from '@angular/router';
import { CandidateAvailabilityEnum } from 'src/app/enum/CandidateAvailabilityEnum';
import { CandidateStatusEnum } from 'src/app/enum/CandidateEnum';
import { PositionEnum } from 'src/app/enum/PositionEnum';
import { StatusEnum } from 'src/app/enum/StatusEnum';
import { Candidate } from 'src/app/model/Candidate';
import { Interview } from 'src/app/model/Interview';
import { Interviewsevice } from 'src/app/service/InterviewService';
import { candidateservice } from 'src/app/service/candidateservice';

@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.css']
})
export class CandidateViewComponent implements OnInit {

  candidateId: any;
  candidateObject : Candidate ={}
  interviewObject :Interview = {}
  constructor(private route: ActivatedRoute, private candidateService : candidateservice,  private router: Router,private intrviewService : Interviewsevice) { }

  ngOnInit(): void {
    debugger
    this.candidateId = this.route.snapshot.params['candidate'];
    this.candidateService.getCadidateById(parseInt(this.candidateId)).subscribe(
      data => {
        debugger
        if (data) {
          this.candidateObject = data;
        }
      })
    this.intrviewService.getInterviewBycandidateId(parseInt(this.candidateId)).subscribe(
      data => {
        if (data) {
          this.interviewObject = data;
        }
      })

  }
  close() {
    this.router.navigate(["./dashboard/candidateList"]);
  }

  getPosition(name: any) {
    const indexOfS = Object.keys(PositionEnum).indexOf(name);
    return Object.values(PositionEnum)[indexOfS];
  }
  
  getStatus(name: any) {
    const indexOfS = Object.keys(CandidateStatusEnum).indexOf(name);
    return Object.values(CandidateStatusEnum)[indexOfS];
  }
 
  getAvailability(name: any) {
    const indexOfS = Object.keys(CandidateAvailabilityEnum).indexOf(name);
    return Object.values(CandidateAvailabilityEnum)[indexOfS];
  }
  patchStatus(name : any){
    const indexOfS = Object.keys(StatusEnum).indexOf(name);
    return Object.values(StatusEnum)[indexOfS];
  }

}
