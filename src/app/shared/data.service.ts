import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient,private recipeS:RecipesService) { }

  storeRecipes()
  {
    const recipes=this.recipeS.getRecipes();
    return this.http.put('https://udmm-82dbd.firebaseio.com/List.json',recipes).subscribe(res=>{console.log(res)});
  }

  fetchRecipes()
  {
    this.http.get('https://udmm-82dbd.firebaseio.com/List.json').subscribe(recipes=>
    {
      console.log(recipes);
    })
  }
}
