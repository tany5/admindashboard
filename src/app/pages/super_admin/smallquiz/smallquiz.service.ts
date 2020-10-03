import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { WebService } from './../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class SmallquizService {

  constructor(private webService: WebService) { }

  getSmallQuiz() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_quiz`, headers)
  }
  
}
