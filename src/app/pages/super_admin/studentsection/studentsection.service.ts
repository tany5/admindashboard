import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../web.service';
@Injectable({
  providedIn: 'root'
})
export class StudentsectionService {

  constructor(private webService: WebService) { }

  getAllStudent() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_student`, headers)
  }
}
