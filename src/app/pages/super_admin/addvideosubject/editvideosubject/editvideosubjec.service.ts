import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EditvideosubjecService {

  constructor(private webService: WebService) { }

  addSubject(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`edit_video_subject`,{value}, headers)
  }

  getProductSubjectById(product_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_product_subject_by_id/${product_id}`, headers)
  }
}
