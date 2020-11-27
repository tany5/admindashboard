import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EdittestimonialService {

  constructor(private webService: WebService) { }

  submitTestimonial(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`edit_testimonial`,{value}, headers)    
  }

  getCourseName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_course_name`, headers)
  }

  getProductName(course_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_product_by_course_id/${course_id}`, headers)
  }

  getTestimonialData(testimonial_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_testimonial_details_by_id/${testimonial_id}`, headers)
  }
}
