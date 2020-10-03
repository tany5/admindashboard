import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EditsmallquizchildcategoryService {

  constructor(private webService: WebService) { }

  getParentCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_question_type`, headers)
  }

  updateSmallQuestionSubType(catname, parentCategory, chapterid) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.POST(`update_small_question_sub_type`,{catname, parentCategory, chapterid}, headers)
  }
}
