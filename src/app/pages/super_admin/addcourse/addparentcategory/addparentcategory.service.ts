import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ WebService } from './../../../../web.service'
@Injectable({
  providedIn: 'root'
})
export class AddparentcategoryService {

  constructor(private webService:  WebService) { }

  getAllCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_course`, headers)
  }

  getSubCategory(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_category_by_course_id/${id}`, headers)
  }

  addParentCategory(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_parent_category`,{value}, headers)
  }

  getAllParentCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_parent_category`, headers)
  }

  deleteParentCategory(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_parent_category/${id}`, headers)
  }
}
