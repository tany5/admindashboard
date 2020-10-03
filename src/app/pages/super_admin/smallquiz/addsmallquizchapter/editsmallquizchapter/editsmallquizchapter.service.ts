import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class EditsmallquizchapterService {

  constructor(private webService: WebService) { }

  getParentCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_question_type`, headers)
  }

  getChildCategory(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_quiz_question_sub_type_by_parent_id/${id}`, headers)
  }

  getSmallQuizChapterById(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_quiz_chapter_by_id/${id}`, headers)
  }

  updateSmallQuizChapter(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.POST(`update_small_quiz_chapter`, {value},  headers)
  }
}
