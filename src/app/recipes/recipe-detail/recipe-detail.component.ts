import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute ,Router} from '@angular/router';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import {NgForm}  from '@angular/forms';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:any[];
  recipeId:string="";
  Details={Id:'',shortDescription:'',name:'',description:'',image:''};
  isEdit=false;
  isSubmitted=false;
  constructor(private service:RecipesService,private activateR: ActivatedRoute,private router:Router ) { }

  ngOnInit(): void {
       this.service.getRecipes().subscribe(res=>{
          this.recipe=res.map(emp=>{ 
              return{
                Id:emp.payload.doc.id,
                name:emp.payload.doc.data()['name'],
                description:emp.payload.doc.data()['description'],
                image:emp.payload.doc.data()['image'], 
                shortDescription:emp.payload.doc.data()['shortDescription']
              }
            })  
            this.recipe.forEach((val,index,arr)=>{
               this.activateR.params.subscribe(data=>{
                  this.recipeId=data.id;
                  if(val.Id===data.id){
                    this.Details.Id=val.Id;
                    this.Details.name=val.name;
                    this.Details.description=val.description;
                    this.Details.shortDescription=val.shortDescription;
                    this.Details.image=val.image;
                  }  
                })
            })    
        })
    }

    EditRecipe(){
      this.isEdit=true;
    }

    onSubmit(Form){
      this.service.updateRecipe(this.recipeId,Form.value).then(res=>{
          console.log(res);
       })
    }

    onClick(recipeForm){ 
      this.isSubmitted=true;
      setTimeout(()=>{
        this.router.navigate(['./recipes']);
      },2000)
    }
}
