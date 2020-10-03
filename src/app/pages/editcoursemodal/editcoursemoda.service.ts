import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditcoursemodaService {

  constructor(private webService:WebService, private http: HttpClient) { }

  getTeacherDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_teacher_details`, headers)
  }

  getCourseName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_course_name`, headers)
  }
 
  submitLiveCLassDetails(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
      return this.webService.post(`edit_live_class_details`,{value}, headers)
  }  

 

  
  asignLiveClassTeacher(getTeacher_id, prodId) {
    let headers = new  HttpHeaders({'Content-Type': 'text/plain'})
    return this.webService.post(`edit_teacher_live_class`,{getTeacher_id,prodId}, headers)
  }

  getLiveClassByLiveClassMetaId(live_class_meta_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_live_class_data_by_live_class_meta_id/${live_class_meta_id}`, headers)
  }

  getTeacherCourseAssign(live_class_meta_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_teacher_course_assign/${live_class_meta_id}`, headers)
  }

  
}
