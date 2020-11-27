import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddparentsubjectService {

  constructor(private webService: WebService) { }

  submitParentSubject(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_parent_subject`,{value}, headers)
  }

  getQuestionType() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_question_type`, headers)
  }

  delete_parent_subject_product_id(product_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_chapter/${product_id}`, headers)    
  }
  
}
