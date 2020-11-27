import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class EditsubcourseService {

  constructor(private webService: WebService) { }  
  getAllCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_course`, headers)
  }

  getSubCourseDetails(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_course_by_id/${id}`, headers)
  }

  editSubCourse(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`edit_sub_course`,{value}, headers)    
  }

}
