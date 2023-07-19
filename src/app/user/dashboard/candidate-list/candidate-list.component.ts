import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Candidate } from 'src/app/model/Candidate';
import { candidateservice } from 'src/app/service/candidateservice';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidat ?: Candidate [] = []
  constructor(private candidate : candidateservice,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if(param){
        this.candidat = this.candidate.getCandidate();
      }
    })
    console.log(this.candidat);
  }

}
