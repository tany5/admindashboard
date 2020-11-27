import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EditvideocoursService {

  constructor(private webService: WebService) { }

  submitVideoData(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`edit_video_product`,{value}, headers)
  }

 

  getVideoProductDetails(product_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_video_product_by_product_id/${product_id}`, headers)
  }

  getAllCourses() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_course_name`, headers)
  }

  getVideoProduct() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_video_products`, headers)
  }

  deleteVideoProduct(video_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_video_by_video_id/${video_id}`, headers)
  }

}
