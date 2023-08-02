import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder, Validators,FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, pipe } from 'rxjs';
import { Languageenum } from 'src/app/enum/LanguageEnum';
import { NotificationService } from 'src/app/service/NotificationService';
import { candidateservice } from 'src/app/service/candidateservice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form! : FormGroup;
  loading = false;
  submitted = false;
  login : any ;
  flag = false;
  constructor( private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpClient,
    private notification : NotificationService,
    private candidate : candidateservice
    ) {
   
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : [null, Validators.required],
      password : [null , Validators.required],
      language : [null] 
    });

  }
  get f() {
    return this.form.controls;
  }
  onSubmit(){
    if(this.form.valid){
      this.submitted = true;
      this.httpService.get('./assets/login.json').subscribe({ 
        next: data => {
            this.login = data as string [];	          
         }})
         if(this.login){
            for(let check of this.login){
              if((check.email === this.form.get('email')?.value) && 
                 (check.password === this.form.get('password')?.value)){
                 this.router.navigate(["./dashboard/"]);
                 this.flag = true
              }
            }
          }
        
        if(this.flag){
          this.notification.success("add Success"); 
        }
        this.router.navigate(["./dashboard/"]);
      }
    }

    getLanguage(){
      return Object.values(Languageenum).filter((k) => isNaN(Number(k)));
    }

  }


