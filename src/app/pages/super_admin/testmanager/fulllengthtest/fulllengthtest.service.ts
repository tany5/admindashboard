import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class FulllengthtestService {

  constructor(private webService: WebService) { }

  getFullLengthQuiz() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_full_length_quiz`, headers)
  }

  deletequiz(quiz_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_full_length_quiz/${quiz_id}`, headers)    
  }

  updateQuizName(quiz_id, quiz_name){
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`edit_full_length_quiz_name/${quiz_id}/${quiz_name}`, headers)
  }
}
