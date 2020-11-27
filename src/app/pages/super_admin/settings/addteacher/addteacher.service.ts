import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddteacherService {

  constructor(private webService: WebService) { }

  getCourseTypeSection(parent_category_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_course_type_section/${parent_category_id}`, headers)
  }

  getQuestionType() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_question_type`, headers)
  }

  getSmallQuiz() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_quiz_type`, headers)
  }

  getCourseName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_course_name`, headers)
  }

  submitTeacherDetails(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_teacher_details`,{value}, headers)    
  }

  getTeacher() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_teacher`, headers)
  }

  deleteTeacher(teacher_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_teacher/${teacher_id}`, headers)
  }

  getTeacherById(teacher_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_teacher/${teacher_id}`, headers)
  }
}
