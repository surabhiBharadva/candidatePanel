import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { encode } from 'punycode';
import { first } from 'rxjs';
import { PositionEnum } from 'src/app/enum/PositionEnum';
import { Candidate } from 'src/app/model/Candidate';
import { CandidateStatusEnum } from 'src/app/enum/CandidateEnum';
import { DocumentService } from 'src/app/service/DocumentService';
import { candidateservice } from 'src/app/service/candidateservice';
import { CandidateAvailabilityEnum } from 'src/app/enum/CandidateAvailabilityEnum';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  positionEnum = PositionEnum;
  candidateList?: Candidate[] = []
  candiDateData: any;
  file!: Blob;
  constructor(private candidateService: candidateservice, private route: ActivatedRoute, private http: HttpClient, private documentService: DocumentService, private router: Router,) { }

  ngOnInit(): void {
    this.candidateService.getCandidateList().subscribe(
      data => {
        this.candidateList = data;
      }
    );

  }
 
  getpdfview(id: any) {
    this.documentService.getpdf(id).subscribe(data =>
      console.log(data)
    );
  }

 
  
  getpdf(document: any) {
    this.file = new Blob([document], {
      type: "application/pdf"
    });
    var urlOpen = URL.createObjectURL(this.file);
    window.open(urlOpen, '_blank');

  }
  base64ToArrayBuffer(base64: any): ArrayBuffer {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
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

  download(filename: any) {    
    this.candidateService.downloadFile(filename).subscribe(event => {
      debugger
      let blob: Blob = event.body as Blob;
      let a: any = document.createElement('a');
      a.download = filename;
      a.text = filename;

      a.href = window.URL.createObjectURL(blob);
      a.click();

      var urlOpean = URL.createObjectURL(blob);
      window.open(urlOpean, '_blank');

    }, error => {
      console.log("Error via downloading file..." + error);

    });
  }


}
