import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EditliveclassmodaService {

  constructor(private webService: WebService, private http: HttpClient) { }


  getSubject() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_subject_name`, headers)
  }

  getChapter(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_chapter_name/${id}`, headers)
  }

  getLiveClassByVideoId(video_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_live_class_day_data_by_video_id/${video_id}`, headers)
  }

  updateLiveCLassData(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`update_live_class_video_details`,{value}, headers)    
  }
  


  

}
