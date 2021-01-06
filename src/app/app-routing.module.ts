import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'recipes', component:RecipesComponent,canActivate:[AuthGuard]},
  {path:'shopping-list',component:ShoppingEditComponent,canActivate:[AuthGuard]},
  {path:'recipes/details',component:RecipeDetailComponent},
  {path:'auth',component:AuthComponent},
  {path:'recipes/view-recipe/:id',component:RecipeDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
