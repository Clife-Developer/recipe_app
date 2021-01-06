import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http:HttpClient, private store:AngularFirestore) { }

  addRecipe(productBody){  
    return this.store.collection('recipes').add(productBody);
  }

  getRecipes(){
    return this.store.collection('recipes').snapshotChanges();
  }
 
  getRecipe(id){
    //return this.store.collection('recipes').doc(id).ref.get();
    return this.store.collection('recipes').doc(id).snapshotChanges(); 
  }
 
  updateRecipe(productId,productBody){
    return this.store.doc('recipes/'+productId).update(productBody);
  }
 
  deleteProduct(productId){
    return this.store.doc('recipe/'+productId).delete();
  }

}
