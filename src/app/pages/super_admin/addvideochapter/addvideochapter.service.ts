import { Injectable } from '@angular/core';
import { WebService } from './../../../web.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddvideochapterService {

  constructor(private webService: WebService) { }
  getSubject() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_video_subject_name`, headers)
  }

  getChapter(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_chapter_name/${id}`, headers)
  }
  addChapterName(subjectid, title) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`add_video_chapter_name/${subjectid}/${title}`, headers)    
  }

  getVideoChapter() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_video_chapter_name`, headers)
  }

}
