import { Injectable } from '@angular/core';
import { WebService } from './../../../web.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AddliveclassvideoService {

  constructor(private webService:WebService, private http: HttpClient) { }

  getLiveClassData() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_live_class_data`, headers)
  }
  getLiveClassDataById(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_live_class_data_by_id/${id}`, headers)
  }
  getSubject() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_subject_name`, headers)
  }
  getChapter(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_chapter_name/${id}`, headers)
  }

  submitLiveCLassData(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_live_class_video_details`,{value}, headers)
  }

  submitLiveClassVideo(video) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_live_class_video`,{video}, headers)
  }

  getLiveClassDayData(live_class_meta_id, product_id, day_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_live_class_day_data/${live_class_meta_id}/${product_id}/${day_id}`, headers)
  }

  deleteLiveClassVideo(videoId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_live_class/${videoId}`, headers)
  }
}
