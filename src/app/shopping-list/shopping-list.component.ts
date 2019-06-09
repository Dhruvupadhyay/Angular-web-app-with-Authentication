import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model'
import { ShoppingListService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
ingredients: Ingredient[];
igchangesub:Subscription;
editmode=false;

  constructor(private shoppinglistservice:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.shoppinglistservice.getIngredient();
  this.igchangesub= this.shoppinglistservice.ingredientschanged.subscribe((ingredient:Ingredient[])=>{
    this.ingredients=ingredient;
  })
  }

  onEditItem(index:number){
    this.shoppinglistservice.startedEditing.next(index);
  }
ngOnDestroy(){
this.igchangesub.unsubscribe();
}
}
