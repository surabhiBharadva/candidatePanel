import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { encode } from 'punycode';
import { first } from 'rxjs';
import { Candidate } from 'src/app/model/Candidate';
import { PositionEnum } from 'src/app/model/PositionEnum';
import { DocumentService } from 'src/app/service/DocumentService';
import { candidateservice } from 'src/app/service/candidateservice';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  positionEnum = PositionEnum ; 
  candidateList?: Candidate[] = []
  candiDateData: any;
  file! : Blob;
  constructor(private candidateService: candidateservice, private route: ActivatedRoute, private http: HttpClient, private documentService : DocumentService) { }

  ngOnInit(): void {
    this.candidateService.getCandidateList().subscribe(
      data => {
        this.candidateList = data;
      }
    );

  }
  getKey(id : any){
    const indexOfS = Object.keys(PositionEnum).indexOf(id);
    return Object.values(PositionEnum)[indexOfS];
  }
  getpdfview(id : any){
      this.documentService.getpdf(id).subscribe( data =>
        console.log(data)
        );
  }
  getpdf(document : any){
    debugger
    const data = encode( document.fileData );
    let respone = this.base64ToArrayBuffer(document.fileData);
    this.file = new Blob( [respone], {
      type: "application/pdf"
   }); 
    var urlOpen = URL.createObjectURL(this.file);
    window.open(urlOpen, '_blank');

  }
  base64ToArrayBuffer(base64:any):ArrayBuffer {
    debugger
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

}
