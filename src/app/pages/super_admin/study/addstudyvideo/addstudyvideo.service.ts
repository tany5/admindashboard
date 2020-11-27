import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { WebService } from './../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class AddstudyvideoService {

  constructor(private webService: WebService) { }

  getSubjectName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_subject_name`, headers)
  }

  submitStudyConcept(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_study_concept_video`,{value}, headers)
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


  getStudyConceptVideo() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_study_concept_video`, headers)
  }

  deleteStudyConceptVideoById(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_study_concept_video_by_id/${id}`, headers)
  }
}
