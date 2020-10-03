import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdddailyquizService {

  constructor(private webService: WebService) { }

  getParentCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_question_type`, headers)
  }

  submitDailyQuiz(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_daily_quiz`,{ value }, headers)
  }

  submitDailyQuizQuestionAnswer(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_daily_quiz_question_answer`,{ value }, headers)
  }

  getAllDailyQuiz() {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`get_all_daily_quiz`, headers)
  }
}
