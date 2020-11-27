import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { WebService } from 'src/app/web.service';
@Injectable({
  providedIn: 'root'
})
export class EditconceptService {

  constructor(private webService: WebService) { }

  getSubjectName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_subject_name`, headers)
  }

  submitStudyConcept(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`update_study_concept`,{value}, headers)
  }

  getChapterName(subjectId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_chapter_name/${subjectId}`, headers)
  }
  
  getSubChapterName(chapterId, subjectId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_chapter_name/${chapterId}/${subjectId}`, headers)
  }

  getAllStudyConceptById(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_study_concept_by_id/${id}`, headers)
  }
}
