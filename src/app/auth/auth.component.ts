import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode=true;
  isLoading=false;
  timeInterV=false;
  error=null;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {


  }

     CloseAlert()
     {
       this.error=null;
     }
  
     onSwitch()
    {
       this.isLoginMode=!this.isLoginMode;
    }

     onSubmit(form)
    {
      if(!form.valid){
        return false;
      }
       const password=form.value.password;
       const email=form.value.email;

       let authObs:Observable<AuthResponseData>;
       this.isLoading=true;

      if(this.isLoginMode){
       authObs = this.auth.login(email,password);
      }
      else{
        authObs=this.auth.signup(email,password);
        form.reset(); 
      }     

      authObs.subscribe(response=>{
         this.isLoading=false;
         this.router.navigate(['/recipes']);
       },errorMessage=>{
         this.error=errorMessage
         this.isLoading=false;
         this.timeInterV=true;
         var inter=setTimeout(()=>{
               this.timeInterV=false;
               clearTimeout(inter);
         },10000)
        })
    }

}
