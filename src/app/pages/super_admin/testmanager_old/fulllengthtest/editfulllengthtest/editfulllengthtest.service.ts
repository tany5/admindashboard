import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class EditfulllengthtestService {

  constructor(private webService: WebService) { }

  getQuizQuestion(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_full_length_quiz_all_question_by_id/${prodId}`, headers)
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

  getQuizCountBySubCourse(parentCategoryId, sectionId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_quiz_count_by_sub_course/${parentCategoryId}/${sectionId}`, headers)    
  }

  getAllFullLengthQuizById(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_full_length_quiz_by_id/${prodId}`, headers)    
  }
  editFullLengthQuiz(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`edit_full_length_quiz`, {value}, headers)
  }

  deleteQuestionByQuestionId(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_question_by_question_id/${prodId}`, headers)    
  }
}
