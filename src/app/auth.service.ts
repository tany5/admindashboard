import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean
  constructor(private webService: WebService, private http: HttpClient, private sessionStorage: LocalStorageService) {
    const token = this.sessionStorage.getItem('token')
    let headers = new  HttpHeaders({ 
    "Content-Type" : "text/plain"   
  }) 
    this.http.post(`http://localhost/avisionEstore/index.php/auth/token_post`,token, {headers}).subscribe(
      (res)=> {        
        if(res['id']) {                  
          this.isLoggedIn = true
        } 
        else {          
          this.isLoggedIn =  false 
        }       
      })

   }

  checkAuth(): boolean {   
    if(this.sessionStorage.getItem('user_logged_in') == '1') {
      return true
    }
    else {
      return false
    }
     
    
  }
  
}
