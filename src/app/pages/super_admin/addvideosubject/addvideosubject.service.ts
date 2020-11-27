import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddvideosubjectService {

  constructor(private webService: WebService) { }

  addSubject(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_video_subject`,{value}, headers)
  }

  getVideoSubject(){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_video_subject`, headers)
  }

  delete_video_subject(type_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_video_subject/${type_id}`, headers)    
  }
}
