import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class ViewquestionbankquestionService {

  constructor(private webService: WebService) { }
  getQuestionBankQuestion() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_question_bank_quiz_answer`, headers)
  }

  deletequiz(quiz_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_full_length_quiz/${quiz_id}`, headers)    
  }

  updateQuizName(quiz_id, quiz_name){
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`edit_full_length_quiz_name/${quiz_id}/${quiz_name}`, headers)
  }

  deleteQuestionBankQuestion(question_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_question_bank_quiz_answer/${question_id}`, headers)
  }
}
