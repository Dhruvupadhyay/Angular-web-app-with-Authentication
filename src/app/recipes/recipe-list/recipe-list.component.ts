import { Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']

})
export class RecipeListComponent implements OnInit {
  
Recipes:Recipe[];
  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute ) { }

  ngOnInit() {
    this.Recipes=this.recipeService.getRecipe();
    this.recipeService.recipechanged.subscribe((recipes:Recipe[])=>{
this.Recipes=recipes;
    })
  }

 onNewRecipe(){
this.router.navigate(['new'],{relativeTo:this.route}) ;
}
}
