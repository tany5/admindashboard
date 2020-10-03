import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EditdailyquizquestioService {

  constructor(private webService: WebService) { }

  submitDailyQuizQuestionAnswer(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`update_daily_quiz_question_answer`,{ value }, headers)
  }

  getQuestionById(questionId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_daily_quiz_question_by_question_id/${questionId}`, headers)
  }
}
