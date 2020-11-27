import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class EditfulllengthtestquestionService {

  constructor(private webService: WebService) { }
  submitDailyQuizQuestionAnswer(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`update_full_length_quiz_question_answer`,{ value }, headers)
  }

  getQuestionById(questionId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_full_lengt_quiz_question_by_question_id/${questionId}`, headers)
  }
}
