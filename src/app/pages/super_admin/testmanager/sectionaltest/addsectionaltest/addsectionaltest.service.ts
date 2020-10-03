import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class AddsectionaltestService {

  constructor(private webService: WebService) { }

  getSubjectName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_subject_name`, headers)
  }

  getSubCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_category`, headers)
  }

  getCourseTypeSection(parentCategoryId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_course_type_section/${parentCategoryId}`, headers)
  }

  getQuizCountBySubCategory(parentCategoryId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_quiz_count_by_sub_category/${parentCategoryId}`, headers)    
  }

  addsectionalLengthQuiz(value){
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_sectional_quiz`, {value}, headers)
  }

  submitFullLengthQuizQuestionAnswer(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})    
    return this.webService.post(`submit_full_length_quiz_question_answer`,{ value }, headers)
  }

}
