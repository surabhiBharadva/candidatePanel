import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DocumentService {
 
  private url = 'http://localhost:8080/api/v1/document';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  loginData: any;
  flag = false;
  documentList: Document[] = [];
  constructor(
    private httpService: HttpClient
  ) {

  }
  private handleError(error: any) {
    console.error(error);                                       //Created a function to handle and log errors, in case
    return throwError(error);
  }
  getpdf(id: any) {
    const url = `${this.url}/${id}`;
    return this.httpService.get<Document>(url).pipe(
    catchError(this.handleError)
    );
  }
}