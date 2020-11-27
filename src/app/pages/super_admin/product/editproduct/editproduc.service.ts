import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EditproducService {

  constructor(private webService: WebService) { }

  getAllSubject() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_category`, headers)
  }
  
  submitTestSeries(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`update_test_series_details`,{value}, headers)
  }

  submitTestSeriesPriceDetails(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`submit_test_series_price_details`,{value}, headers)
  }

  submitTestSeriesQuizDetails(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`update_test_series_test_details`,{value}, headers)
  }

  publishTestSeries(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`publish_test_series`,{value}, headers)
  }

  getTestSeriesProductById(productId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_test_series_product_by_id/${productId}`, headers)
  }

 
}
