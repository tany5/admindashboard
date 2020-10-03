import { Injectable } from '@angular/core';
import { WebService } from './../../../../../web.service';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EditsmallquizcategoryService {

  constructor(private webService: WebService) { }

  updatetSmallQuizCategory(catname, chapterid) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.POST(`update_small_question_type`,{catname, chapterid}, headers)
  }
}
