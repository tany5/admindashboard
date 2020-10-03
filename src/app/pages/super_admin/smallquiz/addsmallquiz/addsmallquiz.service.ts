import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class AddsmallquizService {

  constructor(private webService: WebService) { }

  getSmallQuestionType() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.delete(`get_small_question_type`, headers)
  }
  
  getSmallQuizChapterByParent_id(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_quiz_chapter_by_parent_id/${id}`, headers)
  }

  getSubCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_category`, headers)
  }

  submitSmallQuiz(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_small_quiz`, {value}, headers)
  }

  submitSmallQuizQuestionAnswer(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_small_quiz_question_answer`, {value}, headers)
  }

  getAllSmallQuiz() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_small_quiz`, headers)
  }

  deleteSmallQuiz(small_quiz_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_small_quiz/${small_quiz_id}`, headers)
  }

}
