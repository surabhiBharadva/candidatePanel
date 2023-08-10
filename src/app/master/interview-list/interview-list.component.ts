import { Component, OnInit } from '@angular/core';
import { PositionEnum } from 'src/app/enum/PositionEnum';
import { StatusEnum } from 'src/app/enum/StatusEnum';
import { Interview } from 'src/app/model/Interview';
import { Interviewsevice } from 'src/app/service/InterviewService';
import { candidateservice } from 'src/app/service/candidateservice';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {
  interviewList?: Interview[] = [];
  constructor(private interviewSevice : Interviewsevice,private candidateService : candidateservice) { }

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
    let status = Object.values(StatusEnum)[indexOfS];
    if(status === "Interview-Scheduled"){
      return "Scheduled";
    }else if (status === "Interview-Selected"){
      return "Selected";
    }else if(status === "Interview-Rejected"){
      return "Rejected"
    }else if (status === "Interview-Rescheduled"){
      return "Resuchduled";
    }else if(status === "Interview-Cancelled"){
      return "Cancelled"
    }

    return ;
  }
  allInterview(){
    this.interviewSevice.allInterviewList().subscribe(
    
      data => {
        debugger
        this.interviewList = data
      }
    );
  }
  previousInterview(){
    debugger
    this.interviewSevice.previousInterviewList().subscribe(
    
      data => {
        debugger
        this.interviewList = data
      }
    );
  }
  tommorowInterview(){
    this.interviewSevice.tommorowInterviewList().subscribe(
    
      data => {
        debugger
        this.interviewList = data
      }
    );
  }
  download(filename: any) {  
    debugger  
    this.candidateService.downloadFile(filename).subscribe(event => {
      debugger
      let blob: Blob = event.body as Blob;

      var urlOpean = URL.createObjectURL(blob);
      window.open(urlOpean, '_blank');

    }, error => {
      console.log("Error via downloading file..." + error);

    });
  }

}
