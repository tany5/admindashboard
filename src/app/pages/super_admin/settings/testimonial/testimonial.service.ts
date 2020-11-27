import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private webService: WebService) { }

  submitTestimonial(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_testimonial`,{value}, headers)    
  }

  getCourseName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_course_name`, headers)
  }

  getProductName(course_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_product_by_course_id/${course_id}`, headers)
  }

  getTestimonialData() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_testimonial_details`, headers)
  }

  deleteTestimonial(id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_testimonial/${id}`, headers)
  }
}
