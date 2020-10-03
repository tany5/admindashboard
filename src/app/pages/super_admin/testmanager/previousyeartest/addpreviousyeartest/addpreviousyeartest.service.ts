import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class AddpreviousyeartestService {

  constructor(private webService: WebService) { }

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

  getQuizCountBySubCourse(parentCategoryId, sectionId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_quiz_count_by_sub_course/${parentCategoryId}/${sectionId}`, headers)    
  }

  addPreviousQuiz(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_previous_year_quiz`, {value}, headers)

  }

  submitFullLengthQuizQuestionAnswer(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})    
    return this.webService.post(`submit_full_length_quiz_question_answer`,{ value }, headers)
  }

  getSubjectName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_subject_name`, headers)
  }
}
