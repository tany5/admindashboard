import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddvideocoursService {

  constructor(private webService: WebService) { }

  getVideoProduct() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_video_products`, headers)
  }

  delete_video_product_by_product_id(product_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_video_product_by_product_id/${product_id}`, headers)
  }

 
}
