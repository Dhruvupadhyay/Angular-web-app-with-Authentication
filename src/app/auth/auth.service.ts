import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
interface authResponseData{
    kind:String,
    idToken:String,
    email:String,
    refreshToken:String,
    expiresIn:String,
    localId:String,
  
}
@Injectable({providedIn:'root'})
export class Authservice{
    constructor(private http:HttpClient){

    }
signUp(email:String,password:String){
   return this.http.post<authResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA64agG1Toux3Q56n4zyoZLHadhWYe7nkA',{
        email:email,  
        password:password,
        returnSecureToken:true
    })
}
}