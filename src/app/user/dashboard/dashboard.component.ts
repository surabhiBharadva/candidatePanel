import { Component, ComponentRef, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateComponent } from './candidate/candidate.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
  }
 

  constructor(private router: Router,) {
     
  }
  loadComponent(){
   
  }
}
