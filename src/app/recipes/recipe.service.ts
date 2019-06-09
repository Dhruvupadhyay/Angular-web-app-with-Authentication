import {Recipe} from "./recipe.model"
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppinglist.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{
    recipechanged=new Subject<Recipe[]>();
    private Recipes:Recipe[]=[new Recipe("A test recipe","it is very tatsy","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg",[new Ingredient("chicken",10),new Ingredient("cheese",20)]),
    new Recipe("A Another test recipe","it is very tatsy","https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg",[new Ingredient("burger",20),new Ingredient("pepper",80)])];

    constructor(private shoppinglistservice:ShoppingListService){

    }
    getRecipe(){
        return this.Recipes.slice();
    }
    getRecipebyid(index:number){
return this.Recipes[index];
    }
recipeSelected=new EventEmitter<Recipe>();

    addingredienttoshoppinglist(ingredient:Ingredient[]){
this.shoppinglistservice.addingredients(ingredient)
    }
    addRecipe(recipe:Recipe){
this.Recipes.push(recipe);
this.recipechanged.next(this.Recipes.slice());
    }
    updateRecipe(index:number,newrecipe:Recipe){
this.Recipes[index]=newrecipe;
this.recipechanged.next(this.Recipes.slice());
    }
deleteRecipe(index:number){
this.Recipes.splice(index,1);
this.recipechanged.next(this.Recipes.slice());
}
overwriterecipe(recipes:Recipe[]){
this.Recipes=recipes;
this.recipechanged.next(this.Recipes.slice());
}
}