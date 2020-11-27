import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddsubcoursecategorydescriptionService {

  constructor(private webService: WebService) { }

  submitPageInnerMeta(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_page_inner_meta`,{value}, headers)
  }

  getPageInnerMeta(sub_cat_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_page_inner_meta/${sub_cat_id}`, headers)
  }

  deletePageInnerMeta(course_content_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_page_inner_meta/${course_content_id}`, headers)
  }

}
