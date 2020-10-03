import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddliveclassvideomodalService {

  constructor(private webService:WebService, private http: HttpClient) { }

  submitLiveCLassData(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_live_class_video_details`,{value}, headers)
  }

  getSubject() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_subject_name`, headers)
  }

  getChapter(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_chapter_name/${id}`, headers)
  }
}
