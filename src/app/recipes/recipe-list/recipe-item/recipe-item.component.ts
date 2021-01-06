import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap} from 'rxjs/operators';
import { RecipesService } from '../../recipes.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  recipe:any[]=[];
  ItemClicked=false;
  searchName:string="";
  constructor(private service:RecipesService) { }

  ngOnInit(): void {
    this.service.getRecipes().subscribe(res=>{
        this.recipe=res.map(emp=>{ 
            return{
              Id:emp.payload.doc.id,
              name:emp.payload.doc.data()['name'],
              description:emp.payload.doc.data()['description'],
              shortDescription:emp.payload.doc.data()['shortDescription'],
              image:emp.payload.doc.data()['image'], 
            } 
          });            
      },err=>{console.log(err)})
    }
}
