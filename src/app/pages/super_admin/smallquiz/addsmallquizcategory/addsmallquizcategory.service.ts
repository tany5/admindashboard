import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddsmallquizcategoryService {

  constructor(private webService: WebService) { }

  getLiveClassData() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_question_type`, headers)
  }
  submitSmallQuizCategory(catname) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.POST(`add_small_question_type`,{catname}, headers)
  }

  deleteSmallQuestionType(chapterid) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.delete(`delete_small_question_type/${chapterid}`, headers)
  }
}
