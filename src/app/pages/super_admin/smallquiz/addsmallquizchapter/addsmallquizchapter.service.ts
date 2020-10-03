import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddsmallquizchapterService {

  constructor(private webService: WebService) { } 

  getSmallQuizChapter() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_quiz_chapter`, headers)
  }

  getParentCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_question_type`, headers)
  }

  getChildCategory(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_quiz_question_sub_type_by_parent_id/${id}`, headers)
  }
  addSmallQuizChapter(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.POST(`add_small_quiz_chapter`, {value},  headers)
  }

  deleteSmallChapter(chapterId){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_small_quiz_chapter/${chapterId}`, headers)
  }
}
