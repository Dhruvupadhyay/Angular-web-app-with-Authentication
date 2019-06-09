import {Ingredient} from '../shared/ingredient.model';

import { Subject } from 'rxjs';

export class ShoppingListService{
    
    ingredientschanged=new Subject <Ingredient[]>();
    startedEditing=new Subject<number>();

    ingredients: Ingredient[] =[new Ingredient('apples',5),new Ingredient('tomato',10)];
  constructor() { }
  getIngredient(){
      return this.ingredients.slice();
  }

  geting(index:number){
      return this.ingredients[index];
  }
addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientschanged.next(this.ingredients.slice());
}

addingredients(ingredient:Ingredient[]){
this.ingredients.push(...ingredient);
this.ingredientschanged.next(this.ingredients.slice());
}
updateIngredients(index:number,newingredient:Ingredient){
    this.ingredients[index]=newingredient;
this.ingredientschanged.next(this.ingredients.slice())
}

deleteingredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientschanged.next(this.ingredients.slice());
}
}

