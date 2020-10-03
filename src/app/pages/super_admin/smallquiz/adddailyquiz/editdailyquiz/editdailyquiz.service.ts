import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class EditdailyquizService {

  constructor(private webService: WebService) { }

  getAllDailyQuizById(daily_quiz_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`get_all_daily_quiz_by_id/${daily_quiz_id}`, headers)
  }

  getParentCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_question_type`, headers)
  }

  getDailyQuizQuestionQuizById(daily_quiz_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_daily_quiz_question_quiz_by_id/${daily_quiz_id}`, headers)
  }

  updateDailyQuiz(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`update_daily_quiz`,{ value }, headers)
  }
}
