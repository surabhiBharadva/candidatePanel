import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLinkActive } from '@angular/router';
import { CandidateAvailabilityEnum } from 'src/app/enum/CandidateAvailabilityEnum';
import { CandidateStatusEnum } from 'src/app/enum/CandidateEnum';
import { PositionEnum } from 'src/app/enum/PositionEnum';
import { Candidate } from 'src/app/model/Candidate';
import { candidateservice } from 'src/app/service/candidateservice';

@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.css']
})
export class CandidateViewComponent implements OnInit {

  candidateId: any;
  candidateObject : Candidate ={}
  constructor(private route: ActivatedRoute, private candidateService : candidateservice,  private router: Router,) { }

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.params['candidate'];
    this.candidateService.getCadidateById(parseInt(this.candidateId)).subscribe(
      data => {
        this.candidateObject = data;
      })
  }
  close() {
    this.router.navigate(["./dashboard/"]);
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

}
