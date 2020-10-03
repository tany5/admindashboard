import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddsmallquizchildcategoryService {

  constructor(private webService: WebService) { }


  getParentCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_question_type`, headers)
  }

  getSubCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_question_sub_type`, headers)
  }

  addSmallQuizSubCategory(catname, parentCategory) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.POST(`add_small_quiz_sub_category`,{catname, parentCategory}, headers)
  }

  deleteSmallQuestionType(chapterId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_small_question_sub_type/${chapterId}`, headers)    
  }
}
