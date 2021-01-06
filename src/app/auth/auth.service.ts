import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { logging } from 'protractor';
import { AppRoutingModule } from '../app-routing.module';

export interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn :	string;
  localId :	string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user=new BehaviorSubject<User>(null);
  private _tokenExpirationTimer:any;

  constructor(private http:HttpClient,private router:Router) { }

  

    //authentication
    signup(email:string,password:string)
    {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwZJxsbyFSX8ciq4mRlMmnr3QyeJ8pZ5I',
       {
         email:email,
         password:password,
         returnSecureToken:true
       }).pipe(catchError(this.Errorhandle),tap(resData=>{
         this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
       }));
    }
 
 
    login(email:string, password:string)
    {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwZJxsbyFSX8ciq4mRlMmnr3QyeJ8pZ5I',
      {
       email:email,
       password:password,
       returnSecureToken:true
      }).pipe(catchError(this.Errorhandle),tap(resData=>{
       this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
     }));
      
    }
 
 
    autoLogin()
    {
      
      const userData: {
        email:string;
        id:string;
        _token:string;
        _tokenExpirationDate
      }=JSON.parse(localStorage.getItem('userData')); 
      if(!userData)
      {
        return;
      }   
 
      const loadedUser=new User(
       userData.email,
       userData.id,
       userData._token,
       new Date(userData._tokenExpirationDate)
       );
 
       if(loadedUser.token)
       {
         this.user.next(loadedUser);
         const expirationDuration=new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
         this.autoLogout(expirationDuration);
       }
    }
 
 
    autoLogout(expirationDuration:number){
      this._tokenExpirationTimer=setTimeout(()=>
      {
        this.logout();
      },expirationDuration)
    }
 
 
    logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
 
    if(this._tokenExpirationTimer){
      clearTimeout(this._tokenExpirationTimer);
    }
    this._tokenExpirationTimer=null;
    }
 
 
     private handleAuth(email:string, userId:string, token:string, expiresIn:number){
       const expirationDate=new Date(new Date().getTime()+ expiresIn * 1000);
       const user=new User(email,userId,token,expirationDate );
       this.user.next(user);
       this.autoLogout(expiresIn*1000);
       localStorage.setItem('userData',JSON.stringify(user));
     }
 
 
    //handling both request's errors
    private Errorhandle (errorRes:HttpErrorResponse)
    {
     let errorMessage="an unknown error occured";
     if(!errorRes.error || !errorRes.error.error)
     {
         return throwError(errorMessage);
     }
     switch(errorRes.error.error.message)
     {
       case 'EMAIL_EXISTS':
       errorMessage="This email already exists";
       break;
 
       case 'EMAIL_NOT_FOUND':
       errorMessage='There is no user record corresponding to this identifier. The user may have been deleted. Please sign up';
       break;
 
       case 'INVALID_PASSWORD':
       errorMessage='Password is not valid';
       break;
 
       case 'USER_DISABLED':
       errorMessage='The user account has been disabled by an administrator.';
       break;
     }
     return throwError(errorMessage);
    }

}
