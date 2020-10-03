import { Injectable } from '@angular/core';
import { WebService } from '../../../web.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminaddcourseService {
  constructor(private webService: WebService, private http: HttpClient) { }

  getCourseName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_course_name`, headers)
  }
 
  submitLiveCLassDetails(value) {      
    let headers = new  HttpHeaders({'Content-Type': 'text/plain'})
    return this.webService.post(`add_live_class_details`,{value}, headers)
  }  

  

  getTeacherDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_teacher_details`, headers)
  }
  asignLiveClassTeacher(getTeacher_id, prodId) {
    let headers = new  HttpHeaders({'Content-Type': 'text/plain'})
    return this.webService.post(`asign_teacher_live_class`,{getTeacher_id,prodId}, headers)
  }
}
