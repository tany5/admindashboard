import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class PostapprovalService {

  constructor(private webService: WebService) { }
  submitStudyConcept(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_study_concept`,{value}, headers)
  }

  getDayQuestions() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_day_questions`, headers)
  }

  approvePost(post_id, status) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`approve_post/${post_id}/${status}`, headers)
  }
}
