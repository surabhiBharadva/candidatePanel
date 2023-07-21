import { HttpClient } from '@angular/common/http';
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
  candidateList?: Candidate[] = []
  candiDateData: any;
  constructor(private candidateService: candidateservice, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    debugger
    this.candidateService.getCandidateList().subscribe(
      data => {
        this.candidateList = data;
      }
    );

    console.log(this.candidateList);
    // this.candidat = this.candidate.putJson();

  }

}
