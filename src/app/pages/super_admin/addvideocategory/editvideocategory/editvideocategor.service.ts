import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EditvideocategorService {

  constructor(private webService: WebService) { }

  getCourseName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_course`, headers)
  }
 
  submitVideoCategory(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
      return this.webService.post(`edit_video_category`,{value}, headers)
  }

  getVideoCategoryById(video_category_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_video_category_by_id/${video_category_id}`, headers)
  }
}
