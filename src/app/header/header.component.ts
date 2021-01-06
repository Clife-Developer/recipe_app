import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  private userSub:Subscription;
  isAuth=false;
  constructor(private dataStorage:DataService ,private authService:AuthService) { }

  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=>{
        this.isAuth=!!user;
      });
  }

  ngOnDestroy() :void{
    this.userSub.unsubscribe();
   }

  onSaveData(){
    this.dataStorage.storeRecipes();
  }

  onFetchData(){
    this.dataStorage.fetchRecipes();
  }

  onLogout(){
    this.authService.logout();
  }

}
