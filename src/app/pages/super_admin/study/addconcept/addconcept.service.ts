import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddconceptService {

  constructor(private webService: WebService) { }

  getSubjectName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_subject_name`, headers)
  }

  submitStudyConcept(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_study_concept`,{value}, headers)
  }

  getChapterName(subjectId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_chapter_name/${subjectId}`, headers)
  }
  
  getSubChapterName(chapterId, subjectId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_chapter_name/${chapterId}/${subjectId}`, headers)
  }

  getAllStudyConcept() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_study_concept`, headers)
  }


  
}
