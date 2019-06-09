import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Authservice } from './auth.service';


@Component({
  selector: 'app-auth-detail',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
    constructor(private authservice:Authservice){

    }
    isLoginMode=true;
    isLoading=false;
    switchMode(){
        this.isLoginMode=!this.isLoginMode
    }

    onSubmit(form:NgForm){
        if(!form.valid){
            return;
        }
        const email=form.value.email;
            const password=form.value.password;

        if(this.isLoginMode){

        }else{
            const email=form.value.email;
            const password=form.value.password;
          this.isLoading=true;
        this.authservice.signUp(email,password).subscribe(resdata=>{
        this.isLoading=false;

            console.log(resdata)
        },error=>{
            this.isLoading=false;
            console.log(error)
        })
        form.reset();   
        }
        }
    
}