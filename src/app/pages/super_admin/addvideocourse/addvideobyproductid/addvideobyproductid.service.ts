import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddvideobyproductidService {

  constructor(private webService: WebService) { }

  getAllCourses() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_course_name`, headers)
  }
  
  submitVideoData(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_video_product`,{value}, headers)
  }

  getVideoCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_video_category`, headers)
  }

  getVideoSubject() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_video_subject`, headers)
  }

  getVideoChapter(subject_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_video_chapter_by_subject_id/${subject_id}`, headers)
  }

  submitVideoDetails(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_video_details_for_product`,{value}, headers)
  }

  getVideosCountProductId(product_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_videos_count_product_id/${product_id}`, headers)
  }
}
