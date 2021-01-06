import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipefilter'
})
export class RecipefilterPipe implements PipeTransform {

  transform(recipe:any[],searchName:string):any[] {
  if(!recipe || !searchName){
    return recipe;
  }
  return recipe.filter(res=>res.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
  }

}
