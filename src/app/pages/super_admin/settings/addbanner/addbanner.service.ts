import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddbannerService {

  constructor(private webService: WebService) { }

  submitBanner(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_banner`,{value}, headers)
  }

  getBannerData() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_banner_data`, headers)
  }

  deleteBanner(banner_id, banner_type) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_banner_data/${banner_id}/${banner_type}`, headers)    
  }

}
