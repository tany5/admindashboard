import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class AddcourseService {

  constructor(private webService: WebService) { }


  addCourse(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_course`,{value}, headers)
  }

  getAllCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_course`, headers)
  }

  deleteCourse(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_course/${id}`, headers)    
  }
}
