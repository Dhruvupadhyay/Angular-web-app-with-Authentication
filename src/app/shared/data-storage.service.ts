import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class DataStorageService{
constructor(private http:HttpClient,private recipeservice:RecipeService){


}
storerecipe(){
    const recipe=this.recipeservice.getRecipe();
    this.http.put("https://recipe-fa484.firebaseio.com/recipes.json",recipe).subscribe(responsedata=>{
        console.log(responsedata)
   
})
}
fetchrecipe(){
  return  this.http.get<Recipe[]>("https://recipe-fa484.firebaseio.com/recipes.json").pipe(
        map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe, ingredient : recipe.ingredient? recipe.ingredient : [] }
            });
        }),tap(recipes=>{
this.recipeservice.overwriterecipe(recipes)
        })
    )
}
}

