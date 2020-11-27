import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddsubcoursService {

  constructor(private webService: WebService) { }

  getAllCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_course`, headers)
  }

  addSubCourse(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_sub_course`,{value}, headers)
  }


  getAllSubCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_sub_course`, headers)
  }
}
