import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EditparentsubjecService {

  constructor(private webService: WebService) { }

  getAllQuestionTypeById(product_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_question_type_by_id/${product_id}`, headers)
  }

  submitParentSubject(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`edit_parent_subject`,{value}, headers)
  }

}
