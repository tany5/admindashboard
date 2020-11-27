import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddsubcoursecategoryService {

  constructor(private webService: WebService) { }

  getAllSubCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_sub_course`, headers)
  }

  getParentCategory(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_course_parent_category_by_id/${id}`, headers)
  }


  addSubCourseCategoryDetails(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_sub_course_category_details`,{value}, headers)
  }

  getAllSubCategoryDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_sub_category_details`, headers)
  }



}
