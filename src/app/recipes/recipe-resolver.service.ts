import{Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:'root'})
export class RecipeResolver implements Resolve<Recipe[]>{
    constructor(private datastorageservice:DataStorageService,private recipeserive:RecipeService){

    }
resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot,){
    const recipe=this.recipeserive.getRecipe();
    if(recipe.length===0){
        return this.datastorageservice.fetchrecipe();        
    }else{
return recipe;
    }

}
}