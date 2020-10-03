import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from './login.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocalStorageService } from './../../local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  hide = true;

  constructor(private _formBuilder: FormBuilder, private loginService: LoginService, private http: HttpClient, private router: Router, private location: Location, private sessionStorage: LocalStorageService ) { 

   
  }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  login() {
    if(this.loginFormGroup.valid) {
      const userName = this.loginFormGroup.value.userName  
      const userPassword  = this.loginFormGroup.value.userPassword
      this.loginService.login(userName, userPassword).subscribe(
        (res)=> {          
          if(res['status'] == 200) {
            this.loginService.generateToken(res['user_id']).subscribe(
              (res)=> {                
                this.sessionStorage.setItem('token',res['token'])
                this.sessionStorage.setItem('user_logged_in','1')
                this.router.navigate(['/superadmin'])
              }
            )            
          }
        },
        (error)=> {
          console.log(error)
        }
      )      
      
    }

    else {
      alert("* Feilds Are Required")
    }
  }
  

}
