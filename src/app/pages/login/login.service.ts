import { Injectable } from '@angular/core';
import { WebService } from '../../web.service'
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private webService: WebService, private http: HttpClient) { }

  login(userName, userPassword) {
    let headers = new  HttpHeaders({'Content-type': 'text/plain'})
    return this.webService.post("login",{userName, userPassword}, headers);
  }

  generateToken(userId) {
    let headers = new  HttpHeaders()
    return this.http.get(`http://localhost/avisionEstore/index.php/auth/token_get/${userId}`, {headers});
  }
}
