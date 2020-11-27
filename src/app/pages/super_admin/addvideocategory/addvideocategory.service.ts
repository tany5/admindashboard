import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddvideocategoryService {

  constructor(private webService: WebService) { }

  getCourseName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_course`, headers)
  }
 
  submitVideoCategory(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
      return this.webService.post(`add_video_category`,{value}, headers)
  }
  
  getVideoCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_video_category_with_course`, headers)
  }

  delete_video_category(video_category_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_video_category/${video_category_id}`, headers)
  }
  

}
