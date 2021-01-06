import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';
import { RecipesService } from 'src/app/recipes/recipes.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  isSubmitted=false;
  constructor(private recipeService:RecipesService) { }

  ngOnInit(): void {


  }


  onSubmit(recipeForm)
  {
    
     console.log("please add recipe");
     const obj={
       name:recipeForm.value.name,
       description:recipeForm.value.description,
       image:recipeForm.value.image,
       shortDescription:recipeForm.value.shortDescription
     }
    this.recipeService.addRecipe(obj).then(res=>
      {
         //
      })
  }

  onClick(recipeForm)
  {
    this.isSubmitted=true;
  }
}
