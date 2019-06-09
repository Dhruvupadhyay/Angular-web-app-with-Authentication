import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slform:NgForm;
editmode=false;
editeditemindex:number;
editedingredients:Ingredient;
subscription:Subscription;
  constructor(private shoppinglistservice:ShoppingListService) { }

  ngOnInit() {
  this.subscription=this.shoppinglistservice.startedEditing.subscribe((index:number)=>{
    this.editmode=true;
    this.editeditemindex=index;
this.editedingredients=this.shoppinglistservice.geting(index);
this.slform.setValue({
  name:this.editedingredients.name,
  amount:this.editedingredients.amount
})

  })
  }

  onAddItem(form:NgForm){
    const ingname=form.value.name;
    const amt=form.value.amount;
  const ing=new Ingredient(ingname,amt);
  if(this.editmode){
    this.shoppinglistservice.updateIngredients(this.editeditemindex,ing);
  }else{
    this.shoppinglistservice.addIngredient(ing);
  }
this.editmode=false;
form.reset();
  }
onClear(){
  this.editmode=false;
  this.slform.reset();
}
onDelete(){
  this.shoppinglistservice.deleteingredient(this.editeditemindex);
  this.onClear();
}

  ngOnDestroy(){
this.subscription.unsubscribe();
  }

}
