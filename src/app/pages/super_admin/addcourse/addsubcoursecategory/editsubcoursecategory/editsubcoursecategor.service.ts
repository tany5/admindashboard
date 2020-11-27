import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EditsubcoursecategorService {

  constructor(private webService: WebService) { }

  getAllSubCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_sub_course`, headers)
  }

  getParentCategory(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_course_parent_category_by_id/${id}`, headers)
  }


 editSubCourseCategoryDetails(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`edit_sub_course_category_details`,{value}, headers)
  }

  getAllSubCourseDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_sub_course_details`, headers)
  }

  getSubCategoryById(id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_category_by_id/${id}`, headers)
  }
}
