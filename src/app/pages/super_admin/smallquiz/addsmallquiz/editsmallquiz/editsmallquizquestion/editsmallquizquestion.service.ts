import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class EditsmallquizquestionService {

  constructor(private webService: WebService) { }

  getQuestionById(questionId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_quiz_question_by_question_id/${questionId}`, headers)
  }

  submitSmallQuizQuestionAnswer(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`update_small_quiz_question_answer`,{ value }, headers)
  }


}
