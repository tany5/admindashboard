import { Injectable } from '@angular/core';
import { WebService } from './../../../web.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditliveclassService {

  constructor(private webService:WebService,) { }

  getLiveClassData() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_live_class_data`, headers)
  }

  deleteLiveClassDetails(live_class_meta_id, product_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_live_class_product/${live_class_meta_id}/${product_id}`, headers)
  }
}
