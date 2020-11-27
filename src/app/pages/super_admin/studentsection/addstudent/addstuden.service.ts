import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class AddstudenService {

  constructor(private webService: WebService) { }

  addStudent(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_student_details`,{value}, headers)
  }

  validateUserEmail(email, phone) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`validate_user_email`,{email, phone}, headers)
  }
}
