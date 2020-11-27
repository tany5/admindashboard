import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EditbannerService {

  constructor(private webService: WebService) { }

  submitBanner(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`edit_banner`,{value}, headers)
  }

  getBannerData(banner_id, banner_type) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_banner_data_by_id/${banner_id}/${banner_type}`, headers)
  }
}
