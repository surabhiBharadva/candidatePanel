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
  constructor(private interviewSevice: Interviewsevice, private candidateService: candidateservice) { }

  ngOnInit(): void {
    this.interviewSevice.getInterview().subscribe(
      data => {
        this.interviewList = data;
      }
    );
  }

  getPosition(name: any) {
    const indexOfS = Object.keys(PositionEnum).indexOf(name);
    return Object.values(PositionEnum)[indexOfS];
  }

  allInterview() {
    this.interviewSevice.allInterviewList().subscribe(

      data => {

        this.interviewList = data
      }
    );
  }
  previousInterview() {

    this.interviewSevice.previousInterviewList().subscribe(

      data => {

        this.interviewList = data
      }
    );
  }
  tommorowInterview() {
    this.interviewSevice.tommorowInterviewList().subscribe(

      data => {

        this.interviewList = data
      }
    );
  }
  download(filename: any) {

    this.candidateService.downloadFile(filename).subscribe(event => {

      let blob: Blob = event.body as Blob;

      var urlOpean = URL.createObjectURL(blob);
      window.open(urlOpean, '_blank');

    }, error => {
      console.log("Error via downloading file..." + error);

    });
  }

}
