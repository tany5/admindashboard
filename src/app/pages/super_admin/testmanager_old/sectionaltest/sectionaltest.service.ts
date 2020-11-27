import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class SectionaltestService {

  constructor(private webService: WebService) { }

  getSectionalLengthQuiz() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_sectional_quiz`, headers)
  }

  deletequiz(quiz_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_full_length_quiz/${quiz_id}`, headers)    
  }
}
