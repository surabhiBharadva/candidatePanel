import { Component, OnInit } from '@angular/core';
import { PositionEnum } from 'src/app/enum/PositionEnum';
import { StatusEnum } from 'src/app/enum/StatusEnum';
import { Interview } from 'src/app/model/Interview';
import { Interviewsevice } from 'src/app/service/InterviewService';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {
  interviewList?: Interview[] = [];
  constructor(private interviewSevice : Interviewsevice) { }

  ngOnInit(): void {
    this.interviewSevice.getInterview().subscribe(
      data => {
        debugger
        this.interviewList = data;
      }
    );
  }
  getValue(name : any){
    const indexOfS = Object.keys(StatusEnum).indexOf(name);
    return Object.values(StatusEnum)[indexOfS];
  }
  getPosition(name : any){
    const indexOfS = Object.keys(PositionEnum).indexOf(name);
    return Object.values(PositionEnum)[indexOfS];
  }
  getInetviewStatus(name : any){
    const indexOfS = Object.keys(StatusEnum).indexOf(name);
    return Object.values(StatusEnum)[indexOfS];
  }
}
