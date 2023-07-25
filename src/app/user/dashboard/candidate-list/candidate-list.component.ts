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
    debugger
    this.candidateService.getCandidateList().subscribe(
      data => {
        debugger
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
  getpdf(id : any){
    debugger
    var stringifyData = JSON.stringify(id);
    const data = encode( stringifyData );

    this.file = new Blob( [ data ], {
      type: "application/pdf"
   });

  

      
    var urlOpen = window.URL.createObjectURL(this.file);
    window.open(urlOpen, 'new');
    
    
   
  }

}
