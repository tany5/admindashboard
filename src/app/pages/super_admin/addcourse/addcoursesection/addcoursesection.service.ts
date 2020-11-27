import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class AddcoursesectionService {

  constructor(private webService: WebService) { }

  getAllSubCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_sub_category_details`, headers)
  }

  addSection(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_section`,{value}, headers)
  }

  getAllSection() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_section`, headers)    
  }
}
