import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class UpdatepasswordService {

  constructor(private webService: WebService) { }

  updateStudentPassword(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`update_student_password`,{value}, headers)
  }
}
