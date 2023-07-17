import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder, Validators,FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
 
  constructor( private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpClient) {
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : [null, Validators.required],
      password : [null , Validators.required]
    });

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
              }
            }
          }
        }
    }

  }


