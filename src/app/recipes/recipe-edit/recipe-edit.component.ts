import { Component} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent{
id:number;
editmode=false;
recipeform:FormGroup;
constructor(private route:ActivatedRoute,private recipeservice:RecipeService,private router:Router){}

ngOnInit(){
    this.route.params.subscribe((params:Params)=>{
        this.id=+params['id'];
        this.editmode=params['id'] !=null;
        this.initform();
    })
}
private initform(){
    let recipeName='';
    let recipeImagepath='';
    let recipeDescription='';
let     recipeIngredients=new FormArray([]);
    if(this.editmode){
const recipe=this.recipeservice.getRecipebyid(this.id);
recipeName=recipe.name;
 recipeDescription=recipe.description;
 recipeImagepath=recipe.imagepath;
if(recipe['ingredient']){
    for(let ingredient of recipe.ingredient){
        recipeIngredients.push(
            new FormGroup({
                'name':new FormControl(ingredient.name,Validators.required),
                'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
        )
    }
}
}

this.recipeform=new FormGroup({
    name:new FormControl(recipeName,Validators.required),
    imagePath:new FormControl(recipeImagepath,Validators.required),
    description:new FormControl(recipeDescription,Validators.required),
ingredients:recipeIngredients

})
}
onAddIngredients(){
(<FormArray>this.recipeform.get('ingredients')).push(new FormGroup({
    name:new FormControl(null,[Validators.required]),
    amount:new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
}))
}

onSubmit(){
    const newrecipe=new Recipe(
        this.recipeform.value['name'],this.recipeform.value['description'],this.recipeform.value['imagePath'],this.recipeform.value['ingredients']
    )
    if(this.editmode){
       
        console.log(this.recipeform.value.ingredients)
        this.recipeservice.updateRecipe(this.id,newrecipe);
    }
    else{
        this.recipeservice.addRecipe(newrecipe);
    }
this.onClear();
}
onClear(){
this.router.navigate(['../'],{relativeTo:this.route})
}
onDeleteIng(index:number){
    (<FormArray>this.recipeform.get('ingredients')).removeAt(index);
}
}
